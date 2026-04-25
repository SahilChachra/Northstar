/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, MapPin, GraduationCap, DollarSign, 
  ChevronRight, Star, TrendingUp, CheckCircle2, 
  AlertCircle, Info, BarChart3, Globe, Sparkles,
  ArrowUpDown, LayoutGrid, List as ListIcon, BookOpen, Target, PieChart, MessageCircle, User
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const TOP_UNIVERSITIES = [
  {
    rank: 1,
    name: "Massachusetts Institute of Technology (MIT)",
    location: "Cambridge, USA",
    acceptanceRate: "4%",
    sat: "1520-1580",
    tuition: "$53,790/year",
    why: "World-leading AI and robotics research, strong startup culture",
    logo: "M"
  },
  {
    rank: 2,
    name: "Stanford University",
    location: "Stanford, USA",
    acceptanceRate: "5%",
    sat: "1470-1570",
    tuition: "$56,169/year",
    why: "Silicon Valley connections, entrepreneurship focus",
    logo: "S"
  },
  {
    rank: 3,
    name: "Carnegie Mellon University",
    location: "Pittsburgh, USA",
    acceptanceRate: "17%",
    sat: "1460-1560",
    tuition: "$58,810/year",
    why: "Top CS program, strong in AI and human-computer interaction",
    logo: "C"
  },
  {
    rank: 4,
    name: "UC Berkeley",
    location: "Berkeley, USA",
    acceptanceRate: "15%",
    sat: "1330-1530",
    tuition: "$43,176/year",
    why: "Research powerhouse, diverse tech opportunities",
    logo: "B"
  },
  {
    rank: 5,
    name: "Harvard University",
    location: "Cambridge, USA",
    acceptanceRate: "4%",
    sat: "1480-1580",
    tuition: "$54,002/year",
    why: "Global prestige, interdisciplinary tech approach",
    logo: "H"
  },
  {
    rank: 6,
    name: "California Institute of Technology",
    location: "Pasadena, USA",
    acceptanceRate: "4%",
    sat: "1530-1580",
    tuition: "$56,364/year",
    why: "Highly specialized research, small class sizes",
    logo: "C"
  },
  {
    rank: 7,
    name: "Princeton University",
    location: "Princeton, USA",
    acceptanceRate: "4%",
    sat: "1460-1570",
    tuition: "$53,890/year",
    why: "Theoretical excellence, strong academic support",
    logo: "P"
  },
  {
    rank: 8,
    name: "Cornell University",
    location: "Ithaca, USA",
    acceptanceRate: "9%",
    sat: "1400-1560",
    tuition: "$58,886/year",
    why: "Diverse research areas, strong corporate recruitment",
    logo: "C"
  },
  {
    rank: 9,
    name: "UIUC",
    location: "Urbana-Champaign, USA",
    acceptanceRate: "23%",
    sat: "1300-1500",
    tuition: "$33,352/year",
    why: "Massive CS community, leading research in systems",
    logo: "U"
  },
  {
    rank: 10,
    name: "University of Washington",
    location: "Seattle, USA",
    acceptanceRate: "13% (CS)",
    sat: "1220-1470",
    tuition: "$39,906/year",
    why: "Close to Microsoft and Amazon, strong in software engineering",
    logo: "W"
  }
];

