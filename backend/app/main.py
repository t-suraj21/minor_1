from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import os
from contextlib import asynccontextmanager

# Import routes
from .routes import prediction, feedback, farms, chatbot
from .db import startup_db_client, shutdown_db_client

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Lifespan context manager for startup/shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up Crop Recommendation API...")
    try:
        await startup_db_client()
        logger.info("Database connection established")
    except Exception as e:
        logger.error(f"Failed to connect to database: {e}")
        # Continue startup even if DB connection fails for development
    
    yield
    
    # Shutdown
    logger.info("Shutting down Crop Recommendation API...")
    try:
        await shutdown_db_client()
        logger.info("Database connection closed")
    except Exception as e:
        logger.error(f"Error during shutdown: {e}")

# Create FastAPI app
app = FastAPI(
    title="Crop Recommendation System API",
    description="""
    A comprehensive AI-powered crop recommendation system that analyzes soil, weather, 
    and environmental conditions to suggest the best crops for optimal yield.
    
    ## Features
    
    * **ML-Powered Predictions**: Advanced machine learning models trained on agricultural data
    * **Comprehensive Analysis**: Soil health, weather suitability, and risk assessment
    * **Feedback System**: Collect and analyze user feedback to improve recommendations
    * **Farm Management**: Track farms, soil reports, and recommendation history
    * **MongoDB Integration**: Persistent storage for all agricultural data
    
    ## Usage
    
    1. Create a farm profile using `/api/farms`
    2. Submit soil and weather data to `/api/predict` 
    3. Get personalized crop recommendations
    4. Provide feedback on recommendations via `/api/feedback`
    5. Track recommendation history and farm performance
    """,
    version="1.0.0",
    contact={
        "name": "Crop Recommendation Team",
        "email": "support@croprecommendation.com",
    },
    license_info={
        "name": "MIT License",
    },
    lifespan=lifespan
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React development server
        "http://localhost:5173",  # Vite development server  
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        # Add production URLs here
        "https://your-frontend-domain.com"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(prediction.router)
app.include_router(feedback.router)
app.include_router(farms.router)
app.include_router(chatbot.router)

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to the Crop Recommendation System API",
        "version": "1.0.0",
        "status": "active",
        "documentation": "/docs",
        "endpoints": {
            "predict": "/api/predict",
            "feedback": "/api/feedback", 
            "recommendations": "/api/recommendation/{farm_id}",
            "farms": "/api/farms",
            "chatbot": "/api/chatbot",
            "health": "/health"
        }
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Basic health check
        return {
            "status": "healthy",
            "service": "crop-recommendation-api",
            "version": "1.0.0",
            "timestamp": "2024-01-01T00:00:00Z"
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service unavailable")

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler"""
    logger.error(f"Global exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "An unexpected error occurred",
            "detail": str(exc) if os.getenv("DEBUG", "false").lower() == "true" else None
        }
    )

# Custom 404 handler
@app.exception_handler(404)
async def not_found_handler(request, exc):
    """Custom 404 handler"""
    return JSONResponse(
        status_code=404,
        content={
            "error": "Not found",
            "message": "The requested resource was not found",
            "path": str(request.url.path)
        }
    )

if __name__ == "__main__":
    import uvicorn
    
    # Run the application
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
