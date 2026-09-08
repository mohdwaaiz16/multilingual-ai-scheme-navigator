import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({ onReset, title = "No schemes found", message = "We couldn't find any schemes matching your current filters and search query." }) {
  return (
    <div className="text-center py-16 px-4 bg-white border border-charcoal-100 rounded-2xl shadow-soft my-6">
      <div className="w-16 h-16 rounded-2xl bg-cream-200 text-charcoal-400 flex items-center justify-center mx-auto mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-black mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-charcoal-600 max-w-md mx-auto mb-6">
        {message}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-black bg-lemon-200 hover:bg-lemon-300 active:bg-lemon-400 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-lemon-500"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
}
