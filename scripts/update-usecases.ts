import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { coreUseCases } from '../src/data/useCases.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileDest = path.resolve(__dirname, '../src/data/useCases.ts');

const updatedUseCases = coreUseCases.map((uc, index) => {
  // First 30 items are our core curated pages
  const isCore = index < 30;
  
  // Decide if it should be indexable
  // Core pages are indexable. A few other strong pages might be indexable.
  // For now, let's keep only the first 100 pages indexable.
  const isIndexable = index < 100;
  
  let category = 'general';
  if (uc.slug.includes('ecommerce') || uc.slug.includes('amazon') || uc.slug.includes('shopify') || uc.slug.includes('product') || uc.slug.includes('shoe') || uc.slug.includes('clothing')) {
    category = 'ecommerce-image-tools';
  } else if (uc.slug.includes('designer') || uc.slug.includes('logo') || uc.slug.includes('icon') || uc.slug.includes('png')) {
    category = 'designer-image-tools';
  } else if (uc.slug.includes('video') || uc.slug.includes('thumbnail')) {
    category = 'video-editor-image-tools';
  } else if (uc.slug.includes('vibe') || uc.slug.includes('developer') || uc.slug.includes('saas')) {
    category = 'vibe-coder-image-tools';
  } else if (uc.slug.includes('signature') || uc.slug.includes('document')) {
    category = 'signature-background-remover';
  }
  
  return {
    ...uc,
    priority: isCore ? 'high' : (isIndexable ? 'medium' : 'low'),
    indexable: isIndexable,
    category: category,
    searchIntent: 'tool',
    monetizationPotential: isCore ? 'high' : 'medium'
  };
});

const interfaceDef = `export interface UseCase {
  slug: string;
  audience: string;
  title: string;
  metaDescription: string;
  h1: string;
  subheading: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intro: string;
  benefits: string[];
  steps: string[];
  useCasesList: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
  ctaText: string;
  priority?: 'high' | 'medium' | 'low';
  indexable?: boolean;
  category?: string;
  searchIntent?: string;
  monetizationPotential?: 'high' | 'medium' | 'low';
  canonicalUrl?: string;
}

export const coreUseCases: UseCase[] = `;

const finalContent = interfaceDef + JSON.stringify(updatedUseCases, null, 2) + ';\n';
fs.writeFileSync(fileDest, finalContent);
console.log('Successfully updated useCases.ts with new fields and quality controls!');
