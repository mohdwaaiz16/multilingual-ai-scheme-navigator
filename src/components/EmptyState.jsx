import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({ onReset, title = "No schemes found", message = "We couldn't find any schemes matching your current filters and search query." }) {
  return (
    <div className="text-center py-16 px-4 bg-white border border-slate-200/80 rounded-2xl shadow-subtle my-6">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
        {message}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-civic-500"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
}
