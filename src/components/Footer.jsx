import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, AlertCircle, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Notice */}
        <div className="mb-10 bg-slate-800/80 border border-slate-700 rounded-2xl p-5 md:p-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-warmamber-500/10 text-warmamber-400 rounded-xl flex-shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">
                Important Citizen Information & Disclaimer
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                SchemeSathi is an information and navigation platform. It is not a government authority. Eligibility, benefits, documents and application procedures may change. Always verify the latest information through the official government source.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-civic-800 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 text-warmamber-400" />
              </div>
              <span className="font-extrabold text-white text-xl tracking-tight">
                Scheme<span className="text-govblue-400">Sathi</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Helping citizens discover and understand government schemes. Simple, personal, intelligent, and trustworthy.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-200">10 Categories &bull; 70 Verified Schemes</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Explore SchemeSathi
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="text-slate-400 hover:text-white transition-colors">
                  All 70 Schemes
                </Link>
              </li>
              <li>
                <Link to="/find" className="text-slate-400 hover:text-white transition-colors">
                  Find My Schemes
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="text-slate-400 hover:text-white transition-colors">
                  SchemeSathi AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Official Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} className="hover:text-white transition-colors truncate block">
                    {cat.emoji} {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/schemes" className="text-govblue-400 hover:underline">
                  + View all 10 categories
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            &copy; {new Date().getFullYear()} SchemeSathi. Navigation & Information Companion.
          </div>
          <div>
            10 Categories &bull; 70 Schemes &bull; Verified National Registry
          </div>
        </div>

      </div>
    </footer>
  );
}
