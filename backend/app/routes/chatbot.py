from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import logging
from datetime import datetime
import re

# Configure logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/api", tags=["chatbot"])

# Models
class ChatMessage(BaseModel):
    message: str
    timestamp: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    category: str
    suggestions: List[str]
    timestamp: str

# Comprehensive Agriculture Knowledge Base
AGRICULTURE_KNOWLEDGE = {
    "crops": {
        "rice": {
            "name": "Rice",
            "season": "Monsoon (Kharif)",
            "duration": "120-150 days",
            "soil": "Clay loam, loamy soil with good water retention",
            "ph": "5.5-7.0",
            "temperature": "21-37°C",
            "rainfall": "100-200 cm annually",
            "irrigation": "High water requirement, flooded conditions",
            "npk": "N: 80-120 kg/ha, P: 40-60 kg/ha, K: 40-60 kg/ha",
            "diseases": "Blast, Bacterial blight, Sheath blight, Brown spot",
            "pests": "Stem borer, Leaf folder, Brown plant hopper",
            "yield": "4-6 tons/hectare",
            "market_price": "₹2000-2500 per quintal",
            "tips": "Ensure proper water management, use disease-resistant varieties, maintain proper spacing"
        },
        "wheat": {
            "name": "Wheat",
            "season": "Winter (Rabi)",
            "duration": "110-130 days",
            "soil": "Loamy soil with good drainage",
            "ph": "6.0-7.5",
            "temperature": "10-25°C",
            "rainfall": "50-75 cm",
            "irrigation": "4-6 irrigations required",
            "npk": "N: 120-150 kg/ha, P: 60 kg/ha, K: 40 kg/ha",
            "diseases": "Rust diseases, Powdery mildew, Loose smut",
            "pests": "Aphids, Termites, Army worm",
            "yield": "4-5 tons/hectare",
            "market_price": "₹1800-2200 per quintal",
            "tips": "Timely sowing is crucial, apply fertilizers in splits, control weeds early"
        },
        "maize": {
            "name": "Maize/Corn",
            "season": "Summer/Monsoon",
            "duration": "80-110 days",
            "soil": "Well-drained loamy soil",
            "ph": "5.5-7.5",
            "temperature": "21-27°C",
            "rainfall": "50-75 cm",
            "irrigation": "Moderate, critical at flowering and grain filling",
            "npk": "N: 120 kg/ha, P: 60 kg/ha, K: 40 kg/ha",
            "diseases": "Maydis leaf blight, Turcicum leaf blight, Stalk rot",
            "pests": "Fall army worm, Stem borer, Shoot fly",
            "yield": "5-7 tons/hectare",
            "market_price": "₹1600-2000 per quintal",
            "tips": "Plant at proper spacing, ensure good drainage, protect from army worm"
        },
        "cotton": {
            "name": "Cotton",
            "season": "Monsoon (Kharif)",
            "duration": "150-180 days",
            "soil": "Black cotton soil, well-drained loamy soil",
            "ph": "6.0-7.5",
            "temperature": "21-30°C",
            "rainfall": "50-100 cm",
            "irrigation": "5-7 irrigations required",
            "npk": "N: 100-120 kg/ha, P: 50-60 kg/ha, K: 50-60 kg/ha",
            "diseases": "Wilt, Root rot, Leaf spot, Boll rot",
            "pests": "Bollworm, Aphids, Jassids, Whitefly",
            "yield": "20-25 quintals/hectare (lint)",
            "market_price": "₹5500-6500 per quintal",
            "tips": "Use Bt cotton varieties, integrated pest management, proper spacing and pruning"
        },
        "sugarcane": {
            "name": "Sugarcane",
            "season": "Year-round (perennial)",
            "duration": "10-18 months",
            "soil": "Deep, well-drained loamy soil",
            "ph": "6.5-7.5",
            "temperature": "20-26°C for germination, 30-35°C for growth",
            "rainfall": "75-150 cm",
            "irrigation": "Heavy water requirement, 15-20 irrigations",
            "npk": "N: 200-250 kg/ha, P: 80-100 kg/ha, K: 100-150 kg/ha",
            "diseases": "Red rot, Smut, Wilt, Rust",
            "pests": "Early shoot borer, Top borer, Pyrilla",
            "yield": "70-100 tons/hectare",
            "market_price": "₹280-350 per quintal",
            "tips": "Select disease-free seed cane, proper trash mulching, earthing up is essential"
        },
        "chickpea": {
            "name": "Chickpea/Gram",
            "season": "Winter (Rabi)",
            "duration": "100-120 days",
            "soil": "Well-drained loamy to clay loam soil",
            "ph": "6.0-7.5",
            "temperature": "20-25°C",
            "rainfall": "40-50 cm",
            "irrigation": "2-3 light irrigations",
            "npk": "N: 20 kg/ha, P: 40-60 kg/ha, K: 20 kg/ha (fixes own nitrogen)",
            "diseases": "Wilt, Blight, Root rot, Rust",
            "pests": "Pod borer, Aphids, Cut worm",
            "yield": "1.5-2.5 tons/hectare",
            "market_price": "₹4500-5500 per quintal",
            "tips": "Treat seeds with Rhizobium, avoid waterlogging, spray for pod borer"
        },
        "potato": {
            "name": "Potato",
            "season": "Winter (Rabi)",
            "duration": "90-120 days",
            "soil": "Well-drained loamy soil rich in organic matter",
            "ph": "5.5-6.5",
            "temperature": "15-25°C",
            "rainfall": "50-70 cm",
            "irrigation": "Regular light irrigations, 8-10 times",
            "npk": "N: 150-180 kg/ha, P: 80-100 kg/ha, K: 100-120 kg/ha",
            "diseases": "Late blight, Early blight, Wilt, Leaf roll virus",
            "pests": "Aphids, Potato tuber moth, Cut worm",
            "yield": "25-35 tons/hectare",
            "market_price": "₹800-1500 per quintal",
            "tips": "Use certified seed tubers, earthing up is crucial, store in cool dry place"
        },
        "tomato": {
            "name": "Tomato",
            "season": "Year-round (protected cultivation)",
            "duration": "60-80 days (after transplanting)",
            "soil": "Well-drained loamy soil rich in organic matter",
            "ph": "6.0-7.0",
            "temperature": "20-30°C",
            "rainfall": "Moderate, 60-150 cm",
            "irrigation": "Regular irrigation, drip irrigation preferred",
            "npk": "N: 100-120 kg/ha, P: 80 kg/ha, K: 60 kg/ha",
            "diseases": "Early blight, Late blight, Leaf curl virus, Wilt",
            "pests": "Fruit borer, Whitefly, Leaf miner",
            "yield": "40-60 tons/hectare",
            "market_price": "₹1000-3000 per quintal (seasonal variation)",
            "tips": "Use staking for support, regular pruning, mulching helps retain moisture"
        }
    },
    
    "farming_practices": {
        "crop_rotation": {
            "description": "Practice of growing different crops in sequence on the same land",
            "benefits": [
                "Improves soil fertility",
                "Reduces pest and disease buildup",
                "Breaks weed cycles",
                "Improves soil structure",
                "Reduces soil erosion"
            ],
            "examples": [
                "Rice → Wheat → Legume",
                "Cotton → Wheat → Chickpea",
                "Maize → Potato → Wheat"
            ]
        },
        "organic_farming": {
            "description": "Farming without synthetic chemicals, using natural inputs",
            "practices": [
                "Use of compost and farmyard manure",
                "Green manuring with leguminous crops",
                "Biological pest control",
                "Crop rotation and mixed cropping",
                "Use of bio-fertilizers (Rhizobium, Azotobacter)"
            ],
            "benefits": [
                "Improves soil health",
                "Environmentally sustainable",
                "Better product quality",
                "Higher market price for organic produce"
            ]
        },
        "integrated_pest_management": {
            "description": "Eco-friendly approach to manage pests using multiple strategies",
            "strategies": [
                "Cultural methods: crop rotation, resistant varieties",
                "Mechanical methods: traps, hand picking",
                "Biological control: natural predators, parasites",
                "Chemical control: as last resort, selective pesticides"
            ],
            "benefits": [
                "Reduced pesticide use",
                "Cost-effective",
                "Environmentally safe",
                "Sustainable pest control"
            ]
        },
        "water_management": {
            "description": "Efficient use of water resources in agriculture",
            "techniques": [
                "Drip irrigation: 40-60% water saving",
                "Sprinkler irrigation: 30-40% water saving",
                "Mulching: reduces evaporation",
                "Rainwater harvesting",
                "Laser land leveling"
            ],
            "benefits": [
                "Water conservation",
                "Reduced waterlogging",
                "Better crop yields",
                "Energy savings"
            ]
        }
    },
    
    "soil_management": {
        "soil_testing": {
            "importance": "Essential for knowing nutrient status and pH of soil",
            "parameters": ["Nitrogen (N)", "Phosphorus (P)", "Potassium (K)", "pH", "Organic carbon", "Micronutrients"],
            "frequency": "Once every 2-3 years",
            "benefits": [
                "Optimal fertilizer use",
                "Cost savings",
                "Better yields",
                "Prevents soil degradation"
            ]
        },
        "soil_health": {
            "indicators": [
                "Organic matter content: >0.5% is good",
                "pH level: 6.0-7.5 for most crops",
                "NPK levels: balanced nutrients",
                "Soil structure: good aggregation",
                "Biological activity: earthworms, microbes"
            ],
            "improvement": [
                "Add organic matter regularly",
                "Practice crop rotation",
                "Avoid over-tillage",
                "Use cover crops",
                "Balance fertilizer application"
            ]
        }
    },
    
    "government_schemes": {
        "pm_kisan": {
            "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
            "description": "Direct income support of ₹6000/year to farmers",
            "eligibility": "All landholding farmers",
            "benefits": "₹2000 in three equal installments"
        },
        "pm_fasal_bima": {
            "name": "PM Fasal Bima Yojana",
            "description": "Crop insurance scheme",
            "coverage": "Yield losses, prevented sowing, post-harvest losses",
            "premium": "1.5-2% of sum insured for farmers"
        },
        "soil_health_card": {
            "name": "Soil Health Card Scheme",
            "description": "Free soil testing for farmers",
            "benefits": "Crop-wise nutrient recommendations, saves fertilizer cost"
        },
        "kisan_credit_card": {
            "name": "Kisan Credit Card (KCC)",
            "description": "Credit facility for farmers",
            "benefits": "Short-term credit for cultivation, interest subvention of 2-3%"
        }
    },
    
    "modern_technologies": {
        "precision_agriculture": {
            "description": "Using technology for precise farm management",
            "tools": ["GPS-guided tractors", "Drones for monitoring", "Soil sensors", "Variable rate applicators"],
            "benefits": ["Optimized input use", "Higher yields", "Reduced environmental impact"]
        },
        "protected_cultivation": {
            "description": "Growing crops in controlled environment",
            "types": ["Polyhouse", "Greenhouse", "Net house", "Shade house"],
            "benefits": ["Year-round production", "Higher yields", "Quality produce", "Protection from weather"]
        }
    },
    
    "market_intelligence": {
        "selling_tips": [
            "Check daily market rates before selling",
            "Sell during peak demand seasons",
            "Consider direct marketing to consumers",
            "Form farmer producer organizations (FPOs)",
            "Use e-NAM platform for better prices"
        ],
        "storage": [
            "Proper cleaning and drying before storage",
            "Use improved storage structures",
            "Protect from pests and moisture",
            "Consider warehouse receipt system"
        ]
    }
}

