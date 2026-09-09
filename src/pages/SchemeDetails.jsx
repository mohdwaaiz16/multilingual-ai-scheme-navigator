import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
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
  AlertCircle,
  Loader2
} from 'lucide-react';
import EligibilityBadge from '../components/EligibilityBadge';
import DocumentList from '../components/DocumentList';
import ApplicationSteps from '../components/ApplicationSteps';
import SchemeCard from '../components/SchemeCard';
import { fetchSchemeBySlug, fetchSchemes } from '../utils/api';

export default function SchemeDetails() {
  const { l, currentLanguage } = useLanguage();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fromResults = location.state?.fromResults;
  const matchLabel = location.state?.matchLabel;

  const [scheme, setScheme] = React.useState(null);
  const [relatedSchemes, setRelatedSchemes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadData = async () => {
      setLoading(true);
      try {
        const fetchedScheme = await fetchSchemeBySlug(id, currentLanguage);
        setScheme(fetchedScheme);
        if (fetchedScheme) {
          // fetch related schemes by category
          const all = await fetchSchemes(currentLanguage, fetchedScheme.categorySlug || fetchedScheme.category);
          setRelatedSchemes(all.filter(s => s.id !== fetchedScheme.id).slice(0, 3));
        }
      } catch (error) {
        console.error("Error loading scheme details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, currentLanguage]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 flex justify-center text-lemon-600">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-peach-200 text-peach-800 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-black">{t('states.noSchemesFound', 'Scheme Not Found')}</h1>
        <p className="text-sm text-charcoal-600">
          The requested scheme ID <code className="font-mono bg-cream-200 px-2 py-0.5 rounded text-black">{id}</code> is not found in our 70-scheme registry.
        </p>
        <div className="pt-2">
          <Link
            to="/schemes"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-lemon-400 text-black font-bold rounded-xl text-sm hover:bg-lemon-500"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('categories.browseAll', 'Explore All 70 Schemes')}</span>
          </Link>
        </div>
      </div>
    );
  }

  const isNoDirectApp = scheme.officialApplicationUrl === "Not Specified" && scheme.officialInformationUrl !== "Not Specified";

  return (
    <div className="bg-cream-50 min-h-screen pb-20">
      
      {/* 1. Breadcrumb Bar */}
      <div className="bg-white border-b border-charcoal-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-2 text-xs text-charcoal-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-black transition-colors">{t('navbar.home', 'Home')}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
            <Link to="/schemes" className="hover:text-black transition-colors font-semibold">{t('navbar.schemes', 'Schemes')}</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-charcoal-400" />
            <Link to={`/category/${scheme.categorySlug || scheme.category}`} className="hover:text-black transition-colors font-semibold">{l(scheme.category)}</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-charcoal-400" />
            <span className="text-black font-bold truncate max-w-[120px] sm:max-w-[200px]">{l(scheme.name || scheme.schemeName)}</span>
          </nav>

          <Link
            to={fromResults ? "/results" : "/schemes"}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-lemon-600 hover:text-lemon-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{fromResults ? t('common.backToResults', 'Back to Results') : t('navbar.schemes', 'All Schemes')}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        
        {/* 2. Scheme Header */}
        <header className="bg-white border border-charcoal-200 rounded-3xl p-6 sm:p-10 shadow-soft space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <Link 
                to={`/category/${scheme.categorySlug || 'education-scholarships'}`}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-lemon-100 text-black border border-lemon-300 hover:bg-lemon-200 transition-colors"
              >
                <Layers className="w-3 h-3 text-lemon-600" />
                <span>{l(scheme.category)}</span>
              </Link>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cream-200 text-charcoal-700">
                {l(scheme.subcategory)}
              </span>
            </div>

            {matchLabel ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{matchLabel}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{scheme.status ? l(scheme.status) : t('common.active', 'Active')}</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight pt-3">
            {l(scheme.name || scheme.schemeName)}
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed max-w-3xl pt-2">
            {l(scheme.description)}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-600 font-medium pt-4">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-charcoal-200 shadow-sm">
              <Building2 className="w-4 h-4 text-charcoal-400" />
              <span>{l(scheme.department || scheme.implementingMinistry)}</span>
            </div>
          </div>

          {/* Quick Details Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-charcoal-100 text-xs">
            <div className="p-3.5 bg-cream-100 rounded-2xl space-y-1">
              <span className="font-bold uppercase text-charcoal-500 block tracking-wider">
                Implementing Ministry
              </span>
              <span className="font-bold text-black text-sm block">
                {scheme.implementingMinistry}
              </span>
            </div>

            <div className="p-3.5 bg-cream-100 rounded-2xl space-y-1">
              <span className="font-bold uppercase text-charcoal-500 block tracking-wider">
                Government Level
              </span>
              <span className="font-bold text-black text-sm block">
                {scheme.governmentLevel}
              </span>
            </div>

            <div className="p-3.5 bg-cream-100 rounded-2xl space-y-1">
              <span className="font-bold uppercase text-charcoal-500 block tracking-wider">
                State Coverage
              </span>
              <span className="font-bold text-black text-sm block">
                {scheme.stateCoverage}
              </span>
            </div>

            <div className="p-3.5 bg-cream-100 rounded-2xl space-y-1">
              <span className="font-bold uppercase text-charcoal-500 block tracking-wider">
                Last Verified
              </span>
              <span className="font-bold text-black text-sm block flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{scheme.lastVerified}</span>
              </span>
            </div>
          </div>
        </header>

        {/* 3. Deep Breakdown Sections: Why Started, Who Can Benefit, How It Works */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <section className="bg-white border border-charcoal-200 rounded-3xl p-6 shadow-soft space-y-2.5">
            <div className="flex items-center gap-2 text-charcoal-800">
              <Flame className="w-5 h-5 text-peach-500" />
              <h2 className="text-base font-bold text-black">Why Was It Started?</h2>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              {scheme.whyStarted || "Initiated to provide direct support and remove socio-economic barriers for eligible citizens."}
            </p>
          </section>

          <section className="bg-white border border-charcoal-200 rounded-3xl p-6 shadow-soft space-y-2.5">
            <div className="flex items-center gap-2 text-charcoal-800">
              <UserCheck className="w-5 h-5 text-lemon-500" />
              <h2 className="text-base font-bold text-black">Who Can Benefit?</h2>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              {scheme.whoCanBenefit || "Targeted towards eligible individuals and households meeting scheme criteria."}
            </p>
          </section>

          <section className="bg-white border border-charcoal-200 rounded-3xl p-6 shadow-soft space-y-2.5">
            <div className="flex items-center gap-2 text-charcoal-800">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-black">How Does It Work?</h2>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              {scheme.howItWorks || "Executed via authorized implementing agencies, bank networks, and digital portals."}
            </p>
          </section>

        </div>

        {/* 4. Government Support & Key Benefits */}
        <section aria-labelledby="benefits-heading" className="bg-white border border-charcoal-200 rounded-3xl p-6 sm:p-8 shadow-soft space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-peach-500/20 text-peach-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 id="benefits-heading" className="text-xl font-bold text-black">
                Government Support & Key Benefits
              </h2>
              <p className="text-xs text-charcoal-500">
                Entitlements, financial subsidies, and direct assistance provided under this scheme.
              </p>
            </div>
          </div>

          <div className="p-4 bg-cream-100 rounded-2xl border border-charcoal-100 text-sm text-black font-medium leading-relaxed">
            {scheme.governmentSupport}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {(scheme.benefits || [scheme.keyBenefits]).map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 bg-lemon-50 border border-lemon-100 rounded-2xl">
                <CheckCircle2 className="w-4 h-4 text-lemon-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-black leading-relaxed font-medium">
                  {l(benefit)}
                </span>
              </div>
            ))}
          </div>

          {scheme.importantConditions && scheme.importantConditions.length > 0 && (
            <div className="p-4 bg-peach-50 border border-peach-200 rounded-2xl space-y-2 text-xs">
              <span className="font-bold text-peach-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-peach-700" />
                <span>Important Rules & Conditions</span>
              </span>
              <ul className="space-y-1 text-charcoal-700 list-disc list-inside">
                {scheme.importantConditions.map((cond, idx) => (
                  <li key={idx} className="leading-relaxed">{cond}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 5. Detailed Eligibility Section */}
        <section aria-labelledby="eligibility-heading" className="bg-white border border-charcoal-200 rounded-3xl p-6 sm:p-8 shadow-soft space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-lemon-100 text-lemon-700 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 id="eligibility-heading" className="text-xl font-bold text-black">
                {t('scheme.eligibilityTitle', 'Eligibility Criteria & Limits')}
              </h2>
              <p className="text-xs text-charcoal-500">
                {t('scheme.eligibilitySubtitle', 'Ensure you satisfy the conditions required for this government initiative.')}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-cream-100 rounded-2xl border border-charcoal-100 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                {t('scheme.primaryEligibility', 'Primary Eligibility Criteria')}
              </span>
              <p className="text-sm sm:text-base font-semibold text-black leading-relaxed whitespace-pre-line">
                {l(scheme.eligibilityText || scheme.eligibilityCriteria)}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-cream-100 rounded-2xl border border-charcoal-100 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-lemon-600" />
                  <span>{t('scheme.coverage', 'Coverage')}</span>
                </span>
                <p className="text-sm font-bold text-black mt-1">
                  {l(scheme.stateCoverage || scheme.coverage || 'All India')}
                </p>
              </div>

              <div className="p-4 bg-cream-100 rounded-2xl border border-charcoal-100 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5 text-lemon-600" />
                  <span>{t('scheme.incomeLimit', 'Income Limit')}</span>
                </span>
                <p className="text-sm font-bold text-black">
                  {l(scheme.incomeLimit || 'Not Specified')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Documents You May Need */}
        <section aria-labelledby="documents-heading" className="space-y-4">
          <DocumentList documents={scheme.documentsText || scheme.requiredDocuments || scheme.documents} />
        </section>

        {/* 7. How to Apply */}
        <section aria-labelledby="process-heading" className="space-y-4">
          <ApplicationSteps
            applicationProcess={scheme.applicationText || scheme.applicationProcess}
            officialSource={scheme.department || scheme.implementingMinistry}
            officialUrl={scheme.officialUrl || scheme.officialApplicationUrl}
          />
        </section>

        {/* 8. Official Sources & Direct Portal */}
        <section aria-labelledby="sources-heading" className="bg-white border border-charcoal-200 rounded-3xl p-6 sm:p-8 shadow-soft space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 id="sources-heading" className="text-xl font-bold text-black">
                {t('scheme.officialSources', 'Official Sources & Verified Links')}
              </h2>
              <p className="text-xs text-charcoal-500">
                {t('scheme.officialSourcesSub', 'Official portals authorized by the Government of India.')}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {isNoDirectApp ? (
              <div className="p-5 bg-peach-100 border border-peach-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-peach-900 font-bold text-sm">
                  <Info className="w-4 h-4 text-peach-600" />
                  <span>Direct Application Not Applicable</span>
                </div>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  Direct public application is not available for this scheme. It uses an official selection, nomination, or institutional identification process.
                </p>
                {scheme.officialInformationUrl && scheme.officialInformationUrl !== "Not Specified" && (
                  <div>
                    <a
                      href={scheme.officialInformationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-lemon-400 hover:bg-lemon-500 text-black text-xs font-bold rounded-xl transition-all shadow-sm"
                    >
                      <span>Visit Official Information Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {scheme.officialUrl && scheme.officialUrl !== "Not Specified" && (
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-lemon-400 hover:bg-lemon-500 text-black font-bold text-sm rounded-2xl shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-lemon-600"
                  >
                    <span>Visit Official Application Portal</span>
                    <ExternalLink className="w-4 h-4 text-black" />
                  </a>
                )}

                {scheme.officialInformationUrl && scheme.officialInformationUrl !== "Not Specified" && scheme.officialInformationUrl !== scheme.officialApplicationUrl && (
                  <a
                    href={scheme.officialInformationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-cream-200 hover:bg-cream-300 text-black font-bold text-sm rounded-2xl transition-all"
                  >
                    <span>View Official Ministry Guidelines</span>
                    <ExternalLink className="w-4 h-4 text-charcoal-500" />
                  </a>
                )}
              </div>
            )}

            <p className="text-xs text-charcoal-500 leading-relaxed">
              Always verify current eligibility rules, required documents, and application procedures directly on the official government website.
            </p>
          </div>
        </section>

        {/* 9. Ask AI Callout */}
        <div className="bg-gradient-to-r from-lemon-300 to-peach-300 text-black rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Have questions about this scheme?</h3>
            <p className="text-xs sm:text-sm text-charcoal-800">
              Ask SchemeSathi AI to explain this scheme, its documentation requirements, or application steps.
            </p>
          </div>
          <Link
            to={`/assistant?q=${encodeURIComponent(`Explain eligibility and documents for ${l(scheme.schemeName || scheme.name)}`)}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-bold text-sm rounded-xl shadow-md transition-all flex-shrink-0"
          >
            <Bot className="w-4 h-4" />
            <span>Ask SchemeSathi AI</span>
          </Link>
        </div>

        {/* 10. Related Schemes */}
        {relatedSchemes.length > 0 && (
          <section aria-labelledby="related-heading" className="pt-8 border-t border-charcoal-200 space-y-6">
            <h2 id="related-heading" className="text-xl font-bold text-black">
              Related Schemes in {l(scheme.category)}
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
