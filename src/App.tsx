
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Process from "./pages/Process";
import CoverageSelection from "./pages/CoverageSelection";
import Landing from "./pages/Landing";
import { useEffect } from "react";

// Creamos un componente para manejar la redirección basada en dominio
const DomainHandler = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const currentDomain = window.location.hostname;
  const mainDomain = "autentika.lat";
  const subDomain = "grupocazala.autentika.lat";
  
  useEffect(() => {
    // Si estamos en la landing y NO estamos en el dominio principal, redirigir al dominio principal
    if (location.pathname === "/" && currentDomain !== mainDomain && currentDomain !== "localhost") {
      window.location.href = `https://${mainDomain}`;
      return;
    }
    
    // Si estamos en una ruta interna (/welcome, etc) y NO estamos en el subdominio, redirigir al subdominio
    if (location.pathname !== "/" && currentDomain !== subDomain && currentDomain !== "localhost") {
      window.location.href = `https://${subDomain}${location.pathname}${location.search}`;
      return;
    }
  }, [location]);
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DomainHandler>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/coverage-selection" element={<CoverageSelection />} />
            <Route path="/process" element={<Process />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DomainHandler>
      </BrowserRouter>
      {/* Add Sonner Toaster component for small transient notifications */}
      <SonnerToaster 
        position="bottom-center"
        toastOptions={{
          duration: 1500,
          className: "text-sm py-2 px-3 bg-green-500 text-white rounded-md",
        }}
      />
      {/* Keep existing Toaster for important notifications */}
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