const MATCHES = [
  {
    name: "University of Illinois Urbana-Champaign",
    match: 91,
    stars: 5,
    chance: "Very High",
    why: "Your SAT score is above their 75th percentile. Strong CS program.",
    strengthen: "Add research experience or significant project"
  },
  {
    name: "Purdue University",
    match: 89,
    stars: 5,
    chance: "Very High",
    why: "GPA and test scores align well. Great engineering school.",
    strengthen: "Showcase technical leadership"
  },
  {
    name: "University of Texas at Austin",
    match: 87,
    stars: 4,
    chance: "High",
    why: "Strong profile fit. Competitive CS program.",
    strengthen: "Engage in more community tech volunteer work"
  },
  {
    name: "UC San Diego",
    match: 85,
    stars: 4,
    chance: "High",
    why: "Good academic fit. Consider showcasing tech projects.",
    strengthen: "Detailed GitHub portfolio"
  },
  {
    name: "University of Wisconsin-Madison",
    match: 84,
    stars: 4,
    chance: "High",
    why: "Academic scores match their target profile perfectly.",
    strengthen: "Personal statement refinement"
  },
  {
    name: "Georgia Tech",
    match: 82,
    stars: 4,
    chance: "Moderate-High",
    why: "Solid match. Improve SAT by 50 points for better odds.",
    strengthen: "Focus on SAT Math score consistency"
  },
  {
    name: "Carnegie Mellon",
    match: 78,
    stars: 4,
    chance: "Moderate (Reach)",
    why: "You're in range but competitive. Strengthen extracurriculars.",
    strengthen: "AI-related side projects"
  },
  {
    name: "UC Berkeley",
    match: 72,
    stars: 3,
    chance: "Moderate (Reach)",
    why: "Targeting top-tier research requires profile highlight.",
    strengthen: "SAT +70 points, add leadership role"
  },
  {
    name: "Cornell University",
    match: 68,
    stars: 3,
    chance: "Moderate-Low (High Reach)",
    why: "Competitive pool. Need significant spike in profile.",
    strengthen: "National level coding competitions"
  },
  {
    name: "Northwestern University",
    match: 65,
    stars: 3,
    chance: "Moderate-Low (High Reach)",
    why: "Holistic review might favor unique ECs.",
    strengthen: "Unique interdisciplinary project"
  }
];

