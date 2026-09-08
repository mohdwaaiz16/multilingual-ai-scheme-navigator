import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bot, ArrowRight, ShieldCheck, Sparkles, Layers } from 'lucide-react';

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
    { label: "MUDRA Loans", query: "MUDRA" },
    { label: "PM-JAY Health", query: "Jan Arogya" },
    { label: "Farmer KCC", query: "Kisan" },
    { label: "Unified Pension", query: "Pension" },
    { label: "PM Internships", query: "Internship" }
  ];

  return (
    <section className="relative overflow-hidden bg-cream-100 text-charcoal-900 py-16 sm:py-24">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full bg-peach-300 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-lemon-300 blur-[140px]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach-100 border border-peach-200 text-xs font-medium text-charcoal-800 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>SchemeSathi &bull; 10 Categories &bull; 70 Verified Schemes</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-tight">
          Find Government Schemes <br className="hidden sm:inline" />
          <span className="inline-block mt-2 px-4 py-1 bg-lemon-200 rounded-2xl text-black">
            You May Be Eligible For
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
          Tell us about yourself and discover government schemes that may be relevant to your needs.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-white p-2 rounded-2xl border border-charcoal-100 shadow-soft">
            <div className="w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 70 government schemes (e.g. scholarships, loans, pension)..."
                className="w-full bg-white text-black placeholder:text-charcoal-400 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-lemon-500 text-sm font-medium"
                aria-label="Search 70 government schemes"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-lemon-400 hover:bg-lemon-500 text-black font-bold text-sm rounded-xl transition-all shadow-sm flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

          {/* Quick Query Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-charcoal-500">
            <span>Trending Searches:</span>
            {quickPills.map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => navigate(`/schemes?q=${encodeURIComponent(pill.query)}`)}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-cream-200 text-charcoal-700 border border-charcoal-100 transition-colors shadow-sm"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </form>

        {/* Primary and Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
          <button
            type="button"
            onClick={() => navigate('/find')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-lemon-400 text-black hover:bg-lemon-500 font-extrabold text-base shadow-soft transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-lemon-600"
          >
            <span>Find My Schemes</span>
            <ArrowRight className="w-5 h-5 text-black" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/schemes')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-peach-100 hover:bg-peach-200 text-black border border-peach-200 font-bold text-base transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-peach-400"
          >
            <Layers className="w-5 h-5 text-charcoal-800" />
            <span>Explore All 70 Schemes</span>
          </button>
        </div>

        {/* Reassurance text */}
        <p className="text-xs text-charcoal-500 pt-3 max-w-xl mx-auto relative z-10">
          SchemeSathi is an information & navigation platform. Final eligibility is verified on the official government website.
        </p>

      </div>
    </section>
  );
}
