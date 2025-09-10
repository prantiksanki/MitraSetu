import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Section3DCanvas from './Section3DCanvas';

const Contact = ({ scrollY = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="relative py-24 overflow-hidden bg-white">
      {/* 3D Background */}
      <Section3DCanvas type="sphere" color="#5f7fff" style={{ opacity: 0.18 }} scrollY={scrollY} />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
      
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ amount: 0.1 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Get in{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Touch
            </span>
          </h2>
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-600">
            Ready to start building meaningful connections? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            viewport={{ amount: 0.1 }}
            className="p-8 border shadow-lg bg-white/80 backdrop-blur-sm rounded-3xl border-white/50"
          >
            <h3 className="mb-8 text-2xl font-bold text-gray-900">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 transition-all duration-300 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 transition-all duration-300 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 transition-all duration-300 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className="w-full px-4 py-3 transition-all duration-300 border border-gray-200 resize-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-full py-4 text-lg font-semibold text-white transition-all duration-300 transform bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
              >
                Send Message
                <Send className="ml-2" size={20} />
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            viewport={{ amount: 0.1 }}
            className="space-y-8"
          >
            <div className="p-8 text-white bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl">
              <h3 className="mb-6 text-2xl font-bold">Let's Connect</h3>
              <p className="mb-8 text-lg leading-relaxed opacity-90">
                We're here to help you build the community of your dreams. 
                Reach out to us and let's start the conversation.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 bg-white/20 rounded-xl">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="opacity-90">hello@mitrasetu.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 bg-white/20 rounded-xl">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="opacity-90">+91 12345 67890</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 bg-white/20 rounded-xl">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="opacity-90">Mumbai, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border shadow-lg bg-white/80 backdrop-blur-sm rounded-3xl border-white/50">
              <h4 className="mb-4 text-xl font-bold text-gray-900">Follow Us</h4>
              <p className="mb-6 text-gray-600">
                Stay updated with our latest features and community highlights.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'Instagram', 'Facebook'].map((social) => (
                  <button
                    key={social}
                    className="flex items-center justify-center w-12 h-12 text-sm font-semibold text-white transition-transform duration-300 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl hover:scale-110"
                  >
                    {social[0]}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-12 mt-20 text-center border-t border-gray-200"
        >
          <p className="text-gray-600">
            © 2025 MitraSetu. All rights reserved. Building bridges, connecting hearts.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
