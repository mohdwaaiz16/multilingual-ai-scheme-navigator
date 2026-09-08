import fs from 'fs';
import path from 'path';

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  if (!content.includes('import { useLanguage }')) {
    content = content.replace(/(import React.*?;\n)/, `$1import { useLanguage } from '../i18n/LanguageContext';\n`);
  }
  
  const componentMatch = content.match(/export default function (\w+)\(([^)]*)\) \{/);
  if (componentMatch && !content.includes('const { t, l } = useLanguage();') && !content.includes('const { t } = useLanguage();')) {
    content = content.replace(
      /export default function (\w+)\(([^)]*)\) \{/,
      `export default function $1($2) {\n  const { t, l } = useLanguage();`
    );
  } else if (!content.includes('const { t, l } = useLanguage();') && content.includes('const { t } = useLanguage();')) {
     content = content.replace('const { t } = useLanguage();', 'const { t, l } = useLanguage();');
  }
  
  replacements.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

// CategoryCard.jsx
replaceInFile('src/components/CategoryCard.jsx', [
  [/\{category\.name\}/g, '{l(category.name)}'],
  [/\{category\.description\}/g, '{l(category.description)}']
]);

// SchemeCard.jsx
replaceInFile('src/components/SchemeCard.jsx', [
  [/\{scheme\.schemeName\}/g, '{l(scheme.schemeName)}'],
  [/\{scheme\.description\}/g, '{l(scheme.description)}'],
  [/\{scheme\.governmentLevel\}/g, '{l(scheme.governmentLevel)}'],
  [/\{scheme\.stateCoverage\}/g, '{l(scheme.stateCoverage)}'],
  [/>\s*Key Benefits\s*</g, '>{t("scheme.benefits")}<'],
  [/\{benefit\}/g, '{l(benefit)}'],
  [/>\s*View Details\s*</g, '>{t("common.viewDetails")}<'],
  [/>\s*Apply Now\s*</g, '>{t("common.applyNow")}<']
]);

// Home.jsx
replaceInFile('src/pages/Home.jsx', [
  [/>\s*Popular Categories\s*</g, '>{t("home.popularCategories")}<'],
  [/>\s*Trending Schemes\s*</g, '>{t("home.trending")}<'],
  [/>\s*Browse All Schemes\s*</g, '>{t("home.browseAll")}<']
]);

// CategoryPage.jsx
replaceInFile('src/pages/CategoryPage.jsx', [
  [/\{category\.name\}/g, '{l(category.name)}'],
  [/\{category\.description\}/g, '{l(category.description)}'],
  [/>\s*Schemes in\s*</g, '>{t("navbar.schemes")} - <'],
  [/\{\s*filteredSchemes\.length\s*\}\s*schemes\s*found/g, '{filteredSchemes.length} schemes']
]);

// SchemeDetails.jsx
replaceInFile('src/pages/SchemeDetails.jsx', [
  [/\{scheme\.schemeName\}/g, '{l(scheme.schemeName)}'],
  [/\{scheme\.description\}/g, '{l(scheme.description)}'],
  [/>\s*Key Benefits\s*</g, '>{t("scheme.benefits")}<'],
  [/>\s*Eligibility Criteria\s*</g, '>{t("scheme.eligibility")}<'],
  [/>\s*Required Documents\s*</g, '>{t("scheme.requiredDocs")}<'],
  [/>\s*Application Process\s*</g, '>{t("scheme.applicationProcess")}<'],
  [/>\s*Apply Now\s*</g, '>{t("common.applyNow")}<'],
  [/>\s*Official Website\s*</g, '>{t("common.officialWebsite")}<'],
  [/>\s*Last Verified:\s*</g, '>{t("common.lastUpdated")}: <'],
  [/\{benefit\}/g, '{l(benefit)}'],
  [/\{doc\}/g, '{l(doc)}'],
  [/\{step\}/g, '{l(step)}'],
  [/\{condition\}/g, '{l(condition)}']
]);

console.log('Component updates finished.');
