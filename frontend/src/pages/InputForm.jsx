import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Droplets, 
  Thermometer, 
  Cloud, 
  Send,
  Leaf,
  Beaker,
  Wind,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { getCropRecommendations } from '../services/api';
import ModernInput from '../components/ModernInput';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

const InputForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });


  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-6">
            <Leaf className="h-4 w-4" />
            <span className="text-sm font-semibold">AI-Powered Analysis</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Get Your Crop <span className="text-green-600">Recommendations</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Provide your soil and weather data to receive AI-powered crop suggestions tailored to your farm
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Info Alert */}
          <Alert 
            type="info" 
            title="Quick Tip" 
            message="For best results, use recent soil test data and current weather averages for your location."
          />

          {/* Soil Data Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <Beaker className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Soil Analysis</h2>
                <p className="text-sm text-gray-600">Enter your soil nutrient levels and pH</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernInput
                label="Nitrogen (N) - kg/ha"
                type="number"
                min="0"
                max="300"
                required
                value={formData.N}
                onChange={(e) => handleInputChange('N', e.target.value)}
                placeholder="90"
                icon={<Leaf className="h-5 w-5" />}
                helperText="Range: 0-300 kg/ha"
              />
              
              <ModernInput
                label="Phosphorus (P) - kg/ha"
                type="number"
                min="0"
                max="150"
                required
                value={formData.P}
                onChange={(e) => handleInputChange('P', e.target.value)}
                placeholder="42"
                icon={<Leaf className="h-5 w-5" />}
                helperText="Range: 0-150 kg/ha"
              />
              
              <ModernInput
                label="Potassium (K) - kg/ha"
                type="number"
                min="0"
                max="100"
                required
                value={formData.K}
                onChange={(e) => handleInputChange('K', e.target.value)}
                placeholder="43"
                icon={<Leaf className="h-5 w-5" />}
                helperText="Range: 0-100 kg/ha"
              />
              
              <ModernInput
                label="pH Level"
                type="number"
                step="0.1"
                min="3"
                max="10"
                required
                value={formData.ph}
                onChange={(e) => handleInputChange('ph', e.target.value)}
                placeholder="6.5"
                icon={<Droplets className="h-5 w-5" />}
                helperText="Range: 3.0 - 10.0 (Optimal: 6.0-7.5)"
              />
            </div>
          </div>

          {/* Weather Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <Cloud className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Weather Conditions</h2>
                <p className="text-sm text-gray-600">Enter average weather data for your location</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ModernInput
                label="Temperature (°C)"
                type="number"
                step="0.1"
                min="-10"
                max="50"
                required
                value={formData.temperature}
                onChange={(e) => handleInputChange('temperature', e.target.value)}
                placeholder="20.88"
                icon={<Thermometer className="h-5 w-5" />}
                helperText="Range: -10°C to 50°C"
              />
              
              <ModernInput
                label="Humidity (%)"
                type="number"
                step="0.1"
                min="0"
                max="100"
                required
                value={formData.humidity}
                onChange={(e) => handleInputChange('humidity', e.target.value)}
                placeholder="82.0"
                icon={<Wind className="h-5 w-5" />}
                helperText="Range: 0-100%"
              />
              
              <ModernInput
                label="Rainfall (mm)"
                type="number"
                step="0.1"
                min="0"
                max="500"
                required
                value={formData.rainfall}
                onChange={(e) => handleInputChange('rainfall', e.target.value)}
                placeholder="202.9"
                icon={<Droplets className="h-5 w-5" />}
                helperText="Range: 0-500 mm"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert 
              type="error" 
              title="Error"
              message={error}
              onClose={() => setError(null)}
            />
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl"
          >
            <Send className="h-6 w-6" />
            <span>Get AI Recommendations</span>
          </motion.button>

          {/* Helper Text */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border-2 border-blue-100">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Pro Tips for Best Results</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Use recent soil test results (within the last 6 months)</li>
                  <li>• Enter annual average weather data, not current conditions</li>
                  <li>• Ensure all values are within the specified ranges</li>
                  <li>• pH optimal range is 6.0-7.5 for most crops</li>
                  <li>• Consult with local agricultural experts for accurate soil data</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default InputForm;
