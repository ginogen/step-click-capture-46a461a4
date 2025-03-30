
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
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
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            La forma más segura de recibir fotos de tus clientes
          </h1>
          <p className="text-xl text-slate-700 mb-8">
            Evita fraudes y falsificaciones al momento de emitir una póliza.
          </p>
          <Link to="/welcome">
            <Button size="lg" className="relative overflow-hidden group bg-navy-900 hover:bg-navy-800 text-white">
              <span className="relative z-10">Solicitar Demo</span>
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Button>
          </Link>
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
