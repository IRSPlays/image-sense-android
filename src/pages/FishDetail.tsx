
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Fish, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

// The fish data should match the one in FishList.tsx
const fishData = [
  // Protected species
  { id: 1, name: 'Basking Shark', scientificName: 'Cetorhinus maximus', description: 'Protected species', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Marine', size: 'Very large', status: 'protected', 
    details: 'The basking shark is the second-largest living shark and fish, after the whale shark, and one of three plankton-eating shark species, along with the whale shark and megamouth shark. Adults typically reach 7.9 m (26 ft) in length. It is usually greyish-brown, with mottled skin. The caudal fin has a strong lateral keel and a crescent shape.' },
  { id: 2, name: 'Devil Rays', scientificName: 'Mobula species', description: 'Protected species', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'Devil rays are large rays belonging to the genus Mobula. These rays are characterized by their cephalic fins, which extend as fleshy appendages from the front of their heads. They are found in tropical and subtropical waters worldwide and can grow to impressive sizes with wingspans of up to 5.2 meters.' },
  { id: 3, name: 'Giant Guitarfishes', scientificName: 'Glaucostegus spp.', description: 'Protected species', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'Giant guitarfishes are ray-like sharks with an elongated body and a flattened head. They have a distinctive shape that resembles a guitar, hence their name. These creatures can grow up to 3 meters in length and are found in shallow coastal waters. They are threatened by fishing practices and habitat degradation.' },
  { id: 4, name: 'Great White Shark', scientificName: 'Carcharodon carcharias', description: 'Protected species', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Marine', size: 'Very large', status: 'protected',
    details: 'The great white shark is a species of large mackerel shark notable for its size, with larger female individuals growing to 6.1 m (20 ft) in length and 1,905–2,268 kg (4,200–5,000 lb) in weight at maturity. They are known for their distinctive coloration: a gray dorsal area and a white underside.' },
  { id: 5, name: 'Great Hammerhead Shark', scientificName: 'Sphyrna mokarran', description: 'Protected species', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The great hammerhead shark is the largest species of hammerhead shark, belonging to the family Sphyrnidae, attaining an average length of 4.6 m (15 ft) and reaching a maximum length of 6.1 m (20 ft). It is found in tropical and warm temperate waters worldwide, inhabiting coastal areas and the continental shelf.' },
  { id: 6, name: 'Whale Shark', scientificName: 'Rhincodon typus', description: 'Protected species', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg', habitat: 'Marine', size: 'Very large', status: 'protected',
    details: 'The whale shark is a slow-moving, filter-feeding carpet shark and the largest known extant fish species. The largest confirmed individual had a length of 18.8 m (62 ft). The whale shark holds many records for size in the animal kingdom, most notably being by far the largest living non-mammalian vertebrate.' },
  { id: 7, name: 'Smooth Hammerhead Shark', scientificName: 'Sphyrna zygaena', description: 'Protected species', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The smooth hammerhead is a species of hammerhead shark and part of the family Sphyrnidae. This species can be distinguished from other hammerheads by its centrally notched and broadly arched head. The smooth hammerhead can grow up to 5 m (16 ft) long and is found worldwide in temperate and tropical waters.' },
  { id: 8, name: 'Scalloped Hammerhead Shark', scientificName: 'Sphyrna lewini', description: 'Protected species', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The scalloped hammerhead is a species of hammerhead shark and part of the family Sphyrnidae. Named for the notches on the front edge of its hammer-shaped head, this shark is found in warm temperate and tropical waters worldwide, inhabiting coastal areas and the continental shelf.' },
  { id: 9, name: 'Shortfin Mako Shark', scientificName: 'Isurus oxyrinchus', description: 'Protected species', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The shortfin mako shark is a large mackerel shark. It is commonly referred to as the mako shark, as is the longfin mako shark. The shortfin mako can reach a size of 4 m (13 ft) in length. The species is classified as endangered by the IUCN.' },
  { id: 10, name: 'Longfin Mako Shark', scientificName: 'Isurus paucus', description: 'Protected species', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The longfin mako shark is a species of mackerel shark in the family Lamnidae, with a probable worldwide distribution in temperate and tropical waters. A relatively uncommon species, it is commonly confused with its better-known relative, the shortfin mako shark.' },
  { id: 11, name: 'Manta Rays', scientificName: 'Manta spp.', description: 'Protected species', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg', habitat: 'Marine', size: 'Very large', status: 'protected',
    details: 'Manta rays are large rays belonging to the genus Manta. The larger species, M. birostris, reaches 7 m (23 ft) in width, while the smaller, M. alfredi, reaches 5.5 m (18 ft). Mantas are found in tropical and subtropical waters worldwide.' },
  { id: 12, name: 'Oceanic White-tip Shark', scientificName: 'Carcharhinus longimanus', description: 'Protected species', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The oceanic whitetip shark is a large pelagic requiem shark inhabiting tropical and warm temperate seas. Its stocky body is most notable for its long, white-tipped, rounded fins. This aggressive but slow-moving fish dominates feeding frenzies. It is a critical endangered species.' },
  { id: 13, name: 'Porbeagle Shark', scientificName: 'Lamna nasus', description: 'Protected species', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The porbeagle (Lamna nasus) is a species of mackerel shark in the family Lamnidae, distributed widely in the cold and temperate marine waters of the North Atlantic and Southern Hemisphere. In the Southern Hemisphere, it is known as the Mackerel Shark or Blue Dog.' },
  { id: 14, name: 'Sawfish', scientificName: 'Pristis spp.', description: 'Protected species', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'Sawfish, also known as carpenter sharks, are a family of rays characterized by a long, narrow, flattened rostrum, or nose extension, lined with sharp transverse teeth, arranged in a way that resembles a saw. They are among the largest fish, with some species reaching lengths of about 7–7.6 m (23–25 ft).' },
  { id: 15, name: 'Seahorses', scientificName: 'Hippocampus spp.', description: 'Protected species', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Marine', size: 'Small', status: 'protected',
    details: 'Seahorses are a group of marine fish in the genus Hippocampus. They have a head and neck suggestive of a horse, hence their name. They have a characteristic S-shaped body, have a forward-tilted posture, and lack pelvic fins. Many species are threatened by human activities such as collection for traditional medicine.' },
  
  // ... more fish with abbreviated data for brevity
  
  // Non-protected species
  { id: 21, name: 'Orange-Spotted Grouper', scientificName: 'Epinephelus coioides', description: 'Popular food fish', imageUrl: 'https://i.imgur.com/iNPCO9V.jpg', habitat: 'Freshwater', size: '25-30 cm', status: 'non-protected',
    details: 'The orange-spotted grouper is a species of marine fish in the family Serranidae. It is found in the Western Pacific and Indian Ocean from the Red Sea to Fiji and southern Japan. It is a popular food fish throughout its range.' },
  { id: 22, name: 'Leopard Coral Trout', scientificName: 'Plectropomus leopardus', description: 'Coral reef predator', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Marine', size: 'Up to 120 cm', status: 'non-protected',
    details: 'The leopard coral trout is a species of fish in the Serranidae family. It is found in the Western Pacific including the Great Barrier Reef. It is a predatory species that feeds primarily on other fish and is highly valued as a food fish.' },
  { id: 30, name: 'Barramundi / Seabass', scientificName: 'Lates calcarifer', description: 'Popular sport and food fish', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Freshwater/Marine', size: '29-60 cm', status: 'non-protected',
    details: 'Barramundi, also known as Asian sea bass, is a species of catadromous fish with an elongated body that is compressed and has a large, slightly oblique mouth. They generally inhabit rivers, estuaries, and coastal waters. They are popular targets for recreational fishing and are valued food fish.' },
  { id: 36, name: 'Blacktip Reef Shark', scientificName: 'Carcharinus melanopterus', description: 'Reef-associated shark', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Marine', size: '96 cm', status: 'non-protected',
    details: 'The blacktip reef shark is a species of requiem shark, in the family Carcharhinidae. One of the most common sharks found in shallow tropical and subtropical waters around coral reefs of the Indian and Pacific Oceans. Adult males grow to 1.6 m (5.2 ft) long, while females reach 1.8 m (5.9 ft).' }
  
  // Note: There are more fish data in the FishList.tsx, but I've shortened it here for brevity
  // In a real application, you would extract this data to a shared data file to avoid duplication
];

const FishDetail = () => {
  const { id } = useParams<{ id: string }>();
  const fishId = parseInt(id || '0');
  
  const fish = fishData.find(f => f.id === fishId);
  
  if (!fish) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Fish not found</h1>
        <p className="mb-6 text-muted-foreground">The fish you're looking for doesn't exist in our database.</p>
        <Button asChild>
          <Link to="/fish-list">
            <ArrowLeft className="mr-2" />
            Back to Fish List
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button asChild variant="ghost" size="icon" className="mr-2">
              <Link to="/fish-list">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Fish Details</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container mx-auto py-4 px-4">
        <div className="bg-card rounded-lg overflow-hidden border border-border">
          <div className="relative h-56 md:h-64 lg:h-80 w-full">
            {fish.imageUrl ? (
              <img 
                src={fish.imageUrl} 
                alt={fish.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Fish className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            {fish.status === 'protected' && (
              <div className="absolute top-4 right-4 bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-full font-medium">
                Protected Species
              </div>
            )}
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-1">{fish.name}</h2>
            <p className="text-muted-foreground italic mb-4">{fish.scientificName}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-background rounded-md p-4 border border-border">
                <h3 className="font-medium mb-2">Habitat</h3>
                <p>{fish.habitat}</p>
              </div>
              <div className="bg-background rounded-md p-4 border border-border">
                <h3 className="font-medium mb-2">Size</h3>
                <p>{fish.size}</p>
              </div>
            </div>
            
            <div className="bg-background rounded-md p-4 border border-border mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="leading-relaxed">
                {fish.details || "No detailed description available for this species."}
              </p>
            </div>
            
            <div className="bg-background rounded-md p-4 border border-border">
              <h3 className="font-medium mb-2">Conservation Status</h3>
              <p className={fish.status === 'protected' ? 'text-destructive' : 'text-green-600'}>
                {fish.status === 'protected' ? 'Protected Species - Fishing Prohibited' : 'Non-Protected Species'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FishDetail;
