import { StateRegion, TouristPlace, Hotel, TripPlan, BusinessDetails } from '../types/travel';

export const BUSINESS_INFO: BusinessDetails = {
  name: 'GJ Guide Masters',
  address: 'Thuraiyur Main Road, Trichy District, Tamil Nadu, India',
  phone: '123345678',
  email: 'helpdesk@gjguidemasters.com',
  workingHours: 'Mon - Sun: 7:00 AM – 9:30 PM IST',
  locationDistrict: 'Trichy (Tiruchirappalli)',
  locationState: 'Tamil Nadu',
  locationCountry: 'India'
};

export const STATES_AND_REGIONS: StateRegion[] = [
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    code: 'TN',
    country: 'India',
    tagline: 'Land of Dravidian Temples, Nilgiri Hills & Coastal Heritage',
    description: 'Renowned for towering UNESCO Dravidian stone gopurams, misty colonial hill stations like Ooty & Kodaikanal, temple city Madurai, sacred island Rameswaram, and Thuraiyur / Trichy gateways.',
    capital: 'Chennai',
    bestSeason: 'October to March (Plains & Temples) / April to June & Sept to Jan (Hill Stations)',
    image: '/src/assets/images/ooty_nilgiri_hills_1792907280955.jpg',
    destinationsCount: 4,
    badge: 'Flagship State',
    districts: ['Nilgiris', 'Dindigul', 'Madurai', 'Ramanathapuram', 'Tiruchirappalli', 'Thanjavur']
  },
  {
    id: 'kerala',
    name: 'Kerala',
    code: 'KL',
    country: 'India',
    tagline: "God's Own Country",
    description: 'A tropical paradise known for emerald backwaters in Alleppey, misty Western Ghat tea hills of Munnar, historic spice docks in Kochi, and rainforest sanctuaries of Wayanad.',
    capital: 'Thiruvananthapuram',
    bestSeason: 'September to March (Pleasant) / June to August (Ayurveda Monsoon)',
    image: '/src/assets/images/hero_kerala_backwaters_1792905683789.jpg',
    destinationsCount: 4,
    badge: 'Spotlight State',
    districts: ['Idukki', 'Alappuzha', 'Ernakulam', 'Wayanad', 'Thiruvananthapuram', 'Thrissur']
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    code: 'KA',
    country: 'India',
    tagline: 'One State, Many Worlds',
    description: 'From Vijayanagara stone chariot ruins at Hampi and coffee estates of Coorg to Bandipur wildlife corridors and Gokarna beach sanctuaries.',
    capital: 'Bengaluru',
    bestSeason: 'October to March',
    image: '/src/assets/images/kochi_chinese_fishing_nets_1792905685051.jpg',
    destinationsCount: 2,
    districts: ['Vijayanagara', 'Kodagu', 'Mysuru']
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    code: 'RJ',
    country: 'India',
    tagline: 'The Land of Kings & Palaces',
    description: 'Magnificent Rajput hill forts, Thar desert dunes of Jaisalmer, romantic lakes of Udaipur, and vibrant pink sandstone bazaars of Jaipur.',
    capital: 'Jaipur',
    bestSeason: 'October to March',
    image: '/src/assets/images/madurai_meenakshi_temple_1792907282196.jpg',
    destinationsCount: 1,
    districts: ['Jaipur', 'Udaipur', 'Jaisalmer']
  }
];

