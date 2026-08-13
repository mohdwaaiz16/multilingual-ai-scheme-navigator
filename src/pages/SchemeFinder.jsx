import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Layers, Search, RotateCcw } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import SchemeGrid from '../components/SchemeGrid';
import FilterPanel from '../components/FilterPanel';
import CategoryCard from '../components/CategoryCard';
import { filterSchemes } from '../utils/filterUtils';
import { CATEGORIES } from '../data/categories';

export default function SchemeFinder() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Active view tab: 'schemes' or 'categories'
  const tabParam = searchParams.get('tab') || 'schemes';
  const [activeTab, setActiveTab] = useState(tabParam);

  // Filter States
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedAudience, setSelectedAudience] = useState(searchParams.get('audience') || 'all');
  const [sortBy, setSortBy] = useState('relevance');

  // Mobile Filter Drawer State
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Sync state with URL params on searchParams change
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('category') || 'all';
    const type = searchParams.get('type') || 'all';
    const aud = searchParams.get('audience') || 'all';
    const tab = searchParams.get('tab') || 'schemes';

    setQuery(q);
    setSelectedCategory(cat);
    setSelectedType(type);
    setSelectedAudience(aud);
    setActiveTab(tab);
  }, [searchParams]);

  // Compute filtered schemes
  const filteredSchemes = useMemo(() => {
    return filterSchemes({
      query,
      category: selectedCategory,
      type: selectedType,
      targetAudience: selectedAudience,
      sortBy
    });
  }, [query, selectedCategory, selectedType, selectedAudience, sortBy]);

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedAudience('all');
    setSortBy('relevance');
    setSearchParams({});
  };

  const handleCategoryChange = (val) => {
    setSelectedCategory(val);
    const newParams = new URLSearchParams(searchParams);
    if (val === 'all') newParams.delete('category');
    else newParams.set('category', val);
    setSearchParams(newParams);
  };

  const handleTypeChange = (val) => {
    setSelectedType(val);
    const newParams = new URLSearchParams(searchParams);
    if (val === 'all') newParams.delete('type');
    else newParams.set('type', val);
    setSearchParams(newParams);
  };

  const handleAudienceChange = (val) => {
    setSelectedAudience(val);
    const newParams = new URLSearchParams(searchParams);
    if (val === 'all') newParams.delete('audience');
    else newParams.set('audience', val);
    setSearchParams(newParams);
  };

  const handleQueryChange = (val) => {
    setQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (!val) newParams.delete('q');
    else newParams.set('q', val);
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-govblue-600 uppercase tracking-wider">
          <span>Official Scheme Directory</span>
          <span>&bull;</span>
          <span>Phase 1 Initial Release</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Find & Browse Government Schemes
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Filter and discover 20 verified central and centrally sponsored welfare schemes across health, education, housing, and livelihood.
        </p>
      </div>

      {/* Main Tab Navigation & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start">
          <button
            type="button"
            onClick={() => {
              setActiveTab('schemes');
              const p = new URLSearchParams(searchParams);
              p.delete('tab');
              setSearchParams(p);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'schemes'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Schemes ({filteredSchemes.length})
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('categories');
              const p = new URLSearchParams(searchParams);
              p.set('tab', 'categories');
              setSearchParams(p);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'categories'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Categories ({CATEGORIES.length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <SearchBar
            value={query}
            onChange={handleQueryChange}
            onClear={() => handleQueryChange('')}
            placeholder="Search by scheme name, keyword (e.g. loan, housing, 5 lakh)..."
          />
        </div>
      </div>

      {/* Content depending on Active Tab */}
      {activeTab === 'categories' ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              All 20 Welfare Categories
            </h2>
            <span className="text-xs text-slate-500">
              Click any category to filter schemes
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterPanel
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
              selectedAudience={selectedAudience}
              onAudienceChange={handleAudienceChange}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onResetFilters={handleResetFilters}
              totalResults={filteredSchemes.length}
            />
          </div>

          {/* Schemes Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Results Bar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-subtle">
              <div className="text-sm text-slate-700">
                Showing <strong className="font-semibold text-slate-900">{filteredSchemes.length}</strong> of 20 verified schemes
              </div>

              {/* Mobile filter trigger */}
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Active Filter Chips */}
            {(selectedCategory !== 'all' || selectedType !== 'all' || selectedAudience !== 'all' || query) && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Active filters:</span>
                {query && (
                  <span className="bg-civic-50 text-civic-900 border border-civic-200 px-2.5 py-1 rounded-lg">
                    Query: "{query}"
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="bg-civic-50 text-civic-900 border border-civic-200 px-2.5 py-1 rounded-lg">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedType !== 'all' && (
                  <span className="bg-civic-50 text-civic-900 border border-civic-200 px-2.5 py-1 rounded-lg">
                    Type: {selectedType}
                  </span>
                )}
                {selectedAudience !== 'all' && (
                  <span className="bg-civic-50 text-civic-900 border border-civic-200 px-2.5 py-1 rounded-lg">
                    Beneficiary: {selectedAudience}
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-govblue-600 hover:underline font-semibold ml-1"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Scheme Grid */}
            <SchemeGrid
              schemes={filteredSchemes}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {isMobileDrawerOpen && (
            <FilterPanel
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
              selectedAudience={selectedAudience}
              onAudienceChange={handleAudienceChange}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onResetFilters={handleResetFilters}
              totalResults={filteredSchemes.length}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
            />
          )}

        </div>
      )}
    </div>
  );
}
