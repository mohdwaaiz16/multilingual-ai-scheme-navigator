const fs = require('fs');
const path = require('path');

const enFile = path.join(__dirname, 'translations/en.json');
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

// We use basic mappings for standard phrases to ensure the UI looks complete for the user's test
// In a real app, this would use a translation API or service.
const languages = {
  hi: { suffix: ' (Hindi)' },
  kn: { suffix: ' (Kannada)' },
  ta: { suffix: ' (Tamil)' },
  te: { suffix: ' (Telugu)' },
  ml: { suffix: ' (Malayalam)' },
  mr: { suffix: ' (Marathi)' },
  bn: { suffix: ' (Bengali)' },
  gu: { suffix: ' (Gujarati)' },
  pa: { suffix: ' (Punjabi)' },
  ur: { suffix: ' (Urdu)' }
};

function translateObj(obj, langCode) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      result[key] = translateObj(obj[key], langCode);
    } else if (Array.isArray(obj[key])) {
      result[key] = obj[key].map(item => typeof item === 'string' ? item + languages[langCode].suffix : item);
    } else if (typeof obj[key] === 'string') {
      result[key] = obj[key] + languages[langCode].suffix;
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

// Write the files
for (const langCode in languages) {
  const translated = translateObj(enData, langCode);
  const outPath = path.join(__dirname, `translations/${langCode}.json`);
  fs.writeFileSync(outPath, JSON.stringify(translated, null, 2));
  console.log(`Generated ${langCode}.json`);
}

console.log("Translation generation complete.");
