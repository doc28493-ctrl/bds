import React, { useState } from 'react';
import { ArrowUpRight, Anchor, Music, Building, Activity, Map } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Amenities: React.FC = () => {
  const { content } = useContent();
  const [activeTab, setActiveTab] = useState<'iconic' | 'entertainment' | 'elite' | 'masterplan'>('iconic');

  const tabs = [
      { id: 'iconic', label: 'KỲ QUAN BIỂU TƯỢNG' },
      { id: 'entertainment', label: 'THIÊN ĐƯỜNG GIẢI TRÍ' },
      { id: 'elite', label: 'ĐẶC QUYỀN THƯỢNG LƯU' },
      { id: 'masterplan', label: 'TỔNG MẶT BẰNG' },
  ];

  const renderContent = () => {
      // Common card style for images
      // Using aspect-[4/3] or aspect-[16/9] ensures consistent look without hard pixel cuts
      
      switch(activeTab) {
          case 'iconic':
              return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group relative overflow-hidden rounded-lg shadow-2xl animate-fade-up" style={{ animationDelay: '0ms' }}>
                          <div className="aspect-[4/3] overflow-hidden">
                            <img src={content.amenities.landmark_tower_img} alt="Tower" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-90"></div>
                          <div className="absolute bottom-0 left-0 p-6 md:p-8">
                              <span className="text-brand-gold font-bold tracking-widest text-xs uppercase mb-2 block">{content.amenities.landmark_tower_sub}</span>
                              <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">{content.amenities.landmark_tower_title}</h3>
                              <p className="text-gray-300 font-light text-sm md:text-base">{content.amenities.landmark_tower_desc}</p>
                          </div>
                      </div>
                      <div className="group relative overflow-hidden rounded-lg shadow-2xl animate-fade-up" style={{ animationDelay: '150ms' }}>
                          <div className="aspect-[4/3] overflow-hidden">
                             <img src={content.amenities.landmark_theatre_img} alt="Theatre" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-90"></div>
                          <div className="absolute bottom-0 left-0 p-6 md:p-8">
                              <span className="text-brand-gold font-bold tracking-widest text-xs uppercase mb-2 block">{content.amenities.landmark_theatre_sub}</span>
                              <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">{content.amenities.landmark_theatre_title}</h3>
                              <p className="text-gray-300 font-light text-sm md:text-base">{content.amenities.landmark_theatre_desc}</p>
                          </div>
                      </div>
                  </div>
              );
          case 'entertainment':
              return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group relative overflow-hidden rounded-lg shadow-xl animate-fade-up" style={{ animationDelay: '0ms' }}>
                          <div className="aspect-video overflow-hidden">
                             <img src={content.amenities.ent_lagoon_img} alt="Lagoon" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                          </div>
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                          <div className="absolute bottom-0 left-0 p-6 md:p-8">
                              <h3 className="text-2xl font-serif text-white mb-2">{content.amenities.ent_lagoon_title}</h3>
                              <p className="text-sm text-gray-200">{content.amenities.ent_lagoon_desc}</p>
                          </div>
                          <div className="absolute top-4 right-4 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">{content.amenities.ent_lagoon_sub}</div>
                      </div>
                      <div className="group relative overflow-hidden rounded-lg shadow-xl animate-fade-up" style={{ animationDelay: '150ms' }}>
                          <div className="aspect-video overflow-hidden">
                              <img src={content.amenities.ent_park_img} alt="Park" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                          </div>
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                          <div className="absolute bottom-0 left-0 p-6 md:p-8">
                              <h3 className="text-2xl font-serif text-white mb-2">{content.amenities.ent_park_title}</h3>
                              <p className="text-sm text-gray-200">{content.amenities.ent_park_desc}</p>
                          </div>
                          <div className="absolute top-4 right-4 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">{content.amenities.ent_park_sub}</div>
                      </div>
                  </div>
              );
          case 'elite':
              return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { img: content.amenities.elite_golf_img, sub: content.amenities.elite_golf_sub, title: content.amenities.elite_golf_title, desc: content.amenities.elite_golf_desc },
                        { img: content.amenities.elite_marina_img, sub: content.amenities.elite_marina_sub, title: content.amenities.elite_marina_title, desc: content.amenities.elite_marina_desc },
                        { img: content.amenities.elite_hospital_img, sub: content.amenities.elite_hospital_sub, title: content.amenities.elite_hospital_title, desc: content.amenities.elite_hospital_desc }
                      ].map((item, i) => (
                          <div 
                            key={i} 
                            className="bg-brand-dark border border-white/10 p-6 rounded-lg hover:border-brand-gold transition-colors group flex flex-col h-full animate-fade-up"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                              <div className="aspect-[4/3] overflow-hidden rounded mb-4 w-full">
                                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              </div>
                              <h4 className="text-brand-gold text-xs font-bold uppercase mb-2">{item.sub}</h4>
                              <h3 className="text-xl font-serif text-white mb-2">{item.title}</h3>
                              <p className="text-gray-400 text-sm font-light mt-auto">{item.desc}</p>
                          </div>
                      ))}
                  </div>
              );
          case 'masterplan':
              return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[content.amenities.map_1, content.amenities.map_2, content.amenities.map_3, content.amenities.map_4].map((mapSrc, i) => (
                          <div 
                            key={i} 
                            className="rounded-lg overflow-hidden shadow-lg border border-white/10 bg-white/5 animate-fade-up"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                               <img src={mapSrc} alt={`Map ${i+1}`} className="w-full h-auto object-contain" />
                          </div>
                      ))}
                  </div>
              )
      }
  }

  return (
    <section id="amenities" className="py-24 md:py-32 bg-brand-dark text-white relative overflow-hidden scroll-mt-28">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-12 md:mb-16">
            <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-2 block animate-fade-up">World Class Amenities</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 animate-fade-up">
                {content.amenities.heading}
            </h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto text-lg animate-fade-up">
                {content.amenities.desc}
            </p>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex flex-nowrap overflow-x-auto md:justify-center gap-6 md:gap-8 mb-12 md:mb-16 border-b border-white/10 pb-1 scrollbar-hide px-4 md:px-0">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-4 text-xs md:text-sm font-bold tracking-widest uppercase transition-all relative whitespace-nowrap flex-shrink-0
                        ${activeTab === tab.id ? 'text-brand-gold' : 'text-gray-500 hover:text-white'}
                    `}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold animate-reveal"></span>
                    )}
                </button>
            ))}
        </div>

        {/* CONTENT AREA - With Key for Animation Reset */}
        <div className="min-h-[500px]" key={activeTab}>
            {renderContent()}
        </div>

      </div>
    </section>
  );
};

export default Amenities;