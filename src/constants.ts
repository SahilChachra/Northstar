/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const COLORS = {
  primary: '#4B9CD3',   // Sky Blue
  secondary: '#4682B4', // Steel Blue
  accent: '#D2B48C',    // Tan/Beige
  bgGradient: 'from-[#4B9CD3] via-[#4682B4] to-[#D2B48C]',
};

export const REVIEWS = [
  {
    name: "Priya Mehta",
    university: "Accepted at UC Berkeley",
    rating: 5,
    text: "NorthStar helped me identify gaps in my profile and gave me a clear roadmap. The AI analysis was spot-on!",
  },
  {
    name: "Rahul Kapoor",
    university: "Accepted at Stanford",
    rating: 5,
    text: "The quiz comparisons with successful candidates showed me exactly where I needed to improve. Got into my dream university!",
  },
  {
    name: "Ananya Singh",
    university: "Accepted at MIT",
    rating: 5,
    text: "The personalized path feature is a game-changer. It broke down everything I needed to do month by month.",
  },
  {
    name: "Kabir Patel",
    university: "Accepted at Cornell",
    rating: 4.5,
    text: "Amazing platform! The SOP review feature helped me craft a compelling story. Highly recommend!",
  },
];

export const PRICING_PLANS = [
  {
    name: "Free Trial",
    price: "₹0",
    duration: "7 Days",
    features: [
      "Limited quiz access",
      "Basic university matching",
      "AI chat (10 messages)",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Quiz Master",
    price: "₹799",
    duration: "One-time",
    features: [
      "All aptitude tests",
      "Psychometric assessments",
      "Detailed score analysis",
      "Performance history",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Complete Access",
    price: "₹1,799",
    duration: "One-time",
    features: [
      "Everything in Quiz Master",
      "University matching (unlimited)",
      "Personalized path generation",
      "Profile enhancement tools",
      "AI mentor (unlimited chat)",
      "SOP review & scoring",
    ],
    cta: "Go Premium",
    popular: false,
  },
];

export const JOURNEY_STEPS = [
  { step: 1, title: "Take Assessment Tests", icon: "ClipboardCheck" },
  { step: 2, title: "Discover Your Strengths", icon: "Zap" },
  { step: 3, title: "Match Universities", icon: "University" },
  { step: 4, title: "Build Your Profile", icon: "UserCircle" },
  { step: 5, title: "Apply with Confidence", icon: "Send" },
  { step: 6, title: "Get Accepted!", icon: "Trophy" },
];

export const DEMO_USER = {
  email: 'demo@northstar.edu',
  password: 'DemoUser2024!',
  name: 'Arjun Sharma',
  age: 17,
  grade: '12th',
  location: 'Mumbai, India',
  targetCourse: 'Computer Science',
  dreamUniversities: ['MIT', 'Stanford', 'Carnegie Mellon'],
  satScore: 1380,
  gpa: '3.7/4.0',
};
