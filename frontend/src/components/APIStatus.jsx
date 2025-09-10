import { useState, useEffect } from 'react';
import { checkAPIHealth } from '../services/api';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';

const APIStatus = () => {
  const [isOnline, setIsOnline] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkStatus = async () => {
    setIsChecking(true);
    try {
      const status = await checkAPIHealth();
      setIsOnline(status);
    } catch (error) {
      setIsOnline(false);
    }
    setIsChecking(false);
  };

  useEffect(() => {
    checkStatus();
    
    // Check status every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isOnline === null) {
    return null; // Don't show anything while initial check is loading
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 ${
        isOnline 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-red-100 text-red-800 border border-red-200'
      }`}>
        {isChecking ? (
          <AlertCircle className="h-4 w-4 animate-spin" />
        ) : isOnline ? (
          <Wifi className="h-4 w-4" />
        ) : (
          <WifiOff className="h-4 w-4" />
        )}
        <span>
          {isChecking ? 'Checking...' : isOnline ? 'API Connected' : 'API Offline'}
        </span>
      </div>
    </div>
  );
};

export default APIStatus;
