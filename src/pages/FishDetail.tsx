
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Fish, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { fishData } from '@/data/fishData';

const FishDetail = () => {
  const { id } = useParams<{ id: string }>();
  const fishId = parseInt(id || '0');
  
  const fish = fishData.find(f => f.id === fishId);
  
  if (!fish) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Fish not found</h1>
        <p className="mb-6 text-muted-foreground">The fish you're looking for doesn't exist in our database.</p>
        <Button asChild>
          <Link to="/fish-list">
            <ArrowLeft className="mr-2" />
            Back to Fish List
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button asChild variant="ghost" size="icon" className="mr-2">
              <Link to="/fish-list">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold font-fishify">Fish Details</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container mx-auto py-4 px-4">
        <div className="bg-card rounded-lg overflow-hidden border border-border">
          <div className="relative h-56 md:h-64 lg:h-80 w-full">
            {fish.imageUrl ? (
              <img 
                src={fish.imageUrl} 
                alt={fish.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Fish className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            {fish.status === 'protected' && (
              <div className="absolute top-4 right-4 bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-full font-medium">
                Protected Species
              </div>
            )}
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-1">{fish.name}</h2>
            <p className="text-muted-foreground italic mb-4">{fish.scientificName}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-background rounded-md p-4 border border-border">
                <h3 className="font-medium mb-2">Habitat</h3>
                <p>{fish.habitat}</p>
              </div>
              <div className="bg-background rounded-md p-4 border border-border">
                <h3 className="font-medium mb-2">Size</h3>
                <p>{fish.size}</p>
              </div>
            </div>
            
            <div className="bg-background rounded-md p-4 border border-border mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="leading-relaxed">
                {fish.details || "No detailed description available for this species."}
              </p>
            </div>
            
            {(fish.chineseName || fish.malayName || fish.teochewName) && (
              <div className="bg-background rounded-md p-4 border border-border mb-6">
                <h3 className="font-medium mb-2">Local Names</h3>
                {fish.chineseName && <p className="mb-1"><span className="font-medium">Chinese:</span> {fish.chineseName}</p>}
                {fish.malayName && <p className="mb-1"><span className="font-medium">Malay:</span> {fish.malayName}</p>}
                {fish.teochewName && <p><span className="font-medium">Teochew:</span> {fish.teochewName}</p>}
              </div>
            )}
            
            <div className="bg-background rounded-md p-4 border border-border">
              <h3 className="font-medium mb-2">Conservation Status</h3>
              <p className={fish.status === 'protected' ? 'text-destructive' : 'text-green-600'}>
                {fish.status === 'protected' ? 'Protected Species - Fishing Prohibited' : 'Non-Protected Species'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FishDetail;
