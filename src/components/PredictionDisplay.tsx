
import React from 'react';
import { Prediction } from '@/services/modelService';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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

  // Check if a prediction corresponds to a fish in our database
  const getRecognitionStatus = (className: string): string => {
    const knownSpecies = [
      "Devil Rays", "Giant Guitarfishes", "Great White Shark", "Great Hammerhead Shark", "Whale Shark", 
      "Smooth Hammerhead Shark", "Scalloped Hammerhead Shark", "Shortfin Mako Shark", "Longfin Mako Shark", 
      "Manta Rays", "Oceanic White-tip Shark", "Porbeagle Shark", "Sawfish", "Seahorses", "Silky Shark", 
      "White Teatfish", "Black Teatfish", "Thresher Sharks", "Wedgefishes", "Orange-Spotted Grouper", 
      "Leopard Coral Trout", "Spotted Coral Trout", "Malabar Grouper", "Honeycomb Grouper", "Chocolate Hind", 
      "Brown-Marbled Grouper", "Giant Grouper", "Greasy Grouper", "Barramundi", "Red Snapper", "John Dory", 
      "Sea Bream", "Silver Pomfret", "Threadfin Bream", "Blacktip Reef Shark", "Golden Pomfret", 
      "Yellowfin Tuna", "Milkfish", "Tilapia", "Shark", "Grouper", "Tuna", "Mako Shark", "Hammerhead", 
      "Coral Trout", "Snapper", "Pomfret", "Rays", "Seahorse", "Guitarfish", "Sea Bass"
    ];
    
    return knownSpecies.some(species => 
      species.toLowerCase() === className.toLowerCase() || 
      className.toLowerCase().includes(species.toLowerCase()) || 
      species.toLowerCase().includes(className.toLowerCase())
    ) ? "In Database" : "Not in Database";
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-4 bg-card rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-center">Results</h2>
        {predictions.length > 0 && predictions[0].probability > 0.7 && (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500">
            High Confidence
          </Badge>
        )}
      </div>
      
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
                <div className="flex items-center gap-2">
                  <span className="font-medium">{prediction.className}</span>
                  {getRecognitionStatus(prediction.className) === "In Database" && (
                    <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 border-blue-500">
                      In Library
                    </Badge>
                  )}
                </div>
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
