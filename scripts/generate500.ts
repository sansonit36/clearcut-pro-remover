import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileDest = path.resolve(__dirname, '../src/data/useCases.ts');

const subjects = [
  "shoes", "watches", "artwork", "coins", "stamps", "receipts", "action figures", "flowers", "trees", "screenshots", "memes", "documents",
  "bottles", "perfume", "cosmetics", "makeup", "sunglasses", "glasses", "hats", "caps", "helmets", "bicycles", "motorcycles", "scooters",
  "drones", "cameras", "laptops", "smartphones", "tablets", "monitors", "televisions", "headphones", "earbuds", "speakers", "microphones",
  "guitars", "keyboards", "pianos", "drums", "violins", "paintings", "sculptures", "pottery", "ceramics", "glassware", "mugs", "cups",
  "plates", "cutlery", "knives", "forks", "spoons", "pots", "pans", "appliances", "fridges", "ovens", "microwaves", "blenders", "toasters",
  "coffee makers", "vacuum cleaners", "washing machines", "dryers", "air conditioners", "heaters", "fans", "lamps", "chandeliers",
  "rugs", "carpets", "curtains", "blinds", "pillows", "cushions", "blankets", "towels", "bedsheets", "mattresses", "beds", "dressers",
  "wardrobes", "cabinets", "shelves", "desks", "office chairs", "gaming chairs", "bean bags", "couches", "armchairs", "stools",
  "dining tables", "coffee tables", "end tables", "nightstands", "mirrors", "frames", "clocks", "bracelets", "earrings",
  "rings", "necklaces", "pendants", "brooches", "pins", "cufflinks", "tie clips", "belts", "wallets", "purses", "handbags", "backpacks",
  "briefcases", "suitcases", "luggage", "duffel bags", "tote bags", "messenger bags", "crossbody bags", "clutches", "umbrellas",
  "scarves", "gloves", "mittens", "socks", "stockings", "tights", "leggings", "pants", "jeans", "shorts", "skirts", "dresses",
  "gowns", "suits", "tuxedos", "blazers", "jackets", "coats", "sweaters", "cardigans", "hoodies", "sweatshirts", "t-shirts", "shirts",
  "blouses", "tank tops", "crop tops", "swimwear", "bikinis", "trunks", "wetsuits", "rash guards", "life jackets", "surfboards",
  "skateboards", "snowboards", "skis", "poles", "boots", "sneakers", "sandals", "slippers", "loafers", "oxfords", "heels", "flats",
  "wedges", "booties", "waders", "cleats", "spikes", "running shoes", "basketball shoes", "tennis shoes", "golf shoes",
  "soccer shoes", "football shoes", "baseball shoes", "bowling shoes", "dance shoes", "ballet shoes", "tap shoes", "jazz shoes",
  "pointe shoes", "character shoes", "flamenco shoes", "salsa shoes", "tango shoes", "ballroom shoes", "latin shoes", "swing shoes",
  "books", "magazines", "newspapers", "comic books", "manga", "graphic novels", "textbooks", "encyclopedias", "dictionaries", "atlases",
  "maps", "posters", "flyers", "brochures", "catalogs", "menus", "programs", "tickets", "invitations", "greeting cards", "postcards",
  "business cards", "stationery", "envelopes", "letterheads", "notepads", "notebooks", "journals", "diaries", "planners", "calendars",
  "stickers", "labels", "decals", "tattoos", "seals", "wax seals", "rubber stamps", "ink pads", "pens", "pencils", "markers",
  "crayons", "chalk", "pastels", "charcoal", "paintbrushes", "palettes", "easels", "canvases", "sketchbooks", "drawing pads", "tracing paper",
  "watercolors", "acrylics", "oils", "gouache", "tempera", "inks", "dyes", "pigments", "glitters", "sequins", "beads", "buttons",
  "thread", "yarn", "fabric", "felt", "leather", "vinyl", "plastic", "metal", "wood", "stone", "glass", "paper", "cardboard", "cork",
  "rubber", "foam", "sponge", "cotton", "wool", "silk", "linen", "velvet", "lace", "denim", "canvas", "burlap", "twine", "rope", "string",
  "guitars", "violins", "pianos", "keyboards", "drums", "cymbals", "flutes", "clarinets", "saxophones", "trumpets", "trombones", "tubas",
  "harps", "cellos", "basses", "banjos", "mandolins", "ukuleles", "accordions", "harmonicas", "synthesizers", "amplifiers", "pedals"
];

const generatedUseCases = [];

subjects.forEach(subject => {
  generatedUseCases.push({
    slug: `remove-background-from-${subject.replace(/ /g, '-')}`,
    title: `Remove Background from ${subject.charAt(0).toUpperCase() + subject.slice(1)} | Free AI Tool`,
    description: `Easily remove backgrounds from ${subject} images online for free. Get transparent cutouts instantly with local AI.`,
    h1: `Remove Background from ${subject.charAt(0).toUpperCase() + subject.slice(1)}`,
    intro: `Need a clean transparent cutout of ${subject}? Our AI processes your image locally and removes the background in seconds.`,
    steps: [`Upload your ${subject} photo`, 'AI strips the background', 'Download your transparent PNG'],
    useCasesList: ['eCommerce listings', 'Digital catalogs', 'Social media posts', 'Graphic design projects'],
    faqs: [{ question: `Does it work well for ${subject}?`, answer: `Yes, our model is trained to recognize the edges of ${subject} perfectly.` }]
  });

  if (generatedUseCases.length >= 480) return;
});

if (generatedUseCases.length < 480) {
  subjects.forEach(subject => {
    if (generatedUseCases.length >= 480) return;
    generatedUseCases.push({
      slug: `white-background-maker-for-${subject.replace(/ /g, '-')}`,
      title: `White Background for ${subject.charAt(0).toUpperCase() + subject.slice(1)} | Free Setup`,
      description: `Create a pure white background for your ${subject} photos. Ideal for online stores and professional catalogs.`,
      h1: `White Background Maker for ${subject.charAt(0).toUpperCase() + subject.slice(1)}`,
      intro: `Prepare your ${subject} images for Shopify or Amazon by giving them a crisp white background instantly.`,
      steps: [`Upload your ${subject} picture`, 'Background is removed', 'Place on white canvas'],
      useCasesList: ['Online storefronts', 'Product showcases', 'Inventory systems'],
      faqs: [{ question: `Is this good for selling ${subject}?`, answer: 'Absolutely. A white background increases conversions and meets marketplace requirements.' }]
    });
  });
}

let currentContent = fs.readFileSync(fileDest, 'utf-8');
const insertPos = currentContent.lastIndexOf('];');

if (insertPos !== -1) {
  const newContentArrayString = generatedUseCases.map(uc => JSON.stringify(uc, null, 2)).join(',\n  ');
  const finalContent = currentContent.slice(0, insertPos) + ',\n  ' + newContentArrayString + '\n];\n';
  fs.writeFileSync(fileDest, finalContent);
  console.log(`Successfully generated and injected ${generatedUseCases.length} use cases!`);
} else {
  console.error("Could not find the end of the array in useCases.ts");
}
