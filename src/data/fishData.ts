
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
  { id: 1, name: 'Basking Shark', scientificName: 'Cetorhinus maximus', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Cetorhinus_maximus_by_greg_skomal.JPG/1200px-Cetorhinus_maximus_by_greg_skomal.JPG', habitat: 'Marine', size: 'Very large', status: 'protected', 
    details: 'The basking shark is the second-largest living shark and fish, after the whale shark, and one of three plankton-eating shark species, along with the whale shark and megamouth shark. Adults typically reach 7.9 m (26 ft) in length. It is usually greyish-brown, with mottled skin. The caudal fin has a strong lateral keel and a crescent shape.' },
  
  { id: 2, name: 'Devil Rays', scientificName: 'Mobula species', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Mobula_birostris_in_Revillagigedo.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'Devil rays are large rays belonging to the genus Mobula. These rays are characterized by their cephalic fins, which extend as fleshy appendages from the front of their heads. They are found in tropical and subtropical waters worldwide and can grow to impressive sizes with wingspans of up to 5.2 meters.' },
  
  { id: 3, name: 'Giant Guitarfishes', scientificName: 'Glaucostegus spp.', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Rhinobatos_typus.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'Giant guitarfishes are ray-like sharks with an elongated body and a flattened head. They have a distinctive shape that resembles a guitar, hence their name. These creatures can grow up to 3 meters in length and are found in shallow coastal waters. They are threatened by fishing practices and habitat degradation.' },
  
  { id: 4, name: 'Great White Shark', scientificName: 'Carcharodon carcharias', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/56/White_shark.jpg', habitat: 'Marine', size: 'Very large', status: 'protected',
    details: 'The great white shark is a species of large mackerel shark notable for its size, with larger female individuals growing to 6.1 m (20 ft) in length and 1,905–2,268 kg (4,200–5,000 lb) in weight at maturity. They are known for their distinctive coloration: a gray dorsal area and a white underside.' },
  
  { id: 5, name: 'Great Hammerhead Shark', scientificName: 'Sphyrna mokarran', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Great_hammerhead_shark_noaa.jpg/1200px-Great_hammerhead_shark_noaa.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The great hammerhead shark is the largest species of hammerhead shark, belonging to the family Sphyrnidae, attaining an average length of 4.6 m (15 ft) and reaching a maximum length of 6.1 m (20 ft). It is found in tropical and warm temperate waters worldwide, inhabiting coastal areas and the continental shelf.' },
  
  { id: 6, name: 'Whale Shark', scientificName: 'Rhincodon typus', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Whale_Shark_Cancelation.jpg', habitat: 'Marine', size: 'Very large', status: 'protected',
    details: 'The whale shark is a slow-moving, filter-feeding carpet shark and the largest known extant fish species. The largest confirmed individual had a length of 18.8 m (62 ft). The whale shark holds many records for size in the animal kingdom, most notably being by far the largest living non-mammalian vertebrate.' },
  
  { id: 7, name: 'Smooth Hammerhead Shark', scientificName: 'Sphyrna zygaena', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Hammerhead2.jpg/1200px-Hammerhead2.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The smooth hammerhead is a species of hammerhead shark and part of the family Sphyrnidae. This species can be distinguished from other hammerheads by its centrally notched and broadly arched head. The smooth hammerhead can grow up to 5 m (16 ft) long and is found worldwide in temperate and tropical waters.' },
  
  { id: 8, name: 'Scalloped Hammerhead Shark', scientificName: 'Sphyrna lewini', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Scalloped_Hammerhead_Shark.jpg/1200px-Scalloped_Hammerhead_Shark.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The scalloped hammerhead is a species of hammerhead shark and part of the family Sphyrnidae. Named for the notches on the front edge of its hammer-shaped head, this shark is found in warm temperate and tropical waters worldwide, inhabiting coastal areas and the continental shelf.' },
  
  { id: 9, name: 'Shortfin Mako Shark', scientificName: 'Isurus oxyrinchus', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Isurus_oxyrinchus_by_mark_conlin2.JPG/1200px-Isurus_oxyrinchus_by_mark_conlin2.JPG', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The shortfin mako shark is a large mackerel shark. It is commonly referred to as the mako shark, as is the longfin mako shark. The shortfin mako can reach a size of 4 m (13 ft) in length. The species is classified as endangered by the IUCN.' },
  
  { id: 10, name: 'Longfin Mako Shark', scientificName: 'Isurus paucus', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Longfin_mako_shark.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The longfin mako shark is a species of mackerel shark in the family Lamnidae, with a probable worldwide distribution in temperate and tropical waters. A relatively uncommon species, it is commonly confused with its better-known relative, the shortfin mako shark.' },
  
  { id: 11, name: 'Manta Rays', scientificName: 'Manta spp.', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Manta_birostris-Thailand4.jpg/1200px-Manta_birostris-Thailand4.jpg', habitat: 'Marine', size: 'Very large', status: 'protected',
    details: 'Manta rays are large rays belonging to the genus Manta. The larger species, M. birostris, reaches 7 m (23 ft) in width, while the smaller, M. alfredi, reaches 5.5 m (18 ft). Mantas are found in tropical and subtropical waters worldwide.' },
  
  { id: 12, name: 'Oceanic White-tip Shark', scientificName: 'Carcharhinus longimanus', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Oceanic_White_Tip.jpg/1200px-Oceanic_White_Tip.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The oceanic whitetip shark is a large pelagic requiem shark inhabiting tropical and warm temperate seas. Its stocky body is most notable for its long, white-tipped, rounded fins. This aggressive but slow-moving fish dominates feeding frenzies. It is a critical endangered species.' },
  
  { id: 13, name: 'Porbeagle Shark', scientificName: 'Lamna nasus', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Lamna_nasus_noaa.jpg/1200px-Lamna_nasus_noaa.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The porbeagle (Lamna nasus) is a species of mackerel shark in the family Lamnidae, distributed widely in the cold and temperate marine waters of the North Atlantic and Southern Hemisphere. In the Southern Hemisphere, it is known as the Mackerel Shark or Blue Dog.' },
  
  { id: 14, name: 'Sawfish', scientificName: 'Pristis spp.', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pristis_pectinata_noaa.jpg/1200px-Pristis_pectinata_noaa.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'Sawfish, also known as carpenter sharks, are a family of rays characterized by a long, narrow, flattened rostrum, or nose extension, lined with sharp transverse teeth, arranged in a way that resembles a saw. They are among the largest fish, with some species reaching lengths of about 7–7.6 m (23–25 ft).' },
  
  { id: 15, name: 'Seahorses', scientificName: 'Hippocampus spp.', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Hippocampus_whitei2.jpg/330px-Hippocampus_whitei2.jpg', habitat: 'Marine', size: 'Small', status: 'protected',
    details: 'Seahorses are a group of marine fish in the genus Hippocampus. They have a head and neck suggestive of a horse, hence their name. They have a characteristic S-shaped body, have a forward-tilted posture, and lack pelvic fins. Many species are threatened by human activities such as collection for traditional medicine.' },
  
  { id: 16, name: 'Silky Shark', scientificName: 'Carcharhinus falciformis', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Caribbean_reef_shark.jpg/1200px-Caribbean_reef_shark.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'The silky shark is a species of requiem shark, in the family Carcharhinidae, named for the smooth texture of its skin. It is one of the most abundant sharks in the pelagic zone, and can be found around the world in tropical waters.' },
  
  { id: 17, name: 'White Teatfish', scientificName: 'Holothuria fuscogilva', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Holothuria_fuscogilva_Maldives.JPG/330px-Holothuria_fuscogilva_Maldives.JPG', habitat: 'Marine', size: 'Medium', status: 'protected',
    details: 'The white teatfish is a species of sea cucumber in the family Holothuriidae. It is highly valued in East Asian markets and its high market value has led to overfishing throughout its range.' },
  
  { id: 18, name: 'Black Teatfish', scientificName: 'Holothuria nobilis', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Holothuria_whitmaei.jpg', habitat: 'Marine', size: 'Medium', status: 'protected',
    details: 'The black teatfish is a species of sea cucumber in the family Holothuriidae. Like the white teatfish, it has been overharvested for the food market, particularly in Asia, and is now threatened in many regions.' },
  
  { id: 19, name: 'Thresher Sharks', scientificName: 'Alopias spp.', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Alopias_vulpinus.jpg/1280px-Alopias_vulpinus.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'Thresher sharks are large lamniform sharks of the family Alopiidae found in all temperate and tropical oceans of the world. The distinctive feature of all thresher sharks is the elongated upper lobe of the caudal fin which they use to hunt schooling fish.' },
  
  { id: 20, name: 'Wedgefishes', scientificName: 'Rhinidae spp.', description: 'Protected species', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/70/White-spotted_Wedgefish_%28Rhynchobatus_australiae%29.jpg', habitat: 'Marine', size: 'Large', status: 'protected',
    details: 'Wedgefishes are a family of rays characterized by a wedge-shaped snout. They are found in shallow tropical and subtropical coastal waters. They are highly valued for their fins, which has led to severe population declines in many regions.' },
  
  // Non-protected species
  { id: 21, name: 'Orange-Spotted Grouper', scientificName: 'Epinephelus coioides', description: 'Popular food fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Epinephelus_coioides.jpg', habitat: 'Freshwater', size: '25-30 cm', status: 'non-protected',
    details: 'The orange-spotted grouper is a species of marine fish in the family Serranidae. It is found in the Western Pacific and Indian Ocean from the Red Sea to Fiji and southern Japan. It is a popular food fish throughout its range.',
    chineseName: '石斑魚 (Shí bān yú), 红点石斑 (Hóng diǎn shí bān)',
    malayName: 'Ikan Kerapu bintik jingga, Kerapu Pinang, Kerapu Balong, Kerapu Rintek, Kerapu Pakpanang',
    teochewName: 'Orh Ga' },
  
  { id: 22, name: 'Leopard Coral Trout', scientificName: 'Plectropomus leopardus', description: 'Coral reef predator', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Plectropomus_leopardus.jpg', habitat: 'Marine', size: 'Up to 120 cm', status: 'non-protected',
    details: 'The leopard coral trout is a species of fish in the Serranidae family. It is found in the Western Pacific including the Great Barrier Reef. It is a predatory species that feeds primarily on other fish and is highly valued as a food fish.',
    chineseName: '石斑魚 (Shí bān yú), 东星斑 (Dōng xīng bān ), 西星斑 (Xi xīng bān)',
    malayName: 'Kerapu Sunoh Bara, Kerapu Bintang',
    teochewName: 'Ang Gau' },
  
  { id: 23, name: 'Spotted Coral Trout', scientificName: 'Plectropomus maculatus', description: 'Spotted reef-dwelling fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Plectropomus_maculatus_in_the_Great_Barrier_reef.jpg/1200px-Plectropomus_maculatus_in_the_Great_Barrier_reef.jpg', habitat: 'Marine', size: '30 cm', status: 'non-protected',
    details: 'The spotted coral trout is a species of fish in the Serranidae family, native to the Western Pacific. It inhabits coral reefs and is an important predator in reef ecosystems.',
    chineseName: '石斑魚 (Shí bān yú), 七星斑 (Qī xīng bān), 太星斑 (Tai xīng bān)',
    malayName: 'Ikan Kerapu sunoh pisang, Kerapu Bara',
    teochewName: 'Ang Gau' },
  
  { id: 24, name: 'Malabar Grouper', scientificName: 'Epinephelus malabaricus', description: 'Large reef-associated fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Epinephelus_malabaricus.jpg', habitat: 'Marine', size: '58-64 cm', status: 'non-protected',
    details: 'The Malabar grouper is a species of marine fish in the family Serranidae. It is widely distributed in the Indo-Pacific region. It is a commercially important fish and is also farmed in aquaculture.',
    chineseName: 'Gao Heurr 石班鱼',
    malayName: 'Kerapu' },
  
  { id: 25, name: 'Honeycomb Grouper', scientificName: 'Epinephelus quoyanus', description: 'Distinctive honeycomb pattern', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Epinephelus_quoyanus_001.jpg', habitat: 'Marine', size: '24 cm', status: 'non-protected',
    details: 'The honeycomb grouper is a species of marine fish in the family Serranidae. It has a distinctive honeycomb-like pattern on its body, which gives it its common name.',
    chineseName: '石斑魚 (Shí bān yú), 蜜蜂斑 (Mìfēng bān)',
    malayName: 'Ikan Kerapu Cicak, Kerapu Tukul',
    teochewName: 'Gao Her' },
  
  { id: 26, name: 'Chocolate Hind', scientificName: 'Cephalopholis boenak', description: 'Small grouper with chocolate coloration', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Cephalopholis_boenak_off_Sabah.jpg', habitat: 'Marine', size: '12 cm', status: 'non-protected',
    details: 'The chocolate hind is a species of marine fish in the family Serranidae. It is a small grouper with a distinctive chocolate-brown coloration, found in coral reef habitats in the Indo-Pacific region.',
    chineseName: '石斑魚 (Shí bān yú), 印度石斑 (Yìndù shí bān)',
    malayName: 'Kerapu Tenggarong, Kerapu Belang Perang' },
  
  { id: 27, name: 'Brown-Marbled Grouper', scientificName: 'Epinephelus fuscoguttatus', description: 'Large grouper with mottled pattern', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Epinephelus_fuscoguttatus.jpg/1200px-Epinephelus_fuscoguttatus.jpg', habitat: 'Marine', size: '95 cm', status: 'non-protected',
    details: 'The brown-marbled grouper is a species of marine fish in the family Serranidae. It is a large, slow-growing species found in the Indo-Pacific region, particularly around coral reefs. It is highly prized as a food fish in many Asian countries.',
    chineseName: '石斑魚 (Shí bān yú), 老虎斑 (Lǎohǔ bān)',
    malayName: 'Kerapu Hitam, Kerapu Harimau',
    teochewName: 'Lao Her' },
  
  { id: 28, name: 'Giant Grouper', scientificName: 'Epinephelus lanceolatus', description: 'Largest bony fish in coral reefs', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Giant_grouper.JPG/1200px-Giant_grouper.JPG', habitat: 'Marine', size: 'Up to 270 cm', status: 'non-protected',
    details: 'The giant grouper is the largest bony fish found in coral reefs and can grow to a length of 270 cm and a weight of 400 kg. It has a broad diet, feeding on a variety of fishes, crustaceans, and even small sharks.',
    chineseName: '石斑魚 (Shí bān yú), 龙趸 (Lóng dǔn)',
    malayName: 'Kerapu Kertang, Kertak, Kertang, Kertang Putih, Kertang Kapur',
    teochewName: 'Lung Tan' },
  
  { id: 29, name: 'Greasy Grouper', scientificName: 'Epinephelus tauvina', description: 'Common reef fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Epinephelus_tauvina.jpg/440px-Epinephelus_tauvina.jpg', habitat: 'Marine', size: '75 cm', status: 'non-protected',
    details: 'The greasy grouper is a species of marine fish in the family Serranidae. It is widely distributed throughout the Indo-Pacific region and is a common inhabitant of coral reefs and rocky areas. It is a commercially important food fish in many regions.',
    chineseName: '石斑魚 (Shí bān yú)',
    malayName: 'Kerapu Kayu, Kerapu Hitam',
    teochewName: 'Gao Her' },
  
  { id: 30, name: 'Barramundi / Seabass', scientificName: 'Lates calcarifer', description: 'Popular sport and food fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Barramundi.jpg/1200px-Barramundi.jpg', habitat: 'Freshwater/Marine', size: '29-60 cm', status: 'non-protected',
    details: 'Barramundi, also known as Asian sea bass, is a species of catadromous fish with an elongated body that is compressed and has a large, slightly oblique mouth. They generally inhabit rivers, estuaries, and coastal waters. They are popular targets for recreational fishing and are valued food fish.',
    chineseName: '尖吻鲈 (Jiān wěn lú), 金目鲈 (Jīnmù lú), 盲槽 (Máng cáo), 石甲 (Shí jiǎ)',
    malayName: 'Ikan Siakap',
    teochewName: 'Siakap, Kim Bak Lor' },
  
  { id: 31, name: 'Red Snapper', scientificName: 'Lutjanus campechanus', description: 'Highly valued food fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Lutjanus_campechanus.jpg', habitat: 'Marine', size: '60-100 cm', status: 'non-protected',
    details: 'The red snapper is a species of snapper native to the western Atlantic Ocean including the Gulf of Mexico. It is commercially important and highly sought-after as a food fish.',
    chineseName: '红鱲 (Hóng jiān), 红衫 (Hóng shān)',
    malayName: 'Ikan Merah, Ikan Merah Mata Besar',
    teochewName: 'Ang Sa' },
  
  { id: 32, name: 'John Dory', scientificName: 'Zeus faber', description: 'Distinctive laterally compressed fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Zeus_faber.jpg/1200px-Zeus_faber.jpg', habitat: 'Marine', size: '30-50 cm', status: 'non-protected',
    details: 'The John Dory is a marine fish with a distinctive appearance: it has a laterally compressed, oval body with a large, extendable mouth. It is highly valued as a food fish in various cuisines around the world.',
    chineseName: '金钱鱼 (Jīnqián yú)',
    malayName: 'Ikan Cermin',
    teochewName: 'Gim Chi Zi' },
  
  { id: 33, name: 'Sea Bream', scientificName: 'Pagrus major', description: 'Common food fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Pagrus_major.jpg', habitat: 'Marine', size: '40-60 cm', status: 'non-protected',
    details: 'The sea bream is a species of porgy native to the northwestern Pacific Ocean. It is an important food fish in Asia, particularly in Japanese, Korean, and Chinese cuisines.',
    chineseName: '鲷鱼 (Diào yú), 红立鱼 (Hóng lì yú)',
    malayName: 'Ikan Kerisi',
    teochewName: 'Ang Her' },
  
  { id: 34, name: 'Silver Pomfret', scientificName: 'Pampus argenteus', description: 'Highly valued table fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Pampus_argenteus.jpg', habitat: 'Marine', size: '25-35 cm', status: 'non-protected',
    details: 'The silver pomfret is a species of butterfish that lives in coastal waters and estuaries throughout the Indo-Pacific region. It is a popular food fish in many Asian countries, particularly in Chinese, Indian, and Persian Gulf cuisines.',
    chineseName: '鲳鱼 (Chāng yú), 白鲳 (Bái chāng)',
    malayName: 'Ikan Bawal Putih, Bawal Tambak',
    teochewName: 'Pek Chior' },
  
  { id: 35, name: 'Threadfin Bream', scientificName: 'Nemipterus spp.', description: 'Common food fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Nemipterus_virgatus.JPG', habitat: 'Marine', size: '15-30 cm', status: 'non-protected',
    details: 'Threadfin breams are a group of fishes in the family Nemipteridae. They are commonly found in the coastal waters of the Indo-Pacific region and are important food fishes in many Asian countries.',
    chineseName: '长尾鱼 (Cháng wěi yú)',
    malayName: 'Ikan Kerisi',
    teochewName: 'Ri Her' },
  
  { id: 36, name: 'Blacktip Reef Shark', scientificName: 'Carcharinus melanopterus', description: 'Reef-associated shark', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Carcharhinus_melanopterus_mirihi.JPG', habitat: 'Marine', size: '96 cm', status: 'non-protected',
    details: 'The blacktip reef shark is a species of requiem shark, in the family Carcharhinidae. One of the most common sharks found in shallow tropical and subtropical waters around coral reefs of the Indian and Pacific Oceans. Adult males grow to 1.6 m (5.2 ft) long, while females reach 1.8 m (5.9 ft).',
    chineseName: '鲨鱼 (Shāyú)',
    malayName: 'Kalitan, Yu Kepak Hitam' },
    
  { id: 37, name: 'Golden Pomfret', scientificName: 'Trachinotus blochii', description: 'Highly valued food fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Trachinotus_blochii_2.jpg', habitat: 'Marine', size: '30-60 cm', status: 'non-protected',
    details: 'The golden pomfret, also known as the snubnose pompano, is a species of pompano in the family Carangidae. It is highly valued as a food fish throughout its range in the Indo-Pacific region.',
    chineseName: '金鲳 (Jīn chāng)',
    malayName: 'Ikan Bawal Mas, Bawal Emas',
    teochewName: 'Kim Chior' },
  
  { id: 38, name: 'Yellowfin Tuna', scientificName: 'Thunnus albacares', description: 'Important commercial fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Thunnus_albacares.jpg/1200px-Thunnus_albacares.jpg', habitat: 'Marine', size: '150-200 cm', status: 'non-protected',
    details: 'The yellowfin tuna is a species of tuna found in pelagic waters of tropical and subtropical oceans worldwide. It is widely used in raw fish dishes, especially sashimi, in Japanese cuisine, and has become increasingly popular in Western countries.',
    chineseName: '黄鳍金枪鱼 (Huáng qí jīn qiāng yú)',
    malayName: 'Ikan Tuna Sirip Kuning',
    teochewName: 'Ng Ji Tan' },
  
  { id: 39, name: 'Milkfish', scientificName: 'Chanos chanos', description: 'Important food fish in Southeast Asia', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Bandeng_asep.jpg/1200px-Bandeng_asep.jpg', habitat: 'Marine/Brackish', size: '70-100 cm', status: 'non-protected',
    details: 'The milkfish is the sole living species in the family Chanidae. It is an important food fish in Southeast Asia and is the national fish of the Philippines. It is commonly farmed in fish ponds in Indonesia, Philippines, and Taiwan.',
    chineseName: '虱目魚 (Shī mù yú)',
    malayName: 'Ikan Bandeng',
    teochewName: 'Sar Bak Hu' },
  
  { id: 40, name: 'Tilapia', scientificName: 'Oreochromis niloticus', description: 'Important farmed food fish', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Oreochromis-niloticus-Nairobi.JPG/1200px-Oreochromis-niloticus-Nairobi.JPG', habitat: 'Freshwater', size: '20-40 cm', status: 'non-protected',
    details: 'Tilapia is the common name for nearly a hundred species of cichlid fish from the coelotilapine, coptodonine, heterotilapine, oreochromine, pelmatolapiine, and tilapiine tribes. Tilapia are mainly freshwater fish, inhabiting shallow streams, ponds, rivers, and lakes, and are among the most widely farmed fish worldwide.',
    chineseName: '罗非鱼 (Luó fēi yú)',
    malayName: 'Ikan Tilapia',
    teochewName: 'Luor Hui Hi' }
];
