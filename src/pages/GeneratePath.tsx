/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, CheckCircle2, Circle, ChevronDown, ChevronUp, 
  BookOpen, Target, Cpu, Beaker, FileText, Send, 
  MoreVertical, Download, Users, Settings2, Sparkles,
  MessageCircle, X, ChevronRight, BarChart3, TrendingUp, GraduationCap, PieChart, User
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const PATH_STEPS = [
  {
    id: 'step-0',
    month: 'Jan 2024',
    title: 'Profile Assessment Complete',
    focus: 'Assessment',
    status: 'completed',
    items: [
      { text: 'SAT Score: 1380', done: true },
      { text: 'GPA: 3.7', done: true },
      { text: 'Target: Computer Science at MIT/Stanford/CMU', done: true }
    ]
  },
  {
    id: 'step-1',
    month: 'Feb - Mar 2024',
    title: 'Focus: SAT Improvement',
    focus: 'Academics',
    status: 'active',
    goal: 'Increase SAT to 1450+',
    actions: [
      { text: 'Complete Khan Academy SAT Verbal module (15 hrs)', done: false },
      { text: 'Take 2 full-length practice tests', done: false },
      { text: 'Daily vocabulary building (30 min)', done: false },
      { text: 'Review all incorrect answers weekly', done: false }
    ],
    milestones: [
      { text: 'Week 1: Baseline reassessment', done: true },
      { text: 'Week 4: Practice test score 1420+', done: true },
      { text: 'Week 8: Ready for official test', done: false }
    ],
    resources: [
      'NorthStar SAT Prep Module',
      'College Board Official Tests',
      'Vocabulary flashcards (500 words)'
    ]
  },
  {
    id: 'step-2',
    month: 'Apr 2024',
    title: 'SAT Attempt & Project Initiation',
    focus: 'Standardized Tests',
    status: 'upcoming',
    goal: 'Score 1450+ on official SAT',
    actions: [
      { text: 'Take official SAT (April 13)', done: false },
      { text: 'Start significant CS project', done: false },
      { text: 'Research summer programs', done: false }
    ],
    projects: [
      'Machine learning mobile app',
      'Open-source contribution',
      'Educational tech tool'
    ]
  },
  {
    id: 'step-3',
    month: 'May - Jun 2024',
    title: 'Technical Skills & Leadership',
    focus: 'Extracurriculars',
    status: 'upcoming',
    goal: 'Build portfolio and leadership experience',
    actions: [
      { text: 'Complete main CS project (GitHub ready)', done: false },
      { text: 'Apply to 5 summer research programs', done: false },
      { text: 'Join/start CS club or hackathon team', done: false },
      { text: 'Complete online certification (AWS/Google)', done: false }
    ],
    deliverables: [
      'Working project demo',
      'Project documentation',
      'Summer program acceptance'
    ]
  },
  {
    id: 'step-4',
    month: 'Jul - Sep 2024',
    title: 'Summer Activities & SOP Prep',
    focus: 'Experience',
    status: 'upcoming',
    goal: 'Gain practical experience',
    actions: [
      { text: 'Attend summer research program', done: false },
      { text: 'Network with professors/mentors', done: false },
      { text: 'Draft SOP for each university', done: false },
      { text: 'Document experiences for essays', done: false }
    ],
    sopThemes: [
      'Your CS journey story',
      'Unique perspective/background',
      'Why each specific university'
    ]
  },
  {
    id: 'step-5',
    month: 'Oct - Nov 2024',
    title: 'Application Completion',
    focus: 'Applications',
    status: 'upcoming',
    goal: 'Submit all applications',
    actions: [
      { text: 'Finalize SOPs (reviewed by mentors)', done: false },
      { text: 'Request recommendation letters', done: false },
      { text: 'Complete all application forms', done: false },
      { text: 'Submit early action/decision apps', done: false }
    ],
    deadlines: [
      'Nov 1: MIT Early Action',
      'Nov 1: Carnegie Mellon Early Decision',
      'Nov 15: Other early deadlines'
    ]
  },
  {
    id: 'step-6',
    month: 'Dec 2024',
    title: 'Regular Applications',
    focus: 'Final Submissions',
    status: 'upcoming',
    goal: 'Complete remaining applications',
    actions: [
      { text: 'Submit all regular decision apps', done: false },
      { text: 'Prepare for interviews (if any)', done: false },
      { text: 'Monitor application portals', done: false }
    ]
  },
  {
    id: 'step-7',
    month: 'Jan - Apr 2025',
    title: 'Decision Period',
    focus: 'Results',
    status: 'upcoming',
    timeline: [
      'Dec-Jan: Early decision results',
      'March-April: Regular decision results',
      'May 1: Final decision deadline'
    ]
  }
];

