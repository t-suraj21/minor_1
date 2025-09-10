from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any
import logging
from datetime import datetime

from ..models import (
    CropPredictionRequest, 
    CropPredictionResponse, 
    CropRecommendation,
    Recommendation
)
from ..ml.model import CropRecommendationModel
from ..db import database_ops

# Configure logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/api", tags=["predictions"])

# Global model instance
crop_model = CropRecommendationModel()

async def get_ml_model():
    """Dependency to get ML model instance"""
    global crop_model
    
    # Load model if not already loaded
    if crop_model.model is None:
        success = crop_model.load_model()
        if not success:
            # Try to train model if not found
            logger.info("Model not found, training new model...")
            success = crop_model.train_model()
            if not success:
                raise HTTPException(
                    status_code=500, 
                    detail="Failed to load or train ML model"
                )
    
    return crop_model

@router.post("/predict", response_model=CropPredictionResponse)
async def predict_crop(
    request: CropPredictionRequest,
    farm_id: str = None,
    model: CropRecommendationModel = Depends(get_ml_model)
):
    """
    Predict the best crops for given soil and weather conditions
    
    - **N**: Nitrogen content in soil (kg/ha)
    - **P**: Phosphorus content in soil (kg/ha) 
    - **K**: Potassium content in soil (kg/ha)
    - **temperature**: Average temperature (°C)
    - **humidity**: Relative humidity (%)
    - **ph**: pH value of soil
    - **rainfall**: Annual rainfall (mm)
    - **farm_id**: Optional farm identifier for storing recommendation
    """
    try:
        # Convert request to dictionary
        features = request.dict()
        
        # Get predictions from ML model
        predictions = model.predict_crop(features)
        
        if not predictions:
            raise HTTPException(
                status_code=500,
                detail="Failed to generate crop recommendations"
            )
        
        # Convert predictions to response format
        recommendations = [
            CropRecommendation(
                crop=pred["crop"],
                score=pred["score"], 
                reason=pred["reason"]
            )
            for pred in predictions
        ]
        
        # Additional analysis
        analysis = {
            "soil_health": _assess_soil_health(features),
            "weather_suitability": _assess_weather_suitability(features),
            "risk_level": _assess_risk_level(features),
            "recommendations_count": len(recommendations)
        }
        
        # Store recommendation in database if farm_id provided
        if farm_id:
            try:
                recommendation_data = Recommendation(
                    farm_id=farm_id,
                    input_data=request,
                    recommendations=recommendations,
                    created_at=datetime.utcnow()
                ).dict()
                
                recommendation_id = await database_ops.create_recommendation(recommendation_data)
                analysis["recommendation_id"] = recommendation_id
                
            except Exception as e:
                logger.warning(f"Failed to store recommendation: {e}")
        
        return CropPredictionResponse(
            recommendations=recommendations,
            analysis=analysis
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in crop prediction: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@router.get("/predict/health")
async def prediction_health():
    """Health check endpoint for prediction service"""
    try:
        model = await get_ml_model()
        
        # Test prediction with sample data
        test_features = {
            'N': 90,
            'P': 42, 
            'K': 43,
            'temperature': 25,
            'humidity': 80,
            'ph': 6.5,
            'rainfall': 200
        }
        
        predictions = model.predict_crop(test_features)
        
        return {
            "status": "healthy",
            "model_loaded": model.model is not None,
            "test_prediction_count": len(predictions) if predictions else 0,
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }

def _assess_soil_health(features: Dict[str, Any]) -> str:
    """Assess overall soil health based on NPK and pH values"""
    n, p, k, ph = features['N'], features['P'], features['K'], features['ph']
    
    # Define optimal ranges
    optimal_ranges = {
        'N': (40, 120),
        'P': (20, 60), 
        'K': (20, 60),
        'ph': (6.0, 7.5)
    }
    
    score = 0
    total_factors = 4
    
    # Check each factor
    if optimal_ranges['N'][0] <= n <= optimal_ranges['N'][1]:
        score += 1
    if optimal_ranges['P'][0] <= p <= optimal_ranges['P'][1]:
        score += 1
    if optimal_ranges['K'][0] <= k <= optimal_ranges['K'][1]:
        score += 1
    if optimal_ranges['ph'][0] <= ph <= optimal_ranges['ph'][1]:
        score += 1
    
    percentage = (score / total_factors) * 100
    
    if percentage >= 80:
        return "Excellent"
    elif percentage >= 60:
        return "Good" 
    elif percentage >= 40:
        return "Fair"
    else:
        return "Poor"

def _assess_weather_suitability(features: Dict[str, Any]) -> str:
    """Assess weather suitability for crop growth"""
    temp, humidity, rainfall = features['temperature'], features['humidity'], features['rainfall']
    
    score = 0
    total_factors = 3
    
    # Temperature assessment (20-30°C is generally good for most crops)
    if 20 <= temp <= 30:
        score += 1
    elif 15 <= temp <= 35:
        score += 0.5
    
    # Humidity assessment (50-80% is generally good)
    if 50 <= humidity <= 80:
        score += 1
    elif 40 <= humidity <= 90:
        score += 0.5
    
    # Rainfall assessment (100-300mm is generally good)
    if 100 <= rainfall <= 300:
        score += 1
    elif 50 <= rainfall <= 400:
        score += 0.5
    
    percentage = (score / total_factors) * 100
    
    if percentage >= 80:
        return "Excellent"
    elif percentage >= 60:
        return "Good"
    elif percentage >= 40:
        return "Moderate"
    else:
        return "Poor"

def _assess_risk_level(features: Dict[str, Any]) -> str:
    """Assess overall risk level for crop cultivation"""
    soil_health = _assess_soil_health(features)
    weather_suitability = _assess_weather_suitability(features)
    
    # Risk matrix
    risk_matrix = {
        ("Excellent", "Excellent"): "Very Low",
        ("Excellent", "Good"): "Low",
        ("Excellent", "Moderate"): "Low", 
        ("Excellent", "Poor"): "Medium",
        ("Good", "Excellent"): "Low",
        ("Good", "Good"): "Low",
        ("Good", "Moderate"): "Medium",
        ("Good", "Poor"): "Medium",
        ("Fair", "Excellent"): "Medium",
        ("Fair", "Good"): "Medium",
        ("Fair", "Moderate"): "Medium",
        ("Fair", "Poor"): "High",
        ("Poor", "Excellent"): "Medium",
        ("Poor", "Good"): "High",
        ("Poor", "Moderate"): "High",
        ("Poor", "Poor"): "Very High"
    }
    
    return risk_matrix.get((soil_health, weather_suitability), "Medium")
