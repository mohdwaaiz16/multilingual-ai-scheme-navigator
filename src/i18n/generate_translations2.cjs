const fs = require('fs');
const path = require('path');

const enFile = path.join(__dirname, 'translations/en.json');
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

// Import old translations
import('./translations.js').then(m => {
  const oldTranslations = m.translations;
  const languages = {
    hi: { name: 'Hindi' },
    kn: { name: 'Kannada' },
    ta: { name: 'Tamil' },
    te: { name: 'Telugu' },
    ml: { name: 'Malayalam' },
    mr: { name: 'Marathi' },
    bn: { name: 'Bengali' },
    gu: { name: 'Gujarati' },
    pa: { name: 'Punjabi' },
    ur: { name: 'Urdu' }
  };

  function mergeTranslations(baseObj, oldObj, langName) {
    const result = {};
    for (const key in baseObj) {
      if (typeof baseObj[key] === 'object' && !Array.isArray(baseObj[key])) {
        result[key] = mergeTranslations(baseObj[key], (oldObj && oldObj[key]) || {}, langName);
      } else if (Array.isArray(baseObj[key])) {
        if (oldObj && Array.isArray(oldObj[key]) && oldObj[key].length === baseObj[key].length) {
          result[key] = oldObj[key];
        } else {
          result[key] = baseObj[key].map(item => item + ` (${langName})`);
        }
      } else {
        if (oldObj && oldObj[key] !== undefined && oldObj[key] !== '') {
          result[key] = oldObj[key];
        } else {
          result[key] = baseObj[key] + ` (${langName})`;
        }
      }
    }
    return result;
  }

  for (const langCode in languages) {
    const langName = languages[langCode].name;
    const oldObj = oldTranslations[langCode] || {};
    const merged = mergeTranslations(enData, oldObj, langName);
    
    fs.writeFileSync(
      path.join(__dirname, `translations/${langCode}.json`),
      JSON.stringify(merged, null, 2)
    );
    console.log(`Generated ${langCode}.json`);
  }
}).catch(console.error);
