import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Wheat, 
  TrendingUp, 
  Target, 
  Info, 
  ArrowLeft, 
  RotateCcw,
  Award,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  Star,
  MessageSquare,
  Droplets,
  Thermometer,
  Leaf,
  CloudRain,
  DollarSign,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { submitFeedback } from '../services/api';
import StatsCard from '../components/StatsCard';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const Results = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState({});
  const [showFeedback, setShowFeedback] = useState({});


  useEffect(() => {
    // Get form data and recommendations from sessionStorage
    const storedData = sessionStorage.getItem('cropFormData');
    const storedRecommendations = sessionStorage.getItem('cropRecommendations');
    
    if (storedData && storedRecommendations) {
      const data = JSON.parse(storedData);
      const recs = JSON.parse(storedRecommendations);
      setFormData(data);
      setRecommendations(recs.recommendations || []);
    } else {
      // Redirect to input form if no data found
      navigate('/input');
    }
  }, [navigate]);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getProfitabilityColor = (level) => {
    switch (level) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleFeedback = async (cropName, accepted, rating = null) => {
    try {
      const farmId = `farm_${Date.now()}`; // Generate or use existing farm ID
      
      const feedbackData = {
        farm_id: farmId,
        crop: cropName.toLowerCase(),
        accepted: accepted,
        rating: rating,
        comments: accepted ? "Recommendation accepted" : "Recommendation declined"
      };

      await submitFeedback(feedbackData);
      
      setFeedbackSubmitted(prev => ({
        ...prev,
        [cropName]: { accepted, rating }
      }));

      setShowFeedback(prev => ({
        ...prev,
        [cropName]: false
      }));

    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  const toggleFeedback = (cropName) => {
    setShowFeedback(prev => ({
      ...prev,
      [cropName]: !prev[cropName]
    }));
  };

  if (!formData) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge variant="success" size="lg">
            <CheckCircle2 className="h-4 w-4" />
            Analysis Complete
          </Badge>
          <h1 className="text-5xl font-black text-gray-900 mb-4 mt-6">
            Your <span className="text-green-600">Crop Recommendations</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered suggestions based on your farm's unique conditions
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/input">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Form
              </motion.button>
            </Link>
            <motion.button
              onClick={() => window.location.reload()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              New Analysis
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <StatsCard
            title="pH Level"
            value={formData.ph}
            subtitle="Soil acidity"
            icon={<Droplets className="h-6 w-6" />}
            color="blue"
          />
          <StatsCard
            title="Temperature"
            value={`${formData.temperature}°C`}
            subtitle="Average temp"
            icon={<Thermometer className="h-6 w-6" />}
            color="orange"
          />
          <StatsCard
            title="Rainfall"
            value={`${formData.rainfall}mm`}
            subtitle="Rainfall"
            icon={<CloudRain className="h-6 w-6" />}
            color="blue"
          />
          <StatsCard
            title="Humidity"
            value={`${formData.humidity}%`}
            subtitle="Moisture level"
            icon={<Droplets className="h-6 w-6" />}
            color="purple"
          />
        </motion.div>

        {/* NPK Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Soil Nutrients (NPK)</h3>
              <p className="text-sm text-gray-600">Your soil's nutrient composition</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <ProgressBar 
                label="Nitrogen (N)" 
                value={formData.N} 
                max={200} 
                color="green"
              />
            </div>
            <div>
              <ProgressBar 
                label="Phosphorus (P)" 
                value={formData.P} 
                max={100} 
                color="blue"
              />
            </div>
            <div>
              <ProgressBar 
                label="Potassium (K)" 
                value={formData.K} 
                max={150} 
                color="orange"
              />
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {recommendations.length === 0 && (
          <LoadingSpinner fullScreen />
        )}

        {/* Recommendations Title */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Top Crop Recommendations
            </h2>
            <p className="text-gray-600">Ranked by suitability for your farm</p>
          </motion.div>
        )}

        {/* Recommendations Grid */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-green-300 transition-all"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r p-6 text-white relative overflow-hidden ${
                  index === 0 ? 'from-green-500 to-green-600' :
                  index === 1 ? 'from-blue-500 to-blue-600' :
                  'from-purple-500 to-purple-600'
                }`}>
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute transform rotate-12 -right-8 -top-8">
                      <Wheat className="h-32 w-32" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                          <Wheat className="h-7 w-7" />
                        </div>
                        <h3 className="text-2xl font-black">{rec.crop}</h3>
                      </div>
                      {index === 0 && (
                        <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                          <Award className="h-4 w-4" />
                          Best
                        </div>
                      )}
                      {index === 1 && (
                        <Badge variant="default" size="sm">2nd</Badge>
                      )}
                      {index === 2 && (
                        <Badge variant="default" size="sm">3rd</Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm opacity-90 mb-1">Expected Yield</p>
                        <p className="text-3xl font-bold">{rec.yield}</p>
                        <p className="text-xs opacity-80">kg/hectare</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-90 mb-1">Confidence</p>
                        <p className="text-3xl font-bold">{rec.score}%</p>
                        <div className="mt-1">
                          <ProgressBar value={rec.score} max={100} color="white" showValue={false} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-gray-600">Profitability</span>
                      </div>
                      <Badge variant={
                        rec.profitability === 'High' ? 'success' :
                        rec.profitability === 'Medium' ? 'warning' : 'error'
                      }>
                        {rec.profitability}
                      </Badge>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-medium text-gray-600">Best Season</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{rec.season}</p>
                    </div>
                  </div>

                  {/* Water Requirement */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-700">Water Need</span>
                      </div>
                      <Badge variant="info">{rec.waterRequirement}</Badge>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Info className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">Why this crop?</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{rec.reason}</p>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Section */}
                  <div className="pt-4 border-t border-gray-200">
                    {!feedbackSubmitted[rec.crop] ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">Was this helpful?</span>
                          <motion.button
                            onClick={() => toggleFeedback(rec.crop)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                          >
                            <MessageSquare className="h-4 w-4" />
                            Give Feedback
                          </motion.button>
                        </div>
                        
                        {showFeedback[rec.crop] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 space-y-3"
                          >
                            <div className="flex gap-2">
                              <motion.button
                                onClick={() => handleFeedback(rec.crop, true, 5)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all text-sm font-semibold shadow-md"
                              >
                                <ThumbsUp className="h-4 w-4" />
                                Accept
                              </motion.button>
                              <motion.button
                                onClick={() => handleFeedback(rec.crop, false, 2)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-sm font-semibold shadow-md"
                              >
                                <ThumbsDown className="h-4 w-4" />
                                Decline
                              </motion.button>
                            </div>
                            
                            <div className="flex items-center justify-center gap-2 pt-2 border-t border-gray-300">
                              <span className="text-xs font-medium text-gray-600">Rate:</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <motion.button
                                    key={star}
                                    onClick={() => handleFeedback(rec.crop, true, star)}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-yellow-400 hover:text-yellow-500 transition-colors"
                                  >
                                    <Star className="h-5 w-5 fill-current" />
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-3 bg-gray-50 rounded-xl">
                        <Badge variant={feedbackSubmitted[rec.crop].accepted ? 'success' : 'error'}>
                          {feedbackSubmitted[rec.crop].accepted ? (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Accepted
                            </>
                          ) : (
                            <>
                              ✕ Declined
                            </>
                          )}
                        </Badge>
                        {feedbackSubmitted[rec.crop].rating && (
                          <div className="mt-2 flex justify-center gap-1">
                            {Array.from({ length: feedbackSubmitted[rec.crop].rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Additional Information */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12"
          >
            <Alert 
              type="info"
              title="Important Considerations"
              message="These AI recommendations are based on your provided data. Always consult with local agricultural experts, consider market conditions, and monitor weather patterns for optimal results."
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Results;
