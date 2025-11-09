import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Target, TrendingUp, Users, Award, Zap } from 'lucide-react';
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
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">भारत का पहला AI कृषि सहायक | India's First AI Agriculture Assistant</span>
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

      {/* CTA Section - Modern Design */}
      <section className="py-32 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800"></div>
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
              Ready to Maximize Your <br className="hidden md:block" />
              Farm's Potential?
            </h2>
            <p className="text-xl md:text-2xl text-green-100 mb-10 max-w-3xl mx-auto">
              Join 10,000+ farmers using AI to make smarter crop decisions.
              Get started in under 2 minutes.
            </p>
            <Link to="/input">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-green-700 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <span>Start Free Analysis Now</span>
                <ArrowRight className="h-6 w-6" />
              </motion.button>
            </Link>
            <p className="mt-6 text-green-100 text-sm">
              ✓ No credit card required  ✓ 100% Free  ✓ Instant Results
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
