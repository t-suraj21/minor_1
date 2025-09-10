#!/usr/bin/env python3
"""
Live Demo of Frontend-Backend Integration
Simulates the complete user flow
"""

import requests
import json
import time

BACKEND_URL = "http://localhost:8000"

def demo_complete_flow():
    """Demonstrate the complete user flow"""
    print("🎬 LIVE DEMO: Crop Recommendation System")
    print("=" * 50)
    
    # Sample farm data (as would come from frontend form)
    demo_farms = [
        {
            "name": "Punjab Farm",
            "data": {"N": 90, "P": 42, "K": 43, "temperature": 25, "humidity": 80, "ph": 6.5, "rainfall": 200},
            "description": "Rich soil, moderate climate"
        },
        {
            "name": "Rajasthan Farm", 
            "data": {"N": 60, "P": 35, "K": 40, "temperature": 35, "humidity": 45, "ph": 7.2, "rainfall": 150},
            "description": "Arid climate, alkaline soil"
        },
        {
            "name": "Kerala Farm",
            "data": {"N": 80, "P": 50, "K": 45, "temperature": 28, "humidity": 85, "ph": 6.0, "rainfall": 350},
            "description": "High humidity, acidic soil"
        }
    ]
    
    for i, farm in enumerate(demo_farms):
        print(f"\n🌱 Demo {i+1}: {farm['name']}")
        print(f"📍 Conditions: {farm['description']}")
        print(f"📊 Data: {farm['data']}")
        
        # Step 1: Get predictions
        print("\n   🤖 Getting AI recommendations...")
        try:
            response = requests.post(
                f"{BACKEND_URL}/api/predict",
                json=farm['data'],
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                print("   ✅ Predictions received!")
                
                # Display recommendations
                print("   📈 Top Recommendations:")
                for j, rec in enumerate(data['recommendations'][:3]):
                    score_percent = int(rec['score'] * 100)
                    print(f"      {j+1}. {rec['crop'].title()} - {score_percent}% confidence")
                    print(f"         💡 {rec['reason']}")
                
                # Display analysis
                analysis = data.get('analysis', {})
                print(f"   🌱 Soil Health: {analysis.get('soil_health', 'Unknown')}")
                print(f"   🌤️  Weather: {analysis.get('weather_suitability', 'Unknown')}")
                print(f"   ⚠️  Risk Level: {analysis.get('risk_level', 'Unknown')}")
                
                # Step 2: Simulate user feedback
                top_crop = data['recommendations'][0]['crop']
                print(f"\n   💬 Simulating user feedback for {top_crop}...")
                
                feedback_data = {
                    "farm_id": f"demo_farm_{i+1}",
                    "crop": top_crop,
                    "accepted": True,
                    "rating": 5,
                    "comments": f"Great recommendation for {farm['name']}!"
                }
                
                feedback_response = requests.post(
                    f"{BACKEND_URL}/api/feedback",
                    json=feedback_data,
                    headers={"Content-Type": "application/json"}
                )
                
                if feedback_response.status_code == 200:
                    print("   ✅ Feedback submitted successfully!")
                else:
                    print("   ⚠️  Feedback submission failed")
                    
            else:
                print(f"   ❌ Prediction failed: {response.status_code}")
                
        except Exception as e:
            print(f"   ❌ Error: {e}")
        
        if i < len(demo_farms) - 1:
            print("\n" + "-" * 30)
            time.sleep(1)  # Pause between demos
    
    print("\n" + "=" * 50)
    print("🎉 Demo completed! This is exactly what happens when users:")
    print("   1. Fill out the form on the frontend")
    print("   2. Submit their soil and weather data") 
    print("   3. Get AI-powered crop recommendations")
    print("   4. Provide feedback on the suggestions")
    print("\n🌐 Try it yourself at: http://localhost:5173")

def show_api_stats():
    """Show current API statistics"""
    print("\n📊 Current API Statistics")
    print("=" * 30)
    
    try:
        # Get feedback stats
        response = requests.get(f"{BACKEND_URL}/api/feedback/stats")
        if response.status_code == 200:
            stats = response.json()
            print(f"Total Feedback: {stats['total_feedback']}")
            print(f"Acceptance Rate: {stats['acceptance_rate']}%")
            print(f"Average Rating: {stats['average_rating']}")
            print(f"Crops with Feedback: {', '.join(stats['crops_with_feedback'])}")
        
        # Test prediction health
        health_response = requests.get(f"{BACKEND_URL}/api/predict/health")
        if health_response.status_code == 200:
            health = health_response.json()
            print(f"ML Model Status: {health['status']}")
            print(f"Model Loaded: {health['model_loaded']}")
            
    except Exception as e:
        print(f"Error getting stats: {e}")

if __name__ == "__main__":
    demo_complete_flow()
    show_api_stats()
