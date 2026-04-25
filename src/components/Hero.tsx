/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-sky-blue/20 via-steel-blue/10 to-tan-beige/20" />
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4682B4 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="p-3 bg-white rounded-2xl shadow-xl">
              <Compass className="w-12 h-12 text-sky-blue" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tight text-steel-blue mb-6"
          >
            NorthStar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl text-sky-blue font-bold mb-4"
          >
            Find your path
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            One-stop solution for all your university needs. Personalized guidance for future leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/signup"
              className="bg-sky-blue text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-steel-blue hover:scale-105 transition-all shadow-lg shadow-sky-blue/30 inline-block"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/login"
              className="bg-white text-steel-blue border-2 border-steel-blue px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all inline-block"
            >
              Login
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Blob */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-tan-beige/30 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 -left-20 w-80 h-80 bg-sky-blue/20 rounded-full blur-3xl -z-10"
      />
    </section>
  );
}
