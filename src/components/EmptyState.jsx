import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function EmptyState({ onReset, title, message }) {
  const { t } = useLanguage();
  return (
    <div className="text-center py-16 px-4 bg-white border border-charcoal-100 rounded-2xl shadow-soft my-6">
      <div className="w-16 h-16 rounded-2xl bg-cream-200 text-charcoal-400 flex items-center justify-center mx-auto mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-black mb-1.5">
        {title || t('states.noSchemesFound', 'No schemes found')}
      </h3>
      <p className="text-sm text-charcoal-600 max-w-md mx-auto mb-6">
        {message || t('states.unableToLoadData', "We couldn't find any schemes matching your current filters and search query.")}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-black bg-lemon-200 hover:bg-lemon-300 active:bg-lemon-400 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-lemon-500"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('common.reset', 'Reset All Filters')}</span>
        </button>
      )}
    </div>
  );
}
