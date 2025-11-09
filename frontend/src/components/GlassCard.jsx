const GlassCard = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/20
        hover:bg-white/80 transition-all duration-300
        ${className}
      `}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;

