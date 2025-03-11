
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Fish, Camera as CameraIcon } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Image Sense
        </h1>
      </header>
      
      <main className="container max-w-md mx-auto py-6 px-4">
        <div className="space-y-6">
          <div className="rounded-lg bg-card border border-border p-6 text-center space-y-4">
            <div className="h-32 w-32 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
              <CameraIcon size={64} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Fish Recognition</h2>
            <p className="text-muted-foreground">
              Identify fish species using your camera or photo library.
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
              Browse our comprehensive database of fish species.
            </p>
            <Button asChild variant="secondary" className="mt-4">
              <Link to="/fish-list">
                <Fish className="mr-2" size={18} />
                View Fish List
              </Link>
            </Button>
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
