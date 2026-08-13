import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bot, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/schemes?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/find');
    }
  };

  const quickPills = [
    { label: "Scholarships", query: "Scholarship" },
    { label: "Healthcare", query: "Healthcare" },
    { label: "Housing", query: "Housing" },
    { label: "MUDRA Loan", query: "MUDRA" },
    { label: "Rooftop Solar", query: "Solar" },
    { label: "Skill Training", query: "Skill" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-civic-950 to-slate-900 text-white py-16 sm:py-24">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-govblue-500 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-warmamber-500 blur-[140px]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Trust pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-slate-200 backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>SchemeSathi &bull; Citizen Scheme Companion &bull; 20 Verified Schemes</span>
        </div>

        {/* Screen 1 Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Find Government Schemes <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-warmamber-300 via-white to-govblue-300">
            You May Be Eligible For
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Tell us a little about yourself and discover government schemes that may match your needs, benefits and circumstances.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl">
            <div className="w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for scholarships, housing, healthcare, jobs, business..."
                className="w-full bg-white text-slate-900 placeholder:text-slate-500 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-warmamber-400 text-sm font-medium"
                aria-label="Search government schemes"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-warmamber-500 hover:bg-warmamber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

          {/* Quick Query Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-slate-400">
            <span>Popular:</span>
            {quickPills.map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => navigate(`/schemes?q=${encodeURIComponent(pill.query)}`)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10 transition-colors"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </form>

        {/* Primary and Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/find')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-civic-950 hover:bg-slate-100 font-extrabold text-base shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span>Find My Schemes</span>
            <ArrowRight className="w-5 h-5 text-govblue-600" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/assistant')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-100 border border-slate-700 font-bold text-base transition-all focus:outline-none focus:ring-2 focus:ring-civic-500"
          >
            <Bot className="w-5 h-5 text-warmamber-400" />
            <span>Ask SchemeSathi AI</span>
          </button>
        </div>

        {/* Reassurance text */}
        <p className="text-xs text-slate-400 pt-4 max-w-xl mx-auto">
          SchemeSathi is a navigator, not a government authority. Final eligibility is verified on the official government website.
        </p>

      </div>
    </section>
  );
}
