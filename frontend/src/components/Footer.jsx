import { Mail, Phone, MapPin, Leaf, Heart, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <Leaf className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-black"><span className="text-green-400">CRS</span></span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
              Empowering farmers with cutting-edge AI technology for smarter crop recommendations. 
              Make data-driven decisions to maximize yield and sustainability.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for Indian Farmers</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Contact Us</h3>
            <div className="space-y-4">
              <a href="mailto:support@crs.com" className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors group">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-900 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm">support@crs.com</span>
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors group">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-900 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm">+1 (555) 123-4567</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm">New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-green-400 text-sm transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:w-3 transition-all"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/input" className="text-gray-300 hover:text-green-400 text-sm transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:w-3 transition-all"></span>
                  Get Recommendations
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-green-400 text-sm transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:w-3 transition-all"></span>
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 text-sm transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:w-3 transition-all"></span>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 <span className="font-semibold text-green-400">CRS</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-blue-600 transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-blue-700 transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-blue-500 transition-all">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