def find_best_match(query: str) -> Dict[str, Any]:
    """Find the best matching response from knowledge base using keywords"""
    query_lower = query.lower()
    
    # Crop-specific queries
    for crop_key, crop_data in AGRICULTURE_KNOWLEDGE["crops"].items():
        if crop_key in query_lower or crop_data["name"].lower() in query_lower:
            return {
                "type": "crop",
                "data": crop_data,
                "crop_name": crop_data["name"]
            }
    
    # Farming practices
    practices = {
        "rotation": "crop_rotation",
        "organic": "organic_farming",
        "pest": "integrated_pest_management",
        "water": "water_management",
        "irrigation": "water_management"
    }
    
    for keyword, practice_key in practices.items():
        if keyword in query_lower:
            return {
                "type": "practice",
                "data": AGRICULTURE_KNOWLEDGE["farming_practices"][practice_key],
                "practice_name": practice_key.replace("_", " ").title()
            }
    
    # Soil management
    if any(word in query_lower for word in ["soil", "testing", "fertility", "ph", "nutrients"]):
        return {
            "type": "soil",
            "data": AGRICULTURE_KNOWLEDGE["soil_management"]
        }
    
    # Government schemes
    scheme_keywords = ["scheme", "subsidy", "government", "pm kisan", "insurance", "credit", "loan"]
    if any(word in query_lower for word in scheme_keywords):
        return {
            "type": "schemes",
            "data": AGRICULTURE_KNOWLEDGE["government_schemes"]
        }
    
    # Technology
    tech_keywords = ["technology", "precision", "drone", "greenhouse", "polyhouse", "modern"]
    if any(word in query_lower for word in tech_keywords):
        return {
            "type": "technology",
            "data": AGRICULTURE_KNOWLEDGE["modern_technologies"]
        }
    
    # Market
    market_keywords = ["market", "price", "selling", "storage", "sell"]
    if any(word in query_lower for word in market_keywords):
        return {
            "type": "market",
            "data": AGRICULTURE_KNOWLEDGE["market_intelligence"]
        }
    
    return {"type": "general", "data": None}

