
import React, { useState } from 'react';
import { Fish, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

// Updated comprehensive fish data
const fishData = [
  // Protected species
  { id: 1, name: 'Basking Shark', description: 'Cetorhinus maximus - Protected species', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Marine', size: 'Very large', status: 'protected' },
  { id: 2, name: 'Devil Rays', description: 'Mobula species - Protected species', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 3, name: 'Giant Guitarfishes', description: 'Glaucostegus spp. - Protected species', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 4, name: 'Great White Shark', description: 'Carcharodon carcharias - Protected species', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Marine', size: 'Very large', status: 'protected' },
  { id: 5, name: 'Great Hammerhead Shark', description: 'Sphyrna mokarran - Protected species', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 6, name: 'Whale Shark', description: 'Rhincodon typus - Protected species', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg', habitat: 'Marine', size: 'Very large', status: 'protected' },
  
  // Non-protected species
  { id: 7, name: 'Orange-Spotted Grouper', description: 'Epinephelus coioides - Popular food fish', imageUrl: 'https://i.imgur.com/iNPCO9V.jpg', habitat: 'Freshwater', size: '25-30 cm', status: 'non-protected' },
  { id: 8, name: 'Leopard Coral Trout', description: 'Plectropomus leopardus - Coral reef predator', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Marine', size: 'Up to 120 cm', status: 'non-protected' },
  { id: 9, name: 'Malabar Grouper', description: 'Epinephelus malabaricus - Large reef-associated fish', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Marine', size: '58-64 cm', status: 'non-protected' },
  { id: 10, name: 'Barramundi / Seabass', description: 'Lates calcarifer - Popular sport and food fish', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Freshwater/Marine', size: '29-60 cm', status: 'non-protected' },
  { id: 11, name: 'Golden Snapper', description: 'Lutjanus johnii - Valued for its taste', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Marine', size: '39 cm', status: 'non-protected' },
  { id: 12, name: 'Red Snapper', description: 'Lutjanus erythropterus - Popular food fish', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Marine', size: 'Up to 50 cm', status: 'non-protected' },
  { id: 13, name: 'Giant Trevally', description: 'Caranx ignobilis - Powerful predatory fish', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg', habitat: 'Marine', size: 'Up to 60 cm', status: 'non-protected' },
  { id: 14, name: 'Yellowtail Scad', description: 'Atule mate - Common schooling fish', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg', habitat: 'Marine', size: '17 cm', status: 'non-protected' },
  { id: 15, name: 'Spanish Mackerel', description: 'Scomberomorus commerson - Prized game fish', imageUrl: 'https://i.imgur.com/iNPCO9V.jpg', habitat: 'Marine', size: 'Up to 240 cm', status: 'non-protected' },
  { id: 16, name: 'Blacktip Reef Shark', description: 'Carcharinus melanopterus - Reef-associated shark', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Marine', size: '96 cm', status: 'non-protected' }
];

const FishList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'protected', 'non-protected'
  
  const filteredFish = fishData.filter(fish => {
    const nameMatch = fish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filterStatus === 'all' || fish.status === filterStatus;
    return nameMatch && statusMatch;
  });
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Fishify Database</h1>
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
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{fish.name}</h3>
                    {fish.status === 'protected' && (
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                        Protected
                      </span>
                    )}
                  </div>
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
