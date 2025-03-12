
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Fish, Camera, Calendar, ExternalLink, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';
import SearchSuggestions from '@/components/SearchSuggestions';
import { getSearchSuggestions } from '@/services/geminiService';
import { useToast } from "@/hooks/use-toast";

const fishNews = [
  {
    id: 1,
    title: "New Protected Marine Areas Established in Singapore Waters",
    date: "June 15, 2023",
    summary: "Singapore's National Parks Board announced new marine protected areas around the Southern Islands to safeguard coral reefs and marine biodiversity.",
    link: "https://www.nparks.gov.sg/",
  },
  {
    id: 2,
    title: "Rare Whale Shark Spotted Off Singapore's East Coast",
    date: "May 3, 2023",
    summary: "Marine enthusiasts spotted a juvenile whale shark near Changi, highlighting the importance of Singapore's waters as a habitat for endangered species.",
    link: "https://www.wildsingapore.com/",
  },
  {
    id: 3,
    title: "Singapore Strengthens Regulations Against Illegal Fish Trading",
    date: "April 22, 2023",
    summary: "New regulations have been implemented to combat illegal fishing and trading of protected marine species in Singapore and surrounding waters.",
    link: "https://www.nea.gov.sg/",
  },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const navigate = useNavigate();
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
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/fish-list?search=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  const handleSelectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    navigate(`/fish-list?search=${encodeURIComponent(suggestion)}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 px-4 border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-fishify">FISHIFY</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* Search Section */}
        <section className="mb-10">
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <h2 className="text-2xl font-semibold mb-4">Find Your Fish</h2>
            <form onSubmit={handleSearch} className="space-y-1">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for fish by name or species..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 text-muted-foreground h-5 w-5" />
              </div>
              
              {/* AI Suggestions */}
              <SearchSuggestions 
                suggestions={suggestions}
                isLoading={isLoadingSuggestions}
                onSelectSuggestion={handleSelectSuggestion}
              />
              
              <div className="pt-2">
                <Button type="submit" className="w-full">Search Fish Database</Button>
              </div>
            </form>
          </div>
        </section>
        
        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Link to="/camera" className="no-underline">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-base">
                    <Camera className="mr-2 h-5 w-5 text-primary" />
                    Scan Fish
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Take a photo to identify fish species instantly
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/fish-list" className="no-underline">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-base">
                    <Fish className="mr-2 h-5 w-5 text-primary" />
                    Fish Database
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Browse our comprehensive catalog of fish species
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link to="/fish-chat" className="no-underline">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-base">
                    <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                    Fish Expert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Chat with our AI fish expert about anything fishy
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
        
        {/* Fish News Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Fish News</h2>
          <div className="space-y-4">
            {fishNews.map(news => (
              <Card key={news.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{news.title}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {news.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/90">{news.summary}</p>
                </CardContent>
                <CardFooter>
                  <a 
                    href={news.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary flex items-center hover:underline"
                  >
                    Read More <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
