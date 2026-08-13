import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  Edit3, 
  CheckCircle2, 
  HelpCircle, 
  UserCheck, 
  ShieldCheck,
  RotateCcw,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { calculateSchemeMatches } from '../utils/filterUtils';
import EligibilityBadge from '../components/EligibilityBadge';

export default function AiResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve user profile from state or localStorage fallback
  const [profile, setProfile] = useState(() => {
    if (location.state?.profile) return location.state.profile;
    try {
      const stored = localStorage.getItem('schemesathi_user_profile');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      age: "21",
      state: "All India (Central)",
      occupation: "Student",
      income: "₹1–3 lakh",
      role: "student"
    };
  });

  const [filterMatchLevel, setFilterMatchLevel] = useState('all');

  // Compute scored scheme matches
  const matchedSchemes = calculateSchemeMatches(profile);

  // Filter if user filters by High Match / Possible Match
  const displayedSchemes = matchedSchemes.filter(s => {
    if (filterMatchLevel === 'high') return s.matchLevel === 'high';
    if (filterMatchLevel === 'possible') return s.matchLevel === 'possible' || s.matchLevel === 'high';
    return true;
  });

  const highMatchCount = matchedSchemes.filter(s => s.matchLevel === 'high').length;
  const possibleMatchCount = matchedSchemes.filter(s => s.matchLevel === 'possible').length;

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Summary Banner */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-govblue-100 text-govblue-700 flex items-center justify-center flex-shrink-0 font-bold">
              <Sparkles className="w-5 h-5 text-govblue-600" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Your Profile Match Criteria
              </span>
              <div className="text-sm sm:text-base font-bold text-slate-900 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>{profile.age} years</span>
                <span className="text-slate-300">&bull;</span>
                <span className="capitalize">{profile.role || profile.occupation}</span>
                <span className="text-slate-300">&bull;</span>
                <span>{profile.state}</span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-govblue-700">{profile.income}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/find')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-civic-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Details</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Potential Eligibility Matches</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Schemes You May Be Eligible For
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
              Based on the information you provided, these schemes appear to be relevant to your situation.
            </p>
          </div>

          {/* Match Filter Tabs */}
          <div className="flex items-center bg-slate-200/70 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
            <button
              type="button"
              onClick={() => setFilterMatchLevel('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMatchLevel === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Matches ({matchedSchemes.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMatchLevel('high')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMatchLevel === 'high' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🟢 High Match ({highMatchCount})
            </button>
          </div>
        </div>

        {/* Schemes Results Grid */}
        {displayedSchemes.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-subtle">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <HelpCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              We couldn't find a strong match based on the information provided.
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Try modifying your profile details or explore all 20 verified welfare schemes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFilterMatchLevel('all')}
                className="px-5 py-2.5 bg-civic-900 text-white text-sm font-semibold rounded-xl"
              >
                Explore All Schemes
              </button>
              <Link
                to="/assistant"
                className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200"
              >
                Ask SchemeSathi AI
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedSchemes.map((scheme) => {
              const isHigh = scheme.matchLevel === 'high';
              const isPossible = scheme.matchLevel === 'possible';

              return (
                <article
                  key={scheme.id}
                  className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-subtle hover:shadow-civic-hover hover:border-civic-300 transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    
                    {/* Header Badges: Category + Match Level Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <EligibilityBadge type={scheme.category} variant="category" />
                      
                      {/* Match Level Indicator */}
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        isHigh 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : isPossible
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          isHigh ? 'bg-emerald-500' : isPossible ? 'bg-amber-500' : 'bg-slate-400'
                        }`}></span>
                        <span>{scheme.matchLabel}</span>
                      </span>
                    </div>

                    {/* Scheme Name */}
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      <Link 
                        to={`/schemes/${scheme.id}`}
                        state={{ fromResults: true, matchLabel: scheme.matchLabel }}
                        className="hover:text-civic-900 focus:outline-none focus-visible:underline"
                      >
                        {scheme.schemeName}
                      </Link>
                    </h2>

                    {/* Primary Benefit */}
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-govblue-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-govblue-600" />
                        <span>Key Benefit</span>
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        {scheme.keyBenefits}
                      </p>
                    </div>

                    {/* Why It May Match (Crucial Section) */}
                    <div className="p-3.5 bg-emerald-50/40 rounded-2xl border border-emerald-200/60 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Why this may match your situation</span>
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {scheme.whyItMatches}
                      </p>
                    </div>

                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      to={`/assistant?q=${encodeURIComponent(`Tell me about ${scheme.schemeName} and its eligibility`)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-civic-900 transition-colors"
                    >
                      <Bot className="w-3.5 h-3.5 text-warmamber-500" />
                      <span>Ask AI</span>
                    </Link>

                    <Link
                      to={`/schemes/${scheme.id}`}
                      state={{ fromResults: true, matchLabel: scheme.matchLabel }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-civic-900 hover:bg-civic-800 active:bg-civic-950 rounded-xl transition-all shadow-sm"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-warmamber-400" />
                    </Link>
                  </div>

                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Trust & Next Action Banner */}
        <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 text-center space-y-3">
          <p className="text-xs text-slate-600 max-w-xl mx-auto">
            Matches are calculated based on your submitted age, role, and income against official scheme criteria. Always verify final eligibility on the official government website.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-civic-800">
            <Link to="/find" className="hover:underline flex items-center gap-1">
              <RotateCcw className="w-3 h-3" />
              <span>Modify Details</span>
            </Link>
            <span>&bull;</span>
            <Link to="/assistant" className="hover:underline flex items-center gap-1">
              <Bot className="w-3.5 h-3.5 text-warmamber-500" />
              <span>Ask SchemeSathi AI</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
