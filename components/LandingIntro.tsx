import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const LandingIntro: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const { content } = useContent();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="hidden lg:flex relative h-screen w-full overflow-hidden bg-brand-dark flex-col items-center justify-end z-40">
      
      {/* Banner Image - Page 1 */}
      <div className={`absolute inset-0 transition-transform duration-[2.5s] ease-out ${loaded ? 'scale-100' : 'scale-110'}`}>
         {/* Very subtle overlay just to make nav readable if image is light at top */}
         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10"></div>
         
         <img 
            src={content.intro.image} 
            alt="Vinhomes Green Paradise Banner" 
            className="w-full h-full object-cover object-top"
         />
      </div>

      {/* Scroll Hint */}
      <div className="relative z-20 mb-12 animate-bounce">
          <button 
            onClick={onExplore}
            className="flex flex-col items-center gap-2 text-white drop-shadow-lg group"
          >
             <span className="text-[10px] uppercase tracking-[0.2em] font-bold bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">Khám Phá Dự Án</span>
             <ChevronDown size={32} className="text-brand-gold" />
          </button>
      </div>

    </div>
  );
};

export default LandingIntro;