import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import APIStatus from './components/APIStatus';
import Chatbot from './components/Chatbot';
import ChatbotButton from './components/ChatbotButton';
import SplashScreen from './components/SplashScreen';
import Landing from './pages/Landing';
import InputForm from './pages/InputForm';
import Results from './pages/Results';
import About from './pages/About';
import './App.css';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Prevent scrolling while splash screen is visible
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSplash]);

  return (
    <>
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {/* Main Application */}
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <APIStatus />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/input" element={<InputForm />} />
              <Route path="/results" element={<Results />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          
          <Footer />
          
          {/* Chatbot Components */}
          <ChatbotButton onClick={toggleChatbot} isOpen={isChatbotOpen} />
          <Chatbot isOpen={isChatbotOpen} onClose={toggleChatbot} />
        </div>
      </Router>
    </>
  );
}

export default App;
