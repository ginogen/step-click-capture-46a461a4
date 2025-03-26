import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Check, Send, HelpCircle, MapPin } from "lucide-react";
import { useConversation } from "@11labs/react";
import { useToast } from "@/components/ui/use-toast";
import { toast as sonnerToast } from "sonner";
import { useNavigate } from "react-router-dom";

const COVERAGE_TYPES = [
  {
    id: "responsabilidad_civil",
    name: "Responsabilidad Civil",
    requiredPhotos: 8,
  },
  {
    id: "intermedia",
    name: "Intermedia",
    requiredPhotos: 10,
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

const GUIDE_IMAGES = {
  responsabilidad_civil: [
    {
      url: "/lovable-uploads/e4843260-f3a2-4e17-b76a-f3c89ba82d0b.png",
      title: "ADELANTE",
      instruction: "Corroborar que el vehículo no salga cortado."
    },
    {
      url: "/lovable-uploads/6a807237-2d40-4015-857d-daa8a6445e9c.png",
      title: "ATRAS",
      instruction: "Corroborar que el vehículo no salga cortado."
    },
    {
      url: "/lovable-uploads/ba8d6def-06a6-4d4b-bcf3-09ebd003304f.png",
      title: "LATERAL DERECHO",
      instruction: "Corroborar que el vehículo no salga cortado."
    },
    {
      url: "/lovable-uploads/a2ce5578-49d5-45de-9792-1925c918b841.png",
      title: "LATERAL IZQUIERDO",
      instruction: "Corroborar que el vehículo no salga cortado."
    },
    {
      url: "/lovable-uploads/345c1f59-dbce-41d5-9de9-b6aa67d209d1.png",
      title: "DEL CUENTA KM",
      instruction: "Capturar claramente los kilómetros del vehículo."
    }
  ],
  intermedia: [
    {
      url: "/lovable-uploads/e4843260-f3a2-4e17-b76a-f3c89ba82d0b.png",
      title: "ADELANTE",
      instruction: "Corroborar que el vehículo no salga cortado."
    },
    {
      url: "/lovable-uploads/6a807237-2d40-4015-857d-daa8a6445e9c.png",
      title: "ATRAS",
      instruction: "Corroborar que el vehículo no salga cortado."
    },
    {
      url: "/lovable-uploads/ba8d6def-06a6-4d4b-bcf3-09ebd003304f.png",
      title: "LATERAL DERECHO",
      instruction: "Corroborar que el vehículo no salga cortado."
    },
    {
      url: "/lovable-uploads/a2ce5578-49d5-45de-9792-1925c918b841.png",
      title: "LATERAL IZQUIERDO",
      instruction: "Corroborar que el vehículo no salga cortado."
    },
    {
      url: "/lovable-uploads/345c1f59-dbce-41d5-9de9-b6aa67d209d1.png",
      title: "DEL CUENTA KM",
      instruction: "Capturar claramente los kilómetros del vehículo."
    },
    {
      url: "/lovable-uploads/64423287-ec25-48aa-85e4-a5a5c5d7d45c.png",
      title: "RUEDA DE CERCA",
      instruction: "Para que se vea marca y medida. Si no se ve, enviar fotos más de cerca o pasarlo por escrito. Ejemplo: PIRELLI 175/70/R13."
    },
    {
      url: "/lovable-uploads/c5a0af8b-15bf-416a-b95c-b51ff174dffb.png",
      title: "RUEDA DE AUXILIO",
      instruction: "Que se vea el detalle de marca y medida de cubierta."
    }
  ]
};

const COMPANY_LOGO = "/lovable-uploads/5650f025-4ab5-4874-8ea6-a4502a7c6683.png";

const generateStepsForCoverage = (coverageType) => {
  const { requiredPhotos } = COVERAGE_TYPES.find(
    (type) => type.id === coverageType
  ) || { requiredPhotos: 2 };
  
  if (coverageType === "responsabilidad_civil") {
    const vehiclePhotos = GUIDE_IMAGES.responsabilidad_civil.map((image, index) => ({
      title: `${image.title}`,
      instruction: `${image.instruction}`,
      voiceInstruction: `Por favor, toma la foto ${index + 1}: ${image.title}. ${image.instruction}`,
      guideImage: image.url
    }));
    
    return [
      ...vehiclePhotos,
      {
        title: "Cédula Verde",
        instruction: "Toma una foto clara de la cédula verde del vehículo.",
        voiceInstruction: "Por favor, toma una foto clara de la cédula verde del vehículo.",
      },
      {
        title: "DNI",
        instruction: "Toma una foto de tu DNI (ambos lados).",
        voiceInstruction: "Por favor, toma una foto de tu DNI, asegurándote que se vean claramente ambos lados.",
      },
      {
        title: "GNC (si corresponde)",
        instruction: "Si tu vehículo tiene GNC, toma una foto del certificado.",
        voiceInstruction: "Si tu vehículo tiene instalación de GNC, por favor toma una foto del certificado. Si no aplica, puedes saltar este paso.",
        optional: true
      }
    ];
  }
  
  if (coverageType === "intermedia") {
    const vehiclePhotos = GUIDE_IMAGES.intermedia.map((image, index) => ({
      title: `${image.title}`,
      instruction: `${image.instruction}`,
      voiceInstruction: `Por favor, toma la foto ${index + 1}: ${image.title}. ${image.instruction}`,
      guideImage: image.url
    }));
    
    return [
      ...vehiclePhotos,
      {
        title: "Cédula Verde",
        instruction: "Toma una foto clara de la cédula verde del vehículo.",
        voiceInstruction: "Por favor, toma una foto clara de la cédula verde del vehículo.",
      },
      {
        title: "DNI",
        instruction: "Toma una foto de tu DNI (ambos lados).",
        voiceInstruction: "Por favor, toma una foto de tu DNI, asegurándote que se vean claramente ambos lados.",
      },
      {
        title: "GNC (si corresponde)",
        instruction: "Si tu vehículo tiene GNC, toma una foto del certificado.",
        voiceInstruction: "Si tu vehículo tiene instalación de GNC, por favor toma una foto del certificado. Si no aplica, puedes saltar este paso.",
        optional: true
      }
    ];
  }
  
  return Array.from({ length: requiredPhotos }, (_, index) => ({
    title: `Paso ${index + 1}`,
    instruction: `Captura la foto ${index + 1} siguiendo estas instrucciones...`,
    voiceInstruction: `Por favor, toma la foto ${index + 1} siguiendo estas instrucciones...`
  }));
};

const Process = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [hasGNC, setHasGNC] = useState<boolean | null>(null);
  const [userLocation, setUserLocation] = useState<string>("Ubicación no disponible");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [coverageType, setCoverageType] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();
  const conversation = useConversation();

  useEffect(() => {
    const storedCoverageType = sessionStorage.getItem("coverageType");
    if (storedCoverageType) {
      setCoverageType(storedCoverageType);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, selecciona un tipo de cobertura primero"
      });
      navigate("/coverage-selection");
    }
  }, [navigate, toast]);

  useEffect(() => {
    if (coverageType) {
      setSteps(generateStepsForCoverage(coverageType));
    }
  }, [coverageType]);

  useEffect(() => {
    const logoImg = new Image();
    logoImg.src = COMPANY_LOGO;
    logoImg.onload = () => {
      logoRef.current = logoImg;
    };
    logoImg.onerror = (e) => {
      console.error("Error cargando el logo:", e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cargar el logo de la empresa"
      });
    };
  }, []);

  const requestLocationPermission = () => {
    setIsGettingLocation(true);
    setPermissionDenied(false);
    
    if (!navigator.geolocation) {
      setUserLocation("Geolocalización no soportada en este dispositivo");
      setIsGettingLocation(false);
      return;
    }
    
    navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
      console.log("Estado del permiso de geolocalización:", permissionStatus.state);
      
      if (permissionStatus.state === 'denied') {
        setPermissionDenied(true);
        setUserLocation("Permiso de ubicación denegado");
        setIsGettingLocation(false);
        
        toast({
          variant: "destructive",
          title: "Permiso denegado",
          description: "Has bloqueado el acceso a tu ubicación. Revisa la configuración de tu navegador para permitir el acceso."
        });
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`);
          setIsGettingLocation(false);
          setPermissionDenied(false);
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
          
          let errorMessage = "Error al obtener ubicación";
          
          if (error.code === 1) {
            setPermissionDenied(true);
            errorMessage = "Permiso de ubicación denegado por el usuario";
          } else if (error.code === 2) {
            errorMessage = "No se pudo determinar la ubicación";
          } else if (error.code === 3) {
            errorMessage = "Tiempo de espera agotado para obtener la ubicación";
          }
          
          setUserLocation(errorMessage);
          setIsGettingLocation(false);
          
          toast({
            variant: "destructive",
            title: "Error de geolocalización",
            description: errorMessage + ". Las fotos se tomarán sin información de ubicación.",
            action: error.code === 1 ? (
              <Button 
                onClick={() => requestLocationPermission()}
                variant="outline" 
                size="sm"
              >
                Reintentar
              </Button>
            ) : undefined
          });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      if (!permissionDenied) {
        requestLocationPermission();
      } else {
        toast({
          title: "Ubicación no disponible",
          description: "Se tomarán fotos sin información de ubicación",
          action: (
            <Button 
              onClick={() => requestLocationPermission()}
              variant="outline" 
              size="sm"
            >
              Permitir ubicación
            </Button>
          )
        });
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

  const handlePhotoCapture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    const now = new Date();
    const watermarkHeight = 60;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, canvas.height - watermarkHeight, canvas.width, watermarkHeight);
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(now.toLocaleString(), 10, canvas.height - 35);
    ctx.fillText(`Ubicación: ${userLocation}`, 10, canvas.height - 15);

    if (logoRef.current) {
      const logoWidth = 100;
      const logoHeight = 40;
      const logoX = canvas.width - logoWidth - 10;
      const logoY = canvas.height - logoHeight - 10;
      
      ctx.drawImage(logoRef.current, logoX, logoY, logoWidth, logoHeight);
    }

    const photoData = canvas.toDataURL('image/jpeg');
    setPhotos([...photos, photoData]);
    setShowCamera(false);
    stopCamera();

    sonnerToast(steps[currentStep]?.title + " completado", {
      position: "bottom-center",
      duration: 1500,
      className: "text-sm bg-green-500 text-white rounded-md",
    });

    const isLastPhotoBeforeGNC = 
      (coverageType === "responsabilidad_civil" && currentStep === 6) ||
      (coverageType === "intermedia" && currentStep === 8);
    
    const isLastPhotoAndNoGNC = 
      ((coverageType === "responsabilidad_civil" || coverageType === "intermedia") && 
       currentStep === 7 && 
       hasGNC === false);

    if (isLastPhotoBeforeGNC) {
      showGNCQuestion();
    } else if (isLastPhotoAndNoGNC) {
      handleComplete();
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const showGNCQuestion = () => {
    toast({
      title: "¿Tu vehículo tiene GNC?",
      description: "Selecciona Sí o No para continuar",
      action: (
        <div className="flex gap-2 mt-2">
          <Button 
            onClick={() => handleGNCResponse(true)}
            variant="default" 
            size="sm"
          >
            Sí
          </Button>
          <Button 
            onClick={() => handleGNCResponse(false)}
            variant="outline" 
            size="sm"
          >
            No
          </Button>
        </div>
      ),
      duration: 10000,
    });
  };

  const handleGNCResponse = (hasGNCInstalled: boolean) => {
    setHasGNC(hasGNCInstalled);
    
    if (hasGNCInstalled) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    toast({
      title: "¡Proceso completado!",
      description: "Todas las fotos han sido capturadas correctamente.",
      variant: "default",
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

  const handleSkipStep = () => {
    if (steps[currentStep]?.optional) {
      toast({
        title: "Paso omitido",
        description: `Has omitido el paso: ${steps[currentStep]?.title}`,
      });
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleComplete();
      }
    }
  };

  const handleChangeCoverage = () => {
    navigate("/coverage-selection");
  };

  const selectedCoverage = COVERAGE_TYPES.find(type => type.id === coverageType);

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
          
          <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {isGettingLocation ? "Obteniendo ubicación..." : userLocation}
            {permissionDenied && (
              <Button 
                onClick={() => requestLocationPermission()}
                variant="link" 
                className="text-xs text-white p-0 ml-1 h-auto"
              >
                Activar
              </Button>
            )}
          </div>
          
          <Button
            onClick={handlePhotoCapture}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black hover:bg-gray-100"
          >
            <Camera className="w-8 h-8" />
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/fb99b0fd-7bee-4c1d-b3b5-826ccb42e7e2.png" 
              alt="Grupo Cazalá Seguros" 
              className="h-16 object-contain"
            />
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-1">
              {selectedCoverage?.name || "Cobertura"}
            </h2>
            <p className="text-sm text-gray-500">
              {selectedCoverage?.requiredPhotos} fotos requeridas
            </p>
            <Button
              onClick={handleChangeCoverage}
              variant="outline"
              className="mt-2 text-xs"
              size="sm"
            >
              Cambiar cobertura
            </Button>
          </div>

          <div className="text-center mt-6">
            <h3 className="text-lg font-bold">{steps[currentStep]?.title}</h3>
            <p className="text-gray-600 mt-2">{steps[currentStep]?.instruction}</p>
          </div>

          {steps[currentStep]?.guideImage && (
            <div className="flex justify-center my-4">
              <div className="relative border-2 border-black rounded-lg overflow-hidden">
                <img 
                  src={steps[currentStep].guideImage} 
                  alt={`Guía: ${steps[currentStep].title}`} 
                  className="max-w-full h-auto"
                  onError={(e) => {
                    console.error("Error cargando imagen de guía:", e);
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Cpath d='M75,50 L25,50 M50,25 L50,75' stroke='%23cccccc' stroke-width='4'/%3E%3C/svg%3E";
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "No se pudo cargar la imagen de guía"
                    });
                  }}
                />
              </div>
            </div>
          )}

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
              <HelpCircle className="w-5 h-5 mr-2" />
              Instrucciones
            </Button>

            {permissionDenied && (
              <Button
                onClick={() => requestLocationPermission()}
                variant="ghost"
                className="text-gray-500 hover:text-gray-800"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Ubicación
              </Button>
            )}

            {steps[currentStep]?.optional && (
              <Button
                onClick={handleSkipStep}
                variant="ghost"
                className="text-gray-500 hover:text-gray-800"
              >
                Omitir
              </Button>
            )}
          </div>

          {photos.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">
                Fotos Capturadas ({photos.length}/{hasGNC === false ? steps.length - 1 : steps.length})
              </h3>
              <div className="grid gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="photo-preview">
                    <img 
                      src={photo} 
                      alt={`${index < steps.length ? steps[index]?.title : `Foto ${index + 1}`}`} 
                      className="rounded-lg shadow-lg w-full max-w-lg mx-auto"
                    />
                    <p className="text-center text-sm text-gray-500 mt-1">
                      {index < steps.length ? steps[index]?.title : `Foto ${index + 1}`}
                    </p>
                  </div>
                ))}
              </div>

              {photos.length === (hasGNC === false ? steps.length - 1 : steps.length) && (
                <Button
                  onClick={() => {
                    toast({
                      title: "Enviando fotos",
                      description: "Las fotos se están enviando al servidor...",
                    });
                    setTimeout(() => {
                      toast({
                        title: "¡Éxito!",
                        description: "Las fotos se han enviado correctamente",
                        variant: "default",
                      });
                    }, 2000);
                  }}
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
