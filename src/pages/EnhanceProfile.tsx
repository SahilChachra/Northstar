/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, BookOpen, GraduationCap, Target, PieChart, 
  Award, CheckCircle2, AlertCircle, Info, Star, 
  ChevronRight, Sparkles, FileText, UserCheck, 
  Clock, ArrowUpRight, BarChart3, Edit3, MessageSquare, 
  Zap, Plus, Filter, Layout, Save, Wand2, Search, Sliders, X, MessageCircle, User
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const MATCH_LIST = [
  { name: 'UIUC', score: 91 },
  { name: 'Purdue', score: 89 },
  { name: 'UT Austin', score: 87 },
  { name: 'UC San Diego', score: 85 },
  { name: 'UW Madison', score: 84 },
  { name: 'Georgia Tech', score: 82 },
  { name: 'Carnegie Mellon', score: 78 },
  { name: 'UC Berkeley', score: 72 },
  { name: 'Cornell', score: 68 },
  { name: 'Northwestern', score: 65 },
];

const SOP_MOCK_TEXT = `Growing up in Mumbai, I was always fascinated by how technology could solve real-world problems. When I was 14, I witnessed my grandmother struggle with managing her diabetes medication schedule. This experience sparked my journey into computer science - I wanted to create solutions that could help people like her.

My interest in artificial intelligence deepened when I built my first machine learning model during 10th grade. Using Python and basic ML libraries, I created a simple app that could predict optimal medication times based on blood sugar patterns. While rudimentary, this project taught me the power of combining healthcare with technology...`;