export const TOURIST_PLACES: TouristPlace[] = [
  // TAMIL NADU DESTINATIONS
  {
    id: 'ooty',
    country: 'India',
    stateId: 'tamil-nadu',
    stateName: 'Tamil Nadu',
    district: 'Nilgiris',
    city: 'Udhagamandalam (Ooty)',
    name: 'Ooty (Udhagamandalam)',
    tagline: 'Queen of Hill Stations crowned with blue eucalyptus peaks & colonial charm',
    description: 'Perched at 2,240 metres amidst the Nilgiri Hills, Ooty is famous for rolling tea gardens, the UNESCO World Heritage Nilgiri Mountain Railway toy train, lush Government Botanical Gardens, Doddabetta Peak, and handmade artisanal chocolates.',
    locationName: 'Nilgiris District, Western Tamil Nadu',
    coordinates: { lat: 11.4102, lng: 76.6950 },
    heroImage: '/src/assets/images/ooty_nilgiri_hills_1792907280955.jpg',
    gallery: [
      '/src/assets/images/ooty_nilgiri_hills_1792907280955.jpg',
      '/src/assets/images/kodaikanal_lake_mist_1792907282172.jpg',
      '/src/assets/images/munnar_tea_hills_1792905683927.jpg'
    ],
    category: ['Hill Station', 'Waterfalls & Trekking'],
    entryFee: {
      amount: 40,
      currency: 'INR',
      isFree: false,
      notes: 'Botanical Garden: ₹40 (Adult) / ₹20 (Child). Toy Train: ₹30 to ₹205 depending on class. Rose Garden: ₹40.'
    },
    openingHours: 'Botanical Gardens: 7:00 AM – 6:30 PM; Ooty Lake Boating: 8:30 AM – 6:00 PM; Doddabetta: 9:00 AM – 6:00 PM',
    bestSeason: 'October to June (Crisp cool climate: 10°C to 20°C; frost in Dec/Jan)',
    suitableFor: ['Families', 'Couples', 'Nature Lovers', 'Adventure Seekers'],
    activities: [
      'Ride the historic UNESCO Nilgiri Mountain Railway steam toy train between Mettupalayam, Coonoor and Ooty',
      'Row and pedal boat on Ooty Lake surrounded by eucalyptus groves',
      'Climb Doddabetta Peak (2,637 m) for panoramic vistas of the Nilgiri biosphere',
      'Tour working tea factories and sample fragrant Nilgiri orthodox green and black teas',
      'Walk through the terraced Government Rose Garden featuring over 20,000 varieties'
    ],
    nearbyAttractions: [
      { name: 'Coonoor & Sim’s Park', distanceKm: 19, description: 'Tranquil sister hill town with terraced Japanese gardens and Dolphin’s Nose viewpoint.' },
      { name: 'Pykara Lake & Waterfalls', distanceKm: 21, description: 'Pristine Toda-sacred river with high-speed motorboating and pine forests.' },
      { name: 'Avalanche Lake', distanceKm: 26, description: 'Secluded trout fishing lake bordered by dense shola forests and orchids.' },
      { name: 'Mudumalai Tiger Reserve', distanceKm: 38, description: 'Wildlife corridor sanctuary home to Asian elephants, leopards, and Bengal tigers.' }
    ],
    travelTips: [
      'Pre-book Toy Train tickets 60 to 90 days in advance on IRCTC as seats fill up rapidly.',
      'Pack warm woolen sweaters and jackets; evening temperatures drop sharply below 10°C.',
      'Plastic bags and single-use plastic water bottles are strictly prohibited across the Nilgiris district.'
    ],
    travelGuidelines: {
      transportation: 'Accessible via Coimbatore Airport (CJB, 88 km) or Mettupalayam Railway Junction (52 km). State buses run every 15 minutes from Mettupalayam and Coimbatore. Hill roads have 36 hairpin turns; experienced drivers recommended.',
      weather: 'Pleasant summer (15°C–25°C) from March to May; heavy southwest monsoons in July–August; chilly winter (5°C–18°C) from November to February.',
      clothing: 'Heavy woolens, thermal inners, windcheaters, and walking shoes from October to February. Light jackets and shawls during summer.',
      safety: 'Strict Nilgiris plastic ban enforced with fines. Drive cautiously on hairpin bends; avoid night driving between 10 PM and 6 AM.',
      customs: 'Respect Toda tribal settlements; seek permission before photographing tribal shrines. Maintain silence in heritage churches.',
      familyFriendly: 'Highly family-oriented with toy train rides, lake boating, pony rides at Shooting Point, and chocolate workshops.',
      accessibility: 'Botanical Gardens and Rose Garden have paved accessible pathways; toy train first-class coaches accommodate assisted boarding.',
      suggestedRoutes: 'Scenic route: Trichy -> Karur -> Kangeyam -> Tiruppur -> Coimbatore -> Mettupalayam -> Coonoor -> Ooty (approx. 270 km, 6 hours).'
    },
    estimatedExpensePerDay: { min: 2200, max: 6000, currency: 'INR' },
    recommendedDuration: '2 to 3 Days',
    whyWorthVisiting: 'A quintessential British colonial hill station blending cool mist, heritage steam engineering, lush tea terraces, and fresh pine forest air.',
    dataSource: 'verified',
    featured: true
  },
  {
    id: 'kodaikanal',
    country: 'India',
    stateId: 'tamil-nadu',
    stateName: 'Tamil Nadu',
    district: 'Dindigul',
    city: 'Kodaikanal',
    name: 'Kodaikanal',
    tagline: 'Princess of Hill Stations set around a star-shaped lake and pine ridges',
    description: 'Nestled in the Palani Hills at 2,133 metres, Kodaikanal is loved for its scenic star-shaped lake, mist-covered Coaker’s Walk promenade, Pillar Rocks cliffs, whispering pine forests, and cool mountain weather.',
    locationName: 'Dindigul District, South-Central Tamil Nadu',
    coordinates: { lat: 10.2381, lng: 77.4892 },
    heroImage: '/src/assets/images/kodaikanal_lake_mist_1792907282172.jpg',
    gallery: [
      '/src/assets/images/kodaikanal_lake_mist_1792907282172.jpg',
      '/src/assets/images/ooty_nilgiri_hills_1792907280955.jpg',
      '/src/assets/images/munnar_tea_hills_1792905683927.jpg'
    ],
    category: ['Hill Station', 'Waterfalls & Trekking'],
    entryFee: {
      amount: 30,
      currency: 'INR',
      isFree: false,
      notes: 'Coaker’s Walk: ₹30. Bryant Park: ₹30. Pillar Rocks: ₹10. Lake row boating: ₹150–₹350.'
    },
    openingHours: 'Coaker’s Walk: 7:00 AM – 7:00 PM; Bryant Park: 9:00 AM – 6:00 PM; Pine Forest: 8:30 AM – 5:30 PM',
    bestSeason: 'September to May (Cool misty mornings, clear vistas, and sweet mountain breeze)',
    suitableFor: ['Couples', 'Families', 'Nature Lovers', 'Adventure Seekers'],
    activities: [
      'Bicycle or row wooden boats around the 60-acre star-shaped Kodai Lake',
      'Walk along Coaker’s Walk for dizzying cliff views over the southern plains',
      'Hike through the majestic towering corridors of the Pine Forest',
      'Stand before the 400-foot sheer granite vertical towers of Pillar Rocks',
      'Trek to Dolphin’s Nose rock ledge overlooking deep valleys in Vattakanal'
    ],
    nearbyAttractions: [
      { name: 'Silver Cascade Falls', distanceKm: 8, description: '180-foot roadside waterfall cascading through rocks as you enter Kodai.' },
      { name: 'Pillar Rocks', distanceKm: 7, description: 'Three massive granite monoliths standing shoulder to shoulder in the mist.' },
      { name: 'Berijam Lake', distanceKm: 21, description: 'Serene protected wilderness reservoir requiring forest department permit.' },
      { name: 'Vattakanal Village', distanceKm: 6, description: 'Popular bohemian hamlet known for cafes, cliff walks, and cloud inversions.' }
    ],
    travelTips: [
      'Carry umbrellas and light woolens as sudden afternoon mountain mist showers are common.',
      'Purchase homemade fruit jams, eucalyptus oil, and dark chocolates on PT Usha Road.',
      'Obtain Berijam Lake permits at the Forest Office before 9:00 AM as entry is capped.'
    ],
    travelGuidelines: {
      transportation: 'Closest railway station is Kodai Road (KQN, 80 km) and Madurai Airport (IXM, 130 km). Direct regular TNSTC buses run from Trichy Central Bus Stand (approx. 4.5 hours) and Madurai.',
      weather: 'Pleasant summer temperatures around 19°C–28°C; misty winters around 8°C–17°C.',
      clothing: 'Layered clothing, light fleece, sturdy walking shoes, rain jacket or umbrella.',
      safety: 'Steep drop-offs at Dolphin’s Nose and Pillar Rocks; stay behind security fences.',
      customs: 'Eco-sensitive zone; no loud music or littering in pine forest and lake perimeters.',
      familyFriendly: 'Excellent for family walks, lake pedal boating, botanical gardens, and cycling.',
      accessibility: 'Bryant Park and Kodai Lake perimeter road are wheelchair and stroller friendly.',
      suggestedRoutes: 'Direct route from Trichy: Trichy -> Dindigul -> Batlagundu -> Ghat Road -> Kodaikanal (195 km, 4.5 hours).'
    },
    estimatedExpensePerDay: { min: 2000, max: 5500, currency: 'INR' },
    recommendedDuration: '2 to 3 Days',
    whyWorthVisiting: 'Gentle, romantic hill station famous for its serene lake, cool pine scents, and dramatic cliff viewpoints overlooking Tamil Nadu plains.',
    dataSource: 'verified',
    featured: true
  },
  {
    id: 'madurai',
    country: 'India',
    stateId: 'tamil-nadu',
    stateName: 'Tamil Nadu',
    district: 'Madurai',
    city: 'Madurai',
    name: 'Madurai',
    tagline: 'The timeless City of Nectar, ancient Sangam heritage & the monumental Meenakshi Temple',
    description: 'One of the oldest continuously inhabited cities in the world, built in a lotus pattern around the world-famous Meenakshi Sundareswarar Temple with its 14 towering sculpted gopurams, thousand-pillar hall, and Thirumalai Nayakkar Mahal.',
    locationName: 'Madurai District, Central-South Tamil Nadu',
    coordinates: { lat: 9.9195, lng: 78.1193 },
    heroImage: '/src/assets/images/madurai_meenakshi_temple_1792907282196.jpg',
    gallery: [
      '/src/assets/images/madurai_meenakshi_temple_1792907282196.jpg',
      '/src/assets/images/rameswaram_pamban_bridge_1792907283013.jpg'
    ],
    category: ['Heritage & Culture'],
    entryFee: {
      amount: 50,
      currency: 'INR',
      isFree: false,
      notes: 'Meenakshi Temple darshan is free. Special darshan queue: ₹50 / ₹100. Thousand Pillar Museum: ₹10. Thirumalai Nayakkar Palace: ₹10.'
    },
    openingHours: 'Meenakshi Temple: 5:00 AM – 12:30 PM & 4:00 PM – 10:00 PM; Thirumalai Nayakkar Palace: 9:00 AM – 5:00 PM',
    bestSeason: 'October to March (Pleasant winter months; Avoid extreme summer heat in May)',
    suitableFor: ['Cultural Travelers', 'Families', 'Couples', 'Nature Lovers'],
    activities: [
      'Marvel at the 14 sculpted gopurams and Hall of 1000 Pillars in Meenakshi Amman Temple',
      'Witness the holy nightly palliarai bed-chamber procession ceremony at 9:30 PM',
      'Inspect the majestic Italian-Dravidian arches of 17th-century Thirumalai Nayak Palace',
      'Sip the legendary cold frothy Madurai Jigarthanda dessert drink on East Marret Street',
      'Explore bustling night bazaars for authentic Madurai Sungudi cotton sarees'
    ],
    nearbyAttractions: [
      { name: 'Thirumalai Nayakkar Mahal', distanceKm: 2, description: 'Indo-Saracenic royal palace with massive white pillars and sound & light show.' },
      { name: 'Alagar Kovil (Kallazhagar Temple)', distanceKm: 21, description: 'Hilltop Vishnu shrine surrounded by sacred natural springs and monkeys.' },
      { name: 'Gandhi Memorial Museum', distanceKm: 4, description: 'Historic palace museum preserving Gandhiji’s blood-stained garment and freedom relics.' },
      { name: 'Vandiyur Mariamman Teppakulam', distanceKm: 5, description: 'Enormous square temple tank with central mandapam host to float festivals.' }
    ],
    travelTips: [
      'Strict traditional dress code: Men must wear dhoti/kurta/pants (no shorts); women must wear sarees, salwar kameez, or traditional clothing.',
      'Mobile phones and cameras are prohibited inside Meenakshi Temple; deposit them at official security counters outside the towers.',
      'Try authentic piping hot Madurai Kari Dosa and Murugan Idli shop meals.'
    ],
    travelGuidelines: {
      transportation: 'Madurai International Airport (IXM) connected to major hubs. Madurai Junction (MDU) is a major railway station. Excellent 4-lane NH 38 connectivity directly from Trichy (135 km, 2 hours).',
      weather: 'Tropical climate; hot summers (30°C–40°C), moderate monsoons, and comfortable winters (20°C–30°C).',
      clothing: 'Strict conservative temple attire (dhoti, formal trousers, sarees, churidars). Light cotton clothing year-round.',
      safety: 'Safe city with active pilgrim movement late into the night. Beware of touts claiming private special darshan.',
      customs: 'Remove shoes at shoe deposit stalls before temple gates. Non-Hindus can visit temple corridors and Thousand Pillar Hall.',
      familyFriendly: 'Rich spiritual and educational heritage for children; sound and light show at palace is engaging.',
      accessibility: 'Temple outer prakarams and palace courtyards are level; wheelchair assistance available upon request at East Tower.',
      suggestedRoutes: 'GJ Guide Masters recommended Trichy hub circuit: Trichy -> Madurai -> Rameswaram -> Back to Trichy.'
    },
    estimatedExpensePerDay: { min: 1800, max: 4800, currency: 'INR' },
    recommendedDuration: '1 to 2 Days',
    whyWorthVisiting: 'The beating cultural heart of Tamil civilization, celebrated for living Dravidian spiritual devotion, stunning architecture, and legendary street food.',
    dataSource: 'verified',
    featured: true
  },
  {
    id: 'rameswaram',
    country: 'India',
    stateId: 'tamil-nadu',
    stateName: 'Tamil Nadu',
    district: 'Ramanathapuram',
    city: 'Rameswaram',
    name: 'Rameswaram',
    tagline: 'Sacred island of holy Teerthams, magnificent temple corridors & the Pamban sea bridge',
    description: 'Located on Pamban Island in the Gulf of Mannar, Rameswaram is one of India’s four holiest Char Dham pilgrimage sites. Famous for Ramanathaswamy Temple’s world-record 1,200-metre carved stone corridor, 22 sacred wells, the historic Pamban cantilever railway bridge, and ghost town Dhanushkodi.',
    locationName: 'Ramanathapuram District, Coastal Tamil Nadu',
    coordinates: { lat: 9.2876, lng: 79.3129 },
    heroImage: '/src/assets/images/rameswaram_pamban_bridge_1792907283013.jpg',
    gallery: [
      '/src/assets/images/rameswaram_pamban_bridge_1792907283013.jpg',
      '/src/assets/images/madurai_meenakshi_temple_1792907282196.jpg'
    ],
    category: ['Heritage & Culture', 'Beach & Coastal'],
    entryFee: {
      amount: 25,
      currency: 'INR',
      isFree: false,
      notes: 'Ramanathaswamy Temple is free. Special darshan: ₹50 / ₹100. 22 Holy Wells bath token: ₹25.'
    },
    openingHours: 'Ramanathaswamy Temple: 5:00 AM – 1:00 PM & 3:00 PM – 9:00 PM; Spatika Linga Pooja: 5:00 AM – 6:00 AM',
    bestSeason: 'October to April (Comfortable sea breeze, mild sun, and calm waters)',
    suitableFor: ['Cultural Travelers', 'Families', 'Couples', 'Adventure Seekers'],
    activities: [
      'Walk through the world’s longest carved sandstone pillared corridor in Ramanathaswamy Temple',
      'Take the ritual purificatory dip at Agni Teertham sea beach and bathe in 22 sacred temple wells',
      'Cross the historic Pamban Bridge and witness ships navigating through the opened cantilever span',
      'Ride 4x4 vehicles to Dhanushkodi ghost town and gaze across Ram Setu (Adam’s Bridge) towards Sri Lanka',
      'Visit Dr. APJ Abdul Kalam National Memorial honoring the beloved former President'
    ],
    nearbyAttractions: [
      { name: 'Pamban Sea Bridge', distanceKm: 12, description: 'Engineering marvel 2-km railway cantilever bridge over the blue Palk Strait.' },
      { name: 'Dhanushkodi Ghost Town & Beach', distanceKm: 18, description: 'Ruins of 1964 cyclone where Indian Ocean and Bay of Bengal converge.' },
      { name: 'Dr. APJ Abdul Kalam Memorial', distanceKm: 4, description: 'Monument housing rockets, models, and personal memorabilia of Dr. Kalam.' },
      { name: 'Kothandaramaswamy Temple', distanceKm: 12, description: '500-year-old temple surrounded by lagoon where Vibhishana surrendered to Rama.' }
    ],
    travelTips: [
      'Attend the early morning Spatika Lingam (crystal lingam) Darshan at 5:00 AM for a deeply spiritual experience.',
      'Bring a change of dry clothes if taking the traditional bath in the 22 sacred temple wells.',
      'Dhanushkodi road is open during daylight hours; visit before 4:00 PM for the clearest sea horizons.'
    ],
    travelGuidelines: {
      transportation: 'Connected by rail and road across the Pamban Sea Bridge. Closest airports are Madurai (175 km) and Trichy (230 km). Frequent direct express buses from Trichy Central Bus Stand (approx. 5 hours) and Madurai (3.5 hours).',
      weather: 'Coastal tropical climate; breezy and pleasant from November to February; warm from March to June.',
      clothing: 'Modest temple attire (men: dhoti or trousers; women: saree or salwar). Cotton fabrics and hats for Dhanushkodi sun.',
      safety: 'Do not swim in deep currents at Arichal Munai (tip of Dhanushkodi) as oceanic undercurrents are treacherous.',
      customs: 'Agni Teertham is a sacred ritual seashore; please keep the beach clean and do not leave wet clothes behind.',
      familyFriendly: 'Educational visit for children (Dr. Kalam Memorial, Pamban bridge engineering, Ram Setu geography).',
      accessibility: 'Wheelchair access available through Temple East Gate; paved approaches to Kalam Memorial.',
      suggestedRoutes: 'GJ Guide Masters Coastal Pilgrimage: Trichy -> Pudukkottai -> Karaikudi (Chettinad) -> Ramanathapuram -> Rameswaram (230 km).'
    },
    estimatedExpensePerDay: { min: 1900, max: 5000, currency: 'INR' },
    recommendedDuration: '2 Days',
    whyWorthVisiting: 'A sublime spiritual sanctuary surrounded by the open turquoise ocean, celebrated for colossal temple corridors and monumental coastal history.',
    dataSource: 'verified',
    featured: true
  },

  // KERALA DESTINATIONS
  {
    id: 'munnar',
    country: 'India',
    stateId: 'kerala',
    stateName: 'Kerala',
    district: 'Idukki',
    city: 'Munnar',
    name: 'Munnar',
    tagline: 'Endless rolling emerald tea gardens & cool Western Ghats mist',
    description: 'Situated at 1,600 metres in the Idukki district, Munnar is South India’s premier hill station where three mountain streams meet (Mudrapuzha, Nallathanni, and Kundala). Famous for sprawling colonial tea plantations, endangered Nilgiri Tahr sightings at Eravikulam National Park, and rare Neelakurinji flower blooms.',
    locationName: 'Idukki District, Central Kerala',
    coordinates: { lat: 10.0889, lng: 77.0595 },
    heroImage: '/src/assets/images/munnar_tea_hills_1792905683927.jpg',
    gallery: [
      '/src/assets/images/munnar_tea_hills_1792905683927.jpg',
      '/src/assets/images/hero_kerala_backwaters_1792905683789.jpg',
      '/src/assets/images/alleppey_houseboat_sunset_1792905685326.jpg'
    ],
    category: ['Hill Station', 'Waterfalls & Trekking'],
    entryFee: {
      amount: 200,
      currency: 'INR',
      isFree: false,
      notes: 'Entry to Eravikulam National Park is ₹200 for Indian adults, ₹500 for foreign nationals. Tea Museum entry is ₹125.'
    },
    openingHours: 'Eravikulam Park: 7:30 AM – 4:00 PM; Tea Museum: 9:00 AM – 5:00 PM (Closed Mondays)',
    bestSeason: 'September to March (Pleasant crisp weather: 10°C to 20°C)',
    suitableFor: ['Families', 'Nature Lovers', 'Adventure Seekers', 'Couples'],
    activities: [
      'Tea estate walk & tea processing factory tour',
      'Nilgiri Tahr wildlife spotting at Rajamalai',
      'Boating at Mattupetty Dam & Kundala Lake',
      'Panoramic sunrise trek to Top Station & Kolukkumalai',
      'Spice plantation discovery walk'
    ],
    nearbyAttractions: [
      { name: 'Mattupetty Dam', distanceKm: 13, description: 'Scenic reservoir with speedboating and dairy farm pastures.' },
      { name: 'Eravikulam National Park', distanceKm: 15, description: 'Protected habitat of the endangered Nilgiri Tahr wild goat.' },
      { name: 'Top Station', distanceKm: 32, description: 'Highest point in Munnar offering 360-degree views of Tamil Nadu plains.' },
      { name: 'Attukad Waterfalls', distanceKm: 9, description: 'Lush cascade surrounded by steep jungle trekking paths.' }
    ],
    travelTips: [
      'Pre-book Eravikulam safari tickets online via Kerala Forest Dept to bypass 2-hour queues.',
      'Carry light woolens even in summer as evenings can drop below 12°C.',
      'Try freshly brewed orthodox Silver Tips white tea at Lockhart Tea Sales outlet.'
    ],
    travelGuidelines: {
      transportation: 'Nearest airport is Cochin International (COK, 110 km) and nearest railway station is Aluva (105 km). Scenic ghat roads with waterfalls along the way.',
      weather: 'Pleasant summer (15°C–25°C), cool winters (5°C–15°C), heavy monsoons (June to August).',
      clothing: 'Light woolens for summer evenings; heavy sweaters, shawls, and raincoats for winter and monsoon.',
      safety: 'Fog and low visibility common on ghat roads after 5 PM; use fog lights and drive cautiously.',
      customs: 'Plastic-free eco zones strictly enforced; stay on designated safari buses in Eravikulam.',
      familyFriendly: 'Family favorite with dam boating, elephant interactions, and tea garden walking.',
      accessibility: 'Mattupetty Dam and Tea Museum have ramp access; safari buses assist elderly visitors.',
      suggestedRoutes: 'Classic Kerala Hill route: Cochin Airport -> Neriamangalam -> Adimali -> Munnar (4 hours).'
    },
    estimatedExpensePerDay: { min: 2200, max: 6500, currency: 'INR' },
    recommendedDuration: '2 to 3 Days',
    whyWorthVisiting: 'Munnar blends dramatic high-altitude landscapes with historic British colonial tea culture. Its tranquil hill air, misty valleys, and hiking routes offer the quintessential hill station escape in South India.',
    dataSource: 'verified',
    featured: true
  },
  {
    id: 'alleppey',
    country: 'India',
    stateId: 'kerala',
    stateName: 'Kerala',
    district: 'Alappuzha',
    city: 'Alappuzha (Alleppey)',
    name: 'Alleppey (Alappuzha)',
    tagline: 'Venice of the East & the tranquil heart of Kerala backwaters',
    description: 'A labyrinth of calm canals, lagoons, and paddy fields lying below sea level in the Kuttanad region. Famous for traditional wooden houseboats (Kettuvallam), annual Nehru Trophy Snake Boat races on Punnamada Lake, and serene village waterways.',
    locationName: 'Alappuzha District, Coastal Kerala',
    coordinates: { lat: 9.4981, lng: 76.3388 },
    heroImage: '/src/assets/images/alleppey_houseboat_sunset_1792905685326.jpg',
    gallery: [
      '/src/assets/images/alleppey_houseboat_sunset_1792905685326.jpg',
      '/src/assets/images/hero_kerala_backwaters_1792905683789.jpg',
      '/src/assets/images/kochi_chinese_fishing_nets_1792905685051.jpg'
    ],
    category: ['Backwaters', 'Beach & Coastal'],
    entryFee: {
      amount: 0,
      currency: 'INR',
      isFree: true,
      notes: 'Waterways are open. Day shikara boats start from ₹800/hr; overnight houseboats range ₹8,500–₹22,000 depending on bedrooms.'
    },
    openingHours: 'Houseboat cruises check-in 12:00 PM; public canal ferries 6:00 AM – 9:30 PM',
    bestSeason: 'November to February (Cool & breezy) / August (Snake Boat Race season)',
    suitableFor: ['Couples', 'Families', 'Nature Lovers', 'Cultural Travelers'],
    activities: [
      'Overnight traditional Kettuvallam luxury houseboat cruise',
      'Narrow canal canoeing through rustic Kuttanad duck-farming hamlets',
      'Sunset stroll along historic Alleppey Pier Beach and Lighthouse',
      'Savoring authentic freshwater Karimeen Pollichathu cooked on banana leaf',
      'Visiting Pathiramanal bird island'
    ],
    nearbyAttractions: [
      { name: 'Vembanad Lake', distanceKm: 8, description: 'India’s longest lake, hosting migratory water birds and houseboats.' },
      { name: 'Marari Beach', distanceKm: 14, description: 'Secluded golden sandy beach dotted with coconut groves and fishing catamarans.' },
      { name: 'Kuttanad Below-Sea-Level Farms', distanceKm: 12, description: 'Fascinating bio-saline agricultural zone farmed 2 meters below sea level.' },
      { name: 'Alappuzha Lighthouse', distanceKm: 4, description: 'Historic 1862 beacon offering sweeping ocean and palm-canopy panoramas.' }
    ],
    travelTips: [
      'Ensure your houseboat is certified by the Department of Tourism (Green Palm or Gold Star rating).',
      'Opt for electric or canoe tours for narrow village canals where large houseboats cannot enter.',
      'Request freshly caught pearl spot (Karimeen) from local canal fishermen for your dinner.'
    ],
    travelGuidelines: {
      transportation: 'Alappuzha Railway Station (ALLP) is well connected to Kochi, Trivandrum, and Chennai. National Highway 66 connects to Kochi in 1.5 hours.',
      weather: 'Tropical humid coastal weather; warm sunny days (28°C–34°C); breezy evenings on the water.',
      clothing: 'Light breathable cottons, sunglasses, sun hat, and comfortable flat footwear for boat decks.',
      safety: 'Life jackets mandatory during all boat and canoe rides; verified houseboats have certified lifeguards.',
      customs: 'Backwater villages are quiet residential communities; avoid loud music on open decks after 9:30 PM.',
      familyFriendly: 'A dream for families; spacious houseboats, live onboard cooking, and calm water views.',
      accessibility: 'Many luxury houseboats and resorts feature ground-level boarding ramps and wide staterooms.',
      suggestedRoutes: 'Backwater & Coastal link: Kochi -> Marari Beach -> Alleppey -> Kumarakom (1.5 to 2 hours).'
    },
    estimatedExpensePerDay: { min: 3500, max: 12000, currency: 'INR' },
    recommendedDuration: '1 to 2 Days',
    whyWorthVisiting: 'Gliding silently along coconut-canopied water alleys while fresh Kerala meals are prepared onboard by a private chef is one of the world’s signature slow-travel experiences.',
    dataSource: 'verified',
    featured: true
  },
  {
    id: 'kochi',
    country: 'India',
    stateId: 'kerala',
    stateName: 'Kerala',
    district: 'Ernakulam',
    city: 'Kochi (Cochin)',
    name: 'Kochi (Cochin)',
    tagline: 'Historic Queen of the Arabian Sea & eclectic spice trading port',
    description: 'A vibrant cosmopolitan harbor city shaped by 600 years of global maritime commerce. Fort Kochi and Mattancherry retain Portuguese basilicas, Dutch palaces, a 450-year-old Jewish synagogue, antique spice warehouses, and iconic cantilevered Chinese fishing nets.',
    locationName: 'Ernakulam District, Coastal Kerala',
    coordinates: { lat: 9.9312, lng: 76.2673 },
    heroImage: '/src/assets/images/kochi_chinese_fishing_nets_1792905685051.jpg',
    gallery: [
      '/src/assets/images/kochi_chinese_fishing_nets_1792905685051.jpg',
      '/src/assets/images/hero_kerala_backwaters_1792905683789.jpg',
      '/src/assets/images/munnar_tea_hills_1792905683927.jpg'
    ],
    category: ['Heritage & Culture', 'Beach & Coastal'],
    entryFee: {
      amount: 50,
      currency: 'INR',
      isFree: false,
      notes: 'Mattancherry Palace: ₹5. Paradesi Synagogue: ₹10. Kathakali Cultural Evening show: ₹400–₹600.'
    },
    openingHours: 'Mattancherry Palace: 9:45 AM – 1:00 PM & 2:00 PM – 4:45 PM (Closed Fridays); Jewish Synagogue: 10:00 AM – 5:00 PM (Closed Saturdays)',
    bestSeason: 'October to March (Warm breezes and low humidity)',
    suitableFor: ['Cultural Travelers', 'Families', 'Couples'],
    activities: [
      'Watch fishermen hoist Chinese Fishing Nets at Fort Kochi beach',
      'Wander Jew Town spice markets and antique brass warehouses',
      'Attend an evening Kathakali classical dance drama with live makeup prep',
      'Visit St. Francis Church where Vasco da Gama was originally buried',
      'Take the scenic Kerala Water Metro catamaran across harbor islands'
    ],
    nearbyAttractions: [
      { name: 'Mattancherry Dutch Palace', distanceKm: 4, description: 'Features exquisite Hindu mythological murals and royal portraits.' },
      { name: 'Jew Town & Paradesi Synagogue', distanceKm: 4.5, description: 'Historic 1568 synagogue with hand-painted Chinese porcelain floor tiles.' },
      { name: 'Marine Drive Promenade', distanceKm: 9, description: 'Bustling waterfront walkway overlooking Kochi harbor and container terminal.' },
      { name: 'Cherai Beach', distanceKm: 24, description: 'Unique shallow beach where backwaters and sea run parallel.' }
    ],
    travelTips: [
      'Rent a bicycle or electric scooter to explore the shaded lanes of Fort Kochi with ease.',
      'Arrive at the Kathakali centre at 5:00 PM to watch the elaborate 90-minute facial makeup ritual.',
      'Sample fragrant ginger tea and cardamom cake at heritage courtyard cafes.'
    ],
    travelGuidelines: {
      transportation: 'Cochin International Airport (COK) is solar-powered and serves worldwide flights. Ernakulam Junction (ERS) and Town (ERN) are major rail terminals. Kerala Water Metro connects islands easily.',
      weather: 'Tropical coastal climate; pleasant winter from November to February (24°C–31°C).',
      clothing: 'Smart casual, comfortable walking shoes for heritage walks, modest clothing in religious sites.',
      safety: 'Safe city with tourist police posts in Fort Kochi and Mattancherry.',
      customs: 'Synagogue requires modest attire (covered shoulders & knees); remove shoes at Dutch Palace.',
      familyFriendly: 'Children love the giant fishing nets, harbor ferry rides, and colorful Kathakali masks.',
      accessibility: 'Fort Kochi streets and Water Metro stations are pedestrian and wheelchair friendly.',
      suggestedRoutes: 'Gateway itinerary: Cochin Airport -> Fort Kochi (Day 1) -> Munnar (Days 2-3) -> Alleppey (Day 4).'
    },
    estimatedExpensePerDay: { min: 1800, max: 5500, currency: 'INR' },
    recommendedDuration: '2 Days',
    whyWorthVisiting: 'Kochi presents an unforgettable juxtaposition of colonial maritime antiquity, contemporary Kochi-Muziris Biennale art spaces, and buzzing modern waterfront culture.',
    dataSource: 'verified',
    featured: true
  },
  {
    id: 'wayanad',
    country: 'India',
    stateId: 'kerala',
    stateName: 'Kerala',
    district: 'Wayanad',
    city: 'Kalpetta (Wayanad)',
    name: 'Wayanad',
    tagline: 'Pristine forested plateaus, prehistoric caves & cascading falls',
    description: 'Perched in the bio-diverse Western Ghats in northern Kerala, Wayanad is celebrated for misty hill ranges, spice plantations (cardamom, pepper, coffee), prehistoric petroglyphs at Edakkal Caves, and bamboo-fringed wildlife sanctuaries.',
    locationName: 'Wayanad District, Northern Kerala',
    coordinates: { lat: 11.6854, lng: 76.1320 },
    heroImage: '/src/assets/images/wayanad_chembra_mist_1792907282689.jpg',
    gallery: [
      '/src/assets/images/wayanad_chembra_mist_1792907282689.jpg',
      '/src/assets/images/munnar_tea_hills_1792905683927.jpg'
    ],
    category: ['Hill Station', 'Wildlife & Sanctuary', 'Waterfalls & Trekking'],
    entryFee: {
      amount: 50,
      currency: 'INR',
      isFree: false,
      notes: 'Edakkal Caves: ₹50. Banasura Sagar Dam: ₹40. Kuruva Island: ₹110.'
    },
    openingHours: 'Edakkal Caves: 9:00 AM – 4:00 PM (Closed Mondays); Banasura Dam: 9:00 AM – 5:00 PM',
    bestSeason: 'October to May (Great for trekking and wildlife tours)',
    suitableFor: ['Adventure Seekers', 'Nature Lovers', 'Families'],
    activities: [
      'Trek up Ambukuthi Mala to inspect Neolithic petroglyphs at Edakkal Caves',
      'Speedboat rides at Banasura Sagar Dam (India’s largest earthen dam)',
      'Bamboo rafting in the dense riverine thickets of Kuruva Island',
      'Wild elephant and gaur spotting at Muthanga Wildlife Sanctuary',
      'Hiking through coffee and cardamom plantations in Vythiri'
    ],
    nearbyAttractions: [
      { name: 'Chembra Peak & Heart Lake', distanceKm: 22, description: 'Highest peak in Wayanad with a perpetual heart-shaped mountain lake.' },
      { name: 'Soochipara Falls', distanceKm: 26, description: 'Three-tiered waterfall descending into a natural rock pool ideal for swimming.' },
      { name: 'Banasura Sagar Dam', distanceKm: 18, description: 'Sprawling earthen reservoir dotted with mini forested islands.' },
      { name: 'Muthanga Wildlife Sanctuary', distanceKm: 34, description: 'Part of Nilgiri Biosphere reserve with frequent wild elephant sightings.' }
    ],
    travelTips: [
      'Edakkal Caves requires climbing roughly 300 steep rock steps; wear non-slip sports shoes.',
      'Chembra Peak trek permits are strictly capped at 200 visitors per day—arrive early at Meppadi forest desk.',
      'Purchase single-origin Wayanadan wild honey and organic black peppercorns from tribal cooperative shops.'
    ],
    travelGuidelines: {
      transportation: 'Closest airport and rail station is Kozhikode (Calicut, CCJ, 85 km). Scenic Thamarassery Ghat Pass connects Calicut to Wayanad.',
      weather: 'Cool and pleasant year-round (18°C–29°C); heavy rains during monsoon season.',
      clothing: 'Comfortable trekking trousers, rain jackets, leech socks for monsoon walks, walking shoes.',
      safety: 'Night traffic through Muthanga forest is restricted between 9 PM and 6 AM for wildlife safety.',
      customs: 'Respect indigenous tribal communities and eco-sensitive forest zones.',
      familyFriendly: 'Great for treehouses, earthen dam speedboating, and nature walks.',
      accessibility: 'Banasura Dam has buggy transport to top; Edakkal Caves requires uphill physical climb.',
      suggestedRoutes: 'Hill Route: Kozhikode -> Vythiri -> Kalpetta -> Sultan Bathery -> Ooty (Tamil Nadu border).'
    },
    estimatedExpensePerDay: { min: 2000, max: 6000, currency: 'INR' },
    recommendedDuration: '2 to 3 Days',
    whyWorthVisiting: 'Ideal for travelers craving raw wilderness, treehouse eco-stays, ancient history, and cool mountain air without tourist overcrowding.',
    dataSource: 'verified',
    featured: true
  }
];

