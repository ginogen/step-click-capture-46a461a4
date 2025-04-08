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
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  
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
  
  useEffect(() => {
    const handleScroll = () => {
      if (!contactFormRef.current) return;

      const scrollPosition = window.scrollY;
      const formPosition = contactFormRef.current.offsetTop;
      
      // Mostrar el botón cuando hay scroll y estamos lejos del form
      setShowFloatingButton(
        scrollPosition > 300 && // Comenzar a mostrar después de 300px de scroll
        scrollPosition < formPosition - 500 // Ocultar 500px antes del form
      );
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={addToRefs}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
              🎯 ¿Cómo funciona?
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Un proceso simple y efectivo para obtener las fotos que necesitas
            </p>
          </div>

          <div className="space-y-20">
            {/* Paso 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-bold">Acceso Personalizado</h3>
                  </div>
                  <p className="text-slate-600 ml-14">
                    El usuario ingresa a la webapp y puede ver tu logo con tus instrucciones y tipo de Coberturas
                  </p>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/lovable-uploads/Foto1.png" 
                  alt="Paso 1" 
                  className="rounded-xl shadow-lg w-full max-w-md mx-auto"
                />
              </div>
            </div>

            {/* Paso 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-bold">Selección de Cobertura</h3>
                  </div>
                  <p className="text-slate-600 ml-14">
                    Se pueden determinar sub tipos de coberturas
                  </p>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/lovable-uploads/Foto2.png" 
                  alt="Paso 2" 
                  className="rounded-xl shadow-lg w-full max-w-md mx-auto"
                />
              </div>
            </div>

            {/* Paso 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-bold">Guía Interactiva</h3>
                  </div>
                  <p className="text-slate-600 ml-14">
                    El usuario accede al paso a paso para tomar las fotos, con instrucciones de texto, de voz y visuales para finalmente enviar las fotos al email automáticamente.
                  </p>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/lovable-uploads/Foto3.png" 
                  alt="Paso 3" 
                  className="rounded-xl shadow-lg w-full max-w-md mx-auto"
                />
              </div>
            </div>
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

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={addToRefs}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
              💰 Planes y Precios
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Elegí el plan que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Plan Individual */}
            <Card className="relative border-2 hover:border-navy-900 transition-all duration-300 flex flex-col">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Plan Individual</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-navy-900">U$D 49</span>
                    <span className="text-gray-600">/mes</span>
                  </div>
                  <div className="text-sm text-gray-500 line-through">U$D 98</div>
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Ahorro 50%
                  </div>
                </div>
                
                <ul className="space-y-3 flex-grow">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Webapp con tu logo y colores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Podes elegir fotos de ejemplo e instrucciones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Cantidad de pasos y tipos de polizas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Fotos con ubicación, fecha, hora y marca de agua</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Recibí las fotos en tu email (Ilimitados)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Soporte Full</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Recibí actualizaciones y nuevas funciones</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <Button 
                    className="w-full bg-navy-900 hover:bg-navy-800 text-white"
                    onClick={scrollToContactForm}
                  >
                    Suscribirme
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Plan Grupo */}
            <Card className="relative border-2 hover:border-navy-900 transition-all duration-300 flex flex-col">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Plan Grupo</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-navy-900">U$D 39</span>
                    <span className="text-gray-600">/mes por miembro</span>
                  </div>
                  <div className="text-sm text-gray-500 line-through">U$D 78</div>
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Ahorro 50%
                  </div>
                  <p className="text-sm text-gray-600 mt-2">(Aplica para más de 20 miembros)</p>
                </div>

                <ul className="space-y-3 flex-grow">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Webapp con tu logo y colores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Podes elegir fotos de ejemplo e instrucciones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Cantidad de pasos y tipos de polizas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Fotos con ubicación, fecha, hora y marca de agua</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Recibí las fotos en tu email (Ilimitados)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Soporte Full</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Recibí actualizaciones y nuevas funciones</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <Button 
                    className="w-full bg-navy-900 hover:bg-navy-800 text-white"
                    onClick={scrollToContactForm}
                  >
                    Suscribirme
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Plan Grupo+ */}
            <Card className="relative border-2 hover:border-navy-900 transition-all duration-300 flex flex-col">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Plan Grupo+</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-navy-900">U$D 29</span>
                    <span className="text-gray-600">/mes por miembro</span>
                  </div>
                  <div className="text-sm text-gray-500 line-through">U$D 58</div>
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Ahorro 50%
                  </div>
                  <p className="text-sm text-gray-600 mt-2">(Aplica para más de 100 miembros)</p>
                </div>

                <ul className="space-y-3 flex-grow">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Webapp con tu logo y colores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Podes elegir fotos de ejemplo e instrucciones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Cantidad de pasos y tipos de polizas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Fotos con ubicación, fecha, hora y marca de agua</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Recibí las fotos en tu email (Ilimitados)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Soporte Full</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Recibí actualizaciones y nuevas funciones</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <Button 
                    className="w-full bg-navy-900 hover:bg-navy-800 text-white"
                    onClick={scrollToContactForm}
                  >
                    Suscribirme
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Plan Enterprise */}
            <Card className="relative border-2 hover:border-navy-900 transition-all duration-300 flex flex-col">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Plan Enterprise</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-navy-900">Consultar</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">(Aplica para más de 1000 miembros)</p>
                </div>

                <ul className="space-y-3 flex-grow">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Webapp con tu logo y colores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Podes elegir fotos de ejemplo e instrucciones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Cantidad de pasos y tipos de polizas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Fotos con ubicación, fecha, hora y marca de agua</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Recibí las fotos en tu email (Ilimitados)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Soporte Full</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Recibí actualizaciones y nuevas funciones</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <Button 
                    className="w-full bg-navy-900 hover:bg-navy-800 text-white"
                    onClick={scrollToContactForm}
                  >
                    Consultar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-slate-600">
              ¿No estas seguro de suscribirte? {" "}
              <button 
                onClick={scrollToContactForm}
                className="text-navy-900 font-semibold hover:underline"
              >
                Solicita una demo
              </button>
              {" "}y te llamamos para despejar tus dudas.
            </p>
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

      <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 sm:px-0 sm:w-auto transition-opacity duration-300 ${
        showFloatingButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <Button 
          size="lg"
          className="w-full sm:w-auto bg-navy-900 hover:bg-navy-800 text-white shadow-lg"
          onClick={scrollToContactForm}
        >
          Solicitar Demo
        </Button>
      </div>
    </div>;
};
export default Landing;
