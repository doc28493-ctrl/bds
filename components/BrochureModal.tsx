import React, { useState } from 'react';
import { X, Download, ShieldCheck, Loader2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface BrochureModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
    const { content, submitLead } = useContent();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Gửi dữ liệu về Google Sheet
        // Trường 'interest' được gán cứng là "Tải Brochure" để phân biệt nguồn khách hàng
        const success = await submitLead({
            name: name,
            phone: phone,
            email: email,
            interest: 'Tải Brochure/Tài Liệu'
        });

        setIsLoading(false);

        if (success) {
            setIsSubmitted(true);
        } else {
            alert("Có lỗi kết nối. Vui lòng thử lại hoặc liên hệ Hotline.");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark Backdrop with Blur */}
            <div 
                className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm transition-opacity duration-500 animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-up">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                >
                    <X size={20} className="text-gray-600" />
                </button>

                {/* Left Image Side */}
                <div className="w-full md:w-5/12 relative hidden md:block">
                    <img 
                        src={content.popup.image} 
                        alt="Brochure Cover" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-brand-primary/80 mix-blend-multiply"></div>
                    <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
                        <div className="border-l-4 border-brand-gold pl-6">
                            <h3 className="text-3xl font-serif font-bold mb-4">Masterpiece <br/> Living</h3>
                            <p className="text-sm font-light opacity-80">
                                Khám phá thông tin chi tiết về Siêu đô thị biển ESG++ đầu tiên tại Việt Nam.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Form Side */}
                <div className="w-full md:w-7/12 p-8 md:p-12 bg-white relative">
                    {!isSubmitted ? (
                        <>
                            <div className="text-center mb-8">
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark uppercase mb-2">
                                    {content.popup.title}
                                </h2>
                                <p className="text-brand-gold font-bold text-xs tracking-widest uppercase">
                                    {content.popup.subtitle}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="Họ và tên quý khách"
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold transition-all"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="tel" 
                                        required
                                        placeholder="Số điện thoại nhận tài liệu (Zalo)"
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold transition-all"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="email" 
                                        required
                                        placeholder="Email (Tùy chọn)"
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 bg-brand-dark text-white font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        <>
                                            <Download size={18} />
                                            {content.popup.buttonText}
                                        </>
                                    )}
                                </button>
                            </form>
                            
                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
                                <ShieldCheck size={14} />
                                <span>Thông tin của quý khách được bảo mật tuyệt đối.</span>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-10">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-fade-up">
                                <Download size={40} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">Đăng Ký Thành Công!</h3>
                            <p className="text-gray-500 mb-8 max-w-xs">
                                Hệ thống đang tự động tải xuống bộ tài liệu. Chuyên viên sẽ liên hệ với quý khách trong ít phút.
                            </p>
                            <button 
                                onClick={onClose}
                                className="px-8 py-3 bg-gray-100 text-gray-600 font-bold uppercase text-xs tracking-widest hover:bg-gray-200 rounded-lg"
                            >
                                Đóng cửa sổ
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrochureModal;