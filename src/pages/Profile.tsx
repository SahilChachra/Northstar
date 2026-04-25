/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, Mail, Calendar, MapPin, GraduationCap, Phone, 
  Edit3, Star, CreditCard, Download, History, Award, 
  Settings, Lock, LogOut, Bell, Shield, HelpCircle, 
  Trash2, BarChart3, TrendingUp, BookOpen, Target, 
  PieChart, MessageCircle, ChevronRight, CheckCircle2,
  Clock, Book, Zap, Trophy, ShieldCheck
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const UNIVERSITIES = [
  { name: 'MIT', score: 72, status: 'Reach', app: 'Planning' },
  { name: 'Stanford', score: 68, status: 'Reach', app: 'Planning' },
  { name: 'CMU', score: 78, status: 'Target', app: 'In Progress' },
  { name: 'UC Berkeley', score: 72, status: 'Target', app: 'Planning' },
  { name: 'UIUC', score: 91, status: 'Safety/Target', app: 'Planning' },
];

const PAYMENTS = [
  { date: 'Jan 1, 2024', desc: 'Complete Access Plan', amount: '₹1,799', status: 'Paid' },
  { date: 'Jan 1, 2024', desc: 'Processing Fee', amount: '₹36', status: 'Paid' },
];

const BADGES = [
  { icon: Trophy, label: 'First Test Completed', unlocked: true, color: 'text-yellow-500 bg-yellow-50' },
  { icon: Book, label: '5 Tests Master', unlocked: true, color: 'text-blue-500 bg-blue-50' },
  { icon: MessageCircle, label: 'Chatty Learner', unlocked: true, color: 'text-green-500 bg-green-50' },
  { icon: Edit3, label: 'SOP Writer', unlocked: true, color: 'text-purple-500 bg-purple-50' },
  { icon: Target, label: 'Goal Setter', unlocked: true, color: 'text-sky-blue bg-sky-blue/10' },
  { icon: Star, label: 'Premium Member', unlocked: true, color: 'text-orange-500 bg-orange-50' },
  { icon: Award, label: 'Test Champion', unlocked: false, color: 'text-gray-300 bg-gray-50' },
  { icon: CheckCircle2, label: 'Perfectionist', unlocked: false, color: 'text-gray-300 bg-gray-50' },
  { icon: Clock, label: 'Dedicated Scholar', unlocked: false, color: 'text-gray-300 bg-gray-50' },
];

