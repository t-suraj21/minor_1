import pandas as pd
import numpy as np
from crop_recommendation_model import CropRecommendationModel
import joblib

def test_predictions():
    """
    Test the crop recommendation model with sample data
    """
    print("Testing Crop Recommendation Model")
    print("="*50)
    
    # Load the trained model
    model_path = 'crop_recommendation_model.pkl'
    model = CropRecommendationModel("Crop_recommendation(in).csv")
    model.load_model(model_path)
    
    # Test cases with sample data
    test_cases = [
        {
            'name': 'Rice Conditions',
            'N': 90, 'P': 42, 'K': 43, 'temperature': 20.88, 
            'humidity': 82.0, 'ph': 6.5, 'rainfall': 202.94
        },
        {
            'name': 'Maize Conditions',
            'N': 85, 'P': 58, 'K': 41, 'temperature': 21.77, 
            'humidity': 80.32, 'ph': 7.04, 'rainfall': 226.66
        },
        {
            'name': 'Chickpea Conditions',
            'N': 60, 'P': 55, 'K': 44, 'temperature': 23.0, 
            'humidity': 82.32, 'ph': 7.84, 'rainfall': 263.96
        },
        {
            'name': 'Custom Test Case 1',
            'N': 75, 'P': 50, 'K': 40, 'temperature': 25.0, 
            'humidity': 75.0, 'ph': 6.8, 'rainfall': 200.0
        },
        {
            'name': 'Custom Test Case 2',
            'N': 80, 'P': 45, 'K': 35, 'temperature': 22.0, 
            'humidity': 85.0, 'ph': 7.2, 'rainfall': 250.0
        }
    ]
    
    print("Running test predictions...\n")
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"Test Case {i}: {test_case['name']}")
        print("-" * 30)
        
        # Extract parameters
        N = test_case['N']
        P = test_case['P']
        K = test_case['K']
        temperature = test_case['temperature']
        humidity = test_case['humidity']
        ph = test_case['ph']
        rainfall = test_case['rainfall']
        
        # Make prediction
        prediction, confidence = model.predict_crop(N, P, K, temperature, humidity, ph, rainfall)
        
        print(f"Input Parameters:")
        print(f"  N (Nitrogen): {N}")
        print(f"  P (Phosphorus): {P}")
        print(f"  K (Potassium): {K}")
        print(f"  Temperature: {temperature}°C")
        print(f"  Humidity: {humidity}%")
        print(f"  pH: {ph}")
        print(f"  Rainfall: {rainfall}mm")
        print()
        print(f"Predicted Crop: {prediction.upper()}")
        print(f"Confidence: {confidence:.2%}")
        print("="*50)
        print()

def interactive_demo():
    """
    Interactive demo function
    """
    print("Interactive Crop Recommendation Demo")
    print("="*50)
    
    # Load the trained model
    model_path = 'crop_recommendation_model.pkl'
    model = CropRecommendationModel("Crop_recommendation(in).csv")
    model.load_model(model_path)
    
    print("Enter your soil and weather parameters:")
    print("(Press Enter to use default values)")
    print()
    
    # Get user input with defaults
    try:
        N = input("Nitrogen level (N) [default: 80]: ").strip()
        N = float(N) if N else 80.0
        
        P = input("Phosphorus level (P) [default: 50]: ").strip()
        P = float(P) if P else 50.0
        
        K = input("Potassium level (K) [default: 40]: ").strip()
        K = float(K) if K else 40.0
        
        temperature = input("Temperature (°C) [default: 25]: ").strip()
        temperature = float(temperature) if temperature else 25.0
        
        humidity = input("Humidity (%) [default: 80]: ").strip()
        humidity = float(humidity) if humidity else 80.0
        
        ph = input("pH level [default: 7.0]: ").strip()
        ph = float(ph) if ph else 7.0
        
        rainfall = input("Rainfall (mm) [default: 200]: ").strip()
        rainfall = float(rainfall) if rainfall else 200.0
        
        # Make prediction
        prediction, confidence = model.predict_crop(N, P, K, temperature, humidity, ph, rainfall)
        
        print(f"\n" + "="*30)
        print("PREDICTION RESULT")
        print("="*30)
        print(f"Recommended Crop: {prediction.upper()}")
        print(f"Confidence: {confidence:.2%}")
        print("="*30)
        
    except ValueError:
        print("Invalid input! Using default values...")
        prediction, confidence = model.predict_crop(80, 50, 40, 25, 80, 7, 200)
        print(f"\nRecommended Crop: {prediction.upper()}")
        print(f"Confidence: {confidence:.2%}")

if __name__ == "__main__":
    # Run test predictions
    test_predictions()
    
    print("\n" + "="*60)
    print("To run the interactive version, use:")
    print("python -c \"from test_predictions import interactive_demo; interactive_demo()\"")
    print("="*60)
