/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ClipboardCheck, Zap, School, UserCircle, Send, Trophy, ArrowRight } from 'lucide-react';
import { JOURNEY_STEPS } from '../constants';

const ICON_MAP: Record<string, any> = {
  ClipboardCheck,
  Zap,
  University: School,
  UserCircle,
  Send,
  Trophy
};

export default function Mindmap() {
  return (
    <section id="journey" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-steel-blue mb-4"
          >
            Your Journey to Success
          </motion.h2>
          <div className="h-1 w-20 bg-tan-beige mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Connecting Line (Horizontal on desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-sky-blue/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {JOURNEY_STEPS.map((item, index) => {
              const Icon = ICON_MAP[item.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-sky-blue shadow-lg border-4 border-sky-blue/10 relative z-10">
                      <Icon className="w-10 h-10" />
                    </div>
                    {index < JOURNEY_STEPS.length - 1 && (
                      <div className="lg:hidden absolute left-1/2 -bottom-8 -translate-x-1/2 text-sky-blue/30">
                        <ArrowRight className="w-6 h-6 rotate-90" />
                      </div>
                    )}
                  </div>
                  <div className="text-center px-4">
                    <span className="block text-sm font-bold text-sky-blue mb-1 uppercase tracking-widest">Step {item.step}</span>
                    <h4 className="text-lg font-bold text-steel-blue leading-tight">{item.title}</h4>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
