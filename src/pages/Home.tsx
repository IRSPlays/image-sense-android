
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Fish, Camera as CameraIcon, Smartphone, Info, Search, Newspaper } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { Input } from '@/components/ui/input';

// Sample news data - in a real app this would come from an API
const fishNews = [
  {
    id: 1,
    title: "New Protected Species Added to Singapore's Conservation List",
    date: "2023-10-15",
    summary: "Singapore has added several new fish species to its protected list to combat overfishing and preserve marine biodiversity.",
    imageUrl: "https://i.imgur.com/gORZ7Uf.jpg"
  },
  {
    id: 2,
    title: "Rare Whale Shark Sighting in Singapore Waters",
    date: "2023-09-23",
    summary: "Local fishermen report rare whale shark sightings off the southern coast of Singapore, raising hopes for marine conservation efforts.",
    imageUrl: "https://i.imgur.com/M9zEGXQ.jpg"
  },
  {
    id: 3,
    title: "New Fishing Regulations to Take Effect Next Month",
    date: "2023-08-05",
    summary: "Singapore authorities announce new fishing regulations aimed at sustainable practices and protecting endangered species.",
    imageUrl: "https://i.imgur.com/CwQQZVC.jpg"
  }
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/fish-list?search=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold font-fishify bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FISHIFY
          </h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container max-w-md mx-auto py-6 px-4">
        <div className="space-y-6">
          {/* Search Section */}
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search for fish species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 rounded-full"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1 top-1 rounded-full"
              variant="ghost"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
          
          <div className="rounded-lg bg-card border border-border p-6 text-center space-y-4">
            <div className="h-32 w-32 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
              <CameraIcon size={64} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Fish Recognition</h2>
            <p className="text-muted-foreground">
              Point your camera at any fish to identify it instantly using AI-powered recognition.
            </p>
            <Button asChild className="mt-4">
              <Link to="/camera">
                <CameraIcon className="mr-2" size={18} />
                Start Scanning
              </Link>
            </Button>
          </div>
          
          <div className="rounded-lg bg-card border border-border p-6 text-center space-y-4">
            <div className="h-32 w-32 bg-secondary/10 rounded-full mx-auto flex items-center justify-center">
              <Fish size={64} className="text-secondary" />
            </div>
            <h2 className="text-xl font-semibold">Fish Database</h2>
            <p className="text-muted-foreground">
              Browse our comprehensive database of fish species with detailed information.
            </p>
            <Button asChild variant="secondary" className="mt-4">
              <Link to="/fish-list">
                <Fish className="mr-2" size={18} />
                View Fish List
              </Link>
            </Button>
          </div>
          
          {/* News Section */}
          <div className="rounded-lg bg-card border border-border p-6 space-y-4">
            <div className="flex items-center mb-4">
              <Newspaper className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Latest News</h2>
            </div>
            
            <div className="space-y-4">
              {fishNews.map((news) => (
                <div key={news.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex space-x-3">
                    <img 
                      src={news.imageUrl} 
                      alt={news.title}
                      className="w-20 h-20 object-cover rounded-md flex-shrink-0" 
                    />
                    <div>
                      <h3 className="font-medium line-clamp-2">{news.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{news.date}</p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{news.summary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-lg bg-card border border-border p-6 space-y-4">
            <div className="flex items-start">
              <Smartphone className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="font-medium">Android Features</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Use your device's camera for real-time fish identification. Works offline once models are loaded.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Info className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="font-medium">Getting Started</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Navigate using the bottom tabs. For best results, hold your camera 30-60cm from the fish in good lighting.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mt-8">
            <p>Powered by Teachable Machine</p>
            <p className="mt-1">Model: <a href="https://teachablemachine.withgoogle.com/models/Ya0ENDPDw/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Ya0ENDPDw</a></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
