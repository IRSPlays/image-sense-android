
import React, { useState } from 'react';
import { Prediction } from '@/services/modelService';
import CameraComponent from '@/components/Camera';
import PredictionDisplay from '@/components/PredictionDisplay';
import { Loader2 } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const CameraPage = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredictionsUpdate = (newPredictions: Prediction[]) => {
    setPredictions(newPredictions);
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fish Scanner</h1>
          <ThemeToggle />
        </div>
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
        </div>
      </main>
    </div>
  );
};

export default CameraPage;
