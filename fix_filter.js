import fs from 'fs';

let content = fs.readFileSync('src/utils/filterUtils.js', 'utf8');
content = content.replace(/import \{ CATEGORIES \} from '\.\.\/data\/categories\.js';/, `import { CATEGORIES } from '../data/categories.js';\n\nconst getString = (field) => {\n  if (!field) return '';\n  if (typeof field === 'string') return field;\n  return field.en || Object.values(field)[0] || '';\n};`);

// Replace scheme.xxx with getString(scheme.xxx)
const fieldsToReplace = [
  'schemeName', 'category', 'subcategory', 'description', 'whyStarted',
  'whoCanBenefit', 'howItWorks', 'eligibilityCriteria', 'keyBenefits',
  'implementingMinistry'
];

fieldsToReplace.forEach(field => {
  const regex = new RegExp(`scheme\\.${field}`, 'g');
  content = content.replace(regex, `getString(scheme.${field})`);
});

fs.writeFileSync('src/utils/filterUtils.js', content);
console.log('Fixed filterUtils.js');

let catCard = fs.readFileSync('src/components/CategoryCard.jsx', 'utf8');
catCard = catCard.replace(/encodeURIComponent\(category\.name\)/g, 'encodeURIComponent(category.slug)');
fs.writeFileSync('src/components/CategoryCard.jsx', catCard);
console.log('Fixed CategoryCard.jsx');

