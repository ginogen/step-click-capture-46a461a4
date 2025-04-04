import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, MapPin, Clock, Shield, CheckCircle, AlertTriangle, ChevronRight, Globe, Mail, FileText, Image as ImageIcon, MessageSquare, Calendar, Lock, ShieldCheck, BadgeCheck, Clock3, MapPinned, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Landing = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const contactFormRef = useRef<HTMLElement | null>(null);
  
  // Form setup
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyType: ""
    }
  });
  
  // Scroll to contact form function
  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
  
  // Form submission handler
  const onSubmit = async (data: any) => {
    setSubmitting(true);
    
    try {
      // Call our Supabase Edge Function to send the form data
      const { error } = await supabase.functions.invoke('send-inspection-photos/send-contact-form', {
        body: data
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast.success("Solicitud enviada correctamente");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  
  return <div className="min-h-screen bg-white">
      <section className="gradient-hero py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="flex justify-center mb-12">
            <img alt="Cazalá Logo" src="/lovable-uploads/6661f619-d286-486c-9c46-12a04c958bde.png" className="h-40 transparent-bg object-cover" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 leading-tight">
                <span className="inline-block fadeInUp delay-100">La forma más segura</span> <br />
                <span className="inline-block fadeInUp delay-200">de recibir fotos</span> <br />
                <span className="inline-block fadeInUp delay-300">de tus clientes</span>
              </h1>
              <p className="text-xl text-slate-700 mb-8 fadeInUp delay-400">
                Evita fraudes y falsificaciones al momento de emitir una póliza. 100% seguro.
              </p>
              <div className="flex justify-center md:justify-start fadeInUp delay-500">
                <Button 
                  size="lg" 
                  className="relative overflow-hidden group bg-navy-900 hover:bg-navy-800 text-white"
                  onClick={scrollToContactForm}
                >
                  <span className="relative z-10">Solicitar Demo</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="/lovable-uploads/6adb83f8-3441-4eb7-bb1a-a66765336328.png" alt="Demostración de la Aplicación" className="w-full h-auto app-shadow max-w-sm mx-auto transparent-bg" />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-20">
          <path d="M0 0L48 10.7C96 21.3 192 42.7 288 53.3C384 64 480 64 576 58.7C672 53.3 768 42.7 864 37.3C960 32 1056 32 1152 32C1248 32 1344 32 1392 32L1440 32V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V0Z" fill="#F6F9FC" />
        </svg>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={addToRefs}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
              📸 Fotos en tiempo real, sin trampas
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Nuestra app asegura que cada imagen enviada por el cliente sea tomada en el momento, 
              sin posibilidad de cargar imágenes desde la galería ni editar los archivos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="gradient-card rounded-xl overflow-hidden border-none">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="rounded-full feature-icon-bg p-4">
                    <MapPinned className="h-7 w-7 text-navy-900" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Ubicación en tiempo real</h3>
                <p className="text-slate-600 text-center">
                  Verificamos la ubicación exacta al momento de tomar cada foto.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card rounded-xl overflow-hidden border-none">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="rounded-full feature-icon-bg p-4">
                    <Clock3 className="h-7 w-7 text-navy-900" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Fecha y hora exacta</h3>
                <p className="text-slate-600 text-center">
                  Cada foto registra el momento preciso en que fue tomada.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card rounded-xl overflow-hidden border-none">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="rounded-full feature-icon-bg p-4">
                    <ShieldCheck className="h-7 w-7 text-navy-900" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Marca de agua con datos</h3>
                <p className="text-slate-600 text-center">
                  Incorporamos todos los datos de verificación en cada imagen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-hero" ref={addToRefs}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
              🔐 ¿Cómo funciona?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-md transition-transform duration-300 hover:translate-x-2">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full gradient-navy text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Acceso personalizado</h3>
                  <p className="text-slate-700">
                    El cliente accede al link personalizado con tu logo, tus colores y dominio.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-md transition-transform duration-300 hover:translate-x-2">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full gradient-navy text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Guía paso a paso</h3>
                  <p className="text-slate-700">
                    La app guía al usuario con instrucciones claras y ejemplos para tomar cada foto correctamente.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-md transition-transform duration-300 hover:translate-x-2">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full gradient-navy text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Verificación automática</h3>
                  <p className="text-slate-700">
                    Cada imagen se toma en el momento, con ubicación, fecha y hora exacta, y marca de agua con todos los datos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-md transition-transform duration-300 hover:translate-x-2">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full gradient-navy text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Entrega segura</h3>
                  <p className="text-slate-700">
                    Las fotos son enviadas directamente a tu email. El cliente no puede descargarlas ni modificar nada.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden drop-shadow-2xl">
              <img src="/lovable-uploads/95beaf30-e1ea-4d56-8db5-2a942d4e0750.png" alt="Proceso de la aplicación" className="w-full h-auto rounded-xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.3)] max-w-sm mx-auto transparent-bg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={addToRefs}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
              ✨ Personaliza todo a tu medida
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="gradient-card shadow-lg border-none rounded-xl">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full feature-icon-bg p-3 mr-3">
                    <ImageIcon className="h-5 w-5 text-navy-900" />
                  </div>
                  <p className="text-lg font-medium">Logo y colores de tu empresa</p>
                </div>
                <p className="text-slate-600 ml-11">
                  Podes personalizar la app para que tus clientes te identifiquen.
                </p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card shadow-lg border-none rounded-xl">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full feature-icon-bg p-3 mr-3">
                    <Globe className="h-5 w-5 text-navy-900" />
                  </div>
                  <p className="text-lg font-medium">Tu propio dominio</p>
                </div>
                <p className="text-slate-600 ml-11">
                  Tu nombre de dominio para mayor personalización.
                </p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card shadow-lg border-none rounded-xl">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full feature-icon-bg p-3 mr-3">
                    <Camera className="h-5 w-5 text-navy-900" />
                  </div>
                  <p className="text-lg font-medium">Cantidad de fotos requeridas</p>
                </div>
                <p className="text-slate-600 ml-11">
                  Vos definis polizas y cantidad de fotos a requerir.
                </p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card shadow-lg border-none rounded-xl">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full feature-icon-bg p-3 mr-3">
                    <FileText className="h-5 w-5 text-navy-900" />
                  </div>
                  <p className="text-lg font-medium">Instrucciones y ejemplos visuales</p>
                </div>
                <p className="text-slate-600 ml-11">
                  Tenes que proveer las fotos de ejemplos correctos e instrucciones.
                </p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card shadow-lg border-none rounded-xl">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full feature-icon-bg p-3 mr-3">
                    <Mail className="h-5 w-5 text-navy-900" />
                  </div>
                  <p className="text-lg font-medium">Email donde recibir las fotos</p>
                </div>
                <p className="text-slate-600 ml-11">
                  Para recibir las fotos de cada cliente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="gradient-hero py-20 px-4 sm:px-6 lg:px-8" ref={addToRefs}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
              🚫 ¿Por qué usarla?
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Detectamos y evitamos intentos de fraude como:
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-start gap-3 bg-white p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700 font-medium">KMs manipulados</p>
            </div>
            <div className="flex items-start gap-3 bg-white p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700 font-medium">Fotos viejas de ruedas o carrocerías</p>
            </div>
            <div className="flex items-start gap-3 bg-white p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700 font-medium">Imágenes reenviadas o sacadas de internet</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={addToRefs}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
              🔧 Ideal para
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="gradient-card p-8 rounded-xl shadow-lg border-none transition-all duration-300 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-green-100 p-4">
                  <BadgeCheck className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Pólizas de automotor y otras</h3>
            </div>
            <div className="gradient-card p-8 rounded-xl shadow-lg border-none transition-all duration-300 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-green-100 p-4">
                  <BadgeCheck className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Inspecciones previas</h3>
            </div>
            <div className="gradient-card p-8 rounded-xl shadow-lg border-none transition-all duration-300 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-green-100 p-4">
                  <BadgeCheck className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Verificación de condiciones reales</h3>
            </div>
          </div>
        </div>
      </section>

      <section 
        className="gradient-navy text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" 
        ref={(el) => { 
          addToRefs(el);
          contactFormRef.current = el;
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full opacity-5"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            💬 ¿Querés ver cómo funciona?
          </h2>
          <p className="text-xl mb-8 text-slate-200">
            Pedí una demo y probala en menos de 5 minutos.
            <br />
            Seguridad y transparencia para vos. Tranquilidad para tus clientes.
          </p>
          
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Nombre</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tu nombre completo" 
                          {...field} 
                          className="bg-white/20 text-white placeholder:text-white/60 border-white/30"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="tucorreo@ejemplo.com" 
                          {...field} 
                          className="bg-white/20 text-white placeholder:text-white/60 border-white/30" 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Teléfono</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tu número de teléfono" 
                          {...field} 
                          className="bg-white/20 text-white placeholder:text-white/60 border-white/30" 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="companyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Tipo de empresa</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/20 text-white border-white/30">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="productor">Productor de Seguros</SelectItem>
                          <SelectItem value="agencia">Agencia de Seguros</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-white text-navy-900 hover:bg-slate-100"
                  disabled={submitting}
                >
                  {submitting ? "Enviando..." : "Solicitar Demo"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <footer className="bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img alt="Cazalá Logo" className="h-12 transparent-bg" src="/lovable-uploads/5bdd74f9-9f49-40f2-a96a-65b25d00d707.png" />
          </div>
          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Autentika. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>;
};
export default Landing;
