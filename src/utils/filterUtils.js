import { SCHEMES } from '../data/schemes';

/**
 * Filter and search schemes with multi-criteria support
 */
export function filterSchemes({
  query = '',
  category = 'all',
  type = 'all',
  targetAudience = 'all',
  sortBy = 'relevance'
}) {
  let results = [...SCHEMES];

  // 1. Text Query Filter
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    results = results.filter(scheme => {
      const inName = scheme.schemeName.toLowerCase().includes(q);
      const inCategory = scheme.category.toLowerCase().includes(q);
      const inDesc = scheme.description.toLowerCase().includes(q);
      const inEligibility = scheme.eligibilityCriteria.toLowerCase().includes(q);
      const inBenefits = scheme.keyBenefits.toLowerCase().includes(q);
      const inKeywords = scheme.keywords.some(k => k.toLowerCase().includes(q));
      return inName || inCategory || inDesc || inEligibility || inBenefits || inKeywords;
    });
  }

  // 2. Category Filter
  if (category && category !== 'all') {
    results = results.filter(scheme => 
      scheme.category.toLowerCase() === category.toLowerCase()
    );
  }

  // 3. Scheme Type Filter
  if (type && type !== 'all') {
    results = results.filter(scheme => 
      scheme.type.toLowerCase() === type.toLowerCase()
    );
  }

  // 4. Beneficiary / Target Audience Filter
  if (targetAudience && targetAudience !== 'all') {
    const aud = targetAudience.toLowerCase();
    results = results.filter(scheme => {
      const content = `${scheme.schemeName} ${scheme.category} ${scheme.eligibilityCriteria} ${scheme.keywords.join(' ')}`.toLowerCase();
      if (aud === 'women') return content.includes('women') || content.includes('mother') || content.includes('maternity');
      if (aud === 'students') return content.includes('student') || content.includes('scholarship') || content.includes('education') || content.includes('school');
      if (aud === 'business') return content.includes('business') || content.includes('enterprise') || content.includes('msme') || content.includes('loan') || content.includes('startup') || content.includes('vendor');
      if (aud === 'rural') return content.includes('rural') || content.includes('gramin') || content.includes('village');
      if (aud === 'youth') return content.includes('youth') || content.includes('skill') || content.includes('training') || content.includes('agnipath');
      return true;
    });
  }

  // 5. Sorting
  if (sortBy === 'name-asc') {
    results.sort((a, b) => a.schemeName.localeCompare(b.schemeName));
  } else if (sortBy === 'name-desc') {
    results.sort((a, b) => b.schemeName.localeCompare(a.schemeName));
  } else if (sortBy === 'category') {
    results.sort((a, b) => a.category.localeCompare(b.category));
  }

  return results;
}

/**
 * Intelligent prototype matching for AI Assistant
 */
export function findMatchingSchemesForAssistant(userInput) {
  const q = userInput.toLowerCase();
  
  // Keyword scoring map
  const scored = SCHEMES.map(scheme => {
    let score = 0;
    const keywords = scheme.keywords || [];
    const name = scheme.schemeName.toLowerCase();
    const cat = scheme.category.toLowerCase();
    const desc = scheme.description.toLowerCase();
    const elig = scheme.eligibilityCriteria.toLowerCase();
    const ben = scheme.keyBenefits.toLowerCase();

    // Check words in user query
    const words = q.split(/\s+/).filter(w => w.length > 2);
    words.forEach(word => {
      if (name.includes(word)) score += 5;
      if (cat.includes(word)) score += 4;
      if (keywords.some(k => k.includes(word))) score += 3;
      if (desc.includes(word)) score += 2;
      if (elig.includes(word)) score += 2;
      if (ben.includes(word)) score += 2;
    });

    return { scheme, score };
  });

  // Sort by score descending and filter positive scores
  const matching = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.scheme);

  return matching;
}
