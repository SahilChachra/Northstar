/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  ClipboardCheck, Clock, Award, Play, Filter, 
  Calendar as CalendarIcon, TrendingUp, Brain, BookOpen, ChevronRight,
  Target, Zap, GraduationCap, Star, BarChart3, PieChart, CheckCircle2, MessageCircle, User
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const COMPLETED_TESTS = [
  { name: 'SAT Math Practice Test 1', date: 'Jan 15, 2024', score: '720/800', percentile: '85th', time: '65 min', rating: null },
  { name: 'SAT Verbal Practice Test 1', date: 'Jan 12, 2024', score: '660/800', percentile: '78th', time: '70 min', rating: null },
  { name: 'Logical Reasoning Test', date: 'Jan 8, 2024', score: '42/50', percentile: '82nd', time: '45 min', rating: null },
  { name: 'Critical Thinking Assessment', date: 'Jan 5, 2024', score: '38/50', percentile: '75th', time: '40 min', rating: null },
  { name: 'Psychometric Personality Test', date: 'Jan 3, 2024', score: '85/100', percentile: null, result: 'INTJ - Strategic Thinker', time: '30 min' },
];

const RECOMMENDED_TESTS = [
  { name: 'SAT Math Practice Test 2', difficulty: 'Medium', duration: '65 min', questions: '40', desc: 'Continue your SAT Math prep', path: '/test/aptitude' },
  { name: 'University Personality Test', difficulty: 'Easy', duration: '30 min', questions: '20', desc: 'Build your psychological profile', path: '/test/psychometric' },
  { name: 'Advanced Problem Solving', difficulty: 'Hard', duration: '60 min', questions: '35', desc: 'Challenge yourself with complex problems', path: '/test/aptitude' },
];

const SCHEDULE = [
  { date: 'Feb 1, 2024', test: 'SAT Math Practice Test 2' },
  { date: 'Feb 8, 2024', test: 'SAT Verbal Practice Test 2' },
  { date: 'Feb 15, 2024', test: 'Full SAT Mock Test' },
  { date: 'Feb 22, 2024', test: 'Advanced Critical Thinking' },
  { date: 'Mar 1, 2024', test: 'Subject Test - Physics' },
];

