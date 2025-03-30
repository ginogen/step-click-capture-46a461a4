
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

// Definición de tipos de coberturas de automóviles
const AUTO_COVERAGE_TYPES = [
  {
    id: "responsabilidad_civil",
    name: "Responsabilidad Civil",
    requiredPhotos: 6,
  },
  {
    id: "intermedia",
    name: "Intermedia",
    requiredPhotos: 8,
  },
  {
    id: "terceros_completo_todo_riesgo",
    name: "Terceros Completo / Todo Riesgo",
    requiredPhotos: 10,
  },
];

// Definición de tipos de coberturas varias
const OTHER_COVERAGE_TYPES = [
  {
    id: "edificio_incendio",
    name: "Edificio solo por incendio",
    requiredPhotos: 6,
  },
  {
    id: "combinado_integral",
    name: "Combinado o integral",
    requiredPhotos: 10,
  },
  {
    id: "otros",
    name: "Otros",
    requiredPhotos: 10,
  },
];

const CoverageSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAutoModal, setShowAutoModal] = useState(false);
  const [selectedCoverage, setSelectedCoverage] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === "auto") {
      setShowAutoModal(true);
    }
  };

  const handleCoverageSelect = (coverage: string) => {
    sessionStorage.setItem("coverageType", coverage);
    navigate("/process");
  };

  const continueToAutoCoberages = () => {
    setShowAutoModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/4306e699-5ec3-410e-a7d4-16e6a1b52a6d.png" 
          alt="Grupo Cazalá Seguros" 
          className="h-20 object-contain"
        />
      </div>
      
      <div className="max-w-lg mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Selecciona tu tipo de cobertura</h2>
        <p className="text-gray-600 text-lg">El tipo de cobertura determinará cuántas fotos necesitarás tomar.</p>
      </div>
      
      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
          <Button
            onClick={() => handleCategorySelect("auto")}
            className="py-8 bg-white hover:bg-gray-100 text-black border border-gray-300 transition-all duration-200 shadow-blue-glow"
            variant="outline"
          >
            <div className="flex flex-col items-center">
              <span className="font-medium text-xl">Coberturas Automotor</span>
              <span className="text-base text-gray-500 mt-1">Vehículos y motos</span>
            </div>
          </Button>
          
          <Button
            onClick={() => setSelectedCategory("other")}
            className="py-8 bg-white hover:bg-gray-100 text-black border border-gray-300 transition-all duration-200 shadow-blue-glow"
            variant="outline"
          >
            <div className="flex flex-col items-center">
              <span className="font-medium text-xl">Coberturas Varias</span>
              <span className="text-base text-gray-500 mt-1">Edificios y otros</span>
            </div>
          </Button>
        </div>
      ) : selectedCategory === "auto" ? (
        <>
          <h3 className="text-2xl font-semibold mb-6">Coberturas Automotor</h3>
          <div className="grid grid-cols-1 gap-4 w-full max-w-xl">
            {AUTO_COVERAGE_TYPES.map((coverage) => (
              <Button
                key={coverage.id}
                onClick={() => handleCoverageSelect(coverage.id)}
                className="py-6 bg-white hover:bg-gray-100 text-black border border-gray-300 transition-all duration-200 shadow-blue-glow"
                variant="outline"
              >
                <div className="flex flex-col items-center">
                  <span className="font-medium text-xl">{coverage.name}</span>
                  <span className="text-base text-gray-500 mt-1">{coverage.requiredPhotos} fotos</span>
                </div>
              </Button>
            ))}
          </div>
          <Button 
            onClick={() => setSelectedCategory(null)} 
            className="mt-8 text-gray-600 text-lg" 
            variant="ghost"
          >
            Volver
          </Button>
        </>
      ) : (
        <>
          <h3 className="text-2xl font-semibold mb-6">Coberturas Varias</h3>
          <div className="grid grid-cols-1 gap-4 w-full max-w-xl">
            {OTHER_COVERAGE_TYPES.map((coverage) => (
              <Button
                key={coverage.id}
                onClick={() => handleCoverageSelect(coverage.id)}
                className="py-6 bg-white hover:bg-gray-100 text-black border border-gray-300 transition-all duration-200 shadow-blue-glow"
                variant="outline"
              >
                <div className="flex flex-col items-center">
                  <span className="font-medium text-xl">{coverage.name}</span>
                  <span className="text-base text-gray-500 mt-1">{coverage.requiredPhotos} fotos</span>
                </div>
              </Button>
            ))}
          </div>
          <Button 
            onClick={() => setSelectedCategory(null)} 
            className="mt-8 text-gray-600 text-lg" 
            variant="ghost"
          >
            Volver
          </Button>
        </>
      )}

      <Dialog open={showAutoModal} onOpenChange={setShowAutoModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Importante</DialogTitle>
            <DialogDescription>
              Por favor, antes de tomar las fotos, estacione el vehículo en un lugar despejado, lejos de paredes u objetos que puedan obstruir la vista. Capture todas las imágenes solicitadas sin mover el vehículo. ¡Gracias!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={continueToAutoCoberages} 
              className="w-full"
            >
              Entendido, continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoverageSelection;
