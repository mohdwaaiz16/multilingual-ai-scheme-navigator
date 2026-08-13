import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, ShieldCheck, CheckCircle2, UserCheck } from 'lucide-react';
import EligibilityBadge from './EligibilityBadge';

export default function SchemeCard({ scheme }) {
  return (
    <article className="group relative flex flex-col justify-between bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-subtle hover:shadow-civic-hover hover:border-civic-300 transition-all text-left">
      <div className="space-y-3.5">
        {/* Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <EligibilityBadge type={scheme.category} variant="category" />
          <EligibilityBadge type={scheme.type} variant={scheme.type === 'Central' ? 'central' : 'sponsored'} />
        </div>

        {/* Scheme Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-civic-900 transition-colors leading-snug">
          <Link 
            to={`/schemes/${scheme.id}`}
            className="focus:outline-none focus-visible:underline"
          >
            {scheme.schemeName}
          </Link>
        </h3>

        {/* Short Purpose */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {scheme.description}
        </p>

        {/* Key Benefit Highlight */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-govblue-800 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-govblue-600" />
            <span>Key Benefit</span>
          </div>
          <p className="text-xs text-slate-700 font-medium line-clamp-2">
            {scheme.keyBenefits}
          </p>
        </div>

        {/* Eligibility Preview */}
        <div className="flex items-start gap-1.5 text-xs text-slate-500">
          <UserCheck className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="line-clamp-1">
            <strong className="text-slate-700 font-medium">Eligibility:</strong> {scheme.eligibilityCriteria}
          </p>
        </div>
      </div>

      {/* Card Footer: Official Source & Details Action */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate" title={`Official portal: ${scheme.officialSource}`}>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span className="truncate font-mono">{scheme.officialSource}</span>
        </div>

        <Link
          to={`/schemes/${scheme.id}`}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-civic-900 bg-civic-50 hover:bg-civic-900 hover:text-white rounded-lg transition-all flex-shrink-0"
          aria-label={`View full details for ${scheme.schemeName}`}
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
