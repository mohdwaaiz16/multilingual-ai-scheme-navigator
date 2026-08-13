import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails';
import AiResults from './pages/AiResults';
import SchemeDetails from './pages/SchemeDetails';
import Assistant from './pages/Assistant';
import SchemeFinder from './pages/SchemeFinder';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-civic-100 selection:text-civic-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* 5 Screen Experience */}
            <Route path="/" element={<Home />} />
            <Route path="/find" element={<UserDetails />} />
            <Route path="/results" element={<AiResults />} />
            <Route path="/schemes/:id" element={<SchemeDetails />} />
            <Route path="/assistant" element={<Assistant />} />
            
            {/* Scheme Directory & Fallback */}
            <Route path="/schemes" element={<SchemeFinder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
