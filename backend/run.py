#!/usr/bin/env python3
"""
Crop Recommendation System - Backend Server
"""

import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    # Get configuration from environment
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("API_PORT", 8000))
    debug = os.getenv("DEBUG", "false").lower() == "true"
    log_level = os.getenv("LOG_LEVEL", "info").lower()
    
    print(f"🚀 Starting Crop Recommendation API on {host}:{port}")
    print(f"🔧 Debug mode: {debug}")
    print(f"📊 Log level: {log_level}")
    print(f"🌐 Access API docs at: http://{host}:{port}/docs")
    
    # Run the application
    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=debug,
        log_level=log_level,
        access_log=True
    )
