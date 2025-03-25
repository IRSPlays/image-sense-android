
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

  // Fish name to ID mapping for redirection - updated with more species to match recognition model
  const fishNameToId: Record<string, number> = {
    // Protected species
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
    
    // Non-protected species
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
    
    // Common names and variations that might be in the model
    "Shark": 4, 
    "Grouper": 21, 
    "Tuna": 38, 
    "Mako Shark": 9, 
    "Hammerhead": 5, 
    "Great hammer head Shark": 5, // Handle specific prediction output format
    "Coral Trout": 22, 
    "Snapper": 31, 
    "Pomfret": 34, 
    "Rays": 2, 
    "Seahorse": 15, 
    "Guitarfish": 3, 
    "Sea Bass": 30,
    "Great hammerhead shark": 5,
    "Great hammer head shark": 5,
    "Great Hammer Head Shark": 5,
    "Hammer head shark": 5,
    "Hammerhead shark": 5,
    "Great white shark": 4
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
    
    // Sort predictions by probability in descending order and select the top prediction
    const sortedPredictions = [...predictions].sort((a, b) => b.probability - a.probability);
    const topPrediction = sortedPredictions[0];
    console.log("Top prediction:", topPrediction);
    
    // Normalize the prediction class name (lowercase for comparison)
    const normalizedPredictionName = topPrediction.className.toLowerCase().trim();
    
    // Check exact match first
    let fishId = fishNameToId[topPrediction.className];
    console.log("Found fish ID for exact match:", fishId);
    
    // If no exact match, check case-insensitive match
    if (!fishId) {
      for (const [key, value] of Object.entries(fishNameToId)) {
        if (key.toLowerCase() === normalizedPredictionName) {
          fishId = value;
          console.log("Found fish ID through case-insensitive match:", fishId);
          break;
        }
      }
    }
    
    // If still no match, try to find a close match
    if (!fishId) {
      // Try matching by substring
      for (const [key, value] of Object.entries(fishNameToId)) {
        if (normalizedPredictionName.includes(key.toLowerCase()) || 
            key.toLowerCase().includes(normalizedPredictionName)) {
          fishId = value;
          console.log("Found fish ID by substring match:", fishId, "for", key);
          break;
        }
      }
      
      // If still no match, try matching with fish data directly
      if (!fishId) {
        const matchedFish = fishData.find(fish => 
          normalizedPredictionName.includes(fish.name.toLowerCase()) || 
          fish.name.toLowerCase().includes(normalizedPredictionName)
        );
        
        if (matchedFish) {
          fishId = matchedFish.id;
          console.log("Found fish ID for close match in fish data:", fishId);
        }
      }
    }
    
    if (fishId) {
      toast({
        title: "Fish Identified",
        description: `Identified as ${topPrediction.className} with ${(topPrediction.probability * 100).toFixed(1)}% confidence`,
        variant: "default"
      });
      
      setTimeout(() => {
        navigate(`/fish/${fishId}`);
      }, 1000);
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
