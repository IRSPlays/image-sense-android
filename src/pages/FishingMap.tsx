
import React, { useState } from 'react';
import { Map, MapPin, Navigation } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fishData } from '@/data/fishData';

interface FishingSpot {
  id: number;
  name: string;
  description: string;
  fishTypes: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

const fishingSpots: FishingSpot[] = [
  {
    id: 1,
    name: "Bedok Reservoir",
    description: "Popular spot for peacock bass and tilapia fishing with designated fishing areas.",
    fishTypes: ["Peacock Bass", "Tilapia", "Snakehead", "Silver Pomfret", "Milkfish", "Sea Bream"],
    coordinates: {
      lat: 1.3411,
      lng: 103.9325,
    },
  },
  {
    id: 2,
    name: "Lower Seletar Reservoir",
    description: "Known for peacock bass fishing with dedicated fishing deck platforms.",
    fishTypes: ["Peacock Bass", "Catfish", "Tilapia", "Golden Pomfret", "Barramundi", "Threadfin Bream"],
    coordinates: {
      lat: 1.4002,
      lng: 103.8327,
    },
  },
  {
    id: 3,
    name: "Punggol Waterway",
    description: "Scenic fishing spots along the waterway with various fish species.",
    fishTypes: ["Snakehead", "Tilapia", "Catfish", "Barramundi", "Milkfish", "Sea Bream"],
    coordinates: {
      lat: 1.4071,
      lng: 103.9063,
    },
  },
  {
    id: 4,
    name: "East Coast Park",
    description: "Coastal fishing with potential for saltwater species. Area C is popular.",
    fishTypes: ["Grouper", "Catfish", "Snapper", "Red Snapper", "John Dory", "Threadfin Bream", "Silver Pomfret"],
    coordinates: {
      lat: 1.3002,
      lng: 103.9164,
    },
  },
  {
    id: 5,
    name: "Marina Reservoir",
    description: "Urban fishing spot with barramundi and other species. Check for fishing zones.",
    fishTypes: ["Barramundi", "Tilapia", "Peacock Bass", "Golden Pomfret", "Yellowfin Tuna", "Sea Bream"],
    coordinates: {
      lat: 1.2899,
      lng: 103.8646,
    },
  },
  {
    id: 6,
    name: "Changi Beach Park",
    description: "Popular coastal fishing spot with a variety of saltwater species.",
    fishTypes: ["Red Snapper", "Silver Pomfret", "Threadfin Bream", "Sea Bream", "Golden Pomfret", "Barramundi"],
    coordinates: {
      lat: 1.3917,
      lng: 103.9911,
    },
  },
  {
    id: 7,
    name: "Pasir Ris Park",
    description: "Family-friendly fishing spot with mangroves and diverse marine life.",
    fishTypes: ["Tilapia", "Catfish", "Sea Bream", "Milkfish", "Barramundi", "Leopard Coral Trout"],
    coordinates: {
      lat: 1.3728,
      lng: 103.9460,
    },
  },
  {
    id: 8,
    name: "Sembawang Park",
    description: "Quiet fishing spot with scenic views of the Johor Strait.",
    fishTypes: ["Catfish", "Red Snapper", "Grouper", "Silver Pomfret", "Threadfin Bream", "Yellowfin Tuna"],
    coordinates: {
      lat: 1.4209,
      lng: 103.8354,
    },
  },
  {
    id: 9,
    name: "Jurong Lake",
    description: "Freshwater fishing with peaceful surroundings in western Singapore.",
    fishTypes: ["Peacock Bass", "Tilapia", "Snakehead", "Milkfish", "Barramundi", "Golden Pomfret"],
    coordinates: {
      lat: 1.3359,
      lng: 103.7292,
    },
  },
  {
    id: 10,
    name: "MacRitchie Reservoir",
    description: "Scenic reservoir with designated fishing spots amid nature.",
    fishTypes: ["Peacock Bass", "Tilapia", "Catfish", "Milkfish", "Sea Bream", "Snakehead"],
    coordinates: {
      lat: 1.3449,
      lng: 103.8304,
    },
  }
];

const FishingMap = () => {
  const [selectedSpot, setSelectedSpot] = useState<FishingSpot | null>(null);
  const googleMapsUrl = "https://www.google.com/maps/d/embed?mid=1TVkg5bzrsLrYzrVZqDumb7WqxtFnSeIA&femb=1&ehbc=2E312F";
  
  const handleOpenSpotInMaps = (spot: FishingSpot) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${spot.coordinates.lat},${spot.coordinates.lng}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold font-fishify">Fishing Locations</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative h-[60vh] rounded-lg border overflow-hidden mb-4">
              <iframe 
                src={googleMapsUrl}
                className="absolute inset-0 w-full h-full"
                title="Singapore Fishing Spots"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Top Fishing Spots</h2>
            
            {fishingSpots.map((spot) => (
              <Card 
                key={spot.id} 
                className={`hover:shadow-md transition-shadow ${selectedSpot?.id === spot.id ? 'border-primary border-2' : ''}`}
                onClick={() => setSelectedSpot(spot)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-base">{spot.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{spot.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {spot.fishTypes.slice(0, 3).map((fish) => (
                          <span 
                            key={fish} 
                            className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                          >
                            {fish}
                          </span>
                        ))}
                        {spot.fishTypes.length > 3 && (
                          <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
                            +{spot.fishTypes.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSpotInMaps(spot);
                      }}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {selectedSpot && (
          <Card className="mt-6 border-t-4 border-t-primary">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{selectedSpot.name}</h3>
                  <p className="text-sm mt-1">{selectedSpot.description}</p>
                  
                  <h4 className="font-medium text-sm mt-3">Common Fish:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedSpot.fishTypes.map((fish) => (
                      <span 
                        key={fish} 
                        className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                      >
                        {fish}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button
                  onClick={() => handleOpenSpotInMaps(selectedSpot)}
                  className="flex-shrink-0"
                >
                  <Navigation className="h-4 w-4 mr-1" />
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default FishingMap;
