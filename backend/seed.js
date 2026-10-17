const mongoose = require('mongoose');
require('dotenv').config();

const WasteItem = require('./models/WasteItem');
const DiyProject = require('./models/DiyProject');
const Video = require('./models/Video');
const Report = require('./models/Report');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/greenova';

const initialWasteItems = [
  {
    itemId: 1,
    name: 'Pizza Box',
    category: 'General Waste',
    description: 'Cardboard box used for pizza delivery. Often contaminated with grease and food residues.',
    shortInstructions: 'Dispose with general waste if greasy; recycle clean parts only.',
    disposalSteps: [
      'Check if the box is heavily soiled with grease, cheese, or food particles',
      'If contaminated, tear off any clean cardboard lids or sections for recycling',
      'Place the greasy/main portion in the general waste bin',
      'If the entire box is clean, it can be recycled with cardboard'
    ],
    whyImportant: 'Grease and food contamination can ruin entire batches of recyclable paper products.',
    collectionPoints: [
      'Main Recycling Center - 123 Green Street',
      'Community Waste Facility - 456 Eco Avenue'
    ],
    tags: ['cardboard', 'food', 'greasy', 'paper']
  },
  {
    itemId: 2,
    name: 'Plastic Bottle (PET)',
    category: 'Recyclable',
    description: 'Clear plastic bottles used for water, soda, and other beverages. Marked with ♳ or PET symbol.',
    shortInstructions: 'Rinse and put in recycling bin',
    disposalSteps: [
      'Empty any remaining liquid from the bottle',
      'Rinse briefly with water to remove residue',
      'Remove the cap (often different plastic type)',
      'Crush the bottle to save space if possible',
      'Place in recycling bin or take to recycling center'
    ],
    whyImportant: 'PET plastic can be efficiently recycled into new bottles, clothing, and other products.',
    collectionPoints: [
      'Curbside Recycling Bin',
      'Supermarket Recycling Bins',
      'Main Recycling Center - 123 Green Street'
    ],
    tags: ['plastic', 'bottle', 'pet', 'drink', 'recyclable']
  },
  {
    itemId: 3,
    name: 'Batteries',
    category: 'Hazardous',
    description: 'All types of household batteries (AA, AAA, 9V, button cells, rechargeable).',
    shortInstructions: 'Take to designated collection point. Never dispose in household trash.',
    disposalSteps: [
      'Tape battery terminals with clear electrical tape to prevent short circuits',
      'Store in a cool, dry place away from flammable materials',
      'Do not crush, puncture, or burn batteries',
      'Drop off at designated battery drop-off bins or e-waste events'
    ],
    whyImportant: 'Batteries contain heavy metals like lead, mercury, and cadmium which leach into groundwater.',
    collectionPoints: [
      'Local Electronics Retailers Drop-Box',
      'Municipal Hazardous Waste Center',
      'City Hall Collection Kiosk'
    ],
    tags: ['hazardous', 'electronic', 'chemical', 'dangerous', 'battery']
  },
  {
    itemId: 4,
    name: 'Vegetable Peels & Scraps',
    category: 'Biodegradable',
    description: 'Raw kitchen scraps including fruit/vegetable peels, cores, coffee grounds, and tea bags.',
    shortInstructions: 'Compost at home or use organic green waste bin.',
    disposalSteps: [
      'Collect in an indoor compost caddy',
      'Avoid mixing with plastics, stickers, or meat/bones',
      'Transfer to home backyard compost bin or municipal organic waste bin'
    ],
    whyImportant: 'Composting organic waste prevents methane emissions produced when food rots in landfills.',
    collectionPoints: [
      'Home Backyard Compost Bin',
      'Community Garden Compost Station',
      'Green Curbside Bin'
    ],
    tags: ['organic', 'food', 'compost', 'kitchen', 'biodegradable']
  },
  {
    itemId: 5,
    name: 'Glass Bottles & Jars',
    category: 'Recyclable',
    description: 'Clear, green, or brown glass beverage bottles and food jars.',
    shortInstructions: 'Rinse and place in glass recycling bin.',
    disposalSteps: [
      'Empty liquids or food remnants',
      'Rinse with water (no need to remove paper labels)',
      'Remove metal or plastic caps and recycle separately',
      'Place in glass recycling container without breaking'
    ],
    whyImportant: 'Glass is 100% recyclable infinitely without losing quality or purity.',
    collectionPoints: [
      'Curbside Glass Bin',
      'Bottle Bank / Supermarket Drop Point',
      'Recycling Center'
    ],
    tags: ['glass', 'bottle', 'jar', 'transparent', 'recyclable']
  },
  {
    itemId: 6,
    name: 'Aluminum & Steel Cans',
    category: 'Recyclable',
    description: 'Soda cans, beer cans, canned vegetable & soup tins.',
    shortInstructions: 'Rinse and crush if possible.',
    disposalSteps: [
      'Empty and rinse out remaining sauce or soda',
      'Crush aluminum soda cans to save space',
      'Place in yellow dry recyclables bin'
    ],
    whyImportant: 'Recycling aluminum saves 95% of the energy needed to make new cans from raw bauxite ore.',
    collectionPoints: [
      'Curbside Metal / Mixed Recyclables Bin',
      'Neighborhood Scrap Depot'
    ],
    tags: ['metal', 'aluminum', 'can', 'drink', 'tin']
  },
  {
    itemId: 7,
    name: 'Newspapers & Cardboard',
    category: 'Recyclable',
    description: 'Newsprint, corrugated delivery boxes, cereal boxes, and office paper.',
    shortInstructions: 'Flatten boxes and keep dry in paper recycling bin.',
    disposalSteps: [
      'Remove excess packing tape and plastic bubble wraps',
      'Flatten all cardboard boxes',
      'Keep dry; wet paper cannot be recycled'
    ],
    whyImportant: 'Recycling 1 ton of paper saves 17 mature trees and 7,000 gallons of water.',
    collectionPoints: [
      'Curbside Blue Paper Bin',
      'School Paper Drives',
      'Municipal Recycling Center'
    ],
    tags: ['paper', 'cardboard', 'box', 'newspaper', 'print']
  },
  {
    itemId: 8,
    name: 'Egg Shells',
    category: 'Biodegradable',
    description: 'Crushed eggshells from cooking',
    shortInstructions: 'Add to compost pile or garden soil',
    disposalSteps: ['Rinse gently and crush to accelerate decomposition', 'Mix into organic compost or spread around garden beds'],
    whyImportant: 'Eggshells are rich in calcium, enhancing compost quality for organic gardening.',
    collectionPoints: ['Home Backyard Compost', 'Organic Waste Bin'],
    tags: ['organic', 'food', 'compost', 'kitchen']
  },
  {
    itemId: 9,
    name: 'Used Motor Oil',
    category: 'Hazardous',
    description: 'Used automotive engine oil',
    shortInstructions: 'Take to auto parts store or municipal hazardous waste center',
    disposalSteps: ['Drain into a clean leak-proof container', 'Never pour down storm drains or onto soil', 'Deliver to approved recycling depot'],
    whyImportant: 'Just one gallon of motor oil can contaminate one million gallons of fresh drinking water.',
    collectionPoints: ['Certified Auto Service Stations', 'Municipal Hazardous Waste Center'],
    tags: ['hazardous', 'automotive', 'chemical', 'liquid']
  },
  {
    itemId: 10,
    name: 'Styrofoam (Polystyrene)',
    category: 'General Waste',
    description: 'Polystyrene foam packaging, cups, and takeout clamshells',
    shortInstructions: 'Dispose with general waste unless specialized EPS drop-off exists',
    disposalSteps: ['Break into manageable pieces', 'Place in black household trash bin'],
    whyImportant: 'Polystyrene takes hundreds of years to break down and fragments into microplastics.',
    collectionPoints: ['Curbside General Waste Bin'],
    tags: ['plastic', 'foam', 'packaging', 'non-recyclable']
  },
  {
    itemId: 11,
    name: 'Coffee Grounds',
    category: 'Biodegradable',
    description: 'Used coffee grounds and unbleached paper filters',
    shortInstructions: 'Excellent nitrogen source for composting',
    disposalSteps: ['Add directly to compost bin or garden mulch'],
    whyImportant: 'Provides valuable nitrogen and improves soil aeration.',
    collectionPoints: ['Home Compost', 'Green Waste Bin'],
    tags: ['organic', 'coffee', 'compost', 'kitchen']
  },
  {
    itemId: 12,
    name: 'Broken Glass & Ceramics',
    category: 'General Waste',
    description: 'Shattered window panes, drinking glasses, and broken crockery',
    shortInstructions: 'Wrap securely in newspaper before bin disposal',
    disposalSteps: ['Wrap sharp shards in thick paper or cardboard', 'Label as sharp/broken glass', 'Place in general waste'],
    whyImportant: 'Protects sanitation and recycling workers from severe puncture wounds.',
    collectionPoints: ['Curbside General Waste'],
    tags: ['glass', 'broken', 'sharp', 'dangerous']
  },
  {
    itemId: 13,
    name: 'Cardboard Boxes (Corrugated)',
    category: 'Recyclable',
    description: 'Clean shipping, shipping delivery, and cereal boxes',
    shortInstructions: 'Flatten and place in recycling',
    disposalSteps: ['Remove plastic packing tape and shipping labels', 'Flatten cardboard flat', 'Place in blue recycling bin'],
    whyImportant: 'Recycled cardboard uses 75% less energy than manufacturing from virgin timber.',
    collectionPoints: ['Curbside Blue Recycling Bin', 'Community Paper Dumpster'],
    tags: ['cardboard', 'packaging', 'paper', 'dry']
  },
  {
    itemId: 14,
    name: 'Paint Cans',
    category: 'Hazardous',
    description: 'Leftover oil and latex paint containers',
    shortInstructions: 'Take to hazardous waste facility; dried latex can go in trash',
    disposalSteps: ['For liquid paint, take to toxic waste depot', 'For empty dried cans, recycle metal lid and can'],
    whyImportant: 'Paint solvents release toxic VOCs into waterways and groundwater.',
    collectionPoints: ['Hazardous Waste Collection Depot', 'Hardware Store Paint Return Drive'],
    tags: ['hazardous', 'chemical', 'paint', 'liquid']
  },
  {
    itemId: 15,
    name: 'Tea Bags',
    category: 'Biodegradable',
    description: 'Used tea bags and loose tea leaves',
    shortInstructions: 'Compost organic tea; check if tea bag contains plastic sealant',
    disposalSteps: ['Compost directly or cut open bag if made of synthetic mesh'],
    whyImportant: 'Decomposes quickly, returning trace minerals to soil.',
    collectionPoints: ['Home Compost', 'Organic Waste Bin'],
    tags: ['organic', 'tea', 'compost', 'kitchen']
  },
  {
    itemId: 16,
    name: 'Plastic Bags & Film',
    category: 'Recyclable',
    description: 'Grocery shopping bags, bubble wrap, and shrink wrap',
    shortInstructions: 'Take to supermarket plastic film drop-off bin. Do NOT put in curbside bin.',
    disposalSteps: ['Clean and dry bags', 'Bundle inside one bag', 'Drop off at supermarket collection station'],
    whyImportant: 'Thin film tangles sorting machinery in standard recycling facilities.',
    collectionPoints: ['Supermarket Front-of-Store Film Bins'],
    tags: ['plastic', 'bag', 'film', 'shopping']
  },
  {
    itemId: 17,
    name: 'Light Bulbs & Tubes',
    category: 'Hazardous',
    description: 'CFL fluorescent, halogen, and LED light bulbs',
    shortInstructions: 'Take CFLs to hazardous waste facility due to mercury content',
    disposalSteps: ['Store in original packaging or box to avoid breakage', 'Drop off at home improvement store or recycling center'],
    whyImportant: 'Fluorescent tubes contain toxic mercury vapor.',
    collectionPoints: ['Home Improvement Retailers', 'Hazardous Waste Center'],
    tags: ['electronic', 'glass', 'hazardous', 'lighting']
  },
  {
    itemId: 18,
    name: 'Yard Waste (Grass & Prunings)',
    category: 'Biodegradable',
    description: 'Lawn clippings, leaves, twigs, and weed trimmings',
    shortInstructions: 'Compost or place in municipal yard waste collection',
    disposalSteps: ['Place in compost pile or brown yard waste bin'],
    whyImportant: 'Yard waste converts into nutrient-rich compost and mulch for public parks.',
    collectionPoints: ['Municipal Green Waste Bin', 'Community Compost Facility'],
    tags: ['organic', 'garden', 'leaves', 'grass']
  },
  {
    itemId: 19,
    name: 'Aerosol Cans',
    category: 'Hazardous',
    description: 'Deodorant, hairspray, and spray lubricant cans',
    shortInstructions: 'Ensure completely empty before recycling. Never puncture.',
    disposalSteps: ['Depress nozzle until completely empty of pressure', 'Recycle with metals if empty; else toxic waste'],
    whyImportant: 'Pressurized propellant can cause explosive fires inside collection trucks.',
    collectionPoints: ['Curbside Recyclables (if empty)', 'Hazardous Waste Site'],
    tags: ['metal', 'aerosol', 'chemical', 'pressure']
  },
  {
    itemId: 20,
    name: 'Milk & Juice Cartons (Tetra Pak)',
    category: 'Recyclable',
    description: 'Polycoated paper liquid containers',
    shortInstructions: 'Rinse, flatten, and place in mixed recyclables bin',
    disposalSteps: ['Empty liquid and rinse', 'Flatten carton', 'Place in yellow/blue recyclables container'],
    whyImportant: 'High quality virgin paper pulp is recovered to produce office paper and tissue.',
    collectionPoints: ['Curbside Mixed Recycling'],
    tags: ['paper', 'carton', 'liquid', 'food']
  },
  {
    itemId: 21,
    name: 'Cooking Oil & Grease',
    category: 'Hazardous',
    description: 'Used frying oil, bacon grease, and vegetable fats',
    shortInstructions: 'Store in sealable jar and drop at biofuel collection depot. Never pour down drain.',
    disposalSteps: ['Let cool completely', 'Pour into a sealable plastic bottle or jar', 'Deliver to waste transfer depot'],
    whyImportant: 'Grease solidifies into fatbergs that block sewer lines and pollute municipal waterways.',
    collectionPoints: ['Municipal Grease Recovery Station', 'Local Restaurant Biofuel Collector'],
    tags: ['hazardous', 'oil', 'liquid', 'kitchen']
  },
  {
    itemId: 22,
    name: 'Electronic Waste (E-Waste)',
    category: 'Hazardous',
    description: 'Laptops, mobile phones, chargers, televisions, and circuit boards',
    shortInstructions: 'Deliver to certified e-waste recycler or retail collection drive',
    disposalSteps: ['Factory reset devices to wipe personal data', 'Remove detachable batteries if possible', 'Deliver to collection kiosk'],
    whyImportant: 'Recovers precious metals (gold, copper) and isolates hazardous lead and cadmium.',
    collectionPoints: ['Electronics Retailers Drop-Box', 'Municipal E-Waste Recycling Drive'],
    tags: ['electronic', 'hazardous', 'technology', 'metal']
  },
  {
    itemId: 23,
    name: 'Ceramics & Porcelain',
    category: 'General Waste',
    description: 'Broken plates, coffee mugs, toilet porcelain, and pottery',
    shortInstructions: 'Dispose in general trash or donate if undamaged',
    disposalSteps: ['Donate if usable', 'If broken, wrap and put in household rubbish'],
    whyImportant: 'Ceramics have different melting points than glass bottles and ruin glass batches.',
    collectionPoints: ['Curbside General Trash Bin'],
    tags: ['ceramic', 'broken', 'dishware', 'non-recyclable']
  }
];

