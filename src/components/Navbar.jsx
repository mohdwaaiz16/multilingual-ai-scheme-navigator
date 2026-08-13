import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Compass, Menu, X, Bot, Search, Layers, Home } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/schemes', label: 'Find Schemes', icon: Search },
    { to: '/schemes?tab=categories', label: 'Categories', icon: Layers },
    { to: '/assistant', label: 'AI Assistant', icon: Bot, isNew: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Top Civic Notice Bar */}
      <div className="bg-civic-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium text-slate-100">National Welfare Guidance Portal</span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">Phase 1 Prototype &bull; 20 Verified Schemes</span>
          </div>
          <div className="text-[11px] text-slate-300 hidden sm:block">
            Official Information Guide
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-civic-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-civic-900 flex items-center justify-center text-white shadow-md group-hover:bg-civic-800 transition-colors">
              <Compass className="w-6 h-6 text-warmamber-400" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-lg tracking-tight flex items-center gap-1.5">
                Scheme<span className="text-govblue-600">Navigator</span>
              </div>
              <p className="text-xs text-slate-500 font-normal">
                Citizen Welfare & Scheme Guide
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2 ${
                      isActive
                        ? 'text-civic-900 bg-civic-50 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{link.label}</span>
                  {link.isNew && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-govblue-100 text-govblue-700 rounded-full">
                      AI
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
            <Link
              to="/schemes"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-civic-900 hover:bg-civic-800 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-civic-500 focus:ring-offset-2"
            >
              Find a Scheme
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-civic-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium ${
                      isActive
                        ? 'text-civic-900 bg-civic-50 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-slate-500" />
                    <span>{link.label}</span>
                  </div>
                  {link.isNew && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-govblue-100 text-govblue-700 rounded-full">
                      AI Prototype
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
          
          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/schemes"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center px-4 py-2.5 text-base font-medium text-white bg-civic-900 hover:bg-civic-800 rounded-lg shadow-sm transition-all"
            >
              Find a Scheme
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
