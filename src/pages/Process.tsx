
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
      instruction: "Aléjate para que se vea todo el vehículo y asegúrate de que no salga cortado."
    },
    {
      url: "/lovable-uploads/6a807237-2d40-4015-857d-daa8a6445e9c.png",
      title: "ATRAS",
      instruction: "Aléjate para que se vea todo el vehículo y asegúrate de que no salga cortado."
    },
    {
      url: "/lovable-uploads/ba8d6def-06a6-4d4b-bcf3-09ebd003304f.png",
      title: "LATERAL DERECHO",
      instruction: "Aléjate para que se vea todo el vehículo y asegúrate de que no salga cortado."
    },
    {
      url: "/lovable-uploads/a2ce5578-49d5-45de-9792-1925c918b841.png",
      title: "LATERAL IZQUIERDO",
      instruction: "Aléjate para que se vea todo el vehículo y asegúrate de que no salga cortado."
    },
    {
      url: "/lovable-uploads/345c1f59-dbce-41d5-9de9-b6aa67d209d1.png",
      title: "DEL CUENTA KM",
      instruction: "Captura los kilómetros del vehículo y verifica que se lean bien."
    }
  ],
  intermedia: [
    {
      url: "/lovable-uploads/e4843260-f3a2-4e17-b76a-f3c89ba82d0b.png",
      title: "ADELANTE",
      instruction: "Aléjate para que se vea todo el vehículo y asegúrate de que no salga cortado."
    },
    {
      url: "/lovable-uploads/6a807237-2d40-4015-857d-daa8a6445e9c.png",
      title: "ATRAS",
      instruction: "Aléjate para que se vea todo el vehículo y asegúrate de que no salga cortado."
    },
    {
      url: "/lovable-uploads/ba8d6def-06a6-4d4b-bcf3-09ebd003304f.png",
      title: "LATERAL DERECHO",
      instruction: "Aléjate para que se vea todo el vehículo y asegúrate de que no salga cortado."
    },
    {
      url: "/lovable-uploads/a2ce5578-49d5-45de-9792-1925c918b841.png",
      title: "LATERAL IZQUIERDO",
      instruction: "Aléjate para que se vea todo el vehículo y asegúrate de que no salga cortado."
    },
    {
      url: "/lovable-uploads/345c1f59-dbce-41d5-9de9-b6aa67d209d1.png",
      title: "DEL CUENTA KM",
      instruction: "Captura los kilómetros del vehículo y verifica que se lean bien."
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
      instruction: "Aléjate para que se vea todo el vehículo y asegúrate de que no salga cortado."
    },
    {
      url: "/lovable-uploads/6a807237-2d40-4015-857d-daa8a6445e9c.png",
      title: "ATRAS",
      instruction: "Aléjate para que se vea todo el vehículo y asegúrate de que no salga cortado."
    },
    {
      url: "/lovable-uploads/ba8d6def-06a6-4d4b-bcf3-09ebd003304f.png",
      title: "LATERAL DERECHO",
      instruction: "Aléjate para que se vea todo el vehículo y asegúrate de que no salga cortado."
    },
    {
      url: "/lovable-uploads/a2ce5578-49d5-45de-9792-1925c918b841.png",
      title: "LATERAL IZQUIERDO",
      instruction: "Aléjate para que se vea todo el vehículo y asegúrate de que no salga cortado."
    },
    {
      url: "/lovable-uploads/345c1f59-dbce-41d5-9de9-b6aa67d209d1.png",
      title: "DEL CUENTA KM",
      instruction: "Captura los kilómetros del vehículo y verifica que se lean bien."
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
          
          <div className="fixed top-4 right-4 flex space-x-2">
            <Button
              variant="outline" 
              size="icon"
              className="bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
              onClick={toggleVoiceInstructions}
            >
              {autoVoiceInstructions ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>
            
            <Button
              variant="outline" 
              size="icon"
              className="bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
              onClick={() => setShowCamera(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="fixed bottom-32 left-4">
            {steps[currentStep]?.optional && (
              <Button
                variant="outline"
                size="sm"
                className="bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
                onClick={handleSkipStep}
              >
                Omitir paso
              </Button>
            )}
          </div>
          
          <div className="fixed bottom-32 right-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
              onClick={handleVoiceInstructions}
              disabled={isPlayingVoice}
            >
              <Headphones className="w-4 h-4 mr-1" />
              Escuchar
            </Button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Inspección</h1>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleChangeCoverage}
              >
                Cambiar cobertura
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={toggleVoiceInstructions}
                className={autoVoiceInstructions ? "bg-green-50 text-green-600" : ""}
              >
                {autoVoiceInstructions ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          {selectedCoverage && (
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">{selectedCoverage.name}</h2>
              <p className="text-sm text-gray-500">Fotos requeridas: {selectedCoverage.requiredPhotos}</p>
            </div>
          )}
          
          {showPhotoGallery ? (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Galería de fotos</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowPhotoGallery(false)}
                >
                  Volver
                </Button>
              </div>
              
              <div className="space-y-6">
                {photos.map((photo, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="p-2 bg-gray-50 border-b flex justify-between items-center">
                      <span className="font-medium">
                        {index < steps.length ? steps[index]?.title : `Foto ${index + 1}`}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRetakePhoto(index)}
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Volver a tomar
                      </Button>
                    </div>
                    <img 
                      src={photo} 
                      alt={`Foto ${index + 1}`}
                      className="w-full object-contain max-h-80"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={handleComplete}>
                  <Check className="w-4 h-4 mr-2" />
                  Finalizar inspección
                </Button>
              </div>
            </div>
          ) : showPhotoConfirmDialog ? (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">¿Confirmar esta foto?</h2>
              
              <div className="border rounded-lg overflow-hidden mb-4">
                <div className="p-2 bg-gray-50 border-b">
                  <span className="font-medium">
                    {steps[currentStep]?.title || `Foto ${currentStep + 1}`}
                  </span>
                </div>
                {currentPhotoData && (
                  <img 
                    src={currentPhotoData} 
                    alt="Foto capturada"
                    className="w-full object-contain max-h-80"
                  />
                )}
              </div>
              
              <div className="flex space-x-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={rejectPhoto}
                >
                  <X className="w-4 h-4 mr-2" />
                  Volver a tomar
                </Button>
                <Button 
                  onClick={confirmPhoto}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Confirmar
                </Button>
              </div>
            </div>
          ) : steps[currentStep]?.title?.includes("GNC") && hasGNC === null ? (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">¿Tu vehículo tiene instalación de GNC?</h2>
              
              <div className="flex space-x-2 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => handleGNCResponse(false)}
                >
                  No
                </Button>
                <Button 
                  onClick={() => handleGNCResponse(true)}
                >
                  Sí, tiene GNC
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Stepper steps={totalSteps} currentStep={currentStep} />
              
              <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
                {steps[currentStep]?.guideImage ? (
                  <div className="flex flex-col sm:flex-row items-center mb-4">
                    <div className="sm:w-1/2 mb-4 sm:mb-0 sm:mr-4">
                      <img 
                        src={steps[currentStep].guideImage} 
                        alt="Imagen de guía"
                        className="w-full rounded border"
                      />
                    </div>
                    
                    <div className="sm:w-1/2">
                      <h2 className="text-lg font-semibold">{steps[currentStep]?.title}</h2>
                      <p className="text-gray-600 mb-4">{steps[currentStep]?.instruction}</p>
                      
                      <Button 
                        onClick={handleOpenCamera}
                        className="w-full"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Tomar foto
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h2 className="text-lg font-semibold mb-2">
                      {steps[currentStep]?.title || `Paso ${currentStep + 1}`}
                    </h2>
                    
                    <div className="flex justify-center mb-4">
                      {steps[currentStep]?.icon || <Camera className="w-12 h-12 text-gray-400" />}
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      {steps[currentStep]?.instruction || "Toma una foto clara siguiendo las instrucciones"}
                    </p>
                    
                    <Button 
                      onClick={handleOpenCamera}
                      className="w-full sm:w-auto"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Tomar foto
                    </Button>
                    
                    {steps[currentStep]?.optional && (
                      <Button 
                        variant="outline"
                        onClick={handleSkipStep}
                        className="w-full sm:w-auto mt-2 sm:ml-2"
                      >
                        Omitir paso
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              {photos.length > 0 && (
                <div className="mb-6">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowPhotoGallery(true)}
                  >
                    <Images className="w-4 h-4 mr-2" />
                    Ver fotos ({photos.length}/{totalSteps})
                  </Button>
                </div>
              )}
              
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-md font-medium mb-2">¿Necesitas ayuda?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Si tienes alguna duda durante el proceso de inspección, no dudes en contactarnos.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // Show help dialog or contact options
                    toast({
                      title: "Soporte",
                      description: "Puedes llamarnos al 0800-123-4567 para recibir asistencia."
                    });
                  }}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Obtener ayuda
                </Button>
              </div>
            </>
          )}
        </div>
      )}
      
      <Dialog open={isGettingLocation && !showCamera && !locationReceived}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Obteniendo ubicación</DialogTitle>
            <DialogDescription>
              Por favor, espera mientras obtenemos tu ubicación. Esto es necesario para continuar con la inspección.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Process;
