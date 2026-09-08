import React, { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage, t, LANGUAGES } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const current = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-black bg-white border border-charcoal-200 rounded-lg hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-lemon-500 shadow-soft transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={t('navbar.language')}
      >
        <Globe className="w-4 h-4 text-charcoal-800" />
        <span>{current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-charcoal-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setIsOpen(false)} 
            aria-hidden="true" 
          />
          <div className="absolute right-0 z-30 mt-2 w-44 origin-top-right rounded-lg bg-white shadow-soft ring-1 ring-charcoal-100 focus:outline-none py-1">
            <div className="px-3 py-1.5 text-xs font-semibold text-charcoal-500 uppercase tracking-wider border-b border-charcoal-100">
              {t('navbar.language')}
            </div>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-cream-200 transition-colors ${
                  language === lang.code ? 'font-bold text-black bg-lemon-200' : 'text-charcoal-700'
                }`}
                dir="ltr"
              >
                <span>{lang.label} <span className="text-xs text-charcoal-500 font-normal">({lang.native})</span></span>
                {language === lang.code && (
                  <Check className="w-4 h-4 text-black" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
