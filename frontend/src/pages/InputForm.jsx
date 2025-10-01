import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Droplets, 
  Thermometer, 
  Cloud, 
  Send,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { getCropRecommendations } from '../services/api';

const InputForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    soilData: {
      ph: '',
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      irrigationType: 'drip'
    },
    weather: {
      temperature: '',
      rainfall: '',
      humidity: ''
    }
  });

  const irrigationTypes = [
    { value: 'drip', label: 'Drip Irrigation' },
    { value: 'sprinkler', label: 'Sprinkler System' },
    { value: 'flood', label: 'Flood Irrigation' },
    { value: 'furrow', label: 'Furrow Irrigation' },
    { value: 'none', label: 'Rain-fed' }
  ];


  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Call the real API
      const recommendations = await getCropRecommendations(formData);
      
      // Store form data and recommendations in sessionStorage for the results page
      sessionStorage.setItem('cropFormData', JSON.stringify(formData));
      sessionStorage.setItem('cropRecommendations', JSON.stringify(recommendations));
      
      setLoading(false);
      navigate('/results');
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setError(error.message || 'Failed to get crop recommendations. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your Crop Recommendations
          </h1>
          <p className="text-xl text-gray-600">
            Provide your soil and weather data to receive AI-powered crop suggestions
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >

          {/* Soil Data Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Droplets className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Soil Data</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  pH Level
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  required
                  value={formData.soilData.ph}
                  onChange={(e) => handleInputChange('soilData', 'ph', e.target.value)}
                  placeholder="6.5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nitrogen (N) - kg/ha
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.soilData.nitrogen}
                  onChange={(e) => handleInputChange('soilData', 'nitrogen', e.target.value)}
                  placeholder="120"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phosphorus (P) - kg/ha
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.soilData.phosphorus}
                  onChange={(e) => handleInputChange('soilData', 'phosphorus', e.target.value)}
                  placeholder="40"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Potassium (K) - kg/ha
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.soilData.potassium}
                  onChange={(e) => handleInputChange('soilData', 'potassium', e.target.value)}
                  placeholder="60"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Irrigation Type
              </label>
              <select
                value={formData.soilData.irrigationType}
                onChange={(e) => handleInputChange('soilData', 'irrigationType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              >
                {irrigationTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Weather Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Cloud className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Weather Conditions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Temperature (°C)
                </label>
                <div className="relative">
                  <Thermometer className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.weather.temperature}
                    onChange={(e) => handleInputChange('weather', 'temperature', e.target.value)}
                    placeholder="25"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Rainfall (mm)
                </label>
                <div className="relative">
                  <Droplets className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.weather.rainfall}
                    onChange={(e) => handleInputChange('weather', 'rainfall', e.target.value)}
                    placeholder="800"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Humidity (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={formData.weather.humidity}
                  onChange={(e) => handleInputChange('weather', 'humidity', e.target.value)}
                  placeholder="65"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>


          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing your data...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Get Recommendations</span>
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default InputForm;
