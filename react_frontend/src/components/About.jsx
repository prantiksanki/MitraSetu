import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Heart, Zap, Shield } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Users,
      title: 'Community Building',
      description: 'Connect like-minded individuals and foster meaningful relationships.'
    },
    {
      icon: Heart,
      title: 'Trust & Support',
      description: 'Build a foundation of trust and mutual support within communities.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Cutting-edge solutions that adapt to your community needs.'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Safe and secure platform with privacy as our top priority.'
    }
  ];

  return (
    <section id="about" ref={ref} className="relative py-24 overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30"></div>
      
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            About{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              MitraSetu
            </span>
          </h2>
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-600">
            MitraSetu is more than just a platform—it's a bridge that connects hearts, minds, and communities. 
            We believe in the power of meaningful connections to transform lives and create lasting impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 transition-all duration-300 transform border border-gray-100 shadow-lg group bg-white/70 backdrop-blur-sm rounded-2xl hover:shadow-2xl hover:scale-105"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform duration-300 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl group-hover:scale-110">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="p-12 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl">
            <h3 className="mb-6 text-3xl font-bold sm:text-4xl">
              Join the MitraSetu Community
            </h3>
            <p className="max-w-3xl mx-auto mb-8 text-xl opacity-90">
              Be part of a revolutionary platform that's changing how communities connect, 
              grow, and thrive together.
            </p>
            <button className="px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 transform bg-white rounded-full shadow-lg hover:bg-gray-100 hover:scale-105">
              Get Started Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
