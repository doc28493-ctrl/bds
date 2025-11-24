import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Gift, Percent, CalendarClock, Loader2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const ContactForm: React.FC = () => {
    const { content, submitLead } = useContent();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: 'Căn hộ'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Use the context function to submit to Google Sheets
        const success = await submitLead(formData);

        if (success) {
            alert("Cảm ơn Quý khách. Yêu cầu đã được gửi đi. Chuyên viên sẽ liên hệ lại trong thời gian sớm nhất.");
            setFormData({ name: '', email: '', phone: '', interest: 'Căn hộ' });
        } else {
            alert("Có lỗi xảy ra, vui lòng liên hệ hotline.");
        }
        setIsSubmitting(false);
    };

    return (
        <section id="contact" className="py-24 bg-brand-primary relative overflow-hidden scroll-mt-28">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#022c22] transform -skew-x-12 translate-x-1/4"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden bg-white">
                    
                    {/* Left Info Panel */}
                    <div className="lg:w-5/12 bg-brand-dark text-white p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 text-brand-gold/10">
                            <Send size={200} />
                        </div>

                        <div className="mb-10">
                            <h4 className="text-brand-gold font-bold tracking-widest uppercase mb-4 text-xs">Liên hệ độc quyền</h4>
                            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
                                SỞ HỮU <br/> <span className="italic text-brand-gold">DI SẢN TRUYỀN ĐỜI</span>
                            </h2>
                            <div className="space-y-4">
                                <p className="text-gray-400 leading-relaxed font-light">
                                    Đăng ký ngay hôm nay để nhận bảng hàng độc quyền suất ngoại giao.
                                </p>
                            </div>
                        </div>

                        {/* Sales Policy Highlight */}
                        <div className="bg-white/5 border border-white/10 p-6 rounded-lg mb-8 backdrop-blur-sm">
                            <h4 className="text-brand-gold font-bold uppercase text-xs tracking-wider mb-4 border-b border-brand-gold/30 pb-2">
                                {content.contact.policy_heading}
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex gap-3 items-start text-sm text-gray-300">
                                    <Gift size={16} className="text-brand-gold shrink-0 mt-0.5" />
                                    <span>{content.contact.policy_1}</span>
                                </li>
                                <li className="flex gap-3 items-start text-sm text-gray-300">
                                    <Percent size={16} className="text-brand-gold shrink-0 mt-0.5" />
                                    <span>{content.contact.policy_2}</span>
                                </li>
                                <li className="flex gap-3 items-start text-sm text-gray-300">
                                    <CalendarClock size={16} className="text-brand-gold shrink-0 mt-0.5" />
                                    <span>{content.contact.policy_3}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6 border-t border-white/10 pt-6">
                            <div className="flex items-center gap-4 group">
                                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-brand-gold group-hover:text-brand-gold transition-all">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Hotline</p>
                                    <p className="text-xl font-serif">{content.contact.hotline}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-brand-gold group-hover:text-brand-gold transition-all">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Địa chỉ</p>
                                    <p className="text-sm">{content.contact.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Panel */}
                    <div className="lg:w-7/12 p-10 lg:p-16 bg-white">
                        <h3 className="text-2xl font-serif font-bold text-brand-dark mb-8">Đăng Ký Tư Vấn</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group focus-within:text-brand-primary">
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2 group-focus-within:text-brand-primary transition-colors">Họ và tên *</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-serif placeholder-gray-300"
                                        placeholder="Nguyễn Văn A"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="group focus-within:text-brand-primary">
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2 group-focus-within:text-brand-primary transition-colors">Số điện thoại *</label>
                                    <input 
                                        type="tel" 
                                        required
                                        className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-serif placeholder-gray-300"
                                        placeholder="09xx xxx xxx"
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            <div className="group focus-within:text-brand-primary">
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2 group-focus-within:text-brand-primary transition-colors">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-serif placeholder-gray-300"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                            </div>

                            <div className="group focus-within:text-brand-primary">
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2 group-focus-within:text-brand-primary transition-colors">Sản phẩm quan tâm</label>
                                <div className="relative">
                                    <select 
                                        className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-serif cursor-pointer appearance-none"
                                        value={formData.interest}
                                        onChange={e => setFormData({...formData, interest: e.target.value})}
                                    >
                                        <option value="Biệt thự">Biệt thự Đảo</option>
                                        <option value="Nhà phố">Nhà phố Thương mại</option>
                                        <option value="Căn hộ">Căn hộ cao cấp</option>
                                        <option value="Dinh thự">Dinh thự ven biển</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full py-4 mt-4 bg-brand-dark text-white font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-colors duration-300 shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} /> Đang gửi...
                                    </>
                                ) : (
                                    'Nhận báo giá & Chính sách'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;