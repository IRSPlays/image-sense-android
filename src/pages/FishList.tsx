
import React, { useState } from 'react';
import { Fish, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/ThemeToggle';

// Updated fish data with more comprehensive information
const fishData = [
  { id: 1, name: 'Bighead Carp', description: 'Invasive species with a large head and tiny scales', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Freshwater', size: 'Up to 40 inches' },
  { id: 2, name: 'Black Buffalo', description: 'Large-bodied fish with thick lips and dark coloration', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Freshwater', size: 'Up to 40 inches' },
  { id: 3, name: 'Bluegill', description: 'Small sunfish with a distinctive blue marking on the gill cover', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Freshwater', size: '4-12 inches' },
  { id: 4, name: 'Channel Catfish', description: 'Common catfish with forked tail and barbels around mouth', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Freshwater', size: 'Up to 40 inches' },
  { id: 5, name: 'Common Carp', description: 'Bronze-colored fish with large scales and two barbels', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg', habitat: 'Freshwater', size: 'Up to 40 inches' },
  { id: 6, name: 'Freshwater Drum', description: 'Silver fish with a humped back and distinctive sound-producing ability', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg', habitat: 'Freshwater', size: 'Up to 30 inches' },
  { id: 7, name: 'Grass Carp', description: 'Long, slender fish with large scales and upturned mouth', imageUrl: 'https://i.imgur.com/iNPCO9V.jpg', habitat: 'Freshwater', size: 'Up to 50 inches' },
  { id: 8, name: 'Largemouth Bass', description: 'Popular game fish with a large mouth extending beyond the eye', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Freshwater', size: '10-25 inches' },
  { id: 9, name: 'Northern Pike', description: 'Predatory fish with elongated body and distinctive markings', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Freshwater', size: 'Up to 50 inches' },
  { id: 10, name: 'Pumpkinseed', description: 'Colorful sunfish with orange spots and blue streaks', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Freshwater', size: '4-10 inches' },
  { id: 11, name: 'Rainbow Trout', description: 'Colorful trout with pink band along the side', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Freshwater', size: '12-36 inches' },
  { id: 12, name: 'Shortnose Gar', description: 'Ancient fish with elongated snout and armored scales', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Freshwater', size: 'Up to 30 inches' },
  { id: 13, name: 'Smallmouth Bass', description: 'Bronze-colored bass with vertical bars and red eyes', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg', habitat: 'Freshwater', size: '8-22 inches' },
  { id: 14, name: 'Spotted Bass', description: 'Similar to largemouth bass but with spotted pattern below lateral line', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg', habitat: 'Freshwater', size: '10-18 inches' },
  { id: 15, name: 'White Bass', description: 'Silver fish with faint horizontal stripes', imageUrl: 'https://i.imgur.com/iNPCO9V.jpg', habitat: 'Freshwater', size: '8-15 inches' },
  { id: 16, name: 'White Crappie', description: 'Popular panfish with vertical bars and paper-thin mouth', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Freshwater', size: '8-15 inches' },
];

const FishList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredFish = fishData.filter(fish => 
    fish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Fish Database</h1>
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
              <div 
                key={fish.id} 
                className="flex items-center bg-card rounded-lg p-3 border border-border"
              >
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
                  <h3 className="font-semibold">{fish.name}</h3>
                  <p className="text-sm text-muted-foreground">{fish.description}</p>
                  <div className="flex mt-1 space-x-4">
                    <span className="text-xs text-muted-foreground">{fish.habitat}</span>
                    <span className="text-xs text-muted-foreground">{fish.size}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default FishList;
