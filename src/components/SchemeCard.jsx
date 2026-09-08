import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Building2, Layers } from 'lucide-react';
import EligibilityBadge from './EligibilityBadge';

export default function SchemeCard({ scheme, matchLabel, matchLevel }) {
  const isHigh = matchLevel === 'high';
  const isPossible = matchLevel === 'possible';

  return (
    <article className="bg-white border border-charcoal-100 rounded-3xl p-6 shadow-soft hover:shadow-soft-hover hover:border-lemon-400 hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4 group">
      <div className="space-y-3">
        {/* Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <EligibilityBadge type={scheme.category} variant="category" />
          
          {matchLabel ? (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isHigh 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : isPossible
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                isHigh ? 'bg-emerald-500' : isPossible ? 'bg-amber-500' : 'bg-charcoal-400'
              }`}></span>
              <span>{matchLabel}</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              {scheme.status || 'Active'}
            </span>
          )}
        </div>

        {/* Scheme Name */}
        <h3 className="text-lg font-extrabold text-black tracking-tight leading-snug transition-colors">
          <Link
            to={`/schemes/${scheme.id}`}
            state={{ fromResults: !!matchLabel, matchLabel }}
            className="hover:underline focus:outline-none focus-visible:underline"
          >
            {scheme.schemeName}
          </Link>
        </h3>

        {/* Ministry */}
        <div className="text-xs text-charcoal-600 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 flex-shrink-0 text-charcoal-400" />
          <span className="truncate">{scheme.implementingMinistry}</span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-charcoal-700 line-clamp-2 leading-relaxed">
          {scheme.description}
        </p>

        {/* Key Benefit Highlight */}
        <div className="p-3 bg-cream-200 rounded-2xl border border-charcoal-100 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-charcoal-900" />
            <span>Key Benefit</span>
          </span>
          <p className="text-xs text-black font-medium line-clamp-2">
            {scheme.keyBenefits}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-charcoal-600">
          {scheme.subcategory || scheme.governmentLevel}
        </span>

        <Link
          to={`/schemes/${scheme.id}`}
          state={{ fromResults: !!matchLabel, matchLabel }}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-black bg-lemon-400 hover:bg-lemon-500 active:bg-lemon-600 rounded-xl transition-all shadow-sm"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
