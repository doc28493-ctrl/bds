import React from 'react';
import { useContent } from '../context/ContentContext';
import { Rotate3D } from 'lucide-react';

const Hero: React.FC = () => {
  const { content } = useContent();

  return (
    <section className="relative w-full min-h-screen bg-[#012822] flex items-center justify-center overflow-hidden py-24 scroll-mt-28">
      
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
          {content.hero.videoUrl ? (
             <video 
                src={content.hero.videoUrl} 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover transition-opacity duration-1000"
             />
          ) : (
             <div 
                className="absolute inset-0 bg-cover bg-center animate-scale-slow" 
                style={{ backgroundImage: `url('${content.hero.bgImage}')` }}
             ></div>
          )}

          {/* Layer 1: Gradient Overlay - Adjusted to be lighter (40% -> 30% top, 20% -> 0% mid) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#012822]/30 via-transparent to-[#012822]/80"></div>
          
          {/* REMOVED: Foggy birds pattern layer as requested */}
      </div>

      {/* Background Decor - Subtle Aurora Glow - Fixed Position */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-primary/20 blur-[120px] rounded-full pointer-events-none animate-aurora"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center justify-center text-center mt-12 md:mt-0">
        
        {/* Top Title */}
        <h2 className="text-brand-champagne font-display font-bold text-xs md:text-xl lg:text-3xl tracking-[0.2em] uppercase mb-6 animate-fade-up border-b border-brand-gold/20 pb-4 inline-block opacity-90">
            {content.hero.label}
        </h2>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 mb-8 md:mb-10 opacity-60">
            <div className="h-[1px] w-12 md:w-32 bg-gradient-to-l from-brand-gold to-transparent"></div>
            <div className="text-brand-gold">
                <svg width="20" height="10" viewBox="0 0 40 20" fill="none" className="md:w-[30px] md:h-[15px]">
                     <path d="M20 0C20 0 22 10 30 10C38 10 40 20 40 20M20 0C20 0 18 10 10 10C2 10 0 20 0 20" stroke="currentColor" strokeWidth="1"/>
                </svg>
            </div>
            <div className="h-[1px] w-12 md:w-32 bg-gradient-to-r from-brand-gold to-transparent"></div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-white mb-6 md:mb-8 animate-fade-up leading-tight tracking-tight drop-shadow-2xl max-w-6xl mix-blend-lighten" style={{ animationDelay: '0.2s' }}>
            {content.hero.title1}
        </h1>

        {/* Subheading */}
        <p className="font-display italic text-lg md:text-4xl lg:text-5xl text-white font-light mb-12 animate-fade-up px-4 max-w-5xl leading-snug" style={{ animationDelay: '0.4s' }}>
            <span className="font-serif italic mr-2 md:mr-3 text-2xl md:text-5xl lg:text-6xl text-shimmer animate-text-shimmer font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#fcf6ba] to-[#D4AF37]">
                Tâm điểm
            </span> 
            <span className="block md:inline mt-2 md:mt-0">{content.hero.title2}</span>
        </p>
        
        {/* 360 Virtual Tour Button */}
        <div className="mb-16 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <button className="group relative flex items-center gap-4 px-6 py-3 md:px-8 md:py-3 bg-white/5 border border-brand-gold/30 rounded-full hover:bg-brand-gold/10 hover:border-brand-gold transition-all duration-300 backdrop-blur-sm">
                <div className="relative">
                    <Rotate3D size={20} className="md:w-6 md:h-6 text-brand-gold group-hover:rotate-180 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-brand-gold blur-lg opacity-20 group-hover:opacity-40"></div>
                </div>
                <span className="text-brand-gold font-bold uppercase tracking-widest text-[10px] md:text-xs">Trải nghiệm 360° Virtual Tour</span>
                <div className="absolute -inset-1 rounded-full border border-brand-gold/20 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </button>
        </div>

        {/* Bottom Logo - Large */}
        <div className="flex flex-col items-center animate-fade-up mt-4 opacity-80 hover:opacity-100 transition-opacity duration-700 cursor-pointer group" style={{ animationDelay: '0.6s' }}>
            {/* Abstract Leaf/Bird Logo Shape */}
            <div className="w-16 h-16 md:w-28 md:h-28 mb-4 md:mb-6 relative transition-transform duration-700 group-hover:scale-110">
                 <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#8BAEA8]">
                    <path d="M50 95C50 95 80 60 80 40C80 20 60 10 50 10C40 10 20 20 20 40C20 60 50 95 50 95Z" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                    <path d="M50 80C50 80 20 50 30 30C40 10 60 30 50 80Z" fill="currentColor" className="text-brand-primary" />
                    <path d="M50 80C50 80 80 50 70 30C60 10 40 30 50 80Z" fill="url(#grad1)" />
                    <defs>
                        <linearGradient id="grad1" x1="50" y1="80" x2="70" y2="30">
                            <stop stopColor="#D4AF37" />
                            <stop offset="1" stopColor="#8BAEA8" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                 </svg>
            </div>
            
            <div className="text-center">
                <span className="block text-xl md:text-3xl font-display font-bold text-white tracking-[0.2em] uppercase group-hover:text-brand-gold transition-colors duration-500">VINHOMES</span>
                <span className="block text-[10px] md:text-sm text-white tracking-[0.4em] uppercase mt-2 md:mt-3 border-t border-white/30 pt-2 md:pt-3">GREEN PARADISE</span>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;