import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os
from pathlib import Path

class CropRecommendationModel:
    def __init__(self):
        self.model = None
        self.label_encoder = None
        self.feature_names = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        self.model_path = Path(__file__).parent / 'trained_model.joblib'
        self.encoder_path = Path(__file__).parent / 'label_encoder.joblib'
        
    def load_data(self, csv_path):
        """Load and preprocess the crop recommendation dataset"""
        try:
            df = pd.read_csv(csv_path)
            print(f"Dataset loaded successfully with shape: {df.shape}")
            print(f"Crops in dataset: {df['label'].unique()}")
            return df
        except Exception as e:
            print(f"Error loading dataset: {e}")
            return None
    
    def preprocess_data(self, df):
        """Preprocess the data for training"""
        # Separate features and target
        X = df[self.feature_names]
        y = df['label']
        
        # Encode crop labels
        self.label_encoder = LabelEncoder()
        y_encoded = self.label_encoder.fit_transform(y)
        
        return X, y_encoded, y
    
    def train_model(self, csv_path=None):
        """Train the crop recommendation model"""
        if csv_path is None:
            # Default path to the dataset
            csv_path = Path(__file__).parent.parent.parent / 'data' / 'crop_recommendation.csv'
        
        # Load data
        df = self.load_data(csv_path)
        if df is None:
            return False
        
        # Preprocess data
        X, y_encoded, y_original = self.preprocess_data(df)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
        )
        
        # Train Random Forest model
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            min_samples_split=5,
            min_samples_leaf=2
        )
        
        print("Training model...")
        self.model.fit(X_train, y_train)
        
        # Evaluate model
        y_pred = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"Model Accuracy: {accuracy:.4f}")
        print("\nClassification Report:")
        print(classification_report(y_test, y_pred, 
                                  target_names=self.label_encoder.classes_))
        
        # Save model and encoder
        self.save_model()
        
        return True
    
    def save_model(self):
        """Save the trained model and label encoder"""
        try:
            os.makedirs(self.model_path.parent, exist_ok=True)
            joblib.dump(self.model, self.model_path)
            joblib.dump(self.label_encoder, self.encoder_path)
            print(f"Model saved to {self.model_path}")
            print(f"Label encoder saved to {self.encoder_path}")
        except Exception as e:
            print(f"Error saving model: {e}")
    
    def load_model(self):
        """Load the trained model and label encoder"""
        try:
            if self.model_path.exists() and self.encoder_path.exists():
                self.model = joblib.load(self.model_path)
                self.label_encoder = joblib.load(self.encoder_path)
                print("Model and encoder loaded successfully")
                return True
            else:
                print("Model files not found. Please train the model first.")
                return False
        except Exception as e:
            print(f"Error loading model: {e}")
            return False
    
    def predict_crop(self, features):
        """
        Predict crop recommendation for given features
        
        Args:
            features (dict): Dictionary with keys: N, P, K, temperature, humidity, ph, rainfall
        
        Returns:
            list: Top 3 crop recommendations with scores and reasons
        """
        if self.model is None or self.label_encoder is None:
            if not self.load_model():
                return None
        
        try:
            # Convert features to numpy array
            feature_array = np.array([[
                features['N'],
                features['P'], 
                features['K'],
                features['temperature'],
                features['humidity'],
                features['ph'],
                features['rainfall']
            ]])
            
            # Get prediction probabilities
            probabilities = self.model.predict_proba(feature_array)[0]
            
            # Get feature importances for explanations
            feature_importances = self.model.feature_importances_
            
            # Create recommendations
            recommendations = []
            
            # Get top 3 predictions
            top_indices = np.argsort(probabilities)[::-1][:3]
            
            for i, idx in enumerate(top_indices):
                crop_name = self.label_encoder.classes_[idx]
                score = probabilities[idx]
                
                # Generate reason based on feature importance and values
                reason = self._generate_reason(features, feature_importances, crop_name)
                
                recommendations.append({
                    "crop": crop_name,
                    "score": float(score),
                    "reason": reason
                })
            
            return recommendations
            
        except Exception as e:
            print(f"Error making prediction: {e}")
            return None
    
    def _generate_reason(self, features, importances, crop):
        """Generate explanation for the crop recommendation"""
        # Feature importance mapping
        feature_importance_map = dict(zip(self.feature_names, importances))
        
        # Get top 2 most important features
        sorted_features = sorted(feature_importance_map.items(), 
                               key=lambda x: x[1], reverse=True)[:2]
        
        reasons = []
        
        for feature, importance in sorted_features:
            value = features[feature]
            
            if feature == 'N':
                if value > 80:
                    reasons.append("high nitrogen content")
                elif value < 40:
                    reasons.append("low nitrogen requirement")
                else:
                    reasons.append("moderate nitrogen levels")
            
            elif feature == 'P':
                if value > 50:
                    reasons.append("high phosphorus availability")
                elif value < 20:
                    reasons.append("low phosphorus requirement")
                else:
                    reasons.append("adequate phosphorus levels")
            
            elif feature == 'K':
                if value > 40:
                    reasons.append("high potassium content")
                elif value < 20:
                    reasons.append("low potassium requirement")
                else:
                    reasons.append("suitable potassium levels")
            
            elif feature == 'temperature':
                if value > 30:
                    reasons.append("warm climate preference")
                elif value < 20:
                    reasons.append("cool climate suitability")
                else:
                    reasons.append("moderate temperature range")
            
            elif feature == 'humidity':
                if value > 70:
                    reasons.append("high humidity tolerance")
                elif value < 40:
                    reasons.append("low humidity adaptation")
                else:
                    reasons.append("moderate humidity conditions")
            
            elif feature == 'ph':
                if value > 7.5:
                    reasons.append("alkaline soil preference")
                elif value < 6.0:
                    reasons.append("acidic soil tolerance")
                else:
                    reasons.append("neutral pH suitability")
            
            elif feature == 'rainfall':
                if value > 200:
                    reasons.append("high rainfall requirement")
                elif value < 100:
                    reasons.append("drought tolerance")
                else:
                    reasons.append("moderate water needs")
        
        return f"Suitable due to {' and '.join(reasons)}"

# Function to train model if run directly
if __name__ == "__main__":
    model = CropRecommendationModel()
    success = model.train_model()
    
    if success:
        # Test prediction
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
        print("\nTest Prediction:")
        for pred in predictions:
            print(f"Crop: {pred['crop']}, Score: {pred['score']:.3f}, Reason: {pred['reason']}")
