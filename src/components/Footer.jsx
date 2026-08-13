import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ExternalLink, ShieldCheck, AlertCircle, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Trust & Disclaimer Card */}
        <div className="mb-12 bg-slate-800/80 border border-slate-700 rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-warmamber-500/10 text-warmamber-400 rounded-xl flex-shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1.5 flex items-center gap-2">
                Important Citizen Disclaimer
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                This platform is an independent <strong className="text-white font-medium">scheme navigator and informational guide</strong> designed to assist citizens in discovering and understanding welfare schemes. It is <strong className="text-white font-medium">not a government authority</strong>. Scheme criteria, guidelines, and funding amounts are subject to official government notifications. Always verify final eligibility and submit applications through the official government portal linked on each scheme page.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-civic-800 flex items-center justify-center text-white">
                <Compass className="w-6 h-6 text-warmamber-400" />
              </div>
              <span className="font-bold text-white text-xl tracking-tight">
                Scheme<span className="text-govblue-400">Navigator</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Empowering Indian citizens with clear, accessible, and structured guidance on central and centrally sponsored government schemes, benefits, documents, and application steps.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Phase 1 Initial Release &bull; 20 Verified Schemes</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="text-slate-400 hover:text-white transition-colors">
                  Find & Browse Schemes
                </Link>
              </li>
              <li>
                <Link to="/schemes?type=Centrally+Sponsored" className="text-slate-400 hover:text-white transition-colors">
                  Centrally Sponsored Schemes
                </Link>
              </li>
              <li>
                <Link to="/schemes?type=Central" className="text-slate-400 hover:text-white transition-colors">
                  Central Sector Schemes
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>AI Assistant Prototype</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-govblue-500/20 text-govblue-300 rounded font-medium">New</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Welfare Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Key Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/schemes?category=Healthcare" className="hover:text-white transition-colors">
                  Healthcare & Medical
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=Urban+Housing" className="hover:text-white transition-colors">
                  Housing & Shelter
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=Business+Credit" className="hover:text-white transition-colors">
                  Business Credit & Loans
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=Student+Scholarship" className="hover:text-white transition-colors">
                  Education & Scholarships
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=Solar+Energy" className="hover:text-white transition-colors">
                  Solar & Clean Energy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & accessibility */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} SchemeNavigator. Citizen Welfare Navigation Portal.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with care for citizen accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
