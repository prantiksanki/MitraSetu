import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import ParticleField from './ParticleField';
import FloatingShapes from './FloatingShapes';
import {useNavigate} from 'react-router-dom'

const Hero = () => {

  const navigate=useNavigate()
  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <ParticleField />
            <FloatingShapes />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-full bg-white/80 backdrop-blur-sm"
          >
            <Star size={16} className="mr-2" />
            Connecting Communities, Building Bridges
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl font-bold leading-tight text-gray-900 sm:text-6xl lg:text-7xl"
          >
            Welcome to{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text">
              MitraSetu
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-600 sm:text-2xl"
          >
            Bridging connections and fostering relationships through innovative solutions.
            Experience the future of community building.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
          >
           <button
            className="flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform rounded-full group bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
            onClick={() => {
              navigate('/auth');
            }}
          >
            Get Started
            <ArrowRight
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              size={20}
            />
          </button>

            <button className="px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 transform border border-gray-200 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl hover:scale-105">
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute transform -translate-x-1/2 bottom-10 left-1/2"
        >
          <div className="flex justify-center w-6 h-10 border-2 border-gray-400 rounded-full">
            <div className="w-1 h-3 mt-2 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
