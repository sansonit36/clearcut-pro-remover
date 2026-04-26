import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Download, ImageIcon, Loader2, Wand2, ArrowLeftRight, Check, AlertCircle } from 'lucide-react';
import { removeBackground, preload, Config } from '@imgly/background-removal';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { trackRemoval, trackEvent } from '../services/analyticsService';
import { coreUseCases as useCases } from '../data/useCases';

interface ImageState {
  original: string | null;
  processed: string | null;
  isProcessing: boolean;
  error: string | null;
  name: string;
}

export default function Tool() {
  const [image, setImage] = useState<ImageState>({
    original: null,
    processed: null,
    isProcessing: false,
    error: null,
    name: '',
  });
  const [dragActive, setDragActive] = useState(false);
  const [compareValue, setCompareValue] = useState(50);
  const [isComparing, setIsComparing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modelLoadingProgress, setModelLoadingProgress] = useState<number>(0);
  const [isModelReady, setIsModelReady] = useState<boolean>(false);

  const { slug } = useParams<{ slug: string }>();
  const useCase = useCases.find(u => u.slug === slug);

  const imglyConfig: Config = {
    progress: (key, current, total) => {
      if (key.includes('fetch')) {
        setModelLoadingProgress(Math.round((current / total) * 100));
      }
    }
  };

  useEffect(() => {
    // Preload models as soon as the component mounts for a faster experience
    preload(imglyConfig).then(() => {
      setIsModelReady(true);
    }).catch(err => {
      console.warn("Preload failed or was aborted", err);
    });
  }, []);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setImage(prev => ({ ...prev, error: 'Please upload an image file.' }));
      return;
    }

    trackEvent('upload_started', { fileName: file.name, fileSize: file.size, useCase: useCase?.slug || 'default' });

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage({
        original: e.target?.result as string,
        processed: null,
        isProcessing: true,
        error: null,
        name: file.name.split('.')[0],
      });
      processImage(file);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (file: File) => {
    const startTime = Date.now();
    try {
      const blob = await removeBackground(file, {
        ...imglyConfig,
        progress: (status, progress) => {
          console.log(`Status: ${status}, Progress: ${Math.round(progress * 100)}%`);
        },
      });

      const url = URL.createObjectURL(blob);
      setImage(prev => ({
        ...prev,
        processed: url,
        isProcessing: false,
      }));

      // Track removal event
      trackRemoval(file.name, file.size, Date.now() - startTime);
    } catch (err) {
      console.error('Processing error:', err);
      setImage(prev => ({
        ...prev,
        isProcessing: false,
        error: 'Failed to process image. Our local algorithms might be struggling with this format.',
      }));
    }
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const reset = () => setImage({ original: null, processed: null, isProcessing: false, error: null, name: '' });

  const downloadImage = () => {
    if (!image.processed) return;
    trackEvent('image_downloaded', { fileName: image.name, useCase: useCase?.slug || 'default' });
    const link = document.createElement('a');
    link.href = image.processed;
    link.download = `${image.name}_clearcut.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#F5F5F7] pb-24">
      <SEO 
        title={useCase?.title || "HD Background Removal Tool | 100% Free & Local Processing"}
        description={useCase?.metaDescription || useCase?.description || "Drop your image and get a perfect transparent PNG in seconds. Our local edge processing ensures maximum privacy and high-res results without any cloud AI costs."}
        keywords={useCase?.primaryKeyword ? `${useCase.primaryKeyword}, ${useCase.secondaryKeywords?.join(', ')}` : "hd png maker, transparent background tool, professional image cutout, browser based background removal"}
        canonical={useCase?.slug ? `https://www.removethebackground.fun/${useCase.slug}` : undefined}
        noindex={useCase ? !useCase.indexable : false}
      />
      <main className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          {!image.original ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
               <div className="text-center space-y-4">
                 <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{useCase?.h1 || "Remove Background"}</h1>
                 <p className="text-[#86868B] text-lg font-medium max-w-2xl mx-auto">{useCase?.intro || "Local processing. Private. Secure."}</p>
               </div>

              <div
                onDragEnter={onDrag}
                onDragOver={onDrag}
                onDragLeave={onDrag}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative overflow-hidden cursor-pointer
                  border-2 border-dashed rounded-[40px] p-12 md:p-24
                  flex flex-col items-center justify-center gap-8
                  transition-all duration-500 ease-out
                  ${dragActive 
                    ? 'border-[#0066CC] bg-[#0066CC]/5 scale-[0.99]' 
                    : 'border-[#D2D2D7] bg-white hover:border-[#86868B] hover:shadow-2xl'
                  }
                `}
              >
                <div className={`
                  w-20 h-20 rounded-3xl flex items-center justify-center
                  transition-transform duration-500
                  ${dragActive ? 'bg-[#0066CC] text-white' : 'bg-[#F5F5F7] text-[#1D1D1F]'}
                `}>
                  <Upload size={40} />
                </div>
                
                <div className="text-center space-y-3">
                  <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                    Drag and drop your image
                  </h2>
                  <p className="text-lg text-[#86868B] font-medium">
                    Try it with objects, people, or products.
                  </p>
                </div>

                <div className="px-8 py-3 bg-[#0066CC] text-white rounded-full font-bold hover:bg-[#004080] shadow-lg shadow-[#0066CC]/20 transition-all">
                  Open File Explorer
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
              />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid lg:grid-cols-[1fr_360px] gap-8"
            >
              <div className="bg-white rounded-[40px] p-6 md:p-10 shadow-sm border border-[#D2D2D7] overflow-hidden min-h-[500px] flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 rounded-full bg-[#F5F5F7] text-xs font-mono font-bold text-[#86868B]">
                      {image.isProcessing ? 'PROCESSING' : 'STAGED'}
                    </span>
                    <h3 className="text-xl font-bold">{image.name}</h3>
                  </div>
                  <button onClick={reset} className="p-3 hover:bg-[#F5F5F7] rounded-full transition-colors"><X size={24} /></button>
                </div>

                <div className="relative flex-grow rounded-3xl overflow-hidden bg-[#F5F5F7]">
                  <div className="absolute inset-0 z-0" style={{
                    backgroundImage: 'linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }} />
                  
                  <AnimatePresence>
                    {image.isProcessing && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center gap-6"
                      >
                        <div className="relative">
                          <Loader2 size={64} className="animate-spin text-[#0066CC]" />
                          <Wand2 size={24} className="absolute inset-0 m-auto" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="font-bold text-2xl tracking-tight">Deconstructing Layers</p>
                          <p className="text-[#86868B] font-medium">Extracting alpha channel locally...</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative h-full w-full flex items-center justify-center p-8 select-none">
                    {isComparing && image.original && !image.isProcessing && (
                      <img
                        src={image.original}
                        alt="Original"
                        className="absolute max-w-full max-h-[600px] object-contain opacity-50 transition-opacity"
                        style={{ clipPath: `inset(0 ${100 - compareValue}% 0 0)` }}
                      />
                    )}

                    <div className="relative">
                      <img
                        src={image.processed || image.original || ''}
                        alt="Preview"
                        className={`max-w-full max-h-[600px] object-contain transition-all duration-700 ${image.isProcessing ? 'blur-md' : 'shadow-2xl'}`}
                        style={isComparing && image.processed ? { clipPath: `inset(0 0 0 ${compareValue}%)` } : {}}
                      />
                      
                      {isComparing && image.processed && !image.isProcessing && (
                        <div className="absolute inset-0 z-30 flex items-center" style={{ left: `${compareValue}%` }}>
                          <div className="h-full w-px bg-white/50 shadow-xl relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border border-[#D2D2D7] cursor-ew-resize">
                              <ArrowLeftRight size={18} className="text-[#0066CC]" />
                            </div>
                          </div>
                          <input 
                            type="range" min="0" max="100" value={compareValue} 
                            onChange={(e) => setCompareValue(parseInt(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize pointer-events-auto"
                            style={{ margin: 0, width: '200%', left: '-50%' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-[40px] p-8 shadow-sm border border-[#D2D2D7] space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#86868B]">Control Panel</h4>
                    
                    <button
                      disabled={image.isProcessing || !image.processed}
                      onClick={() => setIsComparing(!isComparing)}
                      className={`
                        w-full flex items-center justify-center gap-3 py-5 rounded-2xl border-2 font-bold transition-all text-sm
                        ${isComparing 
                          ? 'bg-[#0066CC] text-white border-[#0066CC]' 
                          : 'bg-white text-[#1D1D1F] border-[#D2D2D7] hover:border-[#86868B]'
                        }
                        ${image.isProcessing && 'opacity-50 cursor-not-allowed'}
                      `}
                    >
                      <ArrowLeftRight size={20} />
                      {isComparing ? 'Exit Inspector' : 'Inspect Edges'}
                    </button>

                    <button
                      disabled={image.isProcessing || !image.processed}
                      onClick={downloadImage}
                      className={`
                        w-full group flex items-center justify-center gap-3 py-5 rounded-2xl font-bold transition-all text-sm
                        ${image.isProcessing || !image.processed
                          ? 'bg-[#F5F5F7] text-[#D2D2D7] cursor-not-allowed'
                          : 'bg-[#1D1D1F] text-white hover:bg-black shadow-xl'
                        }
                      `}
                    >
                      <Download size={20} />
                      Download High-Res
                    </button>
                  </div>

                  <div className="pt-8 border-t border-[#F5F5F7] space-y-4">
                    <div className="flex items-center gap-3">
                      <Check size={18} className="text-[#34C759]" />
                      <h4 className="text-sm font-bold text-[#1D1D1F]">On-Device Processing</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-[#86868B] font-medium">
                      Extraction is handled by your browser's silicon. No cloud AI, no tracking, just local software.
                    </p>
                  </div>
                </div>

                {image.error && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    className="bg-[#FFEFEF] border border-[#FFD2D2] p-5 rounded-3xl flex gap-4 text-[#E33B3B]"
                  >
                    <AlertCircle size={24} className="flex-shrink-0" />
                    <p className="text-sm font-bold">{image.error}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {useCase && !image.original && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mt-24 max-w-4xl mx-auto space-y-16"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">How it Works</h2>
                <ul className="space-y-4">
                  {useCase.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0066CC]/10 text-[#0066CC] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <p className="text-[#1D1D1F] mt-1">{step}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Popular Use Cases</h2>
                <ul className="space-y-4">
                  {useCase.useCasesList.map((uc, idx) => (
                    <li key={idx} className="flex gap-3 items-center">
                      <Check size={20} className="text-[#34C759]" />
                      <span className="text-[#1D1D1F]">{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8 pt-8 border-t border-[#D2D2D7]">
              <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
              <div className="grid gap-6">
                {useCase.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-[#D2D2D7]">
                    <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                    <p className="text-[#86868B] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
