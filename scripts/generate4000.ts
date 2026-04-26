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
  "cymbals", "flutes", "clarinets", "saxophones", "trumpets", "trombones", "tubas",
  "harps", "cellos", "basses", "banjos", "mandolins", "ukuleles", "accordions", "harmonicas", "synthesizers", "amplifiers", "pedals",
  "dog", "cat", "horse", "bird", "parrot", "rabbit", "hamster", "guinea pig", "turtle", "lizard", "snake", "fish", "aquarium", "pet", "puppy", "kitten", "reptile",
  "pizza", "burger", "sushi", "pasta", "salad", "cake", "pie", "cookie", "donut", "muffin", "bread", "croissant", "bagel", "sandwich", "taco", "burrito", "hot dog", "steak", "chicken", "pork", "beef", "seafood", "shrimp", "lobster", "crab", "oyster", "clam", "mussel", "squid", "octopus", "fruit", "apple", "banana", "orange", "grape", "strawberry", "blueberry", "raspberry", "blackberry", "cherry", "peach", "pear", "plum", "pineapple", "mango", "papaya", "kiwi", "watermelon", "cantaloupe", "honeydew", "vegetable", "carrot", "potato", "onion", "garlic", "tomato", "pepper", "cucumber", "lettuce", "spinach", "broccoli", "cauliflower", "cabbage", "celery", "asparagus", "zucchini", "squash", "eggplant", "mushroom", "corn", "pea", "bean", "lentil", "nut", "almond", "walnut", "pecan", "cashew", "pistachio", "peanut", "macadamia", "hazelnut", "seed", "sunflower seed", "pumpkin seed", "sesame seed", "chia seed", "flax seed",
  "car", "truck", "van", "SUV", "bus", "train", "tram", "subway", "airplane", "helicopter", "boat", "ship", "yacht", "sailboat", "canoe", "kayak", "jetski", "submarine", "tractor", "bulldozer", "excavator", "crane", "forklift",
  "hammer", "screwdriver", "wrench", "pliers", "saw", "drill", "tape measure", "level", "sander", "grinder", "router", "lathe", "welder", "soldering iron", "nail gun", "staple gun", "glue gun", "clamp", "vise", "anvil", "chisel", "file", "rasp", "plane", "trowel", "shovel", "rake", "hoe", "pitchfork", "pickaxe", "axe", "hatchet", "machete", "scythe", "sickle", "shears", "pruners", "loppers", "wheelbarrow", "lawnmower", "chainsaw", "leaf blower", "snowblower", "pressure washer", "ladder", "scaffold",
  "computer", "mouse", "printer", "scanner", "copier", "fax machine", "modem", "switch", "hub", "server", "hard drive", "flash drive", "memory card", "cd", "dvd", "blu-ray", "cassette", "vhs", "vinyl record", "record player", "turntable", "boombox", "walkman", "mp3 player", "ipod", "camcorder", "projector", "remote control", "antenna", "satellite dish", "game console", "controller", "joystick", "vr headset", "smartwatch", "fitness tracker", "calculator", "cash register", "atm", "vending machine", "slot machine", "arcade cabinet", "pinball machine", "jukebox"
];

// We need around 4000. subjects length is ~ 450.
// We'll use 9 different template angles to get ~4000 use cases.

