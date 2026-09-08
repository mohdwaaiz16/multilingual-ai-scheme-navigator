import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Building2,
  ExternalLink
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { filterSchemes } from '../utils/filterUtils';
import SchemeCard from '../components/SchemeCard';
import EmptyState from '../components/EmptyState';

export default function SchemeFinder() {
  const { t, l } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [governmentLevel, setGovernmentLevel] = useState('all');
  const [targetAudience, setTargetAudience] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const qParam = searchParams.get('q');
    const catParam = searchParams.get('category');
    if (qParam !== null) setQuery(qParam);
    if (catParam !== null) setCategory(catParam);
  }, [searchParams]);

  const schemes = useMemo(() => {
    return filterSchemes({
      query,
      category,
      governmentLevel,
      targetAudience,
      sortBy
    });
  }, [query, category, governmentLevel, targetAudience, sortBy]);

  const handleResetFilters = () => {
    setQuery('');
    setCategory('all');
    setGovernmentLevel('all');
    setTargetAudience('all');
    setSortBy('relevance');
    setSearchParams({});
  };

  return (
    <div className="bg-cream-50 min-h-screen py-8 sm:py-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-charcoal-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-lemon-100 text-lemon-800 border border-lemon-200">
              <Layers className="w-3.5 h-3.5 text-lemon-600" />
              <span>Complete National Directory</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-black tracking-tight">
              All Government Schemes
            </h1>
            <p className="text-sm sm:text-base text-charcoal-700">
              Explore 70 verified welfare schemes across 10 official government categories.
            </p>
          </div>

          <Link
            to="/find"
            className="inline-flex items-center gap-2 px-5 py-3 bg-lemon-400 hover:bg-lemon-500 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 text-peach-500" />
            <span>Find My Matching Schemes</span>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-charcoal-200 rounded-3xl p-5 sm:p-6 shadow-soft space-y-5">
          
          {/* Main Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by scheme name, keywords (e.g. scholarship, pension, mudra, farmer, health, loan)..."
              className="w-full bg-cream-50 border border-charcoal-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-black placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-lemon-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Quick Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs">
            {/* 1. Category Filter */}
            <div>
              <label className="block font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-cream-50 border border-charcoal-200 rounded-xl p-2.5 text-black font-medium focus:ring-2 focus:ring-lemon-500"
              >
                <option value="all">All 10 Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Target Beneficiary */}
            <div>
              <label className="block font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Target Group
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-cream-50 border border-charcoal-200 rounded-xl p-2.5 text-black font-medium focus:ring-2 focus:ring-lemon-500"
              >
                <option value="all">All Target Beneficiaries</option>
                <option value="student">🎓 Students & Youth</option>
                <option value="farmer">🌾 Farmers & Agriculture</option>
                <option value="business">🚀 Entrepreneurs & MSMEs</option>
                <option value="employee">🏛️ Government Employees</option>
                <option value="senior citizen">👵 Senior Citizens & Pensioners</option>
                <option value="women">👩 Women & Mothers</option>
              </select>
            </div>

            {/* 3. Government Level */}
            <div>
              <label className="block font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Level
              </label>
              <select
                value={governmentLevel}
                onChange={(e) => setGovernmentLevel(e.target.value)}
                className="w-full bg-cream-50 border border-charcoal-200 rounded-xl p-2.5 text-black font-medium focus:ring-2 focus:ring-lemon-500"
              >
                <option value="all">All Government Levels</option>
                <option value="Central Government">Central Government</option>
                <option value="Centrally Sponsored">Centrally Sponsored</option>
              </select>
            </div>

            {/* 4. Sorting */}
            <div>
              <label className="block font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-cream-50 border border-charcoal-200 rounded-xl p-2.5 text-black font-medium focus:ring-2 focus:ring-lemon-500"
              >
                <option value="relevance">Relevance</option>
                <option value="name-asc">Scheme Name (A &rarr; Z)</option>
                <option value="name-desc">Scheme Name (Z &rarr; A)</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges & Reset */}
          {(query || category !== 'all' || governmentLevel !== 'all' || targetAudience !== 'all') && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-charcoal-100 text-xs">
              <span className="text-charcoal-500">
                Showing <strong className="text-black">{schemes.length}</strong> matching schemes
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 font-bold text-red-600 hover:text-red-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </div>

        {/* 10 Category Quick Navigation Pills */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider block">
            Browse by Official Category
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                category === 'all'
                  ? 'bg-lemon-400 text-black shadow-sm'
                  : 'bg-white border border-charcoal-200 text-charcoal-700 hover:bg-cream-100'
              }`}
            >
              All 70 Schemes
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  category === cat.slug
                    ? 'bg-lemon-400 text-black shadow-sm'
                    : 'bg-white border border-charcoal-200 text-charcoal-700 hover:bg-cream-100'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75 font-mono">({cat.schemeCount})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scheme Grid */}
        {schemes.length === 0 ? (
          <EmptyState onReset={handleResetFilters} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
