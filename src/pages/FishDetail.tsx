
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Fish, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { fishData } from '@/data/fishData';
import { Input } from '@/components/ui/input';
import { chatWithFishExpert } from '@/services/geminiService';
import { useToast } from '@/hooks/use-toast';

const FishDetail = () => {
  const { id } = useParams<{ id: string }>();
  const fishId = parseInt(id || '0');
  const fish = fishData.find(f => f.id === fishId);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    try {
      setIsLoading(true);
      // Enhance the question with context about the specific fish
      const enhancedQuestion = `About the ${fish?.name} (${fish?.scientificName}): ${question}`;
      const response = await chatWithFishExpert(enhancedQuestion);
      setAnswer(response);
      setQuestion('');
    } catch (error) {
      console.error('Error asking question:', error);
      toast({
        title: "Error",
        description: "Failed to get an answer. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset answer when fish changes
  useEffect(() => {
    setAnswer('');
  }, [fishId]);
  
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
    <div className="min-h-screen bg-background pb-36">
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
            
            {answer && (
              <div className="bg-primary/10 rounded-md p-4 border border-primary/20 mt-6">
                <h3 className="font-medium mb-2 text-primary">Fish Expert Says:</h3>
                <p className="leading-relaxed">{answer}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-20">
        <div className="container mx-auto max-w-2xl flex space-x-2">
          <Input
            placeholder="Ask a question about this fish..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleAskQuestion()}
            className="flex-1"
          />
          <Button 
            onClick={handleAskQuestion} 
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? "Loading..." : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FishDetail;
