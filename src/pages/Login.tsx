/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, Eye, EyeOff, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { DEMO_USER } from '../constants';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check against demo account
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      localStorage.setItem('northstar_session', JSON.stringify({ ...DEMO_USER, loggedIn: true }));
      navigate('/dashboard');
      return;
    }

    // Check against localStorage users
    const users = JSON.parse(localStorage.getItem('northstar_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('northstar_session', JSON.stringify({ ...user, loggedIn: true }));
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-blue to-steel-blue p-12 flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <Compass className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold tracking-tight">NorthStar</span>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <div className="mb-8 flex justify-center">
             <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                <LogIn className="w-24 h-24 text-white" />
             </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">Welcome Back!</h1>
          <p className="text-xl text-white/80 font-medium max-w-md mx-auto text-sky-blue/20">
            Continue your journey to your dream university
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </div>

      {/* Right Side */}
      <div className="flex-1 bg-white p-8 md:p-12 lg:p-20 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <Compass className="w-8 h-8 text-sky-blue" />
            <span className="text-2xl font-bold tracking-tight text-steel-blue">NorthStar</span>
          </div>

          <h2 className="text-3xl font-bold text-steel-blue mb-2">Login</h2>
          <p className="text-gray-500 mb-8">Welcome back! Please enter your details.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 italic">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-blue focus:border-transparent outline-none transition-all"
                placeholder="demo@northstar.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <Link to="#" className="text-sm font-bold text-sky-blue">Forgot Password?</Link>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-blue focus:border-transparent outline-none transition-all"
                placeholder="DemoUser2024!"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[46px] text-gray-400 hover:text-sky-blue"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-sky-blue rounded border-gray-300 focus:ring-sky-blue"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="text-sm text-gray-600 font-medium">
                Remember me
              </label>
            </div>

            <button
              type="submit"
               className="w-full bg-sky-blue text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-sky-blue/30 hover:bg-steel-blue transition-all active:scale-95"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account? <Link to="/signup" className="text-sky-blue font-bold">Sign Up</Link>
          </p>

          <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h4 className="text-sm font-bold text-steel-blue mb-2 uppercase tracking-widest">Demo Credentials</h4>
            <div className="space-y-1 text-sm font-medium">
              <p className="text-gray-600">Email: <span className="text-sky-blue">demo@northstar.edu</span></p>
              <p className="text-gray-600">Password: <span className="text-sky-blue">DemoUser2024!</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
