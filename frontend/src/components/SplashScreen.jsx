import { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Start fade out animation after loading completes
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3200);

    // Remove splash screen completely after fade out
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(180deg, #FF9933 0%, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%, #138808 100%)',
      }}
    >
      {/* Indian Flag Overlay with Gradient */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, rgba(255,153,51,0.95) 0%, rgba(255,255,255,0.97) 35%, rgba(255,255,255,0.97) 65%, rgba(19,136,8,0.95) 100%)',
      }}></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Indian Flag Colors Floating Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-float-slow" style={{ background: 'rgba(255,153,51,0.15)' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-float-slower" style={{ background: 'rgba(19,136,8,0.15)' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full blur-2xl animate-float-medium" style={{ background: 'rgba(0,0,128,0.1)' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full blur-3xl animate-float-slow" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
        
        {/* Indian Farmer & Agriculture Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Wheat/Crop Pattern */}
              <pattern id="crop-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                {/* Wheat stalks */}
                <path d="M50 20 L50 100 M45 30 Q50 25 55 30 M45 40 Q50 35 55 40 M45 50 Q50 45 55 50 M45 60 Q50 55 55 60 M45 70 Q50 65 55 70 M45 80 Q50 75 55 80 M45 90 Q50 85 55 90" 
                      stroke="currentColor" fill="none" strokeWidth="2" opacity="0.6"/>
                {/* Second stalk */}
                <path d="M80 25 L80 105 M75 35 Q80 30 85 35 M75 45 Q80 40 85 45 M75 55 Q80 50 85 55 M75 65 Q80 60 85 65 M75 75 Q80 70 85 75 M75 85 Q80 80 85 85 M75 95 Q80 90 85 95" 
                      stroke="currentColor" fill="none" strokeWidth="2" opacity="0.5"/>
                {/* Leaves */}
                <circle cx="50" cy="35" r="3" fill="currentColor" opacity="0.4"/>
                <circle cx="55" cy="45" r="3" fill="currentColor" opacity="0.4"/>
                <circle cx="45" cy="55" r="3" fill="currentColor" opacity="0.4"/>
              </pattern>
              
              {/* Tractor/Farm Equipment Pattern */}
              <pattern id="farm-pattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                {/* Simple tractor silhouette */}
                <circle cx="40" cy="120" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <circle cx="100" cy="120" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <rect x="50" y="90" width="40" height="30" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#crop-pattern)" className="text-green-900"/>
            <rect width="100%" height="100%" fill="url(#farm-pattern)" className="text-orange-800"/>
          </svg>
        </div>

        {/* Ashoka Chakra inspired rotating element (center) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <svg width="400" height="400" viewBox="0 0 200 200" className="animate-spin-slow">
            <circle cx="100" cy="100" r="60" fill="none" stroke="#000080" strokeWidth="2"/>
            {[...Array(24)].map((_, i) => {
              const angle = (i * 15 * Math.PI) / 180;
              const x1 = 100 + 60 * Math.cos(angle);
              const y1 = 100 + 60 * Math.sin(angle);
              const x2 = 100 + 30 * Math.cos(angle);
              const y2 = 100 + 30 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000080" strokeWidth="2"/>;
            })}
            <circle cx="100" cy="100" r="10" fill="#000080"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo/Icon with Indian Theme */}
        <div className="mb-8 animate-scale-in">
          <div className="mx-auto w-36 h-36 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border-4" style={{ borderColor: '#FF9933' }}>
            {/* Indian Farmer Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 animate-pulse-gentle"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#138808"
              strokeWidth={1.8}
            >
              {/* Farmer with turban and crop */}
              <circle cx="12" cy="6" r="3" strokeWidth="2"/>
              <path d="M12 9 L12 15" strokeWidth="2"/>
              <path d="M12 11 L8 13 M12 11 L16 13" strokeWidth="2"/>
              <path d="M12 15 L9 21 M12 15 L15 21" strokeWidth="2"/>
              <path d="M17 4 Q19 6 17 8 M19 6 L21 6" strokeWidth="1.5"/>
              <circle cx="19" cy="6" r="0.5" fill="#138808"/>
              <path d="M6 3 L6 8 M4 5 Q6 4 8 5 M4 7 Q6 6 8 7" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          
          {/* Indian Flag Mini Representation */}
          <div className="mt-4 mx-auto w-20 h-3 rounded-full overflow-hidden shadow-lg">
            <div className="h-full flex">
              <div className="w-1/3" style={{ background: '#FF9933' }}></div>
              <div className="w-1/3 bg-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full" style={{ background: '#000080' }}></div>
              </div>
              <div className="w-1/3" style={{ background: '#138808' }}></div>
            </div>
          </div>
        </div>

        {/* Title with Indian Theme */}
        <div className="mb-6 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 tracking-tight" style={{
            background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            कृषि AI
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#FF9933', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            CropAI
          </p>
          <p className="text-lg md:text-xl font-light" style={{ color: '#138808', textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>
            Smart Crop Recommendation System
          </p>
        </div>

        {/* Subtitle with Indian Context */}
        <div className="mb-10 animate-slide-up-delay">
          <p className="text-lg font-semibold flex items-center justify-center gap-2 mb-2" style={{ color: '#000080' }}>
            <span className="text-2xl">🇮🇳</span>
            भारतीय किसानों के लिए AI सहायक
          </p>
          <p className="text-base font-medium" style={{ color: '#138808', textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>
            AI-Powered Agriculture for Indian Farmers
          </p>
        </div>

        {/* Loading Bar with Indian Flag Colors */}
        <div className="max-w-md mx-auto animate-fade-in-up">
          {/* Progress Bar Container */}
          <div className="relative h-3 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm mb-4 border-2" style={{ borderColor: '#000080' }}>
            {/* Tri-color Progress Bar Fill */}
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${loadingProgress}%`,
                background: loadingProgress < 33 ? '#FF9933' : 
                           loadingProgress < 66 ? 'linear-gradient(to right, #FF9933 0%, #FFFFFF 50%, #FFFFFF 100%)' :
                           'linear-gradient(to right, #FF9933 0%, #FFFFFF 50%, #138808 100%)'
              }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            </div>
          </div>

          {/* Loading Text in Hindi and English */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 font-semibold" style={{ color: '#138808' }}>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0ms', background: '#FF9933' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '150ms', background: '#FFFFFF', border: '1px solid #000080' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '300ms', background: '#138808' }}></div>
              </div>
              <span className="text-sm">
                {loadingProgress < 30 && 'AI मॉडल शुरू हो रहे हैं...'}
                {loadingProgress >= 30 && loadingProgress < 60 && 'फसल डेटाबेस लोड हो रहा है...'}
                {loadingProgress >= 60 && loadingProgress < 90 && 'कृषि बॉट तैयार हो रहा है...'}
                {loadingProgress >= 90 && 'किसानों की मदद के लिए तैयार!'}
              </span>
            </div>
            <div className="text-xs font-medium" style={{ color: '#000080' }}>
              {loadingProgress < 30 && 'Initializing AI Models...'}
              {loadingProgress >= 30 && loadingProgress < 60 && 'Loading Crop Database...'}
              {loadingProgress >= 60 && loadingProgress < 90 && 'Preparing AgriBot...'}
              {loadingProgress >= 90 && 'Ready to Help Farmers!'}
            </div>
          </div>

          {/* Loading Percentage */}
          <div className="mt-3 text-lg font-bold font-mono" style={{ color: '#FF9933', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            {loadingProgress}%
          </div>
        </div>

        {/* Feature Pills with Indian Theme */}
        <div className="mt-12 flex flex-wrap gap-3 justify-center animate-fade-in-delay">
          <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold border-2 shadow-lg" style={{ color: '#138808', borderColor: '#FF9933' }}>
            🌾 9+ फसलें
          </div>
          <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold border-2 shadow-lg" style={{ color: '#138808', borderColor: '#FF9933' }}>
            🤖 AI सहायक
          </div>
          <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold border-2 shadow-lg" style={{ color: '#138808', borderColor: '#FF9933' }}>
            📊 100% सटीकता
          </div>
          <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold border-2 shadow-lg" style={{ color: '#138808', borderColor: '#FF9933' }}>
            💬 24/7 सहायता
          </div>
        </div>
      </div>

      {/* Bottom Branding with Indian Theme */}
      <div className="absolute bottom-8 left-0 right-0 text-center animate-fade-in-delay-2">
        <p className="text-base font-bold mb-1" style={{ color: '#FF9933', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          🇮🇳 भारतीय किसानों को तकनीक से सशक्त बनाना
        </p>
        <p className="text-sm font-medium" style={{ color: '#138808', textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>
          Empowering Indian Farmers with Technology
        </p>
        <p className="text-xs mt-2 font-medium" style={{ color: '#000080' }}>
          Made in India with ❤️ for Agriculture | भारत में बना कृषि के लिए
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;

