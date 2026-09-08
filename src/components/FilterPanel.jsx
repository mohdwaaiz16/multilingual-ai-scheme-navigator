import React from 'react';
import { Filter, RotateCcw, X, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function FilterPanel({
  selectedCategory = 'all',
  onCategoryChange,
  selectedType = 'all',
  onTypeChange,
  selectedAudience = 'all',
  onAudienceChange,
  sortBy = 'relevance',
  onSortChange,
  onResetFilters,
  totalResults = 0,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) {
  const AUDIENCE_OPTIONS = [
    { value: 'all', label: 'All Beneficiaries' },
    { value: 'students', label: 'Students & Scholars' },
    { value: 'women', label: 'Women & Mothers' },
    { value: 'business', label: 'Entrepreneurs & MSMEs' },
    { value: 'youth', label: 'Youth & Job Seekers' },
    { value: 'rural', label: 'Rural Households' },
  ];

  const TYPE_OPTIONS = [
    { value: 'all', label: 'All Scheme Types' },
    { value: 'Central', label: 'Central Sector Schemes' },
    { value: 'Centrally Sponsored', label: 'Centrally Sponsored Schemes' },
  ];

  const hasActiveFilters = selectedCategory !== 'all' || selectedType !== 'all' || selectedAudience !== 'all' || sortBy !== 'relevance';

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-charcoal-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-charcoal-800" />
          <h3 className="font-semibold text-black text-sm uppercase tracking-wider">
            Filter Schemes
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-medium text-charcoal-600 hover:text-charcoal-900 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Target Beneficiary */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider">
          Target Beneficiary
        </label>
        <select
          value={selectedAudience}
          onChange={(e) => onAudienceChange(e.target.value)}
          className="w-full bg-cream-200 border border-charcoal-200 rounded-lg px-3 py-2 text-sm text-black focus:ring-2 focus:ring-lemon-500 focus:bg-white transition-all"
        >
          {AUDIENCE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Category Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full bg-cream-200 border border-charcoal-200 rounded-lg px-3 py-2 text-sm text-black focus:ring-2 focus:ring-lemon-500 focus:bg-white transition-all"
        >
          <option value="all">All 20 Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={l(cat.name)}>
              {l(cat.name)}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Scheme Type Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider">
          Scheme Type
        </label>
        <div className="space-y-1.5">
          {TYPE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                selectedType === opt.value
                  ? 'bg-lemon-200 text-black font-semibold border border-lemon-300'
                  : 'text-charcoal-600 hover:bg-cream-200'
              }`}
            >
              <input
                type="radio"
                name="schemeType"
                value={opt.value}
                checked={selectedType === opt.value}
                onChange={(e) => onTypeChange(e.target.value)}
                className="text-lemon-500 focus:ring-lemon-500"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Sort Order */}
      <div className="space-y-2 pt-2 border-t border-charcoal-200">
        <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-cream-200 border border-charcoal-200 rounded-lg px-3 py-2 text-sm text-black focus:ring-2 focus:ring-lemon-500 focus:bg-white transition-all"
        >
          <option value="relevance">Default Order</option>
          <option value="name-asc">Scheme Name (A - Z)</option>
          <option value="name-desc">Scheme Name (Z - A)</option>
          <option value="category">Category Name</option>
        </select>
      </div>

      {/* Filter Stats */}
      <div className="p-3 bg-cream-200 rounded-xl text-xs text-charcoal-700 flex items-center justify-between border border-charcoal-100">
        <span>Active Matches:</span>
        <strong className="text-black font-semibold">{totalResults} schemes</strong>
      </div>
    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className="fixed inset-0 z-50 flex">
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm" 
          onClick={onCloseMobileDrawer}
          aria-hidden="true" 
        />
        <div className="relative ml-auto w-full max-w-xs bg-cream-50 h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-charcoal-200">
              <h2 className="text-base font-bold text-black">Filters</h2>
              <button 
                type="button" 
                onClick={onCloseMobileDrawer}
                className="p-1.5 text-charcoal-500 hover:text-charcoal-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
          <div className="pt-6">
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              className="w-full py-2.5 bg-lemon-400 text-black font-bold rounded-xl text-sm shadow-sm hover:bg-lemon-500 transition-colors"
            >
              Show {totalResults} Schemes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside className="bg-white border border-charcoal-100 rounded-2xl p-5 shadow-soft sticky top-24">
      {content}
    </aside>
  );
}