export default function EnhanceProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('MIT');
  const [sopText, setSopText] = useState(SOP_MOCK_TEXT);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  
  // Simulator State
  const [sat, setSat] = useState(1380);
  const [gpa, setGpa] = useState(3.7);
  const [leadership, setLeadership] = useState(1);
  const [research, setResearch] = useState(0);

  // Dynamic Match Score Calculation (Simple Mock)
  const calculateMatch = (base: number) => {
    let bonus = 0;
    bonus += (sat - 1380) / 20;
    bonus += (gpa - 3.7) * 40;
    bonus += leadership * 5;
    bonus += research * 10;
    return Math.min(99, Math.round(base + bonus));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 bg-steel-blue text-white flex-col fixed inset-y-0 left-0 z-50 shadow-2xl">
        <div className="p-6 flex items-center gap-2 border-b border-white/10">
          <TrendingUp className="w-8 h-8 text-sky-blue" />
          <span className="text-2xl font-bold tracking-tight italic">NorthStar</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4 font-bold">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all">
            <BarChart3 className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/quiz" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all">
            <BookOpen className="w-5 h-5" /> Quiz
          </Link>
          <Link to="/match" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all">
            <GraduationCap className="w-5 h-5" /> Match University
          </Link>
          <Link to="/path" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all">
            <Target className="w-5 h-5" /> Generate Path
          </Link>
          <Link to="/enhance" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
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
           <div className="flex items-center gap-8 font-black text-gray-400">
              <Link to="/dashboard" className="hover:text-sky-blue transition-colors">Dashboard</Link>
              <Link to="/quiz" className="hover:text-sky-blue transition-colors">Quiz</Link>
              <Link to="/match" className="hover:text-sky-blue transition-colors">Match</Link>
              <Link to="/enhance" className="text-sky-blue border-b-2 border-sky-blue py-2">Enhance</Link>
              <Link to="/chat" className="hover:text-sky-blue">AI Mentor</Link>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-500 hidden sm:block">Arjun Sharma</span>
              <Link to="/profile" className="w-10 h-10 bg-sky-blue rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold hover:scale-105 transition-transform">
                 A
              </Link>
           </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <div>
                <h1 className="text-4xl font-black text-steel-blue italic flex items-center gap-3">
                   <Sparkles className="w-10 h-10 text-sky-blue" /> Your Application Profile Snapshot
                </h1>
                <p className="text-gray-400 font-bold mt-1">Optimize your profile for the 2024-25 admissions cycle.</p>
             </div>
             <button 
               onClick={() => setIsSimulatorOpen(true)}
               className="bg-sky-blue text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-sky-blue/20 flex items-center gap-2 hover:bg-steel-blue transition-all active:scale-95"
             >
                <Target className="w-5 h-5" /> Simulate Profile Impact
             </button>
          </div>

          {/* Profile Overview Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Card 1: Test Scores */}
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100"
             >
                <div className="flex justify-between items-start mb-6">
                   <h3 className="text-lg font-black text-steel-blue uppercase tracking-widest italic">Test Scores</h3>
                   <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">Can Improve</span>
                </div>
                <div className="space-y-6">
                   <div>
                      <div className="flex justify-between items-end mb-2">
                         <span className="text-3xl font-black text-steel-blue">1380<span className="text-sm text-gray-300">/1600</span></span>
                         <span className="text-xs font-bold text-gray-400">SAT Score</span>
                      </div>
                      <div className="flex gap-4">
                         <div className="flex-1 bg-gray-50 p-3 rounded-2xl">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Math</p>
                            <p className="text-sm font-black text-sky-blue">720 (85th)</p>
                         </div>
                         <div className="flex-1 bg-gray-50 p-3 rounded-2xl">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Verbal</p>
                            <p className="text-sm font-black text-sky-blue">660 (78th)</p>
                         </div>
                      </div>
                   </div>
                   <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                      <p className="text-xs font-bold text-red-600 flex items-center gap-2">
                         <AlertCircle className="w-4 h-4" /> Gap for MIT: -140 pts
                      </p>
                   </div>
                   <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                      <span className="text-sm font-bold text-gray-500">GPA</span>
                      <span className="text-xl font-black text-green-500">3.7/4.0</span>
                   </div>
                </div>
             </motion.div>

             {/* Card 2: Extracurriculars */}
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100"
             >
                <div className="flex justify-between items-start mb-6">
                   <h3 className="text-lg font-black text-steel-blue uppercase tracking-widest italic">Activities</h3>
                   <div className="text-2xl font-black text-sky-blue">6/10</div>
                </div>
                <div className="space-y-4">
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current</p>
                      {['Coding Club (1y)', 'Math Olympiad', 'Volunteer Tutoring'].map((act, i) => (
                        <div key={i} className="flex gap-3 text-sm font-bold text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                           <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> {act}
                        </div>
                      ))}
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Missing</p>
                      {['Leadership Positions', 'Significant Awards', 'Research Exp'].map((act, i) => (
                        <div key={i} className="flex gap-3 text-sm font-bold text-gray-300">
                           <AlertCircle className="w-4 h-4 shrink-0" /> {act}
                        </div>
                      ))}
                   </div>
                </div>
             </motion.div>

             {/* Card 3: University Match */}
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-steel-blue p-8 rounded-[40px] shadow-xl text-white relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <GraduationCap className="w-24 h-24" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-widest italic mb-6">Match Ranking</h3>
                <div className="space-y-3">
                   {MATCH_LIST.slice(0, 7).map((uni, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                         <span className="font-bold flex items-center gap-2">
                            <span className="text-[10px] text-white/40">{i+1}</span> {uni.name}
                         </span>
                         <span className={`font-black ${uni.score >= 85 ? 'text-green-400' : 'text-sky-blue'}`}>{uni.score}%</span>
                      </div>
                   ))}
                </div>
                <button 
                  onClick={() => navigate('/match')}
                  className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                >
                   View All Matches
                </button>
             </motion.div>
          </div>

          {/* Statement of Purpose (SOP) Section */}
          <section className="bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-100">
             <div className="bg-gray-50 p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                   <h2 className="text-2xl font-black text-steel-blue italic flex items-center gap-3">
                      <Edit3 className="w-8 h-8 text-sky-blue" /> Your Statement of Purpose
                   </h2>
                   <p className="text-gray-400 font-bold text-sm mt-1">Refining your narrative for top-tier admissions.</p>
                </div>
                <div className="flex bg-white p-2 rounded-2xl shadow-inner shadow-gray-200/50">
                   {['MIT', 'Stanford', 'CMU'].map(name => (
                      <button 
                        key={name}
                        onClick={() => setActiveTab(name)}
                        className={`px-8 py-2 rounded-xl text-sm font-black transition-all ${activeTab === name ? 'bg-sky-blue text-white shadow-lg' : 'text-gray-400 hover:text-steel-blue'}`}
                      >
                         {name}
                      </button>
                   ))}
                </div>
             </div>

             <div className="flex flex-col lg:flex-row h-[700px]">
                {/* Text Editor */}
                <div className="flex-1 p-8 flex flex-col">
                   <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-4">
                         <span className="bg-gray-100 px-4 py-1 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">Draft 1</span>
                         <span className="text-xs font-bold text-gray-400 italic">Last edited: Jan 10, 2024</span>
                      </div>
                      <div className="text-xs font-black text-steel-blue uppercase tracking-widest">
                         Word count: <span className="text-sky-blue">{sopText.split(' ').length}</span>/650
                      </div>
                   </div>
                   <textarea 
                     value={sopText}
                     onChange={(e) => setSopText(e.target.value)}
                     className="flex-1 w-full p-8 bg-gray-50/30 rounded-[32px] border-none focus:ring-2 focus:ring-sky-blue/20 outline-none text-gray-700 leading-relaxed font-medium text-lg custom-scrollbar resize-none"
                     placeholder="Start writing your story..."
                   />
                   <div className="mt-8 flex gap-4">
                      <button className="flex-1 bg-sky-blue text-white py-4 rounded-2xl font-black shadow-lg shadow-sky-blue/20 flex items-center justify-center gap-2 hover:bg-steel-blue transition-all">
                        <Wand2 className="w-5 h-5" /> AI Suggester
                      </button>
                      <button className="flex-1 bg-steel-blue text-white py-4 rounded-2xl font-black shadow-lg shadow-steel-blue/20 flex items-center justify-center gap-2 hover:bg-sky-blue transition-all">
                        <Save className="w-5 h-5" /> Save Draft
                      </button>
                      <button className="bg-gray-100 text-gray-500 p-4 rounded-2xl hover:bg-gray-200 transition-all">
                        <UserCheck className="w-6 h-6" />
                      </button>
                   </div>
                </div>

                {/* AI Analysis Sidebar */}
                <aside className="w-full lg:w-96 bg-gray-50 border-l border-gray-100 p-8 overflow-y-auto custom-scrollbar">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-sky-blue text-white rounded-2xl flex items-center justify-center shadow-lg">
                         <Sparkles className="w-6 h-6" />
                      </div>
                      <h3 className="font-black text-steel-blue uppercase tracking-widest italic">AI Profile Analysis</h3>
                   </div>

                   <div className="space-y-8">
                      <div className="text-center">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Overall Score</p>
                         <div className="text-5xl font-black text-sky-blue italic">7.5<span className="text-xl text-gray-300">/10</span></div>
                      </div>

                      <div className="space-y-6">
                         <div>
                            <p className="text-[10px] font-black text-sky-blue uppercase tracking-widest mb-3 italic">Match with {activeTab} Values</p>
                            <div className="grid grid-cols-4 gap-2">
                               {[
                                 { n: 'Innov', v: 90, c: 'bg-green-400' },
                                 { n: 'Collab', v: 45, c: 'bg-orange-400' },
                                 { n: 'Impact', v: 75, c: 'bg-green-400' },
                                 { n: 'Academ', v: 85, c: 'bg-green-400' },
                               ].map((val, i) => (
                                 <div key={i} className="text-center">
                                    <div className="h-20 bg-gray-200 rounded-lg relative overflow-hidden mb-1">
                                       <motion.div 
                                         initial={{ height: 0 }}
                                         animate={{ height: `${val.v}%` }}
                                         className={`absolute bottom-0 w-full ${val.c}`}
                                       />
                                    </div>
                                    <span className="text-[8px] font-black text-gray-400 uppercase">{val.n}</span>
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="space-y-4">
                            <p className="text-xs font-black text-steel-blue uppercase italic">Strengths</p>
                            <div className="space-y-2">
                               {['Strong personal hook', 'Clear demonstration of initiative', 'Genuine interest in CS'].map((s, i) => (
                                 <div key={i} className="flex gap-2 text-xs font-bold text-gray-600 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-400" /> {s}
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="space-y-4">
                            <p className="text-xs font-black text-orange-500 uppercase italic">Key Suggestions</p>
                            <div className="space-y-2">
                               {[
                                 "Mention MIT's CSAIL lab explicitly",
                                 "Add more details about the ML project",
                                 "Connect to specific professors"
                               ].map((s, i) => (
                                 <div key={i} className="flex gap-2 text-xs font-bold text-orange-600 bg-orange-50 p-3 rounded-xl border border-orange-100">
                                    <Zap className="w-4 h-4" /> {s}
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                </aside>
             </div>
          </section>

          {/* Letter of Recommendation Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <section className="bg-white p-10 rounded-[50px] shadow-xl border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                   <h2 className="text-2xl font-black text-steel-blue italic flex items-center gap-3">
                      <UserCheck className="w-8 h-8 text-sky-blue" /> Recommendation Tracker
                   </h2>
                   <div className="flex items-center gap-3">
                      <span className="bg-sky-blue/10 text-sky-blue px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">1/3 Completed</span>
                   </div>
                </div>

                <div className="space-y-6 mb-10">
                   {[
                     { name: 'Mr. Rakesh Verma', role: 'Math Teacher', status: 'Approved', eta: 'March 15, 2024', color: 'text-green-500 bg-green-50' },
                     { name: 'Ms. Anjali Reddy', role: 'CS Teacher', status: 'Requested', eta: 'TBD', color: 'text-sky-blue bg-sky-blue/5' },
                     { name: 'Dr. Sameer Khan', role: 'School Counselor', status: 'Not Asked', eta: '--', color: 'text-gray-300 bg-gray-50' },
                   ].map((lor, i) => (
                     <div key={i} className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sky-blue shadow-sm font-black italic">
                              {lor.name.charAt(4)}
                           </div>
                           <div>
                              <p className="font-black text-steel-blue">{lor.name}</p>
                              <p className="text-xs font-bold text-gray-400">{lor.role}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 block ${lor.color}`}>
                              {lor.status}
                           </span>
                           <p className="text-[10px] font-bold text-gray-400">Deadline: {lor.eta}</p>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="p-6 bg-sky-blue/5 rounded-[32px] border border-sky-blue/10">
                   <h4 className="flex items-center gap-2 text-sky-blue font-black uppercase tracking-widest text-xs italic mb-3">
                      <Sparkles className="w-4 h-4" /> AI Tips for Strong LORs
                   </h4>
                   <ul className="space-y-2 text-xs font-medium text-gray-600 italic">
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-sky-blue rounded-full mt-1.5 shrink-0" /> Meet with recommenders 2 months before deadline</li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-sky-blue rounded-full mt-1.5 shrink-0" /> Provide them with your resume and achievement list</li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-sky-blue rounded-full mt-1.5 shrink-0" /> Remind them of specific projects/moments to highlight</li>
                   </ul>
                </div>
             </section>

             {/* Profile Roadmap */}
             <section className="bg-steel-blue p-10 rounded-[50px] shadow-xl text-white">
                <h2 className="text-2xl font-black italic mb-8 flex items-center gap-3">
                   <Target className="w-8 h-8 text-sky-blue" /> AI-Recommended Roadmap
                </h2>
                
                <div className="space-y-8">
                   <div>
                      <h4 className="text-xs font-black text-red-400 uppercase tracking-widest mb-4 italic">High Priority (Next 2 Months)</h4>
                      <div className="grid grid-cols-1 gap-4">
                         {[
                           { t: 'Retake SAT - Target 1450+', i: '+20% match impact' },
                           { t: 'Start Leadership Role', i: '+15% profile score' },
                           { t: 'Complete Major CS Project', i: '+18% profile score' }
                         ].map((item, i) => (
                           <div key={i} className="bg-white/10 p-5 rounded-3xl border border-white/10 hover:bg-white/15 transition-all flex justify-between items-center group">
                              <div>
                                 <p className="font-bold">{item.t}</p>
                                 <p className="text-[10px] font-bold text-sky-blue uppercase mt-1">{item.i}</p>
                              </div>
                              <div className="w-8 h-8 bg-sky-blue rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                 <ChevronRight className="w-5 h-5" />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div>
                      <h4 className="text-xs font-black text-yellow-400 uppercase tracking-widest mb-4 italic">Medium Priority (3-6 Months)</h4>
                      <div className="space-y-3">
                         {['Apply to summer research program', 'Win/place in coding competition'].map((t, i) => (
                           <div key={i} className="flex gap-4 items-center text-sm font-bold opacity-80 hover:opacity-100 transition-all cursor-pointer">
                              <div className="w-2 h-2 rounded-full bg-yellow-400" /> {t}
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </section>
          </div>
        </div>
      </div>

      {/* Floating Simulator Dialog */}
      <AnimatePresence>
         {isSimulatorOpen && (
           <div className="fixed inset-0 z-[100] bg-steel-blue/40 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-4xl rounded-[50px] shadow-2xl p-12 relative overflow-hidden"
              >
                 <button 
                   onClick={() => setIsSimulatorOpen(false)}
                   className="absolute top-10 right-10 p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
                 >
                   <X className="w-6 h-6" />
                 </button>

                 <div className="flex items-center gap-4 mb-12">
                   <div className="w-16 h-16 bg-sky-blue text-white rounded-[30px] flex items-center justify-center shadow-lg">
                      <Sliders className="w-8 h-8" />
                   </div>
                   <div>
                      <h2 className="text-3xl font-black text-steel-blue italic">Profile Scenario Simulator</h2>
                      <p className="text-gray-400 font-bold">Adjust your potential stats to see real-time match impacts.</p>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                       <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm font-black italic">
                             <span className="text-steel-blue uppercase tracking-widest">SAT Score</span>
                             <span className="text-sky-blue">{sat}</span>
                          </div>
                          <input 
                            type="range" min="1200" max="1600" step="10" 
                            value={sat} onChange={(e) => setSat(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-sky-blue" 
                          />
                       </div>

                       <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm font-black italic">
                             <span className="text-steel-blue uppercase tracking-widest">GPA (Unweighted)</span>
                             <span className="text-sky-blue">{gpa.toFixed(1)}</span>
                          </div>
                          <input 
                            type="range" min="3.0" max="4.0" step="0.1" 
                            value={gpa} onChange={(e) => setGpa(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-sky-blue" 
                          />
                       </div>

                       <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm font-black italic">
                             <span className="text-steel-blue uppercase tracking-widest">Leadership Roles</span>
                             <span className="text-sky-blue">{leadership}</span>
                          </div>
                          <div className="flex gap-4">
                             {[0,1,2,3,4].map(v => (
                               <button 
                                 key={v}
                                 onClick={() => setLeadership(v)}
                                 className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all ${leadership === v ? 'bg-sky-blue text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}
                               >
                                  {v === 4 ? '4+' : v}
                               </button>
                             ))}
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm font-black italic">
                             <span className="text-steel-blue uppercase tracking-widest">Research Exp</span>
                             <span className="text-sky-blue">{research === 1 ? 'Yes' : 'No'}</span>
                          </div>
                          <div className="flex gap-4">
                             {[0, 1].map(v => (
                               <button 
                                 key={v}
                                 onClick={() => setResearch(v)}
                                 className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all ${research === v ? 'bg-steel-blue text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}
                               >
                                  {v === 1 ? 'Significant' : 'None'}
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="bg-steel-blue p-10 rounded-[40px] text-white flex flex-col justify-between">
                       <h4 className="text-[10px] font-black text-sky-blue uppercase tracking-widest italic mb-6">Simulated Outcomes</h4>
                       <div className="space-y-8">
                          {[
                            { name: 'MIT', base: 72 },
                            { name: 'Stanford', base: 68 },
                            { name: 'Carnegie Mellon', base: 78 }
                          ].map((uni, i) => {
                            const val = calculateMatch(uni.base);
                            const prev = uni.base;
                            return (
                              <div key={i}>
                                 <div className="flex justify-between text-sm font-bold mb-2">
                                    <span>{uni.name}</span>
                                    <div className="flex items-center gap-2">
                                       <span className="text-white/40">{prev}%</span>
                                       <ArrowUpRight className="w-4 h-4 text-sky-blue" />
                                       <span className="text-sky-blue font-black text-lg italic">{val}%</span>
                                    </div>
                                 </div>
                                 <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={false}
                                      animate={{ width: `${val}%` }}
                                      className="h-full bg-sky-blue rounded-full shadow-[0_0_15px_rgba(75,156,211,0.5)]"
                                    />
                                 </div>
                              </div>
                            );
                          })}
                       </div>
                       <div className="mt-12 pt-8 border-t border-white/10 text-center">
                          <p className="text-sm font-bold text-white/50 italic mb-6">"Achieving a 1520+ SAT could unlock 85% match for MIT."</p>
                          <button className="w-full bg-sky-blue text-white py-4 rounded-2xl font-black shadow-lg shadow-sky-blue/20 hover:scale-105 transition-all">
                             Lock in these Targets
                          </button>
                       </div>
                    </div>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}
