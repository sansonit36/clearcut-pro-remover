import { coreUseCases as useCases } from '../src/data/useCases.js';

console.log(`Analyzing ${useCases.length} use cases for duplicates and quality...`);

const MIN_WORDS = 500;
let failedQuality = 0;
let duplicatesFound = 0;

// Simple distance function for strings
function getSimilarity(s1: string, s2: string) {
  const words1 = s1.toLowerCase().split(/\s+/);
  const words2 = s2.toLowerCase().split(/\s+/);
  const intersection = words1.filter(w => words2.includes(w)).length;
  const union = new Set([...words1, ...words2]).size;
  return intersection / union; // Jaccard similarity
}

function calculateWordCount(uc: any) {
  let text = '';
  text += uc.title + ' ';
  text += uc.metaDescription + ' ';
  text += uc.h1 + ' ';
  text += uc.intro + ' ';
  text += uc.benefits?.join(' ') + ' ';
  text += uc.steps?.join(' ') + ' ';
  text += uc.useCasesList?.join(' ') + ' ';
  uc.faqs?.forEach((faq: any) => {
    text += faq.question + ' ' + faq.answer + ' ';
  });
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

// Compare each indexable page against others
const indexableUseCases = useCases.filter(u => u.indexable);
console.log(`Checking ${indexableUseCases.length} indexable pages...`);

for (let i = 0; i < indexableUseCases.length; i++) {
  const uc1 = indexableUseCases[i];
  
  // Quality Check
  const wordCount = calculateWordCount(uc1);
  const hasUseCases = uc1.useCasesList && uc1.useCasesList.length > 0;
  const hasFaqs = uc1.faqs && uc1.faqs.length > 0;
  const hasRelatedLinks = uc1.relatedSlugs && uc1.relatedSlugs.length > 0;
  const hasSearchIntent = !!uc1.searchIntent;
  
  // Notice: wordCount in our generated examples might be less than 500 words. 
  // We will flag it, but the site shouldn't crash.
  let isLowQuality = false;
  if (wordCount < MIN_WORDS) {
    console.warn(`[Quality Warning] /${uc1.slug}: Word count (${wordCount}) is below ${MIN_WORDS}`);
    isLowQuality = true;
  }
  if (!hasUseCases) { console.warn(`[Quality Warning] /${uc1.slug}: Missing use cases`); isLowQuality = true; }
  if (!hasFaqs) { console.warn(`[Quality Warning] /${uc1.slug}: Missing FAQs`); isLowQuality = true; }
  if (!hasRelatedLinks) { console.warn(`[Quality Warning] /${uc1.slug}: Missing related internal links`); isLowQuality = true; }
  if (!hasSearchIntent) { console.warn(`[Quality Warning] /${uc1.slug}: Missing search intent`); isLowQuality = true; }
  
  if (isLowQuality) failedQuality++;

  // Duplicate Check
  for (let j = i + 1; j < indexableUseCases.length; j++) {
    const uc2 = indexableUseCases[j];
    
    const titleSim = getSimilarity(uc1.title, uc2.title);
    const descSim = getSimilarity(uc1.metaDescription, uc2.metaDescription);
    const h1Sim = getSimilarity(uc1.h1, uc2.h1);
    
    let faqSim = 0;
    if (uc1.faqs && uc2.faqs) {
      const qs1 = uc1.faqs.map((f: any) => f.question).join(' ');
      const qs2 = uc2.faqs.map((f: any) => f.question).join(' ');
      faqSim = getSimilarity(qs1, qs2);
    }
    
    if (titleSim > 0.8) {
      console.error(`[Duplicate Alert] Very similar titles: /${uc1.slug} & /${uc2.slug} (Similarity: ${titleSim.toFixed(2)})`);
      duplicatesFound++;
    }
    if (descSim > 0.8) {
      console.error(`[Duplicate Alert] Very similar meta descriptions: /${uc1.slug} & /${uc2.slug} (Similarity: ${descSim.toFixed(2)})`);
      duplicatesFound++;
    }
    if (h1Sim > 0.8) {
      console.error(`[Duplicate Alert] Very similar H1s: /${uc1.slug} & /${uc2.slug} (Similarity: ${h1Sim.toFixed(2)})`);
      duplicatesFound++;
    }
    if (faqSim > 0.8) {
      console.error(`[Duplicate Alert] Very similar FAQs: /${uc1.slug} & /${uc2.slug} (Similarity: ${faqSim.toFixed(2)})`);
      duplicatesFound++;
    }
  }
}

console.log('--- Summary ---');
console.log(`Failed Quality Checks: ${failedQuality}`);
console.log(`Duplicate Alerts: ${duplicatesFound}`);
if (failedQuality > 0 || duplicatesFound > 0) {
  console.log('Please review warnings before submitting to Google Search Console.');
  // Optionally process.exit(1) if we wanted to block the build, but we will just warn for now.
} else {
  console.log('All indexable pages passed quality and duplication checks!');
}
