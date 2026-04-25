/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, ChevronLeft, ChevronRight, Flag, BookOpen, 
  CheckCircle2, AlertCircle, Award, BarChart, Trophy, Home, Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 1,
    category: 'Personality',
    text: "When working on a group project, I prefer to:",
    options: [
      { id: 'A', text: "Take the leadership role and organize tasks" },
      { id: 'B', text: "Contribute ideas and collaborate equally" },
      { id: 'C', text: "Focus on my assigned part independently" },
      { id: 'D', text: "Support others and help where needed" }
    ]
  },
  {
    id: 2,
    category: 'Personality',
    text: "In stressful situations, I typically:",
    options: [
      { id: 'A', text: "Stay calm and think logically" },
      { id: 'B', text: "Seek advice from others" },
      { id: 'C', text: "Take immediate action" },
      { id: 'D', text: "Need time alone to process" }
    ]
  },
  {
    id: 3,
    category: 'Personality',
    text: "I feel most energized when:",
    options: [
      { id: 'A', text: "Solving complex problems" },
      { id: 'B', text: "Meeting new people" },
      { id: 'C', text: "Creating something new" },
      { id: 'D', text: "Helping others succeed" }
    ]
  },
  {
    id: 4,
    category: 'Personality',
    text: "My ideal work environment is:",
    options: [
      { id: 'A', text: "Fast-paced and challenging" },
      { id: 'B', text: "Collaborative and social" },
      { id: 'C', text: "Structured and predictable" },
      { id: 'D', text: "Flexible and autonomous" }
    ]
  },
  {
    id: 5,
    category: 'Personality',
    text: "When making decisions, I rely more on:",
    options: [
      { id: 'A', text: "Logic and data" },
      { id: 'B', text: "Intuition and feelings" },
      { id: 'C', text: "Past experiences" },
      { id: 'D', text: "Others' opinions" }
    ]
  },
  {
    id: 6,
    category: 'Logical Reasoning',
    text: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.",
    options: [
      { id: 'A', text: "True" },
      { id: 'B', text: "False" },
      { id: 'C', text: "Cannot be determined" }
    ]
  },
  {
    id: 7,
    category: 'Logical Reasoning',
    text: "Complete the sequence: 2, 6, 12, 20, 30, ?",
    options: [
      { id: 'A', text: "40" },
      { id: 'B', text: "42" },
      { id: 'C', text: "44" },
      { id: 'D', text: "48" }
    ]
  },
  {
    id: 8,
    category: 'Logical Reasoning',
    text: "Which word doesn't belong: Apple, Banana, Carrot, Grape, Orange",
    options: [
      { id: 'A', text: "Apple" },
      { id: 'B', text: "Banana" },
      { id: 'C', text: "Carrot" },
      { id: 'D', text: "Grape" }
    ]
  },
  {
    id: 9,
    category: 'Logical Reasoning',
    text: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    options: [
      { id: 'A', text: "5 minutes" },
      { id: 'B', text: "20 minutes" },
      { id: 'C', text: "100 minutes" },
      { id: 'D', text: "500 minutes" }
    ]
  },
  {
    id: 10,
    category: 'Logical Reasoning',
    text: "What comes next: J, F, M, A, M, J, ?",
    options: [
      { id: 'A', text: "J" },
      { id: 'B', text: "A" },
      { id: 'C', text: "S" },
      { id: 'D', text: "N" }
    ]
  },
  {
    id: 11,
    category: 'Situational Judgement',
    text: "You notice a classmate struggling with a concept you understand well, but you have your own deadline. You:",
    options: [
      { id: 'A', text: "Offer to help them after you finish your work" },
      { id: 'B', text: "Take time now to explain it briefly" },
      { id: 'C', text: "Direct them to resources that helped you" },
      { id: 'D', text: "Focus on your own work" }
    ]
  },
  {
    id: 12,
    category: 'Situational Judgement',
    text: "Your team disagrees on the approach for a project. You:",
    options: [
      { id: 'A', text: "Advocate strongly for your preferred approach" },
      { id: 'B', text: "Suggest voting on the options" },
      { id: 'C', text: "Propose a compromise combining ideas" },
      { id: 'D', text: "Defer to the majority opinion" }
    ]
  },
  {
    id: 13,
    category: 'Situational Judgement',
    text: "You found a wallet with some money and ID in a library. You:",
    options: [
      { id: 'A', text: "Keep it for a day to see if someone asks" },
      { id: 'B', text: "Hand it over to library lost & found" },
      { id: 'C', text: "Try to contact the owner directly" },
      { id: 'D', text: "Leave it there" }
    ]
  },
  {
    id: 14,
    category: 'Situational Judgement',
    text: "A project deadline is cut in half. You:",
    options: [
      { id: 'A', text: "Complain to the supervisor" },
      { id: 'B', text: "Work overtime to finish everything" },
      { id: 'C', text: "Prioritize major tasks and delegate" },
      { id: 'D', text: "Give up as it's impossible" }
    ]
  },
  {
    id: 15,
    category: 'Situational Judgement',
    text: "You made a mistake that no one noticed yet. You:",
    options: [
      { id: 'A', text: "Hope no one finds out" },
      { id: 'B', text: "Wait until someone points it out" },
      { id: 'C', text: "Report it immediately and offer a fix" },
      { id: 'D', text: "Blame it on the system" }
    ]
  },
  {
    id: 16,
    category: 'Abstract Reasoning',
    text: "In a series of shapes, if a circle becomes an ellipse, a square would likely become a:",
    options: [
      { id: 'A', text: "Triangle" },
      { id: 'B', text: "Rectangle" },
      { id: 'C', text: "Pentagon" },
      { id: 'D', text: "Rhombus" }
    ]
  },
  {
    id: 17,
    category: 'Abstract Reasoning',
    text: "If 123 is to 321, then 456 is to:",
    options: [
      { id: 'A', text: "654" },
      { id: 'B', text: "465" },
      { id: 'C', text: "546" },
      { id: 'D', text: "645" }
    ]
  },
  {
    id: 18,
    category: 'Abstract Reasoning',
    text: "Identify the odd shape in a set of 4-sided figures where one is open-ended.",
    options: [
      { id: 'A', text: "The open square" },
      { id: 'B', text: "The shaded rectangle" },
      { id: 'C', text: "The dotted rhombus" },
      { id: 'D', text: "The solid trapezoid" }
    ]
  },
  {
    id: 19,
    category: 'Abstract Reasoning',
    text: "If UP is 12, DOWN is:",
    options: [
      { id: 'A', text: "21" },
      { id: 'B', text: "34" },
      { id: 'C', text: "43" },
      { id: 'D', text: "24" }
    ]
  },
  {
    id: 20,
    category: 'Abstract Reasoning',
    text: "Which pattern matches better: Matrix of rotating arrows.",
    options: [
      { id: 'A', text: "Arrow pointing SE" },
      { id: 'B', text: "Arrow pointing NW" },
      { id: 'C', text: "Arrow pointing NE" },
      { id: 'D', text: "Arrow pointing SW" }
    ]
  }
];

