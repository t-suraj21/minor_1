from fastapi import APIRouter, HTTPException
from typing import List
import logging
from datetime import datetime

from ..models import Farm, SoilReport
from ..db import database_ops

# Configure logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/api", tags=["farms"])

@router.post("/farms", response_model=dict)
async def create_farm(
    farm_id: str,
    owner_name: str,
    location: str,
    area: float
):
    """
    Create a new farm record
    
    - **farm_id**: Unique farm identifier
    - **owner_name**: Name of the farm owner
    - **location**: Farm location
    - **area**: Farm area in hectares
    """
    try:
        # Check if farm already exists
        existing_farm = await database_ops.get_farm(farm_id)
        if existing_farm:
            raise HTTPException(
                status_code=400,
                detail=f"Farm with ID {farm_id} already exists"
            )
        
        # Create farm record
        farm_data = Farm(
            farm_id=farm_id,
            owner_name=owner_name,
            location=location,
            area=area,
            created_at=datetime.utcnow()
        ).dict()
        
        farm_record_id = await database_ops.create_farm(farm_data)
        
        logger.info(f"Farm created: {farm_id}")
        
        return {
            "message": "Farm created successfully",
            "farm_id": farm_id,
            "record_id": farm_record_id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating farm: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create farm: {str(e)}"
        )

@router.get("/farms/{farm_id}")
async def get_farm(farm_id: str):
    """
    Get farm details by farm ID
    
    - **farm_id**: Unique farm identifier
    """
    try:
        farm = await database_ops.get_farm(farm_id)
        
        if not farm:
            raise HTTPException(
                status_code=404,
                detail=f"Farm {farm_id} not found"
            )
        
        return farm
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting farm: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get farm: {str(e)}"
        )

@router.post("/farms/{farm_id}/soil-report")
async def create_soil_report(
    farm_id: str,
    N: float,
    P: float,
    K: float,
    ph: float,
    organic_matter: float = None
):
    """
    Create a soil report for a farm
    
    - **farm_id**: Unique farm identifier
    - **N**: Nitrogen content (kg/ha)
    - **P**: Phosphorus content (kg/ha)
    - **K**: Potassium content (kg/ha)
    - **ph**: pH value
    - **organic_matter**: Optional organic matter percentage
    """
    try:
        # Check if farm exists
        farm = await database_ops.get_farm(farm_id)
        if not farm:
            raise HTTPException(
                status_code=404,
                detail=f"Farm {farm_id} not found"
            )
        
        # Create soil report
        soil_data = SoilReport(
            farm_id=farm_id,
            N=N,
            P=P,
            K=K,
            ph=ph,
            organic_matter=organic_matter,
            test_date=datetime.utcnow()
        ).dict()
        
        report_id = await database_ops.create_soil_report(soil_data)
        
        logger.info(f"Soil report created for farm: {farm_id}")
        
        return {
            "message": "Soil report created successfully",
            "farm_id": farm_id,
            "report_id": report_id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating soil report: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create soil report: {str(e)}"
        )

@router.get("/farms/{farm_id}/soil-report/latest")
async def get_latest_soil_report(farm_id: str):
    """
    Get the latest soil report for a farm
    
    - **farm_id**: Unique farm identifier
    """
    try:
        soil_report = await database_ops.get_latest_soil_report(farm_id)
        
        if not soil_report:
            raise HTTPException(
                status_code=404,
                detail=f"No soil reports found for farm {farm_id}"
            )
        
        return soil_report
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting soil report: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get soil report: {str(e)}"
        )
