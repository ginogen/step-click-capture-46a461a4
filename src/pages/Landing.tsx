
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, MapPin, Clock, Shield, CheckCircle, AlertTriangle } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="flex items-center mb-8">
                <img 
                  src="/lovable-uploads/b81aea5b-2e7c-4bab-9418-4bf1cfba1373.png" 
                  alt="Autentika Logo" 
                  className="h-16"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
                La forma más segura de recibir fotos de tus clientes
              </h1>
              <p className="text-xl text-slate-700 mb-8">
                Evita fraudes y falsificaciones al momento de emitir una póliza.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/welcome">
                  <Button size="lg" className="bg-navy-900 hover:bg-navy-800 text-white">
                    Solicitar Demo
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-navy-900 text-navy-900">
                  Más Información
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 border border-slate-200">
                <img 
                  src="/lovable-uploads/64423287-ec25-48aa-85e4-a5a5c5d7d45c.png" 
                  alt="Demostración de la Aplicación" 
                  className="rounded-lg w-full h-auto shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900">
              📸 Fotos en tiempo real, sin trampas
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Nuestra app asegura que cada imagen enviada por el cliente sea tomada en el momento, 
              sin posibilidad de cargar imágenes desde la galería ni editar los archivos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <MapPin className="h-6 w-6 text-navy-900" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Ubicación en tiempo real</h3>
                <p className="text-slate-600 text-center">
                  Verificamos la ubicación exacta al momento de tomar cada foto.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <Clock className="h-6 w-6 text-navy-900" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Fecha y hora exacta</h3>
                <p className="text-slate-600 text-center">
                  Cada foto registra el momento preciso en que fue tomada.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <Shield className="h-6 w-6 text-navy-900" />
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

      {/* How it Works Section */}
      <section className="bg-navy-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900">
              🔐 ¿Cómo funciona?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-navy-900 text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Acceso personalizado</h3>
                  <p className="text-slate-700">
                    El cliente accede al link personalizado con tu logo, tus colores y dominio.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-navy-900 text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Guía paso a paso</h3>
                  <p className="text-slate-700">
                    La app guía al usuario con instrucciones claras y ejemplos para tomar cada foto correctamente.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-navy-900 text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Verificación automática</h3>
                  <p className="text-slate-700">
                    Cada imagen se toma en el momento, con ubicación, fecha y hora exacta, y marca de agua con todos los datos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-navy-900 text-white font-bold">
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

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="/lovable-uploads/6a807237-2d40-4015-857d-daa8a6445e9c.png" 
                alt="Proceso de la aplicación" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900">
              ✨ Personaliza todo a tu medida
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white shadow border border-slate-100">
              <CardContent className="pt-6">
                <p className="text-lg font-medium">Logo y colores de tu empresa</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow border border-slate-100">
              <CardContent className="pt-6">
                <p className="text-lg font-medium">Tu propio dominio</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow border border-slate-100">
              <CardContent className="pt-6">
                <p className="text-lg font-medium">Cantidad de fotos requeridas</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow border border-slate-100">
              <CardContent className="pt-6">
                <p className="text-lg font-medium">Instrucciones y ejemplos visuales</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow border border-slate-100">
              <CardContent className="pt-6">
                <p className="text-lg font-medium">Email donde recibir las fotos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Use It Section */}
      <section className="bg-navy-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900">
              🚫 ¿Por qué usarla?
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Detectamos y evitamos intentos de fraude como:
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700">KMs manipulados</p>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700">Fotos viejas de ruedas o carrocerías</p>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700">Imágenes reenviadas o sacadas de internet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900">
              🔧 Ideal para
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Pólizas de automotor</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Inspecciones previas</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Verificación de condiciones reales</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            💬 ¿Querés ver cómo funciona?
          </h2>
          <p className="text-xl mb-8 text-slate-200">
            Pedí una demo y probala en menos de 5 minutos.
            <br />
            Seguridad y transparencia para vos. Tranquilidad para tus clientes.
          </p>
          <Link to="/welcome">
            <Button size="lg" className="bg-white text-navy-900 hover:bg-slate-100">
              Solicitar Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/b81aea5b-2e7c-4bab-9418-4bf1cfba1373.png" 
              alt="Autentika Logo" 
              className="h-10"
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
