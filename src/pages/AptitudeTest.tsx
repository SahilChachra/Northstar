/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, Calculator, FileText, ChevronLeft, ChevronRight, 
  Flag, X, Check, CheckCircle2, Award, ArrowRight, Home, Info,
  Search, Maximize2, RotateCcw, PenTool, Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MATH_QUESTIONS = [
  {
    id: 1,
    type: 'No Calculator',
    text: "If 3x + 7 = 22, what is the value of x?",
    options: ['3', '5', '7', '15'],
    correct: 'B',
    explanation: "Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5.",
    category: 'Heart of Algebra'
  },
  {
    id: 2,
    type: 'Calculator Allowed',
    text: "A rectangle has a length of 12 cm and a width of 8 cm. What is its area?",
    options: ['20 cm²', '40 cm²', '96 cm²', '144 cm²'],
    correct: 'C',
    explanation: "Area of a rectangle = length × width = 12 × 8 = 96.",
    category: 'Problem Solving'
  },
  {
    id: 3,
    type: 'No Calculator',
    text: "Which of the following is equivalent to (x + 3)² ?",
    options: ['x² + 9', 'x² + 6x + 9', 'x² + 3x + 9', 'x² + 6x + 3'],
    correct: 'B',
    explanation: "(x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9.",
    category: 'Passport to Advanced Math'
  },
  {
    id: 4,
    type: 'Calculator Allowed',
    text: "The ratio of boys to girls in a class is 3:4. If there are 21 boys, how many girls are there?",
    options: ['24', '28', '32', '36'],
    correct: 'B',
    explanation: "3/4 = 21/x => 3x = 84 => x = 28.",
    category: 'Problem Solving'
  },
  {
    id: 5,
    type: 'Calculator Allowed',
    text: "A store sells a jacket for ₹2,400 after a 20% discount. What was the original price?",
    options: ['₹2,880', '₹3,000', '₹3,200', '₹3,600'],
    correct: 'B',
    explanation: "0.80 × Price = 2400 => Price = 2400 / 0.8 = 3000.",
    category: 'Heart of Algebra'
  },
  {
    id: 6,
    type: 'No Calculator',
    text: "What is the slope of the line that passes through the points (2, 5) and (4, 9)?",
    options: ['1/2', '2', '4', '8'],
    correct: 'B',
    explanation: "(9 - 5) / (4 - 2) = 4 / 2 = 2.",
    category: 'Heart of Algebra'
  }
];

