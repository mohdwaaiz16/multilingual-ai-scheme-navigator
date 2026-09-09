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
  ExternalLink,
  Loader2
} from 'lucide-react';
import { fetchCategories, fetchSchemes, searchSchemes } from '../utils/api';
import { filterSchemes } from '../utils/filterUtils';
import SchemeCard from '../components/SchemeCard';
import EmptyState from '../components/EmptyState';

export default function SchemeFinder() {
  const { t, l, currentLanguage } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [governmentLevel, setGovernmentLevel] = useState(searchParams.get('level') || 'all');
  const [targetAudience, setTargetAudience] = useState(searchParams.get('target') || 'all');
  const [sortBy, setSortBy] = useState('relevance');

  const [allCategories, setAllCategories] = useState([]);
  const [allSchemes, setAllSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [cats, schemes] = await Promise.all([
          fetchCategories(currentLanguage),
          fetchSchemes(currentLanguage)
        ]);
        setAllCategories(cats);
        setAllSchemes(schemes);
      } catch (error) {
        console.error("Error loading finder data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentLanguage]);

  // Update URL params when filters change
  useEffect(() => {
    const qParam = searchParams.get('q');
    const catParam = searchParams.get('category');
    if (qParam !== null) setQuery(qParam);
    if (catParam !== null) setCategory(catParam);
  }, [query, category, governmentLevel, targetAudience, setSearchParams]);

  const schemes = useMemo(() => {
    return filterSchemes(allSchemes, {
      query,
      category,
      governmentLevel,
      targetAudience,
      sortBy,
      language: currentLanguage
    });
  }, [query, category, governmentLevel, targetAudience, sortBy, allSchemes, currentLanguage]);

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
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black flex items-center gap-3">
              <Layers className="w-8 h-8 text-lemon-500" />
              {t('schemeFinder.title', 'All Government Schemes')}
            </h1>
            <p className="text-sm sm:text-base text-charcoal-700">
              {t('schemeFinder.subtitle', 'Explore 70 verified welfare schemes across 10 official government categories.')}
            </p>
          </div>

          <Link
            to="/find"
            className="inline-flex items-center gap-2 px-5 py-3 bg-lemon-400 hover:bg-lemon-500 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 text-peach-500" />
            <span>{t('schemeFinder.findMatching', 'Find My Matching Schemes')}</span>
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
              placeholder={t('filters.searchPlaceholder', 'Search by scheme name, keywords (e.g. scholarship, pension, mudra, farmer, health, loan)...')}
              className="w-full bg-cream-50 border border-charcoal-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-black placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-lemon-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Quick Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs">
            {/* 1. Category Filter */}
            <div>
              <label className="block font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                {t('filters.category', 'Category')}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-cream-50 border border-charcoal-200 rounded-xl p-2.5 text-black font-medium focus:ring-2 focus:ring-lemon-500"
              >
                <option value="all">{t('filters.selectCategory', 'All 10 Categories')}</option>
                {allCategories.map((cat) => (
                  <option key={cat.slug || cat.id} value={cat.slug || cat.id}>
                    {cat.icon || '📌'} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Target Beneficiary */}
            <div>
              <label className="block font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                {t('filters.targetGroup', 'Target Group')}
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-cream-50 border border-charcoal-200 rounded-xl p-2.5 text-black font-medium focus:ring-2 focus:ring-lemon-500"
              >
                <option value="all">{t('filters.allTarget', 'All Target Beneficiaries')}</option>
                <option value="student">🎓 {t('filters.student', 'Students & Youth')}</option>
                <option value="farmer">🌾 {t('filters.farmer', 'Farmers & Agriculture')}</option>
                <option value="business">🚀 {t('filters.business', 'Entrepreneurs & MSMEs')}</option>
                <option value="employee">🏛️ {t('filters.employee', 'Government Employees')}</option>
                <option value="senior citizen">👵 {t('filters.senior', 'Senior Citizens & Pensioners')}</option>
                <option value="women">👩 {t('filters.women', 'Women & Mothers')}</option>
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
                {t('filters.sortBy', 'Sort By')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-cream-50 border border-charcoal-200 rounded-xl p-2.5 text-black font-medium focus:ring-2 focus:ring-lemon-500"
              >
                <option value="relevance">{t('filters.relevance', 'Relevance')}</option>
                <option value="name-asc">{t('filters.nameAsc', 'Scheme Name (A → Z)')}</option>
                <option value="name-desc">{t('filters.nameDesc', 'Scheme Name (Z → A)')}</option>
                <option value="category">{t('filters.categorySort', 'Category')}</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges & Reset */}
          {(query || category !== 'all' || governmentLevel !== 'all' || targetAudience !== 'all') && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-charcoal-100 text-xs">
              <span className="text-charcoal-500">
                {t('common.showing', 'Showing')} <strong className="text-black">{schemes.length}</strong> {t('common.matchingSchemes', 'matching schemes')}
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 font-bold text-red-600 hover:text-red-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('common.resetAllFilters', 'Reset All Filters')}</span>
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
            {allCategories.map((cat) => (
              <button
                key={cat.slug || cat.id}
                type="button"
                onClick={() => setCategory(cat.slug || cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  category === (cat.slug || cat.id)
                    ? 'bg-lemon-400 text-black shadow-sm'
                    : 'bg-white border border-charcoal-200 text-charcoal-700 hover:bg-cream-100'
                }`}
              >
                <span>{cat.icon || '📌'}</span>
                <span>{cat.name}</span>
                {cat.schemeCount !== undefined && (
                  <span className="text-[10px] opacity-75 font-mono">({cat.schemeCount})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Scheme Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-lemon-600">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : schemes.length === 0 ? (
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