def format_crop_response(crop_data: Dict, crop_name: str) -> str:
    """Format crop information into a readable response"""
    response = f"🌾 **{crop_name}** Information:\n\n"
    response += f"**Season:** {crop_data['season']}\n"
    response += f"**Duration:** {crop_data['duration']}\n\n"
    response += f"**Soil Requirements:**\n{crop_data['soil']}\n"
    response += f"**pH:** {crop_data['ph']}\n\n"
    response += f"**Climate:**\n"
    response += f"- Temperature: {crop_data['temperature']}\n"
    response += f"- Rainfall: {crop_data['rainfall']}\n\n"
    response += f"**Irrigation:** {crop_data['irrigation']}\n\n"
    response += f"**Fertilizer Requirements:**\n{crop_data['npk']}\n\n"
    response += f"**Common Diseases:** {crop_data['diseases']}\n"
    response += f"**Common Pests:** {crop_data['pests']}\n\n"
    response += f"**Expected Yield:** {crop_data['yield']}\n"
    response += f"**Market Price:** {crop_data['market_price']}\n\n"
    response += f"**💡 Farming Tips:**\n{crop_data['tips']}"
    
    return response

def format_practice_response(practice_data: Dict, practice_name: str) -> str:
    """Format farming practice information"""
    response = f"🌱 **{practice_name}**\n\n"
    response += f"{practice_data['description']}\n\n"
    
    if 'practices' in practice_data:
        response += "**Key Practices:**\n"
        for practice in practice_data['practices']:
            response += f"• {practice}\n"
        response += "\n"
    
    if 'strategies' in practice_data:
        response += "**Strategies:**\n"
        for strategy in practice_data['strategies']:
            response += f"• {strategy}\n"
        response += "\n"
    
    if 'techniques' in practice_data:
        response += "**Techniques:**\n"
        for technique in practice_data['techniques']:
            response += f"• {technique}\n"
        response += "\n"
    
    if 'benefits' in practice_data:
        response += "**Benefits:**\n"
        for benefit in practice_data['benefits']:
            response += f"✓ {benefit}\n"
    
    if 'examples' in practice_data:
        response += "\n**Examples:**\n"
        for example in practice_data['examples']:
            response += f"• {example}\n"
    
    return response

