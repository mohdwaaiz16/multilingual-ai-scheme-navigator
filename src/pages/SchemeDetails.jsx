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
  Info,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  MapPin,
  Flame,
  AlertCircle
} from 'lucide-react';
import EligibilityBadge from '../components/EligibilityBadge';
import DocumentList from '../components/DocumentList';
import ApplicationSteps from '../components/ApplicationSteps';
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
          The requested scheme ID <code className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800">{id}</code> is not found in our 70-scheme registry.
        </p>
        <div className="pt-2">
          <Link
            to="/schemes"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-civic-900 text-white font-medium rounded-xl text-sm hover:bg-civic-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore All 70 Schemes</span>
          </Link>
        </div>
      </div>
    );
  }

  const relatedSchemes = SCHEMES
    .filter(s => s.id !== scheme.id && (s.category === scheme.category || s.categories?.some(c => scheme.categories?.includes(c))))
    .slice(0, 3);

  const isNoDirectApp = scheme.officialApplicationUrl === "Not Applicable" || 
                        !scheme.officialApplicationUrl || 
                        scheme.officialApplicationUrl.includes("Not Applicable") ||
                        scheme.schemeName.toLowerCase().includes("target olympic podium");

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* 1. Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/schemes" className="hover:text-slate-900 transition-colors">All Schemes</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to={`/category/${scheme.categorySlug || 'education-scholarships'}`} className="hover:text-slate-900 transition-colors truncate max-w-[140px] sm:max-w-none">
              {scheme.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold truncate max-w-[180px] sm:max-w-xs">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        
        {/* 2. Scheme Header */}
        <header className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-subtle space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <Link 
                to={`/category/${scheme.categorySlug || 'education-scholarships'}`}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-civic-50 text-civic-900 border border-civic-200 hover:bg-civic-100 transition-colors"
              >
                <Layers className="w-3 h-3 text-govblue-600" />
                <span>{scheme.category}</span>
              </Link>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {scheme.subcategory}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {scheme.status}
              </span>
            </div>

            {fromResults && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{matchLabel || "Potential Match"}</span>
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

          {/* Quick Details Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
              <span className="font-bold uppercase text-slate-400 block tracking-wider">
                Implementing Ministry
              </span>
              <span className="font-bold text-slate-900 text-sm block">
                {scheme.implementingMinistry}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
              <span className="font-bold uppercase text-slate-400 block tracking-wider">
                Government Level
              </span>
              <span className="font-bold text-slate-900 text-sm block">
                {scheme.governmentLevel}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
              <span className="font-bold uppercase text-slate-400 block tracking-wider">
                State Coverage
              </span>
              <span className="font-bold text-slate-900 text-sm block">
                {scheme.stateCoverage}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
              <span className="font-bold uppercase text-slate-400 block tracking-wider">
                Last Verified
              </span>
              <span className="font-bold text-slate-900 text-sm block flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{scheme.lastVerified}</span>
              </span>
            </div>
          </div>
        </header>

        {/* 3. Deep Breakdown Sections: Why Started, Who Can Benefit, How It Works */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 text-civic-900">
              <Flame className="w-5 h-5 text-warmamber-500" />
              <h2 className="text-base font-bold text-slate-900">Why Was It Started?</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {scheme.whyStarted || "Initiated to provide direct support and remove socio-economic barriers for eligible citizens."}
            </p>
          </section>

          <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 text-civic-900">
              <UserCheck className="w-5 h-5 text-govblue-600" />
              <h2 className="text-base font-bold text-slate-900">Who Can Benefit?</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {scheme.whoCanBenefit || "Targeted towards eligible individuals and households meeting scheme criteria."}
            </p>
          </section>

          <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 text-civic-900">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">How Does It Work?</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {scheme.howItWorks || "Executed via authorized implementing agencies, bank networks, and digital portals."}
            </p>
          </section>

        </div>

        {/* 4. Government Support & Key Benefits */}
        <section aria-labelledby="benefits-heading" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-warmamber-500/10 text-warmamber-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 id="benefits-heading" className="text-xl font-bold text-slate-900">
                Government Support & Key Benefits
              </h2>
              <p className="text-xs text-slate-500">
                Entitlements, financial subsidies, and direct assistance provided under this scheme.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-800 font-medium leading-relaxed">
            {scheme.governmentSupport}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {(scheme.benefits || [scheme.keyBenefits]).map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 bg-govblue-50/50 rounded-2xl border border-govblue-100">
                <CheckCircle2 className="w-4 h-4 text-govblue-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {scheme.importantConditions && scheme.importantConditions.length > 0 && (
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-2 text-xs">
              <span className="font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Important Rules & Conditions</span>
              </span>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                {scheme.importantConditions.map((cond, idx) => (
                  <li key={idx} className="leading-relaxed">{cond}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 5. Detailed Eligibility Section */}
        <section aria-labelledby="eligibility-heading" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-govblue-50 text-govblue-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 id="eligibility-heading" className="text-xl font-bold text-slate-900">
                Eligibility Criteria & Limits
              </h2>
              <p className="text-xs text-slate-500">
                Ensure you satisfy the conditions required for this government initiative.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Primary Eligibility Criteria
              </span>
              <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                {scheme.eligibilityCriteria}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-civic-700" />
                  <span>Age Limit</span>
                </span>
                <p className="text-sm font-bold text-slate-900">
                  {scheme.ageLimit}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5 text-civic-700" />
                  <span>Income Limit</span>
                </span>
                <p className="text-sm font-bold text-slate-900">
                  {scheme.incomeLimit}
                </p>
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
            officialSource={scheme.implementingMinistry}
            officialUrl={scheme.officialApplicationUrl}
          />
        </section>

        {/* 8. Official Sources & Direct Portal */}
        <section aria-labelledby="sources-heading" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 id="sources-heading" className="text-xl font-bold text-slate-900">
                Official Sources & Verified Links
              </h2>
              <p className="text-xs text-slate-500">
                Official portals authorized by the Government of India.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {isNoDirectApp ? (
              <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>Direct Application Not Applicable</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Direct public application is not available for this scheme. It uses an official selection, nomination, or institutional identification process.
                </p>
                {scheme.officialInformationUrl && scheme.officialInformationUrl !== "Not Specified" && (
                  <div>
                    <a
                      href={scheme.officialInformationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-civic-900 hover:bg-civic-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                    >
                      <span>Visit Official Information Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {scheme.officialApplicationUrl && scheme.officialApplicationUrl !== "Not Specified" && (
                  <a
                    href={scheme.officialApplicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-civic-900 hover:bg-civic-800 text-white font-bold text-sm rounded-2xl shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-civic-500"
                  >
                    <span>Visit Official Application Portal</span>
                    <ExternalLink className="w-4 h-4 text-warmamber-400" />
                  </a>
                )}

                {scheme.officialInformationUrl && scheme.officialInformationUrl !== "Not Specified" && scheme.officialInformationUrl !== scheme.officialApplicationUrl && (
                  <a
                    href={scheme.officialInformationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-2xl transition-all"
                  >
                    <span>View Official Ministry Guidelines</span>
                    <ExternalLink className="w-4 h-4 text-slate-500" />
                  </a>
                )}
              </div>
            )}

            <p className="text-xs text-slate-500 leading-relaxed">
              Always verify current eligibility rules, required documents, and application procedures directly on the official government website.
            </p>
          </div>
        </section>

        {/* 9. Ask AI Callout */}
        <div className="bg-gradient-to-r from-civic-900 to-govblue-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Have questions about this scheme?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Ask SchemeSathi AI to explain this scheme, its documentation requirements, or application steps.
            </p>
          </div>
          <Link
            to={`/assistant?q=${encodeURIComponent(`Explain eligibility and documents for ${scheme.schemeName}`)}`}
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
              Related Schemes in {scheme.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
