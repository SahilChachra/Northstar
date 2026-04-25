/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Compass, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-steel-blue text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Compass className="w-8 h-8 text-sky-blue" />
              <span className="text-2xl font-bold tracking-tight">NorthStar</span>
            </div>
            <p className="text-sky-blue/80 font-medium">
              Find your path to the world's most prestigious universities with AI-powered guidance.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-sky-blue/80 hover:text-white transition-colors">Features</a></li>
              <li><a href="#journey" className="text-sky-blue/80 hover:text-white transition-colors">Journey</a></li>
              <li><a href="#pricing" className="text-sky-blue/80 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#reviews" className="text-sky-blue/80 hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sky-blue/80 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-sky-blue/80 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-sky-blue/80 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sky-blue/80 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sky-blue/60 text-sm font-medium">
            © 2024 NorthStar. All rights reserved.
          </p>
          <div className="flex gap-8 text-sky-blue/60 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">English (US)</a>
            <a href="#" className="hover:text-white transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
