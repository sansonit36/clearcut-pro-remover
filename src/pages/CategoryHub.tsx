import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { coreUseCases as useCases } from '../data/useCases';
import SEO from '../components/SEO';
import { motion } from 'motion/react';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { trackEvent } from '../services/analyticsService';

export default function CategoryHub() {
  const { category } = useParams<{ category: string }>();
  
  // Clean up the category name for display
  const titleFormatted = category 
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Image Tools';
    
  // Filter use cases for this category that are indexable
  // If the category matches exactly our categorization, or if it loosely matches
  const relatedTools = useCases.filter(uc => 
    uc.indexable && 
    (uc.category === category || uc.slug.includes(category?.split('-')[0] || ''))
  );

  return (
    <div className="pt-32 min-h-screen bg-[#F5F5F7] pb-24">
      <SEO 
        title={`${titleFormatted} | ClearCut Background Remover`}
        description={`Explore the best ${titleFormatted.toLowerCase()} to remove backgrounds from your images instantly and for free.`}
        canonical={`https://removethebackground.fun/tools/${category}`}
      />
      <main className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{titleFormatted}</h1>
          <p className="text-xl text-[#86868B] max-w-2xl mx-auto">
            Choose the specific background removal tool optimized for your workflow.
          </p>
        </div>
        
        {relatedTools.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTools.map((tool, idx) => (
              <Link 
                to={`/${tool.slug}`} 
                key={idx}
                onClick={() => trackEvent('related_tool_clicked', { sourceCategory: category, targetTool: tool.slug })}
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl border border-[#D2D2D7] shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
                >
                  <div className="w-12 h-12 bg-[#F5F5F7] text-[#0066CC] rounded-full flex items-center justify-center mb-6">
                    <ImageIcon size={24} />
                  </div>
                  <h2 className="text-xl font-bold mb-3">{tool.h1 || tool.title}</h2>
                  <p className="text-[#86868B] flex-grow mb-6">{tool.intro}</p>
                  <div className="flex items-center text-[#0066CC] font-bold gap-2 mt-auto">
                    Open Tool <ArrowRight size={18} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#D2D2D7]">
            <h2 className="text-2xl font-bold mb-4">More tools coming soon.</h2>
            <p className="text-[#86868B] mb-8">We are actively expanding our specialized tools for this category.</p>
            <Link to="/tool" className="bg-[#1D1D1F] text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-colors">
              Go to Default Background Remover
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