export const HOTELS: Hotel[] = [
  // OOTY HOTEL (Tamil Nadu)
  {
    id: 'ooty-savoy-heritage',
    destinationId: 'ooty',
    destinationName: 'Ooty (Udhagamandalam)',
    country: 'India',
    stateId: 'tamil-nadu',
    district: 'Nilgiris',
    city: 'Ooty',
    name: 'Savoy - IHCL SeleQtions / Nilgiri Colonial Heritage',
    tagline: 'Colonial luxury cottages amidst eucalyptus hills with roaring fireplaces',
    starRating: 5,
    rating: 4.8,
    reviewCount: 1650,
    address: '77 Sylks Road, Ooty, Nilgiris District, Tamil Nadu 643001',
    distanceFromCenterKm: 1.5,
    checkInTime: '2:00 PM',
    checkOutTime: '12:00 PM',
    contactPhone: '+91 423 2225500',
    contactEmail: 'savoy.ooty@ihcltata.com',
    image: '/src/assets/images/ooty_nilgiri_hills_1792907280955.jpg',
    hasAC: true,
    hasWifi: true,
    hasAttachedBathroom: true,
    hasParking: true,
    hasRoomService: true,
    hasHotWater: true,
    facilities: [
      'Central Heating & Real Wood Fireplaces',
      'Free High-Speed Wi-Fi',
      'Attached Marble Bathrooms with Bathtubs',
      '24/7 Hot Water',
      'Complimentary Secure Valet Parking',
      '24-Hour Room Service',
      'Ayurvedic Wellness Spa',
      'Colonial Croquet Lawn & Badminton'
    ],
    roomTypes: [
      {
        id: 'ooty-deluxe-room',
        name: 'Deluxe Heritage Room with Garden View',
        pricePerNight: 7200,
        capacity: '2 Adults, 1 Child',
        bedType: '1 King Bed',
        amenities: ['Private garden patio', 'Fireplace with dry pine logs', 'Attached bathroom', '24/7 hot water', 'Tea/coffee maker', 'Free Wi-Fi'],
        availableRooms: 5,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      },
      {
        id: 'ooty-suite-fireplace',
        name: 'Nilgiri Heritage Fireplace Suite',
        pricePerNight: 11500,
        capacity: '2 Adults, 2 Children',
        bedType: '1 Four-Poster King Bed + Living Parlor',
        amenities: ['Authentic 180-year-old teak furnishings', 'Dedicated butler service', 'Bathtub & rainfall shower', 'Private lawn access', 'Complimentary afternoon high tea'],
        availableRooms: 3,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      }
    ],
    foodDining: {
      hasInHouseRestaurant: true,
      restaurantName: 'The Dining Room & Canterbury Bar',
      cuisines: ['Anglo-Indian Colonial', 'Chettinad & Tamil Regional', 'North Indian', 'Continental'],
      mealOptions: ['Complimentary Breakfast', 'Buffet Lunch', 'A la carte Dinner', '24/7 Room Service'],
      vegetarianAvailable: true,
      nonVegetarianAvailable: true,
      veganAvailable: true,
      halalAvailable: true,
      jainAvailable: true,
      breakfastOfferings: [
        'Full English Breakfast (Eggs to order, chicken sausages, baked beans, toast, estate marmalade)',
        'Traditional South Indian Breakfast (Crispy ghee roast dosa, steamed idlis, medu vada, sambar, coconut & tomato chutneys)',
        'Fresh fruit platters, morning pastries, Nilgiri single-estate orthodox black and green tea'
      ],
      lunchOfferings: [
        'Chettinad Kozhi (Chicken) Pepper Roast with layered Malabar Parotta',
        'Nilgiri Badaga-Style Potato & Green Pea Curry (Avarai Kootu)',
        'Continental Grilled Chicken Breast in wild mushroom reduction'
      ],
      dinnerOfferings: [
        'Signature Shepherd’s Pie with spiced lamb mince and creamy potato crust',
        'Traditional Tamil Nadu Thali with 7 seasonal curries, rasam, curd, and payasam',
        'Paneer Butter Masala with tandoori garlic naan'
      ],
      snacksBeverages: [
        'Afternoon Colonial High Tea with cucumber sandwiches, fresh scones, and clotted cream',
        'Local Ooty hot spiced chocolate and eucalyptus-infused herbal tea'
      ],
      buffetAvailable: true,
      roomServiceMealsAvailable: true,
      localKeralaCuisineNotes: 'Features genuine Badaga tribal recipes native to the Nilgiri plateau alongside classical British Raj afternoon tea traditions.',
      signatureDishes: [
        { name: 'Badaga Sandhagai with Coconut Milk & Jaggery', type: 'veg', price: 290, description: 'Hand-pressed fresh rice noodles soaked in cardamomed sweet coconut milk.', cuisineTag: 'Nilgiri Tribal Special' },
        { name: 'Savoy Anglo-Indian Country Captain Chicken Curry', type: 'non-veg', price: 620, description: 'Mild chicken braised in caramelized onions, yellow curry powder, and golden sultanas.', cuisineTag: 'Colonial Heritage' },
        { name: 'Nilgiri Forest Honey & Warm Bread Pudding', type: 'veg', price: 240, description: 'Steamed pudding drizzled with pure wild mountain blossom honey.', cuisineTag: 'Dessert' }
      ],
      openingHours: 'Breakfast: 7:00 AM – 10:30 AM | Lunch: 12:30 PM – 3:30 PM | Dinner: 7:30 PM – 10:30 PM | Room Service: 24/7',
      isVerifiedMenu: true,
      menuDisclaimer: 'Verified Partner Menu. Current seasonal prices and ingredients confirmed with hotel management.'
    },
    dataSource: 'verified_partner',
    badge: 'Heritage Verified Landmark'
  },

  // KODAIKANAL HOTEL (Tamil Nadu)
  {
    id: 'kodai-carlton-lakefront',
    destinationId: 'kodaikanal',
    destinationName: 'Kodaikanal',
    country: 'India',
    stateId: 'tamil-nadu',
    district: 'Dindigul',
    city: 'Kodaikanal',
    name: 'The Carlton Lakefront Luxury Resort',
    tagline: 'Kodaikanal’s premier 5-star resort overlooking the serene star-shaped lake',
    starRating: 5,
    rating: 4.7,
    reviewCount: 1320,
    address: 'Lake Road, Kodaikanal, Dindigul District, Tamil Nadu 624101',
    distanceFromCenterKm: 0.8,
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    contactPhone: '+91 4542 240056',
    contactEmail: 'reservations@thecarltonkodai.com',
    image: '/src/assets/images/kodaikanal_lake_mist_1792907282172.jpg',
    hasAC: true,
    hasWifi: true,
    hasAttachedBathroom: true,
    hasParking: true,
    hasRoomService: true,
    hasHotWater: true,
    facilities: [
      'Lakefront Lawn with Direct Lake Access',
      'Air Conditioning & Mountain Heating',
      'Free High-Speed Wi-Fi',
      'Attached Luxury Bathrooms',
      '24/7 Hot Water Facility',
      'Complimentary Secure Covered Parking',
      '24-Hour In-Room Dining & Room Service',
      'Steam, Sauna & Jacuzzi Spa',
      'Pedal Boating & Bicycle Rentals'
    ],
    roomTypes: [
      {
        id: 'kodai-deluxe-lake-view',
        name: 'Deluxe Lake View Room',
        pricePerNight: 6800,
        capacity: '2 Adults, 1 Child',
        bedType: '1 King Bed',
        amenities: ['Direct Kodai Lake balcony', 'Central heating', 'Attached private bathroom', '24/7 hot water', 'Complimentary Wi-Fi', 'Tea/coffee maker'],
        availableRooms: 6,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      },
      {
        id: 'kodai-cottage-suite',
        name: 'Lake-Facing Executive Cottage Suite',
        pricePerNight: 9800,
        capacity: '3 Adults or 2 Adults + 2 Children',
        bedType: '1 King Bed + Living Lounge',
        amenities: ['Private lawn sit-out', 'Deep soaking tub & rain shower', 'Fireplace lounge', 'Complimentary buffet breakfast & dinner'],
        availableRooms: 2,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      }
    ],
    foodDining: {
      hasInHouseRestaurant: true,
      restaurantName: 'Silver Oak Fine Dining & The Hearth Lounge',
      cuisines: ['South Indian Speciality', 'North Indian', 'Continental', 'Italian'],
      mealOptions: ['Complimentary Breakfast', 'Buffet Lunch', 'A la carte Dinner', '24/7 Room Service'],
      vegetarianAvailable: true,
      nonVegetarianAvailable: true,
      veganAvailable: true,
      halalAvailable: true,
      jainAvailable: true,
      breakfastOfferings: [
        'Live Dosa & Appam Station with coconut milk, shallot sambar, and 3 chutneys',
        'Continental Breakfast with fresh Kodai pear & plum preserves, cereals, and baked croissants',
        'Poori Masala and steaming filter coffee brewed with fresh mountain beans'
      ],
      lunchOfferings: [
        'Madurai Mutton Sukka with coin parottas',
        'Chettinad Mushroom Biryani served with onion raita and brinjal gravy (Ennai Kathirikai)',
        'Grilled Trout with lemon butter caper sauce'
      ],
      dinnerOfferings: [
        'Wood-fired thin crust Margherita and tandoori paneer pizzas',
        'Grand South Indian Non-Veg Feast with Kozhi Varuval and fish curry',
        'Steamed basmati rice with fragrant rasam and appalam'
      ],
      snacksBeverages: [
        'Evening masala tea with hot banana and chilli bajjis served on the lawn',
        'Freshly whipped hot Kodai chocolate fudge and seasonal strawberry shake'
      ],
      buffetAvailable: true,
      roomServiceMealsAvailable: true,
      localKeralaCuisineNotes: 'Celebrates fresh organic vegetables cultivated on the Palani hill slopes paired with coastal Tamil Nadu spices.',
      signatureDishes: [
        { name: 'Carlton Lakefront Clay-Oven Roast Chicken', type: 'non-veg', price: 580, description: 'Whole spring chicken marinated in crushed green pepper, ginger, and yoghurt, charcoal-roasted.', cuisineTag: 'Signature Tandoor' },
        { name: 'Kodaikanal Hill Vegetable Stew with Idiyappam', type: 'veg', price: 340, description: 'Fresh mountain peas, carrots, and beans stewed in pure coconut milk served with steamed rice string hoppers.', cuisineTag: 'South Indian Classic' },
        { name: 'Warm Kodai Chocolate Mud Cake', type: 'veg', price: 220, description: 'Made with 70% locally crafted artisanal dark chocolate with vanilla bean ice cream.', cuisineTag: 'Dessert' }
      ],
      openingHours: 'Breakfast: 7:00 AM – 10:30 AM | Lunch: 12:30 PM – 3:30 PM | Dinner: 7:00 PM – 11:00 PM | Room Service: 24/7',
      isVerifiedMenu: true,
      menuDisclaimer: 'Verified Partner Menu. Inspected for quality and authentic local ingredients.'
    },
    dataSource: 'verified_partner',
    badge: '5-Star Lakefront Resort'
  },

  // MADURAI HOTEL (Tamil Nadu)
  {
    id: 'madurai-heritage-resort',
    destinationId: 'madurai',
    destinationName: 'Madurai',
    country: 'India',
    stateId: 'tamil-nadu',
    district: 'Madurai',
    city: 'Madurai',
    name: 'Heritage Madurai Resort & Bawa Villas',
    tagline: 'Geoffrey Bawa architectural sanctuary surrounded by 17 acres of banyan groves',
    starRating: 5,
    rating: 4.8,
    reviewCount: 1890,
    address: '11 Melakkal Main Road, Kochadai, Madurai, Tamil Nadu 625016',
    distanceFromCenterKm: 3.5,
    checkInTime: '2:00 PM',
    checkOutTime: '12:00 PM',
    contactPhone: '+91 452 6644444',
    contactEmail: 'reservations@heritagemadurai.com',
    image: '/src/assets/images/madurai_meenakshi_temple_1792907282196.jpg',
    hasAC: true,
    hasWifi: true,
    hasAttachedBathroom: true,
    hasParking: true,
    hasRoomService: true,
    hasHotWater: true,
    facilities: [
      'Temple-Themed Olympic Swimming Pool',
      '100% Central Air Conditioning',
      'Free High-Speed Wi-Fi',
      'Attached Granitic Open-Sky Bathrooms',
      '24/7 Solar & Electric Hot Water',
      'Complimentary Secure Private Parking',
      '24/7 In-Room Dining & Room Service',
      'Ayurvedic Wellness Spa',
      'Direct Temple Shuttle Car Service'
    ],
    roomTypes: [
      {
        id: 'madurai-deluxe-club',
        name: 'Deluxe Heritage Club Room',
        pricePerNight: 5400,
        capacity: '2 Adults, 1 Child',
        bedType: '1 King Bed',
        amenities: ['Private patio overlooking banyan trees', 'Air conditioning', 'Attached bathroom with granite shower', '24/7 hot water', 'Free Wi-Fi', 'Safety deposit locker'],
        availableRooms: 8,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      },
      {
        id: 'madurai-plunge-pool-villa',
        name: 'Geoffrey Bawa Private Plunge Pool Villa',
        pricePerNight: 9500,
        capacity: '2 Adults, 2 Children',
        bedType: '1 Four-Poster King Bed',
        amenities: ['Private courtyard plunge pool', 'Open-to-sky shower garden', 'Air conditioning', '24/7 hot water', 'Complimentary temple transfer & breakfast'],
        availableRooms: 3,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      }
    ],
    foodDining: {
      hasInHouseRestaurant: true,
      restaurantName: 'The Banyan Multi-Cuisine & Marrybrown Coffee Shop',
      cuisines: ['Authentic Madurai Chettinad', 'Traditional South Indian Vegetarian', 'North Indian', 'Continental'],
      mealOptions: ['Complimentary Breakfast', 'Buffet Lunch', 'A la carte Dinner', '24/7 Room Service'],
      vegetarianAvailable: true,
      nonVegetarianAvailable: true,
      veganAvailable: true,
      halalAvailable: true,
      jainAvailable: true,
      breakfastOfferings: [
        'Madurai Malli Idlis (Pillow-soft steamed idlis) with Vada and 4 varieties of chutneys (Mint, Coconut, Tomato, Onion)',
        'Ghee Pongal with spicy brinjal gosthu and medu vada',
        'Eggs to order, chicken sausages, toast, fresh juice, and South Indian filter coffee'
      ],
      lunchOfferings: [
        'Madurai Kari Dosa (Thick rice crepe topped with minced spiced mutton and egg)',
        'Chettinad Meen (Fish) Kuzhambu simmered with tamarind, garlic, and fresh curry leaves',
        'Traditional Pure Veg South Indian Plantain Leaf Meals'
      ],
      dinnerOfferings: [
        'Madurai Bun Parotta with spicy chicken chukka and salna',
        'Paneer Tikka Lababdar with buttery phulkas and dal makhani',
        'Authentic Mutton Chukka Varuval'
      ],
      snacksBeverages: [
        'Madurai Famous Special Jigarthanda with almond gum (badam pisin), nannari syrup, and basundi ice cream',
        'Crispy onion bondas, filter coffee, and freshly cut tender coconut water'
      ],
      buffetAvailable: true,
      roomServiceMealsAvailable: true,
      localKeralaCuisineNotes: 'Celebrates Madurai’s legendary culinary traditions: from world-famous pillow-soft idlis to rich Chettinad gravies and iconic Jigarthanda.',
      signatureDishes: [
        { name: 'Authentic Madurai Jigarthanda Special', type: 'veg', price: 160, description: 'Royal thirst-quencher with chilled milk, badam pisin, rose syrup, and caramelized milk ice cream.', cuisineTag: 'Madurai Icon' },
        { name: 'Madurai Bun Parotta with Mutton Chukka', type: 'non-veg', price: 480, description: 'Crispy fluffy pan-fried bun parotta paired with dry-roasted tender spiced goat meat.', cuisineTag: 'Madurai Street Legend' },
        { name: 'Kalyana Mor Kuzhambu with Paruppu Usili', type: 'veg', price: 280, description: 'Spiced buttermilk yogurt curry paired with steamed crumbled lentil and green beans.', cuisineTag: 'Tamil Traditional' }
      ],
      openingHours: 'Breakfast: 7:00 AM – 10:30 AM | Lunch: 12:30 PM – 3:30 PM | Dinner: 7:00 PM – 11:00 PM | Room Service: 24/7',
      isVerifiedMenu: true,
      menuDisclaimer: 'Verified Partner Menu. In-house chefs maintain strict hygiene standards and authentic regional recipes.'
    },
    dataSource: 'verified_partner',
    badge: 'Luxury Heritage Resort'
  },

  // RAMESWARAM HOTEL (Tamil Nadu)
  {
    id: 'rameswaram-daiwik-hotel',
    destinationId: 'rameswaram',
    destinationName: 'Rameswaram',
    country: 'India',
    stateId: 'tamil-nadu',
    district: 'Ramanathapuram',
    city: 'Rameswaram',
    name: 'Daiwik Hotel Rameswaram',
    tagline: 'Modern 4-star pilgrim-friendly hotel with guided temple rituals and pure veg dining',
    starRating: 4,
    rating: 4.6,
    reviewCount: 1100,
    address: 'NH 49, Madurai-Rameswaram Highway, Near Railway Station, Rameswaram 623526',
    distanceFromCenterKm: 1.8,
    checkInTime: '12:00 PM',
    checkOutTime: '10:00 AM',
    contactPhone: '+91 4573 221777',
    contactEmail: 'contact@daiwikhotels.com',
    image: '/src/assets/images/rameswaram_pamban_bridge_1792907283013.jpg',
    hasAC: true,
    hasWifi: true,
    hasAttachedBathroom: true,
    hasParking: true,
    hasRoomService: true,
    hasHotWater: true,
    facilities: [
      '100% Air-Conditioned Rooms',
      'Free High-Speed Wi-Fi',
      'Attached Bathrooms with Separate Wet & Dry Areas',
      '24/7 Hot Water Facility for Holy Baths',
      'Ample Free Bus & Car Parking',
      'Room Service from 6:00 AM to 11:00 PM',
      'Activity Desk & 22 Teertham Guided Ritual Assistance',
      'Pure Vegetarian In-House Restaurant'
    ],
    roomTypes: [
      {
        id: 'rameswaram-superior-room',
        name: 'Superior Air-Conditioned Double Room',
        pricePerNight: 3800,
        capacity: '2 Adults, 1 Child',
        bedType: '1 King or 2 Twin Beds',
        amenities: ['Individual split AC', 'Attached private bathroom', '24/7 hot water', 'Free Wi-Fi', 'Tea/coffee maker', 'Writing desk'],
        availableRooms: 12,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      },
      {
        id: 'rameswaram-family-suite',
        name: 'Pilgrim Family Suite (Interconnecting)',
        pricePerNight: 6200,
        capacity: '4 Adults, 2 Children',
        bedType: '2 King Beds',
        amenities: ['Spacious two-room suite', 'Two attached bathrooms', '24/7 hot water', 'Drying rack for sacred bath clothes', 'Complimentary morning breakfast buffet'],
        availableRooms: 4,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      }
    ],
    foodDining: {
      hasInHouseRestaurant: true,
      restaurantName: 'Ahaan Pure Vegetarian Restaurant',
      cuisines: ['South Indian Vegetarian', 'North Indian', 'Jain Specialty', 'Satvik Cuisine'],
      mealOptions: ['Complimentary Breakfast', 'Buffet Lunch', 'A la carte Dinner', '24/7 Room Service'],
      vegetarianAvailable: true,
      nonVegetarianAvailable: false,
      veganAvailable: true,
      halalAvailable: false,
      jainAvailable: true,
      breakfastOfferings: [
        'Idli, Vada, and Crispy Masala Dosa with Drumstick Sambar and Coconut Chutney',
        'Rava Upma with coconut chutney and sugar',
        'Poha, Poori Bhaji, fresh seasonal fruits, and South Indian filter coffee'
      ],
      lunchOfferings: [
        'Complete South Indian Satvik Thali (Rice, Sambar, Rasam, Kootu, Poriyal, Appalam, Curd, Payasam, Ghee)',
        'Jain Meals cooked without onion, garlic, or root vegetables (Available on request)',
        'North Indian Thali with Paneer, Dal Fry, Roti, and Jeera Rice'
      ],
      dinnerOfferings: [
        'Tandoori Roti with Dal Tadka and Kadhai Paneer',
        'South Indian light tiffin (Uttapam, Idiyappam with vegetable kurma)',
        'Curd Rice with tempered mustard seeds and pomegranate'
      ],
      snacksBeverages: [
        'Filter coffee, fresh lime soda, buttermilk with curry leaves and ginger',
        'Evening masala tea with hot medu vadas and sundal'
      ],
      buffetAvailable: true,
      roomServiceMealsAvailable: true,
      localKeralaCuisineNotes: 'Dedicated pure vegetarian and Satvik kitchen catering to pilgrims visiting Ramanathaswamy Temple.',
      signatureDishes: [
        { name: 'Daiwik Satvik Temple Thali', type: 'veg', price: 320, description: 'Traditional nutritious plantain leaf meal cooked with rock salt and minimal spices.', cuisineTag: 'Satvik Pilgrimage' },
        { name: 'Ghee Podi Thatte Idli', type: 'veg', price: 180, description: 'Large steamed rice cake drenched in golden cow ghee and spiced gun powder.', cuisineTag: 'South Indian Breakfast' },
        { name: 'Elaneer Payasam (Tender Coconut Pudding)', type: 'veg', price: 160, description: 'Delicate dessert prepared from fresh tender coconut pulp, coconut water, and condensed milk.', cuisineTag: 'Coastal Dessert' }
      ],
      openingHours: 'Breakfast: 6:30 AM – 10:30 AM | Lunch: 12:00 PM – 3:30 PM | Dinner: 7:00 PM – 10:30 PM | Room Service: 6:00 AM – 11:00 PM',
      isVerifiedMenu: true,
      menuDisclaimer: 'Verified Partner Menu. 100% Pure Vegetarian certified kitchen with strict hygiene protocols.'
    },
    dataSource: 'verified_partner',
    badge: 'Top Rated Pilgrim Hotel'
  },

  // MUNNAR HOTEL (Kerala)
  {
    id: 'munnar-tea-county',
    destinationId: 'munnar',
    destinationName: 'Munnar',
    country: 'India',
    stateId: 'kerala',
    district: 'Idukki',
    city: 'Munnar',
    name: 'Tea County Resort (KTDC)',
    tagline: 'Colonial luxury nestled directly between two misty tea-draped hills',
    starRating: 4,
    rating: 4.6,
    reviewCount: 1420,
    address: 'KTDC Hill Resort, Colony Road, Munnar, Idukki District, Kerala 685612',
    distanceFromCenterKm: 1.2,
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    contactPhone: '+91 4865 230460',
    contactEmail: 'teacounty@ktdc.com',
    image: '/src/assets/images/munnar_tea_hills_1792905683927.jpg',
    hasAC: true,
    hasWifi: true,
    hasAttachedBathroom: true,
    hasParking: true,
    hasRoomService: true,
    hasHotWater: true,
    facilities: [
      'Ayurvedic Rejuvenation Spa',
      'Air Conditioning & Hill Heating',
      'Free High-Speed Wi-Fi',
      'Attached Private Bathrooms',
      '24/7 Hot Water in All Rooms',
      'Complimentary On-Site Parking',
      '24-Hour Room Service',
      'Indoor Games & Billiards Room',
      'Travel Desk & Eravikulam Safari Booking'
    ],
    roomTypes: [
      {
        id: 'munnar-deluxe-valley',
        name: 'Deluxe Valley View Room',
        pricePerNight: 5200,
        capacity: '2 Adults, 1 Child',
        bedType: '1 King Bed',
        amenities: ['Valley view balcony', 'Tea maker with fresh estate tea', 'Free Wi-Fi', 'Hot water 24/7', 'LED TV', 'Attached bathroom'],
        availableRooms: 6,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      },
      {
        id: 'munnar-heritage-suite',
        name: 'Heritage Suite with Fireplace',
        pricePerNight: 8500,
        capacity: '2 Adults, 2 Children',
        bedType: '1 King Bed + Sitting Parlor',
        amenities: ['Working colonial fireplace', 'Panoramic balcony', 'Bathtub', 'Ayurvedic bath amenities', 'Complimentary fruit basket', '24/7 hot water'],
        availableRooms: 2,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      }
    ],
    foodDining: {
      hasInHouseRestaurant: true,
      restaurantName: 'County Spice Restaurant',
      cuisines: ['Authentic Kerala', 'North Indian', 'Continental'],
      mealOptions: ['Complimentary Breakfast', 'Buffet Lunch', 'A la carte Dinner', '24/7 Room Service'],
      vegetarianAvailable: true,
      nonVegetarianAvailable: true,
      veganAvailable: true,
      halalAvailable: true,
      jainAvailable: true,
      breakfastOfferings: [
        'Steamed Appam with tender Vegetable Stew and Egg Roast',
        'Puttu with Kadala Curry and steamed bananas',
        'Continental breakfast with cereals, eggs, toast, and freshly plucked Munnar hill tea'
      ],
      lunchOfferings: [
        'Munnar Spiced Chicken Roast (Nadan Kozhi) with Malabar Parotta',
        'Kerala Sadya Thali with Avial, Thoran, Sambar, Rasam, and Pappadam',
        'Tandoori fish fillet with mint chutney'
      ],
      dinnerOfferings: [
        'Aromatic Kerala Chicken Biryani with raita and date pickle',
        'Kootu Curry with red unpolished matta rice',
        'Grilled Continental chicken breast with herb mashed potato'
      ],
      snacksBeverages: [
        'Freshly brewed Munnar high-grown black tea and cardamom spiced tea',
        'Crispy hot banana fritters (Pazham Pori) and tea cake'
      ],
      buffetAvailable: true,
      roomServiceMealsAvailable: true,
      localKeralaCuisineNotes: 'Serves authentic Central Travancore specialties including Appam with tender Vegetable Stew, Kerala Fish Curry, and Kootu Curry made with fresh hill spices.',
      signatureDishes: [
        { name: 'Appam with Kerala Vegetable Stew', type: 'veg', price: 280, description: 'Lacy fermented rice hoppers paired with aromatic coconut milk stew loaded with fresh beans, carrots, and potatoes.', cuisineTag: 'Kerala Traditional' },
        { name: 'Munnar Spiced Chicken Roast (Nadan Kozhi)', type: 'non-veg', price: 420, description: 'Tender chicken slow-cooked with crushed black pepper, shallots, curry leaves, and coconut slices.', cuisineTag: 'Kerala Regional' },
        { name: 'Palada Payasam', type: 'veg', price: 180, description: 'Classic sweet slow-simmered condensed milk pudding with steamed rice flakes and cardamom.', cuisineTag: 'Dessert' }
      ],
      openingHours: 'Breakfast: 7:00 AM – 10:00 AM | Lunch: 12:30 PM – 3:30 PM | Dinner: 7:30 PM – 10:30 PM | Room Service: 24/7',
      isVerifiedMenu: true,
      menuDisclaimer: 'Verified Partner Menu. State Government (KTDC) certified hospitality.'
    },
    dataSource: 'verified_partner',
    badge: 'Govt. KTDC Verified'
  },

  // ALLEPPEY HOTEL & HOUSEBOAT (Kerala)
  {
    id: 'alleppey-ktdc-water-palace',
    destinationId: 'alleppey',
    destinationName: 'Alleppey (Alappuzha)',
    country: 'India',
    stateId: 'kerala',
    district: 'Alappuzha',
    city: 'Alappuzha',
    name: 'Punnamada Backwater Resort & Houseboats',
    tagline: 'Heritage lakefront bungalows and private luxury houseboats on Vembanad',
    starRating: 5,
    rating: 4.7,
    reviewCount: 950,
    address: 'Punnamada, Alappuzha District, Kerala 688006',
    distanceFromCenterKm: 4.0,
    checkInTime: '1:00 PM',
    checkOutTime: '11:00 AM',
    contactPhone: '+91 477 2233690',
    contactEmail: 'reservations@punnamada.com',
    image: '/src/assets/images/alleppey_houseboat_sunset_1792905685326.jpg',
    hasAC: true,
    hasWifi: true,
    hasAttachedBathroom: true,
    hasParking: true,
    hasRoomService: true,
    hasHotWater: true,
    facilities: [
      'Infinity Pool Facing Vembanad Lake',
      'Air-Conditioned Rooms & Houseboat Cabins',
      'Free High-Speed Wi-Fi',
      'Attached Bathrooms with Open-Sky Garden Showers',
      '24/7 Hot Water Facility',
      'Complimentary Secure Guest Parking',
      'Room Service & Onboard Private Chef',
      'Ayurvedic Wellness Spa',
      'Speedboats, Shikaras & Kayaks'
    ],
    roomTypes: [
      {
        id: 'alleppey-lake-villa',
        name: 'Heritage Lake View Villa',
        pricePerNight: 9800,
        capacity: '2 Adults, 1 Child',
        bedType: '1 King Bed',
        amenities: ['Direct lake panorama', 'Open-to-sky shower', 'Air conditioning', '24/7 hot water', 'Attached luxury bathroom', 'High-speed Wi-Fi', 'Breakfast included'],
        availableRooms: 5,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      },
      {
        id: 'alleppey-deluxe-houseboat',
        name: 'Private Deluxe 1-Bedroom Houseboat (Overnight Cruise)',
        pricePerNight: 14500,
        capacity: '2 Adults',
        bedType: '1 King Bed en-suite',
        amenities: ['Dedicated captain, private chef & engine driver', 'All 4 meals included (Lunch, High Tea, Dinner, Breakfast)', 'Air-conditioned bedroom (9 PM - 6 AM)', 'Attached bathroom with hot shower', 'Upper sun deck'],
        availableRooms: 3,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      }
    ],
    foodDining: {
      hasInHouseRestaurant: true,
      restaurantName: 'Choola Lakefront Restaurant & Onboard Galley',
      cuisines: ['Kuttanad Cuisine', 'South Indian', 'Continental', 'Fresh Seafood'],
      mealOptions: ['Complimentary Breakfast', 'Buffet Lunch', 'A la carte Dinner', '24/7 Room Service'],
      vegetarianAvailable: true,
      nonVegetarianAvailable: true,
      veganAvailable: true,
      halalAvailable: true,
      jainAvailable: true,
      breakfastOfferings: [
        'Idiyappam with Egg Roast or Vegetable Kurma',
        'Steamed Tapioca (Kappa) with spicy crushed shallot-chilli dip',
        'Pancakes, toast, fresh papaya & pineapple, and freshly brewed South Indian filter coffee'
      ],
      lunchOfferings: [
        'Karimeen Pollichathu (Pearl spot fish wrapped in banana leaf and grilled with spices)',
        'Traditional Kuttanad Duck Roast with flaky parottas',
        'Kerala Sadhya Banana Leaf Lunch with 16 authentic vegetable side dishes'
      ],
      dinnerOfferings: [
        'Freshly caught Tiger Prawn Curry in thick coconut and tamarind gravy',
        'Avial and Thoran with unpolished Matta red rice and Rasam',
        'Grilled King Fish steaks with salad'
      ],
      snacksBeverages: [
        'Evening masala tea with crispy hot banana fritters (Pazham Pori) served on the houseboat deck',
        'Fresh tender coconut water straight from local palm groves'
      ],
      buffetAvailable: true,
      roomServiceMealsAvailable: true,
      localKeralaCuisineNotes: 'Renowned for live-caught freshwater pearl spot (Karimeen) marinated in red shallot-chilli paste and grilled wrapped in banana leaf.',
      signatureDishes: [
        { name: 'Karimeen Pollichathu (Pearl Spot in Banana Leaf)', type: 'non-veg', price: 650, description: 'Freshwater pearl spot fish coated with ground shallots, ginger, tomato, and kokum, pan-roasted inside wilted banana leaf.', cuisineTag: 'Kerala Signature' },
        { name: 'Traditional Kuttanad Duck Roast with Parotta', type: 'non-veg', price: 540, description: 'Tender free-range duck slow-simmered in aromatic spiced coriander gravy, served with flaky layered parottas.', cuisineTag: 'Backwaters Special' },
        { name: 'Kerala Sadhya Feast (Banana Leaf Meal)', type: 'veg', price: 450, description: 'Festive vegetarian spread featuring 16 items including Avial, Thoran, Sambar, Rasam, Pachadi, and Ada Pradhaman payasam.', cuisineTag: 'Kerala Feast' }
      ],
      openingHours: '7:00 AM – 10:30 PM daily | Houseboat meals served fresh at anchor',
      isVerifiedMenu: true,
      menuDisclaimer: 'Verified Partner Menu. Fresh seafood inspected and sourced daily from local lake fishermen.'
    },
    dataSource: 'verified_partner',
    badge: 'Luxury Lake & Houseboat Resort'
  },

  // KOCHI HOTEL (Kerala)
  {
    id: 'kochi-fort-heritage',
    destinationId: 'kochi',
    destinationName: 'Kochi (Cochin)',
    country: 'India',
    stateId: 'kerala',
    district: 'Ernakulam',
    city: 'Kochi',
    name: 'Brunton Boatyard (CGH Earth)',
    tagline: 'Restored Victorian shipyard with harbor views and Portuguese colonial heritage',
    starRating: 5,
    rating: 4.8,
    reviewCount: 1120,
    address: '1/498 Calvathy Road, Fort Kochi, Ernakulam District, Kerala 682001',
    distanceFromCenterKm: 0.8,
    checkInTime: '2:00 PM',
    checkOutTime: '12:00 PM',
    contactPhone: '+91 484 2215461',
    contactEmail: 'contact@cghearth.com',
    image: '/src/assets/images/kochi_chinese_fishing_nets_1792905685051.jpg',
    hasAC: true,
    hasWifi: true,
    hasAttachedBathroom: true,
    hasParking: true,
    hasRoomService: true,
    hasHotWater: true,
    facilities: [
      'Harborside Swimming Pool',
      'Central Air Conditioning',
      'High-Speed Wi-Fi',
      'Attached Bathrooms with Clawfoot Tubs',
      '24/7 Hot Water Facility',
      'Free Valet Parking',
      '24-Hour Room Service',
      'Ayurveda Wellness Spa',
      'Daily Sunset Harbor Boat Cruise'
    ],
    roomTypes: [
      {
        id: 'kochi-harbour-view',
        name: 'Harbour View Room with Antique Teak Furnishing',
        pricePerNight: 12500,
        capacity: '2 Adults',
        bedType: '1 Four-poster King Bed',
        amenities: ['Harbor view overlooking sea channel and dolphins', 'Deep soaking clawfoot tub', 'Air conditioning', '24/7 hot water', 'Attached bathroom', 'Free Wi-Fi', 'Complimentary sunset boat cruise'],
        availableRooms: 4,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      }
    ],
    foodDining: {
      hasInHouseRestaurant: true,
      restaurantName: 'History Fine Dining & Terrace Grill',
      cuisines: ['Historic Fort Kochi Cuisine (Jewish, Dutch, Portuguese, British, Syrian Christian)'],
      mealOptions: ['Complimentary Breakfast', 'Buffet Lunch', 'A la carte Dinner', '24/7 Room Service'],
      vegetarianAvailable: true,
      nonVegetarianAvailable: true,
      veganAvailable: true,
      halalAvailable: true,
      jainAvailable: false,
      breakfastOfferings: [
        'Appam with tender Syrian Christian chicken stew or vegetable stew',
        'Classic Anglo-Indian Kedgeree with flaked fish, boiled egg, and rice',
        'Freshly squeezed tropical juices, artisan breads, and estate coffee'
      ],
      lunchOfferings: [
        'Fort Kochi Fish Moilee with fragrant steamed rice',
        'Vegetable Ishtu with soft string hoppers (Idiyappam)',
        'Portuguese-style prawn balchao'
      ],
      dinnerOfferings: [
        'Cochin First Class Railway Mutton Mappas with shallots and whole spices',
        'Catch of the day grilled with lemon, crushed garlic, and sea salt',
        'Traditional Jewish Challah bread and braised lamb shank'
      ],
      snacksBeverages: [
        'Afternoon ginger tea, cinnamon-cardamom cookies, and spiced coconut crunch',
        'Tropical mocktails and fresh lime mint coolers'
      ],
      buffetAvailable: true,
      roomServiceMealsAvailable: true,
      localKeralaCuisineNotes: 'The menu is based on antique recipe books kept by 32 historical communities that lived in Cochin over six centuries.',
      signatureDishes: [
        { name: 'Cochin First Class Railway Mutton Mappas', type: 'non-veg', price: 780, description: 'Mildly spiced tender mutton cooked with coconut milk and whole spices as served on British colonial steam journeys.', cuisineTag: 'Anglo-Indian Heritage' },
        { name: 'Fort Kochi Fish Moilee', type: 'non-veg', price: 680, description: 'Fresh seer fish poached gently in coconut milk infused with green chillies, ginger, turmeric, and fresh curry leaves.', cuisineTag: 'Coastal Kerala' },
        { name: 'Vegetable Ishtu with String Hoppers (Idiyappam)', type: 'veg', price: 380, description: 'Delicate steamed rice vermicelli nests served with fragrant coconut milk vegetable stew.', cuisineTag: 'Kerala Classic' }
      ],
      openingHours: 'Breakfast: 7:00 AM – 10:30 AM | Lunch: 12:30 PM – 3:30 PM | Dinner: 7:00 PM – 11:00 PM | Room Service: 24/7',
      isVerifiedMenu: true,
      menuDisclaimer: 'Verified Partner Menu. CGH Earth certified heritage gastronomic archive.'
    },
    dataSource: 'verified_partner',
    badge: 'Heritage 5-Star Landmark'
  },

  // WAYANAD HOTEL (Kerala)
  {
    id: 'wayanad-wild-retreat',
    destinationId: 'wayanad',
    destinationName: 'Wayanad',
    country: 'India',
    stateId: 'kerala',
    district: 'Wayanad',
    city: 'Kalpetta',
    name: 'Vythiri Rainforest Eco-Resort',
    tagline: 'Treehouses and eco-villas set high amidst a pristine mountain rainforest stream',
    starRating: 4,
    rating: 4.7,
    reviewCount: 760,
    address: 'Lakkidi P.O., Vythiri, Wayanad District, Kerala 673576',
    distanceFromCenterKm: 3.5,
    checkInTime: '1:00 PM',
    checkOutTime: '11:00 AM',
    contactPhone: '+91 4936 255366',
    contactEmail: 'vythiri@rainforesthotels.com',
    image: '/src/assets/images/wayanad_chembra_mist_1792907282689.jpg',
    hasAC: true,
    hasWifi: true,
    hasAttachedBathroom: true,
    hasParking: true,
    hasRoomService: true,
    hasHotWater: true,
    facilities: [
      'Natural Mountain Spring Swimming Pool',
      'Air Conditioning & Mountain Air Ventilation',
      'Wi-Fi in Common Lounge & Rooms',
      'Attached Bathrooms with Spring Water Showers',
      '24/7 Hot Water Facility',
      'Free Parking Area',
      'Room Service from 7:00 AM to 10:30 PM',
      'Full Ayurvedic Wellness Spa',
      'Rope Suspension Footbridge & Naturalist Treks'
    ],
    roomTypes: [
      {
        id: 'wayanad-canopy-treehouse',
        name: 'Canopy Treehouse Villa',
        pricePerNight: 11000,
        capacity: '2 Adults',
        bedType: '1 King Bed',
        amenities: ['Built 60ft high on native forest tree', 'Solar-powered natural air-flow', 'Stream-view private balcony', 'Natural mountain spring shower', 'Attached private bathroom', '24/7 hot water'],
        availableRooms: 2,
        hasAC: false,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: false,
        hasParking: true,
        isVerified: true
      },
      {
        id: 'wayanad-pool-villa',
        name: 'Stream-Facing Pool Villa with AC',
        pricePerNight: 14000,
        capacity: '2 Adults, 2 Children',
        bedType: '1 King Bed + Daybed',
        amenities: ['Private plunge pool', 'Air conditioning', 'Attached luxury bathroom', '24/7 hot water', 'Rainforest deck', 'Bathtub', 'Complimentary all meals'],
        availableRooms: 3,
        hasAC: true,
        hasWifi: true,
        hasAttachedBathroom: true,
        hasHotWater: true,
        hasRoomService: true,
        hasParking: true,
        isVerified: true
      }
    ],
    foodDining: {
      hasInHouseRestaurant: true,
      restaurantName: 'The Canopy Overhanging Pavilion',
      cuisines: ['Malabar Spiced Cuisine', 'Traditional Kerala', 'South Indian'],
      mealOptions: ['Complimentary Breakfast', 'Buffet Lunch', 'A la carte Dinner'],
      vegetarianAvailable: true,
      nonVegetarianAvailable: true,
      veganAvailable: true,
      halalAvailable: true,
      jainAvailable: true,
      breakfastOfferings: [
        'Pathiri (Rice flatbreads) with vegetable kurma or chicken curry',
        'Puttu with Kadala Curry and mountain honey',
        'Fresh tropical fruits, toast, butter, and Wayanadan Robusta estate coffee'
      ],
      lunchOfferings: [
        'Malabar Dum Biryani prepared with fragrant Wayanad Jeerakasala rice',
        'Ulli Theeyal with Matta red rice and pumpkin pachadi',
        'Grilled river fish fillet with green pepper dip'
      ],
      dinnerOfferings: [
        'Aromatic Kerala Fish Curry simmered with kokum and coconut milk',
        'Kadai Chicken with hot chapathis',
        'Dal Tadka with steamed rice and crispy pappadam'
      ],
      snacksBeverages: [
        'Evening Sulaimani spiced black tea with mint and cloves',
        'Crispy tapioca chips and hot vegetable pakodas'
      ],
      buffetAvailable: true,
      roomServiceMealsAvailable: true,
      localKeralaCuisineNotes: 'Celebrates Malabar coast spices, Wayanad fragrant Gandhakasala rice, and hill wild herbs.',
      signatureDishes: [
        { name: 'Malabar Dum Biryani with Jeerakasala Rice', type: 'non-veg', price: 460, description: 'Fragrant short-grain scented rice sealed and dum-cooked with tender spiced chicken, fried shallots, and cashews.', cuisineTag: 'Malabar Heritage' },
        { name: 'Ulli Theeyal with Matta Red Rice', type: 'veg', price: 310, description: 'Shallots simmered in dark roasted coconut and tamarind gravy served over wholesome indigenous red rice.', cuisineTag: 'Kerala Traditional' }
      ],
      openingHours: '7:30 AM – 10:00 PM daily',
      isVerifiedMenu: true,
      menuDisclaimer: 'Verified Partner Menu. Organically grown vegetables and hill-tribe spices utilized daily.'
    },
    dataSource: 'verified_partner',
    badge: 'Eco-Certified Wilderness Resort'
  }
];

