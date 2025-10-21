// Crop Recommendation API service - Connected to FastAPI backend
const API_BASE_URL = 'http://localhost:8000/api';

// Transform frontend form data to backend API format
const transformFormDataToAPIFormat = (formData) => {
  return {
    N: parseFloat(formData.soilData.nitrogen),
    P: parseFloat(formData.soilData.phosphorus),
    K: parseFloat(formData.soilData.potassium),
    temperature: parseFloat(formData.weather.temperature),
    humidity: parseFloat(formData.weather.humidity),
    ph: parseFloat(formData.soilData.ph),
    rainfall: parseFloat(formData.weather.rainfall)
  };
};

// Transform backend response to frontend format
const transformBackendResponse = (backendData, originalFormData) => {
  const recommendations = backendData.recommendations.map(rec => ({
    crop: rec.crop.charAt(0).toUpperCase() + rec.crop.slice(1), // Capitalize first letter
    yield: Math.round(rec.score * 4000).toString(), // Convert score to estimated yield
    score: Math.round(rec.score * 100), // Convert to percentage
    reason: rec.reason,
    profitability: rec.score > 0.8 ? "High" : rec.score > 0.6 ? "Medium" : "Low",
    difficulty: "Medium", // Default for now
    season: getSeason(rec.crop),
    waterRequirement: getWaterRequirement(rec.crop),
    marketPrice: getMarketPrice(rec.crop),
    investmentRequired: getInvestmentRequired(rec.crop)
  }));

  return {
    recommendations,
    analysis: {
      soilHealth: backendData.analysis?.soil_health || "Good",
      weatherSuitability: backendData.analysis?.weather_suitability || "Good", 
      riskLevel: backendData.analysis?.risk_level || "Medium",
      recommendations: "AI-powered recommendations based on your specific conditions"
    }
  };
};

// Helper functions to add additional crop info based on agricultural data
const getSeason = (crop) => {
  const seasonMap = {
    'rice': 'Monsoon (Kharif)',
    'maize': 'Summer/Monsoon',
    'chickpea': 'Winter (Rabi)',
    'kidneybeans': 'Summer',
    'pigeonpeas': 'Monsoon (Kharif)',
    'mothbeans': 'Summer',
    'mungbean': 'Summer/Monsoon',
    'blackgram': 'Monsoon (Kharif)',
    'lentil': 'Winter (Rabi)'
  };
  return seasonMap[crop.toLowerCase()] || 'Seasonal';
};

const getWaterRequirement = (crop) => {
  const waterMap = {
    'rice': 'High',
    'maize': 'Medium',
    'chickpea': 'Low',
    'kidneybeans': 'Medium',
    'pigeonpeas': 'Medium',
    'mothbeans': 'Low',
    'mungbean': 'Medium',
    'blackgram': 'Medium',
    'lentil': 'Low'
  };
  return waterMap[crop.toLowerCase()] || 'Medium';
};

const getMarketPrice = (crop) => {
  // Average prices per quintal in INR (₹)
  const priceMap = {
    'rice': 2200,
    'maize': 1800,
    'chickpea': 5000,
    'kidneybeans': 6000,
    'pigeonpeas': 5500,
    'mothbeans': 4000,
    'mungbean': 6500,
    'blackgram': 5800,
    'lentil': 5200
  };
  return priceMap[crop.toLowerCase()] || 3000;
};

const getInvestmentRequired = (crop) => {
  // Investment per hectare in INR (₹)
  const investmentMap = {
    'rice': 40000,
    'maize': 30000,
    'chickpea': 25000,
    'kidneybeans': 35000,
    'pigeonpeas': 28000,
    'mothbeans': 22000,
    'mungbean': 30000,
    'blackgram': 28000,
    'lentil': 25000
  };
  return investmentMap[crop.toLowerCase()] || 30000;
};

// Main prediction function
export const getCropRecommendations = async (formData) => {
  try {
    console.log('Making API call to backend...', formData);
    
    // Transform frontend data to backend format
    const apiData = transformFormDataToAPIFormat(formData);
    console.log('Transformed API data:', apiData);

    // Add farm_id if available for storing recommendation
    const queryParams = formData.farmId ? `?farm_id=${formData.farmId}` : '';
    
    // Make API call to FastAPI backend
    const response = await fetch(`${API_BASE_URL}/predict${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const backendData = await response.json();
    console.log('Backend response:', backendData);
    
    // Transform backend response to frontend format
    const transformedData = transformBackendResponse(backendData, formData);
    console.log('Transformed frontend data:', transformedData);
    
    return transformedData;

  } catch (error) {
    console.error('Error getting crop recommendations:', error);
    throw error; // Re-throw to let the UI handle the error
  }
};

// Additional API functions for future use

export const getWeatherData = async (location) => {
  try {
    // This would integrate with a weather API like OpenWeatherMap
    const response = await fetch(`${API_BASE_URL}/weather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export const getSoilData = async (location) => {
  try {
    // This would integrate with soil database APIs
    const response = await fetch(`${API_BASE_URL}/soil`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching soil data:', error);
    return null;
  }
};

export const getMarketPrices = async (crops, location) => {
  try {
    // This would integrate with market price APIs
    const response = await fetch(`${API_BASE_URL}/market-prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ crops, location })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching market prices:', error);
    return null;
  }
};

// Submit feedback to backend
export const submitFeedback = async (feedbackData) => {
  try {
    console.log('Submitting feedback to backend...', feedbackData);
    
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Feedback submitted successfully:', result);
    
    return result;

  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

// Get recommendation history for a farm
export const getRecommendationHistory = async (farmId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendation/${farmId}/history`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recommendation history:', error);
    return null;
  }
};

// Create or get farm profile
export const createFarm = async (farmData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/farms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(farmData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating farm:', error);
    throw error;
  }
};

// Check API health
export const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

export default {
  getCropRecommendations,
  submitFeedback,
  getRecommendationHistory,
  createFarm,
  checkAPIHealth,
  getWeatherData,
  getSoilData,
  getMarketPrices
};