export default function Profile() {
  const navigate = useNavigate();
  const [activeTheme, setActiveTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 bg-steel-blue text-white flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6 flex items-center gap-2 border-b border-white/10">
          <TrendingUp className="w-8 h-8 text-sky-blue" />
          <span className="text-2xl font-bold tracking-tight">NorthStar</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 mt-4">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
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
        </nav>
      </aside>

      <div className="flex-1 lg:ml-64 relative pb-12">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
           <div className="flex items-center gap-8 font-black text-gray-500">
              <Link to="/dashboard" className="hover:text-sky-blue transition-colors">Dashboard</Link>
              <Link to="/quiz" className="hover:text-sky-blue transition-colors">Quiz</Link>
              <Link to="/match" className="hover:text-sky-blue transition-colors">Match</Link>
              <Link to="/profile" className="text-sky-blue border-b-2 border-sky-blue py-2">Profile</Link>
           </div>
           <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/chat')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 relative"
              >
                <MessageCircle className="w-6 h-6" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-sky-blue rounded-full" />
              </button>
              <div className="w-10 h-10 bg-sky-blue rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white font-bold">
                 A
              </div>
           </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
          {/* Profile Header */}
          <section className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
             <div className="h-32 bg-gradient-to-r from-steel-blue to-sky-blue" />
             <div className="px-10 pb-10 -mt-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                   <div className="flex flex-col md:flex-row items-end gap-6">
                      <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-5xl font-black text-sky-blue overflow-hidden">
                         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" alt="Arjun Sharma" className="w-full h-full object-cover" />
                      </div>
                      <div className="mb-2">
                         <h1 className="text-3xl font-black text-steel-blue italic">Arjun Sharma</h1>
                         <p className="text-gray-400 font-bold flex items-center gap-2">
                           Aspiring Computer Scientist | Class of 2025
                         </p>
                      </div>
                   </div>
                   <button className="bg-sky-blue hover:bg-steel-blue text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-sky-blue/20 flex items-center gap-2 transition-all active:scale-95 mb-2">
                      <Edit3 className="w-5 h-5" /> Edit Profile
                   </button>
                </div>
             </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Left Column */}
             <div className="lg:col-span-2 space-y-8">
                {/* Personal Information */}
                <section className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100">
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-black text-steel-blue italic flex items-center gap-3">
                         <User className="w-8 h-8 text-sky-blue" /> Personal Details
                      </h2>
                      <button className="text-sky-blue font-black uppercase tracking-widest text-xs hover:underline">Edit</button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-medium">
                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <dt className="text-gray-400 w-24 shrink-0 font-bold uppercase text-[10px] tracking-widest">Full Name</dt>
                            <dd className="text-steel-blue font-bold">Arjun Sharma</dd>
                         </div>
                         <div className="flex items-center gap-3">
                            <dt className="text-gray-400 w-24 shrink-0 font-bold uppercase text-[10px] tracking-widest">Email</dt>
                            <dd className="text-steel-blue font-bold">demo@northstar.edu</dd>
                         </div>
                         <div className="flex items-center gap-3">
                            <dt className="text-gray-400 w-24 shrink-0 font-bold uppercase text-[10px] tracking-widest">Age</dt>
                            <dd className="text-steel-blue font-bold">17 years old</dd>
                         </div>
                         <div className="flex items-center gap-3">
                            <dt className="text-gray-400 w-24 shrink-0 font-bold uppercase text-[10px] tracking-widest">Birth Date</dt>
                            <dd className="text-steel-blue font-bold">March 15, 2007</dd>
                         </div>
                      </div>
                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <dt className="text-gray-400 w-24 shrink-0 font-bold uppercase text-[10px] tracking-widest">Location</dt>
                            <dd className="text-steel-blue font-bold flex items-center gap-1">
                               <MapPin className="w-4 h-4 text-sky-blue" /> Mumbai, India
                            </dd>
                         </div>
                         <div className="flex items-center gap-3">
                            <dt className="text-gray-400 w-24 shrink-0 font-bold uppercase text-[10px] tracking-widest">Grade</dt>
                            <dd className="text-steel-blue font-bold">12th Grade</dd>
                         </div>
                         <div className="flex items-center gap-3">
                            <dt className="text-gray-400 w-24 shrink-0 font-bold uppercase text-[10px] tracking-widest">School</dt>
                            <dd className="text-steel-blue font-bold">Delhi Public School</dd>
                         </div>
                         <div className="flex items-center gap-3">
                            <dt className="text-gray-400 w-24 shrink-0 font-bold uppercase text-[10px] tracking-widest">Phone</dt>
                            <dd className="text-steel-blue font-bold">+91 98765 43210</dd>
                         </div>
                      </div>
                   </div>
                </section>

                {/* Academic Profile */}
                <section className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100">
                   <h2 className="text-2xl font-black text-steel-blue italic flex items-center gap-3 mb-8">
                      <GraduationCap className="w-8 h-8 text-sky-blue" /> Academic Scores
                   </h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                         <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 italic">Standardized Tests</h3>
                         <div className="space-y-6">
                            <div>
                               <div className="flex justify-between items-end mb-2">
                                  <span className="text-3xl font-black text-steel-blue">1380<span className="text-sm text-gray-300">/1600</span></span>
                                  <span className="text-xs font-black text-sky-blue uppercase">SAT Score</span>
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-white p-3 rounded-2xl border border-gray-200">
                                     <p className="text-[10px] font-bold text-gray-400 uppercase">Math</p>
                                     <p className="text-sm font-black text-steel-blue">720 (85th %)</p>
                                  </div>
                                  <div className="bg-white p-3 rounded-2xl border border-gray-200">
                                     <p className="text-[10px] font-bold text-gray-400 uppercase">Verbal</p>
                                     <p className="text-sm font-black text-steel-blue">660 (78th %)</p>
                                  </div>
                               </div>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                               <span>GPA (Unweighted)</span>
                               <span className="text-green-500">3.7/4.0</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                               <span>Class Rank</span>
                               <span className="text-sky-blue">Top 10%</span>
                            </div>
                         </div>
                      </div>
                      <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                         <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 italic">Course Performance</h3>
                         <div className="space-y-4">
                            {[
                              { sub: 'Mathematics', grade: 'A' },
                              { sub: 'Physics', grade: 'A' },
                              { sub: 'Chemistry', grade: 'A-' },
                              { sub: 'Computer Science', grade: 'A+' },
                              { sub: 'English', grade: 'B+' }
                            ].map((c, i) => (
                              <div key={i} className="flex justify-between items-center bg-white px-4 py-2 rounded-xl border border-gray-100">
                                 <span className="text-sm font-bold text-gray-600">{c.sub}</span>
                                 <span className="text-sm font-black text-sky-blue italic">{c.grade}</span>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </section>

                {/* Subscription & Plans */}
                <section className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-10 opacity-5">
                      <CreditCard className="w-32 h-32" />
                   </div>
                   <h2 className="text-2xl font-black text-steel-blue italic flex items-center gap-3 mb-8">
                      <CreditCard className="w-8 h-8 text-sky-blue" /> Your Subscription
                   </h2>
                   <div className="bg-steel-blue text-white p-8 rounded-[32px] shadow-xl shadow-steel-blue/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                      <div className="space-y-4">
                         <div>
                            <span className="bg-sky-blue px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-2 inline-block">Current Plan</span>
                            <h3 className="text-3xl font-black italic flex items-center gap-3">Complete Access <Star className="w-6 h-6 fill-sky-blue text-sky-blue" /></h3>
                         </div>
                         <div className="flex gap-6 text-sm font-bold text-white/60">
                            <span>₹1,799 (One-time)</span>
                            <span>•</span>
                            <span>Jan 1, 2024</span>
                         </div>
                      </div>
                      <button className="bg-white text-steel-blue px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-sky-blue hover:text-white transition-all scale-100 hover:scale-105 active:scale-95 shrink-0">
                         Manage Plan
                      </button>
                   </div>
                </section>

                {/* Activity Summary */}
                <section className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100">
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-black text-steel-blue italic flex items-center gap-3">
                         <History className="w-8 h-8 text-sky-blue" /> Activity Summary
                      </h2>
                      <div className="text-xs font-black text-gray-400 uppercase tracking-widest italic">Since Jan 1, 2024</div>
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { label: 'Days Active', value: '24', icon: Calendar },
                        { label: 'Tests Completed', value: '5', icon: CheckCircle2 },
                        { label: 'SOPs Drafted', value: '3', icon: Edit3 },
                        { label: 'Study Hours', value: '42', icon: Clock },
                      ].map((stat, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-[32px] border border-gray-100 text-center group hover:bg-white hover:shadow-lg transition-all">
                           <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-sky-blue mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                              <stat.icon className="w-5 h-5" />
                           </div>
                           <p className="text-2xl font-black text-steel-blue italic mb-1">{stat.value}</p>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        </div>
                      ))}
                   </div>
                </section>
             </div>

             {/* Right Column */}
             <div className="space-y-8">
                {/* Target Universities */}
                <section className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100">
                   <h2 className="text-xl font-black text-steel-blue italic flex items-center gap-3 mb-6">
                      <Target className="w-6 h-6 text-sky-blue" /> Dream Universities
                   </h2>
                   <div className="space-y-4 mb-8">
                      {UNIVERSITIES.map((uni, i) => (
                        <div key={i} className="group cursor-pointer">
                           <div className="flex justify-between items-center mb-2">
                              <h4 className="font-bold text-steel-blue text-sm">{uni.name}</h4>
                              <span className={`text-[10px] font-black uppercase italic ${uni.score >= 80 ? 'text-green-500' : 'text-sky-blue'}`}>{uni.score}% Match</span>
                           </div>
                           <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              <span>{uni.status}</span>
                              <span className="italic">{uni.app}</span>
                           </div>
                           <div className="mt-2 h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${uni.score}%` }}
                                className={`h-full rounded-full ${uni.score >= 80 ? 'bg-green-500' : 'bg-sky-blue'}`}
                              />
                           </div>
                        </div>
                      ))}
                   </div>
                   <button className="w-full py-4 bg-gray-50 text-sky-blue hover:bg-sky-blue hover:text-white rounded-2xl font-black shadow-inner border border-gray-100 transition-all text-xs uppercase tracking-widest">
                      Update Selection
                   </button>
                </section>

                {/* Achievements */}
                <section className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100">
                   <h2 className="text-xl font-black text-steel-blue italic flex items-center gap-3 mb-6">
                      <Award className="w-6 h-6 text-sky-blue" /> Achievements
                   </h2>
                   <div className="grid grid-cols-2 gap-4">
                      {BADGES.map((badge, i) => (
                        <div key={i} className={`p-4 rounded-3xl flex flex-col items-center justify-center text-center gap-2 border transition-all ${badge.unlocked ? 'border-gray-100 shadow-sm' : 'opacity-40 grayscale border-dashed border-gray-200'}`}>
                           <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${badge.color}`}>
                              <badge.icon className="w-5 h-5" />
                           </div>
                           <p className="text-[10px] font-black text-steel-blue leading-tight h-6 flex items-center">{badge.label}</p>
                        </div>
                      ))}
                   </div>
                </section>

                {/* Settings & Preferences */}
                <section className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100">
                   <h2 className="text-xl font-black text-steel-blue italic flex items-center gap-3 mb-8">
                      <Settings className="w-6 h-6 text-sky-blue" /> Preferences
                   </h2>
                   <div className="space-y-6">
                      <div className="flex justify-between items-center">
                         <span className="text-sm font-bold text-gray-500">Email Notifications</span>
                         <button 
                           onClick={() => setNotifications(!notifications)}
                           className={`w-12 h-6 rounded-full transition-all relative ${notifications ? 'bg-sky-blue' : 'bg-gray-200'}`}
                         >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications ? 'left-7' : 'left-1'}`} />
                         </button>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                         <span>Weekly Progress</span>
                         <span className="text-sky-blue uppercase">Every Monday</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                         <span>Theme Mode</span>
                         <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button onClick={() => setActiveTheme('light')} className={`px-3 py-1 rounded-md text-[10px] font-black uppercase ${activeTheme === 'light' ? 'bg-white shadow-sm text-sky-blue' : 'text-gray-400'}`}>Light</button>
                            <button onClick={() => setActiveTheme('dark')} className={`px-3 py-1 rounded-md text-[10px] font-black uppercase ${activeTheme === 'dark' ? 'bg-white shadow-sm text-sky-blue' : 'text-gray-400'}`}>Dark</button>
                         </div>
                      </div>
                   </div>
                   <div className="mt-12 space-y-3">
                      <button className="w-full py-4 text-left px-6 rounded-2xl font-black text-sm text-steel-blue hover:bg-gray-50 transition-all flex items-center justify-between group">
                         <span className="flex items-center gap-3"><Lock className="w-4 h-4 text-sky-blue" /> Change Password</span>
                         <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all text-sky-blue" />
                      </button>
                      <button className="w-full py-4 text-left px-6 rounded-2xl font-black text-sm text-red-500 hover:bg-red-50 transition-all flex items-center justify-between group">
                         <span className="flex items-center gap-3"><LogOut className="w-4 h-4" /> Logout</span>
                         <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                      </button>
                   </div>
                </section>
             </div>
          </div>

          {/* Payment History Table */}
          <section className="bg-white p-10 rounded-[50px] shadow-xl border border-gray-100 overflow-hidden">
             <h2 className="text-2xl font-black text-steel-blue italic flex items-center gap-3 mb-10">
                <ShieldCheck className="w-8 h-8 text-sky-blue" /> Payment History
             </h2>
             <div className="overflow-x-auto">
                <table className="w-full text-left font-bold">
                   <thead>
                      <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                         <th className="pb-6 px-6">Date</th>
                         <th className="pb-6 px-6">Description</th>
                         <th className="pb-6 px-6">Amount</th>
                         <th className="pb-6 px-6">Status</th>
                         <th className="pb-6 px-6 text-right">Invoice</th>
                      </tr>
                   </thead>
                   <tbody className="text-sm text-steel-blue">
                      {PAYMENTS.map((p, i) => (
                        <tr key={i} className="group hover:bg-gray-50/50 transition-all">
                           <td className="py-6 px-6 border-b border-gray-50">{p.date}</td>
                           <td className="py-6 px-6 border-b border-gray-50 italic">{p.desc}</td>
                           <td className="py-6 px-6 border-b border-gray-50">{p.amount}</td>
                           <td className="py-6 px-6 border-b border-gray-50">
                              <span className="bg-green-50 text-green-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                 {p.status}
                              </span>
                           </td>
                           <td className="py-6 px-6 border-b border-gray-50 text-right">
                              <button className="text-sky-blue hover:text-steel-blue transition-colors flex items-center gap-2 ml-auto group/btn">
                                 <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                                 <span className="text-xs font-black uppercase tracking-widest">PDF</span>
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             <div className="mt-10 flex flex-col md:flex-row justify-between items-center p-8 bg-gray-50 rounded-[32px] border border-gray-100 gap-6">
                <div className="flex items-center gap-8">
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Spent</p>
                      <p className="text-2xl font-black text-steel-blue">₹1,835</p>
                   </div>
                   <div className="h-10 w-px bg-gray-200 hidden md:block" />
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment Method</p>
                      <p className="text-sm font-bold text-steel-blue flex items-center gap-2 italic">
                         <CreditCard className="w-4 h-4 text-sky-blue" /> Visa ending in 4532
                      </p>
                   </div>
                </div>
                <button className="bg-white border border-gray-200 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-sky-blue hover:text-white hover:border-sky-blue transition-all">
                   Update Payment Method
                </button>
             </div>
          </section>

          {/* Account Actions */}
          <section className="flex flex-wrap gap-4 items-center justify-center py-12">
             <button className="p-4 bg-white rounded-3xl border border-gray-100 flex items-center gap-3 text-sm font-black text-gray-500 hover:bg-gray-100 transition-all">
                <Shield className="w-5 h-5 text-sky-blue" /> Privacy Settings
             </button>
             <button className="p-4 bg-white rounded-3xl border border-gray-100 flex items-center gap-3 text-sm font-black text-gray-500 hover:bg-gray-100 transition-all">
                <HelpCircle className="w-5 h-5 text-sky-blue" /> Help & Support
             </button>
             <button className="p-4 bg-white rounded-3xl border border-gray-100 flex items-center gap-3 text-sm font-black text-gray-500 hover:bg-gray-100 transition-all">
                <Download className="w-5 h-5 text-sky-blue" /> Download Raw Data
             </button>
             <button className="p-4 bg-red-50 rounded-3xl border border-red-100 flex items-center gap-3 text-sm font-black text-red-500 hover:bg-red-500 hover:text-white transition-all group">
                <Trash2 className="w-5 h-5 group-hover:animate-pulse" /> Delete Account
             </button>
          </section>
        </main>
      </div>
    </div>
  );
}
