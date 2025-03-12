
import React, { useState } from 'react';
import { Prediction } from '@/services/modelService';
import CameraComponent from '@/components/Camera';
import PredictionDisplay from '@/components/PredictionDisplay';
import { Loader2, Search } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { fishData } from '@/data/fishData';
import { useToast } from '@/hooks/use-toast';

const CameraPage = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePredictionsUpdate = (newPredictions: Prediction[]) => {
    setPredictions(newPredictions);
  };

  // Fish name to ID mapping for redirection
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
    "Blacktip Reef Shark": 36,
    "Barramundi": 30
  };

  const identifyFish = () => {
    if (predictions.length === 0) {
      toast({
        title: "No fish detected",
        description: "Please take a photo or allow the camera to analyze the image first.",
        variant: "destructive"
      });
      return;
    }
    
    const topPrediction = predictions[0];
    console.log("Top prediction:", topPrediction);
    
    // Check exact match first
    let fishId = fishNameToId[topPrediction.className];
    console.log("Found fish ID for exact match:", fishId);
    
    // If no exact match, try to find a close match
    if (!fishId) {
      const matchedFish = fishData.find(fish => 
        topPrediction.className.toLowerCase().includes(fish.name.toLowerCase()) || 
        fish.name.toLowerCase().includes(topPrediction.className.toLowerCase())
      );
      
      if (matchedFish) {
        fishId = matchedFish.id;
        console.log("Found fish ID for close match:", fishId);
      }
    }
    
    if (fishId) {
      navigate(`/fish/${fishId}`);
    } else {
      toast({
        title: "Fish not found",
        description: "We couldn't identify this fish in our database. Try another photo.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fishify Scanner</h1>
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
          
          {predictions.length > 0 && (
            <Button 
              className="w-full mt-4" 
              size="lg"
              onClick={identifyFish}
            >
              <Search className="mr-2 h-5 w-5" />
              Identify Fish Species
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default CameraPage;
