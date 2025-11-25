import React, { useEffect, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Rotate3D, ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { content } = useContent();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#012822] flex items-center justify-center overflow-hidden py-0 scroll-mt-0">
      
      {/* Background Media with Curtain Reveal Effect */}
      <div className={`absolute inset-0 z-0 transition-all duration-[2000ms] cubic-bezier(0.77, 0, 0.175, 1) ${isLoaded ? 'clip-path-full scale-100' : 'clip-path-curtain scale-110'}`}
           style={{ 
             clipPath: isLoaded ? 'inset(0 0 0 0)' : 'inset(0 15% 0 15%)', // Mobile optimized curtain
             transform: isLoaded ? 'scale(1)' : 'scale(1.15)' 
           }}
      >
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

          {/* Layer 1: Cinematic Grading Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#012822]/40 via-transparent to-[#012822]/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Hero Content - Staggered Reveal */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center justify-center text-center h-full pt-20">
        
        {/* Top Title - Slide Down */}
        <div className={`transition-all duration-1000 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <h2 className="text-brand-champagne font-display font-bold text-xs md:text-sm lg:text-base tracking-[0.3em] uppercase mb-6 border border-brand-gold/30 px-6 py-2 rounded-full bg-black/20 backdrop-blur-md">
                {content.hero.label}
            </h2>
        </div>

        {/* Main Heading - SPLIT WORD ANIMATION (VIP PRO EFFECT) */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] font-serif text-white mb-8 tracking-tighter mix-blend-overlay opacity-90 flex flex-wrap justify-center gap-x-2 md:gap-x-6">
            {/* Split Title 1 into words for staggered reveal */}
            {content.hero.title1.split(' ').map((word, index) => (
                <span key={index} className="inline-block overflow-hidden py-2">
                    <span 
                        className={`inline-block transition-transform duration-[1.5s] cubic-bezier(0.19, 1, 0.22, 1) ${isLoaded ? 'translate-y-0' : 'translate-y-[120%]'}`}
                        style={{ transitionDelay: `${700 + (index * 100)}ms` }}
                    >
                        {word}
                    </span>
                </span>
            ))}
        </h1>

        {/* Subheading - Fade Up */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-[1200ms] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="font-sans text-lg md:text-xl lg:text-2xl text-gray-200 font-light mb-12 px-4 leading-relaxed">
                <span className="text-brand-gold font-serif italic text-2xl md:text-3xl mr-2">Tâm điểm</span> 
                {content.hero.title2}
            </p>
        </div>
        
        {/* CTA Button - Scale Up */}
        <div className={`transition-all duration-1000 delay-[1400ms] ${isLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <button className="group relative flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/20 rounded-full hover:bg-brand-gold hover:border-brand-gold transition-all duration-500 backdrop-blur-md overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10 flex items-center gap-3">
                    <Rotate3D size={20} className="text-brand-gold group-hover:text-brand-dark transition-colors duration-500 group-hover:rotate-180" />
                    <span className="text-white group-hover:text-brand-dark font-bold uppercase tracking-widest text-xs">Virtual Tour 360°</span>
                </div>
            </button>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[1800ms] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="flex flex-col items-center gap-2 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById('overview')?.scrollIntoView({behavior: 'smooth'})}>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Khám Phá</span>
                <ArrowDown className="text-brand-gold w-5 h-5" />
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;