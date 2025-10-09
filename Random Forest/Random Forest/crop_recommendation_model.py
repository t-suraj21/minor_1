import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import os

class CropRecommendationModel:
    def __init__(self, dataset_path):
        """
        Initialize the Crop Recommendation Model
        
        Args:
            dataset_path (str): Path to the CSV dataset
        """
        self.dataset_path = dataset_path
        self.model = None
        self.feature_columns = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        self.label_column = 'label'
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        
    def load_and_preprocess_data(self):
        """
        Load and preprocess the dataset
        """
        print("Loading dataset...")
        self.data = pd.read_csv(self.dataset_path)
        
        print(f"Dataset shape: {self.data.shape}")
        print(f"Features: {self.feature_columns}")
        print(f"Target variable: {self.label_column}")
        
        # Check for missing values
        print("\nMissing values:")
        print(self.data.isnull().sum())
        
        # Display basic statistics
        print("\nDataset info:")
        print(self.data.info())
        
        # Display unique crops
        print(f"\nUnique crops in dataset: {self.data[self.label_column].nunique()}")
        print("Crop types:")
        print(self.data[self.label_column].value_counts())
        
        # Separate features and target
        self.X = self.data[self.feature_columns]
        self.y = self.data[self.label_column]
        
        print(f"\nFeature matrix shape: {self.X.shape}")
        print(f"Target vector shape: {self.y.shape}")
        
    def split_data(self, test_size=0.2, random_state=42):
        """
        Split data into training and test sets
        
        Args:
            test_size (float): Proportion of data for testing
            random_state (int): Random seed for reproducibility
        """
        print(f"\nSplitting data with test_size={test_size} and random_state={random_state}")
        
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            self.X, self.y, test_size=test_size, random_state=random_state, stratify=self.y
        )
        
        print(f"Training set shape: {self.X_train.shape}")
        print(f"Test set shape: {self.X_test.shape}")
        
    def train_model(self, n_estimators=100, random_state=42):
        """
        Train the Random Forest Classifier
        
        Args:
            n_estimators (int): Number of trees in the forest
            random_state (int): Random seed for reproducibility
        """
        print(f"\nTraining Random Forest with {n_estimators} estimators...")
        
        self.model = RandomForestClassifier(
            n_estimators=n_estimators,
            random_state=random_state,
            max_depth=10,
            min_samples_split=5,
            min_samples_leaf=2
        )
        
        self.model.fit(self.X_train, self.y_train)
        print("Model training completed!")
        
    def evaluate_model(self):
        """
        Evaluate the trained model
        """
        if self.model is None:
            print("Model not trained yet!")
            return
            
        print("\nEvaluating model...")
        
        # Predictions
        y_train_pred = self.model.predict(self.X_train)
        y_test_pred = self.model.predict(self.X_test)
        
        # Calculate accuracies
        train_accuracy = accuracy_score(self.y_train, y_train_pred)
        test_accuracy = accuracy_score(self.y_test, y_test_pred)
        
        print(f"Training Accuracy: {train_accuracy:.4f}")
        print(f"Test Accuracy: {test_accuracy:.4f}")
        
        # Classification report
        print("\nClassification Report:")
        print(classification_report(self.y_test, y_test_pred))
        
        # Feature importance
        print("\nFeature Importance:")
        feature_importance = pd.DataFrame({
            'feature': self.feature_columns,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print(feature_importance)
        
    def save_model(self, model_path='crop_recommendation_model.pkl'):
        """
        Save the trained model
        
        Args:
            model_path (str): Path to save the model
        """
        if self.model is None:
            print("Model not trained yet!")
            return
            
        joblib.dump(self.model, model_path)
        print(f"Model saved to {model_path}")
        
    def load_model(self, model_path='crop_recommendation_model.pkl'):
        """
        Load a pre-trained model
        
        Args:
            model_path (str): Path to the saved model
        """
        if os.path.exists(model_path):
            self.model = joblib.load(model_path)
            print(f"Model loaded from {model_path}")
        else:
            print(f"Model file {model_path} not found!")
            
    def predict_crop(self, N, P, K, temperature, humidity, ph, rainfall):
        """
        Predict crop recommendation for given input
        
        Args:
            N (float): Nitrogen level
            P (float): Phosphorus level
            K (float): Potassium level
            temperature (float): Temperature
            humidity (float): Humidity
            ph (float): pH level
            rainfall (float): Rainfall
            
        Returns:
            str: Predicted crop
        """
        if self.model is None:
            print("Model not trained or loaded yet!")
            return None
            
        # Create input DataFrame with proper column names
        input_data = pd.DataFrame([[N, P, K, temperature, humidity, ph, rainfall]], 
                                 columns=self.feature_columns)
        
        # Make prediction
        prediction = self.model.predict(input_data)[0]
        prediction_proba = self.model.predict_proba(input_data)[0]
        
        # Get confidence score
        confidence = np.max(prediction_proba)
        
        return prediction, confidence

def get_user_input():
    """
    Get user input for crop prediction
    """
    print("\n" + "="*50)
    print("CROP RECOMMENDATION SYSTEM")
    print("="*50)
    print("Please enter the following soil and weather parameters:")
    print()
    
    try:
        N = float(input("Enter Nitrogen level (N): "))
        P = float(input("Enter Phosphorus level (P): "))
        K = float(input("Enter Potassium level (K): "))
        temperature = float(input("Enter Temperature (°C): "))
        humidity = float(input("Enter Humidity (%): "))
        ph = float(input("Enter pH level: "))
        rainfall = float(input("Enter Rainfall (mm): "))
        
        return N, P, K, temperature, humidity, ph, rainfall
        
    except ValueError:
        print("Invalid input! Please enter numeric values.")
        return None

def main():
    """
    Main function to run the complete pipeline
    """
    # Initialize the model
    dataset_path = "Crop_recommendation(in).csv"
    model = CropRecommendationModel(dataset_path)
    
    # Check if model file exists
    model_path = 'crop_recommendation_model.pkl'
    
    if os.path.exists(model_path):
        print("Found existing model. Loading...")
        model.load_model(model_path)
    else:
        print("No existing model found. Training new model...")
        
        # Load and preprocess data
        model.load_and_preprocess_data()
        
        # Split data
        model.split_data()
        
        # Train model
        model.train_model()
        
        # Evaluate model
        model.evaluate_model()
        
        # Save model
        model.save_model(model_path)
    
    # Interactive prediction loop
    while True:
        print("\n" + "="*50)
        print("CROP RECOMMENDATION PREDICTION")
        print("="*50)
        
        # Get user input
        user_input = get_user_input()
        
        if user_input is None:
            continue
            
        N, P, K, temperature, humidity, ph, rainfall = user_input
        
        # Make prediction
        prediction, confidence = model.predict_crop(N, P, K, temperature, humidity, ph, rainfall)
        
        if prediction:
            print(f"\n" + "="*30)
            print("PREDICTION RESULT")
            print("="*30)
            print(f"Recommended Crop: {prediction.upper()}")
            print(f"Confidence: {confidence:.2%}")
            print("="*30)
        
        # Ask if user wants to make another prediction
        another = input("\nDo you want to make another prediction? (y/n): ").lower()
        if another != 'y':
            break
    
    print("\nThank you for using the Crop Recommendation System!")

if __name__ == "__main__":
    main()
