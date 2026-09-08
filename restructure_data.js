import fs from 'fs';

// Helper for extracting arrays
const extractArray = (content, regex) => {
  const match = content.match(regex);
  if (match) {
    // Basic eval since this is a local script on our own data
    return eval(match[1]);
  }
  return null;
}

// Restructure categories.js
const catContent = fs.readFileSync('src/data/categories.js', 'utf8');
const catMatch = catContent.match(/export const CATEGORIES = (\[[\s\S]*?\]);/);
if (catMatch) {
  let categories = eval(catMatch[1]);
  categories = categories.map(cat => ({
    ...cat,
    name: { en: cat.name },
    description: { en: cat.description }
  }));
  const newCatContent = catContent.replace(
    catMatch[1],
    JSON.stringify(categories, null, 2)
  );
  fs.writeFileSync('src/data/categories.js', newCatContent);
  console.log("categories.js updated");
}

// Restructure schemes.js
const schemesContent = fs.readFileSync('src/data/schemes.js', 'utf8');
const schemesMatch = schemesContent.match(/export const SCHEMES = (\[[\s\S]*?\]);/);
if (schemesMatch) {
  let schemes = eval(schemesMatch[1]);
  schemes = schemes.map(scheme => {
    return {
      ...scheme,
      schemeName: { en: scheme.schemeName },
      description: { en: scheme.description },
      whyStarted: scheme.whyStarted ? { en: scheme.whyStarted } : undefined,
      whoCanBenefit: scheme.whoCanBenefit ? { en: scheme.whoCanBenefit } : undefined,
      howItWorks: scheme.howItWorks ? { en: scheme.howItWorks } : undefined,
      governmentSupport: scheme.governmentSupport ? { en: scheme.governmentSupport } : undefined,
      keyBenefits: scheme.keyBenefits ? { en: scheme.keyBenefits } : undefined,
      benefits: scheme.benefits ? scheme.benefits.map(b => typeof b === 'string' ? { en: b } : b) : undefined,
      importantConditions: scheme.importantConditions ? scheme.importantConditions.map(c => typeof c === 'string' ? { en: c } : c) : undefined,
      eligibilityCriteria: scheme.eligibilityCriteria ? { en: scheme.eligibilityCriteria } : undefined,
      ageLimit: scheme.ageLimit ? { en: scheme.ageLimit } : undefined,
      incomeLimit: scheme.incomeLimit ? { en: scheme.incomeLimit } : undefined,
      requiredDocuments: scheme.requiredDocuments ? scheme.requiredDocuments.map(d => typeof d === 'string' ? { en: d } : d) : undefined,
      applicationProcess: scheme.applicationProcess ? scheme.applicationProcess.map(a => typeof a === 'string' ? { en: a } : a) : undefined
    };
  });
  const newSchemesContent = schemesContent.replace(
    schemesMatch[1],
    JSON.stringify(schemes, null, 2)
  );
  fs.writeFileSync('src/data/schemes.js', newSchemesContent);
  console.log("schemes.js updated");
}
console.log("Restructuring complete.");
