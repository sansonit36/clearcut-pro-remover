import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { coreUseCases as useCases } from '../src/data/useCases.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');

// Check if dist exists
if (!fs.existsSync(distDir)) {
  console.error("No dist directory found. Make sure to run 'vite build' first.");
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

useCases.forEach((useCase) => {
  const dir = path.join(distDir, useCase.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let html = template;

  // Replace Meta Tags
  html = html.replace(/<title>.*?<\/title>/, `<title>${useCase.title}</title>`);
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${useCase.metaDescription || useCase.description}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${useCase.title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${useCase.metaDescription || useCase.description}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="https://removethebackground.fun/${useCase.slug}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${useCase.title}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${useCase.metaDescription || useCase.description}" />`);
  
  // Add canonical or noindex tags
  if (useCase.indexable) {
    html = html.replace('</head>', `  <link rel="canonical" href="https://removethebackground.fun/${useCase.slug}" />\n</head>`);
  } else {
    html = html.replace('</head>', `  <meta name="robots" content="noindex" />\n  <link rel="canonical" href="https://removethebackground.fun/tool" />\n</head>`);
  }

  // Build static body content
  const staticContent = `
    <div style="display: none;" id="static-seo-content">
      <h1>${useCase.h1}</h1>
      <p>${useCase.intro}</p>
      <h2>Steps</h2>
      <ul>
        ${useCase.steps.map(step => `<li>${step}</li>`).join('')}
      </ul>
      <h2>Use Cases</h2>
      <ul>
        ${useCase.useCasesList.map(uc => `<li>${uc}</li>`).join('')}
      </ul>
      <h2>Frequently Asked Questions</h2>
      ${useCase.faqs.map(faq => `
        <h3>${faq.question}</h3>
        <p>${faq.answer}</p>
      `).join('')}
    </div>
  `;

  // Inject into body
  html = html.replace('</body>', `${staticContent}\n  </body>`);

  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`Pre-rendered /${useCase.slug}`);
});

// Pre-render category hubs
const categories = Array.from(new Set(useCases.filter(u => u.category).map(u => u.category)));

categories.forEach(category => {
  if (!category || category === 'general') return;
  const dir = path.join(distDir, 'tools', category);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const titleFormatted = category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>${titleFormatted} | ClearCut</title>`);
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="Explore the best ${titleFormatted.toLowerCase()} to remove backgrounds from your images instantly and for free." />`);
  html = html.replace('</head>', `  <link rel="canonical" href="https://removethebackground.fun/tools/${category}" />\n</head>`);

  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`Pre-rendered /tools/${category}`);
});

// Generate Sitemap dynamically
const indexableUseCases = useCases.filter(u => u.indexable);
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://removethebackground.fun/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://removethebackground.fun/tool</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${categories.filter(c => c && c !== 'general').map(c => `  <url>
    <loc>https://removethebackground.fun/tools/${c}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
${indexableUseCases.map(u => `  <url>
    <loc>https://removethebackground.fun/${u.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>${u.priority === 'high' ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
  <url>
    <loc>https://removethebackground.fun/privacy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://removethebackground.fun/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
console.log('Dynamic sitemap generated.');

console.log('Pre-rendering complete.');
