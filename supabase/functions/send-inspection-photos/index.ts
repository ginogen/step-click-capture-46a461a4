
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PhotoData {
  photos: string[];
  coverageType: string;
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  companyType: string;
}

// Whether we're in testing mode (true) or production mode with verified domain (false)
const IS_TESTING_MODE = false;
// This is only used in testing mode
const VERIFIED_TEST_EMAIL = "ginogentileg@gmail.com";
// Your verified domain for email sending
const VERIFIED_DOMAIN = "autentika.lat";
// Email adicional para recibir copia de las fotos
const ADDITIONAL_EMAIL = "ginoalternativa10@gmail.com";

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestUrl = new URL(req.url);
    const path = requestUrl.pathname.split('/').pop();

    // Handle contact form submissions
    if (path === "send-contact-form") {
      const formData: ContactFormData = await req.json();
      
      if (!formData.name || !formData.email) {
        throw new Error("Name and email are required");
      }

      console.log("Sending contact form data:", formData);
      
      // Store the form data to ensure we have it even if email sending fails
      console.log("Contact form submission:", JSON.stringify(formData, null, 2));
      
      // Send email with contact form data
      try {
        // In testing mode, we can only send to the verified email
        const toEmail = IS_TESTING_MODE ? VERIFIED_TEST_EMAIL : "hola@builders-ai.com";
        
        const emailResponse = await resend.emails.send({
          from: `Formulario de Contacto <contacto@${VERIFIED_DOMAIN}>`,
          to: [toEmail],
          subject: "Nuevo contacto desde Cazalá",
          html: `
            <h1>Nuevo contacto desde la landing page</h1>
            <p><strong>Nombre:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Teléfono:</strong> ${formData.phone || 'No proporcionado'}</p>
            <p><strong>Tipo de empresa:</strong> ${formData.companyType || 'No especificado'}</p>
          `,
        });

        if (emailResponse.error) {
          console.error("Error from Resend API:", emailResponse.error);
          console.error("Full error details:", JSON.stringify(emailResponse, null, 2));
        } else {
          console.log("Contact form email sent successfully:", emailResponse);
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        console.error("Error details:", JSON.stringify(emailError, null, 2));
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: "Formulario enviado correctamente",
        note: IS_TESTING_MODE ? "En modo de prueba, los correos solo se envían a la dirección verificada." : ""
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } 
    // Handle photo submissions (existing functionality)
    else {
      const { photos, coverageType, userInfo }: PhotoData = await req.json();
      
      if (!photos || !Array.isArray(photos) || photos.length === 0) {
        throw new Error("No photos provided");
      }

      console.log(`Sending ${photos.length} photos for coverage type: ${coverageType}`);
      
      // Create HTML content for the email
      const photoAttachments = photos.map((photo, index) => {
        // Extract the base64 data from the data URL
        const base64Data = photo.split(",")[1];
        return {
          filename: `photo_${index + 1}.jpg`,
          content: base64Data
        };
      });

      const userDetails = userInfo ? 
        `<p><strong>Nombre:</strong> ${userInfo.name || 'No proporcionado'}</p>
         <p><strong>Email:</strong> ${userInfo.email || 'No proporcionado'}</p>
         <p><strong>Teléfono:</strong> ${userInfo.phone || 'No proporcionado'}</p>
         <p><strong>Ubicación:</strong> ${userInfo.location || 'No proporcionada'}</p>` 
        : '<p>No se proporcionaron datos de usuario</p>';

      // Send email with photos
      try {
        // In testing mode, we can only send to the verified email
        const toEmail = IS_TESTING_MODE ? VERIFIED_TEST_EMAIL : "app.grupocazala@gmail.com";
        
        // Crear array con destinatarios (principal + adicional)
        const recipients = [toEmail];
        
        // Agregar el email adicional si no estamos en modo de prueba
        if (!IS_TESTING_MODE) {
          recipients.push(ADDITIONAL_EMAIL);
        }
        
        const emailResponse = await resend.emails.send({
          from: `Inspección <inspeccion@${VERIFIED_DOMAIN}>`,
          to: recipients,
          subject: `Nueva inspección - ${coverageType}`,
          html: `
            <h1>Nueva Inspección Completada</h1>
            <p><strong>Tipo de cobertura:</strong> ${coverageType}</p>
            <h2>Información del usuario:</h2>
            ${userDetails}
            <p>Se adjuntan ${photos.length} fotos de la inspección.</p>
          `,
          attachments: photoAttachments,
        });

        if (emailResponse.error) {
          console.error("Error from Resend API:", emailResponse.error);
          console.error("Full error details:", JSON.stringify(emailResponse, null, 2));
        } else {
          console.log("Email sent successfully to:", recipients.join(", "));
          console.log("Email response:", emailResponse);
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        console.error("Error details:", JSON.stringify(emailError, null, 2));
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: "Fotos enviadas correctamente",
        note: IS_TESTING_MODE ? "En modo de prueba, los correos solo se envían a la dirección verificada." : ""
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }
  } catch (error: any) {
    console.error("Error sending data:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
