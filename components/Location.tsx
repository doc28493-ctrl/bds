import React from 'react';
import { Navigation, MapPin, Compass, Mountain, Anchor, TrainFront, Milestone } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Location: React.FC = () => {
  const { content } = useContent();
  const { location } = content;

  return (
    <section id="location" className="bg-brand-sand relative overflow-hidden scroll-mt-28">
      {/* SECTION 1: MAP & BOUNDARIES */}
      <div className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-fade-up">
                Strategic Location
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4 uppercase animate-fade-up">
                {location.heading}
            </h2>
            <p className="text-brand-primary italic text-xl font-serif mb-8 animate-fade-up">
                "{location.subheading}"
            </p>
            <div className="w-24 h-[1px] bg-brand-gold mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left: Map Image - ADAPTIVE HEIGHT LAYOUT */}
            <div className="lg:w-7/12 w-full">
                <div className="relative rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-brand-gold/20 bg-white group p-2">
                    {/* Inner Frame */}
                    <div className="relative border border-brand-dark/5 rounded overflow-hidden">
                         {/* Natural Aspect Ratio Image - w-full h-auto ensures no crop */}
                         <img 
                            src={location.image_map} 
                            alt="Bản đồ vị trí" 
                            className="w-full h-auto block transform transition-transform duration-[2s] group-hover:scale-105"
                        />
                    </div>
                    
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-5 py-3 rounded shadow-lg z-10 border border-brand-gold/20 flex items-center gap-2">
                        <div className="relative">
                            <span className="absolute w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></span>
                            <MapPin size={16} className="relative text-red-600" fill="currentColor" />
                        </div>
                        <span className="text-xs font-bold text-brand-dark tracking-wide uppercase">Vị trí thực tế</span>
                    </div>
                </div>
                <p className="mt-8 text-gray-600 font-light leading-relaxed text-justify text-lg">
                    {location.desc}
                </p>
            </div>

            {/* Right: Boundaries Info */}
            <div className="lg:w-5/12 w-full bg-white p-10 rounded-lg shadow-xl border-t-4 border-brand-gold relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Compass size={100} className="text-brand-dark" />
                </div>
                
                <h3 className="text-3xl font-serif text-brand-dark mb-8 flex items-center gap-3 relative z-10">
                    Tứ Cận Tiếp Giáp
                </h3>
                <ul className="space-y-8 relative z-10">
                    <li className="flex gap-5 group">
                        <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-primary font-bold text-sm shrink-0 border border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-brand-gold transition-colors shadow-sm">N</div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Phía Bắc</span>
                            <p className="text-brand-dark text-base font-medium leading-relaxed">{location.boundary_north}</p>
                        </div>
                    </li>
                    <li className="flex gap-5 group">
                        <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-primary font-bold text-sm shrink-0 border border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-brand-gold transition-colors shadow-sm">S</div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Phía Nam</span>
                            <p className="text-brand-dark text-base font-medium leading-relaxed">{location.boundary_south}</p>
                        </div>
                    </li>
                    <li className="flex gap-5 group">
                        <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-primary font-bold text-sm shrink-0 border border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-brand-gold transition-colors shadow-sm">E</div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Phía Đông</span>
                            <p className="text-brand-dark text-base font-medium leading-relaxed">{location.boundary_east}</p>
                        </div>
                    </li>
                    <li className="flex gap-5 group">
                        <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-primary font-bold text-sm shrink-0 border border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-brand-gold transition-colors shadow-sm">W</div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Phía Tây</span>
                            <p className="text-brand-dark text-base font-medium leading-relaxed">{location.boundary_west}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </div>

      {/* SECTION 2: FENG SHUI PARALLAX */}
      <div className="relative py-32 bg-brand-dark text-white overflow-hidden">
        {/* Parallax Image - Adjusted object-position for better mobile view */}
        <div className="absolute inset-0 opacity-40">
            <img src={location.image_fengshui} alt="Phong Thủy" className="w-full h-full object-cover object-center lg:object-bottom" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-7/12">
                <div className="flex items-center gap-4 mb-8 text-brand-gold opacity-80">
                    <Mountain size={48} strokeWidth={1} />
                    <div className="w-px h-12 bg-brand-gold/30"></div>
                    <Anchor size={48} strokeWidth={1} />
                </div>
                <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                    {location.fengshui_heading}
                </h2>
                <div className="space-y-6 text-lg text-gray-300 font-light leading-relaxed">
                    <p className="first-letter:text-4xl first-letter:font-serif first-letter:text-brand-gold first-letter:mr-1 first-letter:float-left">
                        {location.fengshui_desc}
                    </p>
                </div>
                <div className="mt-10 inline-flex items-center gap-3 border border-brand-gold/30 px-8 py-4 rounded-sm bg-brand-gold/5 backdrop-blur-md hover:bg-brand-gold/10 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                    <span className="text-brand-gold text-sm font-bold uppercase tracking-[0.2em]">Địa Thế Rồng Cuộn Hổ Ngồi</span>
                </div>
            </div>
        </div>
      </div>

      {/* SECTION 3: CONNECTIONS GRID */}
      <div className="py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {[location.dist_1, location.dist_2, location.dist_3, location.dist_4].map((item, idx) => (
                    <div key={idx} className="bg-[#F9F8F6] p-8 rounded text-center border border-transparent hover:border-brand-gold transition-all hover:-translate-y-2 group shadow-sm hover:shadow-lg">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-brand-primary group-hover:text-brand-gold transition-colors">
                            <Milestone size={24} />
                        </div>
                        <h4 className="font-serif font-bold text-brand-dark text-lg">{item}</h4>
                    </div>
                ))}
            </div>
            
            {/* Infra Map - Adaptive Height */}
            <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-50">
                 <img src={location.infra_map_image} alt="Bản đồ kết nối" className="w-full h-auto block" />
            </div>
        </div>
      </div>

      {/* SECTION 4: FUTURE INFRASTRUCTURE */}
      <div className="py-24 bg-[#F5F2EB]">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-serif text-brand-dark uppercase mb-4">Đòn Bẩy Hạ Tầng</h2>
                  <p className="text-gray-500 font-light text-xl">Những siêu dự án giao thông thay đổi diện mạo Cần Giờ</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                  {/* Bridge */}
                  <div className="h-full flex flex-col group bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
                      <div className="relative w-full aspect-video rounded-lg mb-6 overflow-hidden bg-gray-100">
                          <img src={location.infra_bridge_image} alt="Cầu Cần Giờ" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                          <div className="absolute top-4 right-4 bg-brand-gold text-brand-dark px-4 py-2 text-xs font-bold uppercase rounded-full shadow-lg z-10">Thông qua đề án</div>
                      </div>
                      <div className="px-4 pb-4 flex-grow">
                        <h3 className="text-3xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">{location.infra_bridge_title}</h3>
                        <p className="text-gray-600 font-light leading-relaxed text-lg">{location.infra_bridge_desc}</p>
                      </div>
                  </div>

                  {/* Rail */}
                  <div className="h-full flex flex-col group bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
                      <div className="relative w-full aspect-video rounded-lg mb-6 overflow-hidden bg-gray-100">
                          <img src={location.infra_rail_image} alt="Đường sắt cao tốc" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                          <div className="absolute top-4 right-4 bg-brand-primary text-white px-4 py-2 text-xs font-bold uppercase rounded-full shadow-lg flex items-center gap-2 z-10">
                              <TrainFront size={14} /> 350km/h
                          </div>
                      </div>
                      <div className="px-4 pb-4 flex-grow">
                        <h3 className="text-3xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">{location.infra_rail_title}</h3>
                        <p className="text-gray-600 font-light leading-relaxed text-lg">{location.infra_rail_desc}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

    </section>
  );
};

export default Location;