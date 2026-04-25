/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    grade: '11th',
    dreamCourse: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (formData.password.length < 8) newErrors.password = 'Min 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.age || Number(formData.age) < 15 || Number(formData.age) > 18) newErrors.age = 'Age must be 15-18';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const users = JSON.parse(localStorage.getItem('northstar_users') || '[]');
      users.push(formData);
      localStorage.setItem('northstar_users', JSON.stringify(users));
      localStorage.setItem('northstar_session', JSON.stringify({ email: formData.email, name: formData.fullName }));
      navigate('/dashboard');
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
                <CheckCircle2 className="w-24 h-24 text-white" />
             </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">Begin Your Journey to Success</h1>
          <p className="text-xl text-sky-blue/20 text-white/80 font-medium max-w-md mx-auto">
            Join thousands of students who found their path to dream universities
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

          <h2 className="text-3xl font-bold text-steel-blue mb-2">Create Account</h2>
          <p className="text-gray-500 mb-8">Start your personalized university roadmap today.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-sky-blue focus:border-transparent outline-none transition-all`}
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              {errors.fullName && <span className="text-xs text-red-500 mt-1 font-medium">{errors.fullName}</span>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-sky-blue focus:border-transparent outline-none transition-all`}
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && <span className="text-xs text-red-500 mt-1 font-medium">{errors.email}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-sky-blue focus:border-transparent outline-none transition-all`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[34px] text-gray-400 hover:text-sky-blue"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && <span className="text-xs text-red-500 mt-1 font-medium">{errors.password}</span>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-sky-blue focus:border-transparent outline-none transition-all`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                {errors.confirmPassword && <span className="text-xs text-red-500 mt-1 font-medium">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  min="15"
                  max="18"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-sky-blue focus:border-transparent outline-none transition-all`}
                  placeholder="17"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
                {errors.age && <span className="text-xs text-red-500 mt-1 font-medium">{errors.age}</span>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Current Grade</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-blue focus:border-transparent outline-none transition-all appearance-none bg-white"
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                >
                  <option>9th</option>
                  <option>10th</option>
                  <option>11th</option>
                  <option>12th</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Dream Course</label>
              <input
                type="text"
                list="courses"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-blue focus:border-transparent outline-none transition-all"
                placeholder="e.g. Computer Science"
                value={formData.dreamCourse}
                onChange={(e) => setFormData({...formData, dreamCourse: e.target.value})}
              />
              <datalist id="courses">
                <option value="Computer Science" />
                <option value="Engineering" />
                <option value="Medicine" />
                <option value="Business" />
                <option value="Psychology" />
                <option value="Arts" />
              </datalist>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-sky-blue rounded border-gray-300 focus:ring-sky-blue"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to <Link to="#" className="text-sky-blue font-bold">Terms of Service</Link> and <Link to="#" className="text-sky-blue font-bold">Privacy Policy</Link>
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-xs text-red-500 font-medium">{errors.agreeToTerms}</p>}

            <button
              type="submit"
               className="w-full bg-sky-blue text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-sky-blue/30 hover:bg-steel-blue transition-all active:scale-95"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account? <Link to="/login" className="text-sky-blue font-bold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
