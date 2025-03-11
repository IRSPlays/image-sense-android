
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2400);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Image Sense
        </h1>
        
        <div className="w-64 mx-auto">
          <Progress value={progress} className="h-2" />
        </div>
        
        <p className="text-sm text-muted-foreground animate-pulse-slow">
          Loading Teachable Machine model...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