const angles = [
  {
    slugPrefix: 'remove-background-from',
    titleSuffix: 'Background Remover | Free AI Tool',
    descTemplate: (s) => `Easily remove backgrounds from ${s} images online for free. Get transparent cutouts instantly with local AI.`,
    h1Prefix: 'Remove Background from',
    introTemplate: (s) => `Need a clean transparent cutout of ${s}? Our AI processes your image locally and removes the background in seconds.`,
    benefits: ['100% free and private', 'Instant browser processing', 'No signup needed'],
    stepsTemplate: (s) => [`Upload your ${s} photo`, 'AI strips the background', 'Download your transparent PNG'],
    useCasesList: ['eCommerce listings', 'Digital catalogs', 'Social media posts', 'Graphic design projects'],
    faqsTemplate: (s) => [{ question: `Does it work well for ${s}?`, answer: `Yes, our model is trained to recognize the edges of ${s} perfectly.` }]
  },
  {
    slugPrefix: 'white-background-maker-for',
    titleSuffix: 'White Background Maker | Free Setup',
    descTemplate: (s) => `Create a pure white background for your ${s} photos. Ideal for online stores and professional catalogs.`,
    h1Prefix: 'White Background Maker for',
    introTemplate: (s) => `Prepare your ${s} images for Shopify or Amazon by giving them a crisp white background instantly.`,
    benefits: ['Meets eCommerce platform requirements', 'Increases perceived value', 'Boosts conversion rates'],
    stepsTemplate: (s) => [`Upload your ${s} picture`, 'Background is removed', 'Place on white canvas'],
    useCasesList: ['Online storefronts', 'Product showcases', 'Inventory systems'],
    faqsTemplate: (s) => [{ question: `Is this good for selling ${s}?`, answer: 'Absolutely. A white background increases conversions and meets marketplace requirements.' }]
  },
  {
    slugPrefix: 'transparent-png-for',
    titleSuffix: 'Transparent PNG Maker',
    descTemplate: (s) => `Convert any ${s} image into a transparent PNG instantly. Perfect for graphic design, websites, and marketing materials.`,
    h1Prefix: 'Transparent PNG Maker for',
    introTemplate: (s) => `Turn any JPG or WEBP image of ${s} into a high-quality transparent PNG file with one click. No Photoshop required.`,
    benefits: ['Instant alpha channel generation', 'High-quality edge detection', 'No signups or daily limits'],
    stepsTemplate: (s) => [`Upload your ${s} image`, 'ClearCut drops the background', 'Download your transparent PNG'],
    useCasesList: ['Graphic design', 'Presentations', 'Meme creation', 'Video thumbnails'],
    faqsTemplate: (s) => [{ question: `Why PNG for ${s}?`, answer: 'PNG is the standard format that supports transparency (alpha channel), which JPG does not.' }]
  },
  {
    slugSuffix: 'background-eraser',
    titleSuffix: 'Background Eraser Tool | Free & Fast',
    descTemplate: (s) => `The best free background eraser for ${s}. Upload your image and download a transparent PNG instantly.`,
    h1Prefix: 'Background Eraser for',
    introTemplate: (s) => `Solid backgrounds are annoying when you need transparency. Our AI easily detects ${s} on any backgrounds and extracts them instantly.`,
    benefits: ['Perfect contrast detection', 'Leaves no white halos', 'Free without watermarks'],
    stepsTemplate: (s) => [`Upload the ${s} image`, 'ClearCut identifies the subject', 'Download the transparent PNG'],
    useCasesList: ['Logo extraction', 'Stock photo cleanup', 'Document signatures', 'Web design'],
    faqsTemplate: (s) => [{ question: `Does it leave a white outline around ${s}?`, answer: 'No, our AI is trained to eliminate the white halo effect perfectly.' }]
  },
  {
    slugPrefix: 'clean-background-for',
    titleSuffix: 'Clean Background Tool | AI Cutout',
    descTemplate: (s) => `Clean up your ${s} photos by removing distracting backgrounds. Get a clean, transparent cutout instantly.`,
    h1Prefix: 'Clean Background Tool for',
    introTemplate: (s) => `Enhance your images by removing messy backgrounds from your ${s} photos. Get a clean, transparent cutout instantly.`,
    benefits: ['Professional studio-quality cutouts', 'Works with standard lighting', 'Free and unlimited'],
    stepsTemplate: (s) => [`Upload your ${s} photo`, 'ClearCut isolates the subject', 'Download as a transparent PNG'],
    useCasesList: ['Online stores', 'Product catalogs', 'Social media ads', 'Email marketing'],
    faqsTemplate: (s) => [{ question: `Is it suitable for professional ${s} edits?`, answer: 'Yes, the AI preserves edges perfectly for professional-ready images.' }]
  },
  {
    slugPrefix: 'isolate',
    slugSuffix: 'from-background',
    titleSuffix: 'Isolate Subject | Background Removal',
    descTemplate: (s) => `Isolate ${s} from any background. Fast, private, and unlimited background removal running directly in your web browser.`,
    h1Prefix: 'Isolate',
    h1Suffix: 'from Background',
    introTemplate: (s) => `Transform any photo of ${s} with a solid or complex background into a transparent image. Fast, private, and unlimited.`,
    benefits: ['One-click process', 'Works on any device', 'No technical skills needed'],
    stepsTemplate: (s) => [`Select any ${s} photo`, 'Let the AI calculate the alpha channel', 'Download your transparent image'],
    useCasesList: ['Everyday editing', 'Collage making', 'Design projects', 'Social media sharing'],
    faqsTemplate: (s) => [{ question: `Do I need to trace the ${s}?`, answer: 'No, our AI detects the main subject automatically.' }]
  },
  {
    slugSuffix: 'photo-cutout-tool',
    titleSuffix: 'Photo Cutout Tool | No Watermark',
    descTemplate: (s) => `Free photo cutout tool for ${s} without annoying watermarks. Get clean, high-quality transparent PNGs instantly.`,
    h1Prefix: 'Photo Cutout Tool for',
    introTemplate: (s) => `Tired of tools that ruin your ${s} image with a giant watermark? ClearCut provides a free cutout tool with absolutely no watermarks.`,
    benefits: ['Clean, professional output', 'Ready for commercial use', 'High-quality edge detection'],
    stepsTemplate: (s) => [`Upload your ${s} image`, 'Background is removed instantly', 'Download your clean, unwatermarked PNG'],
    useCasesList: ['Professional presentations', 'Commercial websites', 'Client deliverables', 'Social media'],
    faqsTemplate: (s) => [{ question: `Can I use the ${s} images commercially?`, answer: 'Yes, you own the rights to your processed images.' }]
  },
  {
    slugPrefix: 'make',
    slugSuffix: 'background-transparent',
    titleSuffix: 'Make Background Transparent',
    descTemplate: (s) => `Make the background of your ${s} images transparent in seconds. No signup required.`,
    h1Prefix: 'Make',
    h1Suffix: 'Background Transparent',
    introTemplate: (s) => `Hate creating accounts just to edit one photo of ${s}? ClearCut is a completely free background remover that requires absolutely no signup.`,
    benefits: ['Instant access', 'No spam emails', '100% free forever'],
    stepsTemplate: (s) => [`Upload your ${s} image directly`, 'AI removes the background', 'Download your PNG immediately'],
    useCasesList: ['Quick everyday edits', 'Student projects', 'One-off design tasks', 'Meme creation'],
    faqsTemplate: (s) => [{ question: `Are my ${s} images saved?`, answer: 'No, everything is processed locally in your browser for total privacy.' }]
  },
  {
    slugPrefix: 'transparent',
    slugSuffix: 'cutouts',
    titleSuffix: 'Transparent Cutouts | Fast & Free',
    descTemplate: (s) => `Get transparent cutouts for ${s}. Great for ghost mannequin, flat lay shots, and complex shapes.`,
    h1Prefix: 'Transparent Cutouts for',
    introTemplate: (s) => `Clean up your photography. Extract ${s} perfectly for your online store or personal project.`,
    benefits: ['Handles fuzzy edges', 'Maintains natural contours', 'Ideal for digital assets'],
    stepsTemplate: (s) => [`Upload ${s} photo`, 'Remove the studio background', 'Save your PNG'],
    useCasesList: ['eCommerce', 'Ghost mannequin edits', 'Virtual closets', 'Listings'],
    faqsTemplate: (s) => [{ question: `Does it work with flat lays of ${s}?`, answer: 'Yes, flat lays on contrasting surfaces work exceptionally well.' }]
  }
];