def format_soil_response(soil_data: Dict) -> str:
    """Format soil management information"""
    response = "🌍 **Soil Management**\n\n"
    
    response += "**Soil Testing:**\n"
    testing = soil_data['soil_testing']
    response += f"{testing['importance']}\n\n"
    response += f"**Parameters to Test:** {', '.join(testing['parameters'])}\n"
    response += f"**Frequency:** {testing['frequency']}\n\n"
    response += "**Benefits:**\n"
    for benefit in testing['benefits']:
        response += f"✓ {benefit}\n"
    
    response += "\n**Soil Health Indicators:**\n"
    health = soil_data['soil_health']
    for indicator in health['indicators']:
        response += f"• {indicator}\n"
    
    response += "\n**Ways to Improve Soil Health:**\n"
    for improvement in health['improvement']:
        response += f"✓ {improvement}\n"
    
    return response

def format_schemes_response(schemes_data: Dict) -> str:
    """Format government schemes information"""
    response = "🏛️ **Government Schemes for Farmers**\n\n"
    
    for scheme_key, scheme in schemes_data.items():
        response += f"**{scheme['name']}**\n"
        response += f"{scheme['description']}\n"
        if 'eligibility' in scheme:
            response += f"Eligibility: {scheme['eligibility']}\n"
        if 'benefits' in scheme:
            response += f"Benefits: {scheme['benefits']}\n"
        if 'coverage' in scheme:
            response += f"Coverage: {scheme['coverage']}\n"
        if 'premium' in scheme:
            response += f"Premium: {scheme['premium']}\n"
        response += "\n"
    
    return response

