import { useState } from 'react';

const ChatbotButton = ({ onClick, isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Don't render anything if chat is open
  if (isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-6 right-6 z-[9999]" 
      style={{ zIndex: 9999 }}
    >
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-3 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none">
          💬 Chat with CRS Talk
          <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
        </div>
      )}

      {/* Pulse animation rings - behind button */}
      <div className="absolute inset-0 rounded-full bg-green-600 opacity-20 animate-ping-slow pointer-events-none" style={{ zIndex: -1 }}></div>
      <div className="absolute inset-0 rounded-full bg-green-600 opacity-20 animate-ping-slower pointer-events-none" style={{ zIndex: -1 }}></div>

      {/* Chat Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Chatbot button clicked!');
          onClick();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full p-5 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 cursor-pointer group"
        style={{ 
          zIndex: 10000,
          position: 'relative'
        }}
        aria-label="Open chatbot"
        type="button"
      >
        {/* Chat Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-7 w-7 transform group-hover:rotate-12 transition-transform duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
          />
        </svg>
        
        {/* Notification badge */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse" style={{ zIndex: 10001 }}>
          💬
        </span>
      </button>
    </div>
  );
};

export default ChatbotButton;

