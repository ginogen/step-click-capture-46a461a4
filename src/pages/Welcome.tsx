
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Bienvenido a PhotoProcess
        </h1>
        
        <div className="space-y-4">
          <p className="text-lg text-gray-600">
            Esta aplicación te guiará a través de un proceso de 6 pasos para capturar fotografías específicas.
          </p>
          
          <ul className="text-left text-gray-600 space-y-2 mt-4">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Instrucciones claras en cada paso
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Guía por voz opcional
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Vista previa de fotos con marca de agua
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Proceso simple y guiado
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <Button
            onClick={() => navigate("/auth")}
            className="w-full py-6 text-lg bg-black hover:bg-gray-800 text-white transition-all duration-200"
          >
            Comenzar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
