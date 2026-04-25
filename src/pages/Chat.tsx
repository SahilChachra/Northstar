/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, MessageCircle, Clock, Search, MoreVertical, 
  Plus, BarChart3, TrendingUp, GraduationCap, Target, 
  PieChart, BookOpen, User, Bot, Sparkles, ChevronRight,
  Calculator, FileText, Calendar, Layout, Award, Lightbulb,
  Edit2, Menu, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: string;
  data?: any;
}

const CHAT_HISTORY = [
  {
    period: 'TODAY',
    chats: [
      { id: '1', title: 'Improving my SAT Verbal score', time: '12:30 PM' },
      { id: '2', title: 'Stanford SOP feedback', time: '10:15 AM' },
    ]
  },
  {
    period: 'YESTERDAY',
    chats: [
      { id: '3', title: 'Best CS projects for applications', time: '4:20 PM' },
      { id: '4', title: 'Carnegie Mellon vs UC Berkeley', time: '2:10 PM' },
    ]
  },
  {
    period: 'THIS WEEK',
    chats: [
      { id: '5', title: 'Summer research program options', time: 'Jan 16' },
      { id: '6', title: 'How to ask for recommendation letters', time: 'Jan 15' },
      { id: '7', title: 'Time management for SAT prep', time: 'Jan 14' },
    ]
  },
  {
    period: 'LAST WEEK',
    chats: [
      { id: '8', title: 'Extracurricular activities ideas', time: 'Jan 10' },
      { id: '9', title: 'Should I retake SAT?', time: 'Jan 8' },
    ]
  }
];

