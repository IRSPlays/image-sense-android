import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Fish, ArrowLeft, Send, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { fishData } from '@/data/fishData';
import { chatWithFishExpert } from '@/services/geminiService';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';

const FishDetail = () => {
  const { id } = useParams<{ id: string }>();
  const fishId = parseInt(id || '0');
  const fish = fishData.find(f => f.id === fishId);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{question: string; answer: string}[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    try {
      setIsLoading(true);
      const enhancedQuestion = `About the ${fish?.name} (${fish?.scientificName}): ${question}. Keep your answer brief, concise, and to the point. Use markdown formatting with ** for important terms.`;
      const response = await chatWithFishExpert(enhancedQuestion);
      
      setChatHistory(prev => [...prev, {question: question, answer: response}]);
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
  
  useEffect(() => {
    setAnswer('');
    setChatHistory([]);
  }, [fishId]);

  useEffect(() => {
    const handleFocus = () => {
      setIsInputFocused(true);
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    };

    const handleBlur = () => {
      setIsInputFocused(false);
    };

    const textarea = inputRef.current;
    if (textarea) {
      textarea.addEventListener('focus', handleFocus);
      textarea.addEventListener('blur', handleBlur);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener('focus', handleFocus);
        textarea.removeEventListener('blur', handleBlur);
      }
    };
  }, []);
  
  const renderFormattedText = (text: string) => {
    return text.split(/(\*\*[^*]+\*\*)/).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.substring(2, part.length - 2);
        return <strong key={index}>{boldText}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
    e.currentTarget.nextElementSibling?.classList.remove('hidden');
  };
  
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
    <div className="min-h-screen bg-background">
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
      
      <main className="container mx-auto py-4 px-4 pb-28 md:pb-32">
        <div className="bg-card rounded-lg overflow-hidden border border-border">
          <div className="relative h-56 md:h-64 lg:h-80 w-full">
            {fish.imageUrl && (
              <>
                <img 
                  src={fish.imageUrl} 
                  alt={fish.name} 
                  className="w-full h-full object-cover" 
                  onError={handleImageError}
                />
                <div className="hidden w-full h-full bg-muted flex items-center justify-center">
                  <ImageOff className="h-16 w-16 text-muted-foreground" />
                </div>
              </>
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
            
            <div className="bg-background rounded-md p-4 border border-border mb-6">
              <h3 className="font-medium mb-2">Conservation Status</h3>
              <p className={fish.status === 'protected' ? 'text-destructive' : 'text-green-600'}>
                {fish.status === 'protected' ? 'Protected Species - Fishing Prohibited' : 'Non-Protected Species'}
              </p>
            </div>
            
            <div className="bg-background rounded-md p-4 border border-border mb-6">
              <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Fish AI Expert Chat</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {isOpen ? 'Hide Chat History' : 'Show Chat History'}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    Ask our AI fish expert about this {fish?.name}, fishing techniques, cooking methods, or any other questions.
                  </p>
                </div>
                
                <CollapsibleContent>
                  {chatHistory.length > 0 ? (
                    <div className="mt-4 space-y-4 max-h-96 overflow-y-auto pr-2" ref={chatContainerRef}>
                      {chatHistory.map((chat, index) => (
                        <div key={index} className="space-y-2">
                          <div className="bg-muted p-3 rounded-md">
                            <p className="text-sm font-medium">You asked:</p>
                            <p className="text-sm">{chat.question}</p>
                          </div>
                          <div className="bg-primary/10 p-3 rounded-md border border-primary/20">
                            <p className="text-sm font-medium text-primary">Fish Expert:</p>
                            <div className="text-sm">
                              {renderFormattedText(chat.answer)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">
                      No chat history yet. Ask a question below to get started!
                    </p>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            {answer && !isOpen && (
              <div className="bg-primary/10 rounded-md p-4 border border-primary/20 mt-6">
                <h3 className="font-medium mb-2 text-primary">Fish Expert Says:</h3>
                <div className="leading-relaxed">
                  {renderFormattedText(answer)}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 p-4 bg-background border-t z-20 shadow-lg">
        <div className="container mx-auto max-w-2xl">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleAskQuestion();
            }}
            className="flex gap-2"
          >
            <Textarea
              ref={inputRef}
              placeholder={`Ask about ${fish?.name}...`}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setTimeout(() => setIsInputFocused(false), 100)}
              className="flex-1 min-h-[60px] max-h-24 resize-y"
              rows={isMobile ? 2 : 3}
            />
            <Button 
              type="submit"
              disabled={isLoading || !question.trim()}
              className="self-end h-10"
            >
              {isLoading ? "Loading..." : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FishDetail;
