# Crop Recommendation System - Backend API

A comprehensive FastAPI backend for AI-powered crop recommendations based on soil, weather, and environmental conditions.

## Features

- 🤖 **Machine Learning Integration**: Random Forest model for crop prediction
- 🌱 **Comprehensive Analysis**: Soil health, weather suitability, and risk assessment  
- 💾 **MongoDB Storage**: Persistent data storage for farms, recommendations, and feedback
- 📊 **Feedback System**: Collect and analyze user feedback
- 🔄 **RESTful API**: Well-documented endpoints with OpenAPI/Swagger
- 🌐 **CORS Support**: Ready for frontend integration

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Setup MongoDB

Make sure MongoDB is running locally on port 27017, or update the connection string in `.env`.

### 3. Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### 4. Train the ML Model

```bash
cd app/ml
python model.py
```

### 5. Run the API

```bash
python run.py
```

The API will be available at `http://localhost:8000`

## API Documentation

Interactive API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Main Endpoints

### Crop Prediction
- `POST /api/predict` - Get crop recommendations
- `GET /api/predict/health` - Health check for prediction service

### Feedback System
- `POST /api/feedback` - Submit feedback on recommendations
- `GET /api/feedback/stats` - Get feedback statistics

### Farm Management  
- `POST /api/farms` - Create farm profile
- `GET /api/farms/{farm_id}` - Get farm details
- `POST /api/farms/{farm_id}/soil-report` - Submit soil report

### Recommendations
- `GET /api/recommendation/{farm_id}` - Get latest recommendation
- `GET /api/recommendation/{farm_id}/history` - Get recommendation history

## Example Usage

### 1. Get Crop Recommendations

```bash
curl -X POST "http://localhost:8000/api/predict" \
     -H "Content-Type: application/json" \
     -d '{
       "N": 90,
       "P": 42,
       "K": 43,
       "temperature": 25,
       "humidity": 80,
       "ph": 6.5,
       "rainfall": 200
     }'
```

### 2. Submit Feedback

```bash
curl -X POST "http://localhost:8000/api/feedback" \
     -H "Content-Type: application/json" \
     -d '{
       "farm_id": "farm_123",
       "crop": "rice",
       "accepted": true,
       "rating": 4
     }'
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── models.py            # Pydantic models
│   ├── db.py               # Database connection
│   ├── ml/
│   │   ├── __init__.py
│   │   ├── model.py        # ML model training/prediction
│   │   ├── trained_model.joblib
│   │   └── label_encoder.joblib
│   └── routes/
│       ├── __init__.py
│       ├── prediction.py   # Prediction endpoints
│       ├── feedback.py     # Feedback endpoints
│       └── farms.py        # Farm management endpoints
├── data/
│   └── crop_recommendation.csv  # Training dataset
├── requirements.txt
├── run.py                  # Application runner
├── .env.example           # Environment template
└── README.md
```

## Machine Learning Model

The system uses a Random Forest Classifier trained on agricultural data with features:
- **N**: Nitrogen content (kg/ha)
- **P**: Phosphorus content (kg/ha)  
- **K**: Potassium content (kg/ha)
- **temperature**: Average temperature (°C)
- **humidity**: Relative humidity (%)
- **ph**: Soil pH value
- **rainfall**: Annual rainfall (mm)

The model provides:
- Top 3 crop recommendations
- Confidence scores
- Feature-based explanations using SHAP-like reasoning

## Database Schema

### Collections:
- `farms`: Farm profiles and details
- `soil_reports`: Soil test results
- `recommendations`: Generated crop recommendations  
- `feedback`: User feedback on recommendations

## Development

### Adding New Features

1. Define Pydantic models in `models.py`
2. Add database operations in `db.py`
3. Create route handlers in `routes/`
4. Update main app in `main.py`

### Testing

```bash
# Test ML model
cd app/ml
python model.py

# Test API endpoints
curl http://localhost:8000/health
```

## Deployment

### Docker (Optional)

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["python", "run.py"]
```

### Production Considerations

- Use environment variables for sensitive configuration
- Set up proper logging and monitoring
- Configure MongoDB with authentication
- Use a reverse proxy (nginx) for production
- Set up SSL/TLS certificates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
