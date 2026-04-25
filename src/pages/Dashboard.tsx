/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, BookOpen, GraduationCap, ArrowRight, Calendar, 
  TrendingUp, CheckCircle2, Clock, MessageCircle, X, ChevronRight,
  Target, BarChart3, PieChart, User
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const COMPARISON_DATA = [
  { name: 'MIT', target: 1520, user: 1380 },
  { name: 'Stanford', target: 1510, user: 1380 },
  { name: 'CMU', target: 1490, user: 1380 },
];

const RECENT_SCORES = [
  { name: 'SAT Math Practice 1', date: 'Jan 15, 2024', score: '720/800', percentile: '85th' },
  { name: 'SAT Verbal Practice 1', date: 'Jan 12, 2024', score: '660/800', percentile: '78th' },
  { name: 'Logical Reasoning Test', date: 'Jan 8, 2024', score: '42/50', percentile: '82nd' },
  { name: 'Critical Thinking Test', date: 'Jan 5, 2024', score: '38/50', percentile: '75th' },
  { name: 'Psychometric Assessment', date: 'Jan 3, 2024', score: '85/100', percentile: '88th' },
];

const PREP_PATH = [
  { month: 'Jan 2024', task: 'Complete baseline tests', status: 'completed' },
  { month: 'Feb 2024', task: 'SAT Prep', status: 'in-progress' },
  { month: 'Mar 2024', task: 'Leadership project', status: 'pending' },
  { month: 'Apr 2024', task: 'SAT Attempt 1', status: 'pending' },
  { month: 'May 2024', task: 'SOP Draft 1', status: 'pending' },
];

