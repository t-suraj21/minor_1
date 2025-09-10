import { motion } from 'framer-motion';
import { 
  Brain, 
  Database, 
  Target, 
  Users, 
  TrendingUp, 
  Leaf,
  Award,
  BarChart3
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "Machine Learning",
      description: "Our AI models are trained on thousands of agricultural datasets to provide accurate crop recommendations based on your specific conditions."
    },
    {
      icon: <Database className="h-8 w-8 text-green-600" />,
      title: "Comprehensive Data",
      description: "We analyze soil composition, weather patterns, regional climate data, and market trends to give you the complete picture."
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Precision Agriculture",
      description: "Get recommendations tailored to your exact location, soil type, and farming preferences for maximum yield optimization."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: "Yield Optimization",
      description: "Our recommendations focus on maximizing your crop yield while considering sustainability and environmental factors."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Farmers Helped", icon: <Users className="h-6 w-6" /> },
    { number: "95%", label: "Accuracy Rate", icon: <Target className="h-6 w-6" /> },
    { number: "50+", label: "Crop Types", icon: <Leaf className="h-6 w-6" /> },
    { number: "25%", label: "Avg. Yield Increase", icon: <TrendingUp className="h-6 w-6" /> }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Agricultural Data Scientist",
      description: "PhD in Agricultural Engineering with 15+ years in precision farming and AI applications."
    },
    {
      name: "Mike Chen",
      role: "Machine Learning Engineer",
      description: "Expert in developing predictive models for agricultural optimization and crop yield forecasting."
    },
    {
      name: "Dr. Raj Patel",
      role: "Soil Science Specialist",
      description: "Leading researcher in soil health analytics and sustainable farming practices."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-green-600">CropAI</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing agriculture with AI-powered crop recommendations, 
              helping farmers make data-driven decisions for sustainable and profitable farming.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To empower farmers worldwide with intelligent, data-driven crop recommendations 
                that maximize yield, optimize resource usage, and promote sustainable agricultural practices.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By combining cutting-edge machine learning with comprehensive agricultural data, 
                we're making precision farming accessible to farmers of all scales.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                  <Leaf className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Smart Farming</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Data-Driven Decisions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Precision Agriculture</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <span className="text-gray-700">Yield Optimization</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Help Farmers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced AI technology analyzes multiple factors to provide 
              the most accurate crop recommendations for your specific conditions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that showcase the difference we're making in agriculture
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 text-green-600">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Experts
            </h2>
            <p className="text-xl text-gray-600">
              A team of agricultural scientists, data experts, and AI specialists
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Cutting-Edge Technology
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Award className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Advanced ML Models</h3>
                    <p className="text-gray-600">
                      Our algorithms analyze over 50 different parameters including soil composition, 
                      weather patterns, and historical yield data.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Database className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Real-time Data Integration</h3>
                    <p className="text-gray-600">
                      We continuously update our models with the latest weather forecasts, 
                      market prices, and agricultural research.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Target className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">SHAP Explainability</h3>
                    <p className="text-gray-600">
                      Every recommendation comes with clear explanations of which factors 
                      influenced the decision, ensuring transparency.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-8 text-white"
            >
              <Brain className="h-16 w-16 mb-6" />
              <h3 className="text-2xl font-bold mb-4">AI-Powered Insights</h3>
              <p className="text-green-100 mb-6">
                Our neural networks process vast amounts of agricultural data to predict 
                the best crops for your specific conditions with 95% accuracy.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">Multi-layer neural networks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">Random forest algorithms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">Feature importance analysis</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
