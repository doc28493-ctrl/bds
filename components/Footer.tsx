import React from 'react';
import { Facebook, Instagram, Youtube, Lock } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface FooterProps {
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { content } = useContent();

  return (
    <footer className="bg-[#0D1F1C] text-brand-sand pt-24 pb-24 md:pb-12 border-t border-brand-gold/10 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Massive Brand Name - Adjusted to vw units with max limit */}
        <div className="border-b border-brand-gold/10 pb-12 mb-12 flex justify-center overflow-hidden">
            <h1 className="text-[12vw] leading-none font-display text-center text-brand-primary/20 select-none tracking-tighter mix-blend-overlay whitespace-nowrap">
                VINHOMES
            </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Info Column */}
            <div className="md:col-span-4">
                <div className="mb-6">
                    <span className="text-brand-gold font-bold tracking-widest uppercase text-xs">Dự án</span>
                    <h3 className="text-2xl font-serif text-white mt-2">Green Paradise Cần Giờ</h3>
                </div>
                <p className="text-gray-400 font-light leading-relaxed mb-8 max-w-sm text-sm text-justify">
                    Siêu dự án lấn biển quy mô nhất Việt Nam, kiến tạo chuẩn mực sống Xanh - Thông Minh - Sinh Thái & Tái Sinh hàng đầu thế giới.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center rounded-full hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all duration-300">
                        <Facebook size={16} />
                    </a>
                    <a href="#" className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center rounded-full hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all duration-300">
                        <Instagram size={16} />
                    </a>
                    <a href="#" className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center rounded-full hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all duration-300">
                        <Youtube size={16} />
                    </a>
                </div>
            </div>

            {/* Links Column */}
            <div className="md:col-span-2 md:col-start-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-6 border-l-2 border-brand-gold pl-3">Khám Phá</h4>
                <ul className="space-y-3 font-sans text-sm text-gray-400">
                    <li><a href="#overview" className="hover:text-brand-gold hover:translate-x-1 transition-all inline-block">Tổng quan</a></li>
                    <li><a href="#location" className="hover:text-brand-gold hover:translate-x-1 transition-all inline-block">Vị trí chiến lược</a></li>
                    <li><a href="#amenities" className="hover:text-brand-gold hover:translate-x-1 transition-all inline-block">Hệ thống tiện ích</a></li>
                    <li><a href="#gallery" className="hover:text-brand-gold hover:translate-x-1 transition-all inline-block">Thư viện ảnh</a></li>
                    <li><a href="#contact" className="hover:text-brand-gold hover:translate-x-1 transition-all inline-block">Tải tài liệu</a></li>
                </ul>
            </div>

            {/* Contact Column */}
            <div className="md:col-span-4 md:col-start-9">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-6 border-l-2 border-brand-gold pl-3">Liên Hệ</h4>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Hotline</p>
                        <p className="text-xl text-white font-serif">{content.contact.hotline}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                        <p className="text-base text-gray-300">{content.contact.email}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Văn phòng giao dịch</p>
                        <p className="text-sm text-gray-300 mt-1">{content.contact.address}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest relative">
            <p>© 2025 VINHOMES GREEN PARADISE.</p>
            <div className="flex gap-8 mt-4 md:mt-0 mb-8 md:mb-0">
                <a href="#" className="hover:text-brand-gold">Chính sách bảo mật</a>
                <a href="#" className="hover:text-brand-gold">Điều khoản sử dụng</a>
            </div>
            
            {/* Admin Lock Button - Enhanced Accessibility */}
            <button 
                onClick={onOpenAdmin}
                className="absolute bottom-4 right-0 md:bottom-0 p-4 opacity-50 hover:opacity-100 text-brand-gold transition-opacity cursor-pointer z-50 hover:bg-white/5 rounded-full"
                title="Admin Access"
            >
                <Lock size={14} />
            </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;