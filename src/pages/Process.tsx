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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      title: "LATERAL IZQUIERDO DEL EDIFICIO",
      instruction: "Donde se vea todo el lateral completo",
      voiceInstruction: "Toma una foto donde se vea todo el lateral izquierdo completo del edificio.",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "LATERAL DERECHO DEL EDIFICIO",
      instruction: "Donde se vea todo el lateral derecho completo",
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
      title: "LATERAL IZQUIERDO DEL EDIFICIO",
      instruction: "Donde se vea todo el lateral completo",
      voiceInstruction: "Toma una foto donde se vea todo el lateral izquierdo completo del edificio.",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "LATERAL DERECHO DEL EDIFICIO",
      instruction: "Donde se vea todo el lateral derecho completo",
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
      title: "TV 2 / otro",
      instruction: "Que se vea que está encendido y funcionando",
      voiceInstruction: "Toma una foto del segundo televisor donde se pueda ver que está encendido y funcionando.",
      icon: <Tv className="w-5 h-5" />
    },
    {
      title: "COMPUTADORA / OTRO",
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
        optional: true,
        guideImage: "/lovable-uploads/gnc-certificate.jpg"
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
        optional: true,
        guideImage: "/lovable-uploads/gnc-certificate.jpg"
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
        optional: true,
        guideImage: "/lovable-uploads/gnc-certificate.jpg"
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
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [userName, setUserName] = useState("");
  const [nameError, setNameError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
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
                className="text-xs text-white p-0 ml-1 h-auto"
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
    
    if (hasGNCInstalled) {
      const gncStep = steps.find(step => step.title?.includes("GNC"));
      if (gncStep) {
        gncStep.guideImage = "/lovable-uploads/gnc-certificate.jpg";
        gncStep.optional = false;
      }
    } else {
      if (currentStep < steps.length - 1) {
        setCurrentStep(steps.length - 1);
      }
      setShowPhotoGallery(true);
    }
  };

  const handleComplete = async () => {
    if (isSendingPhotos) return;
    
    setShowNameDialog(true);
  };

  const handleSendPhotos = async () => {
    if (isSendingPhotos || !userName.trim()) {
      if (!userName.trim()) {
        setNameError("Por favor, ingresa tu nombre completo");
      }
      return;
    }
    
    setIsSendingPhotos(true);
    setShowNameDialog(false);
    
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
            location: userLocation,
            fullName: userName.trim()
          }
        },
      });
      
      if (!response.data?.success) {
        throw new Error(response.data?.error || "Error al enviar las fotos");
      }
      
      setShowSuccessDialog(true);
      
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
      const isMatafuegoStep = steps[currentStep]?.title?.includes("MATAFUEGO");
      
      if (isGNCStep) {
        setHasGNC(false);
        
        if (currentStep < steps.length - 1) {
          setCurrentStep(steps.length - 1);
        }
        setShowPhotoGallery(true);
      } else if (isMatafuegoStep) {
        if (currentStep >= steps.length - 1 || 
            (["edificio_incendio", "combinado_integral"].includes(coverageType) && 
             currentStep === steps.length - 2)) {
          setShowPhotoGallery(true);
        } else {
          setCurrentStep(currentStep + 1);
        }
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
    
    if (["edificio_incendio", "combinado_integral"].includes(coverageType)) {
      const matafuegoStep = steps.find(step => step.title?.includes("MATAFUEGO"));
      if (matafuegoStep?.optional === true && photos.length === steps.length - 1) {
        return steps.length - 1;
      }
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
    <div className="min-h-screen p-2 sm:p-4 pb-32 bg-white">
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
              alt="Logo Grupo Cazalá Seguros" 
              className="h-8 sm:h-10 object-contain"
            />
            <div className="flex flex-col items-end">
              <p className="text-sm font-medium text-gray-800">
                {selectedCoverage?.name || "Cobertura"}
              </p>
              <Button
                onClick={handleChangeCoverage}
                variant="outline"
                className="text-xs px-1.5 py-0.5 h-6 mt-1"
                size="sm"
              >
                Cambiar
              </Button>
            </div>
          </div>
          
          <Stepper 
            steps={totalSteps} 
            currentStep={currentStep} 
          />

          <div className="flex justify-end items-center -mt-2 mb-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600">{autoVoiceInstructions ? 'Voz automática activada' : 'Voz automática desactivada'}</span>
              <Switch
                checked={autoVoiceInstructions}
                onCheckedChange={toggleVoiceInstructions}
                aria-label="Instrucciones por voz automáticas"
              />
              {autoVoiceInstructions ? <Volume2 className="h-3.5 w-3.5 text-green-600" /> : <VolumeX className="h-3.5 w-3.5 text-gray-400" />}
            </div>
          </div>

          <div className="text-center mt-4 sm:mt-6">
            <div className="flex flex-col items-center">
              <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                {steps[currentStep]?.icon && (
                  <span className="text-gray-700">{steps[currentStep]?.icon}</span>
                )}
                {steps[currentStep]?.title}
              </h3>
              
              <div className="mt-4 p-4 sm:p-5 bg-blue-50 rounded-lg w-full max-w-md border border-blue-100 shadow-sm">
                <p className="font-bold text-left text-base sm:text-lg mb-3 sm:mb-4">Instrucciones para tomar la foto:</p>
                <p className="text-gray-700 text-left text-base sm:text-base p-3 sm:p-4 bg-white rounded border border-blue-100">
                  {steps[currentStep]?.instruction}
                </p>
              </div>
            </div>

            {steps[currentStep]?.guideImage && (
              <div className="relative border-2 border-gray-200 rounded-lg mt-5 sm:mt-6 mx-auto max-w-sm">
                <img 
                  src={steps[currentStep].guideImage} 
                  alt={`Guía: ${steps[currentStep].title}`}
                  className="w-full rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23f0f0f0'%3E%3Cpath d='M75,50 L25,50 M50,25 L50,75' stroke='%23cccccc' stroke-width='4'/%3E%3C/svg%3E";
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "No se pudo cargar la imagen de guía"
                    });
                  }}
                />
                
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-tr-md">
                  FOTO DE EJEMPLO
                </div>
              </div>
            )}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-3 sm:p-4 flex flex-col items-center z-50">
            <Button
              onClick={handleOpenCamera}
              className="w-full h-12 sm:h-14 mb-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
            >
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Tomar Foto
            </Button>
            
            <Button
              onClick={handleVoiceInstructions}
              variant="outline"
              className="w-full h-9 sm:h-10 mb-2 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg"
              disabled={isPlayingVoice}
            >
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Instrucciones por Voz
            </Button>

            {photos.length > 0 && (
              <Button
                onClick={() => setShowPhotoGallery(true)}
                variant="outline"
                className="w-full h-9 sm:h-10 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-lg"
              >
                <Images className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Ver Fotos Tomadas ({photos.length}/{totalSteps})
              </Button>
            )}

            {steps[currentStep]?.optional && (
              <Button
                onClick={handleSkipStep}
                variant="ghost"
                className="mt-1 sm:mt-2 text-gray-500 hover:text-gray-700"
                size="sm"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Omitir paso (opcional)
              </Button>
            )}
          </div>
        </div>
      )}

      <Dialog open={showPhotoConfirmDialog} onOpenChange={setShowPhotoConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>¿La foto se tomó correctamente?</DialogTitle>
            <DialogDescription>
              Verifica que la imagen sea clara y cumpla con los requisitos
            </DialogDescription>
          </DialogHeader>
          
          <img 
            src={currentPhotoData} 
            alt="Foto capturada" 
            className="rounded-lg shadow-md w-full"
          />
          
          <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
            <Button 
              type="button" 
              variant="destructive" 
              onClick={rejectPhoto}
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              No, volver a tomar
            </Button>
            <Button 
              type="button" 
              onClick={confirmPhoto}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Check className="w-4 h-4 mr-2" />
              Sí, continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPhotoGallery} onOpenChange={setShowPhotoGallery}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Revisión de Fotos</DialogTitle>
            <DialogDescription>
              Revisa todas las fotos capturadas. Puedes volver a tomar cualquier foto si es necesario.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4 overflow-y-auto" style={{ maxHeight: "calc(70vh - 150px)" }}>
            {photos.map((photo, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-2 relative">
                <img 
                  src={photo} 
                  alt={`${index < steps.length ? steps[index]?.title : `Foto ${index + 1}`}`} 
                  className="rounded-lg shadow-sm w-full"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm font-medium">
                    <span className="font-bold">{index + 1}/{photos.length}:</span> {index < steps.length ? steps[index]?.title : `Foto ${index + 1}`}
                  </p>
                  <Button 
                    onClick={() => handleRetakePhoto(index)} 
                    size="sm" 
                    variant="outline"
                    className="text-xs"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Volver a tomar
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="sticky bottom-0 pt-3 bg-white border-t border-gray-200">
            {photos.length < totalSteps ? (
              <Button 
                onClick={() => setShowPhotoGallery(false)}
                className="w-full"
              >
                Continuar tomando fotos ({photos.length}/{totalSteps})
              </Button>
            ) : (
              <Button 
                onClick={handleComplete}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isSendingPhotos}
              >
                {isSendingPhotos ? (
                  <>Enviando fotos...</>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar todas las fotos
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ingresa tu nombre completo</DialogTitle>
            <DialogDescription>
              Para completar el proceso, necesitamos tu nombre completo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                placeholder="Ej: Juan Pérez"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  if (e.target.value.trim()) {
                    setNameError("");
                  }
                }}
                className={nameError ? "border-red-500" : ""}
              />
              {nameError && (
                <p className="text-sm text-red-500">{nameError}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowNameDialog(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="button" 
              onClick={handleSendPhotos}
              disabled={!userName.trim() || isSendingPhotos}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSendingPhotos ? "Enviando..." : "Enviar fotos"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-600 flex items-center justify-center gap-2">
              <Check className="w-6 h-6" />
              ¡ÉXITO!
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6">
            <p className="text-xl font-bold text-gray-900">
              SUS FOTOS FUERON ENVIADAS CON ÉXITO
            </p>
            <p className="mt-2 text-gray-600">
              Gracias por completar el proceso. Nuestro equipo revisará la información.
            </p>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => {
                setShowSuccessDialog(false);
                navigate("/welcome");
              }}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Finalizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Process;