export default function MatchUniversity() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getMatchColor = (percent: number) => {
    if (percent >= 80) return 'text-green-500 bg-green-50 border-green-100';
    if (percent >= 70) return 'text-yellow-500 bg-yellow-50 border-yellow-100';
    return 'text-orange-500 bg-orange-50 border-orange-100';
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
          <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <BarChart3 className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => navigate('/quiz')} className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <BookOpen className="w-5 h-5" /> Quiz
          </button>
          <button onClick={() => navigate('/match')} className="w-full flex items-center gap-3 p-3 bg-white/10 rounded-xl font-bold">
            <GraduationCap className="w-5 h-5" /> Match University
          </button>
          <button onClick={() => navigate('/path')} className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <Target className="w-5 h-5" /> Generate Path
          </button>
          <button onClick={() => navigate('/enhance')} className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <PieChart className="w-5 h-5" /> Enhance Profile
          </button>
          <button onClick={() => navigate('/chat')} className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <MessageCircle className="w-5 h-5" /> AI Mentor
          </button>
          <button onClick={() => navigate('/profile')} className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <User className="w-5 h-5" /> My Profile
          </button>
        </nav>
      </aside>

      <div className="flex-1 lg:ml-64 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Top Nav */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-40">
           <div className="flex items-center gap-8 font-bold text-gray-500">
              <button onClick={() => navigate('/dashboard')} className="hover:text-sky-blue">Dashboard</button>
              <button onClick={() => navigate('/quiz')} className="hover:text-sky-blue">Quiz</button>
              <button onClick={() => navigate('/match')} className="text-sky-blue border-b-2 border-sky-blue py-2">Match University</button>
              <button onClick={() => navigate('/path')} className="hover:text-sky-blue">Generate Path</button>
              <button onClick={() => navigate('/enhance')} className="hover:text-sky-blue">Enhance Profile</button>
              <button onClick={() => navigate('/chat')} className="hover:text-sky-blue">AI Mentor</button>
           </div>
           <div className="flex items-center gap-4">
              <button onClick={() => navigate('/profile')} className="w-10 h-10 bg-sky-blue rounded-full flex items-center justify-center text-white font-bold hover:scale-105 transition-transform">
                 A
              </button>
           </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 space-y-12">
          {/* Hero / Filter Section */}
          <section className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-black text-steel-blue mb-2">University Matchmaker</h1>
                <p className="text-gray-500 font-medium italic">Finding the best Computer Science programs for you.</p>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl font-bold border border-gray-100 hover:bg-gray-100 transition-all">
                  <Filter className="w-5 h-5" /> Filters
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-sky-blue text-white rounded-2xl font-bold shadow-lg shadow-sky-blue/20 hover:bg-steel-blue transition-all">
                  Compare Selection
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-3xl">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Location</p>
                <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-bold text-steel-blue truncate">Global</span>
                  <Globe className="w-4 h-4 text-sky-blue" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tuition Range</p>
                <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-bold text-steel-blue truncate">Any</span>
                  <DollarSign className="w-4 h-4 text-sky-blue" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SAT Score</p>
                <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-bold text-steel-blue truncate">1380</span>
                  <ArrowUpDown className="w-4 h-4 text-sky-blue" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Acceptance Rate</p>
                <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-bold text-steel-blue truncate">Any</span>
                  <BarChart3 className="w-4 h-4 text-sky-blue" />
                </div>
              </div>
            </div>
          </section>

          {/* Top 10 Ranked Universities */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-steel-blue flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> Best Computer Science Programs
              </h2>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                 <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm text-sky-blue' : 'text-gray-400'}`}><LayoutGrid className="w-4 h-4" /></button>
                 <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm text-sky-blue' : 'text-gray-400'}`}><ListIcon className="w-4 h-4" /></button>
              </div>
            </div>

            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}>
              {TOP_UNIVERSITIES.map((univ, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className={`bg-white border rounded-3xl overflow-hidden transition-all hover:shadow-2xl hover:border-sky-blue/30 ${viewMode === 'grid' ? 'p-0 shadow-xl' : 'p-6 flex items-center gap-6 shadow-lg'}`}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="bg-gradient-to-br from-steel-blue to-sky-blue h-32 p-6 flex justify-between items-start relative">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl font-black text-white">
                          {univ.logo}
                        </div>
                        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
                          Rank #{univ.rank}
                        </div>
                        <div className="absolute -bottom-4 right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-sky-blue group cursor-pointer hover:scale-110 transition-transform">
                           <ChevronRight className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="p-8 pt-10">
                        <h3 className="text-xl font-bold text-steel-blue mb-4 leading-tight">{univ.name}</h3>
                        <div className="space-y-3 mb-6">
                           <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                              <MapPin className="w-4 h-4 text-sky-blue" /> {univ.location}
                           </div>
                           <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                              <GraduationCap className="w-4 h-4 text-sky-blue" /> Acceptance: {univ.acceptanceRate}
                           </div>
                           <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                              <ArrowUpDown className="w-4 h-4 text-sky-blue" /> Avg SAT: {univ.sat}
                           </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl italic text-xs text-gray-600 border border-gray-100">
                           "{univ.why}"
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-steel-blue rounded-2xl flex items-center justify-center text-2xl font-black text-white shrink-0">
                         {univ.logo}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-bold text-steel-blue">{univ.name}</h3>
                          <span className="text-xs font-black text-sky-blue uppercase">Rank #{univ.rank}</span>
                        </div>
                        <div className="flex gap-6 text-xs text-gray-400 font-bold">
                           <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {univ.location}</span>
                           <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {univ.acceptanceRate}</span>
                           <span className="flex items-center gap-1"><ArrowUpDown className="w-3 h-3" /> SAT: {univ.sat}</span>
                        </div>
                      </div>
                      <button className="p-3 bg-gray-50 text-gray-400 hover:text-sky-blue hover:bg-sky-blue/5 rounded-xl transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Your Top 10 Matches */}
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-black text-steel-blue flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-sky-blue fill-sky-blue" /> Universities Where You're a Competitive Candidate
              </h2>
              <p className="text-gray-400 font-medium">Based on your SAT score (1380), GPA (3.7), and activity profile.</p>
            </div>

            <div className="space-y-6">
              {MATCHES.map((match, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 group hover:border-sky-blue/30 transition-all flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative mb-2">
                       <svg className="w-24 h-24 transform -rotate-90">
                          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                          <circle 
                            cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * match.match) / 100}
                            className={match.match >= 80 ? 'text-green-500' : match.match >= 70 ? 'text-yellow-500' : 'text-orange-500'}
                            strokeLinecap="round"
                          />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center font-black text-xl italic text-steel-blue">
                          {match.match}%
                       </div>
                    </div>
                    <div className="flex gap-1">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} className={`w-3 h-3 ${i < match.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                       ))}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-2xl font-black text-steel-blue">{match.name}</h3>
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getMatchColor(match.match)}`}>
                        {match.chance}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-3xl">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                           <Info className="w-3 h-3 text-sky-blue" /> Why you match
                        </p>
                        <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
                           "{match.why}"
                        </p>
                      </div>
                      <div className="bg-sky-blue/5 p-4 rounded-3xl border border-sky-blue/10">
                        <p className="text-[10px] font-black text-sky-blue uppercase tracking-widest mb-2 flex items-center gap-2">
                           <TrendingUp className="w-3 h-3 text-sky-blue" /> What to strengthen
                        </p>
                        <p className="text-sm font-medium text-steel-blue leading-relaxed">
                           {match.strengthen}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="p-6 bg-gray-50 rounded-[30px] group-hover:bg-sky-blue group-hover:text-white transition-all text-gray-300">
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* AI Match Analysis */}
          <section className="bg-steel-blue text-white p-12 rounded-[50px] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-10">
                <Sparkles className="w-64 h-64" />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-16 h-16 bg-sky-blue rounded-[30px] flex items-center justify-center shadow-lg">
                      <BarChart3 className="w-8 h-8" />
                   </div>
                   <h2 className="text-4xl font-black italic">AI-Powered Match Analysis</h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                   <div className="xl:col-span-2 space-y-12">
                      <div className="bg-white/10 backdrop-blur-md p-8 rounded-[40px] border border-white/10">
                         <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <Target className="w-6 h-6 text-sky-blue" /> Current Position
                         </h4>
                         <p className="text-lg text-white/80 leading-relaxed font-medium">
                            Arjun, you're a strong candidate for top-tier public universities and competitive for mid-tier Ivy League schools. Your SAT (1380) places you in the top 10% of applicants globally, but targeting MIT/Stanford requires a tighter margin of error.
                         </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <h5 className="text-sky-blue font-black uppercase tracking-widest text-sm italic">Strengths</h5>
                            <div className="space-y-3">
                               {[
                                 "Solid SAT Math score (720) - Strong CS Signal",
                                 "Consistent academic performance (GPA 3.7)",
                                 "Clear focus on Computer Science discipline",
                                 "Recent improvement trend (+8% in 30 days)"
                               ].map((s, i) => (
                                 <div key={i} className="flex gap-3 text-sm font-bold">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                                    {s}
                                 </div>
                               ))}
                            </div>
                         </div>
                         <div className="space-y-4">
                            <h5 className="text-orange-400 font-black uppercase tracking-widest text-sm italic">Growth Opportunities</h5>
                            <div className="space-y-3">
                               {[
                                 "SAT Verbal: Aim for 700+ (currently 660)",
                                 "Extracurriculars: Add 1-2 leadership roles",
                                 "Projects: Build 1 significant GitHub project",
                                 "Research: Target summer research programs"
                               ].map((s, i) => (
                                 <div key={i} className="flex gap-3 text-sm font-bold">
                                    <AlertCircle className="w-5 h-5 text-orange-400 shrink-0" />
                                    {s}
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>

                      <div className="bg-white/5 p-8 rounded-[40px] border border-white/5">
                        <h4 className="text-xl font-bold mb-8">Strategic Recommendations</h4>
                        <div className="space-y-8">
                           <div className="relative pl-12 border-l-2 border-sky-blue/30 pb-8 last:pb-0">
                              <div className="absolute top-0 left-0 -translate-x-1/2 w-6 h-6 bg-sky-blue rounded-full flex items-center justify-center text-[10px] font-black text-white">1</div>
                              <h5 className="font-black text-sky-blue mb-2 italic">Short-term (Next 2 months)</h5>
                              <p className="text-sm text-white/70 font-medium">Focus on intensive SAT Verbal prep (+40 points target). Start your meaningful CS project for showcase.</p>
                           </div>
                           <div className="relative pl-12 border-l-2 border-sky-blue/30 pb-8 last:pb-0">
                              <div className="absolute top-0 left-0 -translate-x-1/2 w-6 h-6 bg-sky-blue rounded-full flex items-center justify-center text-[10px] font-black text-white">2</div>
                              <h5 className="font-black text-sky-blue mb-2 italic">Medium-term (3-6 months)</h5>
                              <p className="text-sm text-white/70 font-medium">Join/lead a CS club or competition team. Apply for summer programs. Begin first drafts of your SOP.</p>
                           </div>
                           <div className="relative pl-12 border-l-2 border-sky-blue/30 pb-0 shadow-none">
                              <div className="absolute top-0 left-0 -translate-x-1/2 w-6 h-6 bg-sky-blue rounded-full flex items-center justify-center text-[10px] font-black text-white">3</div>
                              <h5 className="font-black text-sky-blue mb-2 italic">Application Mix</h5>
                              <p className="text-sm text-white/70 font-medium">Safety (3-4), Target (4-5), Reach (2-3). Maintain a holistic balance across your list.</p>
                           </div>
                        </div>
                      </div>
                   </div>

                   <aside className="space-y-8">
                      <div className="bg-sky-blue p-8 rounded-[40px] shadow-xl">
                         <h4 className="text-xl font-black mb-6">Predicted Outcomes</h4>
                         <div className="space-y-6">
                            <div>
                               <p className="text-[10px] font-black text-white/60 uppercase mb-2">Current Reach</p>
                               <div className="flex flex-wrap gap-2">
                                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">UIUC</span>
                                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">Purdue</span>
                                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">UT Austin</span>
                               </div>
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-white/60 uppercase mb-2">After Retake (1450+)</p>
                               <div className="flex flex-wrap gap-2">
                                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">Carnegie Mellon</span>
                                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">Cornell</span>
                                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">Columbia</span>
                               </div>
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-white/60 uppercase mb-2">Stretch Goal (1520+)</p>
                               <div className="flex flex-wrap gap-2">
                                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">UC Berkeley</span>
                                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">MIT</span>
                                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">Stanford</span>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md p-8 rounded-[40px] border border-white/10">
                         <h4 className="text-sm font-black text-sky-blue uppercase mb-6 tracking-widest italic">Success Timeline</h4>
                         <div className="space-y-6">
                            {[
                              { label: "Feb-Mar", task: "SAT Verbal Focus" },
                              { label: "Apr", task: "SAT Retake Attempt" },
                              { label: "May-Aug", task: "Profile & Project" },
                              { label: "Sep-Oct", task: "Admin Prep" },
                              { label: "Nov-Dec", task: "Submissions" },
                            ].map((t, idx) => (
                              <div key={idx} className="flex justify-between items-center text-sm">
                                 <span className="font-bold text-white/50">{t.label}</span>
                                 <span className="font-bold">{t.task}</span>
                              </div>
                            ))}
                         </div>
                      </div>
                      
                      <div className="p-4 text-center">
                         <p className="text-xs text-white/40 italic font-medium leading-relaxed">
                            "Remember: University admissions are holistic. Your story, passion, and unique experiences matter as much as numbers!"
                         </p>
                      </div>
                   </aside>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
