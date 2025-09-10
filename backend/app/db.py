import os
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from typing import Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Database:
    client: Optional[AsyncIOMotorClient] = None
    database = None

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "crop_recommendation")

# Collections
COLLECTIONS = {
    "farms": "farms",
    "soil_reports": "soil_reports", 
    "recommendations": "recommendations",
    "feedback": "feedback"
}

db = Database()

async def connect_to_mongo():
    """Create database connection"""
    try:
        db.client = AsyncIOMotorClient(DATABASE_URL)
        db.database = db.client[DATABASE_NAME]
        
        # Test connection
        await db.client.admin.command('ping')
        logger.info(f"Connected to MongoDB at {DATABASE_URL}")
        
        # Create indexes for better performance
        await create_indexes()
        
    except Exception as e:
        logger.error(f"Error connecting to MongoDB: {e}")
        raise

async def close_mongo_connection():
    """Close database connection"""
    if db.client:
        db.client.close()
        logger.info("Disconnected from MongoDB")

async def create_indexes():
    """Create database indexes for better performance"""
    try:
        # Farms collection indexes
        await db.database[COLLECTIONS["farms"]].create_index("farm_id", unique=True)
        
        # Soil reports collection indexes
        await db.database[COLLECTIONS["soil_reports"]].create_index("farm_id")
        await db.database[COLLECTIONS["soil_reports"]].create_index("test_date")
        
        # Recommendations collection indexes
        await db.database[COLLECTIONS["recommendations"]].create_index("farm_id")
        await db.database[COLLECTIONS["recommendations"]].create_index("created_at")
        
        # Feedback collection indexes
        await db.database[COLLECTIONS["feedback"]].create_index("farm_id")
        await db.database[COLLECTIONS["feedback"]].create_index("crop")
        await db.database[COLLECTIONS["feedback"]].create_index("created_at")
        
        logger.info("Database indexes created successfully")
        
    except Exception as e:
        logger.error(f"Error creating indexes: {e}")

def get_database():
    """Get database instance"""
    return db.database

# Database operations
class DatabaseOperations:
    def __init__(self):
        self.db = None
    
    async def initialize(self):
        """Initialize database connection"""
        await connect_to_mongo()
        self.db = get_database()
    
    async def create_farm(self, farm_data: dict) -> str:
        """Create a new farm record"""
        try:
            result = await self.db[COLLECTIONS["farms"]].insert_one(farm_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Error creating farm: {e}")
            raise
    
    async def get_farm(self, farm_id: str) -> dict:
        """Get farm by farm_id"""
        try:
            farm = await self.db[COLLECTIONS["farms"]].find_one({"farm_id": farm_id})
            if farm:
                farm["_id"] = str(farm["_id"])
            return farm
        except Exception as e:
            logger.error(f"Error getting farm: {e}")
            raise
    
    async def create_soil_report(self, soil_data: dict) -> str:
        """Create a new soil report"""
        try:
            result = await self.db[COLLECTIONS["soil_reports"]].insert_one(soil_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Error creating soil report: {e}")
            raise
    
    async def get_latest_soil_report(self, farm_id: str) -> dict:
        """Get latest soil report for a farm"""
        try:
            report = await self.db[COLLECTIONS["soil_reports"]].find_one(
                {"farm_id": farm_id},
                sort=[("test_date", -1)]
            )
            if report:
                report["_id"] = str(report["_id"])
            return report
        except Exception as e:
            logger.error(f"Error getting soil report: {e}")
            raise
    
    async def create_recommendation(self, recommendation_data: dict) -> str:
        """Create a new recommendation record"""
        try:
            result = await self.db[COLLECTIONS["recommendations"]].insert_one(recommendation_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Error creating recommendation: {e}")
            raise
    
    async def get_recommendation(self, farm_id: str) -> dict:
        """Get latest recommendation for a farm"""
        try:
            recommendation = await self.db[COLLECTIONS["recommendations"]].find_one(
                {"farm_id": farm_id},
                sort=[("created_at", -1)]
            )
            if recommendation:
                recommendation["_id"] = str(recommendation["_id"])
            return recommendation
        except Exception as e:
            logger.error(f"Error getting recommendation: {e}")
            raise
    
    async def get_recommendation_history(self, farm_id: str, limit: int = 10) -> list:
        """Get recommendation history for a farm"""
        try:
            cursor = self.db[COLLECTIONS["recommendations"]].find(
                {"farm_id": farm_id}
            ).sort("created_at", -1).limit(limit)
            
            recommendations = []
            async for doc in cursor:
                doc["_id"] = str(doc["_id"])
                recommendations.append(doc)
            
            return recommendations
        except Exception as e:
            logger.error(f"Error getting recommendation history: {e}")
            raise
    
    async def create_feedback(self, feedback_data: dict) -> str:
        """Create a new feedback record"""
        try:
            result = await self.db[COLLECTIONS["feedback"]].insert_one(feedback_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Error creating feedback: {e}")
            raise
    
    async def get_feedback_stats(self, crop: str = None) -> dict:
        """Get feedback statistics"""
        try:
            pipeline = []
            
            if crop:
                pipeline.append({"$match": {"crop": crop}})
            
            pipeline.extend([
                {
                    "$group": {
                        "_id": None,
                        "total_feedback": {"$sum": 1},
                        "accepted_count": {"$sum": {"$cond": ["$accepted", 1, 0]}},
                        "avg_rating": {"$avg": "$rating"},
                        "crops": {"$addToSet": "$crop"}
                    }
                }
            ])
            
            result = await self.db[COLLECTIONS["feedback"]].aggregate(pipeline).to_list(1)
            
            if result:
                stats = result[0]
                stats["acceptance_rate"] = stats["accepted_count"] / stats["total_feedback"] if stats["total_feedback"] > 0 else 0
                return stats
            else:
                return {
                    "total_feedback": 0,
                    "accepted_count": 0,
                    "acceptance_rate": 0,
                    "avg_rating": 0,
                    "crops": []
                }
                
        except Exception as e:
            logger.error(f"Error getting feedback stats: {e}")
            raise

# Global database operations instance
database_ops = DatabaseOperations()

# Startup event handler
async def startup_db_client():
    """Startup database connection"""
    await database_ops.initialize()
    logger.info("Database initialized successfully")

# Shutdown event handler  
async def shutdown_db_client():
    """Shutdown database connection"""
    await close_mongo_connection()
