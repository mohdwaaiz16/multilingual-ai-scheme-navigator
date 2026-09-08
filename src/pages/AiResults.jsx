import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  Edit3, 
  CheckCircle2, 
  HelpCircle, 
  UserCheck, 
  RotateCcw,
  Layers
} from 'lucide-react';
import { calculateSchemeMatches } from '../utils/filterUtils';
import EligibilityBadge from '../components/EligibilityBadge';

export default function AiResults() {
  const { t, l } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

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

  const matchedSchemes = calculateSchemeMatches(profile);

  const displayedSchemes = matchedSchemes.filter(s => {
    if (filterMatchLevel === 'high') return s.matchLevel === 'high';
    if (filterMatchLevel === 'possible') return s.matchLevel === 'possible' || s.matchLevel === 'high';
    return true;
  });

  const highMatchCount = matchedSchemes.filter(s => s.matchLevel === 'high').length;
  const possibleMatchCount = matchedSchemes.filter(s => s.matchLevel === 'possible').length;

  return (
    <div className="bg-cream-50 min-h-screen py-8 sm:py-12 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Summary Banner */}
        <div className="bg-white border border-charcoal-200 rounded-3xl p-5 sm:p-6 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-lemon-100 text-lemon-700 flex items-center justify-center flex-shrink-0 font-bold">
              <Sparkles className="w-5 h-5 text-lemon-600" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-charcoal-500 uppercase tracking-wider block">
                Your Profile Match Criteria
              </span>
              <div className="text-sm sm:text-base font-bold text-black flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>{profile.age} years</span>
                <span className="text-charcoal-300">&bull;</span>
                <span className="capitalize">{profile.role || profile.occupation}</span>
                <span className="text-charcoal-300">&bull;</span>
                <span>{profile.state}</span>
                <span className="text-charcoal-300">&bull;</span>
                <span className="text-lemon-700">{profile.income}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/find')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-cream-200 hover:bg-cream-300 rounded-xl transition-colors self-start sm:self-auto"
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
              <span>Potential Eligibility Matches across 70 Schemes</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-black tracking-tight">
              Schemes You May Be Eligible For
            </h1>
            <p className="text-sm sm:text-base text-charcoal-600 max-w-3xl">
              Based on the information provided, these schemes appear to be potential matches for your situation.
            </p>
          </div>

          {/* Match Filter Tabs */}
          <div className="flex items-center bg-cream-200 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
            <button
              type="button"
              onClick={() => setFilterMatchLevel('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMatchLevel === 'all' ? 'bg-white text-black shadow-sm' : 'text-charcoal-600 hover:text-black'
              }`}
            >
              All Matches ({matchedSchemes.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMatchLevel('high')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMatchLevel === 'high' ? 'bg-white text-emerald-800 shadow-sm' : 'text-charcoal-600 hover:text-black'
              }`}
            >
              🟢 High Match ({highMatchCount})
            </button>
          </div>
        </div>

        {/* Schemes Results Grid */}
        {displayedSchemes.length === 0 ? (
          <div className="bg-white border border-charcoal-200 rounded-3xl p-12 text-center space-y-4 shadow-soft">
            <div className="w-14 h-14 rounded-2xl bg-peach-100 text-peach-600 flex items-center justify-center mx-auto">
              <HelpCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-black">
              We couldn't find a strong match based on the information provided.
            </h3>
            <p className="text-sm text-charcoal-500 max-w-md mx-auto">
              Try modifying your profile details or explore all 70 verified welfare schemes across 10 categories.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/schemes"
                className="px-5 py-2.5 bg-lemon-400 hover:bg-lemon-500 text-black text-sm font-semibold rounded-xl"
              >
                Explore All 70 Schemes
              </Link>
              <Link
                to="/assistant"
                className="px-5 py-2.5 bg-cream-200 text-charcoal-700 text-sm font-semibold rounded-xl hover:bg-cream-300"
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
                  className="bg-white border border-charcoal-200/90 rounded-3xl p-6 sm:p-7 shadow-soft hover:shadow-soft-hover hover:border-lemon-500 transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <EligibilityBadge type={scheme.category} variant="category" />
                      
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        isHigh 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : isPossible
                          ? 'bg-peach-50 text-peach-800 border border-peach-200'
                          : 'bg-cream-200 text-charcoal-700 border border-charcoal-200'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          isHigh ? 'bg-emerald-500' : isPossible ? 'bg-peach-500' : 'bg-charcoal-400'
                        }`}></span>
                        <span>{scheme.matchLabel}</span>
                      </span>
                    </div>

                    {/* Scheme Name */}
                    <h2 className="text-xl font-extrabold text-black tracking-tight leading-snug">
                      <Link 
                        to={`/schemes/${scheme.id}`}
                        state={{ fromResults: true, matchLabel: scheme.matchLabel }}
                        className="hover:text-lemon-600 focus:outline-none focus-visible:underline"
                      >
                        {scheme.schemeName}
                      </Link>
                    </h2>

                    {/* Primary Benefit */}
                    <div className="p-3.5 bg-cream-50 rounded-2xl border border-charcoal-100 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-lemon-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lemon-600" />
                        <span>Key Benefit</span>
                      </span>
                      <p className="text-xs sm:text-sm text-charcoal-700 font-medium leading-relaxed">
                        {scheme.keyBenefits}
                      </p>
                    </div>

                    {/* Why It May Match */}
                    <div className="p-3.5 bg-emerald-50/40 rounded-2xl border border-emerald-200/60 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Why this may match your situation</span>
                      </span>
                      <p className="text-xs text-charcoal-700 leading-relaxed">
                        {scheme.whyItMatches}
                      </p>
                    </div>

                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between gap-3">
                    <Link
                      to={`/assistant?q=${encodeURIComponent(`Tell me about ${scheme.schemeName} and its eligibility`)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-500 hover:text-black transition-colors"
                    >
                      <Bot className="w-3.5 h-3.5 text-peach-500" />
                      <span>Ask AI</span>
                    </Link>

                    <Link
                      to={`/schemes/${scheme.id}`}
                      state={{ fromResults: true, matchLabel: scheme.matchLabel }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-black bg-lemon-400 hover:bg-lemon-500 active:bg-lemon-600 rounded-xl transition-all shadow-sm"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </Link>
                  </div>

                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Navigation Banner */}
        <div className="bg-cream-100 border border-charcoal-200 rounded-3xl p-6 text-center space-y-3">
          <p className="text-xs text-charcoal-600 max-w-xl mx-auto">
            Matches are calculated based on your submitted age, role, and income against official scheme criteria. Always verify final eligibility on the official government website.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-lemon-600">
            <Link to="/find" className="hover:underline flex items-center gap-1">
              <RotateCcw className="w-3 h-3" />
              <span>Modify Details</span>
            </Link>
            <span className="text-charcoal-300">&bull;</span>
            <Link to="/schemes" className="hover:underline flex items-center gap-1 text-black">
              <Layers className="w-3.5 h-3.5 text-lemon-500" />
              <span>Explore All 70 Schemes</span>
            </Link>
            <span className="text-charcoal-300">&bull;</span>
            <Link to="/assistant" className="hover:underline flex items-center gap-1 text-black">
              <Bot className="w-3.5 h-3.5 text-peach-500" />
              <span>Ask SchemeSathi AI</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
