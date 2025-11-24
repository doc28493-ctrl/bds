import React from 'react';
import { useContent } from '../context/ContentContext';
import { Maximize2 } from 'lucide-react';

const Gallery: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="gallery" className="py-24 bg-white scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <span className="text-brand-gold font-bold tracking-[0.2em] uppercase mb-2 block text-sm animate-fade-up">Bộ Sưu Tập</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark animate-fade-up">
                KIẾN TRÚC <span className="text-brand-accent italic">ĐA VĂN HÓA</span>
            </h2>
        </div>

        {/* 
            MASONRY LAYOUT (Pinterest Style)
            Instead of grid rows which force cropping, we use columns.
            Images flow naturally down the columns.
        */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {content.gallery.map((item, index) => (
                <div 
                    key={index} 
                    className="relative rounded-lg overflow-hidden group shadow-lg break-inside-avoid bg-brand-dark"
                >
                     {/* Image with natural height (w-full h-auto) */}
                     <img 
                        src={item.src} 
                        className="w-full h-auto block transition-transform duration-[1.5s] group-hover:scale-105" 
                        alt={item.title} 
                    />
                     
                     {/* Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                         <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                             <p className="text-brand-gold text-xs uppercase tracking-widest mb-2 border-l-2 border-brand-gold pl-2">{item.category}</p>
                             <h3 className="text-white font-serif text-2xl">{item.title}</h3>
                         </div>
                         <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                             <Maximize2 size={20} />
                         </div>
                     </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;