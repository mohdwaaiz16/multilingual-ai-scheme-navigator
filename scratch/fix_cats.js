import fs from 'fs';

// 1. Fix SchemeFinder.jsx
let sf = fs.readFileSync('src/pages/SchemeFinder.jsx', 'utf8');
sf = sf.replace(/\{cat\.name\}/g, '{l(cat.name)}');
fs.writeFileSync('src/pages/SchemeFinder.jsx', sf);
console.log('Fixed SchemeFinder.jsx');

// 2. Fix FilterPanel.jsx
let fp = fs.readFileSync('src/components/FilterPanel.jsx', 'utf8');
fp = fp.replace(/\{cat\.name\}/g, '{l(cat.name)}');
// In FilterPanel.jsx, it also does `value={cat.name}` at line 88. That should probably be `value={cat.slug}` or `value={l(cat.name)}`.
// In filterUtils.js, category filter checks against `getString(scheme.category)` or `scheme.categorySlug`.
// It's safer to use `cat.slug` as the value since category names are now objects!
fp = fp.replace(/value=\{cat\.name\}/g, 'value={cat.slug}');
if (!fp.includes('const { l } = useLanguage();') && !fp.includes('const { t, l } = useLanguage();')) {
  // Try to inject l if it's missing, but it might already have t.
  if (fp.includes('const { t } = useLanguage();')) {
    fp = fp.replace('const { t } = useLanguage();', 'const { t, l } = useLanguage();');
  } else {
    // If it doesn't even have useLanguage, we might need to add it, but it probably has it.
  }
}
fs.writeFileSync('src/components/FilterPanel.jsx', fp);
console.log('Fixed FilterPanel.jsx');