const APPLICATIONS = [
  { school: 'MIT (Early Action)', status: 'SOP in Progress', progress: 60 },
  { school: 'Stanford (Regular)', status: 'Planning Phase', progress: 10 },
  { school: 'Carnegie Mellon (ED)', status: 'SOP in Progress', progress: 40 },
  { school: 'UC Berkeley (Regular)', status: 'Research Complete', progress: 100 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('northstar_session');
    if (!session) {
      navigate('/login');
    } else {
      setUser(JSON.parse(session));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 bg-steel-blue text-white flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6 flex items-center gap-2 border-b border-white/10">
          <TrendingUp className="w-8 h-8 text-sky-blue" />
          <span className="text-2xl font-bold tracking-tight">NorthStar</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl font-bold">
            <BarChart3 className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/quiz" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
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
        <div className="p-6 border-t border-white/10">
          <button 
            onClick={() => {
              localStorage.removeItem('northstar_session');
              navigate('/login');
            }}
            className="flex items-center gap-3 p-3 text-red-300 hover:text-red-100 font-bold w-full"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Header (Top Nav) */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-40">
           <div className="lg:hidden flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-sky-blue" />
              <span className="font-bold text-steel-blue">NorthStar</span>
           </div>
            <div className="hidden lg:flex items-center gap-8 font-bold text-gray-500">
               <Link to="/dashboard" className="text-sky-blue border-b-2 border-sky-blue py-2">Dashboard</Link>
               <Link to="/quiz" className="hover:text-sky-blue">Quiz</Link>
               <Link to="/match" className="hover:text-sky-blue">Match University</Link>
               <Link to="/path" className="hover:text-sky-blue">Generate Path</Link>
               <Link to="/chat" className="hover:text-sky-blue">AI Mentor</Link>
               <Link to="/profile" className="hover:text-sky-blue">Profile</Link>
            </div>
           <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                 <p className="font-bold text-steel-blue text-sm">{user.name}</p>
                 <p className="text-xs text-gray-400">Class of 2025</p>
              </div>
              <Link to="/profile" className="w-10 h-10 bg-sky-blue rounded-full flex items-center justify-center text-white font-bold hover:scale-105 transition-transform">
                 {user.name?.charAt(0)}
              </Link>
           </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto space-y-8 mt-4">
          
          {/* Welcome Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-sky-blue to-steel-blue p-8 rounded-3xl text-white shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-2">Welcome back, {user.name?.split(' ')[0]}!</h2>
              <p className="text-white/80 font-medium mb-4">April 25, 2024 • "The future depends on what you do today."</p>
              <div className="flex gap-4">
                <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold backdrop-blur-sm">12th Grade</span>
                <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold backdrop-blur-sm">C.S. Aspirant</span>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10">
               <TrendingUp className="w-64 h-64 translate-y-1/4 translate-x-1/4" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Recent Test Performance */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-steel-blue flex items-center gap-2">
                   <Clock className="w-5 h-5 text-sky-blue" /> Recent Test Performance
                 </h3>
                 <button className="text-sky-blue text-sm font-bold hover:underline">View Full History</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-50 pb-4">
                       <th className="pb-4 font-bold">Test Name</th>
                       <th className="pb-4 font-bold">Score</th>
                       <th className="pb-4 font-bold">Percentile</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm">
                     {RECENT_SCORES.map((score, i) => (
                       <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                         <td className="py-4 font-semibold text-steel-blue">{score.name}</td>
                         <td className="py-4 font-bold text-sky-blue">{score.score}</td>
                         <td className="py-4 font-bold text-tan-beige">{score.percentile}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

            {/* AI Performance Analysis */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-steel-blue flex items-center gap-2">
                   <TrendingUp className="w-5 h-5 text-sky-blue" /> AI Performance Analysis
                 </h3>
               </div>
               <div className="bg-sky-blue/5 p-6 rounded-2xl border border-sky-blue/10">
                 <p className="text-gray-700 text-sm leading-relaxed mb-4">
                   Based on your recent tests, you're showing strong performance in <strong>quantitative reasoning (85th percentile)</strong> and logical thinking. Your verbal scores have improved by 8% over the last month.
                 </p>
                 <div className="space-y-2 mb-4">
                   <p className="text-xs font-bold text-sky-blue uppercase">Recommendations</p>
                   <ul className="text-sm text-gray-600 space-y-2">
                     <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-blue mt-1.5" /> Focus on reading comprehension speed</li>
                     <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-blue mt-1.5" /> Practice SAT Verbal (target: 700+)</li>
                     <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-blue mt-1.5" /> Math performance is excellent</li>
                   </ul>
                 </div>
                 <div className="flex justify-between items-center border-t border-sky-blue/10 pt-4">
                   <span className="text-xs font-bold text-gray-500 uppercase">Overall Trend</span>
                   <span className="text-green-500 font-bold flex items-center gap-1">
                     <ArrowRight className="w-4 h-4 -rotate-45" /> Improving (12% growth)
                   </span>
                 </div>
               </div>
            </div>

            {/* Comparison charts */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-steel-blue mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-sky-blue" /> Comparison to Successful Admits
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={COMPARISON_DATA} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[1000, 1600]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="target" fill="#D2B48C" radius={[0, 4, 4, 0]} barSize={20} name="Target Avg" />
                    <Bar dataKey="user" fill="#4B9CD3" radius={[0, 4, 4, 0]} barSize={20} name="Your Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4 italic">
                *Target scores based on 2023 admitted student data
              </p>
            </div>

            {/* Profile Match Score */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
               <h3 className="text-xl font-bold text-steel-blue mb-6 flex items-center gap-2">
                 <Target className="w-5 h-5 text-sky-blue" /> Profile Match Score
               </h3>
               <div className="grid grid-cols-2 gap-4">
                 {[
                   { name: 'MIT', score: 72, color: 'text-orange-500' },
                   { name: 'Stanford', score: 68, color: 'text-yellow-500' },
                   { name: 'CMU', score: 78, color: 'text-green-500' },
                   { name: 'UC Berkeley', score: 82, color: 'text-green-600' },
                 ].map((univ, idx) => (
                   <div key={idx} className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center">
                      <div className={`text-2xl font-black ${univ.color} mb-1`}>{univ.score}%</div>
                      <div className="text-xs font-bold text-steel-blue text-center">{univ.name}</div>
                   </div>
                 ))}
               </div>
               <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                 <p className="text-sm text-yellow-800 font-medium italic">
                   "Improve your SAT by 100+ points to be competitive for MIT and Stanford."
                 </p>
               </div>
            </div>

            {/* Preparation Plan */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-steel-blue flex items-center gap-2">
                   <Calendar className="w-5 h-5 text-sky-blue" /> Your Current Preparation Plan
                 </h3>
                 <button className="text-sky-blue text-sm font-bold">View Full Path</button>
               </div>
               <div className="space-y-4">
                 {PREP_PATH.map((item, idx) => (
                   <div key={idx} className="flex items-center gap-4">
                     <div className="w-20 text-xs font-bold text-gray-400">{item.month}</div>
                     <div className="flex-1 flex items-center gap-3">
                       <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                         item.status === 'completed' ? 'bg-green-500' : 
                         item.status === 'in-progress' ? 'bg-sky-blue' : 'bg-gray-100'
                       }`}>
                         {item.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-white" /> : 
                          item.status === 'in-progress' ? <div className="w-2 h-2 bg-white rounded-full animate-pulse" /> : null}
                       </div>
                       <span className={`text-sm font-bold ${item.status === 'completed' ? 'text-gray-400 line-through' : 'text-steel-blue'}`}>
                         {item.task}
                       </span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Application Status */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
               <h3 className="text-xl font-bold text-steel-blue mb-6 flex items-center gap-2">
                 <GraduationCap className="w-5 h-5 text-sky-blue" /> University Applications
               </h3>
               <div className="space-y-6">
                 {APPLICATIONS.map((app, idx) => (
                   <div key={idx} className="space-y-2">
                     <div className="flex justify-between text-sm">
                       <span className="font-bold text-steel-blue">{app.school}</span>
                       <span className="text-xs font-bold text-sky-blue uppercase">{app.status}</span>
                     </div>
                     <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                       <div className="h-full bg-sky-blue" style={{ width: `${app.progress}%` }} />
                     </div>
                   </div>
                 ))}
               </div>
               <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Next Deadline</span>
                    <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-black">7 Months Away</span>
                  </div>
                  <p className="mt-2 font-bold text-steel-blue">MIT Early Action - Nov 1, 2024</p>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
      <div className="fixed bottom-8 right-8 z-[60]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="bg-white w-96 h-[500px] mb-4 rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
            >
              <div className="bg-steel-blue p-6 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 bg-sky-blue rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">AI Mentor</p>
                    <p className="text-xs text-sky-blue/80 font-medium italic">Online for profiling</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-white/60 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                <div className="bg-gray-50 p-4 rounded-2xl rounded-bl-none text-sm font-medium text-gray-700 max-w-[85%]">
                  Hi Arjun! How can I help you today with your application journey?
                </div>
                <div className="bg-sky-blue text-white p-4 rounded-2xl rounded-br-none text-sm font-medium max-w-[85%] ml-auto">
                  How can I improve my profile?
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl rounded-bl-none text-sm font-medium text-gray-700 max-w-[85%]">
                   Based on your current scores, I recommend focusing on SAT improvement and adding 1-2 leadership extracurriculars. Would you like a detailed plan?
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 flex gap-2">
                <input placeholder="Type a message..." className="flex-1 bg-gray-50 border-none outline-none rounded-xl px-4 py-3 text-sm" />
                <button className="bg-sky-blue text-white p-3 rounded-xl">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 bg-sky-blue text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-steel-blue hover:scale-110 transition-all"
        >
          {isChatOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
        </button>
      </div>

    </div>
  );
}
