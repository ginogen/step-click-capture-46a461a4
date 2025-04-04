
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Index = () => {
  const contactFormRef = useRef<HTMLDivElement>(null);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyType: ""
    }
  });

 

  // Form submission handler
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("https://grupocazala.autentika.lat/functions/v1/send-inspection-photos/send-contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("¡Formulario enviado con éxito!");
        form.reset();
      } else {
        toast.error("Error al enviar el formulario");
      }
    } catch (error) {
      toast.error("Error al enviar el formulario");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with Logo */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b">
        <div className="max-w-7xl mx-auto flex justify-center md:justify-start">
          <img 
            src="/lovable-uploads/4a5cef1c-64c8-4458-9d17-9667cb03cec4.png" 
            alt="Autentika Logo" 
            className="h-16 transparent-bg"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
              La forma más segura de recibir fotos de tus clientes
            </h1>
            <p className="text-xl text-slate-700 mb-8">
              Evita fraudes y falsificaciones al momento de emitir una póliza.
            </p>
            <Button 
              size="lg" 
              className="relative overflow-hidden group bg-navy-900 hover:bg-navy-800 text-white"
              
            >
              <span className="relative z-10">Solicitar Demo</span>
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Button>
          </div>
        </div>
        
        {/* Contact Form Section */}
        <div 
          ref={contactFormRef} 
          className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 text-center mb-8">Solicita una Demo</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <Input
                    id="name"
                    placeholder="Ingresa tu nombre"
                    {...form.register("name", { required: true })}
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-xs mt-1">Este campo es requerido</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ingresa tu email"
                    {...form.register("email", { 
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                    })}
                  />
                  {form.formState.errors.email?.type === "required" && (
                    <p className="text-red-500 text-xs mt-1">Este campo es requerido</p>
                  )}
                  {form.formState.errors.email?.type === "pattern" && (
                    <p className="text-red-500 text-xs mt-1">Email inválido</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    placeholder="Ingresa tu teléfono"
                    {...form.register("phone")}
                  />
                </div>
                
                <div>
                  <label htmlFor="companyType" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de empresa
                  </label>
                  <Input
                    id="companyType"
                    placeholder="Ej: Aseguradora, Financiera, etc."
                    {...form.register("companyType")}
                  />
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-navy-900 hover:bg-navy-800"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Enviando..." : "Enviar"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with Logo */}
      <footer className="bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img 
              src="/lovable-uploads/4a5cef1c-64c8-4458-9d17-9667cb03cec4.png" 
              alt="Autentika Logo" 
              className="h-12 transparent-bg"
            />
          </div>
          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Autentika. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
