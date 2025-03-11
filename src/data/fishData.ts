
export interface Fish {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  imageUrl: string;
  habitat: string;
  size: string;
  status: 'protected' | 'non-protected';
  details?: string;
  chineseName?: string;
  malayName?: string;
  teochewName?: string;
}

// Comprehensive list of fish data
export const fishData: Fish[] = [
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
  
  { id: 16, name: 'Silky Shark', scientificName: 'Carcharhinus falciformis', description: 'Protected species', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The silky shark is a species of requiem shark, in the family Carcharhinidae, named for the smooth texture of its skin. It is one of the most abundant sharks in the pelagic zone, and can be found around the world in tropical waters.' },
  
  { id: 17, name: 'White Teatfish', scientificName: 'Holothuria fuscogilva', description: 'Protected species', imageUrl: 'https://i.imgur.com/M9zEGXQ.jpg', habitat: 'Marine', size: 'Medium', status: 'protected',
    details: 'The white teatfish is a species of sea cucumber in the family Holothuriidae. It is highly valued in East Asian markets and its high market value has led to overfishing throughout its range.' },
  
  { id: 18, name: 'Black Teatfish', scientificName: 'Holothuria nobilis', description: 'Protected species', imageUrl: 'https://i.imgur.com/gORZ7Uf.jpg', habitat: 'Marine', size: 'Medium', status: 'protected',
    details: 'The black teatfish is a species of sea cucumber in the family Holothuriidae. Like the white teatfish, it has been overharvested for the food market, particularly in Asia, and is now threatened in many regions.' },
  
  { id: 19, name: 'Thresher Sharks', scientificName: 'Alopias spp.', description: 'Protected species', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'Thresher sharks are large lamniform sharks of the family Alopiidae found in all temperate and tropical oceans of the world. The distinctive feature of all thresher sharks is the elongated upper lobe of the caudal fin which they use to hunt schooling fish.' },
  
  { id: 20, name: 'Wedgefishes', scientificName: 'Rhinidae spp.', description: 'Protected species', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'Wedgefishes are a family of rays characterized by a wedge-shaped snout. They are found in shallow tropical and subtropical coastal waters. They are highly valued for their fins, which has led to severe population declines in many regions.' },
  
  // Non-protected species
  { id: 21, name: 'Orange-Spotted Grouper', scientificName: 'Epinephelus coioides', description: 'Popular food fish', imageUrl: 'https://i.imgur.com/iNPCO9V.jpg', habitat: 'Freshwater', size: '25-30 cm', status: 'non-protected',
    details: 'The orange-spotted grouper is a species of marine fish in the family Serranidae. It is found in the Western Pacific and Indian Ocean from the Red Sea to Fiji and southern Japan. It is a popular food fish throughout its range.',
    chineseName: '石斑魚 (Shí bān yú), 红点石斑 (Hóng diǎn shí bān)',
    malayName: 'Ikan Kerapu bintik jingga, Kerapu Pinang, Kerapu Balong, Kerapu Rintek, Kerapu Pakpanang',
    teochewName: 'Orh Ga' },
  
  { id: 22, name: 'Leopard Coral Trout', scientificName: 'Plectropomus leopardus', description: 'Coral reef predator', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Marine', size: 'Up to 120 cm', status: 'non-protected',
    details: 'The leopard coral trout is a species of fish in the Serranidae family. It is found in the Western Pacific including the Great Barrier Reef. It is a predatory species that feeds primarily on other fish and is highly valued as a food fish.',
    chineseName: '石斑魚 (Shí bān yú), 东星斑 (Dōng xīng bān ), 西星斑 (Xi xīng bān)',
    malayName: 'Kerapu Sunoh Bara, Kerapu Bintang',
    teochewName: 'Ang Gau' },
  
  { id: 23, name: 'Spotted Coral Trout', scientificName: 'Plectropomus maculatus', description: 'Spotted reef-dwelling fish', imageUrl: 'https://i.imgur.com/p0LPvgj.jpg', habitat: 'Marine', size: '30 cm', status: 'non-protected',
    details: 'The spotted coral trout is a species of fish in the Serranidae family, native to the Western Pacific. It inhabits coral reefs and is an important predator in reef ecosystems.',
    chineseName: '石斑魚 (Shí bān yú), 七星斑 (Qī xīng bān), 太星斑 (Tai xīng bān)',
    malayName: 'Ikan Kerapu sunoh pisang, Kerapu Bara',
    teochewName: 'Ang Gau' },
  
  { id: 24, name: 'Malabar Grouper', scientificName: 'Epinephelus malabaricus', description: 'Large reef-associated fish', imageUrl: 'https://i.imgur.com/VO3mFS1.jpg', habitat: 'Marine', size: '58-64 cm', status: 'non-protected',
    details: 'The Malabar grouper is a species of marine fish in the family Serranidae. It is widely distributed in the Indo-Pacific region. It is a commercially important fish and is also farmed in aquaculture.',
    chineseName: 'Gao Heurr 石班鱼',
    malayName: 'Kerapu' },
  
  { id: 25, name: 'Honeycomb Grouper', scientificName: 'Epinephelus quoyanus', description: 'Distinctive honeycomb pattern', imageUrl: 'https://i.imgur.com/2kJnD5C.jpg', habitat: 'Marine', size: '24 cm', status: 'non-protected',
    details: 'The honeycomb grouper is a species of marine fish in the family Serranidae. It has a distinctive honeycomb-like pattern on its body, which gives it its common name.',
    chineseName: '石斑魚 (Shí bān yú), 蜜蜂斑 (Mìfēng bān)',
    malayName: 'Ikan Kerapu Cicak, Kerapu Tukul',
    teochewName: 'Gao Her' },
  
  // Continue with more fish data...
  { id: 26, name: 'Chocolate Hind', scientificName: 'Cephalopholis boenak', description: 'Small grouper with chocolate coloration', imageUrl: 'https://i.imgur.com/CwQQZVC.jpg', habitat: 'Marine', size: '12 cm', status: 'non-protected',
    details: 'The chocolate hind is a species of marine fish in the family Serranidae. It is a small grouper with a distinctive chocolate-brown coloration, found in coral reef habitats in the Indo-Pacific region.',
    chineseName: '石斑魚 (Shí bān yú), 印度石斑 (Yìndù shí bān)',
    malayName: 'Kerapu Tenggarong, Kerapu Belang Perang' },
  
  { id: 30, name: 'Barramundi / Seabass', scientificName: 'Lates calcarifer', description: 'Popular sport and food fish', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Freshwater/Marine', size: '29-60 cm', status: 'non-protected',
    details: 'Barramundi, also known as Asian sea bass, is a species of catadromous fish with an elongated body that is compressed and has a large, slightly oblique mouth. They generally inhabit rivers, estuaries, and coastal waters. They are popular targets for recreational fishing and are valued food fish.',
    chineseName: '尖吻鲈 (Jiān wěn lú), 金目鲈 (Jīnmù lú), 盲槽 (Máng cáo), 石甲 (Shí jiǎ)',
    malayName: 'Ikan Siakap',
    teochewName: 'Siakap, Kim Bak Lor' },
  
  { id: 36, name: 'Blacktip Reef Shark', scientificName: 'Carcharinus melanopterus', description: 'Reef-associated shark', imageUrl: 'https://i.imgur.com/4oIbrYR.jpg', habitat: 'Marine', size: '96 cm', status: 'non-protected',
    details: 'The blacktip reef shark is a species of requiem shark, in the family Carcharhinidae. One of the most common sharks found in shallow tropical and subtropical waters around coral reefs of the Indian and Pacific Oceans. Adult males grow to 1.6 m (5.2 ft) long, while females reach 1.8 m (5.9 ft).',
    chineseName: '鲨鱼 (Shāyú)',
    malayName: 'Kalitan, Yu Kepak Hitam' }
  
  // Add more fish data as needed
];
