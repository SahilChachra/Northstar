/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { School, Users, Route, Brain } from 'lucide-react';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon, title, description, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all"
    >
      <div className="w-14 h-14 bg-sky-blue/10 rounded-2xl flex items-center justify-center text-sky-blue mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-steel-blue mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function Features() {
  const features = [
    {
      icon: <School className="w-8 h-8" />,
      title: "Match Profile with Ivy Leagues",
      description: "See how you stack up against Ivy League requirements and get personalized recommendations"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Match Profiles with Successful Candidates",
      description: "Compare your profile with students who got into your target universities"
    },
    {
      icon: <Route className="w-8 h-8" />,
      title: "Generate Your Path to Dream University",
      description: "Get a personalized roadmap with actionable steps to strengthen your application"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Aptitude Tests to Prepare",
      description: "Take psychometric and aptitude tests designed for university admissions"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-steel-blue mb-4"
          >
            Powered by AI to Help You Reach Your Dream University
          </motion.h2>
          <div className="h-1 w-20 bg-tan-beige mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
