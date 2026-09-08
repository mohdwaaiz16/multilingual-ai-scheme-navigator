import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowLeft, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Building2
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { getSchemesForCategory } from '../utils/filterUtils';
import EligibilityBadge from '../components/EligibilityBadge';

export default function CategoryPage() {
  const { t, l } = useLanguage();
  const { categorySlug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

  const category = CATEGORIES.find(
    c => c.slug === categorySlug || c.id === categorySlug
  );

  const categorySchemes = getSchemesForCategory(categorySlug || '');

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-peach-100 text-peach-600 flex items-center justify-center mx-auto">
          <Layers className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-black">Category Not Found</h1>
        <p className="text-sm text-charcoal-600">
          The requested category <code className="font-mono bg-cream-200 px-2 py-0.5 rounded text-black">{categorySlug}</code> is not in our 10 official categories.
        </p>
        <Link
          to="/schemes"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-lemon-400 text-black font-bold rounded-xl text-sm hover:bg-lemon-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore All 70 Schemes</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen pb-20">
      
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-charcoal-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
            <Link to="/schemes" className="hover:text-black transition-colors">All Schemes</Link>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
            <span className="text-black font-semibold">{l(category.name)}</span>
          </nav>

          <Link
            to="/schemes"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-lemon-600 hover:text-lemon-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All 10 Categories</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Category Hero Banner */}
        <header className="bg-white border border-charcoal-200 rounded-3xl p-6 sm:p-10 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">{category.emoji}</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-lemon-100 text-lemon-800 border border-lemon-200">
                <ShieldCheck className="w-3.5 h-3.5 text-lemon-600" />
                <span>Official Welfare Sector</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-black tracking-tight">
              {l(category.name)}
            </h1>

            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
              {l(category.description)}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="p-5 bg-cream-100 border border-charcoal-200 rounded-2xl flex-shrink-0 text-center space-y-1 self-start md:self-auto">
            <span className="text-2xl sm:text-3xl font-extrabold text-lemon-600 block font-mono">
              7
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 block">
              Verified Schemes
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold block">
              &bull; All Active
            </span>
          </div>
        </header>

        {/* Schemes List Grid */}
        <section aria-label="Schemes in this category" className="space-y-6">
          <div className="flex items-center justify-between border-b border-charcoal-200 pb-3">
            <h2 className="text-lg font-bold text-black">
              Government Schemes in this Category ({categorySchemes.length})
            </h2>
            <Link
              to="/find"
              className="text-xs font-bold text-lemon-600 hover:text-lemon-800 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-peach-500" />
              <span>Check Eligibility</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorySchemes.map((scheme, idx) => (
              <article
                key={scheme.id + '-' + idx}
                className="bg-white border border-charcoal-200 rounded-3xl p-6 shadow-soft hover:shadow-soft-hover hover:border-lemon-500 transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3.5">
                  
                  {/* Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-cream-200 text-charcoal-700">
                      {scheme.subcategory}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {scheme.status}
                    </span>
                  </div>

                  {/* Scheme Name */}
                  <h3 className="text-lg font-extrabold text-black tracking-tight leading-snug">
                    <Link
                      to={`/schemes/${scheme.id}`}
                      className="hover:text-lemon-600 focus:outline-none focus-visible:underline"
                    >
                      {scheme.schemeName}
                    </Link>
                  </h3>

                  {/* Ministry & Level */}
                  <div className="text-xs text-charcoal-500 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 flex-shrink-0 text-charcoal-400" />
                    <span className="truncate">{scheme.implementingMinistry}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-charcoal-700 line-clamp-3 leading-relaxed">
                    {scheme.description}
                  </p>

                  {/* Key Benefit Snippet */}
                  <div className="p-3 bg-cream-100 rounded-xl border border-charcoal-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-lemon-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-lemon-600" />
                      <span>Key Benefit</span>
                    </span>
                    <p className="text-xs text-charcoal-800 font-medium line-clamp-2">
                      {scheme.keyBenefits}
                    </p>
                  </div>

                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-charcoal-500">
                    {scheme.governmentLevel}
                  </span>

                  <Link
                    to={`/schemes/${scheme.id}`}
                    className="inline-flex items-center gap-1 px-4 py-2 text-xs font-bold text-black bg-lemon-400 hover:bg-lemon-500 active:bg-lemon-600 rounded-xl transition-colors shadow-sm"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </Link>
                </div>

              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
