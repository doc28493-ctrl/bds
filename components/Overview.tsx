import React from 'react';
import { Wind, Droplets, Sun, Globe } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Overview: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="overview" className="bg-brand-sand relative scroll-mt-28 overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-32">
        
        {/* Intro Text */}
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-12">
            <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-fade-up">
                Vision & Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-brand-dark leading-tight animate-fade-up" style={{ animationDelay: '0.2s' }}>
                {content.overview.heading}
            </h2>
        </div>

        {/* Artistic Composition - Centered Image Layout */}
        <div className="flex flex-col items-center gap-16">
            
            {/* Image Section - Centered & Larger */}
            <div className="w-full lg:w-4/5 mx-auto group perspective-1000 z-10">
                <div className="relative w-full rounded-2xl shadow-2xl overflow-hidden border border-brand-gold/20 bg-white p-2">
                     <div className="relative rounded-xl overflow-hidden aspect-video">
                        <img 
                            src={content.overview.image}
                            alt="Artistic View" 
                            className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                        />
                     </div>
                </div>
            </div>

            {/* Content Section - Grid Layout */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 px-4">
                
                {/* Block 1 */}
                <div className="group cursor-default relative pl-8 border-l border-brand-dark/10 hover:border-brand-gold transition-colors duration-500 pt-2">
                    <h3 className="text-6xl lg:text-8xl font-display text-brand-dark/5 group-hover:text-brand-gold/20 transition-colors duration-500 absolute -top-6 left-4 select-none pointer-events-none">01</h3>
                    
                    <div className="relative z-10 mt-4">
                        <h4 className="text-2xl lg:text-3xl font-serif text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">{content.overview.item1_title}</h4>
                        <p className="text-gray-600 font-light leading-relaxed mb-6 text-base">
                            {content.overview.item1_desc}
                        </p>
                        <div className="flex items-center gap-4 text-brand-primary opacity-60 group-hover:opacity-100 transition-opacity">
                             <Globe size={24} />
                             <span className="text-xs uppercase tracking-widest font-bold">Quy mô toàn cầu</span>
                        </div>
                    </div>
                </div>

                {/* Block 2 */}
                <div className="group cursor-default relative pl-8 border-l border-brand-dark/10 hover:border-brand-gold transition-colors duration-500 pt-2">
                    <h3 className="text-6xl lg:text-8xl font-display text-brand-dark/5 group-hover:text-brand-gold/20 transition-colors duration-500 absolute -top-6 left-4 select-none pointer-events-none">02</h3>
                    
                    <div className="relative z-10 mt-4">
                        <h4 className="text-2xl lg:text-3xl font-serif text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">{content.overview.item2_title}</h4>
                        <p className="text-gray-600 font-light leading-relaxed mb-6 text-base">
                            {content.overview.item2_desc}
                        </p>
                        <div className="flex gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
                            <span className="w-10 h-10 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-primary bg-white shadow-sm"><Wind size={16}/></span>
                            <span className="w-10 h-10 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-primary bg-white shadow-sm"><Droplets size={16}/></span>
                            <span className="w-10 h-10 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-primary bg-white shadow-sm"><Sun size={16}/></span>
                        </div>
                    </div>
                </div>

                {/* Block 3 */}
                <div className="group cursor-default relative pl-8 border-l border-brand-dark/10 hover:border-brand-gold transition-colors duration-500 pt-2">
                    <h3 className="text-6xl lg:text-8xl font-display text-brand-dark/5 group-hover:text-brand-gold/20 transition-colors duration-500 absolute -top-6 left-4 select-none pointer-events-none">03</h3>
                    
                    <div className="relative z-10 mt-4">
                        <h4 className="text-2xl lg:text-3xl font-serif text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">{content.overview.item3_title}</h4>
                        <p className="text-gray-600 font-light leading-relaxed mb-6 text-base">
                            {content.overview.item3_desc}
                        </p>
                        <button className="text-brand-dark text-xs font-bold uppercase tracking-widest border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors">
                            Xem quy hoạch chi tiết
                        </button>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;