const QUICK_ACTIONS = [
  { id: 'compare', label: 'Compare my scores', icon: Calculator },
  { id: 'sop', label: 'Review my SOP', icon: FileText },
  { id: 'study', label: 'Suggest study plan', icon: Calendar },
  { id: 'univ', label: 'University recommendations', icon: GraduationCap },
  { id: 'skill', label: 'Improve specific skill', icon: Target },
  { id: 'timeline', label: 'Application timeline', icon: Layout },
  { id: 'success', label: 'Success stories', icon: Award },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      type: 'ai',
      text: "Hi Arjun! I'm your NorthStar AI Mentor. I have your profile details (SAT 1380, GPA 3.7) loaded. How can I help you strengthen your application today?",
      timestamp: '10:00 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (text?: string) => {
    const msgText = text || input;
    if (!msgText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: msgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!text) setInput('');
    setIsTyping(true);

    // Mock AI responses based on prompt scenarios
    setTimeout(() => {
      let aiResponse = "";
      const lowerInput = msgText.toLowerCase();

      if (lowerInput.includes('study plan') || lowerInput.includes('aggressive')) {
        aiResponse = "I completely understand, Arjun. Balancing school exams with SAT prep is challenging. Let me suggest a more realistic timeline: \n\n**Current plan**: 1.5 hours SAT prep daily\n**Adjusted plan**: 45 minutes daily during school exam weeks, 1.5 hours otherwise\n\nI've created a customized light-week practice schedule. Check your Quiz page - it's now under 'Flexible Schedule' mode. Want me to update your path with this schedule?";
      } else if (lowerInput.includes('carnegie mellon') || lowerInput.includes('compare')) {
        aiResponse = "Carnegie Mellon CS Admits (Class of 2027) have an average SAT of 1520. Your current score of 1380 is below the 25th percentile (1470), but your GPA (3.7) is competitive. If you can push your Verbal from 660 to 710+, you'll be in the competitive range. Want to see strategies that worked for students with similar starting scores?";
      } else if (lowerInput.includes('sop') || lowerInput.includes('mit')) {
        aiResponse = "Your MIT SOP introduction is a good start! To make it stronger, consider adding more vivid detail. \n\n*Option 1*: Focusing on the specific morning routine with your grandmother.\n*Option 2*: Connecting your determination at age 14 to MIT's CSAIL lab and their 'mens et manus' motto.\n\nWhich angle resonates more with your story?";
      } else if (lowerInput.includes('strengthen') || lowerInput.includes('else')) {
        aiResponse = "Based on your current profile, here are my top suggestions: \n\n1. **Build a Showcase Project**: Polishing that healthcare AI app you mentioned in your SOP.\n2. **Enter a Competition**: Participation in Google Code Jam or local olympiads shows engagement.\n3. **Leadership**: Run for club leadership by April.\n\nWhich of these interests you most? I can create a detailed action plan.";
      } else {
        aiResponse = "That's a great question! I'm analyzing your profile to give the best advice. Would you like me to look at specific university requirements for that?";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

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
          <Link to="/chat" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl font-bold">
            <MessageCircle className="w-5 h-5" /> AI Mentor
          </Link>
          <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl font-medium transition-colors">
            <User className="w-5 h-5" /> My Profile
          </Link>
        </nav>
      </aside>

      <div className="flex-1 lg:ml-64 flex">
        {/* Chat List Sidebar */}
        <div className="w-80 bg-white border-r border-gray-100 flex flex-col hidden xl:flex">
          <div className="p-6 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-2xl text-sm border-none focus:ring-2 ring-sky-blue/20 outline-none"
              />
            </div>
            <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-sky-blue text-white rounded-2xl font-black shadow-lg shadow-sky-blue/20 hover:bg-steel-blue transition-all">
              <Plus className="w-4 h-4" /> New Conversation
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
            {CHAT_HISTORY.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">{group.period}</h3>
                {group.chats.map(chat => (
                  <button 
                    key={chat.id}
                    className={`w-full text-left p-3 rounded-2xl hover:bg-gray-50 transition-all group flex items-center justify-between ${chat.id === '1' ? 'bg-sky-blue/5' : ''}`}
                  >
                    <div className="min-w-0">
                      <p className={`text-sm font-bold truncate ${chat.id === '1' ? 'text-sky-blue' : 'text-gray-600'}`}>{chat.title}</p>
                      <p className="text-[10px] font-medium text-gray-400 mt-0.5">{chat.time}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Active Chat Window */}
        <div className="flex-1 flex flex-col bg-white">
          <header className="h-20 px-8 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-blue rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-steel-blue italic flex items-center gap-2">
                  AI Mentor - NorthStar <Sparkles className="w-4 h-4 text-sky-blue" />
                </h2>
                <p className="text-xs font-bold text-gray-400">Your personal university admissions assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400"><Search className="w-5 h-5" /></button>
              <Link to="/profile" className="w-10 h-10 bg-sky-blue rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold hover:scale-105 transition-transform">
                 A
              </Link>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${msg.type === 'ai' ? 'bg-sky-blue text-white' : 'bg-steel-blue text-white'}`}>
                  {msg.type === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div className={`max-w-[70%] space-y-2 ${msg.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`p-5 rounded-[24px] text-sm leading-relaxed font-medium whitespace-pre-wrap ${
                    msg.type === 'ai' 
                    ? 'bg-gray-50 text-gray-700 rounded-tl-none border border-gray-100' 
                    : 'bg-sky-blue text-white rounded-tr-none shadow-lg shadow-sky-blue/20'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{msg.timestamp}</span>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-blue text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-gray-50 p-5 rounded-[24px] rounded-tl-none border border-gray-100">
                  <div className="flex gap-1">
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }} 
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
                    />
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }} 
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
                    />
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }} 
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-8 bg-white border-t border-gray-50">
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-[28px] border border-gray-100 shadow-inner">
              <button className="p-2 text-gray-400 hover:text-sky-blue transition-colors">
                <Plus className="w-6 h-6" />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your mentor anything..." 
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-gray-700 placeholder-gray-400"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={`p-4 rounded-2xl transition-all shadow-lg ${input.trim() ? 'bg-sky-blue text-white shadow-sky-blue/20 hover:scale-105 active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Quick Actions */}
        <aside className="w-80 bg-gray-50 border-l border-gray-100 p-8 hidden 2xl:flex flex-col gap-8">
          <div>
            <h3 className="text-xs font-black text-steel-blue uppercase tracking-widest italic mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {QUICK_ACTIONS.map(action => (
                <button 
                  key={action.id}
                  onClick={() => handleSend(action.label)}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-sky-blue hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 text-sky-blue flex items-center justify-center group-hover:bg-sky-blue group-hover:text-white transition-colors">
                      <action.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-gray-600">{action.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sky-blue transition-all" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto bg-steel-blue p-6 rounded-[32px] text-white relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Lightbulb className="w-40 h-40" />
            </div>
            <div className="relative">
              <h4 className="text-lg font-black italic mb-2">Pro Tip</h4>
              <p className="text-xs font-medium text-white/70 leading-relaxed mb-4">
                "Mentioning MIT's CSAIL lab and their 'mens et manus' motto in your SOP shows you've researched deeply."
              </p>
              <button className="text-[10px] font-black uppercase tracking-widest text-sky-blue flex items-center gap-1 hover:gap-2 transition-all">
                Learn why <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
