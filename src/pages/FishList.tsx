
import React, { useState, useEffect } from 'react';
import { Fish, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { Link, useSearchParams } from 'react-router-dom';
import { fishData } from '@/data/fishData';
import SearchSuggestions from '@/components/SearchSuggestions';
import { getSearchSuggestions } from '@/services/geminiService';
import { useToast } from "@/hooks/use-toast";

const FishList = () => {
  const [searchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'protected', 'non-protected'
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 3) {
        setSuggestions([]);
        return;
      }
      
      setIsLoadingSuggestions(true);
      const result = await getSearchSuggestions(searchTerm);
      setIsLoadingSuggestions(false);
      
      if (result.error) {
        toast({
          title: "Error loading suggestions",
          description: result.error,
          variant: "destructive",
        });
      } else {
        setSuggestions(result.suggestions);
      }
    };
    
    const timer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, toast]);
  
  const filteredFish = fishData.filter(fish => {
    const nameMatch = fish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     (fish.scientificName && fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase()));
    const statusMatch = filterStatus === 'all' || fish.status === filterStatus;
    return nameMatch && statusMatch;
  });
  
  const handleSelectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
  };
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold font-fishify">Fishify Database</h1>
          <ThemeToggle />
        </div>
        
        <div className="mt-4 relative">
          <Input
            type="search"
            placeholder="Search fish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-muted-foreground h-4 w-4" />
          
          {/* AI Suggestions */}
          <SearchSuggestions 
            suggestions={suggestions}
            isLoading={isLoadingSuggestions}
            onSelectSuggestion={handleSelectSuggestion}
          />
        </div>
        
        <div className="flex mt-4 space-x-2">
          <Button 
            size="sm" 
            variant={filterStatus === 'all' ? 'default' : 'outline'} 
            onClick={() => setFilterStatus('all')}
            className="text-xs"
          >
            All
          </Button>
          <Button 
            size="sm" 
            variant={filterStatus === 'protected' ? 'default' : 'outline'} 
            onClick={() => setFilterStatus('protected')}
            className="text-xs"
          >
            Protected
          </Button>
          <Button 
            size="sm" 
            variant={filterStatus === 'non-protected' ? 'default' : 'outline'} 
            onClick={() => setFilterStatus('non-protected')}
            className="text-xs"
          >
            Non-Protected
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto py-4 px-4">
        <div className="space-y-4">
          {filteredFish.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No fish found matching your search.
            </div>
          ) : (
            filteredFish.map(fish => (
              <Link 
                key={fish.id} 
                to={`/fish/${fish.id}`}
                className="block"
              >
                <div className="flex items-center bg-card rounded-lg p-3 border border-border hover:border-primary transition-all">
                  <div className="flex-shrink-0 mr-4">
                    {fish.imageUrl ? (
                      <img 
                        src={fish.imageUrl} 
                        alt={fish.name} 
                        className="w-16 h-16 object-cover rounded-md" 
                      />
                    ) : (
                      <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                        <Fish className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{fish.name}</h3>
                      {fish.status === 'protected' && (
                        <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                          Protected
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{fish.scientificName}</p>
                    <div className="flex mt-1 space-x-4">
                      <span className="text-xs text-muted-foreground">{fish.habitat}</span>
                      <span className="text-xs text-muted-foreground">{fish.size}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default FishList;