export default function Quiz() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

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
          <Link to="/quiz" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl font-bold">
            <BookOpen className="w-5 h-5" /> Quiz
          </Link>
          <Link to="/match" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <GraduationCap className="w-5 h-5" /> Match University
          </Link>
          <Link to="/path" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
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

      <div className="flex-1 lg:ml-64 pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Header (Top Nav) */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-40">
           <div className="hidden lg:flex items-center gap-8 font-bold text-gray-500">
              <Link to="/dashboard" className="hover:text-sky-blue">Dashboard</Link>
              <Link to="/quiz" className="text-sky-blue border-b-2 border-sky-blue py-2">Quiz</Link>
              <Link to="/match" className="hover:text-sky-blue">Match University</Link>
              <Link to="/path" className="hover:text-sky-blue">Generate Path</Link>
              <Link to="/chat" className="hover:text-sky-blue">AI Mentor</Link>
           </div>
           <div className="flex items-center gap-4">
              <Link to="/profile" className="w-10 h-10 bg-sky-blue rounded-full flex items-center justify-center text-white font-bold hover:scale-105 transition-transform">
                 A
              </Link>
           </div>
        </div>
        
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button 
             onClick={() => navigate('/test/psychometric')}
             className="flex-1 min-w-[200px] bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex items-center gap-6 group hover:border-sky-blue/30 transition-all text-left"
          >
             <div className="w-16 h-16 bg-sky-blue/10 rounded-2xl flex items-center justify-center text-sky-blue group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8" />
             </div>
             <div className="text-left">
                <h4 className="font-bold text-steel-blue text-lg">University Psychometric</h4>
                <p className="text-gray-400 text-sm font-medium">Personality & Aptitude</p>
             </div>
          </button>
          <button 
             onClick={() => navigate('/test/aptitude')}
             className="flex-1 min-w-[200px] bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex items-center gap-6 group hover:border-steel-blue/30 transition-all text-left"
          >
             <div className="w-16 h-16 bg-steel-blue/10 rounded-2xl flex items-center justify-center text-steel-blue group-hover:scale-110 transition-transform">
                <ClipboardCheck className="w-8 h-8" />
             </div>
             <div className="text-left">
                <h4 className="font-bold text-steel-blue text-lg">Aptitude Tests</h4>
                <p className="text-gray-400 text-sm font-medium">SAT, Reasoning, Logic</p>
             </div>
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          <div className="xl:col-span-2 space-y-12">
            
            {/* Completed Tests */}
            <section>
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-black text-steel-blue flex items-center gap-2">
                   <CheckCircle2 className="w-6 h-6 text-green-500" /> Completed Tests
                 </h2>
                 <button className="text-gray-400 hover:text-sky-blue"><Filter className="w-5 h-5" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COMPLETED_TESTS.map((test, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 relative group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-steel-blue/10 text-steel-blue rounded-xl flex items-center justify-center">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-gray-400">{test.date}</span>
                    </div>
                    <h4 className="font-bold text-steel-blue text-lg mb-2">{test.name}</h4>
                    <div className="flex items-baseline gap-2 mb-4">
                       <span className="text-2xl font-black text-sky-blue">{test.score}</span>
                       <span className="text-xs font-bold text-tan-beige uppercase">{test.percentile || test.result}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-6">
                       <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.time}</div>
                       <div className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Improved 5%</div>
                    </div>
                    <div className="flex gap-2">
                       <button className="flex-1 py-2 bg-gray-50 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">Results</button>
                       <button className="flex-1 py-2 border border-sky-blue text-sky-blue rounded-xl font-bold text-sm hover:bg-sky-blue hover:text-white transition-all">Retake</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Recommended Tests */}
            <section>
              <h2 className="text-2xl font-black text-steel-blue mb-6 flex items-center gap-2">
                 <Zap className="w-6 h-6 text-orange-500" /> Recommended Tests
              </h2>
              <div className="space-y-4">
                 {RECOMMENDED_TESTS.map((test: any, i) => (
                   <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                    onClick={() => navigate(test.path)}
                    className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex justify-between items-center group cursor-pointer"
                   >
                     <div className="flex gap-6 items-center">
                        <div className="w-14 h-14 bg-tan-beige/10 text-tan-beige rounded-2xl flex items-center justify-center font-black text-xl">
                          {i + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                             <h4 className="font-bold text-steel-blue text-lg">{test.name}</h4>
                             <span className="bg-orange-50 text-orange-600 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">{test.difficulty}</span>
                          </div>
                          <p className="text-sm text-gray-400 font-medium">{test.desc} • {test.duration} • {test.questions} Question</p>
                        </div>
                     </div>
                     <button className="w-12 h-12 bg-sky-blue text-white rounded-full flex items-center justify-center shadow-lg shadow-sky-blue/20 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-1" />
                     </button>
                   </motion.div>
                 ))}
              </div>
            </section>

          </div>

          <div className="space-y-12">
             
             {/* AI Analysis Panel */}
             <section className="bg-steel-blue text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Brain className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                   <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                      <Star className="w-6 h-6 text-sky-blue" /> AI Insights
                   </h3>
                   <div className="space-y-6">
                      <div>
                         <p className="text-xs font-bold text-sky-blue uppercase tracking-widest mb-1">Overall Progress</p>
                         <p className="font-bold text-lg">Strong (78th Avg)</p>
                      </div>
                      <div className="space-y-3">
                         <p className="text-xs font-bold text-sky-blue uppercase tracking-widest">Strengths</p>
                         <div className="space-y-2">
                           <div className="flex gap-2 text-sm font-medium"><div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" /> Math Reasoning (85th+)</div>
                           <div className="flex gap-2 text-sm font-medium"><div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" /> Logical Problem Solving</div>
                         </div>
                      </div>
                      <div className="space-y-3">
                         <p className="text-xs font-bold text-sky-blue uppercase tracking-widest">Areas to Improve</p>
                         <div className="space-y-2">
                           <div className="flex gap-2 text-sm font-medium text-white/80"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" /> Reading Comp (needs 15% speed)</div>
                           <div className="flex gap-2 text-sm font-medium text-white/80"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" /> Vocabulary (200+ advanced words)</div>
                         </div>
                      </div>
                      <div className="pt-6 border-t border-white/10">
                         <p className="text-xs font-bold text-sky-blue mb-2 italic">Predicted SAT Score</p>
                         <div className="text-4xl font-black text-white">1450-1480</div>
                         <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-tighter">By April 2024 if plan followed</p>
                      </div>
                   </div>
                </div>
             </section>

             {/* Schedule Section */}
             <section className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="font-black text-steel-blue flex items-center gap-2 uppercase tracking-tight">
                      <CalendarIcon className="w-5 h-5 text-sky-blue" /> Test Schedule
                   </h3>
                </div>
                <div className="space-y-6">
                   {SCHEDULE.map((item, i) => (
                     <div key={i} className="flex gap-4 items-start">
                        <div className="text-xs font-black text-sky-blue w-20 shrink-0 uppercase tracking-tighter pt-1">{item.date}</div>
                        <div className="text-sm font-bold text-steel-blue">{item.test}</div>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-8 py-3 bg-gray-50 text-gray-500 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors">
                   Customize Schedule
                </button>
             </section>

          </div>

        </div>
      </div>
    </div>
  );
}
