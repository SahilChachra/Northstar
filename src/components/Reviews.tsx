/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../constants';

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-steel-blue mb-4"
          >
            What Students Say About Us
          </motion.h2>
          <div className="h-1 w-20 bg-tan-beige mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col relative"
            >
              <Quote className="absolute top-4 right-4 text-sky-blue/10 w-12 h-12" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                  />
                ))}
              </div>

              <p className="text-gray-600 mb-6 flex-grow italic">"{review.text}"</p>

              <div className="mt-auto border-t pt-4">
                <h4 className="font-bold text-steel-blue">{review.name}</h4>
                <p className="text-sm font-semibold text-sky-blue">{review.university}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
