import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function BenefitCard({ benefitText, category }) {
  return (
    <div className="bg-gradient-to-br from-civic-50/50 via-white to-govblue-50/30 border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-civic transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-govblue-100 text-govblue-700 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">
              Primary Scheme Benefit
            </h3>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Direct Benefit
            </span>
          </div>
          <p className="text-slate-700 text-base leading-relaxed">
            {benefitText}
          </p>
        </div>
      </div>
    </div>
  );
}