def format_technology_response(tech_data: Dict) -> str:
    """Format technology information"""
    response = "🚀 **Modern Agricultural Technologies**\n\n"
    
    for tech_key, tech in tech_data.items():
        response += f"**{tech['description']}**\n\n"
        if 'tools' in tech:
            response += "Tools:\n"
            for tool in tech['tools']:
                response += f"• {tool}\n"
        if 'types' in tech:
            response += "Types:\n"
            for type_item in tech['types']:
                response += f"• {type_item}\n"
        response += "\nBenefits:\n"
        for benefit in tech['benefits']:
            response += f"✓ {benefit}\n"
        response += "\n"
    
    return response

def format_market_response(market_data: Dict) -> str:
    """Format market intelligence information"""
    response = "💰 **Market Intelligence & Selling Tips**\n\n"
    
    response += "**Smart Selling Strategies:**\n"
    for tip in market_data['selling_tips']:
        response += f"✓ {tip}\n"
    
    response += "\n**Storage Best Practices:**\n"
    for tip in market_data['storage']:
        response += f"✓ {tip}\n"
    
    return response

def get_suggestions(match_type: str) -> List[str]:
    """Get relevant follow-up suggestions based on query type"""
    suggestions_map = {
        "crop": [
            "Tell me about soil requirements",
            "What are common diseases?",
            "How to increase yield?",
            "Market price information"
        ],
        "practice": [
            "Tell me about organic farming",
            "Water management techniques",
            "Integrated pest management",
            "Crop rotation benefits"
        ],
        "soil": [
            "How to improve soil fertility?",
            "Soil testing process",
            "Organic matter importance",
            "pH management"
        ],
        "schemes": [
            "PM-KISAN details",
            "Crop insurance schemes",
            "Kisan Credit Card",
            "Soil Health Card"
        ],
        "technology": [
            "Precision agriculture",
            "Greenhouse farming",
            "Drip irrigation",
            "Drone technology"
        ],
        "market": [
            "Best time to sell",
            "Storage techniques",
            "Market trends",
            "e-NAM platform"
        ],
        "general": [
            "Tell me about rice cultivation",
            "Government schemes for farmers",
            "Soil testing importance",
            "Modern farming technologies",
            "Organic farming practices",
            "Water conservation methods"
        ]
    }
    
    return suggestions_map.get(match_type, suggestions_map["general"])