export default function GeneratePath() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>('step-1');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', text: 'Hi Arjun! Your roadmap is ready. How can I help you adjust your strategy today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { type: 'user', text: input };
    setChatMessages([...chatMessages, userMsg]);
    setInput('');

    // Simple AI responses
    setTimeout(() => {
      let aiResponse = "That's a great request! I'm updating your path now...";
      if (input.toLowerCase().includes('robotics')) {
        aiResponse = "Absolutely! Robotics competitions are excellent for CS applications. I've added a note to your Month 4-5 timeline under Leadership. Which competition are you interested in? (e.g., FIRST Robotics, VEX)";
      } else if (input.toLowerCase().includes('summer')) {
        aiResponse = "Great question! I've built in backup options. If summer programs don't work out, you can: 1) Do an online research project, 2) Create an intensive personal project, or 3) Seek local internships.";
      } else if (input.toLowerCase().includes('prep')) {
        aiResponse = "Of course! I can spread the SAT prep over 3 months instead of 2. This would move your target test to June. Would you like me to apply this change to your timeline?";
      }

      setChatMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 bg-steel-blue text-white flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6 flex items-center gap-2 border-b border-white/10">
          <TrendingUp className="w-8 h-8 text-sky-blue" />
          <span className="text-2xl font-bold tracking-tight">NorthStar</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <BarChart3 className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/quiz" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <BookOpen className="w-5 h-5" /> Quiz
          </Link>
          <Link to="/match" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <GraduationCap className="w-5 h-5" /> Match University
          </Link>
          <Link to="/path" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl font-bold">
            <Target className="w-5 h-5" /> Generate Path
          </Link>
          <Link to="/enhance" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <PieChart className="w-5 h-5" /> Enhance Profile
          </Link>
          <Link to="/chat" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <MessageCircle className="w-5 h-5" /> AI Mentor
          </Link>
          <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <User className="w-5 h-5" /> My Profile
          </Link>
        </nav>
      </aside>

      <div className="flex-1 lg:ml-64 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Top Nav */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-40">
           <div className="flex items-center gap-8 font-bold text-gray-500">
              <Link to="/dashboard" className="hover:text-sky-blue">Dashboard</Link>
              <Link to="/quiz" className="hover:text-sky-blue">Quiz</Link>
              <Link to="/match" className="hover:text-sky-blue">Match University</Link>
              <Link to="/path" className="text-sky-blue border-b-2 border-sky-blue py-2">Generate Path</Link>
              <Link to="/enhance" className="hover:text-sky-blue">Enhance Profile</Link>
              <Link to="/chat" className="hover:text-sky-blue">AI Mentor</Link>
           </div>
           <div className="flex items-center gap-4">
              <Link to="/profile" className="w-10 h-10 bg-sky-blue rounded-full flex items-center justify-center text-white font-bold hover:scale-105 transition-transform">
                 A
              </Link>
           </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8 mt-8">
          {/* Main Roadmap Area */}
          <div className="flex-1 space-y-8">
             <header className="mb-8">
                <h1 className="text-3xl font-black text-steel-blue mb-2 flex items-center gap-3">
                   <Sparkles className="w-8 h-8 text-sky-blue" /> Your Personalized Path to Success
                </h1>
                <p className="text-gray-500 font-medium italic">AI-generated roadmap based on your profile and target universities</p>
             </header>

             {/* Vertical Timeline */}
             <div className="space-y-6 relative">
                <div className="absolute left-8 top-12 bottom-12 w-1 bg-gray-200 rounded-full" />
                
                {PATH_STEPS.map((step, idx) => (
                   <motion.div 
                    key={step.id} 
                    className="relative pl-20 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                   >
                      <div className={`absolute left-6 top-0 w-5 h-5 rounded-full border-4 ${
                        step.status === 'completed' ? 'bg-green-500 border-green-200' :
                        step.status === 'active' ? 'bg-sky-blue border-sky-blue/30 animate-pulse' :
                        'bg-white border-gray-200'
                      } z-10`} />

                      <div className={`bg-white rounded-[32px] shadow-lg border border-gray-100 overflow-hidden transition-all ${
                         expanded === step.id ? 'ring-2 ring-sky-blue/20' : 'hover:border-sky-blue/30'
                      }`}>
                         <div 
                           onClick={() => setExpanded(expanded === step.id ? null : step.id)}
                           className="p-6 cursor-pointer flex justify-between items-center"
                         >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                               <div className="text-xs font-black text-sky-blue uppercase tracking-widest">{step.month}</div>
                               <h3 className="text-xl font-bold text-steel-blue">{step.title}</h3>
                               {step.status === 'active' && (
                                 <span className="bg-sky-blue text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
                               )}
                            </div>
                            <div className="text-gray-400 group-hover:text-sky-blue transition-colors">
                               {expanded === step.id ? <ChevronUp /> : <ChevronDown />}
                            </div>
                         </div>

                         <AnimatePresence>
                            {expanded === step.id && (
                               <motion.div 
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: 'auto', opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="px-8 pb-8 border-t border-gray-50 pt-6"
                               >
                                  {step.goal && (
                                     <div className="mb-6 bg-sky-blue/5 p-4 rounded-2xl border border-sky-blue/10">
                                        <p className="text-xs font-black text-sky-blue uppercase tracking-tighter mb-1">Main Goal</p>
                                        <p className="text-steel-blue font-bold tracking-tight">{step.goal}</p>
                                     </div>
                                  )}

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                     {step.actions && (
                                        <div className="space-y-4">
                                           <h4 className="text-sm font-black text-steel-blue uppercase tracking-widest mb-2 italic underline decoration-sky-blue underline-offset-4">Action Items</h4>
                                           <div className="space-y-3">
                                              {step.actions.map((act, i) => (
                                                 <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${act.done ? 'bg-green-500 border-green-500' : 'border-gray-200 group-hover:border-sky-blue'}`}>
                                                       {act.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                                                    </div>
                                                    <span className={`text-sm font-medium ${act.done ? 'text-gray-400 line-through' : 'text-gray-600'}`}>{act.text}</span>
                                                 </label>
                                              ))}
                                           </div>
                                        </div>
                                     )}

                                     {step.milestones && (
                                        <div className="space-y-4">
                                           <h4 className="text-sm font-black text-steel-blue uppercase tracking-widest mb-2 italic underline decoration-green-400 underline-offset-4">Milestones</h4>
                                           <div className="space-y-3">
                                              {step.milestones.map((m, i) => (
                                                 <div key={i} className="flex items-center gap-3">
                                                    <Circle className={`w-2 h-2 ${m.done ? 'fill-green-500 text-green-500' : 'text-gray-200'}`} />
                                                    <span className={`text-sm font-bold ${m.done ? 'text-steel-blue' : 'text-gray-400'}`}>{m.text}</span>
                                                 </div>
                                              ))}
                                           </div>
                                        </div>
                                     )}

                                     {step.resources && (
                                        <div className="space-y-4">
                                           <h4 className="text-sm font-black text-steel-blue uppercase tracking-widest mb-2">Resources</h4>
                                           <div className="flex flex-wrap gap-2">
                                              {step.resources.map((r, i) => (
                                                 <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">{r}</span>
                                              ))}
                                           </div>
                                        </div>
                                     )}

                                     {step.projects && (
                                        <div className="space-y-4">
                                           <h4 className="text-sm font-black text-steel-blue uppercase tracking-widest mb-2">Project Ideas</h4>
                                           <div className="space-y-2">
                                              {step.projects.map((p, i) => (
                                                 <div key={i} className="flex items-center gap-2 text-sm font-bold text-sky-blue">
                                                    <Cpu className="w-4 h-4" /> {p}
                                                 </div>
                                              ))}
                                           </div>
                                        </div>
                                     )}

                                     {step.timeline && (
                                        <div className="space-y-4">
                                           <h4 className="text-sm font-black text-steel-blue uppercase tracking-widest mb-2">Timeline</h4>
                                           <div className="space-y-2">
                                              {step.timeline.map((t, i) => (
                                                 <div key={i} className="text-sm font-bold text-gray-500 flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" /> {t}
                                                 </div>
                                              ))}
                                           </div>
                                        </div>
                                     )}
                                  </div>
                               </motion.div>
                            )}
                         </AnimatePresence>
                      </div>
                   </motion.div>
                ))}
             </div>

             {/* Customization Options Bar */}
             <div className="bg-white p-6 rounded-[32px] shadow-lg border border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-4">
                   <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl font-bold border border-gray-100 hover:bg-gray-100 transition-all">
                      <Settings2 className="w-4 h-4 text-sky-blue" /> Adjust Timeline
                   </button>
                   <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl font-bold border border-gray-100 hover:bg-gray-100 transition-all">
                      <Target className="w-4 h-4 text-sky-blue" /> Focus Areas
                   </button>
                </div>
                <div className="flex gap-4">
                   <button className="flex items-center gap-2 px-6 py-3 bg-sky-blue text-white rounded-2xl font-bold shadow-lg shadow-sky-blue/20 hover:bg-steel-blue transition-all">
                      <Download className="w-4 h-4" /> Export PDF
                   </button>
                   <button className="flex items-center gap-2 px-6 py-3 bg-steel-blue text-white rounded-2xl font-bold shadow-lg shadow-steel-blue/20 hover:bg-sky-blue transition-all">
                      <Users className="w-4 h-4" /> Share with Mentor
                   </button>
                </div>
             </div>
          </div>

          {/* Right Sidebar - Chatbot & Progress */}
          <aside className="w-full xl:w-96 space-y-8">
             {/* Progress Tracking */}
             <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-steel-blue mb-8">Your Progress</h3>
                
                <div className="space-y-8">
                   {[
                      { name: 'Overall Path', progress: 15 },
                      { name: 'SAT Preparation', progress: 45 },
                      { name: 'Project development', progress: 0 },
                      { name: 'Application Prep', progress: 5 },
                      { name: 'Extracurriculars', progress: 20 },
                   ].map((p, i) => (
                      <div key={i}>
                         <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest mb-3">
                            <span className="text-gray-400">{p.name}</span>
                            <span className="text-sky-blue">{p.progress}%</span>
                         </div>
                         <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-0.5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${p.progress}%` }}
                              className="h-full bg-sky-blue rounded-full shadow-inner"
                            />
                         </div>
                      </div>
                   ))}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                   <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 italic">Next Up (This week)</h4>
                   <div className="space-y-4">
                      {[
                        "Complete 3 hours of SAT Verbal practice",
                        "Take vocabulary quiz",
                        "Research CS project ideas"
                      ].map((task, i) => (
                        <div key={i} className="flex gap-4 group cursor-pointer">
                           <div className="w-6 h-6 rounded-lg border-2 border-gray-100 group-hover:border-sky-blue flex items-center justify-center shrink-0 transition-all">
                              <div className="w-2 h-2 bg-sky-blue rounded-sm scale-0 group-hover:scale-100 transition-transform" />
                           </div>
                           <span className="text-sm font-bold text-steel-blue/80 group-hover:text-sky-blue transition-colors">{task}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* AI Mentor Chat */}
             <div className="bg-steel-blue rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[600px] border border-white/10 relative">
                <div className="bg-sky-blue p-6 flex justify-between items-center">
                   <div className="flex items-center gap-4 text-white">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                         <MessageCircle className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="font-bold text-lg">AI Path Advisor</p>
                         <p className="text-[10px] text-white/60 font-black uppercase tracking-widest italic">Personalized Coach</p>
                      </div>
                   </div>
                   <button className="text-white/60 hover:text-white transition-colors">
                      <MoreVertical className="w-6 h-6" />
                   </button>
                </div>

                <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
                   {chatMessages.map((msg, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium leading-relaxed ${
                          msg.type === 'ai' 
                          ? 'bg-white/10 text-white rounded-bl-none border border-white/10' 
                          : 'bg-sky-blue text-white ml-auto rounded-br-none shadow-lg'
                        }`}
                      >
                         {msg.text}
                      </motion.div>
                   ))}
                </div>

                <div className="p-6 bg-white/5 border-t border-white/10">
                   <div className="flex items-center gap-3">
                      <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask me to adjust your path..." 
                        className="flex-1 bg-white/10 border-none rounded-2xl px-5 py-4 text-sm text-white placeholder-white/30 outline-none focus:ring-2 ring-sky-blue/50" 
                      />
                      <button 
                        onClick={handleSendMessage}
                        className="bg-sky-blue text-white p-4 rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all"
                      >
                         <Send className="w-5 h-5" />
                      </button>
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
