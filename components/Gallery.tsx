import React, { useEffect, useRef, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ArrowUpRight } from 'lucide-react';

const GalleryCard: React.FC<{ item: any }> = ({ item }) => (
    <div className="relative mb-6 rounded-lg overflow-hidden group break-inside-avoid shadow-lg">
        <div className="overflow-hidden">
             <img 
                src={item.src} 
                className="w-full h-auto block transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                alt={item.title} 
            />
        </div>
         {/* Premium Overlay */}
         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
             <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                 <p className="text-brand-gold text-[10px] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-brand-gold"></span>
                    {item.category}
                 </p>
                 <h3 className="text-white font-serif text-2xl md:text-3xl leading-none">{item.title}</h3>
             </div>
             <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity delay-200 bg-white/10 p-2 rounded-full backdrop-blur-md hover:bg-brand-gold hover:text-brand-dark">
                 <ArrowUpRight size={20} />
             </div>
         </div>
    </div>
);

const Gallery: React.FC = () => {
  const { content } = useContent();
  const [offsetY, setOffsetY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Check Mobile
  useEffect(() => {
    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax Logic
  useEffect(() => {
    if (isMobile) return; // Disable parallax calculation on mobile

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Calculate relative position within viewport
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        setOffsetY(scrollProgress * 100); // 0 to 100 range
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Split content into 3 columns for masonry
  const col1 = content.gallery.filter((_, i) => i % 3 === 0);
  const col2 = content.gallery.filter((_, i) => i % 3 === 1);
  const col3 = content.gallery.filter((_, i) => i % 3 === 2);

  return (
    <section id="gallery" ref={sectionRef} className="py-24 md:py-32 bg-[#F5F2EB] scroll-mt-28 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20">
            <div className="md:w-1/2">
                <span className="text-brand-gold font-bold tracking-[0.2em] uppercase mb-4 block text-sm animate-fade-up">Bộ Sưu Tập</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-brand-dark animate-fade-up leading-none">
                    KIẾN TRÚC <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent italic">ĐA VĂN HÓA</span>
                </h2>
            </div>
            <div className="md:w-1/3 mt-8 md:mt-0">
                <p className="text-gray-500 font-light text-base md:text-lg text-justify border-l border-brand-dark/20 pl-6">
                    Mỗi góc nhìn là một tác phẩm nghệ thuật, nơi thiên nhiên và kiến trúc hòa quyện tạo nên bản giao hưởng thị giác bất tận.
                </p>
            </div>
        </div>

        {/* PARALLAX MASONRY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Column 1 */}
            <div 
                className="flex flex-col transition-transform duration-300 ease-out" 
                style={{ transform: !isMobile ? `translateY(${offsetY * -0.5}px)` : 'none' }}
            >
                {col1.map((item, index) => <GalleryCard key={index} item={item} />)}
            </div>

            {/* Column 2 - Reverse Parallax only on Desktop */}
            <div 
                className={`flex flex-col transition-transform duration-300 ease-out ${!isMobile ? 'pt-24' : ''}`} 
                style={{ transform: !isMobile ? `translateY(${offsetY * 0.8}px)` : 'none' }}
            >
                {col2.map((item, index) => <GalleryCard key={index} item={item} />)}
            </div>

            {/* Column 3 */}
            <div 
                className="flex flex-col transition-transform duration-300 ease-out" 
                style={{ transform: !isMobile ? `translateY(${offsetY * -0.2}px)` : 'none' }}
            >
                {col3.map((item, index) => <GalleryCard key={index} item={item} />)}
            </div>

        </div>
      </div>
    </section>
  );
};

export default Gallery;