@router.post("/chatbot", response_model=ChatResponse)
async def chat_with_bot(message: ChatMessage):
    """
    Agriculture chatbot endpoint - Provides comprehensive farming information
    
    Topics covered:
    - Crop-specific information (rice, wheat, maize, cotton, etc.)
    - Farming practices (organic farming, IPM, crop rotation)
    - Soil management and testing
    - Government schemes and subsidies
    - Modern agricultural technologies
    - Market intelligence and selling tips
    """
    try:
        query = message.message.strip()
        
        if not query:
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        # Find best matching information
        match = find_best_match(query)
        
        # Format response based on match type
        if match["type"] == "crop":
            response_text = format_crop_response(match["data"], match["crop_name"])
            category = f"Crop Information - {match['crop_name']}"
            
        elif match["type"] == "practice":
            response_text = format_practice_response(match["data"], match["practice_name"])
            category = "Farming Practices"
            
        elif match["type"] == "soil":
            response_text = format_soil_response(match["data"])
            category = "Soil Management"
            
        elif match["type"] == "schemes":
            response_text = format_schemes_response(match["data"])
            category = "Government Schemes"
            
        elif match["type"] == "technology":
            response_text = format_technology_response(match["data"])
            category = "Agricultural Technology"
            
        elif match["type"] == "market":
            response_text = format_market_response(match["data"])
            category = "Market Intelligence"
            
        else:
            # General welcome/help message
            response_text = """👋 **Welcome to Agriculture Assistant!**

I'm here to help you with comprehensive farming information. I can assist you with:

🌾 **Crop Information**
- Detailed cultivation guides for rice, wheat, maize, cotton, sugarcane, chickpea, potato, tomato, and more
- Season, soil, climate, and irrigation requirements
- Disease and pest management
- Expected yields and market prices

🌱 **Farming Practices**
- Organic farming methods
- Crop rotation strategies
- Integrated Pest Management (IPM)
- Water management and conservation

🌍 **Soil Management**
- Soil testing and analysis
- Improving soil fertility
- pH management
- Nutrient management

🏛️ **Government Schemes**
- PM-KISAN Samman Nidhi
- PM Fasal Bima Yojana
- Soil Health Card Scheme
- Kisan Credit Card

🚀 **Modern Technologies**
- Precision agriculture
- Protected cultivation
- Drip and sprinkler irrigation
- Drone applications

💰 **Market Intelligence**
- Selling strategies
- Storage best practices
- Market trends

**How can I help you today? Ask me anything about farming!**"""
            category = "General Information"
        
        # Get relevant suggestions
        suggestions = get_suggestions(match["type"])
        
        return ChatResponse(
            response=response_text,
            category=category,
            suggestions=suggestions,
            timestamp=datetime.utcnow().isoformat()
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in chatbot: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Chatbot error: {str(e)}"
        )

@router.get("/chatbot/topics")
async def get_available_topics():
    """Get all available topics the chatbot can help with"""
    return {
        "crops": list(AGRICULTURE_KNOWLEDGE["crops"].keys()),
        "farming_practices": list(AGRICULTURE_KNOWLEDGE["farming_practices"].keys()),
        "soil_management": list(AGRICULTURE_KNOWLEDGE["soil_management"].keys()),
        "government_schemes": list(AGRICULTURE_KNOWLEDGE["government_schemes"].keys()),
        "technologies": list(AGRICULTURE_KNOWLEDGE["modern_technologies"].keys()),
        "total_topics": sum([
            len(AGRICULTURE_KNOWLEDGE["crops"]),
            len(AGRICULTURE_KNOWLEDGE["farming_practices"]),
            len(AGRICULTURE_KNOWLEDGE["soil_management"]),
            len(AGRICULTURE_KNOWLEDGE["government_schemes"]),
            len(AGRICULTURE_KNOWLEDGE["modern_technologies"])
        ])
    }

