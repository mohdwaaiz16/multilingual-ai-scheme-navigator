import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sparkles, Menu, X, Bot, Search, Layers, Home, ArrowRight } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { to: '/', label: t('navbar.home'), icon: Home },
    { to: '/schemes', label: t('navbar.schemes'), icon: Layers },
    { to: '/find', label: t('navbar.findSchemes'), icon: Search },
    { to: '/assistant', label: t('navbar.aiAssistant'), icon: Bot, isNew: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream-50/60 backdrop-blur-lg backdrop-saturate-150 border-b border-white/50 shadow-sm supports-[backdrop-filter]:bg-cream-50/50">
      {/* Top Civic Notice Bar */}
      <div className="bg-charcoal-900 text-cream-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-lemon-400"></span>
            <span className="font-medium text-cream-50">SchemeSathi — {t('navbar.companion', 'Citizen Welfare Companion')}</span>
            <span className="hidden md:inline text-charcoal-500">|</span>
            <span className="hidden md:inline text-charcoal-300">10 {t('navbar.categories', 'Categories')} &bull; 70 {t('navbar.verifiedSchemes', 'Verified Schemes')}</span>
          </div>
          <div className="text-[11px] text-charcoal-300 hidden sm:block">
            {t('navbar.nationalRegistry', 'Verified National Registry')}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand: SchemeSathi */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-lemon-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-lemon-400 flex items-center justify-center text-charcoal-900 shadow-sm group-hover:bg-lemon-500 transition-colors">
              <Sparkles className="w-5 h-5 text-charcoal-900" />
            </div>
            <div>
              <div className="font-extrabold text-black text-xl tracking-tight flex items-center gap-0.5">
                Scheme<span className="text-charcoal-800">Sathi</span>
              </div>
              <p className="text-[11px] text-charcoal-500 font-medium">
                {t('navbar.navigator', 'Government Scheme Navigator')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors inline-flex items-center gap-2 ${
                      isActive
                        ? 'text-black bg-lemon-200 font-bold'
                        : 'text-charcoal-600 hover:text-black hover:bg-cream-200'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-charcoal-500" />
                  <span>{link.label}</span>
                  {link.isNew && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-lemon-300 text-black rounded-full">
                      {t('navbar.aiBadge', 'AI')}
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
              to="/find"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm font-bold text-black bg-lemon-400 hover:bg-lemon-500 active:bg-lemon-600 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-lemon-500 focus:ring-offset-2"
            >
              <span>{t('navbar.findSchemes')}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal-700 hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-lemon-500"
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
        <div className="md:hidden border-t border-charcoal-100 bg-cream-50 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium ${
                      isActive
                        ? 'text-black bg-lemon-200 font-bold'
                        : 'text-charcoal-700 hover:bg-cream-200'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-charcoal-500" />
                    <span>{link.label}</span>
                  </div>
                  {link.isNew && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-lemon-300 text-black rounded-full">
                      {t('navbar.aiCompanion', 'AI Companion')}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
          
          <div className="pt-2 border-t border-charcoal-100">
            <Link
              to="/find"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-bold text-black bg-lemon-400 hover:bg-lemon-500 rounded-xl shadow-sm transition-all"
            >
              <span>{t('navbar.findSchemes')}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
