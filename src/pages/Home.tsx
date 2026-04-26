import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Zap, Image as ImageIcon, CheckCircle, ArrowRight, Wand2, Search, Layers, Highlighter } from 'lucide-react';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <div className="pt-24 min-h-screen bg-white overflow-hidden">
      <SEO 
        title="Free Online Background Remover | Remove Fake PNG Checkerboards"
        description="Extract real transparent PNGs instantly. ClearCut removes backgrounds with high-fidelity local software. No AI cloud, no data storage, 100% free forever."
        keywords="remove background from image, fake png remover, transparent background maker, free hd background remover, remove ai background"
      />
      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-12 md:py-24 text-center space-y-8 relative">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="space-y-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-[#0066CC]/10 text-[#0066CC] text-sm font-bold tracking-wide uppercase">
            100% Free & Private
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D1D1F] leading-[1.1]">
            Remove Backgrounds <br />
            <span className="text-[#0066CC]">Instantly</span> & Without AI Cloud.
          </h1>
          <p className="text-xl md:text-2xl text-[#86868B] max-w-3xl mx-auto font-medium">
            Professional-quality background removal that runs entirely in your browser. 
            No logins, no server uploads, no data harvesting. Just clean images.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Link
            to="/tool"
            className="group px-8 py-4 bg-[#0066CC] text-white rounded-full text-lg font-bold hover:bg-[#004080] transition-all flex items-center gap-2 shadow-xl shadow-[#0066CC]/25"
          >
            Go to Remover
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="px-8 py-4 bg-white border border-[#D2D2D7] text-[#1D1D1F] rounded-full text-lg font-bold hover:bg-[#F5F5F7] transition-all"
          >
            Learn How it Works
          </a>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0066CC]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#34C759]/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* SEO Content Section / Features */}
      <section id="features" className="bg-[#F5F5F7] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The smarter way to edit.</h2>
            <p className="text-lg text-[#86868B] font-medium">
              We've re-engineered background removal from the ground up to be faster, private, and 100% free with no catches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="text-[#0066CC]" />}
              title="100% Privacy"
              description="Your images never leave your device. We use browser WebAssembly to process everything locally."
            />
            <FeatureCard 
              icon={<Zap className="text-[#AF52DE]" />}
              title="High Quality"
              description="Sophisticated edge-detection algorithms ensure smooth transitions, even with hair and fine details."
            />
            <FeatureCard 
              icon={<ImageIcon className="text-[#FF3B30]" />}
              title="Crystal Clear Output"
              description="Export in PNG with full transparency support at the original resolution of your image."
            />
          </div>
        </div>
      </section>

      {/* Detailed SEO Text Section */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto space-y-12">
        <div className="prose prose-lg prose-slate max-w-none">
          <h2 className="text-3xl font-bold mb-6">Why ClearCut is better than AI-based background removers.</h2>
          <p className="leading-relaxed text-[#1D1D1F]">
            Most online background removers send your personal photos to distant servers where AI models process them. 
            This poses significant privacy risks and often results in "hallucinated" edges or compressed low-quality previews unless you pay.
          </p>
          <p className="leading-relaxed text-[#1D1D1F]">
            <strong>ClearCut works differently.</strong> We utilize "Edge Computing" and advanced Computer Vision algorithms that run directly inside your 
            web browser's engine. This means:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#1D1D1F]">
            <li><strong>No Data Leakage:</strong> Your photos are processed in the sandboxed environment of your browser.</li>
            <li><strong>Zero Latency:</strong> No waiting for uploads to complete. Processing starts as soon as you drop the file.</li>
            <li><strong>Always Free:</strong> Since we don't have server costs for GPUs, we can keep the tool free forever for everyone.</li>
            <li><strong>High Resolution:</strong> Get full-sized outputs without watermarks or hidden fees.</li>
          </ul>
        </div>
        
        <div className="p-8 bg-[#0066CC] rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Ready to try it out?</h3>
            <p className="text-[#D2D2D7] font-medium">Remove your first background in seconds.</p>
          </div>
          <Link to="/tool" className="px-10 py-4 bg-white text-[#0066CC] rounded-full font-bold hover:scale-105 transition-transform">
            Start Processing for Free
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-10 rounded-[32px] border border-[#D2D2D7]/50 space-y-6 hover:shadow-2xl transition-all hover:-translate-y-2">
      <div className="w-16 h-16 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-primary-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-[#86868B] leading-relaxed font-medium">{description}</p>
    </div>
  );
}
