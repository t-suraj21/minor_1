const ModernCard = ({ children, className = '', hover = true, gradient = false }) => {
  return (
    <div 
      className={`
        bg-white rounded-2xl shadow-lg border border-gray-100
        ${hover ? 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300' : ''}
        ${gradient ? 'bg-gradient-to-br from-white to-green-50' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ModernCard;

