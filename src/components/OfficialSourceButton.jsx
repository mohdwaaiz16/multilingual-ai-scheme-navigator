import React from 'react';
import { ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

export default function OfficialSourceButton({ officialSource, officialUrl, schemeName }) {
  const url = officialUrl || (officialSource?.startsWith('http') ? officialSource : `https://${officialSource}`);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Official Government Portal</span>
          </div>
          <p className="text-sm font-medium text-slate-800">
            Official Source: <span className="font-mono text-govblue-700">{officialSource}</span>
          </p>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-base font-semibold text-white bg-civic-900 hover:bg-civic-800 active:bg-civic-950 rounded-xl shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-civic-500 focus:ring-offset-2 flex-shrink-0"
          aria-label={`Visit official website for ${schemeName} (opens in new tab)`}
        >
          <span>Visit Official Source</span>
          <ExternalLink className="w-4 h-4 text-warmamber-400" />
        </a>
      </div>

      <div className="flex items-start gap-2.5 pt-3 border-t border-slate-200/80 text-xs text-slate-500">
        <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Official Verification Note:</strong> Please verify current eligibility guidelines, active application deadlines, and submission requirements directly on the official portal above.
        </p>
      </div>
    </div>
  );
}
