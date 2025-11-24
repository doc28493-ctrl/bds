import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ZoomIn, Map, X, Maximize } from 'lucide-react';

const MasterPlan: React.FC = () => {
  const { content } = useContent();
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeImage, setActiveImage] = useState<'main' | 'sub'>('main');

  return (
    <>
      <section id="masterplan" className="py-24 bg-[#F9F8F6] relative scroll-mt-28">
         <div className="container mx-auto px-6">
             
             {/* Heading */}
             <div className="text-center mb-12">
                  <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-fade-up">
                      Quy hoạch tổng thể
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6 animate-fade-up uppercase">
                      {content.masterplan.heading}
                  </h2>
                  <p className="text-gray-600 font-light max-w-3xl mx-auto text-lg animate-fade-up">
                      {content.masterplan.desc}
                  </p>
             </div>

             {/* Map Display Card */}
             <div className="relative bg-white p-4 rounded-xl shadow-xl border border-gray-200">
                  
                  {/* Toolbar */}
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4 pb-4 border-b border-gray-100 gap-4">
                      <div className="flex gap-4">
                          <button 
                              onClick={() => setActiveImage('main')}
                              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeImage === 'main' ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                          >
                              Bản đồ quy hoạch
                          </button>
                          <button 
                              onClick={() => setActiveImage('sub')}
                              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeImage === 'sub' ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                          >
                              Sơ đồ phân khu
                          </button>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-widest">
                          <ZoomIn size={16} />
                          <span>Click vào ảnh để phóng to</span>
                      </div>
                  </div>

                  {/* Image Container - Trigger Lightbox */}
                  <div 
                      className="relative overflow-hidden rounded-lg cursor-zoom-in group bg-gray-50 aspect-video md:aspect-[21/9]"
                      onClick={() => setIsZoomed(true)}
                  >
                       <img 
                          src={activeImage === 'main' ? content.masterplan.image_main : content.masterplan.image_sub} 
                          alt="Master Plan" 
                          className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-700"
                       />
                       
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                           <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100 shadow-xl">
                               <Maximize size={24} className="text-brand-dark" />
                           </div>
                       </div>
                  </div>
             </div>
         </div>
      </section>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div 
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
        >
            <div className="absolute top-4 right-4 z-[100]">
                <button 
                    onClick={() => setIsZoomed(false)}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                    <X size={24} />
                </button>
            </div>
            
            <img 
                src={activeImage === 'main' ? content.masterplan.image_main : content.masterplan.image_sub} 
                alt="Full Map" 
                className="max-w-full max-h-screen object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-6 py-2 rounded-full text-white text-xs uppercase tracking-widest border border-white/20">
                {activeImage === 'main' ? 'Bản đồ quy hoạch tổng thể' : 'Sơ đồ phân khu chức năng'}
            </div>
        </div>
      )}
    </>
  );
};

export default MasterPlan;