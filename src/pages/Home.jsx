import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Bot, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  GraduationCap,
  HeartPulse,
  Home as HomeIcon,
  Briefcase,
  Coins,
  Wrench,
  Rocket,
  Baby
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import SchemeCard from '../components/SchemeCard';
import { SCHEMES } from '../data/schemes';

export default function Home() {
  const navigate = useNavigate();

  // 8 Quick Categories specified in Master Prompt
  const quickCategories = [
    { name: "Education", emoji: "🎓", label: "Education & Scholarships", query: "Student Scholarship" },
    { name: "Healthcare", emoji: "🏥", label: "Healthcare & Wellness", query: "Healthcare" },
    { name: "Housing", emoji: "🏠", label: "Housing & Shelter", query: "Urban Housing" },
    { name: "Employment", emoji: "💼", label: "Employment & Jobs", query: "Employment Generation" },
    { name: "Financial Assistance", emoji: "💰", label: "Financial Assistance & Loans", query: "Business Credit" },
    { name: "Skill Development", emoji: "🛠", label: "Skill Training & Certifications", query: "Skill Training" },
    { name: "Entrepreneurship", emoji: "🚀", label: "Startups & Entrepreneurship", query: "Entrepreneurship" },
    { name: "Women & Child Welfare", emoji: "👩", label: "Women & Child Welfare", query: "Maternity Welfare" },
  ];

  // 4 Featured Schemes from verified 20 dataset
  const featuredSchemes = SCHEMES.filter(s => 
    ['pm-jay', 'pmay-u', 'pm-surya-ghar', 'pmmy'].includes(s.id)
  );

  const howItWorksSteps = [
    {
      num: "01",
      title: "Tell us about yourself",
      desc: "Provide basic details such as your age, state, role, and approximate income range."
    },
    {
      num: "02",
      title: "Find relevant schemes",
      desc: "SchemeSathi identifies schemes that may match your circumstances and explains why."
    },
    {
      num: "03",
      title: "Understand the scheme",
      desc: "See clear benefits, eligibility criteria, and required documents in plain language."
    },
    {
      num: "04",
      title: "Apply through official source",
      desc: "Follow the application steps and verify final information through the official government website."
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 2. Quick Categories */}
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
                Browse government welfare initiatives grouped by your specific needs.
              </p>
            </div>

            <Link
              to="/find"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-civic-800 hover:text-civic-950 transition-colors"
            >
              <span>Match my eligibility</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {quickCategories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => navigate(`/schemes?category=${encodeURIComponent(cat.query)}`)}
                className="group p-5 bg-white border border-slate-200 rounded-2xl shadow-subtle hover:shadow-civic-hover hover:border-civic-300 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-3">{cat.emoji}</div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-civic-900 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {cat.label}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-civic-700 group-hover:text-civic-900">
                  <span>Explore Schemes</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Featured Schemes */}
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
                High-impact welfare schemes providing health coverage, housing, solar energy, and business credit.
              </p>
            </div>

            <Link
              to="/find"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-civic-800 hover:text-civic-950 transition-colors"
            >
              <span>Find my matching schemes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </section>

        {/* 4. How It Works (4 Steps) */}
        <section aria-labelledby="how-it-works-heading" className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-warmamber-400 uppercase tracking-wider">
              Step-By-Step Process
            </span>
            <h2 id="how-it-works-heading" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              How SchemeSathi Works
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Four simple steps to find, understand, and apply for government welfare schemes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {howItWorksSteps.map((step) => (
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

        {/* 5. Trust Message */}
        <section aria-labelledby="trust-heading">
          <div className="bg-gradient-to-r from-govblue-50 to-civic-50 border border-govblue-200 rounded-3xl p-8 sm:p-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-govblue-600 text-white flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 id="trust-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
              A Trusted Citizen Scheme Companion
            </h2>
            <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
              SchemeSathi helps you navigate government schemes. Final eligibility and application requirements should always be verified through the official government source.
            </p>
            <div className="pt-2">
              <Link
                to="/find"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-civic-900 hover:bg-civic-800 text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                <span>Find My Schemes Now</span>
                <ArrowRight className="w-4 h-4 text-warmamber-400" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
