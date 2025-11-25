import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, ArrowUp, MessageCircle, FileText, Disc, Volume2, VolumeX } from 'lucide-react';
import LandingIntro from './components/LandingIntro';
import Hero from './components/Hero';
import Overview from './components/Overview';
import ESGConcept from './components/ESGConcept';
import Location from './components/Location';
import Amenities from './components/Amenities';
import MasterPlan from './components/MasterPlan';
import Zones from './components/Zones';
import InvestmentReasons from './components/InvestmentReasons';
import VideoSection from './components/VideoSection';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import BrochureModal from './components/BrochureModal';
import { ContentProvider, useContent } from './context/ContentContext';

// --- CUSTOM COMPONENTS ---

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Tăng tốc độ Intro: Chỉ hiện 1s rồi bắt đầu hiệu ứng biến mất trong 1s => Tổng ~2s
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Notify parent slightly later to unmount
      setTimeout(onComplete, 1000); // Faster exit (1s)
    }, 1000); // Wait only 1s before exiting
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-brand-dark transition-transform duration-500 cubic-bezier(0.77, 0, 0.175, 1) ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className={`flex flex-col items-center transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="relative mb-6">
           <div className="w-24 h-24 rounded-full border border-brand-gold/30 animate-spin-slow"></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-4xl font-display text-brand-gold animate-pulse">V</span>
           </div>
        </div>
        <div className="overflow-hidden">
          <h1 className="text-brand-sand font-serif text-2xl tracking-[0.3em] uppercase animate-fade-up">
            Green Paradise
          </h1>
        </div>
        <div className="mt-4 w-32 h-[1px] bg-brand-gold/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-gold w-full animate-reveal origin-left"></div>
        </div>
      </div>
    </div>
  );
};

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for coarse pointer (touch device)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Add class to body to hide default cursor ONLY if we are on a fine pointer device
    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
        if (followerRef.current) {
          followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
      });
    };

    const handleHover = () => {
      if (followerRef.current) followerRef.current.classList.add('scale-[2.5]', 'bg-brand-gold/20', 'border-transparent');
    };
    const handleLeave = () => {
      if (followerRef.current) followerRef.current.classList.remove('scale-[2.5]', 'bg-brand-gold/20', 'border-transparent');
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Attach to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  // Ensure nothing renders on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Center Dot */}
      <div 
        ref={cursorRef} 
        className="custom-cursor fixed top-0 left-0 w-2 h-2 bg-brand-gold rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 will-change-transform"
      ></div>
      {/* Aura Glow */}
      <div 
        ref={followerRef} 
        className="custom-cursor fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center"
      >
          <div className="w-full h-full rounded-full bg-brand-gold/10 blur-md"></div>
          <div className="absolute inset-0 border border-brand-gold/30 rounded-full"></div>
      </div>
    </>
  );
};

const SoundController: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Use a royalty-free ambient track (ocean/piano)
        audioRef.current = new Audio('https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3'); 
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
        
        return () => {
            if(audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        }
    }, []);

    const toggleSound = () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => console.log("Auto-play prevented"));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-8 left-8 z-40 hidden lg:block">
            <button 
                onClick={toggleSound}
                className={`group relative w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-brand-dark/50 backdrop-blur-md transition-all hover:scale-110 hover:border-brand-gold
                    ${isPlaying ? 'animate-pulse-gold' : ''}
                `}
            >
                {/* Spinning Vinyl Effect */}
                <div className={`absolute inset-0 rounded-full border-t border-brand-gold opacity-50 ${isPlaying ? 'animate-spin-slow' : ''}`}></div>
                
                {isPlaying ? <Volume2 size={16} className="text-brand-gold" /> : <VolumeX size={16} className="text-gray-400" />}
                
                {/* Tooltip */}
                <span className="absolute left-full ml-4 text-[10px] uppercase tracking-widest text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/50 px-2 py-1 rounded">
                    {isPlaying ? 'Mute Ambient' : 'Play Ambient'}
                </span>
            </button>
        </div>
    );
};

const SmartFloatingSidebar: React.FC = () => {
    const { content } = useContent();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="fixed bottom-24 right-4 lg:left-4 lg:right-auto z-40 font-sans group flex flex-col items-end lg:items-start">
            
            <div className={`flex flex-col-reverse gap-3 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto'}`}>
                <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#012822]/90 backdrop-blur-md text-white p-3 rounded-full lg:rounded-lg hover:bg-brand-primary transition-all border border-brand-gold/20 shadow-lg w-fit cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#0088FF] flex items-center justify-center shrink-0 shadow-inner">
                        <MessageCircle size={18} fill="white" className="text-white" />
                    </div>
                    <span className="text-sm font-medium pr-2 whitespace-nowrap hidden lg:block">Chat Zalo</span>
                </a>
                
                <a href="#contact" className="flex items-center gap-3 bg-[#012822]/90 backdrop-blur-md text-white p-3 rounded-full lg:rounded-lg hover:bg-brand-primary transition-all border border-brand-gold/20 shadow-lg w-fit cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <FileText size={18} />
                    </div>
                    <span className="text-sm font-medium pr-2 whitespace-nowrap hidden lg:block">Nhận báo giá</span>
                </a>

                <a href={`tel:${content.contact.hotline}`} className="flex items-center gap-3 bg-[#012822]/90 backdrop-blur-md text-white p-3 rounded-full lg:rounded-lg hover:bg-brand-primary transition-all border border-brand-gold/20 shadow-lg w-fit cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark animate-pulse shrink-0">
                        <Phone size={18} fill="currentColor" />
                    </div>
                    <span className="text-sm font-bold pr-2 whitespace-nowrap hidden lg:block">{content.contact.hotline}</span>
                </a>
            </div>

            {/* Mobile Trigger FAB */}
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="lg:hidden mt-3 w-14 h-14 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center shadow-2xl border border-white/20 hover:scale-110 transition-transform active:scale-95"
            >
                {isExpanded ? <X size={24} /> : <Phone size={24} className="animate-pulse" />}
            </button>
        </div>
    );
}

