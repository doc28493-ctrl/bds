import React from 'react';
import { Leaf, Users, Scale, Plus } from 'lucide-react';

const ESGConcept: React.FC = () => {
  const cards = [
    {
      letter: 'E',
      word: 'Environmental',
      icon: <Leaf className="w-8 h-8" />,
      desc: 'Hệ sinh thái Tái sinh: Kiến trúc Khí hậu học, Năng lượng Tái sinh. Không chỉ Net Zero – mà là Climate-Positive.'
    },
    {
      letter: 'S',
      word: 'Social',
      icon: <Users className="w-8 h-8" />,
      desc: 'Trường học, Trung tâm Sáng tạo, Spa Rừng được kiến tạo như Trạm Tái sinh Tinh thần, Tri thức và Kết nối.'
    },
    {
      letter: 'G',
      word: 'Governance',
      icon: <Scale className="w-8 h-8" />,
      desc: 'Hệ Quản trị thời gian thực. Minh bạch vận hành. Chứng nhận quốc tế BREEAM, WELL, LEED, GRESB.'
    },
    {
      letter: '++',
      word: 'Super Plus',
      icon: <Plus className="w-8 h-8" />,
      desc: 'Tư duy thiết kế Thành phố Tái sinh. Công nghệ AI và Cảm biến Môi trường giúp thành phố "tiến hóa".'
    }
  ];

  return (
    <section id="esg" className="py-32 bg-brand-dark relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-10"></div>
        
        {/* Living Aurora Effect - Dark Green/Gold mix */}
        <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[200%] bg-gradient-to-r from-[#0D4138]/40 via-[#1D6355]/30 to-[#012822]/40 blur-[120px] animate-aurora pointer-events-none opacity-60 mix-blend-screen"></div>
        
        <div className="container mx-auto px-6 relative z-20">
            <div className="text-center mb-24">
                <h4 className="text-brand-gold font-bold tracking-[0.4em] uppercase mb-6 text-xs animate-fade-up">Giá trị cốt lõi</h4>
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-white animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    CHUẨN SỐNG <span className="text-shimmer italic font-light animate-text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-brand-gold via-brand-champagne to-brand-gold">ESG++</span>
                </h2>
                <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mt-8 opacity-50"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((item, index) => (
                    <div 
                        key={index}
                        className="group relative bg-white/5 backdrop-blur-sm border border-white/5 p-10 rounded-sm hover:bg-white/10 transition-all duration-700 hover:-translate-y-2 overflow-hidden"
                        style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
                    >
                        {/* Hover Gradient Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="absolute top-0 right-0 p-6 opacity-30 text-white group-hover:opacity-100 group-hover:text-brand-gold transition-all duration-500 scale-90 group-hover:scale-110">
                            {item.icon}
                        </div>
                        
                        <div className="text-7xl font-display font-bold text-white/5 mb-6 group-hover:text-brand-gold/20 transition-colors duration-500 transform translate-x-[-10px]">
                            {item.letter}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider border-b border-white/10 pb-4 inline-block relative z-10">
                            {item.word}
                        </h3>
                        
                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors relative z-10 font-light">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
            
            <div className="mt-24 text-center">
                <p className="text-white/60 italic text-xl md:text-2xl max-w-4xl mx-auto font-serif leading-relaxed border-l-2 border-brand-gold/30 pl-6 text-left md:text-center md:border-l-0">
                    "Vinhomes Green Paradise không chỉ là thêm một thành phố nữa. <br className="hidden md:block" />
                    Mà là một thành phố biết <span className="text-brand-gold font-bold">dừng lại</span>. Để <span className="text-brand-gold font-bold">Tái sinh</span>."
                </p>
            </div>
        </div>
    </section>
  );
};

export default ESGConcept;