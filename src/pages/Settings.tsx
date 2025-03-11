
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Github, Info, Mail } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container max-w-md mx-auto py-6 px-4">
        <div className="space-y-4">
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold">About</h2>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Info className="w-5 h-5 mr-3 text-muted-foreground" />
                  <span>Version</span>
                </div>
                <span className="text-muted-foreground">1.0.0</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Camera className="w-5 h-5 mr-3 text-muted-foreground" />
                  <span>Model</span>
                </div>
                <a 
                  href="https://teachablemachine.withgoogle.com/models/Ya0ENDPDw/" 
                  className="text-primary"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Ya0ENDPDw
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold">Contact & Support</h2>
            </div>
            
            <div className="p-4 space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Github className="w-5 h-5 mr-3" />
                GitHub Repository
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-5 h-5 mr-3" />
                Contact Support
              </Button>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mt-8">
            <p>Powered by Teachable Machine</p>
            <p className="mt-1">© 2023 Fishify App</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
