
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera as CapacitorCamera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
import { loadModel, predictImage, isModelReady, Prediction } from '@/services/modelService';
import { RefreshCw, Camera as CameraIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CameraComponentProps {
  onPredictionsUpdate: (predictions: Prediction[]) => void;
  setIsLoading: (loading: boolean) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ 
  onPredictionsUpdate,
  setIsLoading
}) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const animationRef = useRef<number>();
  const navigate = useNavigate();
  
  // Fish name to ID mapping for redirection
  const fishNameToId: Record<string, number> = {
    "Devil Rays": 2,
    "Giant Guitarfishes": 3,
    "Great White Shark": 4,
    "Great Hammerhead Shark": 5,
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
    "Whale Shark": 6,
    "Orange-Spotted Grouper": 21,
    "Leopard Coral Trout": 22,
    "Blacktip Reef Shark": 36,
    "Barramundi": 30
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
        onPredictionsUpdate(predictions);
        
        // If we have predictions, and the top one has reasonable confidence, navigate to the fish detail page
        if (predictions.length > 0 && predictions[0].probability > 0.7) {
          const topPrediction = predictions[0];
          const fishId = fishNameToId[topPrediction.className];
          
          if (fishId) {
            // Cancel any pending animation frames before navigating
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
            }
            
            // Stop camera stream before navigating
            if (streamRef.current) {
              streamRef.current.getTracks().forEach(track => track.stop());
            }
            
            // Navigate to the fish detail page after a short delay
            setTimeout(() => {
              navigate(`/fish/${fishId}`);
            }, 1000);
            
            return; // Don't request next animation frame
          }
        }
      }
    } catch (error) {
      console.error('Error predicting:', error);
    }
    
    animationRef.current = requestAnimationFrame(predict);
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
        >
          <CameraIcon className="h-5 w-5" />
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
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CameraComponent;
