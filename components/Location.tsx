import React from 'react';
import { Navigation, MapPin, Compass, Mountain, Anchor, TrainFront, Milestone, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Location: React.FC = () => {
  const { content } = useContent();
  const { location } = content;

  return (
    <section id="location" className="bg-brand-sand relative overflow-hidden scroll-mt-28">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[80px]"></div>
      </div>

      {/* SECTION 1: MAP & BOUNDARIES - REDESIGNED */}
      <div className="py-24 container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-fade-up">
                Strategic Location
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-dark mb-4 uppercase animate-fade-up">
                {location.heading}
            </h2>
            <p className="text-brand-primary italic text-xl md:text-2xl font-serif mb-8 animate-fade-up relative inline-block">
                "{location.subheading}"
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-brand-gold"></span>
            </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left: Premium Map Frame */}
            <div className="lg:w-7/12 w-full perspective-1000 group">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-[8px] border-white bg-white transition-transform duration-700 ease-out hover:rotate-x-2 hover:scale-[1.02]">
                    
                    {/* Map Image */}
                    <div className="relative overflow-hidden bg-[#E5E5E5]">
                         <img 
                            src={location.image_map} 
                            alt="Bản đồ vị trí" 
                            className="w-full h-auto object-cover transform transition-transform duration-[3s] group-hover:scale-110"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent opacity-60"></div>
                    </div>
                    
                    {/* Radar Pulse Effect at Center (Approximate Location) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75 animate-ping"></span>
                            <div className="relative inline-flex rounded-full h-6 w-6 bg-brand-gold border-2 border-white shadow-lg items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Label - RESPONSIVE SIZE ADJUSTMENT */}
                    <div className="absolute bottom-3 left-3 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-md px-3 py-2 md:px-6 md:py-4 rounded-lg md:rounded-xl shadow-2xl border-l-2 md:border-l-4 border-brand-gold flex items-center gap-2 md:gap-4 max-w-[180px] md:max-w-xs z-20">
                        <div className="bg-brand-primary/10 p-1.5 md:p-2 rounded-full text-brand-primary">
                            <MapPin className="w-4 h-4 md:w-6 md:h-6" />
                        </div>
                        <div>
                            <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Tọa độ vàng</span>
                            <p className="text-brand-dark font-serif font-bold text-xs md:text-sm leading-tight">Xã Long Hòa, Cần Giờ</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 pl-4 border-l-2 border-brand-gold/30">
                    <p className="text-gray-600 font-light leading-relaxed text-justify text-lg">
                        {location.desc}
                    </p>
                </div>
            </div>

            {/* Right: 2x2 Grid Boundaries Info */}
            <div className="lg:w-5/12 w-full relative">
                {/* Decorative Compass Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                    <Compass size={400} className="text-brand-dark animate-spin-slow" />
                </div>
                
                <h3 className="text-3xl font-serif text-brand-dark mb-10 flex items-center gap-4 relative z-10">
                    <span className="w-12 h-[1px] bg-brand-dark/20"></span>
                    Tứ Cận Tiếp Giáp
                    <span className="w-12 h-[1px] bg-brand-dark/20"></span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                    {/* North */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-transparent hover:border-brand-gold/30 transition-all duration-300 group cursor-default">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#F5F2EB] flex items-center justify-center text-brand-primary font-bold text-sm border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-brand-gold transition-colors">N</div>
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-hover:text-brand-gold transition-colors">Phía Bắc</span>
                        </div>
                        <p className="text-brand-dark text-sm font-medium leading-relaxed group-hover:text-brand-primary transition-colors">
                            {location.boundary_north}
                        </p>
                    </div>

                    {/* South */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-transparent hover:border-brand-gold/30 transition-all duration-300 group cursor-default">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#F5F2EB] flex items-center justify-center text-brand-primary font-bold text-sm border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-brand-gold transition-colors">S</div>
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-hover:text-brand-gold transition-colors">Phía Nam</span>
                        </div>
                        <p className="text-brand-dark text-sm font-medium leading-relaxed group-hover:text-brand-primary transition-colors">
                            {location.boundary_south}
                        </p>
                    </div>

                    {/* East */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-transparent hover:border-brand-gold/30 transition-all duration-300 group cursor-default">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#F5F2EB] flex items-center justify-center text-brand-primary font-bold text-sm border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-brand-gold transition-colors">E</div>
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-hover:text-brand-gold transition-colors">Phía Đông</span>
                        </div>
                        <p className="text-brand-dark text-sm font-medium leading-relaxed group-hover:text-brand-primary transition-colors">
                            {location.boundary_east}
                        </p>
                    </div>

                    {/* West */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-transparent hover:border-brand-gold/30 transition-all duration-300 group cursor-default">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#F5F2EB] flex items-center justify-center text-brand-primary font-bold text-sm border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-brand-gold transition-colors">W</div>
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-hover:text-brand-gold transition-colors">Phía Tây</span>
                        </div>
                        <p className="text-brand-dark text-sm font-medium leading-relaxed group-hover:text-brand-primary transition-colors">
                            {location.boundary_west}
                        </p>
                    </div>
                </div>
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
