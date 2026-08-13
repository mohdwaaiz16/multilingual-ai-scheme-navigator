import React, { useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck, 
  Calendar, 
  Wallet, 
  UserCheck, 
  FileText, 
  Sparkles, 
  Building2, 
  ExternalLink,
  Bot,
  Info
} from 'lucide-react';
import EligibilityBadge from '../components/EligibilityBadge';
import BenefitCard from '../components/BenefitCard';
import DocumentList from '../components/DocumentList';
import ApplicationSteps from '../components/ApplicationSteps';
import OfficialSourceButton from '../components/OfficialSourceButton';
import SchemeCard from '../components/SchemeCard';
import { SCHEMES } from '../data/schemes';

export default function SchemeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fromResults = location.state?.fromResults;
  const matchLabel = location.state?.matchLabel;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const scheme = SCHEMES.find((s) => s.id === id);

  if (!scheme) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Scheme Not Found</h1>
        <p className="text-sm text-slate-600">
          The requested scheme ID <code className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800">{id}</code> is not in our verified database.
        </p>
        <div className="pt-2">
          <Link
            to="/schemes"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-civic-900 text-white font-medium rounded-xl text-sm hover:bg-civic-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Schemes</span>
          </Link>
        </div>
      </div>
    );
  }

  const relatedSchemes = SCHEMES
    .filter(s => s.id !== scheme.id && (s.category === scheme.category || s.type === scheme.type))
    .slice(0, 2);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* 1. Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to={fromResults ? "/results" : "/schemes"} className="hover:text-slate-900 transition-colors">
              {fromResults ? "Results" : "Schemes"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-xs">
              {scheme.schemeName}
            </span>
          </nav>

          <Link
            to={fromResults ? "/results" : "/schemes"}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-civic-800 hover:text-civic-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{fromResults ? "Back to Results" : "All Schemes"}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        
        {/* 2. Scheme Header */}
        <header className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-subtle space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <EligibilityBadge type={scheme.category} variant="category" />
              <EligibilityBadge type={scheme.type} variant={scheme.type === 'Central' ? 'central' : 'sponsored'} />
            </div>

            {fromResults && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Potential Match</span>
              </span>
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {scheme.schemeName}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-4xl">
              {scheme.description}
            </p>
          </div>

          {/* Quick Eligibility Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl">
              <Calendar className="w-5 h-5 text-civic-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Age Limit
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {scheme.ageLimit}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl">
              <Wallet className="w-5 h-5 text-civic-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Income Limit
                </span>
                <span className="text-xs font-bold text-slate-900 leading-snug">
                  {scheme.incomeLimit}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl">
              <Building2 className="w-5 h-5 text-civic-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Administration
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {scheme.type}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* 3. About This Scheme */}
        <section aria-labelledby="about-heading" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-civic-700" />
            <h2 id="about-heading" className="text-xl font-bold text-slate-900">
              About this scheme
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {scheme.description} {scheme.schemeName} is a {scheme.type.toLowerCase()} welfare initiative designed to provide structured citizen assistance under the {scheme.category} category.
          </p>
        </section>

        {/* 4. Key Benefits Section */}
        <section aria-labelledby="benefits-heading" className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-warmamber-500" />
            <h2 id="benefits-heading" className="text-xl font-bold text-slate-900">
              Key Benefits & Entitlements
            </h2>
          </div>
          <BenefitCard benefitText={scheme.keyBenefits} category={scheme.category} />
        </section>

        {/* 5. Detailed Eligibility Breakdown */}
        <section aria-labelledby="eligibility-heading" className="space-y-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-govblue-600" />
            <h2 id="eligibility-heading" className="text-xl font-bold text-slate-900">
              Eligibility Criteria
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Primary Qualifications
              </h3>
              <p className="text-base font-semibold text-slate-800 leading-relaxed">
                {scheme.eligibilityCriteria}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-sm">
              <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Age Specifics</span>
                <p className="text-slate-800 font-semibold">{scheme.ageLimit}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Income Specifics</span>
                <p className="text-slate-800 font-semibold">{scheme.incomeLimit}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Documents You May Need */}
        <section aria-labelledby="documents-heading" className="space-y-4">
          <DocumentList documents={scheme.requiredDocuments} />
        </section>

        {/* 7. How to Apply */}
        <section aria-labelledby="process-heading" className="space-y-4">
          <ApplicationSteps
            applicationProcess={scheme.applicationProcess}
            officialSource={scheme.officialSource}
            officialUrl={scheme.officialUrl}
          />
        </section>

        {/* 8. Official Source */}
        <section aria-labelledby="official-source-heading" className="space-y-4">
          <h2 id="official-source-heading" className="text-xl font-bold text-slate-900">
            Official Source Confirmation
          </h2>
          <OfficialSourceButton
            officialSource={scheme.officialSource}
            officialUrl={scheme.officialUrl}
            schemeName={scheme.schemeName}
          />
        </section>

        {/* 9. Ask SchemeSathi AI Callout */}
        <div className="bg-gradient-to-r from-civic-900 to-govblue-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Have questions about this scheme?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Ask SchemeSathi AI to explain this scheme, its documentation requirements, or application steps.
            </p>
          </div>
          <Link
            to={`/assistant?q=${encodeURIComponent(`Explain the eligibility and benefits for ${scheme.schemeName}`)}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-warmamber-500 hover:bg-warmamber-400 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex-shrink-0"
          >
            <Bot className="w-4 h-4" />
            <span>Ask SchemeSathi AI</span>
          </Link>
        </div>

        {/* 10. Related Schemes */}
        {relatedSchemes.length > 0 && (
          <section aria-labelledby="related-heading" className="pt-8 border-t border-slate-200 space-y-6">
            <h2 id="related-heading" className="text-xl font-bold text-slate-900">
              Related Welfare Schemes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedSchemes.map((rel) => (
                <SchemeCard key={rel.id} scheme={rel} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
