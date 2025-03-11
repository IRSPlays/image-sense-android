
import React, { useState } from 'react';
import { Fish, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Sample fish data - this would typically come from an API or database
const fishData = [
  { id: 1, name: 'Bluegill', description: 'Freshwater fish with a distinctive blue or black "ear"', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg' },
  { id: 2, name: 'Bass', description: 'Popular game fish known for their fighting spirit', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg' },
  { id: 3, name: 'Trout', description: 'Freshwater fish related to salmon', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg' },
  { id: 4, name: 'Salmon', description: 'Known for their remarkable ability to return to their birthplace to spawn', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg' },
  { id: 5, name: 'Catfish', description: 'Distinguished by their whisker-like barbels', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg' },
  { id: 6, name: 'Carp', description: 'Freshwater fish with large scales and two barbels', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg' },
  { id: 7, name: 'Perch', description: 'Freshwater gamefish with a spiny dorsal fin', imageUrl: 'https://i.imgur.com/iNPCO9V.jpg' },
  { id: 8, name: 'Pike', description: 'Predatory fish with a distinctive elongated body', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg' },
];

const FishList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredFish = fishData.filter(fish => 
    fish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b sticky top-0 bg-background z-10">
        <h1 className="text-2xl font-bold text-center">Fish Database</h1>
        
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