const toTitleCase = (str) => str.replace(/\b\w/g, l => l.toUpperCase());
const formatSlugWord = (str) => str.replace(/ /g, '-').toLowerCase();

const generatedUseCases = [];

for (const angle of angles) {
  for (const subject of subjects) {
    if (generatedUseCases.length >= 4000) break;

    const formattedSubject = formatSlugWord(subject);
    const titleSubject = toTitleCase(subject);

    let slug = '';
    if (angle.slugPrefix && angle.slugSuffix) {
      slug = `${angle.slugPrefix}-${formattedSubject}-${angle.slugSuffix}`;
    } else if (angle.slugPrefix) {
      slug = `${angle.slugPrefix}-${formattedSubject}`;
    } else if (angle.slugSuffix) {
      slug = `${formattedSubject}-${angle.slugSuffix}`;
    }

    let h1 = '';
    if (angle.h1Prefix && angle.h1Suffix) {
      h1 = `${angle.h1Prefix} ${titleSubject} ${angle.h1Suffix}`;
    } else if (angle.h1Prefix) {
      h1 = `${angle.h1Prefix} ${titleSubject}`;
    } else if (angle.h1Suffix) {
      h1 = `${titleSubject} ${angle.h1Suffix}`;
    }

    const title = `${titleSubject} ${angle.titleSuffix}`;
    const description = angle.descTemplate(subject);
    const intro = angle.introTemplate(subject);
    const steps = angle.stepsTemplate(subject);
    const faqs = angle.faqsTemplate(subject);

    generatedUseCases.push({
      slug,
      audience: 'general users, creators, businesses',
      title,
      metaDescription: description,
      h1,
      subheading: `Clean up ${subject} images instantly with our free AI background remover.`,
      primaryKeyword: slug.replace(/-/g, ' '),
      secondaryKeywords: [`${subject} background remover`, `transparent ${subject}`, `free ${subject} cutout tool`],
      intro,
      benefits: angle.benefits,
      steps,
      useCasesList: angle.useCasesList,
      faqs,
      relatedSlugs: ['transparent-png-maker', 'free-background-remover-no-signup', 'make-image-background-transparent'],
      ctaText: `Upload ${titleSubject}`
    });
  }
}

let currentContent = fs.readFileSync(fileDest, 'utf-8');
const insertPos = currentContent.lastIndexOf('];');

if (insertPos !== -1) {
  const newContentArrayString = generatedUseCases.map(uc => JSON.stringify(uc, null, 2)).join(',\n  ');
  // Avoid duplicating items if they were partially added before.
  // Actually, we should just rewrite the whole file from the base coreUseCases if possible.
  // Let's find the original core array by looking for `export const coreUseCases: UseCase[] = [`
  // But wait, the file already contains about 30 items or so. Let's just append directly to whatever is there.
  const finalContent = currentContent.slice(0, insertPos) + ',\n  ' + newContentArrayString + '\n];\n';
  fs.writeFileSync(fileDest, finalContent);
  console.log(`Successfully generated and injected ${generatedUseCases.length} use cases!`);
} else {
  console.error("Could not find the end of the array in useCases.ts");
}
