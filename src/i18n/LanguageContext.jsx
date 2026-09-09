import React, { createContext, useContext, useState, useEffect } from 'react';
import en from './translations/en.json';
import hi from './translations/hi.json';
import kn from './translations/kn.json';
import ta from './translations/ta.json';
import te from './translations/te.json';
import ml from './translations/ml.json';
import mr from './translations/mr.json';
import bn from './translations/bn.json';
import gu from './translations/gu.json';
import pa from './translations/pa.json';
import ur from './translations/ur.json';

const translations = {
  en, hi, kn, ta, te, ml, mr, bn, gu, pa, ur
};

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ur', label: 'Urdu', native: 'اردو' }
];

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('schemeSathiLang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('schemeSathiLang', currentLanguage);
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ur' ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  const t = (key) => {
    const keys = key.split('.');
    
    const getValue = (obj, keysArray) => {
      let current = obj;
      for (const k of keysArray) {
        if (current === undefined || current === null) return undefined;
        current = current[k];
      }
      return current;
    };

    // Try current language
    let value = getValue(translations[currentLanguage], keys);
    
    // Fallback to English
    if (value === undefined) {
      value = getValue(translations['en'], keys);
    }
    
    // Final fallback to the key itself if even English is missing
    return value !== undefined ? value : key;
  };

  const l = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[currentLanguage] || field.en || Object.values(field)[0] || '';
  };

  return (
    <LanguageContext.Provider value={{ language: currentLanguage, setLanguage: setCurrentLanguage, currentLanguage, t, l, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
