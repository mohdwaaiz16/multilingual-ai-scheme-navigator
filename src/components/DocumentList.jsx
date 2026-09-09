import React, { useState } from 'react';
import { FileText, CheckCircle2, Circle, Printer } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function DocumentList({ documents }) {
  const [checkedDocs, setCheckedDocs] = useState({});
  const { t, l } = useLanguage();

  const toggleDoc = (index) => {
    setCheckedDocs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Convert localized string to array of bullet points
  const localizedDocs = l(documents) || '';
  const docsList = typeof documents === 'object' && Array.isArray(documents)
    ? documents
    : localizedDocs.split('\n').filter(d => d.trim().length > 0).map(d => d.replace(/^[-\*•\d\.]+\s*/, ''));

  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const totalCount = docsList.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white border border-charcoal-100 rounded-2xl p-6 shadow-soft space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-charcoal-100">
        <div>
          <h3 className="text-base font-semibold text-black flex items-center gap-2">
            <FileText className="w-5 h-5 text-charcoal-800" />
            <span>{t('scheme.checklistTitle', 'Required Documents Checklist')}</span>
          </h3>
          <p className="text-xs text-charcoal-600 mt-0.5">
            {t('scheme.checklistSubtitle', 'Check off the documents you have prepared to check your application readiness.')}
          </p>
        </div>

        {totalCount > 0 && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-semibold text-charcoal-700">
                {completedCount} / {totalCount} {t('common.ready', 'ready')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print p-2 text-charcoal-600 hover:text-charcoal-800 hover:bg-cream-200 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
              title={t('common.print', 'Print')}
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{t('common.print', 'Print')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Readiness Progress Bar */}
      {totalCount > 0 && (
        <div className="w-full bg-charcoal-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Checklist items */}
      <ul className="space-y-3" role="list">
        {docsList.map((doc, idx) => {
          const isChecked = !!checkedDocs[idx];
          return (
            <li key={idx}>
              <button
                type="button"
                onClick={() => toggleDoc(idx)}
                className={`w-full text-left flex items-start gap-3.5 p-3.5 rounded-xl border transition-all ${
                  isChecked
                    ? 'bg-lemon-100 border-lemon-300 text-black'
                    : 'bg-cream-50 hover:bg-cream-100 border-charcoal-200 text-charcoal-800'
                }`}
                aria-pressed={isChecked}
              >
                <span className="mt-0.5 flex-shrink-0">
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-black fill-lemon-200" />
                  ) : (
                    <Circle className="w-5 h-5 text-charcoal-400" />
                  )}
                </span>
                <div className="flex-1 text-sm font-medium leading-relaxed">
                  <span className={isChecked ? 'line-through text-charcoal-500' : 'text-black'}>
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
