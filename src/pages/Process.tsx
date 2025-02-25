
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Check, Send } from "lucide-react";
import { useConversation } from "@11labs/react";

const STEPS = [
  {
    title: "Paso 1",
    instruction: "Captura la primera foto siguiendo estas instrucciones...",
    voiceInstruction: "Por favor, toma la primera foto siguiendo estas instrucciones..."
  },
  {
    title: "Paso 2",
    instruction: "Para la segunda foto, necesitamos que...",
    voiceInstruction: "Para la segunda foto, necesitamos que..."
  },
  // ... Add all 6 steps with specific instructions
];

const Process = () => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const conversation = useConversation();
  
  const handleStartProcess = () => {
    setStarted(true);
  };

  const handlePhotoCapture = async (photoData: string) => {
    const now = new Date();
    const canvas = document.createElement('canvas');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Draw the original image
      ctx.drawImage(img, 0, 0);
      
      // Add watermark
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, img.height - 40, img.width, 40);
      
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.fillText(now.toLocaleString(), 10, img.height - 15);
      ctx.fillText('PhotoProcess', img.width - 100, img.height - 15);
      
      const watermarkedImage = canvas.toDataURL('image/jpeg');
      setPhotos([...photos, watermarkedImage]);
      setShowCamera(false);
      
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    };
    
    img.src = photoData;
  };

  const handleVoiceInstructions = async () => {
    // Initialize voice instructions using ElevenLabs
    try {
      await conversation.startSession({ 
        agentId: "YOUR_AGENT_ID",
        overrides: {
          tts: {
            voiceId: "EXAVITQu4vr4xnSDxMaL" // Sarah's voice
          }
        }
      });
    } catch (error) {
      console.error("Error starting voice conversation:", error);
    }
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

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      {showCamera ? (
        <div className="camera-container">
          <video className="camera-preview" autoPlay playsInline />
          <Button
            onClick={() => {/* Implement photo capture logic */}}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black hover:bg-gray-100"
          >
            <Camera className="w-8 h-8" />
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{STEPS[currentStep].title}</h2>
            <p className="text-gray-600 mt-2">{STEPS[currentStep].instruction}</p>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => setShowCamera(true)}
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
              <h3 className="text-xl font-semibold text-center">Fotos Capturadas</h3>
              <div className="grid gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="photo-preview">
                    <img src={photo} alt={`Paso ${index + 1}`} className="rounded-lg shadow-lg" />
                  </div>
                ))}
              </div>

              {photos.length === STEPS.length && (
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
