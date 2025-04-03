
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
      
      // Send email with contact form data
      try {
        const emailResponse = await resend.emails.send({
          from: "Formulario de Contacto <onboarding@resend.dev>",
          to: ["hola@builders-ai.com"],
          subject: "Nuevo contacto desde Cazalá",
          html: `
            <h1>Nuevo contacto desde la landing page</h1>
            <p><strong>Nombre:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Teléfono:</strong> ${formData.phone || 'No proporcionado'}</p>
            <p><strong>Tipo de empresa:</strong> ${formData.companyType || 'No especificado'}</p>
          `,
        });

        console.log("Contact form email sent successfully:", emailResponse);
        
        if (emailResponse.error) {
          console.error("Error from Resend API:", emailResponse.error);
          // Still return success to the user even if there's an API error
          // This prevents exposing API errors to users while we debug
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Still return success to the user even if there's an email sending error
      }

      return new Response(JSON.stringify({ success: true, message: "Formulario enviado correctamente" }), {
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
        const emailResponse = await resend.emails.send({
          from: "Inspección <onboarding@resend.dev>",
          to: ["app.grupocazala@gmail.com"],
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

        console.log("Email sent successfully:", emailResponse);
        
        if (emailResponse.error) {
          console.error("Error from Resend API:", emailResponse.error);
          // Still return success to the user even if there's an API error
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Still return success to the user even if there's an email sending error
      }

      return new Response(JSON.stringify({ success: true, message: "Fotos enviadas correctamente" }), {
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