const initialProjects = [
  {
    title: 'Plastic Bottle Planters',
    description: 'Turn plastic bottles into beautiful hanging planters for your garden or balcony.',
    materials: ['Empty plastic bottles', 'Scissors', 'Acrylic paint', 'String', 'Potting Soil', 'Small plants'],
    steps: [
      'Cut the plastic bottle in half horizontally',
      'Paint the bottle with acrylic paint and let it dry',
      'Poke 3 drainage holes in the bottom',
      'Add soil and your favorite herb or plant',
      'Attach string around edges for hanging'
    ],
    difficulty: 'Easy',
    time: '30 minutes',
    image: '🌱',
    category: 'plastic',
    videoId: 'HZYnD2LCJPs'
  },
  {
    title: 'Glass Jar Storage Organizers',
    description: 'Create elegant storage containers from used pasta sauce and jam glass jars.',
    materials: ['Glass jars with lids', 'Spray paint', 'Twine or ribbon', 'Chalkboard labels'],
    steps: [
      'Clean and dry the glass jars thoroughly to remove labels',
      'Spray paint the lids in matte black, gold, or pastel colors',
      'Wrap twine tightly around the neck of the jar',
      'Add custom labels for organization',
      'Use for spices, stationery, crafts, or bathroom supplies'
    ],
    difficulty: 'Easy',
    time: '20 minutes',
    image: '🫙',
    category: 'glass',
    videoId: 'zO3jFKiqm0M'
  },
  {
    title: 'Woven Newspaper Basket',
    description: 'Weave a sturdy, rustic storage basket using rolled-up old newspaper tubes.',
    materials: ['Newspapers', 'Craft Glue', 'Clothespins', 'Acrylic Paint', 'Clear Varnish'],
    steps: [
      'Roll newspaper strips tightly into thin tubes using a skewer',
      'Weave tubes across a cardboard base into a basket shape',
      'Secure interlacing joints with glue and clothespins while drying',
      'Let dry completely for 2 hours',
      'Paint and apply clear varnish for moisture protection'
    ],
    difficulty: 'Intermediate',
    time: '2 hours',
    image: '📰',
    category: 'paper',
    videoId: 'YAUPTaEe9pw'
  }
];