export default function PsychometricTest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [testSubmitted, setTestSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = QUESTIONS[currentQuestion];

  const handleSelect = (optionId: string) => {
    setAnswers({ ...answers, [currentQ.id]: optionId });
  };

  const toggleMark = () => {
    setMarked({ ...marked, [currentQ.id]: !marked[currentQ.id] });
  };

  const handleSubmit = () => {
    setTestSubmitted(true);
  };

  if (testSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white max-w-4xl w-full rounded-[40px] shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="bg-steel-blue p-12 text-center text-white">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex justify-center mb-6"
            >
              <div className="w-24 h-24 bg-sky-blue rounded-3xl flex items-center justify-center shadow-lg">
                <Trophy className="w-12 h-12" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-black mb-2">Test Completed!</h1>
            <p className="text-sky-blue/80 font-bold">Your psychometric profile is ready.</p>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
               <div className="bg-gray-50 p-6 rounded-3xl text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Score</p>
                  <p className="text-4xl font-black text-steel-blue">85/100</p>
               </div>
               <div className="bg-gray-50 p-6 rounded-3xl text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Percentile</p>
                  <p className="text-4xl font-black text-sky-blue">88th</p>
               </div>
               <div className="bg-gray-50 p-6 rounded-3xl text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Type</p>
                  <p className="text-xl font-bold text-tan-beige">INTJ - Strategist</p>
               </div>
            </div>

            <div className="space-y-8">
               <div>
                  <h3 className="text-xl font-bold text-steel-blue mb-4 flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-sky-blue" /> Section Breakdown
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Personality', score: 90 },
                      { name: 'Logical Reasoning', score: 85 },
                      { name: 'Situational Judgement', score: 75 },
                      { name: 'Abstract Reasoning', score: 90 },
                    ].map((section, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
                          <span>{section.name}</span>
                          <span>{section.score}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${section.score}%` }}
                            className="h-full bg-sky-blue rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Strengths
                    </h4>
                    <ul className="text-sm text-green-700 space-y-2 font-medium">
                      <li>• Advance logical reasoning capabilities</li>
                      <li>• High proficiency in complex problem solving</li>
                      <li>• Strategic mindset for abstract patterns</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                    <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Areas to Develop
                    </h4>
                    <ul className="text-sm text-orange-700 space-y-2 font-medium">
                      <li>• Enhance team collaboration dynamics</li>
                      <li>• Work on cognitive flexibility in unexpected changes</li>
                      <li>• Develop empathy in leadership roles</li>
                    </ul>
                  </div>
               </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
               <button className="flex-1 bg-steel-blue text-white py-4 rounded-2xl font-bold hover:bg-sky-blue transition-colors flex items-center justify-center gap-2">
                 <BookOpen className="w-5 h-5" /> View Detailed Report
               </button>
               <button 
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-white border-2 border-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
               >
                 <Home className="w-5 h-5" /> Return to Dashboard
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-sky-blue rounded-xl flex items-center justify-center text-white shadow-lg">
             <Brain className="w-6 h-6" />
           </div>
           <h1 className="font-black text-steel-blue hidden md:block">Basic University Psychometric Test</h1>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <Timer className={`w-5 h-5 ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-sky-blue'}`} />
              <span className={`font-black ${timeLeft < 300 ? 'text-red-500' : 'text-steel-blue'}`}>{formatTime(timeLeft)}</span>
           </div>
           <button className="text-gray-400 font-bold hover:text-sky-blue transition-colors">Pause Test</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Interface */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-20">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
               <span className="bg-sky-blue/10 text-sky-blue px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">{currentQ.category}</span>
               <h2 className="text-3xl font-bold text-steel-blue mt-4">{currentQ.text}</h2>
            </div>

            <div className="space-y-4 mb-12">
               {currentQ.options.map((opt) => (
                 <button
                   key={opt.id}
                   onClick={() => handleSelect(opt.id)}
                   className={`w-full text-left p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${
                     answers[currentQ.id] === opt.id 
                       ? 'border-sky-blue bg-sky-blue/5 shadow-lg shadow-sky-blue/10' 
                       : 'border-gray-100 hover:border-gray-200 bg-white'
                   }`}
                 >
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-colors ${
                        answers[currentQ.id] === opt.id ? 'bg-sky-blue text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                      }`}>
                         {opt.id}
                      </div>
                      <span className={`font-bold ${answers[currentQ.id] === opt.id ? 'text-steel-blue' : 'text-gray-600'}`}>
                        {opt.text}
                      </span>
                   </div>
                   {answers[currentQ.id] === opt.id && (
                     <CheckCircle2 className="w-6 h-6 text-sky-blue" />
                   )}
                 </button>
               ))}
            </div>

            <div className="flex items-center justify-between">
               <button 
                 onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                 disabled={currentQuestion === 0}
                 className="flex items-center gap-2 text-gray-400 font-bold hover:text-steel-blue disabled:opacity-30 disabled:cursor-not-allowed"
               >
                 <ChevronLeft className="w-5 h-5" /> Previous
               </button>
               
               <div className="flex items-center gap-4">
                 <button 
                  onClick={toggleMark}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                    marked[currentQ.id] ? 'bg-orange-50 text-orange-600 border-2 border-orange-200' : 'text-gray-400 hover:bg-gray-50'
                  }`}
                 >
                   <Flag className={`w-5 h-5 ${marked[currentQ.id] ? 'fill-orange-600' : ''}`} /> Mark
                 </button>
                 
                 {currentQuestion === QUESTIONS.length - 1 ? (
                   <button 
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-green-500/30 hover:scale-105 transition-all"
                   >
                     Submit Test
                   </button>
                 ) : (
                   <button 
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    className="bg-sky-blue text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-sky-blue/30 hover:bg-steel-blue transition-all"
                   >
                     Next Question
                   </button>
                 )}
               </div>
            </div>
          </div>
        </main>

        {/* Question Navigator */}
        <aside className="hidden xl:block w-80 border-l border-gray-100 bg-gray-50 p-6 overflow-y-auto">
           <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Question Navigator</h3>
           <div className="grid grid-cols-4 gap-3 mb-8">
              {QUESTIONS.map((q, i) => {
                const isAnswered = !!answers[q.id];
                const isMarked = marked[q.id];
                const isCurrent = currentQuestion === i;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(i)}
                    className={`h-12 rounded-xl font-black text-sm transition-all relative border-2 ${
                      isCurrent ? 'border-sky-blue bg-white text-sky-blue scale-110 shadow-lg' : 
                      isMarked ? 'bg-orange-50 border-orange-200 text-orange-600' :
                      isAnswered ? 'bg-steel-blue border-steel-blue text-white' : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    {i + 1}
                    {isMarked && <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-600 rounded-full" />}
                  </button>
                );
              })}
           </div>

           <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                 <div className="w-4 h-4 bg-steel-blue rounded" />
                 <span className="text-xs font-bold text-gray-500">Answered ({Object.keys(answers).length})</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-4 h-4 bg-white border border-gray-200 rounded" />
                 <span className="text-xs font-bold text-gray-500">Unanswered ({QUESTIONS.length - Object.keys(answers).length})</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded" />
                 <span className="text-xs font-bold text-gray-500">Marked for Review ({Object.keys(marked).filter(k => marked[parseInt(k)]).length})</span>
              </div>
           </div>
        </aside>
      </div>

      {/* Progress Footer */}
      <footer className="h-4 bg-gray-100 relative">
         <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
           className="h-full bg-sky-blue"
         />
      </footer>
    </div>
  );
}
