import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ChevronRight, MapPin } from 'lucide-react';

const Zones: React.FC = () => {
  const { content } = useContent();
  const [activeId, setActiveId] = useState<string>(content.zones[0].id);

  return (
    <section id="zones" className="bg-[#051A17] py-24 relative overflow-hidden scroll-mt-28">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] pointer-events-none"></div>
        
        {/* Header Section */}
        <div className="container mx-auto px-6 mb-12 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-end">
                <div className="lg:w-1/2">
                    <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-fade-up">
                        Master Plan
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 animate-fade-up leading-tight">
                        5 PHÂN KHU <br/> <span className="text-brand-accent italic">BIỂU TƯỢNG</span>
                    </h2>
                    <p className="text-gray-300 font-light text-lg leading-relaxed animate-fade-up max-w-xl border-l-2 border-brand-gold/30 pl-6">
                        {content.zones_intro?.desc || "Từng phân khu là một mảnh ghép hoàn hảo tạo nên bức tranh Siêu đô thị biển tầm cỡ thế giới."}
                    </p>
                </div>
                
                {/* Intro Map Preview - Adaptive */}
                <div className="lg:w-1/2 w-full animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <div className="relative rounded-xl overflow-hidden border border-white/10 group shadow-2xl bg-brand-dark p-2">
                        <img 
                            src={content.zones_intro?.map_image || content.masterplan.image_sub} 
                            alt="Map Preview" 
                            className="w-full h-auto block rounded-lg"
                        />
                         <div className="absolute bottom-6 right-6 pointer-events-none">
                            <span className="bg-brand-gold/90 text-brand-dark px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg backdrop-blur-sm">
                                <MapPin size={14} /> Quy hoạch tổng thể
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* FULL WIDTH ACCORDION - SPLIT LAYOUT APPROACH */}
        <div className="w-full border-t border-white/10 bg-[#020F0D]">
            {content.zones.map((zone) => {
                const isActive = activeId === zone.id;
                
                return (
                    <div 
                        key={zone.id}
                        className={`border-b border-white/10 transition-all duration-700 ease-in-out overflow-hidden
                            ${isActive ? 'bg-[#012822]' : 'bg-[#051A17] hover:bg-[#08221E] cursor-pointer'}
                        `}
                        onClick={() => setActiveId(zone.id)}
                    >
                        {/* HEADER (Visible when collapsed) */}
                        <div className={`
                            px-6 py-6 lg:px-12 lg:py-8 flex items-center justify-between
                            ${isActive ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100 h-auto'}
                        `}>
                            <div className="flex items-center gap-4 lg:gap-8">
                                <span className="text-brand-gold/50 font-display text-2xl lg:text-4xl font-bold opacity-30">0{content.zones.indexOf(zone) + 1}</span>
                                <div>
                                    <h3 className="text-lg lg:text-2xl font-serif text-white uppercase tracking-wider">{zone.name}</h3>
                                    <p className="text-brand-primary text-[10px] lg:text-xs font-bold uppercase tracking-widest mt-1">{zone.subtitle}</p>
                                </div>
                            </div>
                            <ChevronRight className={`text-brand-gold transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
                        </div>

                        {/* EXPANDED CONTENT (Visible when active) */}
                        <div className={`
                            transition-all duration-700 ease-in-out
                            ${isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                        `}>
                            <div className="flex flex-col lg:flex-row h-full">
                                
                                {/* LEFT: Info Content */}
                                <div className="lg:w-4/12 p-6 lg:p-16 flex flex-col justify-center relative bg-[#012822] z-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] lg:shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
                                    <div className="mb-6 flex items-center gap-4">
                                        <span className="text-4xl lg:text-6xl font-display font-bold text-white/5">0{content.zones.indexOf(zone) + 1}</span>
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-gold/50 to-transparent"></div>
                                    </div>
                                    
                                    <h3 className="text-3xl lg:text-5xl font-serif text-white mb-2 leading-none">{zone.name}</h3>
                                    <p className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs lg:text-sm mb-6 lg:mb-8">{zone.subtitle}</p>
                                    
                                    <p className="text-gray-300 font-light text-base lg:text-lg leading-relaxed mb-8 lg:mb-10 border-l-2 border-brand-primary pl-6">
                                        {zone.desc}
                                    </p>

                                    <div className="flex gap-4">
                                        <button className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>

                                {/* RIGHT: Full Image (No Cropping) */}
                                <div className="lg:w-8/12 bg-black relative min-h-[300px] lg:min-h-[600px] flex items-center justify-center p-4 lg:p-10">
                                    {/* Texture Background behind map */}
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-50"></div>
                                    
                                    {/* THE MAP ITSELF - Natural Size */}
                                    <div className="relative z-10 shadow-2xl rounded-lg overflow-hidden border border-white/10 w-full">
                                        <img 
                                            src={zone.image} 
                                            alt={zone.name} 
                                            className="w-full h-auto block max-h-[50vh] lg:max-h-[80vh] object-contain mx-auto"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </section>
  );
};

export default Zones;