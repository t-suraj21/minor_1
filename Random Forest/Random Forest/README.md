# Crop Recommendation System

A Random Forest Classifier that predicts the best crop to grow based on soil and weather conditions.

## Features

- **Dataset**: 900 samples with 9 different crop types
- **Features**: N, P, K, temperature, humidity, pH, rainfall
- **Model**: Random Forest Classifier with 100% accuracy
- **Interactive**: User-friendly input system for predictions

## Dataset Information

- **Total samples**: 900
- **Crop types**: 9 (rice, maize, chickpea, kidneybeans, pigeonpeas, mothbeans, mungbean, blackgram, lentil)
- **Features**: 7 numerical features
- **No missing values**: Clean dataset ready for training

## Model Performance

- **Training Accuracy**: 100%
- **Test Accuracy**: 100%
- **Feature Importance**:
  1. Humidity (27.9%)
  2. Rainfall (21.3%)
  3. Nitrogen (14.1%)
  4. Potassium (11.9%)
  5. Phosphorus (8.8%)
  6. Temperature (8.3%)
  7. pH (7.6%)

## Usage

### 1. Training the Model (First Time)

```bash
# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Run the main program
python crop_recommendation_model.py
```

### 2. Making Predictions

The program will prompt you to enter:
- Nitrogen level (N)
- Phosphorus level (P)
- Potassium level (K)
- Temperature (°C)
- Humidity (%)
- pH level
- Rainfall (mm)

### 3. Testing with Sample Data

```bash
python test_predictions.py
```

### 4. Interactive Demo

```bash
python -c "from test_predictions import interactive_demo; interactive_demo()"
```

## Files

- `crop_recommendation_model.py` - Main program with training and prediction
- `test_predictions.py` - Test script with sample predictions
- `crop_recommendation_model.pkl` - Trained model (saved after first run)
- `Crop_recommendation(in).csv` - Dataset
- `README.md` - This file

## Example Predictions

| N | P | K | Temp | Humidity | pH | Rainfall | Predicted Crop | Confidence |
|---|----|----|----|----|----|----|----|----|
| 90 | 42 | 43 | 20.88 | 82.0 | 6.5 | 202.94 | RICE | 100% |
| 75 | 50 | 40 | 25.0 | 75.0 | 6.8 | 200.0 | RICE | 58.25% |
| 80 | 45 | 35 | 22.0 | 85.0 | 7.2 | 250.0 | RICE | 99% |

## Requirements

- Python 3.7+
- scikit-learn
- pandas
- numpy
- joblib

## Installation

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install scikit-learn pandas numpy
```

## How It Works

1. **Data Loading**: Loads the CSV dataset
2. **Preprocessing**: Checks for missing values and displays dataset info
3. **Train-Test Split**: Splits data into 80% training and 20% testing
4. **Model Training**: Trains Random Forest with 100 estimators
5. **Evaluation**: Shows accuracy, classification report, and feature importance
6. **Prediction**: Takes user input and predicts the best crop
7. **Model Persistence**: Saves trained model for future use

## Model Parameters

- **Algorithm**: Random Forest Classifier
- **Estimators**: 100 trees
- **Max Depth**: 10
- **Min Samples Split**: 5
- **Min Samples Leaf**: 2
- **Random State**: 42 (for reproducibility)
