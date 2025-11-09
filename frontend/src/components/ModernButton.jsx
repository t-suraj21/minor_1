const ModernButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 shadow-md hover:shadow-lg',
    saffron: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl',
    outline: 'bg-transparent border-2 border-gray-300 hover:border-green-600 hover:bg-green-50 text-gray-700 hover:text-green-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-xl font-semibold
        transition-all duration-300 transform hover:-translate-y-0.5
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </button>
  );
};

export default ModernButton;

