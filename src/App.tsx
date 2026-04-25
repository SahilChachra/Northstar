/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Mindmap from './components/Mindmap';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import PsychometricTest from './pages/PsychometricTest';
import AptitudeTest from './pages/AptitudeTest';
import MatchUniversity from './pages/MatchUniversity';
import GeneratePath from './pages/GeneratePath';
import EnhanceProfile from './pages/EnhanceProfile';
import Chat from './pages/Chat';
import Profile from './pages/Profile';

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Mindmap />
        <Pricing />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-sky-blue/30 selection:text-steel-blue">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/test/psychometric" element={<PsychometricTest />} />
          <Route path="/test/aptitude" element={<AptitudeTest />} />
          <Route path="/match" element={<MatchUniversity />} />
          <Route path="/path" element={<GeneratePath />} />
          <Route path="/enhance" element={<EnhanceProfile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
