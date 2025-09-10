#!/usr/bin/env python3
"""
Test script for Crop Recommendation API endpoints
"""

import requests
import json
import time

# API base URL
BASE_URL = "http://localhost:8000"

def test_health_endpoint():
    """Test the health endpoint"""
    print("🔍 Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health endpoint working")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health endpoint error: {e}")

def test_root_endpoint():
    """Test the root endpoint"""
    print("\n🔍 Testing root endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            print("✅ Root endpoint working")
            data = response.json()
            print(f"   API Version: {data.get('version')}")
            print(f"   Status: {data.get('status')}")
        else:
            print(f"❌ Root endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Root endpoint error: {e}")

def test_prediction_endpoint():
    """Test the crop prediction endpoint"""
    print("\n🔍 Testing prediction endpoint...")
    
    # Test data
    test_data = {
        "N": 90,
        "P": 42,
        "K": 43,
        "temperature": 25,
        "humidity": 80,
        "ph": 6.5,
        "rainfall": 200
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/predict",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            print("✅ Prediction endpoint working")
            data = response.json()
            
            print(f"   Number of recommendations: {len(data['recommendations'])}")
            for i, rec in enumerate(data['recommendations'][:3]):
                print(f"   {i+1}. {rec['crop']} (Score: {rec['score']:.3f})")
                print(f"      Reason: {rec['reason']}")
            
            if 'analysis' in data:
                analysis = data['analysis']
                print(f"   Soil Health: {analysis.get('soil_health')}")
                print(f"   Weather Suitability: {analysis.get('weather_suitability')}")
                print(f"   Risk Level: {analysis.get('risk_level')}")
        else:
            print(f"❌ Prediction endpoint failed: {response.status_code}")
            print(f"   Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Prediction endpoint error: {e}")

def test_prediction_health_endpoint():
    """Test the prediction health endpoint"""
    print("\n🔍 Testing prediction health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/api/predict/health")
        if response.status_code == 200:
            print("✅ Prediction health endpoint working")
            data = response.json()
            print(f"   Status: {data.get('status')}")
            print(f"   Model Loaded: {data.get('model_loaded')}")
            print(f"   Test Predictions: {data.get('test_prediction_count')}")
        else:
            print(f"❌ Prediction health endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Prediction health endpoint error: {e}")

def test_feedback_endpoint():
    """Test the feedback endpoint"""
    print("\n🔍 Testing feedback endpoint...")
    
    feedback_data = {
        "farm_id": "test_farm_001",
        "crop": "rice",
        "accepted": True,
        "rating": 4,
        "comments": "Good recommendation, achieved high yield"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/feedback",
            json=feedback_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            print("✅ Feedback endpoint working")
            data = response.json()
            print(f"   Message: {data.get('message')}")
            print(f"   Feedback ID: {data.get('feedback_id')}")
        else:
            print(f"❌ Feedback endpoint failed: {response.status_code}")
            print(f"   Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Feedback endpoint error: {e}")

def test_api_docs():
    """Test if API documentation is accessible"""
    print("\n🔍 Testing API documentation...")
    try:
        response = requests.get(f"{BASE_URL}/docs")
        if response.status_code == 200:
            print("✅ API documentation accessible")
            print(f"   Access at: {BASE_URL}/docs")
        else:
            print(f"❌ API documentation failed: {response.status_code}")
    except Exception as e:
        print(f"❌ API documentation error: {e}")

def main():
    """Run all tests"""
    print("🚀 Starting API endpoint tests...")
    print("=" * 50)
    
    # Wait a moment for server to start
    print("⏳ Waiting for server to start...")
    time.sleep(2)
    
    # Run tests
    test_health_endpoint()
    test_root_endpoint()
    test_prediction_health_endpoint()
    test_prediction_endpoint()
    test_feedback_endpoint()
    test_api_docs()
    
    print("\n" + "=" * 50)
    print("✨ API testing completed!")
    print(f"🌐 API Documentation: {BASE_URL}/docs")
    print(f"🔧 Interactive API: {BASE_URL}/docs")

if __name__ == "__main__":
    main()
