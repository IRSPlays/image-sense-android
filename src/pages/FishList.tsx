
import React, { useState } from 'react';
import { Fish, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';

// Updated comprehensive fish data
const fishData = [
  // Protected species
  { id: 1, name: 'Basking Shark', scientificName: 'Cetorhinus maximus', description: 'Protected species', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Marine', size: 'Very large', status: 'protected' },
  { id: 2, name: 'Devil Rays', scientificName: 'Mobula species', description: 'Protected species', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 3, name: 'Giant Guitarfishes', scientificName: 'Glaucostegus spp.', description: 'Protected species', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 4, name: 'Great White Shark', scientificName: 'Carcharodon carcharias', description: 'Protected species', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Marine', size: 'Very large', status: 'protected' },
  { id: 5, name: 'Great Hammerhead Shark', scientificName: 'Sphyrna mokarran', description: 'Protected species', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 6, name: 'Whale Shark', scientificName: 'Rhincodon typus', description: 'Protected species', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg', habitat: 'Marine', size: 'Very large', status: 'protected' },
  { id: 7, name: 'Smooth Hammerhead Shark', scientificName: 'Sphyrna zygaena', description: 'Protected species', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 8, name: 'Scalloped Hammerhead Shark', scientificName: 'Sphyrna lewini', description: 'Protected species', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 9, name: 'Shortfin Mako Shark', scientificName: 'Isurus oxyrinchus', description: 'Protected species', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 10, name: 'Longfin Mako Shark', scientificName: 'Isurus paucus', description: 'Protected species', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 11, name: 'Manta Rays', scientificName: 'Manta spp.', description: 'Protected species', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg', habitat: 'Marine', size: 'Very large', status: 'protected' },
  { id: 12, name: 'Oceanic White-tip Shark', scientificName: 'Carcharhinus longimanus', description: 'Protected species', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 13, name: 'Porbeagle Shark', scientificName: 'Lamna nasus', description: 'Protected species', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 14, name: 'Sawfish', scientificName: 'Pristis spp.', description: 'Protected species', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 15, name: 'Seahorses', scientificName: 'Hippocampus spp.', description: 'Protected species', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Marine', size: 'Small', status: 'protected' },
  { id: 16, name: 'Silky Shark', scientificName: 'Carcharhinus falciformis', description: 'Protected species', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 17, name: 'White Teatfish', scientificName: 'Holothuria fuscogilva', description: 'Protected species', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg', habitat: 'Marine', size: 'Medium', status: 'protected' },
  { id: 18, name: 'Black Teatfish', scientificName: 'Holothuria nobilis', description: 'Protected species', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg', habitat: 'Marine', size: 'Medium', status: 'protected' },
  { id: 19, name: 'Thresher Sharks', scientificName: 'Alopias spp.', description: 'Protected species', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  { id: 20, name: 'Wedgefishes', scientificName: 'Rhinidae spp.', description: 'Protected species', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Marine', size: 'Large', status: 'protected' },
  
  // Non-protected species
  { id: 21, name: 'Orange-Spotted Grouper', scientificName: 'Epinephelus coioides', description: 'Popular food fish', imageUrl: 'https://i.imgur.com/iNPCO9V.jpg', habitat: 'Freshwater', size: '25-30 cm', status: 'non-protected' },
  { id: 22, name: 'Leopard Coral Trout', scientificName: 'Plectropomus leopardus', description: 'Coral reef predator', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Marine', size: 'Up to 120 cm', status: 'non-protected' },
  { id: 23, name: 'Spotted Coral Trout', scientificName: 'Plectropomus maculatus', description: 'Spotted reef-dwelling fish', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Marine', size: '30 cm', status: 'non-protected' },
  { id: 24, name: 'Malabar Grouper', scientificName: 'Epinephelus malabaricus', description: 'Large reef-associated fish', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Marine', size: '58-64 cm', status: 'non-protected' },
  { id: 25, name: 'Honeycomb Grouper', scientificName: 'Epinephelus quoyanus', description: 'Distinctive honeycomb pattern', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Marine', size: '24 cm', status: 'non-protected' },
  { id: 26, name: 'Chocolate Hind', scientificName: 'Cephalopholis boenak', description: 'Small grouper with chocolate coloration', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Marine', size: '12 cm', status: 'non-protected' },
  { id: 27, name: 'Blue-Lined Hind', scientificName: 'Cephalopholis formosa', description: 'Colorful reef fish', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg', habitat: 'Marine', size: '17 cm', status: 'non-protected' },
  { id: 28, name: 'Cloudy Grouper', scientificName: 'Epinephelus erythrurus', description: 'Mottled appearance', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg', habitat: 'Marine', size: 'Unknown', status: 'non-protected' },
  { id: 29, name: 'Blacktip Grouper', scientificName: 'Epinephelus fasciatus', description: 'Distinguished by black-tipped fins', imageUrl: 'https://i.imgur.com/iNPCO9V.jpg', habitat: 'Marine', size: '25-30 cm', status: 'non-protected' },
  { id: 30, name: 'Barramundi / Seabass', scientificName: 'Lates calcarifer', description: 'Popular sport and food fish', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Freshwater/Marine', size: '29-60 cm', status: 'non-protected' },
  { id: 31, name: 'Golden Snapper', scientificName: 'Lutjanus johnii', description: 'Valued for its taste', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Marine', size: '39 cm', status: 'non-protected' },
  { id: 32, name: 'Red Snapper', scientificName: 'Lutjanus erythropterus', description: 'Popular food fish', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Marine', size: 'Up to 50 cm', status: 'non-protected' },
  { id: 33, name: 'Giant Trevally', scientificName: 'Caranx ignobilis', description: 'Powerful predatory fish', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg', habitat: 'Marine', size: 'Up to 60 cm', status: 'non-protected' },
  { id: 34, name: 'Yellowtail Scad', scientificName: 'Atule mate', description: 'Common schooling fish', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg', habitat: 'Marine', size: '17 cm', status: 'non-protected' },
  { id: 35, name: 'Spanish Mackerel', scientificName: 'Scomberomorus commerson', description: 'Prized game fish', imageUrl: 'https://i.imgur.com/iNPCO9V.jpg', habitat: 'Marine', size: 'Up to 240 cm', status: 'non-protected' },
  { id: 36, name: 'Blacktip Reef Shark', scientificName: 'Carcharinus melanopterus', description: 'Reef-associated shark', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Marine', size: '96 cm', status: 'non-protected' }
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
              <Link 
                key={fish.id} 
                to={`/fish/${fish.id}`}
                className="block"
              >
                <div className="flex items-center bg-card rounded-lg p-3 border border-border hover:border-primary transition-all">
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
                    <p className="text-sm text-muted-foreground">{fish.scientificName}</p>
                    <div className="flex mt-1 space-x-4">
                      <span className="text-xs text-muted-foreground">{fish.habitat}</span>
                      <span className="text-xs text-muted-foreground">{fish.size}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default FishList;
