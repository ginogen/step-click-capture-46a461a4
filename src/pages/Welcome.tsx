
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/fb99b0fd-7bee-4c1d-b3b5-826ccb42e7e2.png" 
            alt="Grupo Cazalá Seguros" 
            className="h-20 object-contain"
          />
        </div>
        
        <div className="space-y-6">
          <p className="text-lg text-gray-600">
            A continuación podes elegir el tipo de póliza y te indicaremos como tomar las fotos correctamente para asegurarnos que la póliza sea aprobada debidamente.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700">
            <p className="font-medium">Importante:</p>
            <p>En el caso de pólizas para vehículos, Por favor, antes de tomar las fotos, estacione el vehículo en un lugar despejado, lejos de paredes u objetos que puedan obstruir la vista. Capture todas las imágenes necesarias sin mover el vehículo. ¡Gracias!</p>
          </div>
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
