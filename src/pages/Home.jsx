import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Bot, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  FileText, 
  Globe2, 
  ExternalLink,
  Users,
  Building,
  GraduationCap,
  HeartPulse,
  Coins,
  Home as HomeIcon,
  SunMedium,
  Briefcase
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import SchemeCard from '../components/SchemeCard';
import { SCHEMES } from '../data/schemes';
import { CATEGORIES, STATES_AND_UTS } from '../data/categories';

export default function Home() {
  const navigate = useNavigate();

  // Quick Scheme Finder state
  const [quickCategory, setQuickCategory] = useState('all');
  const [quickState, setQuickState] = useState('All India (Central)');
  const [quickAudience, setQuickAudience] = useState('all');
  const [quickIncome, setQuickIncome] = useState('all');

  const handleQuickFinderSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (quickCategory !== 'all') params.append('category', quickCategory);
    if (quickAudience !== 'all') params.append('audience', quickAudience);
    navigate(`/schemes?${params.toString()}`);
  };

  // 4 Featured Schemes from verified dataset
  const featuredSchemes = SCHEMES.filter(s => 
    ['pm-jay', 'pmay-u', 'pm-surya-ghar', 'pmmy'].includes(s.id)
  );

  // Key categories to showcase
  const popularCategories = CATEGORIES.slice(0, 8);

  const howItWorksSteps = [
    {
      num: "01",
      title: "Tell Us What You Need",
      desc: "Search by your need, whether it is education loans, housing subsidies, business credit, or healthcare."
    },
    {
      num: "02",
      title: "Discover Matching Schemes",
      desc: "Our navigator filters 20 central welfare schemes based on your circumstances and background."
    },
    {
      num: "03",
      title: "Understand Eligibility & Benefits",
      desc: "Read plain-language criteria, age limits, income requirements, and exact funding benefits."
    },
    {
      num: "04",
      title: "Prepare Required Documents",
      desc: "Use our interactive document checklist to prepare your Aadhaar, income certificates, and KYC."
    },
    {
      num: "05",
      title: "Apply on Official Portal",
      desc: "Follow the application steps and proceed directly to the verified official government portal."
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 2. Quick Scheme Finder Form */}
        <section aria-labelledby="quick-finder-heading">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-civic relative -mt-12 sm:-mt-20 z-10">
            <div className="max-w-3xl mb-6">
              <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">
                Instant Discovery
              </span>
              <h2 id="quick-finder-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Quick Scheme Finder
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Select your basic background to instantly see schemes matched to your eligibility.
              </p>
            </div>

            <form onSubmit={handleQuickFinderSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category / Need */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  What do you need?
                </label>
                <select
                  value={quickCategory}
                  onChange={(e) => setQuickCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-civic-500 focus:bg-white transition-all font-medium"
                >
                  <option value="all">All Needs / Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Beneficiary Profile */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Who is applying?
                </label>
                <select
                  value={quickAudience}
                  onChange={(e) => setQuickAudience(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-civic-500 focus:bg-white transition-all font-medium"
                >
                  <option value="all">Any Citizen</option>
                  <option value="students">Student / Scholar</option>
                  <option value="women">Woman / Mother</option>
                  <option value="business">Entrepreneur / Small Business</option>
                  <option value="youth">Youth / Job Seeker</option>
                  <option value="rural">Rural Household</option>
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your State / UT
                </label>
                <select
                  value={quickState}
                  onChange={(e) => setQuickState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-civic-500 focus:bg-white transition-all font-medium"
                >
                  {STATES_AND_UTS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-civic-900 hover:bg-civic-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-civic-500 focus:ring-offset-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Relevant Schemes</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* 3. Popular Categories */}
        <section aria-labelledby="categories-heading" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">
                Explore by Sector
              </span>
              <h2 id="categories-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Popular Welfare Categories
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Browse government assistance grouped by citizen needs and sectors.
              </p>
            </div>

            <Link
              to="/schemes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-civic-800 hover:text-civic-950 transition-colors"
            >
              <span>View all 20 categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>

        {/* 4. Featured Schemes */}
        <section aria-labelledby="featured-heading" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">
                Key Initiatives
              </span>
              <h2 id="featured-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Featured Government Schemes
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                High-impact central schemes providing health coverage, housing, solar energy, and business credit.
              </p>
            </div>

            <Link
              to="/schemes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-civic-800 hover:text-civic-950 transition-colors"
            >
              <span>Browse all 20 schemes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </section>

        {/* 5. How It Works */}
        <section aria-labelledby="how-it-works-heading" className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-warmamber-400 uppercase tracking-wider">
              Step-By-Step Process
            </span>
            <h2 id="how-it-works-heading" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              How SchemeNavigator Helps You
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              From finding the right welfare scheme to submitting your application on the verified official portal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {howItWorksSteps.map((step, idx) => (
              <div key={step.num} className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 space-y-3 relative group hover:border-slate-500 transition-colors">
                <div className="text-2xl font-black text-warmamber-400 font-mono">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. AI Assistant Teaser / Callout */}
        <section aria-labelledby="ai-assistant-heading">
          <div className="bg-gradient-to-r from-civic-900 via-govblue-900 to-civic-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-govblue-500/20 text-govblue-300 text-xs font-semibold border border-govblue-500/30">
                <Sparkles className="w-3.5 h-3.5 text-warmamber-400" />
                <span>Multilingual AI Prototype</span>
              </div>
              <h2 id="ai-assistant-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Not sure which scheme you need?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Ask in your own words and get simple guidance. Our conversational assistant helps match your situation to eligible welfare programs.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-300">
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">"Scholarships for college"</span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">"Need business startup loan"</span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">"Free solar electricity"</span>
              </div>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              <Link
                to="/assistant"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-warmamber-500 hover:bg-warmamber-400 text-slate-950 font-bold text-base rounded-2xl shadow-lg transition-all"
              >
                <Bot className="w-5 h-5" />
                <span>Ask the AI Assistant</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
