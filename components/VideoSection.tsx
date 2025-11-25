import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Play } from 'lucide-react';

const VideoPlayer: React.FC<{ url: string }> = ({ url }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [imgError, setImgError] = useState(false);

    // Helper to extract Video ID and SI parameter
    const parseYoutubeUrl = (url: string) => {
        if (!url) return { id: null, si: null };

        let videoId = null;
        let si = null;

        try {
            const urlObj = new URL(url);
            
            // Extract ID
            if (urlObj.hostname.includes('youtu.be')) {
                videoId = urlObj.pathname.slice(1);
            } else if (urlObj.hostname.includes('youtube.com')) {
                videoId = urlObj.searchParams.get('v');
                if (!videoId && urlObj.pathname.startsWith('/embed/')) {
                    videoId = urlObj.pathname.split('/')[2];
                }
            }

            // Extract SI if present
            si = urlObj.searchParams.get('si');

        } catch (e) {
            // Fallback regex for partial URLs
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            if (match && match[2].length === 11) {
                videoId = match[2];
            }
        }

        return { id: videoId, si };
    };

    const { id: videoId, si } = parseYoutubeUrl(url);

    if (!videoId) return null;

    // Construct Embed URL
    // Simplified params to ensure compatibility (Fix Error 153)
    const params = new URLSearchParams();
    if (si) params.append('si', si);
    params.append('autoplay', '1');
    params.append('mute', '1'); // Crucial for autoplay
    params.append('rel', '0');

    const embedSrc = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

    return (
        <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl group cursor-pointer bg-black border border-white/10">
            {!isPlaying ? (
                // Custom Facade (Thumbnail + Play Button)
                <div onClick={() => setIsPlaying(true)} className="relative w-full h-full">
                    <img 
                        src={!imgError ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                        alt="Video Thumbnail" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        onError={() => setImgError(true)}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                    
                    {/* Ripple Play Button */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative flex items-center justify-center w-20 h-20">
                            <div className="absolute w-full h-full rounded-full bg-brand-gold/30 animate-ping opacity-75"></div>
                            <div className="absolute w-full h-full rounded-full bg-brand-gold/20 animate-pulse"></div>
                            <div className="relative w-16 h-16 bg-brand-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform duration-300">
                                <Play fill="currentColor" className="text-brand-dark ml-1 w-8 h-8" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Actual YouTube Player
                <iframe 
                    width="100%" 
                    height="100%" 
                    src={embedSrc}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0"
                ></iframe>
            )}
        </div>
    );
};

const VideoSection: React.FC = () => {
    const { content } = useContent();

    // Check if videos exist
    if (!content.videoGallery?.video1_url && !content.videoGallery?.video2_url) return null;

    return (
        <section id="video" className="py-24 bg-[#081C15] relative overflow-hidden scroll-mt-28">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-fade-up">
                        Cinematic Experience
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 animate-fade-up">
                        {content.videoGallery?.heading || "THƯ VIỆN VIDEO"}
                    </h2>
                    <p className="text-gray-400 font-light max-w-2xl mx-auto text-lg animate-fade-up">
                        {content.videoGallery?.desc}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {content.videoGallery?.video1_url && (
                        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
                            <VideoPlayer url={content.videoGallery.video1_url} />
                        </div>
                    )}
                    {content.videoGallery?.video2_url && (
                        <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
                            <VideoPlayer url={content.videoGallery.video2_url} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default VideoSection;