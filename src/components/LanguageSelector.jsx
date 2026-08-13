import React, { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'हिन्दी', native: 'Hindi' },
  { code: 'te', label: 'తెలుగు', native: 'Telugu' }
];

export default function LanguageSelector() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const current = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-civic-500 shadow-subtle transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-civic-600" />
        <span>{current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setIsOpen(false)} 
            aria-hidden="true" 
          />
          <div className="absolute right-0 z-30 mt-2 w-44 origin-top-right rounded-lg bg-white shadow-civic ring-1 ring-black/5 focus:outline-none py-1">
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              Select Language (UI)
            </div>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setSelectedLang(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${
                  selectedLang === lang.code ? 'font-semibold text-civic-900 bg-civic-50/50' : 'text-slate-700'
                }`}
              >
                <span>{lang.label} <span className="text-xs text-slate-400 font-normal">({lang.native})</span></span>
                {selectedLang === lang.code && (
                  <Check className="w-4 h-4 text-civic-600" />
                )}
              </button>
            ))}
            <div className="px-3 py-1.5 text-[11px] text-slate-400 border-t border-slate-100 bg-slate-50/50">
              Prototype UI Preview
            </div>
          </div>
        </>
      )}
    </div>
  );
}
