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
  MessageSquare
} from 'lucide-react';
import { submitFeedback } from '../services/api';

const Results = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  // Mock API function to generate recommendations
  const generateMockRecommendations = (data) => {
    const mockRecommendations = [
      {
        crop: "Wheat",
        yield: "3200",
        score: 92,
        reason: "Optimal nitrogen levels and suitable temperature range. High confidence based on soil pH and rainfall patterns.",
        profitability: "High",
        difficulty: "Easy",
        season: "Winter",
        waterRequirement: "Medium"
      },
      {
        crop: "Rice",
        yield: "2800",
        score: 87,
        reason: "Excellent soil moisture retention and pH levels. Good match for your irrigation type and climate conditions.",
        profitability: "Medium",
        difficulty: "Medium",
        season: "Monsoon",
        waterRequirement: "High"
      },
      {
        crop: "Maize",
        yield: "2600",
        score: 81,
        reason: "Adequate temperature range and good potassium levels. Suitable for your budget and preferred growing conditions.",
        profitability: "Medium",
        difficulty: "Easy",
        season: "Summer",
        waterRequirement: "Medium"
      }
    ];

    // If user selected preferred crops, prioritize them
    if (data?.preferences?.preferredCrops?.length > 0) {
      const preferredRecommendations = mockRecommendations.filter(rec => 
        data.preferences.preferredCrops.includes(rec.crop)
      );
      const otherRecommendations = mockRecommendations.filter(rec => 
        !data.preferences.preferredCrops.includes(rec.crop)
      );
      return [...preferredRecommendations, ...otherRecommendations].slice(0, 3);
    }

    return mockRecommendations;
  };

  useEffect(() => {
    // Get form data from sessionStorage
    const storedData = sessionStorage.getItem('cropFormData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setFormData(data);
      
      // Simulate API call delay
      setTimeout(() => {
        const mockRecs = generateMockRecommendations(data);
        setRecommendations(mockRecs);
      }, 1000);
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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Crop Recommendations
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Based on your farm conditions in <span className="font-semibold text-green-600">{formData.location}</span>
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/input"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Form
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Generate New Analysis
            </button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Soil Analysis</h3>
            </div>
            <p className="text-gray-600 text-sm">
              pH: {formData.soilData.ph} | N: {formData.soilData.nitrogen}kg/ha | 
              P: {formData.soilData.phosphorus}kg/ha | K: {formData.soilData.potassium}kg/ha
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-gray-900">Weather Conditions</h3>
            </div>
            <p className="text-gray-600 text-sm">
              {formData.weather.temperature}°C | {formData.weather.rainfall}mm rainfall | 
              {formData.weather.humidity}% humidity
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Target className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Your Preferences</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Budget: {formData.preferences.budget} | 
              Irrigation: {formData.soilData.irrigationType}
            </p>
          </div>
        </motion.div>

        {/* Loading State */}
        {recommendations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing your data and generating recommendations...</p>
          </motion.div>
        )}

        {/* Recommendations Grid */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Wheat className="h-8 w-8" />
                      <h3 className="text-2xl font-bold">{rec.crop}</h3>
                    </div>
                    {index === 0 && (
                      <Award className="h-6 w-6 text-yellow-300" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{rec.yield}</p>
                      <p className="text-sm opacity-90">kg/hectare</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{rec.score}%</p>
                      <p className="text-sm opacity-90">confidence</p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Confidence Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Confidence Score</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(rec.score)}`}>
                      {rec.score}%
                    </span>
                  </div>

                  {/* Expected Yield */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Expected Yield</span>
                    <span className="text-sm font-bold text-gray-900">{rec.yield} kg/ha</span>
                  </div>

                  {/* Profitability */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Profitability</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getProfitabilityColor(rec.profitability)}`}>
                      {rec.profitability}
                    </span>
                  </div>

                  {/* Growing Season */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Best Season</span>
                    <span className="text-sm text-gray-900">{rec.season}</span>
                  </div>

                  {/* Water Requirement */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Water Need</span>
                    <span className="text-sm text-gray-900">{rec.waterRequirement}</span>
                  </div>

                  {/* Explanation */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Why this crop?</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{rec.reason}</p>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Section */}
                  <div className="pt-4 border-t border-gray-100">
                    {!feedbackSubmitted[rec.crop] ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Was this helpful?</span>
                          <button
                            onClick={() => toggleFeedback(rec.crop)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <MessageSquare className="h-4 w-4 inline mr-1" />
                            Feedback
                          </button>
                        </div>
                        
                        {showFeedback[rec.crop] && (
                          <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleFeedback(rec.crop, true, 5)}
                                className="flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                              >
                                <ThumbsUp className="h-4 w-4" />
                                <span>Accept</span>
                              </button>
                              <button
                                onClick={() => handleFeedback(rec.crop, false, 2)}
                                className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
                              >
                                <ThumbsDown className="h-4 w-4" />
                                <span>Decline</span>
                              </button>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-600">Rate:</span>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => handleFeedback(rec.crop, true, star)}
                                  className="text-yellow-400 hover:text-yellow-500"
                                >
                                  <Star className="h-4 w-4" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <span className="text-sm text-gray-600">
                          {feedbackSubmitted[rec.crop].accepted ? '✅ Accepted' : '❌ Declined'} 
                          {feedbackSubmitted[rec.crop].rating && (
                            <span className="ml-2">
                              {'⭐'.repeat(feedbackSubmitted[rec.crop].rating)}
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Ranking Badge */}
                  {index === 0 && (
                    <div className="flex items-center justify-center pt-2">
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1">
                        <Award className="h-3 w-3" />
                        <span>Top Recommendation</span>
                      </span>
                    </div>
                  )}
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
            className="mt-12 bg-blue-50 rounded-xl p-8"
          >
            <div className="text-center">
              <Info className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Important Notes
              </h3>
              <div className="text-gray-700 space-y-2 max-w-4xl mx-auto">
                <p>
                  • These recommendations are based on the data you provided and our AI analysis.
                </p>
                <p>
                  • Consider consulting with local agricultural experts for region-specific advice.
                </p>
                <p>
                  • Market prices and demand should also be factored into your final decision.
                </p>
                <p>
                  • Monitor weather forecasts and soil conditions regularly for optimal results.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Results;
