
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera as CapacitorCamera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
import { loadModel, predictImage, isModelReady, Prediction } from '@/services/modelService';
import { RefreshCw, SwitchCamera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CameraComponent: React.FC<{ 
  onPredictionsUpdate: (predictions: Prediction[]) => void;
  setIsLoading: (loading: boolean) => void;
}> = ({ 
  onPredictionsUpdate,
  setIsLoading
}) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false); // Set default to rear camera
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const animationRef = useRef<number>();
  const navigate = useNavigate();

  const fishNameToId: Record<string, number> = {
    "Devil Rays": 2,
    "Giant Guitarfishes": 3,
    "Great White Shark": 4,
    "Great Hammerhead Shark": 5,
    "Whale Shark": 6,
    "Smooth Hammerhead Shark": 7,
    "Scalloped Hammerhead Shark": 8,
    "Shortfin Mako Shark": 9,
    "Longfin Mako Shark": 10,
    "Manta Rays": 11,
    "Oceanic White-tip Shark": 12,
    "Porbeagle Shark": 13,
    "Sawfish": 14,
    "Seahorses": 15,
    "Silky Shark": 16,
    "White Teatfish": 17,
    "Black Teatfish": 18,
    "Thresher Sharks": 19,
    "Wedgefishes": 20,
    
    "Orange-Spotted Grouper": 21,
    "Leopard Coral Trout": 22,
    "Spotted Coral Trout": 23,
    "Malabar Grouper": 24,
    "Honeycomb Grouper": 25,
    "Chocolate Hind": 26,
    "Brown-Marbled Grouper": 27,
    "Giant Grouper": 28,
    "Greasy Grouper": 29,
    "Barramundi": 30,
    "Red Snapper": 31,
    "John Dory": 32,
    "Sea Bream": 33,
    "Silver Pomfret": 34,
    "Threadfin Bream": 35,
    "Blacktip Reef Shark": 36,
    "Golden Pomfret": 37,
    "Yellowfin Tuna": 38,
    "Milkfish": 39,
    "Tilapia": 40,
    
    "Shark": 4,
    "Grouper": 21,
    "Tuna": 38,
    "Mako Shark": 9,
    "Hammerhead": 5,
    "Coral Trout": 22,
    "Snapper": 31,
    "Pomfret": 34,
    "Rays": 2,
    "Seahorse": 15,
    "Guitarfish": 3,
    "Sea Bass": 30
  };

  useEffect(() => {
    const initModel = async () => {
      try {
        setIsLoading(true);
        const loaded = await loadModel();
        setModelLoaded(loaded);
        if (loaded) {
          initCamera();
        }
      } catch (error) {
        console.error('Error initializing model:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initModel();
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const initCamera = async () => {
    try {
      setCameraReady(false);
      setIsLoading(true);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      const constraints = {
        video: { 
          facingMode: isFrontCamera ? 'user' : 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraReady(true);
        startPrediction();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      takePictureWithCapacitor();
    } finally {
      setIsLoading(false);
    }
  };

  const takePictureWithCapacitor = async () => {
    try {
      setIsLoading(true);
      const image = await CapacitorCamera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        direction: isFrontCamera ? CameraDirection.Front : CameraDirection.Rear
      });
      
      if (image.webPath) {
        const img = new Image();
        img.onload = async () => {
          try {
            if (isModelReady()) {
              const predictions = await predictImage(img);
              onPredictionsUpdate(predictions);
            }
          } catch (err) {
            console.error('Error predicting with captured image:', err);
          } finally {
            setIsLoading(false);
          }
        };
        img.src = image.webPath;
      }
    } catch (error) {
      console.error('Error taking picture with Capacitor:', error);
      setIsLoading(false);
    }
  };

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
    setTimeout(() => {
      initCamera();
    }, 300);
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current && cameraReady) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        if (isFrontCamera) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        if (isFrontCamera) {
          context.setTransform(1, 0, 0, 1, 0, 0);
        }
        
        return canvas;
      }
    }
    return null;
  };

  const predict = async () => {
    if (!cameraReady || !isModelReady()) return;
    
    try {
      const canvas = captureFrame();
      if (canvas) {
        const predictions = await predictImage(canvas);
        
        // Always update predictions in real-time
        onPredictionsUpdate(predictions);
        
        if (predictions.length > 0 && predictions[0].probability > 0.7) {
          const topPrediction = predictions[0];
          const fishId = fishNameToId[topPrediction.className];
          
          if (fishId) {
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
            }
            
            if (streamRef.current) {
              streamRef.current.getTracks().forEach(track => track.stop());
            }
            
            setTimeout(() => {
              navigate(`/fish/${fishId}`);
            }, 1000);
            
            return;
          }
        }
      }
    } catch (error) {
      console.error('Error predicting:', error);
    }
    
    // Maintain the prediction loop at a reasonable frame rate (around 10fps)
    animationRef.current = setTimeout(() => {
      requestAnimationFrame(predict);
    }, 100) as unknown as number;
  };

  const startPrediction = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(predict);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-lg bg-black aspect-video flex items-center justify-center">
        {!modelLoaded ? (
          <div className="text-white text-center p-4">
            <p>Loading model...</p>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              className={`w-full h-full object-cover ${isFrontCamera ? 'scale-x-[-1]' : ''}`}
              playsInline 
              muted
              autoPlay
            />
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}
      </div>
      
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button 
          size="icon" 
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
          onClick={toggleCamera}
          title="Switch Camera"
        >
          <SwitchCamera className="h-5 w-5" />
        </Button>
        
        <Button 
          size="icon" 
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
          onClick={() => {
            if (cameraReady) {
              initCamera();
            } else {
              takePictureWithCapacitor();
            }
          }}
          title="Refresh Camera"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CameraComponent;
