from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler):
        from pydantic_core import core_schema
        return core_schema.no_info_plain_validator_function(cls.validate)

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")
        return field_schema

# Request Models
class CropPredictionRequest(BaseModel):
    N: float = Field(..., ge=0, le=300, description="Nitrogen content in soil (kg/ha)")
    P: float = Field(..., ge=0, le=150, description="Phosphorus content in soil (kg/ha)")
    K: float = Field(..., ge=0, le=100, description="Potassium content in soil (kg/ha)")
    temperature: float = Field(..., ge=-10, le=50, description="Average temperature (°C)")
    humidity: float = Field(..., ge=0, le=100, description="Relative humidity (%)")
    ph: float = Field(..., ge=3, le=10, description="pH value of soil")
    rainfall: float = Field(..., ge=0, le=500, description="Annual rainfall (mm)")
    
    class Config:
        json_schema_extra = {
            "example": {
                "N": 90,
                "P": 42,
                "K": 43,
                "temperature": 25,
                "humidity": 80,
                "ph": 6.5,
                "rainfall": 200
            }
        }

class FeedbackRequest(BaseModel):
    farm_id: str = Field(..., description="Unique farm identifier")
    crop: str = Field(..., description="Recommended crop name")
    accepted: bool = Field(..., description="Whether the recommendation was accepted")
    rating: Optional[int] = Field(None, ge=1, le=5, description="Rating from 1-5")
    comments: Optional[str] = Field(None, description="Additional feedback comments")
    
    class Config:
        json_schema_extra = {
            "example": {
                "farm_id": "farm_123",
                "crop": "rice",
                "accepted": True,
                "rating": 4,
                "comments": "Good recommendation, high yield achieved"
            }
        }

# Response Models
class CropRecommendation(BaseModel):
    crop: str = Field(..., description="Recommended crop name")
    score: float = Field(..., ge=0, le=1, description="Confidence score (0-1)")
    reason: str = Field(..., description="Explanation for the recommendation")
    
    class Config:
        json_schema_extra = {
            "example": {
                "crop": "rice",
                "score": 0.92,
                "reason": "High nitrogen content and suitable rainfall for rice cultivation"
            }
        }

class CropPredictionResponse(BaseModel):
    recommendations: List[CropRecommendation] = Field(..., description="Top 3 crop recommendations")
    analysis: Optional[dict] = Field(None, description="Additional analysis information")
    
    class Config:
        json_schema_extra = {
            "example": {
                "recommendations": [
                    {
                        "crop": "rice",
                        "score": 0.92,
                        "reason": "High nitrogen content and suitable rainfall"
                    },
                    {
                        "crop": "maize",
                        "score": 0.80,
                        "reason": "Suitable temperature and moderate nutrients"
                    },
                    {
                        "crop": "wheat",
                        "score": 0.75,
                        "reason": "Balanced nutrients and pH levels"
                    }
                ]
            }
        }

class FeedbackResponse(BaseModel):
    message: str = Field(..., description="Response message")
    feedback_id: str = Field(..., description="Unique feedback identifier")
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "Feedback saved successfully",
                "feedback_id": "feedback_123"
            }
        }

# Database Models
class Farm(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    farm_id: str = Field(..., description="Unique farm identifier")
    owner_name: str = Field(..., description="Farm owner name")
    location: str = Field(..., description="Farm location")
    area: float = Field(..., description="Farm area in hectares")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class SoilReport(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    farm_id: str = Field(..., description="Associated farm identifier")
    N: float = Field(..., description="Nitrogen content")
    P: float = Field(..., description="Phosphorus content")
    K: float = Field(..., description="Potassium content")
    ph: float = Field(..., description="pH value")
    organic_matter: Optional[float] = Field(None, description="Organic matter percentage")
    test_date: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class Recommendation(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    farm_id: str = Field(..., description="Associated farm identifier")
    input_data: CropPredictionRequest = Field(..., description="Input parameters used")
    recommendations: List[CropRecommendation] = Field(..., description="Generated recommendations")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    season: Optional[str] = Field(None, description="Growing season")
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class Feedback(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    farm_id: str = Field(..., description="Associated farm identifier")
    recommendation_id: Optional[str] = Field(None, description="Associated recommendation ID")
    crop: str = Field(..., description="Crop that was recommended")
    accepted: bool = Field(..., description="Whether recommendation was accepted")
    rating: Optional[int] = Field(None, description="User rating")
    comments: Optional[str] = Field(None, description="User comments")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class RecommendationHistory(BaseModel):
    farm_id: str = Field(..., description="Farm identifier")
    recommendations: List[Recommendation] = Field(..., description="Historical recommendations")
    total_count: int = Field(..., description="Total number of recommendations")
    
    class Config:
        json_schema_extra = {
            "example": {
                "farm_id": "farm_123",
                "total_count": 5,
                "recommendations": []
            }
        }
