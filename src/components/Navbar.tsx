/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Compass, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('northstar_session');
    setIsLoggedIn(!!session);
  }, [location]);

  const isLanding = location.pathname === '/';
  const isAuthedPath = ['/dashboard', '/quiz'].includes(location.pathname);

  if (isAuthedPath) return null; // Let the page-specific sidebar/header handle it

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <Compass className="w-8 h-8 text-sky-blue" />
            <span className="text-2xl font-bold tracking-tight text-steel-blue">NorthStar</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {isLanding && (
              <>
                <a href="#features" className="text-gray-600 hover:text-sky-blue transition-colors font-medium">Features</a>
                <a href="#journey" className="text-gray-600 hover:text-sky-blue transition-colors font-medium">Journey</a>
                <a href="#pricing" className="text-gray-600 hover:text-sky-blue transition-colors font-medium">Pricing</a>
                <a href="#reviews" className="text-gray-600 hover:text-sky-blue transition-colors font-medium">Reviews</a>
              </>
            )}
            
            {isLoggedIn ? (
              <Link 
                to="/dashboard" 
                className="bg-sky-blue text-white px-6 py-2 rounded-full font-semibold hover:bg-steel-blue transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-600 hover:text-sky-blue font-medium">Login</Link>
                <Link 
                  to="/signup" 
                  className="bg-sky-blue text-white px-6 py-2 rounded-full font-semibold hover:bg-steel-blue transition-colors"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 py-4 px-4 flex flex-col gap-4"
        >
          {isLanding && (
            <>
              <a href="#features" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium">Features</a>
              <a href="#journey" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium">Journey</a>
              <a href="#pricing" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium">Pricing</a>
              <a href="#reviews" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium">Reviews</a>
            </>
          )}
          
          {isLoggedIn ? (
            <Link 
              to="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="bg-sky-blue text-white w-full py-3 rounded-xl font-semibold text-center"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium">Login</Link>
              <Link 
                to="/signup" 
                onClick={() => setIsOpen(false)}
                className="bg-sky-blue text-white w-full py-3 rounded-xl font-semibold text-center"
              >
                Join Us
              </Link>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
}
