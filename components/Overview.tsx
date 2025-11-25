import React from 'react';
import { Wind, Droplets, Sun, Globe, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Overview: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="overview" className="bg-brand-sand relative scroll-mt-28">
      
      {/* Top Text Section */}
      {/* Increased padding-top for mobile to avoid header overlap */}
      <div className="container mx-auto px-4 pt-32 md:pt-24 pb-8 md:pb-12">
        <div className="max-w-5xl mx-auto text-center">
            <span className="text-brand-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 block animate-fade-up">
                Vision & Philosophy
            </span>
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-serif text-brand-dark leading-[1.2] md:leading-[1.1] animate-fade-up">
                {content.overview.heading}
            </h2>
        </div>
      </div>

      {/* Cinematic Image Reveal */}
      <div className="w-full md:h-[80vh] relative group mb-12 md:my-12">
           {/* Image Container */}
           <div className="relative w-full md:absolute md:inset-0 overflow-hidden">
                <img 
                    src={content.overview.image}
                    alt="Artistic View" 
                    className="w-full h-auto md:h-full md:object-cover transition-transform duration-[3s] group-hover:scale-105"
                />
           </div>
           
           {/* Desktop Gradient Overlay (Hidden on Mobile to keep image clear) */}
           <div className="absolute inset-0 bg-gradient-to-t from-brand-sand via-transparent to-transparent hidden md:block"></div>
           
           {/* Floating Label - Hidden on Mobile to avoid blocking image text, Visible on Desktop */}
           <div className="absolute bottom-10 left-20 z-10 hidden md:block">
                <div className="bg-white/95 backdrop-blur-md px-6 py-5 rounded-lg shadow-2xl border-l-4 border-brand-gold max-w-sm md:max-w-md">
                    <p className="font-serif italic text-lg md:text-xl text-brand-dark">
                        "Kiệt tác giữa thiên nhiên"
                    </p>
                </div>
           </div>
      </div>

      {/* Content Grid with Hover Effects */}
      <div className="container mx-auto px-6 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="group p-8 border border-brand-dark/5 hover:border-brand-gold/30 bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                <h3 className="text-6xl md:text-8xl font-display text-gray-100 absolute right-4 top-4 group-hover:text-brand-gold/10 transition-colors select-none">01</h3>
                
                <div className="relative z-10">
                    <Globe size={32} className="text-brand-primary mb-6" />
                    <h4 className="text-2xl font-serif text-brand-dark mb-4 group-hover:text-brand-gold transition-colors">{content.overview.item1_title}</h4>
                    <p className="text-gray-600 font-light leading-relaxed mb-6">
                        {content.overview.item1_desc}
                    </p>
                    <div className="w-12 h-[1px] bg-brand-dark/20 group-hover:w-full group-hover:bg-brand-gold transition-all duration-700"></div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="group p-8 border border-brand-dark/5 hover:border-brand-gold/30 bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                <h3 className="text-6xl md:text-8xl font-display text-gray-100 absolute right-4 top-4 group-hover:text-brand-gold/10 transition-colors select-none">02</h3>
                
                <div className="relative z-10">
                    <div className="flex gap-4 mb-6 text-brand-primary">
                        <Wind size={24} /> <Droplets size={24} /> <Sun size={24} />
                    </div>
                    <h4 className="text-2xl font-serif text-brand-dark mb-4 group-hover:text-brand-gold transition-colors">{content.overview.item2_title}</h4>
                    <p className="text-gray-600 font-light leading-relaxed mb-6">
                        {content.overview.item2_desc}
                    </p>
                    <div className="w-12 h-[1px] bg-brand-dark/20 group-hover:w-full group-hover:bg-brand-gold transition-all duration-700"></div>
                </div>
            </div>

            {/* Card 3 */}
            <div className="group p-8 border border-brand-dark/5 hover:border-brand-gold/30 bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                <h3 className="text-6xl md:text-8xl font-display text-gray-100 absolute right-4 top-4 group-hover:text-brand-gold/10 transition-colors select-none">03</h3>
                
                <div className="relative z-10">
                    <ArrowRight size={32} className="text-brand-primary mb-6 group-hover:rotate-45 transition-transform duration-500" />
                    <h4 className="text-2xl font-serif text-brand-dark mb-4 group-hover:text-brand-gold transition-colors">{content.overview.item3_title}</h4>
                    <p className="text-gray-600 font-light leading-relaxed mb-6">
                        {content.overview.item3_desc}
                    </p>
                    <div className="w-12 h-[1px] bg-brand-dark/20 group-hover:w-full group-hover:bg-brand-gold transition-all duration-700"></div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Overview;