const MainApp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [logoClicks, setLogoClicks] = useState(0);

  // Refs for scroll spy
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      setIsScrolled(window.scrollY > scrollThreshold);
      setShowScrollTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Scroll Spy Logic
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', // Trigger when section is near top
        threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(sectionRefs.current).forEach((el) => {
        if (el instanceof Element) observer.observe(el);
    });
    
    // Auto show modal logic
    const timer = setTimeout(() => {
        const hasSeenModal = sessionStorage.getItem('hasSeenBrochureModal');
        if (!hasSeenModal) {
            setShowBrochureModal(true);
            sessionStorage.setItem('hasSeenBrochureModal', 'true');
        }
    }, 15000); 

    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timer);
        observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close menu immediately

    // Wait for state update/animation to finish removing overflow:hidden from body
    // Using setTimeout + scrollIntoView is more reliable on mobile than manual calculation
    // when dealing with scroll locks and dynamic viewports
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            // Scroll-margin-top classes in HTML handle the offset
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 300); // Delay ensures layout is stable after menu closes
  };

  const handleLogoClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setLogoClicks(prev => prev + 1);
      
      // Secret Admin Trigger: Click Logo 5 times
      if (logoClicks + 1 >= 5) {
          setIsAdminOpen(true);
          setLogoClicks(0);
      } else {
        // Normal behavior: Scroll to top and close menu
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        if (window.scrollY > 0) scrollToTop();
      }
  };

  const navLinks = [
    { name: 'TRANG CHỦ', href: '#hero', id: 'hero' },
    { name: 'TỔNG QUAN', href: '#overview', id: 'overview' },
    { name: 'VỊ TRÍ', href: '#location', id: 'location' },
    { name: 'TIỆN ÍCH', href: '#amenities', id: 'amenities' },
    { name: 'MẶT BẰNG', href: '#masterplan', id: 'masterplan' },
    { name: 'PHÂN KHU', href: '#zones', id: 'zones' }, 
    { name: 'VIDEO', href: '#video', id: 'video' },
    { name: 'HÌNH ẢNH', href: '#gallery', id: 'gallery' },
    { name: 'LIÊN HỆ', href: '#contact', id: 'contact' },
  ];

  // Helper to attach ref
  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
      sectionRefs.current[id] = el;
  };

  return (
    <div className={`min-h-screen overflow-x-hidden font-sans bg-brand-dark ${isMobileMenuOpen ? 'overflow-y-hidden h-screen' : ''}`}>
      
      {/* 1. Cinematic Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {/* 2. Custom Luxury Cursor (Desktop Only) */}
      {!loading && !isAdminOpen && <CustomCursor />}

      {/* 3. Ambient Sound */}
      <SoundController />

      {/* Admin Panel */}
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Brochure / Lead Gen Modal */}
      <BrochureModal isOpen={showBrochureModal} onClose={() => setShowBrochureModal(false)} />

      {/* Smart Floating Sidebar */}
      <SmartFloatingSidebar />

      {/* 3. LANDING INTRO */}
      <LandingIntro onExplore={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} />

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
          isScrolled 
            ? 'bg-brand-dark/95 backdrop-blur-md border-white/5 py-3 shadow-xl' 
            : 'bg-gradient-to-b from-black/80 to-transparent border-transparent py-4 lg:py-6' 
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6 flex justify-between items-center">
          
          {/* Logo with Secret Admin Trigger */}
          <a href="#" className="flex items-center group relative z-50 mr-4 lg:mr-8 cursor-pointer" onClick={handleLogoClick}>
             <img 
                 src="https://tse3.mm.bing.net/th/id/OIP.eNRF8yQp_Egg-2SdzLKtewHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" 
                 alt="Vinhomes Green Paradise" 
                 className="w-10 h-10 md:w-12 md:h-12 object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform duration-500 group-hover:scale-110"
             />
             <div className="ml-3 flex flex-col lg:hidden">
                 <span className="text-white font-serif font-bold text-sm tracking-wider leading-none">VINHOMES</span>
                 <span className="text-brand-gold text-[10px] tracking-widest leading-none">GREEN PARADISE</span>
             </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-end flex-1 space-x-4 xl:space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-[10px] xl:text-[11px] font-bold tracking-widest uppercase transition-all duration-300 relative group py-2 font-sans
                    ${activeSection === link.id ? 'text-brand-gold' : 'text-white/80 hover:text-brand-gold'}
                `}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 h-[1px] bg-brand-gold transition-all duration-500 group-hover:w-full group-hover:left-0 ${activeSection === link.id ? 'w-full left-0' : 'w-0'}`}></span>
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white hover:text-brand-gold transition-colors relative z-50 ml-4 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-brand-dark/98 backdrop-blur-xl z-40 transition-transform duration-500 cubic-bezier(0.77, 0, 0.175, 1) lg:hidden flex flex-col items-center justify-center space-y-6 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <img 
                 src="https://tse3.mm.bing.net/th/id/OIP.eNRF8yQp_Egg-2SdzLKtewHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" 
                 alt="Logo" 
                 className="w-16 h-16 mb-8 object-contain"
            />
            <div className="flex flex-col items-center gap-6 overflow-y-auto max-h-[70vh] w-full px-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`font-serif text-xl font-bold transition-all duration-300 transform hover:scale-110 uppercase tracking-widest
                      ${activeSection === link.id ? 'text-brand-gold' : 'text-white'}
                  `}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.name}
                </a>
              ))}
            </div>
        </div>
      </nav>

      {/* Main Content with Refs */}
      {/* CRITICAL: Added scroll-mt-28/32 to wrapper divs to ensure smooth scrolling lands correctly below the fixed header */}
      <main className="relative z-30 bg-brand-sand">
        <div id="hero" ref={setSectionRef('hero')} className="scroll-mt-24 lg:scroll-mt-32"><Hero /></div>
        <div id="overview" ref={setSectionRef('overview')} className="scroll-mt-24 lg:scroll-mt-32"><Overview /></div>
        <ESGConcept />
        <div id="location" ref={setSectionRef('location')} className="scroll-mt-24 lg:scroll-mt-32"><Location /></div>
        <div id="amenities" ref={setSectionRef('amenities')} className="scroll-mt-24 lg:scroll-mt-32"><Amenities /></div>
        <div id="masterplan" ref={setSectionRef('masterplan')} className="scroll-mt-24 lg:scroll-mt-32"><MasterPlan /></div>
        <div id="zones" ref={setSectionRef('zones')} className="scroll-mt-24 lg:scroll-mt-32"><Zones /></div>
        <InvestmentReasons />
        <div id="video" ref={setSectionRef('video')} className="scroll-mt-24 lg:scroll-mt-32"><VideoSection /></div>
        <div id="gallery" ref={setSectionRef('gallery')} className="scroll-mt-24 lg:scroll-mt-32"><Gallery /></div>
        <div id="contact" ref={setSectionRef('contact')} className="scroll-mt-24 lg:scroll-mt-32"><ContactForm /></div>
      </main>

      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Scroll to Top */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-30 bg-brand-gold text-brand-dark p-3 rounded-full shadow-2xl transition-all duration-700 border border-white/20 hover:scale-110 group hidden md:block ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
      >
        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-500" />
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <MainApp />
    </ContentProvider>
  );
}

export default App;