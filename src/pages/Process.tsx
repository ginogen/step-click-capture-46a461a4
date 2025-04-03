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
import { supabase } from "@/integrations/supabase/client";

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
    id: "terceros_completo_todo_riesgo",
    name: "Terceros Completo / Todo Riesgo",
    requiredPhotos: 13,
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
    },
    {
      url: "/lovable-uploads/64423287-ec25-48aa-85e4-a5a5c5d7d45c.png",
      title: "RUEDA DE CERCA",
      instruction: "Para que se vea marca y medida. Si no se ve, enviar fotos más de cerca o pasarlo por escrito. Ejemplo: PIRELLI 175/70/R13."
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
      url: "/lovable-uploads/7721fb43-8d1b-4586-8d9b-01a0043a355b.png",
      title: "DEL TABLERO",
      instruction: "Se saca desde la puerta enfocando en diagonal."
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

const COMPANY_LOGO = "/lovable-uploads/21f48b1c-97c2-4940-b039-01abe41b8de9.png";

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
  const [isSendingPhotos, setIsSendingPhotos] = useState(false);
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
    if (locationReceived) return;
    
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
      
      if (!locationReceived) {
        requestLocationPermission();
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
      if (currentStep < steps.length - 1) {
        setCurrentStep(steps.length - 1);
      }
      setShowPhotoGallery(true);
    }
  };

  const handleComplete = async () => {
    if (isSendingPhotos) return;
    
    setIsSendingPhotos(true);
    
    toast({
      title: "Enviando fotos...",
      description: "Estamos enviando las fotos a nuestro equipo.",
      variant: "default",
    });
    
    try {
      const selectedCoverage = COVERAGE_TYPES.find(type => type.id === coverageType);
      
      const response = await supabase.functions.invoke('send-inspection-photos', {
        body: {
          photos,
          coverageType: selectedCoverage?.name || coverageType,
          userInfo: {
            location: userLocation
          }
        },
      });
      
      if (!response.data?.success) {
        throw new Error(response.data?.error || "Error al enviar las fotos");
      }
      
      toast({
        title: "¡Fotos enviadas con éxito!",
        description: "Gracias por completar el proceso. Nuestro equipo revisará la información.",
        variant: "default",
      });
      
      setTimeout(() => {
        navigate("/welcome");
      }, 3000);
      
    } catch (error) {
      console.error("Error al enviar fotos:", error);
      toast({
        title: "Error al enviar fotos",
        description: "Hubo un problema al enviar las fotos. Por favor, intenta nuevamente más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSendingPhotos(false);
      setShowPhotoGallery(false);
    }
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
      
      const isGNCStep = steps[currentStep]?.title?.includes("GNC");
      
      if (isGNCStep) {
        setHasGNC(false);
        
        if (currentStep < steps.length - 1) {
          setCurrentStep(steps.length - 1);
        }
        setShowPhotoGallery(true);
      } else if (currentStep < steps.length - 1) {
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
      return steps[stepIndex]?.title || `Paso ${stepIndex + 1}`;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!showCamera && !showPhotoConfirmDialog && !showPhotoGallery && (
        <div className="p-4 flex-1 flex flex-col">
          <div className="w-full max-w-lg mx-auto flex-1 flex flex-col">
            <div className="flex justify-center mb-6">
              <img 
                src={COMPANY_LOGO} 
                alt="Grupo Cazalá Seguros" 
                className="h-14 object-contain"
              />
            </div>
            
            <Stepper 
              steps={totalSteps}
              currentStep={currentStep}
            />
            
            <div className="bg-gray-50 border rounded-lg shadow-sm p-6 mb-4 flex-1">
              <h2 className="text-xl font-semibold text-center mb-4">
                {steps[currentStep]?.title || "Capturar foto"}
              </h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                {steps[currentStep]?.guideImage && (
                  <div className="relative">
                    <img 
                      src={steps[currentStep].guideImage} 
                      alt={`Guía para ${steps[currentStep].title}`}
                      className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 text-white px-4 py-2 rounded-full font-medium">
                        Ejemplo
                      </div>
                    </div>
                  </div>
                )}
                
                <p className="text-gray-600 text-center">
                  {steps[currentStep]?.instruction || "Captura una foto clara y bien iluminada"}
                </p>
                
                {steps[currentStep]?.title?.includes("GNC") && hasGNC === null && (
                  <div className="w-full max-w-md p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <h3 className="font-medium text-blue-900 mb-2">
                      ¿Tu vehículo tiene GNC instalado?
                    </h3>
                    <div className="flex space-x-4 justify-center mt-2">
                      <Button 
                        onClick={() => handleGNCResponse(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Sí, tiene GNC
                      </Button>
                      <Button 
                        onClick={() => handleGNCResponse(false)}
                        variant="outline"
                      >
                        No tiene GNC
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col items-center justify-center w-full space-y-4">
                  <Button 
                    onClick={handleOpenCamera} 
                    className="w-full max-w-xs flex items-center justify-center text-lg py-6 bg-green-600 hover:bg-green-700"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Tomar foto
                  </Button>
                  
                  {steps[currentStep]?.optional && (
                    <Button 
                      onClick={handleSkipStep}
                      variant="outline"
                      className="text-gray-500"
                    >
                      Omitir este paso
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-voice"
                  checked={autoVoiceInstructions}
                  onCheckedChange={setAutoVoiceInstructions}
                />
                <label 
                  htmlFor="auto-voice" 
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Auto-instrucciones por voz
                </label>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleVoiceInstructions}
                disabled={isPlayingVoice}
                className="text-gray-600"
              >
                {isPlayingVoice ? (
                  <VolumeX className="h-5 w-5 mr-1" />
                ) : (
                  <Volume2 className="h-5 w-5 mr-1" />
                )}
                {isPlayingVoice ? 'Deteniendo...' : 'Instrucciones'}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleChangeCoverage}
                className="text-gray-600"
              >
                Cambiar cobertura
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {showCamera && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="relative flex-1 overflow-hidden">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="absolute inset-0 h-full w-full object-cover" 
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-sm mb-2">{steps[currentStep]?.instruction}</p>
              <p className="text-white text-xs opacity-80">{userLocation}</p>
            </div>
          </div>
          
          <div className="p-4 bg-black flex items-center justify-between">
            <Button 
              onClick={() => {
                stopCamera();
                setShowCamera(false);
              }}
              variant="ghost"
              className="text-white"
            >
              <X className="h-6 w-6" />
            </Button>
            
            <Button 
              onClick={handlePhotoCapture}
              className="rounded-full h-16 w-16 p-0 bg-white flex items-center justify-center"
            >
              <div className="rounded-full h-14 w-14 border-2 border-black"></div>
            </Button>
            
            <Button 
              onClick={handleVoiceInstructions}
              variant="ghost"
              className="text-white"
              disabled={isPlayingVoice}
            >
              {isPlayingVoice ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      )}
      
      <Dialog open={showPhotoConfirmDialog} onOpenChange={setShowPhotoConfirmDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Confirmar foto</DialogTitle>
            <DialogDescription>
              ¿La foto se ve bien? Si no es así, puedes volver a tomarla.
            </DialogDescription>
          </DialogHeader>
          
          {currentPhotoData && (
            <div className="p-1 border rounded-lg overflow-hidden">
              <img 
                src={currentPhotoData} 
                alt="Foto capturada" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={rejectPhoto}
              variant="outline"
              className="sm:w-1/2"
            >
              <X className="mr-2 h-4 w-4" />
              Tomar de nuevo
            </Button>
            <Button 
              onClick={confirmPhoto}
              className="sm:w-1/2 bg-green-600 hover:bg-green-700"
            >
              <Check className="mr-2 h-4 w-4" />
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showPhotoGallery} onOpenChange={setShowPhotoGallery}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resumen de fotos</DialogTitle>
            <DialogDescription>
              Verifica las fotos antes de enviarlas. Puedes volver a tomar cualquiera de ellas si es necesario.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img 
                  src={photo} 
                  alt={`Foto ${index + 1}`} 
                  className="w-full h-auto rounded-lg border"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button 
                    onClick={() => {
                      setPhotoToRetakeIndex(index);
                      setShowPhotoGallery(false);
                      handleOpenCamera();
                    }}
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-white/20"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Repetir
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-xs rounded-b-lg">
                  {steps[index]?.title || `Foto ${index + 1}`}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-md">
            <p className="text-blue-700 text-sm">
              <MapPin className="inline-block w-4 h-4 mr-1" />
              Las fotos contienen información de ubicación y hora para validación.
            </p>
          </div>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
            <Button 
              onClick={() => setShowPhotoGallery(false)}
              variant="outline"
              className="sm:flex-1"
            >
              <X className="mr-2 h-4 w-4" />
              Seguir editando
            </Button>
            <Button 
              onClick={handleComplete}
              className="sm:flex-1 bg-green-600 hover:bg-green-700"
              disabled={isSendingPhotos || photos.length < 1}
            >
              {isSendingPhotos ? (
                <>Enviando...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar fotos
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Process;
