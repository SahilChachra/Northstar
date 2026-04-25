/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { PRICING_PLANS } from '../constants';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-steel-blue mb-4"
          >
            Choose Your Plan
          </motion.h2>
          <div className="h-1 w-20 bg-tan-beige mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all hover:scale-105 ${
                plan.popular ? 'border-sky-blue scale-105 shadow-sky-blue/20' : 'border-gray-50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-blue text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
                  Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-steel-blue mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 font-medium">/ {plan.duration}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex gap-3 text-gray-600 font-medium">
                    <Check className="w-5 h-5 text-sky-blue flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                plan.popular 
                  ? 'bg-sky-blue text-white shadow-lg shadow-sky-blue/30 hover:bg-steel-blue' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
