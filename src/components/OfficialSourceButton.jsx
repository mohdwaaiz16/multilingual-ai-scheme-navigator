import React from 'react';
import { ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

export default function OfficialSourceButton({ officialSource, officialUrl, schemeName }) {
  const url = officialUrl || (officialSource?.startsWith('http') ? officialSource : `https://${officialSource}`);

  return (
    <div className="bg-cream-200 border border-charcoal-100 rounded-2xl p-6 sm:p-7 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Official Government Portal</span>
          </div>
          <p className="text-sm font-medium text-black">
            Official Source: <span className="font-mono text-charcoal-900">{officialSource}</span>
          </p>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-base font-bold text-black bg-lemon-400 hover:bg-lemon-500 active:bg-lemon-600 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-lemon-600 focus:ring-offset-2 flex-shrink-0"
          aria-label={`Visit official website for ${schemeName} (opens in new tab)`}
        >
          <span>Visit Official Source</span>
          <ExternalLink className="w-4 h-4 text-black" />
        </a>
      </div>

      <div className="flex items-start gap-2.5 pt-3 border-t border-charcoal-200 text-xs text-charcoal-600">
        <AlertCircle className="w-4 h-4 text-charcoal-500 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Official Verification Note:</strong> Please verify current eligibility guidelines, active application deadlines, and submission requirements directly on the official portal above.
        </p>
      </div>
    </div>
  );
}
