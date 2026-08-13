import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value = '',
  onChange,
  onClear,
  placeholder = "Search by scheme name, keywords (e.g. scholarship, solar, loan)...",
  size = "md",
  className = ""
}) {
  const isLarge = size === "lg";

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className={isLarge ? "w-5 h-5" : "w-4 h-4"} />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-white text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-civic-500 focus:border-civic-500 shadow-sm transition-all placeholder:text-slate-400 ${
            isLarge ? 'pl-11 pr-11 py-3.5 text-base' : 'pl-10 pr-10 py-2.5 text-sm'
          }`}
          aria-label="Search schemes"
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label="Clear search input"
          >
            <X className={isLarge ? "w-5 h-5" : "w-4 h-4"} />
          </button>
        )}
      </div>
    </div>
  );
}
