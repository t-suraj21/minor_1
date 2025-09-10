import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Droplets, 
  Thermometer, 
  Cloud, 
  DollarSign, 
  Wheat,
  Send,
  Loader2
} from 'lucide-react';

const InputForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
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
    },
    preferences: {
      budget: '',
      preferredCrops: []
    }
  });

  const irrigationTypes = [
    { value: 'drip', label: 'Drip Irrigation' },
    { value: 'sprinkler', label: 'Sprinkler System' },
    { value: 'flood', label: 'Flood Irrigation' },
    { value: 'furrow', label: 'Furrow Irrigation' },
    { value: 'none', label: 'Rain-fed' }
  ];

  const cropOptions = [
    'Wheat', 'Rice', 'Maize', 'Barley', 'Soybean', 'Cotton', 
    'Sugarcane', 'Potato', 'Tomato', 'Onion', 'Carrot', 'Cabbage'
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

  const handleCropSelection = (crop) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        preferredCrops: prev.preferences.preferredCrops.includes(crop)
          ? prev.preferences.preferredCrops.filter(c => c !== crop)
          : [...prev.preferences.preferredCrops, crop]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store form data in sessionStorage for the results page
      sessionStorage.setItem('cropFormData', JSON.stringify(formData));
      setLoading(false);
      navigate('/results');
    }, 2000);
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
            Provide your farm details to receive personalized crop suggestions
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* Location Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Location</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farm Location
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleInputChange(null, 'location', e.target.value)}
                placeholder="e.g., Punjab, India or California, USA"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

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

          {/* Preferences Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Your Preferences</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range (per hectare)
              </label>
              <select
                value={formData.preferences.budget}
                onChange={(e) => handleInputChange('preferences', 'budget', e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              >
                <option value="">Select budget range</option>
                <option value="low">Low ($500 - $1,500)</option>
                <option value="medium">Medium ($1,500 - $3,000)</option>
                <option value="high">High ($3,000+)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Preferred Crops (Select multiple)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cropOptions.map(crop => (
                  <label
                    key={crop}
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.preferences.preferredCrops.includes(crop)
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.preferences.preferredCrops.includes(crop)}
                      onChange={() => handleCropSelection(crop)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <Wheat className="h-4 w-4" />
                    <span className="text-sm">{crop}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

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
