
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FishList from "./pages/FishList";
import FishDetail from "./pages/FishDetail";
import CameraPage from "./pages/CameraPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";
import TabNavigation from "./components/TabNavigation";
import { ThemeProvider } from "./components/ThemeProvider";
import FishChat from "./pages/FishChat";
import FishingMap from "./pages/FishingMap";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showSplash ? (
            <SplashScreen onComplete={() => setShowSplash(false)} />
          ) : (
            <BrowserRouter>
              <div className="relative min-h-screen bg-background">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/fish-list" element={<FishList />} />
                  <Route path="/fish/:id" element={<FishDetail />} />
                  <Route path="/camera" element={<CameraPage />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/fish-chat" element={<FishChat />} />
                  <Route path="/fishing-map" element={<FishingMap />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <TabNavigation />
              </div>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