export default function AptitudeTest() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [crossedOut, setCrossedOut] = useState<Record<number, string[]>>({});
  const [timeLeft, setTimeLeft] = useState(3900); // 65 minutes
  const [showCalculator, setShowCalculator] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTestSubmitted(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const currentQ = MATH_QUESTIONS[currentIdx];
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`;
  };

  const handleCrossOut = (id: string) => {
    const current = crossedOut[currentQ.id] || [];
    if (current.includes(id)) {
      setCrossedOut({ ...crossedOut, [currentQ.id]: current.filter(x => x !== id) });
    } else {
      setCrossedOut({ ...crossedOut, [currentQ.id]: [...current, id] });
    }
  };

  const handleStartDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;
    ctx.moveTo(x, y);
  };

  const handleDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearScratchpad = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  if (testSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
           <header className="text-center mb-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-sky-blue rounded-[30px] flex items-center justify-center text-white shadow-xl shadow-sky-blue/20">
                   <Trophy className="w-10 h-10" />
                </div>
              </motion.div>
              <h1 className="text-4xl font-black text-steel-blue mb-2">SAT Math Results</h1>
              <p className="text-gray-500 font-bold">Comprehensive analysis of your performance</p>
           </header>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center">
                 <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Total Score</p>
                 <p className="text-4xl font-black text-steel-blue">720<span className="text-sm text-gray-300">/800</span></p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center">
                 <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Correct</p>
                 <p className="text-4xl font-black text-green-500">34<span className="text-sm text-gray-300">/40</span></p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center">
                 <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Percentile</p>
                 <p className="text-4xl font-black text-sky-blue">85th</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center">
                 <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Avg Time</p>
                 <p className="text-4xl font-black text-tan-beige">1.6<span className="text-sm text-gray-300">m/q</span></p>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                 <div className="bg-white p-8 rounded-[40px] shadow-xl">
                    <h3 className="text-xl font-bold text-steel-blue mb-8">Section Breakdown</h3>
                    <div className="space-y-6">
                      {[
                        { name: 'Heart of Algebra', score: 15, total: 18, color: 'bg-sky-blue' },
                        { name: 'Problem Solving & Data', score: 11, total: 12, color: 'bg-green-500' },
                        { name: 'Passport to Advanced Math', score: 8, total: 10, color: 'bg-tan-beige' },
                      ].map((item, i) => (
                        <div key={i}>
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-bold text-gray-600">{item.name}</span>
                              <span className="text-xs font-black text-steel-blue">{item.score}/{item.total} ({Math.round((item.score/item.total)*100)}%)</span>
                           </div>
                           <div className="h-3 bg-gray-50 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.score/item.total)*100}%` }}
                                className={`h-full ${item.color} rounded-full`}
                              />
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>

                 <div className="bg-white p-8 rounded-[40px] shadow-xl">
                    <h3 className="text-xl font-bold text-steel-blue mb-6">Recommendations</h3>
                    <div className="bg-sky-blue/5 p-6 rounded-3xl border border-sky-blue/10">
                       <p className="text-gray-700 leading-relaxed italic">
                         "Your performace in Problem Solving is exceptional. To reach 750+, focus on improving speed in Heart of Algebra and accuracy in complex Advanced Math questions."
                       </p>
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="bg-steel-blue p-8 rounded-[40px] text-white shadow-xl">
                    <h3 className="text-xl font-bold mb-6">Target Uni Match</h3>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="font-bold">MIT</span>
                          <span className="text-red-400 font-black">-80 pts</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="font-bold">Stanford</span>
                          <span className="text-red-400 font-black">-70 pts</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="font-bold">UC Berkeley</span>
                          <span className="text-green-400 font-black">+20 pts</span>
                       </div>
                    </div>
                 </div>

                 <button onClick={() => navigate('/dashboard')} className="w-full bg-sky-blue text-white py-4 rounded-2xl font-black shadow-lg shadow-sky-blue/30 flex items-center justify-center gap-2">
                    <Home className="w-5 h-5" /> Return Dashboard
                 </button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 relative z-50">
        <div className="flex items-center gap-6">
           <h1 className="font-black text-steel-blue text-lg">SAT Math Practice</h1>
           <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-sky-blue">
              <Timer className="w-5 h-5" />
              <span className="font-black text-sm tabular-nums">{formatTime(timeLeft)}</span>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={() => setShowCalculator(!showCalculator)}
             className={`p-3 rounded-xl transition-all ${showCalculator ? 'bg-sky-blue text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
             title="Calculator"
           >
             <Calculator className="w-5 h-5" />
           </button>
           <button 
             onClick={() => setShowFormula(!showFormula)}
             className={`p-3 rounded-xl transition-all ${showFormula ? 'bg-steel-blue text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
             title="Formulas"
           >
             <FileText className="w-5 h-5" />
           </button>
           <button 
             onClick={() => setIsScratchpadOpen(!isScratchpadOpen)}
             className={`p-3 rounded-xl transition-all ${isScratchpadOpen ? 'bg-tan-beige text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
             title="Scratchpad"
           >
             <PenTool className="w-5 h-5" />
           </button>
           <div className="h-8 w-px bg-gray-100 mx-2" />
           <button onClick={() => setTestSubmitted(true)} className="bg-sky-blue text-white px-6 py-2 rounded-xl font-black text-sm shadow-lg shadow-sky-blue/20">
              Finish
           </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
         {/* Split Interface */}
         <main className="flex-1 flex relative">
            {/* Question Side */}
            <div className={`p-12 overflow-y-auto transition-all duration-500 ${isScratchpadOpen ? 'w-1/2' : 'w-full'}`}>
               <div className="max-w-2xl mx-auto">
                  <div className="flex justify-between items-center mb-8">
                     <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase tracking-widest">{currentQ.category} • {currentQ.type}</span>
                     <span className="font-bold text-gray-300">Q{currentIdx + 1}/{MATH_QUESTIONS.length}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-steel-blue leading-relaxed mb-12">
                     {currentQ.text}
                  </h2>

                  <div className="space-y-4">
                     {currentQ.options.map((opt, i) => {
                        const id = String.fromCharCode(65 + i);
                        const isCrossed = crossedOut[currentQ.id]?.includes(id);
                        const isSelected = answers[currentQ.id] === id;

                        return (
                          <div key={id} className="relative group">
                             <button
                               onClick={() => !isCrossed && setAnswers({ ...answers, [currentQ.id]: id })}
                               className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-6 relative ${
                                 isCrossed ? 'opacity-30 grayscale cursor-not-allowed border-gray-100 line-through' :
                                 isSelected ? 'border-sky-blue bg-sky-blue/5 shadow-lg shadow-sky-blue/10' :
                                 'border-gray-100 hover:border-gray-200 bg-white'
                               }`}
                             >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                                  isSelected ? 'bg-sky-blue text-white' : 'bg-gray-100 text-gray-400'
                                }`}>
                                   {id}
                                </div>
                                <span className={`font-bold ${isSelected ? 'text-steel-blue' : 'text-gray-600'}`}>{opt}</span>
                                {isSelected && <CheckCircle2 className="w-6 h-6 text-sky-blue ml-auto" />}
                             </button>
                             <button 
                              onClick={() => handleCrossOut(id)}
                              className="absolute -right-3 -top-3 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:scale-110 transition-all z-10 border border-gray-50"
                              title="Cross Out"
                             >
                                <X className="w-4 h-4" />
                             </button>
                          </div>
                        );
                     })}
                  </div>

                  <div className="mt-16 flex justify-between items-center border-t border-gray-50 pt-8">
                     <button 
                       onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                       disabled={currentIdx === 0}
                       className="flex items-center gap-2 font-black text-gray-400 hover:text-steel-blue disabled:opacity-30"
                     >
                       <ChevronLeft className="w-5 h-5" /> Previous
                     </button>
                     <div className="flex gap-4">
                        <button 
                          onClick={() => setMarked({ ...marked, [currentQ.id]: !marked[currentQ.id] })}
                          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                            marked[currentQ.id] ? 'bg-orange-50 text-orange-600 border-2 border-orange-200' : 'text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          <Flag className={`w-5 h-5 ${marked[currentQ.id] ? 'fill-orange-600' : ''}`} /> Mark
                        </button>
                        <button 
                          onClick={() => currentIdx < MATH_QUESTIONS.length - 1 ? setCurrentIdx(currentIdx + 1) : setTestSubmitted(true)}
                          className="bg-sky-blue text-white px-10 py-3 rounded-2xl font-black shadow-lg shadow-sky-blue/30 hover:bg-steel-blue transition-all"
                        >
                          {currentIdx === MATH_QUESTIONS.length - 1 ? 'Finish' : 'Next'}
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Scratchpad Side */}
            <AnimatePresence>
               {isScratchpadOpen && (
                 <motion.div 
                   initial={{ x: '100%' }}
                   animate={{ x: 0 }}
                   exit={{ x: '100%' }}
                   className="w-1/2 border-l border-gray-100 bg-gray-50 flex flex-col relative z-20"
                 >
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                       <span className="text-xs font-black text-tan-beige uppercase tracking-widest">Scratchpad</span>
                       <div className="flex gap-2">
                          <button onClick={clearScratchpad} className="p-2 text-gray-400 hover:text-sky-blue" title="Clear All"><RotateCcw className="w-4 h-4" /></button>
                          <button onClick={() => setIsScratchpadOpen(false)} className="p-2 text-gray-400"><X className="w-4 h-4" /></button>
                       </div>
                    </div>
                    <div className="flex-1 relative cursor-crosshair">
                       <canvas 
                         ref={canvasRef}
                         width={800}
                         height={1000}
                         className="w-full h-full touch-none"
                         onMouseDown={handleStartDrawing}
                         onMouseMove={handleDraw}
                         onMouseUp={() => setIsDrawing(false)}
                         onMouseLeave={() => setIsDrawing(false)}
                       />
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
         </main>

         {/* Floating Calculator Overlay */}
         <AnimatePresence>
            {showCalculator && (
              <motion.div 
                drag
                initial={{ opacity: 0, scale: 0.9, x: 200, y: 100 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed bottom-24 right-12 w-80 bg-white shadow-2xl rounded-[32px] border border-gray-100 z-[100] overflow-hidden"
              >
                 <div className="bg-sky-blue p-4 flex justify-between items-center text-white cursor-move">
                    <span className="font-bold flex items-center gap-2"><Calculator className="w-4 h-4" /> Calculator</span>
                    <button onClick={() => setShowCalculator(false)}><X className="w-4 h-4" /></button>
                 </div>
                 <div className="p-6">
                    <div className="bg-gray-100 p-6 rounded-2xl mb-4 text-right">
                       <div className="text-xs text-gray-400 mb-1">0</div>
                       <div className="text-2xl font-bold text-steel-blue">0</div>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-center">
                       {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'].map(key => (
                         <button key={key} className={`p-4 rounded-xl font-bold ${
                           ['/','*','-','+','='].includes(key) ? 'bg-sky-blue/10 text-sky-blue' :
                           key === 'C' ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-steel-blue'
                         } hover:scale-105 active:scale-95 transition-all`}>
                            {key}
                         </button>
                       ))}
                    </div>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>

         {/* Formula Sheet Sidebar */}
         <AnimatePresence>
            {showFormula && (
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="fixed inset-0 z-[110] bg-steel-blue/40 backdrop-blur-sm flex items-center justify-center p-8"
              >
                 <motion.div className="bg-white w-full max-w-4xl p-12 rounded-[50px] shadow-2xl relative">
                    <button onClick={() => setShowFormula(false)} className="absolute top-8 right-8 p-3 bg-gray-100 rounded-full"><X /></button>
                    <h2 className="text-3xl font-black text-steel-blue mb-8">SAT Math Formulas</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                       {[
                         { name: "Circle Area", formula: "A = πr²" },
                         { name: "Circumference", formula: "C = 2πr" },
                         { name: "Rectangle Area", formula: "A = lw" },
                         { name: "Triangle Area", formula: "A = ½bh" },
                         { name: "Pythagorean", formula: "a² + b = c²" },
                         { name: "Cylinder Vol", formula: "V = πr²h" },
                         { name: "Sphere Vol", formula: "V = ⁴⁄₃πr³" },
                         { name: "Cone Vol", formula: "V = ⅓πr²h" },
                       ].map((f, i) => (
                         <div key={i} className="p-4 bg-gray-50 rounded-2xl">
                            <p className="text-[10px] font-black text-sky-blue uppercase mb-1">{f.name}</p>
                            <p className="text-xl font-black text-steel-blue">{f.formula}</p>
                         </div>
                       ))}
                    </div>
                 </motion.div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <aside className="h-16 border-t border-gray-100 flex items-center px-6 gap-2 bg-gray-50 overflow-x-auto whitespace-nowrap scrollbar-hide">
         {MATH_QUESTIONS.map((q, idx) => {
           const isAnswered = !!answers[q.id];
           const isMarked = marked[q.id];
           const isCurrent = currentIdx === idx;
           
           return (
             <button
               key={q.id}
               onClick={() => setCurrentIdx(idx)}
               className={`w-10 h-10 rounded-xl font-bold text-xs shrink-0 transition-all ${
                 isCurrent ? 'bg-sky-blue text-white shadow-lg' :
                 isMarked ? 'bg-orange-50 text-orange-600 border border-orange-200' :
                 isAnswered ? 'bg-steel-blue/10 text-steel-blue' : 'bg-white border border-gray-100 text-gray-300'
               }`}
             >
                {idx + 1}
             </button>
           );
         })}
      </aside>
    </div>
  );
}
