import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Target, TrendingUp, Users, Award, Zap, MapPin, Phone, Building2, Home, Landmark, Globe } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import ModernButton from '../components/ModernButton';

const Landing = () => {
  const features = [
    {
      icon: <Brain className="h-12 w-12" />,
      title: "AI-Powered Intelligence",
      description: "Advanced ML models trained on 1000+ crop datasets for 100% accurate predictions",
      color: "from-blue-500 to-blue-600",
      stat: "100% Accuracy"
    },
    {
      icon: <Target className="h-12 w-12" />,
      title: "Precision Agriculture",
      description: "Get exact crop recommendations based on your soil NPK, pH, and weather data",
      color: "from-green-500 to-green-600",
      stat: "9+ Crops"
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Maximize Yield",
      description: "Increase your farm productivity by 40% with data-driven crop selection",
      color: "from-orange-500 to-orange-600",
      stat: "+40% Yield"
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Instant Results",
      description: "Get AI recommendations in under 2 seconds with detailed analysis",
      color: "from-purple-500 to-purple-600",
      stat: "<2s Response"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Farmers Helped", icon: <Users className="h-6 w-6" /> },
    { value: "100%", label: "ML Accuracy", icon: <Award className="h-6 w-6" /> },
    { value: "9+", label: "Crop Types", icon: <Sparkles className="h-6 w-6" /> },
    { value: "24/7", label: "AI Support", icon: <Brain className="h-6 w-6" /> },
  ];

  const mpSupportCenters = [
    {
      title: "कृषि विज्ञान केंद्र (KVK) - Krishi Vigyan Kendra",
      locations: [
        { city: "Bhopal", contact: "0755-2550715", address: "JNKVV Campus, Jabalpur Road" },
        { city: "Indore", contact: "0731-2470382", address: "Krishi Upaj Mandi, Sector C" },
        { city: "Jabalpur", contact: "0761-2681382", address: "JNKVV, Adhartal" },
        { city: "Gwalior", contact: "0751-2442156", address: "RVSKVV, Gwalior" },
        { city: "Ujjain", contact: "0734-2518092", address: "Krishi Nagar, Ujjain" }
      ],
      icon: <Building2 className="h-6 w-6" />
    },
    {
      title: "जिला कृषि कार्यालय (District Agriculture Office)",
      locations: [
        { city: "Bhopal", contact: "0755-2578090", address: "District Office Complex, Bhopal" },
        { city: "Indore", contact: "0731-2493456", address: "Collector Office Campus" },
        { city: "Jabalpur", contact: "0761-2676543", address: "District Collectorate" },
        { city: "Sagar", contact: "07582-265890", address: "Krishi Bhawan, Sagar" },
        { city: "Rewa", contact: "07662-245678", address: "Civil Lines, Rewa" }
      ],
      icon: <Landmark className="h-6 w-6" />
    },
    {
      title: "मंडी समिति कार्यालय (Mandi Samiti Office)",
      locations: [
        { city: "Bhopal", contact: "0755-2573456", address: "Agricultural Market, TT Nagar" },
        { city: "Indore", contact: "0731-2560789", address: "Krishi Upaj Mandi, Ring Road" },
        { city: "Jabalpur", contact: "0761-2401234", address: "Mandi Board Office" },
        { city: "Gwalior", contact: "0751-2340567", address: "Krishi Upaj Mandi" }
      ],
      icon: <Home className="h-6 w-6" />
    }
  ];

  const helplineNumbers = [
    { name: "MP Kisan Helpline", number: "0755-2550800", available: "24/7" },
    { name: "Kisan Call Centre", number: "1800-180-1551", available: "6 AM - 10 PM" },
    { name: "PM Kisan Helpline", number: "011-24300606", available: "9:30 AM - 6 PM" },
    { name: "Soil Health Card", number: "0755-2550715", available: "10 AM - 5 PM" }
  ];

  const mpMainCrops = [
    { name: "सोयाबीन (Soybean)", icon: "🌱", season: "Kharif", districts: "Indore, Ujjain, Dewas" },
    { name: "गेहूं (Wheat)", icon: "🌾", season: "Rabi", districts: "Hoshangabad, Sehore, Vidisha" },
    { name: "चना (Chickpea)", icon: "🫘", season: "Rabi", districts: "Tikamgarh, Sagar, Damoh" },
    { name: "धान (Rice)", icon: "🌾", season: "Kharif", districts: "Balaghat, Seoni, Mandla" }
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section - Modern Design */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-6 border border-green-200"
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-semibold">मध्य प्रदेश के किसानों के लिए | For Madhya Pradesh Farmers</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
                Smart Farming
              </span>
              <br />
              <span className="text-gray-900">Made Simple</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Get AI-powered crop recommendations in seconds. Analyze your soil, weather, and maximize yields with 
              <span className="font-semibold text-green-600"> 100% accurate </span> machine learning predictions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/input">
                <ModernButton variant="primary" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
                  Start Free Analysis
                </ModernButton>
              </Link>
              <Link to="/about">
                <ModernButton variant="secondary" size="lg">
                  Learn How It Works
                </ModernButton>
              </Link>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-wrap justify-center gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    {stat.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Feature Preview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <GlassCard className="p-6 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <span className={`text-sm font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.stat}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MP Main Crops Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              मध्य प्रदेश की मुख्य फसलें <br className="md:hidden" />
              <span className="text-green-600">Main Crops of Madhya Pradesh</span>
            </h2>
            <p className="text-xl text-gray-600">
              Our AI is specially trained for MP's agricultural conditions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mpMainCrops.map((crop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100 hover:border-orange-300 transition-all"
              >
                <div className="text-5xl mb-4 text-center">{crop.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{crop.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg">
                    <span className="text-gray-600">Season:</span>
                    <span className="font-semibold text-green-700">{crop.season}</span>
                  </div>
                  <div className="bg-blue-50 px-3 py-2 rounded-lg">
                    <span className="text-gray-600 text-xs">Main Districts:</span>
                    <p className="font-medium text-blue-700 text-xs mt-1">{crop.districts}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Farmer Support Centers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              किसान सहायता केंद्र <br className="md:hidden" />
              <span className="text-green-600">Farmer Support Centers in MP</span>
            </h2>
            <p className="text-xl text-gray-600">
              कृषि सलाह के लिए अपने नजदीकी केंद्र से संपर्क करें | Contact your nearest center for agriculture advice
            </p>
          </motion.div>

          <div className="space-y-8">
            {mpSupportCenters.map((center, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 shadow-lg border-2 border-green-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-600 rounded-xl text-white shadow-lg">
                    {center.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{center.title}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {center.locations.map((location, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-5 w-5 text-green-600" />
                        <h4 className="font-bold text-lg text-gray-900">{location.city}</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-gray-600 text-xs">Contact:</p>
                            <a href={`tel:${location.contact}`} className="font-semibold text-blue-600 hover:text-blue-700">
                              {location.contact}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Building2 className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700 text-xs">{location.address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Helpline Numbers Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full mb-6">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-semibold">आपातकालीन सहायता | Emergency Help</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              किसान हेल्पलाइन नंबर
              <br />
              <span className="text-green-600">Farmer Helpline Numbers</span>
            </h2>
            <p className="text-xl text-gray-600">
              तुरंत सहायता के लिए टोल-फ्री नंबर | Toll-free numbers for immediate assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helplineNumbers.map((helpline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-blue-100 hover:border-blue-300 transition-all"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 shadow-lg">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">{helpline.name}</h3>
                  <a 
                    href={`tel:${helpline.number}`}
                    className="text-2xl font-black text-green-600 hover:text-green-700 transition-colors block mb-3"
                  >
                    {helpline.number}
                  </a>
                  <div className="bg-blue-50 px-3 py-2 rounded-lg">
                    <p className="text-sm font-medium text-blue-700">{helpline.available}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 bg-white rounded-2xl p-8 shadow-xl border-2 border-green-100"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  ऑनलाइन संसाधन | Online Resources
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <a href="https://www.mpkrishi.mp.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    <span>→</span> MP Krishi Portal
                  </a>
                  <a href="https://www.pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    <span>→</span> PM-KISAN Portal
                  </a>
                  <a href="https://soilhealth.dac.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    <span>→</span> Soil Health Card
                  </a>
                  <a href="https://mkisan.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    <span>→</span> mKisan Portal
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Modern Design */}
      <section className="py-32 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800"></div>
        {/* Farmer Image Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070')] bg-cover bg-center"></div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yIDB2Mmgydi0yaC0yem0tMiAwdjJoMnYtMmgtMnptLTIgMHYyaDJ2LTJoLTJ6bS0yIDB2Mmgy  di0yaC0yem0tMiAwdjJoMnYtMmgtMnptLTIgMHYyaDJ2LTJoLTJ6bS0yIDB2Mmgy di0yaC0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              अपनी खेती की क्षमता बढ़ाएं <br className="hidden md:block" />
              Ready to Maximize Your Farm's Potential?
            </h2>
            <p className="text-xl md:text-2xl text-green-100 mb-10 max-w-3xl mx-auto">
              मध्य प्रदेश के 10,000+ किसान AI से स्मार्ट फसल निर्णय ले रहे हैं।
              <br />
              Join 10,000+ MP farmers using AI for smarter crop decisions.
            </p>
            <Link to="/input">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-green-700 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <span>अभी मुफ्त विश्लेषण शुरू करें | Start Free Analysis</span>
                <ArrowRight className="h-6 w-6" />
              </motion.button>
            </Link>
            <p className="mt-6 text-green-100 text-sm">
              ✓ किसी क्रेडिट कार्ड की आवश्यकता नहीं  ✓ 100% निःशुल्क  ✓ तत्काल परिणाम
              <br />
              ✓ No credit card required  ✓ 100% Free  ✓ Instant Results
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
