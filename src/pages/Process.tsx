import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Check, Send, HelpCircle, MapPin, Computer, Tv, FireExtinguisher, BellElectric, Refrigerator, X, Headphones, Images, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Stepper } from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";

const COVERAGE_TYPES = [
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
      url: "/lovable-uploads/7721fb43-8d1b-4586-8d9b-01a0043a355b.png",
      title: "DEL TABLERO",
      instruction: "Se saca desde la puerta enfocando en diagonal."
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
  ],
  terceros_completo_todo_riesgo: [
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
    },
    {
      url: "/lovable-uploads/7721fb43-8d1b-4586-8d9b-01a0043a355b.png",
      title: "DEL TABLERO",
      instruction: "Se saca desde la puerta enfocando en diagonal."
    },
    {
      url: "/lovable-uploads/62eccfdc-4004-49e4-8a71-26f0f45ecbf5.png",
      title: "DEL TECHO EXTERIOR",
      instruction: "Desde arriba por la cobertura granizo."
    },
    {
      url: "/lovable-uploads/13aeefb2-99b2-40c3-be8e-71867afdc9cb.png",
      title: "DEL PARABRISAS",
      instruction: "Desde adentro, por la cobertura Cristales."
    }
  ]
};

const BUILDING_INSTRUCTIONS = {
  edificio_incendio: [
    {
      title: "FRENTE DEL EDIFICIO",
      instruction: "Donde se vea todo el frente completo",
      voiceInstruction: "Por favor, toma una foto donde se vea todo el frente completo del edificio.",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "FONDO DEL EDIFICIO",
      instruction: "Donde se vea todo el fondo completo",
      voiceInstruction: "Ahora, toma una foto donde se vea todo el fondo completo del edificio.",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "LATERAL IZQUIERDO",
      instruction: "Donde se vea todo el lateral completo",
      voiceInstruction: "Toma una foto donde se vea todo el lateral izquierdo completo del edificio.",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "LATERAL DERECHO",
      instruction: "Donde se vea todo el lateral completo",
      voiceInstruction: "Toma una foto donde se vea todo el lateral derecho completo del edificio.",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "TABLERO ELÉCTRICO",
      instruction: "Captura claramente todo el tablero eléctrico",
      voiceInstruction: "Ahora toma una foto donde se vea claramente el tablero eléctrico.",
      icon: <BellElectric className="w-5 h-5" />
    },
    {
      title: "MATAFUEGO",
      instruction: "Si lo hubiera, toma una foto clara del matafuego",
      voiceInstruction: "Si hay matafuego o extintor, toma una foto clara del mismo. Si no hay, puedes omitir este paso.",
      icon: <FireExtinguisher className="w-5 h-5" />,
      optional: true
    }
  ],
  combinado_integral: [
    {
      title: "FRENTE DEL EDIFICIO",
      instruction: "Donde se vea todo el frente completo",
      voiceInstruction: "Por favor, toma una foto donde se vea todo el frente completo del edificio.",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "FONDO DEL EDIFICIO",
      instruction: "Donde se vea todo el fondo completo",
      voiceInstruction: "Ahora, toma una foto donde se vea todo el fondo completo del edificio.",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "LATERAL IZQUIERDO",
      instruction: "Donde se vea todo el lateral completo",
      voiceInstruction: "Toma una foto donde se vea todo el lateral izquierdo completo del edificio.",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "LATERAL DERECHO",
      instruction: "Donde se vea todo el lateral completo",
      voiceInstruction: "Toma una foto donde se vea todo el lateral derecho completo del edificio.",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "TABLERO ELÉCTRICO",
      instruction: "Captura claramente todo el tablero eléctrico",
      voiceInstruction: "Ahora toma una foto donde se vea claramente el tablero eléctrico.",
      icon: <BellElectric className="w-5 h-5" />
    },
    {
      title: "MATAFUEGO",
      instruction: "Si lo hubiera, toma una foto clara del matafuego",
      voiceInstruction: "Si hay matafuego o extintor, toma una foto clara del mismo. Si no hay, puedes omitir este paso.",
      icon: <FireExtinguisher className="w-5 h-5" />,
      optional: true
    },
    {
      title: "HELADERA",
      instruction: "Que se vea que está encendida y funcionando",
      voiceInstruction: "Toma una foto de la heladera donde se pueda ver que está encendida y funcionando.",
      icon: <Refrigerator className="w-5 h-5" />
    },
    {
      title: "TV 1",
      instruction: "Que se vea que está encendido y funcionando",
      voiceInstruction: "Toma una foto del primer televisor donde se pueda ver que está encendido y funcionando.",
      icon: <Tv className="w-5 h-5" />
    },
    {
      title: "TV 2",
      instruction: "Que se vea que está encendido y funcionando",
      voiceInstruction: "Toma una foto del segundo televisor donde se pueda ver que está encendido y funcionando.",
      icon: <Tv className="w-5 h-5" />
    },
    {
      title: "COMPUTADORA",
      instruction: "Que se vea que está encendida y funcionando",
      voiceInstruction: "Toma una foto de la computadora donde se pueda ver que está encendida y funcionando.",
      icon: <Computer className="w-5 h-5" />
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
        title: "GNC (si corresponde)",
        instruction: "Si tu vehículo tiene GNC, toma una foto del certificado.",
        voiceInstruction: "Si tu vehículo tiene instalación de GNC, por favor toma una foto del certificado. Si no aplica, puedes saltar este paso.",
        optional: true
      }
    ];
  }
  
  if (coverageType === "terceros_completo_todo_riesgo") {
    const vehiclePhotos = GUIDE_IMAGES.terceros_completo_todo_riesgo.map((image, index) => ({
      title: `${image.title}`,
      instruction: `${image.instruction}`,
      voiceInstruction: `Por favor, toma la foto ${index + 1}: ${image.title}. ${image.instruction}`,
      guideImage: image.url
    }));
    
    return [
      ...vehiclePhotos,
      {
        title: "GNC (si corresponde)",
        instruction: "Si tu vehículo tiene GNC, toma una foto del certificado.",
        voiceInstruction: "Si tu vehículo tiene instalación de GNC, por favor toma una foto del certificado. Si no aplica, puedes saltar este paso.",
        optional: true
      }
    ];
  }

  if (coverageType === "edificio_incendio") {
    return BUILDING_INSTRUCTIONS.edificio_incendio;
  }

  if (coverageType === "combinado_integral") {
    return BUILDING_INSTRUCTIONS.combinado_integral;
  }
  
  if (coverageType === "otros") {
    return Array.from({ length: requiredPhotos }, (_, index) => ({
      title: `Foto ${index + 1}`,
      instruction: `Captura la foto ${index + 1}`,
      voiceInstruction: `Por favor, toma la foto número ${index + 1}.`,
      icon: <Camera className="w-5 h-5" />
    }));
  }
  
  return Array.from({ length: requiredPhotos }, (_, index) => ({
    title: `Paso ${index + 1}`,
    instruction: `Captura la foto ${index + 1}`,
    voiceInstruction: `Por favor, toma la foto ${index + 1}.`
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
  const [currentPhotoData, setCurrentPhotoData] = useState<string | null>(null);
  const [showPhotoConfirmDialog, setShowPhotoConfirmDialog] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [photoToRetakeIndex, setPhotoToRetakeIndex] = useState<number | null>(null);
  const [locationReceived, setLocationReceived] = useState(false);
  const [autoVoiceInstructions, setAutoVoiceInstructions] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

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

  useEffect(() => {
    if (autoVoiceInstructions && steps.length > 0 && currentStep < steps.length) {
      handleVoiceInstructions();
    }
  }, [currentStep, steps]);

  const requestLocationPermission = () => {
    setIsGettingLocation(true);
    setPermissionDenied(false);
    setLocationReceived(false);
    
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
          setLocationReceived(true);
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
            description: errorMessage + ". Se requiere tu ubicación para continuar.",
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
      
      requestLocationPermission();
      
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
    
    if (!locationReceived) {
      if (isGettingLocation) {
        toast({
          variant: "default",
          title: "Espera un momento",
          description: "Obteniendo ubicación...",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Ubicación requerida",
          description: "Se requiere tu ubicación para tomar fotos.",
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
        requestLocationPermission();
      }
      return;
    }

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
    
    setCurrentPhotoData(photoData);
    setShowPhotoConfirmDialog(true);
    
    stopCamera();
    setShowCamera(false);
  };

  const confirmPhoto = () => {
    if (!currentPhotoData) return;
    
    if (photoToRetakeIndex !== null) {
      const newPhotos = [...photos];
      newPhotos[photoToRetakeIndex] = currentPhotoData;
      setPhotos(newPhotos);
      setPhotoToRetakeIndex(null);
    } else {
      setPhotos([...photos, currentPhotoData]);
    }
    
    setCurrentPhotoData(null);
    setShowPhotoConfirmDialog(false);

    sonnerToast(photoToRetakeIndex !== null ? "Foto actualizada" : steps[currentStep]?.title + " completado", {
      position: "bottom-center",
      duration: 1500,
      className: "text-sm bg-green-500 text-white rounded-md",
    });

    const isGNCStep = steps[currentStep]?.title?.includes("GNC");
    
    if (isGNCStep || currentStep >= steps.length - 1) {
      setShowPhotoGallery(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const rejectPhoto = () => {
    setCurrentPhotoData(null);
    setShowPhotoConfirmDialog(false);
    handleOpenCamera();
  };

  const handleGNCResponse = (hasGNCInstalled: boolean) => {
    setHasGNC(hasGNCInstalled);
    
    if (!hasGNCInstalled) {
      setShowPhotoGallery(true);
    }
  };

  const handleComplete = () => {
    toast({
      title: "¡Proceso completado!",
      description: "Todas las fotos han sido capturadas correctamente.",
      variant: "default",
    });
    
    setShowPhotoGallery(false);
  };

  const handleVoiceInstructions = () => {
    try {
      if (isPlayingVoice) return;
      
      setIsPlayingVoice(true);
      
      const currentInstruction = steps[currentStep]?.voiceInstruction || 
        `Por favor, toma una foto clara para ${steps[currentStep]?.title}`;
      
      const speech = new SpeechSynthesisUtterance(currentInstruction);
      speech.lang = 'es-ES';
      speech.rate = 1.0;
      speech.pitch = 1.0;
      
      speech.onend = () => {
        setIsPlayingVoice(false);
      };
      
      speech.onerror = (event) => {
        console.error("Error de síntesis de voz:", event);
        setIsPlayingVoice(false);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron reproducir las instrucciones por voz"
        });
      };
      
      if (!autoVoiceInstructions) {
        toast({
          title: "Reproduciendo instrucciones",
          description: currentInstruction,
        });
      }
      
      window.speechSynthesis.speak(speech);
      
    } catch (error) {
      console.error("Error reproduciendo instrucciones por voz:", error);
      setIsPlayingVoice(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron reproducir las instrucciones por voz"
      });
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
        setShowPhotoGallery(true);
      }
    }
  };

  const handleChangeCoverage = () => {
    navigate("/coverage-selection");
  };

  const selectedCoverage = COVERAGE_TYPES.find(type => type.id === coverageType);

  const calculateTotalSteps = () => {
    if (!steps.length) return 0;
    
    if (["responsabilidad_civil", "intermedia", "terceros_completo_todo_riesgo"].includes(coverageType)) {
      if (hasGNC === false) {
        return steps.length - 1;
      }
      return steps.length;
    }
    
    return steps.length;
  };

  const totalSteps = calculateTotalSteps();

  const getStepperLabels = () => {
    if (steps.length <= 6) {
      return steps.map(step => step.title);
    }
    
    return Array.from({ length: Math.min(6, totalSteps) }, (_, i) => {
      const stepIndex = Math.floor(i * (steps.length / Math.min(6, totalSteps)));
      return steps[stepIndex]?.title || `Paso ${i + 1}`;
    });
  };

  const handleRetakePhoto = (index: number) => {
    setPhotoToRetakeIndex(index);
    setShowPhotoGallery(false);
    handleOpenCamera();
  };

  const toggleVoiceInstructions = () => {
    setAutoVoiceInstructions(!autoVoiceInstructions);
    toast({
      title: autoVoiceInstructions ? "Instrucciones por voz desactivadas" : "Instrucciones por voz activadas",
      description: autoVoiceInstructions ? 
        "Las instrucciones por voz no se reproducirán automáticamente" : 
        "Las instrucciones por voz se reproducirán automáticamente en cada paso",
    });
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 pb-32 bg-gradient-to-b from-gray-50 to-gray-100">
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
          
          <div className="fixed bottom-10 inset-x-0 flex justify-center z-50">
            <Button
              onClick={handlePhotoCapture}
              className={`w-24 h-24 rounded-full hover:bg-gray-100 shadow-lg border-4 ${locationReceived ? 'bg-white text-black border-black' : 'bg-gray-300 text-gray-500 border-gray-400'}`}
              size="icon"
              disabled={!locationReceived}
            >
              <Camera className="w-12 h-12" />
            </Button>
          </div>
          
          {!locationReceived && !permissionDenied && (
            <div className="fixed bottom-28 inset-x-0 flex justify-center">
              <div className="bg-red-500 text-white px-4 py-2 rounded-full animate-pulse text-sm font-bold">
                Esperando ubicación...
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center mb-2 sm:mb-4">
            <img 
              src={COMPANY_LOGO} 
              alt="Logo Cazalá Seguros" 
              className="h-8 sm:h-10 object-contain"
            />
            <div className="flex space-x-2">
              <Button 
                onClick={toggleVoiceInstructions}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                {autoVoiceInstructions ? <Volume2 className="w-4 h-4 mr-1" /> : <VolumeX className="w-4 h-4 mr-1" />}
                <span className="hidden sm:inline">
                  {autoVoiceInstructions ? "Voz activada" : "Voz desactivada"}
                </span>
              </Button>
              <Button 
                onClick={handleChangeCoverage}
                variant="outline"
                size="sm"
              >
                Cambiar cobertura
              </Button>
            </div>
          </div>
          
          {selectedCoverage && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h2 className="text-lg font-medium mb-1">Cobertura seleccionada</h2>
              <p className="text-gray-600">{selectedCoverage.name}</p>
              <div className="mt-2 flex items-center">
                <span className="text-sm text-gray-500 mr-2">Fotos requeridas:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  {totalSteps}
                </span>
              </div>
            </div>
          )}
          
          {showPhotoGallery ? (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Galería de fotos</h2>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setShowPhotoGallery(false)}
                    variant="outline"
                    size="sm"
                  >
                    Volver
                  </Button>
                  <Button
                    onClick={handleComplete}
                    size="sm"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Completar
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={photo} 
                      alt={`Foto ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      onClick={() => handleRetakePhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-md"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs px-2 py-1">
                      {steps[index]?.title || `Foto ${index + 1}`}
                    </div>
                  </div>
                ))}
              </div>
              
              {photos.length < steps.length && (
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() => {
                      setShowPhotoGallery(false);
                      setCurrentStep(photos.length);
                    }}
                    variant="outline"
                  >
                    <Camera className="w-4 h-4 mr-1" />
                    Continuar con las fotos
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Stepper 
                steps={totalSteps}
                currentStep={currentStep}
              />
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {steps[currentStep]?.title || "Foto"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {steps[currentStep]?.instruction || "Toma una foto clara"}
                  </p>
                </div>
                
                {steps[currentStep]?.guideImage && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={steps[currentStep].guideImage}
                      alt="Guía de captura"
                      className="max-w-full h-48 object-contain border border-gray-200 rounded-md"
                    />
                  </div>
                )}
                
                <div className="flex flex-col space-y-3">
                  <Button
                    onClick={handleOpenCamera}
                    className="w-full"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Tomar foto
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleVoiceInstructions}
                      variant="outline"
                      className="flex-1"
                    >
                      <Headphones className="w-5 h-5 mr-2" />
                      Instrucciones
                    </Button>
                    
                    {steps[currentStep]?.optional && (
                      <Button
                        onClick={handleSkipStep}
                        variant="outline"
                        className="flex-1"
                      >
                        <X className="w-5 h-5 mr-2" />
                        Omitir
                      </Button>
                    )}
                  </div>
                </div>
                
                {currentStep > 0 && (
                  <div className="mt-4 flex justify-center">
                    <Button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      variant="ghost"
                      size="sm"
                    >
                      Volver al paso anterior
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
          
          {photos.length > 0 && !showPhotoGallery && (
            <div className="flex justify-center mt-4">
              <Button 
                onClick={() => setShowPhotoGallery(true)}
                variant="outline"
              >
                <Images className="w-5 h-5 mr-2" />
                Ver todas las fotos ({photos.length})
              </Button>
            </div>
          )}
        </div>
      )}
      
      <Dialog open={showPhotoConfirmDialog} onOpenChange={setShowPhotoConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar foto</DialogTitle>
            <DialogDescription>
              ¿La foto es clara y muestra correctamente lo que necesitas?
            </DialogDescription>
          </DialogHeader>
          
          {currentPhotoData && (
            <div className="flex justify-center my-2">
              <img 
                src={currentPhotoData} 
                alt="Foto capturada" 
                className="max-h-60 rounded-md"
              />
            </div>
          )}
          
          <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
            <Button 
              onClick={rejectPhoto} 
              variant="outline"
              className="sm:flex-1"
            >
              <X className="w-5 h-5 mr-2" />
              Repetir
            </Button>
            <Button 
              onClick={confirmPhoto}
              className="sm:flex-1"
            >
              <Check className="w-5 h-5 mr-2" />
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Process;
