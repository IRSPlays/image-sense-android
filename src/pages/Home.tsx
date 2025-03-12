import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Fish, Camera, Calendar, ExternalLink, MessageCircle, Anchor, Award, Zap, Map } from 'lucide-react';
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
    title: "Scientists Discover New Deep-Sea Fish Species in the Mariana Trench",
    date: "August 23, 2023",
    summary: "Marine biologists have identified five previously unknown fish species during a recent expedition to the Mariana Trench, highlighting the vast biodiversity still to be discovered in our oceans.",
    link: "https://www.nationalgeographic.com/",
  },
  {
    id: 2,
    title: "Global Effort Launched to Protect Endangered Coral Reef Fish",
    date: "July 14, 2023",
    summary: "A coalition of 27 countries has committed to new conservation measures aimed at protecting critically endangered coral reef fish species from overfishing and habitat destruction.",
    link: "https://www.conservation.org/",
  },
  {
    id: 3,
    title: "Revolutionary Fish-Inspired Robots Could Help Monitor Ocean Health",
    date: "June 8, 2023",
    summary: "Engineers have developed autonomous underwater robots that mimic the movement and appearance of fish, allowing scientists to gather data about marine ecosystems with minimal disruption.",
    link: "https://www.sciencedaily.com/",
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

  const handleAskAI = () => {
    if (searchTerm.trim()) {
      navigate(`/fish-chat?question=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/fish-chat');
    }
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
              
              <div className="pt-2 flex space-x-2">
                <Button type="submit" className="flex-1">
                  <Search className="mr-2 h-4 w-4" />
                  Search Database
                </Button>
                <Button type="button" variant="secondary" onClick={handleAskAI} className="flex-1">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Ask AI Expert
                </Button>
              </div>
            </form>
          </div>
        </section>
        
        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2 h-5 w-5 text-primary" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Link to="/camera" className="no-underline">
              <Card className="h-full hover:shadow-md transition-shadow border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-base">
                    <Camera className="mr-2 h-5 w-5 text-primary" />
                    Scan Fish
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    Take a photo to identify fish species instantly using AI
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/fish-list" className="no-underline">
              <Card className="h-full hover:shadow-md transition-shadow border-l-4 border-l-secondary">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-base">
                    <Fish className="mr-2 h-5 w-5 text-secondary" />
                    Fish Database
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    Browse our comprehensive catalog of fish species and habitats
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link to="/fish-chat" className="no-underline">
              <Card className="h-full hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-base">
                    <MessageCircle className="mr-2 h-5 w-5 text-blue-500" />
                    Fish Expert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    Chat with our AI fish expert about any aquatic questions
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link to="/fishing-map" className="no-underline">
              <Card className="h-full hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-base">
                    <Map className="mr-2 h-5 w-5 text-green-500" />
                    Fishing Spots
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    Discover top fishing locations around Singapore
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
        
        {/* Fish News Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Award className="mr-2 h-5 w-5 text-primary" />
            Latest Fish News
          </h2>
          <div className="space-y-4">
            {fishNews.map(news => (
              <Card key={news.id} className="hover:shadow-md transition-shadow overflow-hidden">
                <CardHeader className="pb-2 border-b">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{news.title}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {news.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-foreground/90">{news.summary}</p>
                </CardContent>
                <CardFooter className="bg-muted/20">
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
