
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Check, Send } from "lucide-react";
import { useConversation } from "@11labs/react";
import { useToast } from "@/components/ui/use-toast";

// Definición de tipos de coberturas y sus pasos correspondientes
const COVERAGE_TYPES = [
  {
    id: "responsabilidad_civil",
    name: "Responsabilidad Civil",
    requiredPhotos: 2,
  },
  {
    id: "intermedia",
    name: "Intermedia",
    requiredPhotos: 3,
  },
  {
    id: "terceros_completo",
    name: "Terceros Completo",
    requiredPhotos: 4,
  },
  {
    id: "todo_riesgo",
    name: "Todo Riesgo",
    requiredPhotos: 6,
  },
];

// Función para generar pasos basados en tipo de cobertura
const generateStepsForCoverage = (coverageType) => {
  const { requiredPhotos } = COVERAGE_TYPES.find(
    (type) => type.id === coverageType
  ) || { requiredPhotos: 2 };
  
  return Array.from({ length: requiredPhotos }, (_, index) => ({
    title: `Paso ${index + 1}`,
    instruction: `Captura la foto ${index + 1} siguiendo estas instrucciones...`,
    voiceInstruction: `Por favor, toma la foto ${index + 1} siguiendo estas instrucciones...`
  }));
};

const Process = () => {
  const [started, setStarted] = useState(false);
  const [coverageSelected, setCoverageSelected] = useState(false);
  const [coverageType, setCoverageType] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const conversation = useConversation();

  // Efecto para actualizar pasos cuando se selecciona cobertura
  useEffect(() => {
    if (coverageType) {
      setSteps(generateStepsForCoverage(coverageType));
    }
  }, [coverageType]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo acceder a la cámara"
      });
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  const handleStartProcess = () => {
    setStarted(true);
  };

  const handleCoverageSelect = (coverage) => {
    setCoverageType(coverage);
    setCoverageSelected(true);
    toast({
      title: "Cobertura seleccionada",
      description: `Has elegido la cobertura: ${COVERAGE_TYPES.find(type => type.id === coverage)?.name}`
    });
  };

  const handlePhotoCapture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Capturar la imagen del video
    ctx.drawImage(video, 0, 0);

    // Agregar marca de agua
    const now = new Date();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
    
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(now.toLocaleString(), 10, canvas.height - 15);
    ctx.fillText('PhotoProcess', canvas.width - 100, canvas.height - 15);

    const photoData = canvas.toDataURL('image/jpeg');
    setPhotos([...photos, photoData]);
    setShowCamera(false);
    stopCamera();

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }

    toast({
      title: "¡Foto capturada!",
      description: `Paso ${currentStep + 1} completado`
    });
  };

  const handleVoiceInstructions = async () => {
    try {
      await conversation.startSession({ 
        agentId: "YOUR_AGENT_ID",
        overrides: {
          tts: {
            voiceId: "EXAVITQu4vr4xnSDxMaL"
          }
        }
      });
    } catch (error) {
      console.error("Error starting voice conversation:", error);
    }
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
    startCamera();
  };

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Button
          onClick={handleStartProcess}
          className="text-xl py-8 px-12 bg-black hover:bg-gray-800 text-white"
        >
          Comenzar Proceso
        </Button>
      </div>
    );
  }

  // Mostrar selección de cobertura si aún no se ha seleccionado
  if (started && !coverageSelected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-lg mx-auto text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Selecciona tu tipo de cobertura</h2>
          <p className="text-gray-600">El tipo de cobertura determinará cuántas fotos necesitarás tomar.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
          {COVERAGE_TYPES.map((coverage) => (
            <Button
              key={coverage.id}
              onClick={() => handleCoverageSelect(coverage.id)}
              className="py-6 bg-white hover:bg-gray-100 text-black border border-gray-300 transition-all duration-200"
              variant="outline"
            >
              <div className="flex flex-col items-center">
                <span className="font-medium">{coverage.name}</span>
                <span className="text-sm text-gray-500 mt-1">{coverage.requiredPhotos} fotos</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      {showCamera ? (
        <div className="relative w-full max-w-lg mx-auto">
          <video 
            ref={videoRef} 
            className="w-full h-full rounded-lg"
            autoPlay 
            playsInline
          />
          <Button
            onClick={handlePhotoCapture}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black hover:bg-gray-100"
          >
            <Camera className="w-8 h-8" />
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{steps[currentStep]?.title}</h2>
            <p className="text-gray-600 mt-2">{steps[currentStep]?.instruction}</p>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleOpenCamera}
              className="bg-black hover:bg-gray-800 text-white"
            >
              <Camera className="w-5 h-5 mr-2" />
              Tomar Foto
            </Button>
            
            <Button
              onClick={handleVoiceInstructions}
              variant="outline"
              className="border-black text-black hover:bg-gray-100"
            >
              Instrucciones por Voz
            </Button>
          </div>

          {photos.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">Fotos Capturadas ({photos.length}/{steps.length})</h3>
              <div className="grid gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="photo-preview">
                    <img 
                      src={photo} 
                      alt={`Paso ${index + 1}`} 
                      className="rounded-lg shadow-lg w-full max-w-lg mx-auto"
                    />
                  </div>
                ))}
              </div>

              {photos.length === steps.length && (
                <Button
                  onClick={() => {/* Implement send logic */}}
                  className="w-full py-6 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Fotos
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Process;