const initialVideos = [
  {
    title: 'Plastic Recycling Process',
    description: 'Learn how plastic bottles are sorted, shredded, washed, and pelletized into new products.',
    youtubeId: 'cNPEH0GOhRw',
    category: 'recycling',
    duration: '4:15'
  },
  {
    title: 'Home Composting Guide',
    description: 'Easy, odor-free steps to start kitchen compost in an apartment or backyard.',
    youtubeId: 'egyNJ7xPyoQ',
    category: 'composting',
    duration: '6:30'
  },
  {
    title: 'Proper E-Waste Disposal',
    description: 'Why electronic circuit boards and cords cannot go in regular trash and how they get recovered.',
    youtubeId: 'vufLW4xOsS4',
    category: 'e-waste',
    duration: '5:45'
  },
  {
    title: 'Upcycling Plastic Bottles: 5 Creative Ideas',
    description: 'Creative ways to reuse everyday single-use plastic bottles at home.',
    youtubeId: 'Xs2hAWuPmSg',
    category: 'upcycling',
    duration: '8:20'
  }
];

const initialReports = [
  {
    problemType: 'Overflowing Bin',
    location: 'Community Park Gate 2, Eco Avenue',
    urgency: 'high',
    description: 'Recycling bin is overflowing with plastics and cardboard blowing onto the walking track.',
    contactEmail: 'citizen@example.org',
    allowContact: true,
    status: 'In Review'
  },
  {
    problemType: 'Missing Item in Database',
    location: 'Downtown Center',
    urgency: 'low',
    description: 'Need guidelines on how to dispose of ceramic mugs and broken mirrors.',
    contactEmail: 'greenthinker@example.com',
    allowContact: false,
    status: 'Pending'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected! Clearing and seeding initial collections...');

    // Clear old data
    await WasteItem.deleteMany({});
    await DiyProject.deleteMany({});
    await Video.deleteMany({});
    await Report.deleteMany({});

    // Insert new data
    await WasteItem.insertMany(initialWasteItems);
    await DiyProject.insertMany(initialProjects);
    await Video.insertMany(initialVideos);
    await Report.insertMany(initialReports);

    console.log(' Seeding Complete!');
    console.log(`- ${initialWasteItems.length} Waste Items seeded`);
    console.log(`- ${initialProjects.length} DIY Projects seeded`);
    console.log(`- ${initialVideos.length} Educational Videos seeded`);
    console.log(`- ${initialReports.length} Sample Citizen Reports seeded`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