export const SAMPLE_ITINERARIES: TripPlan[] = [
  {
    id: 'tamilnadu-heritage-4d',
    title: '4-Day Grand Tamil Nadu Heritage & Temple Loop: Trichy - Madurai - Rameswaram',
    destinationId: 'madurai',
    destinationName: 'Madurai & Rameswaram (via Trichy HQ)',
    stateName: 'Tamil Nadu',
    startDate: '2026-11-15',
    endDate: '2026-11-18',
    totalDays: 4,
    travelers: 2,
    budgetTier: 'moderate',
    companionType: 'Family',
    preferredActivities: ['Meenakshi Temple darshan', 'Pamban Sea Bridge crossing', 'Dhanushkodi 4x4 safari', 'Madurai street cuisine'],
    foodPreference: 'all',
    totalEstimatedCost: 26500,
    createdAt: '2026-10-24',
    days: [
      {
        dayNumber: 1,
        title: 'Departure from Trichy HQ to Madurai Cultural Capital',
        summary: 'Depart from GJ Guide Masters office on Thuraiyur Main Road, Trichy. Drive 2 hours via NH 38 to Madurai. Check in to Heritage Madurai. Afternoon visit to Thirumalai Nayakkar Palace, followed by evening Meenakshi Amman Temple darshan and nighttime bed-chamber procession.',
        places: [
          { placeId: 'madurai', name: 'Thirumalai Nayakkar Mahal', timeSlot: '3:00 PM - 5:00 PM', duration: '2 hours', entryFee: 10, notes: 'Colossal arches and palace history', category: 'Heritage' },
          { placeId: 'madurai', name: 'Meenakshi Amman Temple', timeSlot: '5:30 PM - 9:45 PM', duration: '4 hours', entryFee: 50, notes: 'Darshan of Goddess Meenakshi and night palliarai ceremony', category: 'Temple' }
        ],
        meals: [
          { mealType: 'Breakfast', restaurantName: 'Trichy Sangeethas', dishRecommendation: 'Ghee Podi Roast Dosa with filter coffee', isVegetarianOptionAvailable: true, estimatedCost: 350 },
          { mealType: 'Lunch', restaurantName: 'The Banyan Restaurant', dishRecommendation: 'Authentic Madurai Plantain Leaf Meal', isVegetarianOptionAvailable: true, estimatedCost: 750 },
          { mealType: 'Dinner', restaurantName: 'Murugan Idli Shop & East Marret Street', dishRecommendation: 'Hot Malli Idlis & Famous Madurai Jigarthanda', isVegetarianOptionAvailable: true, estimatedCost: 450 }
        ],
        accommodation: {
          hotelId: 'madurai-heritage-resort',
          hotelName: 'Heritage Madurai Resort',
          roomType: 'Deluxe Heritage Club Room',
          estimatedNightCost: 5400
        },
        travelNotes: 'Smooth 4-lane highway from Trichy to Madurai. Follow temple dress code strictly.',
        dayEstimatedCost: 6960
      },
      {
        dayNumber: 2,
        title: 'Scenic Drive to Sacred Island of Rameswaram & Pamban Bridge',
        summary: 'Morning visit to Gandhi Memorial Museum, then drive to Pamban Island. Stop at Pamban Sea Bridge to witness cantilever maritime channel. Check in to Daiwik Hotel Rameswaram. Sunset darshan at Ramanathaswamy Temple.',
        places: [
          { placeId: 'rameswaram', name: 'Pamban Sea Bridge', timeSlot: '2:30 PM - 3:30 PM', duration: '1 hour', entryFee: 0, notes: 'Marvel at 2-km ocean cantilever span', category: 'Sightseeing' },
          { placeId: 'rameswaram', name: 'Ramanathaswamy Temple Corridors', timeSlot: '5:00 PM - 8:30 PM', duration: '3.5 hours', entryFee: 25, notes: 'World’s longest stone pillared corridor', category: 'Temple' }
        ],
        meals: [
          { mealType: 'Breakfast', restaurantName: 'Heritage Madurai Buffet', dishRecommendation: 'Live Appam and Pongal counter', isVegetarianOptionAvailable: true, estimatedCost: 400 },
          { mealType: 'Lunch', restaurantName: 'Ramanathapuram Highway Dhaba', dishRecommendation: 'Tamil Nadu meals with crispy appalam', isVegetarianOptionAvailable: true, estimatedCost: 300 },
          { mealType: 'Dinner', restaurantName: 'Ahaan Pure Veg at Daiwik', dishRecommendation: 'Satvik Temple Thali & Elaneer Payasam', isVegetarianOptionAvailable: true, estimatedCost: 650 }
        ],
        accommodation: {
          hotelId: 'rameswaram-daiwik-hotel',
          hotelName: 'Daiwik Hotel Rameswaram',
          roomType: 'Superior AC Double Room',
          estimatedNightCost: 3800
        },
        travelNotes: 'Drive slowly on Pamban bridge to soak in the sea vistas. Keep change of dry clothes for temple baths.',
        dayEstimatedCost: 5175
      },
      {
        dayNumber: 3,
        title: 'Sacred Wells Holy Bath, Dhanushkodi Safari & Dr. Kalam Memorial',
        summary: 'Early morning 5 AM Spatika Linga darshan and holy bath in 22 sacred temple wells. Breakfast, followed by 4x4 safari to Dhanushkodi ghost town and confluence of Indian Ocean and Bay of Bengal. Visit Dr. APJ Abdul Kalam Memorial.',
        places: [
          { placeId: 'rameswaram', name: '22 Sacred Temple Wells', timeSlot: '5:00 AM - 7:30 AM', duration: '2.5 hours', entryFee: 25, notes: 'Purificatory holy water ritual', category: 'Ritual' },
          { placeId: 'rameswaram', name: 'Dhanushkodi Ghost Town & Ram Setu', timeSlot: '9:30 AM - 1:30 PM', duration: '4 hours', entryFee: 0, notes: 'Ocean confluence and 1964 cyclone ruins', category: 'Heritage' },
          { placeId: 'rameswaram', name: 'Dr. APJ Abdul Kalam Memorial', timeSlot: '3:30 PM - 5:00 PM', duration: '1.5 hours', entryFee: 0, notes: 'Tribute to India’s People’s President', category: 'Memorial' }
        ],
        meals: [
          { mealType: 'Breakfast', restaurantName: 'Daiwik In-House Buffet', dishRecommendation: 'Ghee Podi Thatte Idli & Filter Coffee', isVegetarianOptionAvailable: true, estimatedCost: 350 },
          { mealType: 'Lunch', restaurantName: 'Dhanushkodi Seaside Shacks', dishRecommendation: 'Fresh tender coconut water and light tiffin', isVegetarianOptionAvailable: true, estimatedCost: 300 },
          { mealType: 'Dinner', restaurantName: 'Ahaan Restaurant', dishRecommendation: 'Tandoori Roti with Dal Tadka and Kadhai Paneer', isVegetarianOptionAvailable: true, estimatedCost: 600 }
        ],
        accommodation: {
          hotelId: 'rameswaram-daiwik-hotel',
          hotelName: 'Daiwik Hotel Rameswaram',
          roomType: 'Superior AC Double Room',
          estimatedNightCost: 3800
        },
        travelNotes: 'Sun protection essential for Dhanushkodi beach safari. Strict no-swimming zone at Arichal Munai.',
        dayEstimatedCost: 5075
      },
      {
        dayNumber: 4,
        title: 'Chettinad Heritage Mansion Trail & Return to Trichy HQ',
        summary: 'Drive from Rameswaram towards Trichy via Karaikudi (Chettinad). Tour a 100-year-old teak mansion and savor authentic Chettinad culinary lunch. Return to GJ Guide Masters office on Thuraiyur Main Road, Trichy.',
        places: [
          { placeId: 'rameswaram', name: 'Karaikudi Chettinad Mansions', timeSlot: '11:00 AM - 1:30 PM', duration: '2.5 hours', entryFee: 50, notes: 'Burmese teak, Italian marble, and Athangudi tile palaces', category: 'Heritage' }
        ],
        meals: [
          { mealType: 'Breakfast', restaurantName: 'Daiwik Restaurant', dishRecommendation: 'Poori Masala with hot tea', isVegetarianOptionAvailable: true, estimatedCost: 350 },
          { mealType: 'Lunch', restaurantName: 'The Bangala / Chettinad Heritage', dishRecommendation: 'World-renowned 7-course Chettinad lunch', isVegetarianOptionAvailable: true, estimatedCost: 1100 },
          { mealType: 'Dinner', restaurantName: 'Trichy Thuraiyur Road Restaurant', dishRecommendation: 'Crispy Kal Dosa with onion chutney', isVegetarianOptionAvailable: true, estimatedCost: 350 }
        ],
        accommodation: {
          hotelId: 'trichy-transit',
          hotelName: 'Return to Trichy / Departure',
          roomType: 'Day Tour Completion',
          estimatedNightCost: 0
        },
        travelNotes: 'Buy authentic handmade Athangudi patterned floor tiles or Chettinad palm leaf baskets as souvenirs.',
        dayEstimatedCost: 1850
      }
    ]
  },
  {
    id: 'kerala-classic-5d',
    title: '5-Day Classic Kerala: Munnar Hills & Alleppey Backwaters',
    destinationId: 'munnar',
    destinationName: 'Munnar & Alleppey',
    stateName: 'Kerala',
    startDate: '2026-11-20',
    endDate: '2026-11-25',
    totalDays: 5,
    travelers: 2,
    budgetTier: 'moderate',
    companionType: 'Couple',
    preferredActivities: ['Tea estate walk', 'Houseboat cruise', 'Wildlife spotting', 'Ayurvedic massage'],
    foodPreference: 'all',
    totalEstimatedCost: 38500,
    createdAt: '2026-10-24',
    days: [
      {
        dayNumber: 1,
        title: 'Arrival in Kochi & Scenic Drive to Munnar',
        summary: 'Scenic winding ascent through rubber and pineapple plantations up into the mist-covered Western Ghats with roadside waterfall stops.',
        places: [
          { placeId: 'munnar', name: 'Cheeyappara Waterfalls', timeSlot: '11:00 AM - 12:00 PM', duration: '1 hour', entryFee: 0, notes: 'Seven-tiered roadside cascade', category: 'Waterfalls' },
          { placeId: 'munnar', name: 'Lockhart Tea Museum', timeSlot: '3:00 PM - 5:00 PM', duration: '2 hours', entryFee: 125, notes: 'Historic tea processing demonstration', category: 'Heritage' }
        ],
        meals: [
          { mealType: 'Breakfast', restaurantName: 'Kochi Airport Lounge', dishRecommendation: 'Idli Vada with Filter Coffee', isVegetarianOptionAvailable: true, estimatedCost: 350 },
          { mealType: 'Lunch', restaurantName: 'Valara Spice Garden', dishRecommendation: 'Kerala Meals with Fish Fry', isVegetarianOptionAvailable: true, estimatedCost: 600 },
          { mealType: 'Dinner', restaurantName: 'County Spice Restaurant', dishRecommendation: 'Appam with Chicken Stew', isVegetarianOptionAvailable: true, estimatedCost: 750 }
        ],
        accommodation: {
          hotelId: 'munnar-tea-county',
          hotelName: 'Tea County Resort (KTDC)',
          roomType: 'Deluxe Valley View Room',
          estimatedNightCost: 5200
        },
        travelNotes: 'Ghat roads have hairpin turns; carry motion sickness medication if prone.',
        dayEstimatedCost: 7025
      }
    ]
  }
];
