
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Camera, 
  MapPin, 
  Clock, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  ChevronRight, 
  Globe, 
  Mail, 
  FileText, 
  Image as ImageIcon,
  MessageSquare,
  Calendar,
  Lock,
  ShieldCheck,
  BadgeCheck,
  Clock3,
  MapPinned,
  ShieldAlert,
  ArrowRight
} from "lucide-react";

const Landing = () => {
  // Referencias para animaciones al hacer scroll
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Función para manejar animaciones al hacer scroll
  const handleScroll = () => {
    const sections = document.querySelectorAll('.section-transition');
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight * 0.85;
      
      if (sectionTop < triggerPoint) {
        section.classList.add('in-view');
      }
    });
  };

  // Efecto para animaciones al hacer scroll
  useEffect(() => {
    // Configurar animación inicial al cargar
    setTimeout(() => {
      handleScroll();
    }, 100);

    // Observador para animaciones continuas al hacer scroll
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
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

    // Configurar event listener para transiciones de secciones
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Añadir referencia a la lista
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section con gradiente mejorado */}
      <section className="modern-gradient-blue py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Elementos decorativos en el fondo */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
          
          {/* Logo centrado y mucho más grande */}
          <div className="flex justify-center mb-20">
            <img 
              src="/lovable-uploads/27192956-82c7-4b08-8db2-8cdb0aafc7ea.png" 
              alt="Autentika Logo" 
              className="h-56 md:h-64 lg:h-72 animate-fade-in float"
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-navy-900 mb-8 leading-tight">
                <span className="inline-block fadeInUp delay-100">La forma más segura</span> <br />
                <span className="inline-block fadeInUp delay-200">de recibir fotos</span> <br />
                <span className="inline-block fadeInUp delay-300">de tus clientes</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 mb-10 fadeInUp delay-400">
                Evita fraudes y falsificaciones al momento de emitir una póliza.
              </p>
              <div className="flex justify-center md:justify-start fadeInUp delay-500">
                <Link to="/welcome">
                  <Button size="lg" className="relative overflow-hidden group bg-blue-gradient hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl">
                    <span className="relative z-10 flex items-center">Solicitar Demo <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" /></span>
                    <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 px-4 md:px-0">
              <img 
                src="/lovable-uploads/1c92007a-59d3-4fc5-9bf2-dc8ff1c92974.png" 
                alt="Demostración de la Aplicación" 
                className="w-full h-auto fade-in-on-scroll rounded-2xl float max-w-md mx-auto md:mx-0 md:ml-auto drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 25px 25px rgb(37 99 235 / 0.15))" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wave separator mejorado */}
      <div className="w-full bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-20 -mt-1">
          <path d="M0 0L48 10.7C96 21.3 192 42.7 288 53.3C384 64 480 64 576 58.7C672 53.3 768 42.7 864 37.3C960 32 1056 32 1152 32C1248 32 1344 32 1392 32L1440 32V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V0Z" fill="#F0F7FF"/>
        </svg>
      </div>

      {/* Features Section con transiciones mejoradas */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white section-transition-wrapper" ref={addToRefs}>
        <div className="max-w-7xl mx-auto section-transition">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6">
              📸 Fotos en tiempo real, sin trampas
            </h2>
            <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
              Nuestra app asegura que cada imagen enviada por el cliente sea tomada en el momento, 
              sin posibilidad de cargar imágenes desde la galería ni editar los archivos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="blue-gradient-card rounded-xl overflow-hidden border-none shadow-blue-glow">
              <CardContent className="pt-8 p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="rounded-full feature-icon-shine p-5">
                    <MapPinned className="h-9 w-9 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-center mb-3">Ubicación en tiempo real</h3>
                <p className="text-slate-600 text-center text-lg">
                  Verificamos la ubicación exacta al momento de tomar cada foto.
                </p>
              </CardContent>
            </Card>

            <Card className="blue-gradient-card rounded-xl overflow-hidden border-none shadow-blue-glow">
              <CardContent className="pt-8 p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="rounded-full feature-icon-shine p-5">
                    <Clock3 className="h-9 w-9 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-center mb-3">Fecha y hora exacta</h3>
                <p className="text-slate-600 text-center text-lg">
                  Cada foto registra el momento preciso en que fue tomada.
                </p>
              </CardContent>
            </Card>

            <Card className="blue-gradient-card rounded-xl overflow-hidden border-none shadow-blue-glow">
              <CardContent className="pt-8 p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="rounded-full feature-icon-shine p-5">
                    <ShieldCheck className="h-9 w-9 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-center mb-3">Marca de agua con datos</h3>
                <p className="text-slate-600 text-center text-lg">
                  Incorporamos todos los datos de verificación en cada imagen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section con transiciones mejoradas */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 modern-gradient-blue section-transition-wrapper" ref={addToRefs}>
        <div className="max-w-7xl mx-auto section-transition">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900">
              🔐 ¿Cómo funciona?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="flex gap-6 items-start p-7 bg-white rounded-xl shadow-md transition-all duration-500 hover:translate-x-3 fade-in-on-scroll">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full blue-number-gradient text-white font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Acceso personalizado</h3>
                  <p className="text-slate-700 text-lg">
                    El cliente accede al link personalizado con tu logo, tus colores y dominio.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start p-7 bg-white rounded-xl shadow-md transition-all duration-500 hover:translate-x-3 fade-in-on-scroll-delay-200">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full blue-number-gradient text-white font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Guía paso a paso</h3>
                  <p className="text-slate-700 text-lg">
                    La app guía al usuario con instrucciones claras y ejemplos para tomar cada foto correctamente.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start p-7 bg-white rounded-xl shadow-md transition-all duration-500 hover:translate-x-3 fade-in-on-scroll-delay-400">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full blue-number-gradient text-white font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Verificación automática</h3>
                  <p className="text-slate-700 text-lg">
                    Cada imagen se toma en el momento, con ubicación, fecha y hora exacta, y marca de agua con todos los datos.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start p-7 bg-white rounded-xl shadow-md transition-all duration-500 hover:translate-x-3 fade-in-on-scroll-delay-600">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full blue-number-gradient text-white font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Entrega segura</h3>
                  <p className="text-slate-700 text-lg">
                    Las fotos son enviadas directamente a tu email. El cliente no puede descargarlas ni modificar nada.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden fade-in-on-scroll">
              <img 
                src="/lovable-uploads/c1d42b7a-be06-4e00-a4ab-df124fe8bc7f.png" 
                alt="Proceso de la aplicación" 
                className="w-full h-auto rounded-2xl transform hover:scale-105 transition-transform duration-700"
                style={{ filter: "drop-shadow(0 25px 35px rgb(37 99 235 / 0.25))" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customization Section con transiciones mejoradas */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white section-transition-wrapper" ref={addToRefs}>
        <div className="max-w-7xl mx-auto section-transition">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900">
              ✨ Personaliza todo a tu medida
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="blue-gradient-card shadow-blue-glow border-none rounded-xl fade-in-on-scroll p-2">
              <CardContent className="pt-8 p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full feature-icon-shine p-4 mr-4">
                    <ImageIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-xl font-medium">Logo y colores de tu empresa</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="blue-gradient-card shadow-blue-glow border-none rounded-xl fade-in-on-scroll-delay-200 p-2">
              <CardContent className="pt-8 p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full feature-icon-shine p-4 mr-4">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-xl font-medium">Tu propio dominio</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="blue-gradient-card shadow-blue-glow border-none rounded-xl fade-in-on-scroll-delay-400 p-2">
              <CardContent className="pt-8 p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full feature-icon-shine p-4 mr-4">
                    <Camera className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-xl font-medium">Cantidad de fotos requeridas</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="blue-gradient-card shadow-blue-glow border-none rounded-xl fade-in-on-scroll-delay-200 p-2">
              <CardContent className="pt-8 p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full feature-icon-shine p-4 mr-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-xl font-medium">Instrucciones y ejemplos visuales</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="blue-gradient-card shadow-blue-glow border-none rounded-xl fade-in-on-scroll-delay-400 p-2">
              <CardContent className="pt-8 p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full feature-icon-shine p-4 mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-xl font-medium">Email donde recibir las fotos</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Use It Section con transiciones mejoradas */}
      <section className="modern-gradient-blue py-24 px-4 sm:px-6 lg:px-8 section-transition-wrapper" ref={addToRefs}>
        <div className="max-w-7xl mx-auto section-transition">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900">
              🚫 ¿Por qué usarla?
            </h2>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
              Detectamos y evitamos intentos de fraude como:
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-blue-glow transition-all duration-300 hover:shadow-xl fade-in-on-scroll transform hover:scale-105">
              <AlertTriangle className="h-7 w-7 text-red-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700 font-medium text-lg">KMs manipulados</p>
            </div>
            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-blue-glow transition-all duration-300 hover:shadow-xl fade-in-on-scroll-delay-200 transform hover:scale-105">
              <AlertTriangle className="h-7 w-7 text-red-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700 font-medium text-lg">Fotos viejas de ruedas o carrocerías</p>
            </div>
            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-blue-glow transition-all duration-300 hover:shadow-xl fade-in-on-scroll-delay-400 transform hover:scale-105">
              <AlertTriangle className="h-7 w-7 text-red-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700 font-medium text-lg">Imágenes reenviadas o sacadas de internet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For Section con transiciones mejoradas */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white section-transition-wrapper" ref={addToRefs}>
        <div className="max-w-7xl mx-auto section-transition">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900">
              🔧 Ideal para
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="blue-gradient-card p-10 rounded-xl shadow-blue-glow border-none transition-all duration-500 hover:-translate-y-4 fade-in-on-scroll">
              <div className="flex justify-center mb-8">
                <div className="rounded-full bg-blue-50 p-5">
                  <BadgeCheck className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-2">Pólizas de automotor</h3>
            </div>
            <div className="blue-gradient-card p-10 rounded-xl shadow-blue-glow border-none transition-all duration-500 hover:-translate-y-4 fade-in-on-scroll-delay-200">
              <div className="flex justify-center mb-8">
                <div className="rounded-full bg-blue-50 p-5">
                  <BadgeCheck className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-2">Inspecciones previas</h3>
            </div>
            <div className="blue-gradient-card p-10 rounded-xl shadow-blue-glow border-none transition-all duration-500 hover:-translate-y-4 fade-in-on-scroll-delay-400">
              <div className="flex justify-center mb-8">
                <div className="rounded-full bg-blue-50 p-5">
                  <BadgeCheck className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-2">Verificación de condiciones reales</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section con gradiente mejorado */}
      <section className="blue-cta-gradient text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden section-transition-wrapper" ref={addToRefs}>
        {/* Elementos decorativos en el fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full opacity-5"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 section-transition">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            💬 ¿Querés ver cómo funciona?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-slate-200">
            Pedí una demo y probala en menos de 5 minutos.
            <br />
            Seguridad y transparencia para vos. Tranquilidad para tus clientes.
          </p>
          <Link to="/welcome">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 group relative overflow-hidden px-8 py-6 text-lg rounded-xl">
              <span className="relative z-10 flex items-center font-semibold">
                Solicitar Demo <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="absolute top-0 left-0 w-full h-full bg-blue-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer mejorado */}
      <footer className="bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img 
              src="/lovable-uploads/27192956-82c7-4b08-8db2-8cdb0aafc7ea.png" 
              alt="Autentika Logo" 
              className="h-14"
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

export default Landing;
