from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
import logging
from datetime import datetime

from ..models import (
    FeedbackRequest,
    FeedbackResponse, 
    Feedback,
    RecommendationHistory
)
from ..db import database_ops

# Configure logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/api", tags=["feedback"])

@router.post("/feedback", response_model=FeedbackResponse)
async def submit_feedback(feedback_request: FeedbackRequest):
    """
    Submit feedback for a crop recommendation
    
    - **farm_id**: Unique farm identifier
    - **crop**: Name of the recommended crop
    - **accepted**: Whether the recommendation was accepted
    - **rating**: Optional rating from 1-5
    - **comments**: Optional additional comments
    """
    try:
        # Create feedback record
        feedback_data = Feedback(
            farm_id=feedback_request.farm_id,
            crop=feedback_request.crop,
            accepted=feedback_request.accepted,
            rating=feedback_request.rating,
            comments=feedback_request.comments,
            created_at=datetime.utcnow()
        ).dict()
        
        # Store in database
        feedback_id = await database_ops.create_feedback(feedback_data)
        
        logger.info(f"Feedback submitted for farm {feedback_request.farm_id}, crop: {feedback_request.crop}")
        
        return FeedbackResponse(
            message="Feedback saved successfully",
            feedback_id=feedback_id
        )
        
    except Exception as e:
        logger.error(f"Error submitting feedback: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save feedback: {str(e)}"
        )

@router.get("/feedback/stats")
async def get_feedback_stats(crop: Optional[str] = Query(None, description="Filter by crop name")):
    """
    Get feedback statistics
    
    - **crop**: Optional crop name to filter statistics
    """
    try:
        stats = await database_ops.get_feedback_stats(crop=crop)
        
        return {
            "total_feedback": stats["total_feedback"],
            "accepted_count": stats["accepted_count"],
            "acceptance_rate": round(stats["acceptance_rate"] * 100, 2),
            "average_rating": round(stats.get("avg_rating", 0), 2) if stats.get("avg_rating") else None,
            "crops_with_feedback": stats["crops"],
            "filtered_by_crop": crop
        }
        
    except Exception as e:
        logger.error(f"Error getting feedback stats: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get feedback statistics: {str(e)}"
        )

@router.get("/recommendation/{farm_id}")
async def get_recommendation(farm_id: str):
    """
    Get the latest recommendation for a specific farm
    
    - **farm_id**: Unique farm identifier
    """
    try:
        recommendation = await database_ops.get_recommendation(farm_id)
        
        if not recommendation:
            raise HTTPException(
                status_code=404,
                detail=f"No recommendations found for farm {farm_id}"
            )
        
        return recommendation
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting recommendation: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get recommendation: {str(e)}"
        )

@router.get("/recommendation/{farm_id}/history")
async def get_recommendation_history(
    farm_id: str,
    limit: int = Query(10, ge=1, le=50, description="Number of recommendations to retrieve")
):
    """
    Get recommendation history for a specific farm
    
    - **farm_id**: Unique farm identifier
    - **limit**: Number of recommendations to retrieve (max 50)
    """
    try:
        recommendations = await database_ops.get_recommendation_history(farm_id, limit)
        
        return RecommendationHistory(
            farm_id=farm_id,
            recommendations=recommendations,
            total_count=len(recommendations)
        )
        
    except Exception as e:
        logger.error(f"Error getting recommendation history: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get recommendation history: {str(e)}"
        )

@router.get("/farms/{farm_id}/profile")
async def get_farm_profile(farm_id: str):
    """
    Get comprehensive farm profile including latest data
    
    - **farm_id**: Unique farm identifier
    """
    try:
        # Get farm details
        farm = await database_ops.get_farm(farm_id)
        if not farm:
            raise HTTPException(
                status_code=404,
                detail=f"Farm {farm_id} not found"
            )
        
        # Get latest soil report
        soil_report = await database_ops.get_latest_soil_report(farm_id)
        
        # Get latest recommendation
        recommendation = await database_ops.get_recommendation(farm_id)
        
        # Get feedback stats for this farm
        feedback_stats = await database_ops.get_feedback_stats()
        
        profile = {
            "farm_details": farm,
            "latest_soil_report": soil_report,
            "latest_recommendation": recommendation,
            "has_soil_data": soil_report is not None,
            "has_recommendations": recommendation is not None,
            "feedback_stats": feedback_stats
        }
        
        return profile
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting farm profile: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get farm profile: {str(e)}"
        )
