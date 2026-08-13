import React, { useState } from 'react';
import { FileText, CheckCircle2, Circle, Printer } from 'lucide-react';

export default function DocumentList({ documents = [] }) {
  const [checkedDocs, setCheckedDocs] = useState({});

  const toggleDoc = (index) => {
    setCheckedDocs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const totalCount = documents.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-civic-700" />
            <span>Required Documents Checklist</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Check off the documents you have prepared to check your application readiness.
          </p>
        </div>

        {totalCount > 0 && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-700">
                {completedCount} of {totalCount} ready
              </span>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
              title="Print document checklist"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        )}
      </div>

      {/* Readiness Progress Bar */}
      {totalCount > 0 && (
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Checklist items */}
      <ul className="space-y-3" role="list">
        {documents.map((doc, idx) => {
          const isChecked = !!checkedDocs[idx];
          return (
            <li key={idx}>
              <button
                type="button"
                onClick={() => toggleDoc(idx)}
                className={`w-full text-left flex items-start gap-3.5 p-3.5 rounded-xl border transition-all ${
                  isChecked
                    ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                    : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
                aria-pressed={isChecked}
              >
                <span className="mt-0.5 flex-shrink-0">
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                </span>
                <div className="flex-1 text-sm font-medium leading-relaxed">
                  <span className={isChecked ? 'line-through text-slate-500' : 'text-slate-800'}>
                    {doc}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
