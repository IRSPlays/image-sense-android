
import React from 'react';
import { Prediction } from '@/services/modelService';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface PredictionDisplayProps {
  predictions: Prediction[];
  isLoading: boolean;
}

const PredictionDisplay: React.FC<PredictionDisplayProps> = ({ 
  predictions, 
  isLoading 
}) => {
  // Get color based on probability
  const getColorClass = (probability: number): string => {
    if (probability > 0.7) return 'bg-green-500';
    if (probability > 0.4) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-4 bg-card rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Results</h2>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse w-1/3"></div>
              <div className="h-5 bg-muted rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : predictions.length === 0 ? (
        <div className="text-center text-muted-foreground py-6">
          No predictions available. Start the camera to begin.
        </div>
      ) : (
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{prediction.className}</span>
                <span className="text-sm font-semibold">
                  {(prediction.probability * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={prediction.probability * 100} 
                className={cn(
                  "h-3 rounded-full",
                  getColorClass(prediction.probability)
                )}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PredictionDisplay;
