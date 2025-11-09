const IndianBackground = ({ variant = 'default', children }) => {
  // Different gradient variations for different pages
  const gradients = {
    default: 'linear-gradient(135deg, rgba(255,153,51,0.08) 0%, rgba(255,255,255,0.95) 35%, rgba(255,255,255,0.95) 65%, rgba(19,136,8,0.08) 100%)',
    landing: 'linear-gradient(135deg, rgba(255,153,51,0.12) 0%, rgba(255,255,255,0.92) 30%, rgba(255,255,255,0.92) 70%, rgba(19,136,8,0.12) 100%)',
    form: 'linear-gradient(135deg, rgba(19,136,8,0.08) 0%, rgba(255,255,255,0.96) 40%, rgba(255,255,255,0.96) 60%, rgba(255,153,51,0.08) 100%)',
    results: 'linear-gradient(135deg, rgba(255,153,51,0.10) 0%, rgba(255,255,255,0.94) 25%, rgba(19,136,8,0.15) 50%, rgba(255,255,255,0.94) 75%, rgba(255,153,51,0.10) 100%)',
    about: 'linear-gradient(135deg, rgba(19,136,8,0.10) 0%, rgba(255,255,255,0.94) 35%, rgba(255,153,51,0.08) 65%, rgba(255,255,255,0.94) 100%)',
  };

  return (
    <div className="relative min-h-screen">
      {/* Base Tri-color Background - Very Subtle */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255,153,51,0.03) 0%, rgba(255,153,51,0.03) 20%, rgba(255,255,255,1) 20%, rgba(255,255,255,1) 80%, rgba(19,136,8,0.03) 80%, rgba(19,136,8,0.03) 100%)',
        }}
      />

      {/* Gradient Overlay - Variant Specific */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: gradients[variant] || gradients.default,
        }}
      />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        {/* Floating Circles - Indian Flag Colors */}
        <div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(255,153,51,0.4) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20 animate-float-slower"
          style={{ background: 'radial-gradient(circle, rgba(19,136,8,0.4) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-15 animate-float-medium"
          style={{ background: 'radial-gradient(circle, rgba(0,0,128,0.3) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(255,153,51,0.3) 0%, transparent 70%)' }}
        />

        {/* Agriculture Pattern Overlay - Very Subtle */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Wheat/Crop Pattern */}
              <pattern id="page-crop-pattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                <path d="M50 20 L50 120 M45 35 Q50 30 55 35 M45 50 Q50 45 55 50 M45 65 Q50 60 55 65 M45 80 Q50 75 55 80 M45 95 Q50 90 55 95 M45 110 Q50 105 55 110" 
                      stroke="#138808" fill="none" strokeWidth="2.5"/>
                <path d="M100 30 L100 130 M95 45 Q100 40 105 45 M95 60 Q100 55 105 60 M95 75 Q100 70 105 75 M95 90 Q100 85 105 90 M95 105 Q100 100 105 105 M95 120 Q100 115 105 120" 
                      stroke="#FF9933" fill="none" strokeWidth="2.5"/>
                <circle cx="50" cy="40" r="4" fill="#138808"/>
                <circle cx="55" cy="55" r="4" fill="#FF9933"/>
                <circle cx="45" cy="70" r="4" fill="#138808"/>
                <circle cx="100" cy="50" r="4" fill="#FF9933"/>
              </pattern>

              {/* Lotus Pattern (National Flower) */}
              <pattern id="lotus-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <ellipse cx="100" cy="100" rx="15" ry="25" fill="none" stroke="#FF9933" strokeWidth="2" opacity="0.6"/>
                <ellipse cx="100" cy="100" rx="25" ry="15" fill="none" stroke="#FF9933" strokeWidth="2" opacity="0.6"/>
                <circle cx="100" cy="100" r="8" fill="#FF9933" opacity="0.4"/>
              </pattern>

              {/* Indian Border Pattern */}
              <pattern id="border-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M25,25 L25,75 L75,75 L75,25 Z" fill="none" stroke="#000080" strokeWidth="1.5" opacity="0.3"/>
                <circle cx="25" cy="25" r="3" fill="#FF9933" opacity="0.5"/>
                <circle cx="75" cy="25" r="3" fill="#138808" opacity="0.5"/>
                <circle cx="75" cy="75" r="3" fill="#FF9933" opacity="0.5"/>
                <circle cx="25" cy="75" r="3" fill="#138808" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#page-crop-pattern)"/>
            <rect width="100%" height="100%" fill="url(#lotus-pattern)"/>
            <rect width="100%" height="100%" fill="url(#border-pattern)"/>
          </svg>
        </div>

        {/* Ashoka Chakra - Very Subtle Background Element */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
          <svg width="600" height="600" viewBox="0 0 200 200" className="animate-spin-very-slow">
            <circle cx="100" cy="100" r="70" fill="none" stroke="#000080" strokeWidth="2"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#000080" strokeWidth="1"/>
            {[...Array(24)].map((_, i) => {
              const angle = (i * 15 * Math.PI) / 180;
              const x1 = 100 + 70 * Math.cos(angle);
              const y1 = 100 + 70 * Math.sin(angle);
              const x2 = 100 + 35 * Math.cos(angle);
              const y2 = 100 + 35 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000080" strokeWidth="2"/>;
            })}
            <circle cx="100" cy="100" r="12" fill="#000080"/>
          </svg>
        </div>

        {/* Decorative Corners - Tri-color */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
          <div className="w-full h-1/3" style={{ background: '#FF9933' }}/>
          <div className="w-full h-1/3" style={{ background: '#FFFFFF' }}/>
          <div className="w-full h-1/3" style={{ background: '#138808' }}/>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
          <div className="w-full h-1/3" style={{ background: '#138808' }}/>
          <div className="w-full h-1/3" style={{ background: '#FFFFFF' }}/>
          <div className="w-full h-1/3" style={{ background: '#FF9933' }}/>
        </div>

        {/* Top Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1" style={{ background: '#FF9933' }}/>
          <div className="flex-1" style={{ background: '#FFFFFF', boxShadow: '0 0 2px #000080' }}/>
          <div className="flex-1" style={{ background: '#138808' }}/>
        </div>

        {/* Bottom Border Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="flex-1" style={{ background: '#138808' }}/>
          <div className="flex-1" style={{ background: '#FFFFFF', boxShadow: '0 0 2px #000080' }}/>
          <div className="flex-1" style={{ background: '#FF9933' }}/>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default IndianBackground;

