import React from 'react';
import { useContent } from '../context/ContentContext';
import { Crown, TrendingUp, ShieldCheck, Gem, Landmark, Anchor } from 'lucide-react';

const InvestmentReasons: React.FC = () => {
  const { content } = useContent();
  const { reasons } = content;

  const items = [
      { icon: <Anchor className="w-8 h-8" />, title: reasons.r1_title, desc: reasons.r1_desc },
      { icon: <Crown className="w-8 h-8" />, title: reasons.r2_title, desc: reasons.r2_desc },
      { icon: <Landmark className="w-8 h-8" />, title: reasons.r3_title, desc: reasons.r3_desc },
      { icon: <ShieldCheck className="w-8 h-8" />, title: reasons.r4_title, desc: reasons.r4_desc },
      { icon: <TrendingUp className="w-8 h-8" />, title: reasons.r5_title, desc: reasons.r5_desc },
      { icon: <Gem className="w-8 h-8" />, title: reasons.r6_title, desc: reasons.r6_desc },
  ];

  return (
    <section className="py-24 bg-brand-sand relative">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark animate-fade-up uppercase">
                {reasons.heading}
            </h2>
            <div className="w-24 h-[1px] bg-brand-gold mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
                <div 
                    key={index} 
                    className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 group border border-brand-dark/5 hover:-translate-y-2 opacity-0 animate-fade-up"
                    style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
                >
                    <div className="w-16 h-16 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                        {item.icon}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">
                        {item.desc}
                    </p>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default InvestmentReasons;