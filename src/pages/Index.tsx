
import React, { useState } from 'react';
import { Prediction } from '@/services/modelService';
import CameraComponent from '@/components/Camera';
import PredictionDisplay from '@/components/PredictionDisplay';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredictionsUpdate = (newPredictions: Prediction[]) => {
    setPredictions(newPredictions);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 px-4 border-b">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Image Sense
        </h1>
      </header>
      
      <main className="container max-w-md mx-auto py-6 px-4">
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          <CameraComponent 
            onPredictionsUpdate={handlePredictionsUpdate}
            setIsLoading={setIsLoading}
          />
          
          <PredictionDisplay 
            predictions={predictions}
            isLoading={isLoading && predictions.length === 0}
          />
          
          <div className="text-center text-sm text-muted-foreground mt-8">
            <p>Powered by Teachable Machine</p>
            <p className="mt-1">Model: <a href="https://teachablemachine.withgoogle.com/models/JnYQB05SL/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">JnYQB05SL</a></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
