import React, { useState, useEffect } from 'react';
import { Fish, Search, ImageOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { Link, useSearchParams } from 'react-router-dom';
import { fishData } from '@/data/fishData';
import SearchSuggestions from '@/components/SearchSuggestions';
import { getSearchSuggestions } from '@/services/geminiService';
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

const FishList = () => {
  const [searchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'protected', 'non-protected'
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
    e.currentTarget.nextElementSibling?.classList.remove('hidden');
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

          <div className="ml-auto flex space-x-1">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              onClick={() => setViewMode('grid')}
              className="text-xs"
            >
              Grid
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className="text-xs"
            >
              List
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-4 px-4">
        {filteredFish.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No fish found matching your search.
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFish.map(fish => (
              <Link 
                key={fish.id} 
                to={`/fish/${fish.id}`}
                className="block"
              >
                <Card className="h-full overflow-hidden hover:border-primary transition-all">
                  <div className="h-48 relative">
                    <img 
                      src={fish.imageUrl} 
                      alt={fish.name} 
                      className="w-full h-full object-cover" 
                      onError={handleImageError}
                    />
                    <div className="hidden w-full h-full bg-muted flex items-center justify-center">
                      <ImageOff className="h-12 w-12 text-muted-foreground" />
                    </div>
                    {fish.status === 'protected' && (
                      <span className="absolute top-2 right-2 text-xs bg-destructive/80 text-destructive-foreground px-2 py-1 rounded-full">
                        Protected
                      </span>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold truncate">{fish.name}</h3>
                    <p className="text-sm text-muted-foreground italic truncate">{fish.scientificName}</p>
                    <div className="flex mt-1 space-x-4 text-xs text-muted-foreground">
                      <span>{fish.habitat}</span>
                      <span>{fish.size}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Scientific Name</TableHead>
                  <TableHead>Habitat</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFish.map(fish => (
                  <TableRow key={fish.id} className="cursor-pointer hover:bg-muted/80" onClick={() => window.location.href = `/fish/${fish.id}`}>
                    <TableCell>
                      <div className="relative w-14 h-14">
                        <img 
                          src={fish.imageUrl} 
                          alt={fish.name} 
                          className="w-14 h-14 object-cover rounded-md" 
                          onError={handleImageError}
                        />
                        <div className="hidden absolute inset-0 bg-muted rounded-md flex items-center justify-center">
                          <ImageOff className="h-6 w-6 text-muted-foreground" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{fish.name}</TableCell>
                    <TableCell className="italic">{fish.scientificName}</TableCell>
                    <TableCell>{fish.habitat}</TableCell>
                    <TableCell>{fish.size}</TableCell>
                    <TableCell>
                      {fish.status === 'protected' ? (
                        <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                          Protected
                        </span>
                      ) : (
                        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                          Non-protected
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default FishList;
