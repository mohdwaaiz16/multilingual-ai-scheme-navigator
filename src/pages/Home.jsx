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
  Layers
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import SchemeCard from '../components/SchemeCard';
import { CATEGORIES } from '../data/categories';
import { SCHEMES } from '../data/schemes';

export default function Home() {
  const navigate = useNavigate();

  // 4 Featured Schemes from key domains
  const featuredSchemes = SCHEMES.filter(s => 
    ['pm-vidyalaxmi', 'pmmy', 'pm-jay', 'kisan-credit-card'].includes(s.id)
  );

  const howItWorksSteps = [
    {
      num: "01",
      title: "Tell us about yourself",
      desc: "Provide basic information such as your age, state, role, and approximate income range."
    },
    {
      num: "02",
      title: "Find relevant schemes",
      desc: "SchemeSathi identifies potentially relevant schemes and explains why they may match."
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
        
        {/* 2. Complete 10 Category Directory */}
        <section aria-labelledby="categories-heading" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">
                Official Directory
              </span>
              <h2 id="categories-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Explore Government Schemes by Category
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                All 10 official categories &bull; Exactly 7 verified schemes per category (70 total).
              </p>
            </div>

            <Link
              to="/schemes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-civic-800 hover:text-civic-950 transition-colors"
            >
              <span>View all 70 schemes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.slug}
                className="group bg-white border border-slate-200 rounded-3xl p-5 shadow-subtle hover:shadow-civic-hover hover:border-civic-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-3">{cat.emoji}</div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-civic-900 transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-mono">
                    7 schemes
                  </span>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-civic-700 group-hover:text-civic-950 transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Featured High-Impact Schemes */}
        <section aria-labelledby="featured-heading" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">
                Flagship Initiatives
              </span>
              <h2 id="featured-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Featured Government Schemes
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Major welfare initiatives offering education credit, business financing, healthcare coverage, and crop support.
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
              Step-By-Step Guidance
            </span>
            <h2 id="how-it-works-heading" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              How SchemeSathi Works
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Four clear steps to find, understand, and apply for government welfare schemes.
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

        {/* 5. Citizen Trust Section */}
        <section aria-labelledby="trust-heading">
          <div className="bg-gradient-to-r from-govblue-50 to-civic-50 border border-govblue-200 rounded-3xl p-8 sm:p-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-govblue-600 text-white flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 id="trust-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
              A Trusted Citizen Scheme Companion
            </h2>
            <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
              SchemeSathi is an information and navigation platform. It is not a government authority. Eligibility, benefits, documents and application procedures may change. Always verify the latest information through the official government source.
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
