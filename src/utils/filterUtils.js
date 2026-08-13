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
      if (aud === 'students' || aud === 'student') return content.includes('student') || content.includes('scholarship') || content.includes('education') || content.includes('school');
      if (aud === 'women' || aud === 'mother') return content.includes('women') || content.includes('mother') || content.includes('maternity');
      if (aud === 'business' || aud === 'entrepreneur' || aud === 'msme') return content.includes('business') || content.includes('enterprise') || content.includes('msme') || content.includes('loan') || content.includes('startup') || content.includes('vendor') || content.includes('artisan');
      if (aud === 'farmer') return content.includes('rural') || content.includes('gramin') || content.includes('agriculture') || content.includes('water') || content.includes('solar');
      if (aud === 'rural') return content.includes('rural') || content.includes('gramin') || content.includes('village');
      if (aud === 'youth' || aud === 'job seeker' || aud === 'unemployed') return content.includes('youth') || content.includes('skill') || content.includes('training') || content.includes('agnipath') || content.includes('employment');
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
 * Intelligent deterministic matching engine for SchemeSathi User Profile
 * Evaluates age, occupation, profile role, and income against the 20 schemes.
 */
export function calculateSchemeMatches(userProfile) {
  const { age, state, occupation, income, role, subDetails = {} } = userProfile;
  const ageNum = parseInt(age, 10) || 25;
  const occ = (occupation || '').toLowerCase();
  const r = (role || '').toLowerCase();
  const inc = (income || '').toLowerCase();

  const scoredSchemes = SCHEMES.map(scheme => {
    let score = 40; // baseline explore score
    let reasons = [];

    const name = scheme.schemeName.toLowerCase();
    const cat = scheme.category.toLowerCase();
    const elig = scheme.eligibilityCriteria.toLowerCase();
    const keywords = scheme.keywords || [];

    // --- Student / Education Match ---
    if (r === 'student' || occ === 'student') {
      if (scheme.id === 'csis') {
        score = 95;
        reasons.push("You indicated you are a student and may be pursuing technical/professional higher education with loan interest subsidy.");
      } else if (scheme.id === 'post-matric-scholarship') {
        score = 92;
        reasons.push("You are a student studying in post-matriculation courses and may be eligible for tuition fee and maintenance assistance.");
      } else if (scheme.id === 'pm-shri') {
        score = 80;
        reasons.push("Relevant to school-age students seeking admission in upgraded modern government schools.");
      } else if (scheme.id === 'pmkvy') {
        score = 75;
        reasons.push("Offers industry skill training and certification opportunities for students and youth.");
      }
    }

    // --- Entrepreneur / Business / Self-Employed Match ---
    if (r === 'entrepreneur' || occ === 'business owner' || occ === 'self-employed') {
      if (scheme.id === 'pmmy') {
        score = 94;
        reasons.push("You indicated business ownership/entrepreneurship and may qualify for collateral-free micro-enterprise loans up to ₹10 Lakh.");
      } else if (scheme.id === 'sisfs') {
        score = 92;
        reasons.push("Relevant to founders seeking early-stage seed funding and grants up to ₹20 Lakh for innovative startups.");
      } else if (scheme.id === 'pmegp') {
        score = 90;
        reasons.push("Offers 15%–35% margin money government subsidies for establishing new manufacturing or service micro-enterprises.");
      } else if (scheme.id === 'cgtmse') {
        score = 88;
        reasons.push("Provides institutional credit guarantee support for collateral-free business loans for micro and small enterprises.");
      } else if (scheme.id === 'stand-up-india') {
        score = 85;
        reasons.push("Offers bank loans from ₹10 Lakh to ₹1 Crore for greenfield enterprise founders.");
      } else if (scheme.id === 'pm-svanidhi') {
        score = 78;
        reasons.push("Provides collateral-free working capital micro-loans for street vendors and small merchants.");
      } else if (scheme.id === 'pm-vishwakarma') {
        score = 76;
        reasons.push("Offers toolkit incentives and low-interest credit for traditional artisans and craftspeople.");
      }
    }

    // --- Job Seeker / Youth / Unemployed Match ---
    if (r === 'job seeker' || occ === 'unemployed') {
      if (scheme.id === 'pmkvy') {
        score = 94;
        reasons.push("You are seeking employment or skill enhancement and may receive free government-certified vocational skill training.");
      } else if (scheme.id === 'agnipath' && ageNum >= 17 && ageNum <= 21) {
        score = 92;
        reasons.push("Your age falls in the 17.5–21 range for the 4-year Armed Forces service tenure with remuneration and Seva Nidhi.");
      } else if (scheme.id === 'pmegp') {
        score = 86;
        reasons.push("Provides credit-linked subsidies to help unemployed individuals launch self-employed micro-enterprises.");
      }
    }

    // --- Farmer / Rural Household Match ---
    if (r === 'farmer' || occ === 'farmer') {
      if (scheme.id === 'pmay-g') {
        score = 90;
        reasons.push("Relevant to rural families seeking financial assistance (₹1.20L–₹1.30L) for pucca house construction.");
      } else if (scheme.id === 'jal-jeevan-mission') {
        score = 88;
        reasons.push("Covers rural households with functional tap drinking water connections.");
      } else if (scheme.id === 'pm-surya-ghar') {
        score = 85;
        reasons.push("Provides central subsidies for installing rooftop solar systems to reduce household electricity expenses.");
      }
    }

    // --- Universal Welfare Schemes (Health, Clean Fuel, Solar, Housing) ---
    if (scheme.id === 'pm-jay' && score < 85) {
      score = inc.includes('below') || inc.includes('1–3') ? 88 : 70;
      reasons.push("Offers health coverage up to ₹5 Lakh per family per year for secondary and tertiary hospital care based on vulnerability criteria.");
    }

    if (scheme.id === 'pm-surya-ghar' && score < 80) {
      score = 82;
      reasons.push("Open to residential households with suitable rooftop space to obtain solar subsidies and up to 300 units of free electricity.");
    }

    if (scheme.id === 'pmuy' && (occ === 'homemaker' || inc.includes('below') || inc.includes('1–3'))) {
      score = 84;
      reasons.push("Provides deposit-free LPG gas connections and refill assistance for women in eligible households.");
    }

    if (scheme.id === 'pmay-u' && (inc.includes('below') || inc.includes('1–3') || inc.includes('3–5') || inc.includes('5–10'))) {
      if (score < 80) {
        score = 80;
        reasons.push("Provides interest subsidies on home loans and construction assistance for eligible urban families without a pucca house.");
      }
    }

    // Fallback reason if none assigned
    if (reasons.length === 0) {
      reasons.push(`This scheme in the ${scheme.category} category may be explored based on your general profile.`);
    }

    // Determine match classification
    let matchLevel = 'explore';
    let matchLabel = 'Explore';
    let matchColor = 'slate';

    if (score >= 90) {
      matchLevel = 'high';
      matchLabel = 'High Match';
      matchColor = 'emerald';
    } else if (score >= 60) {
      matchLevel = 'possible';
      matchLabel = 'Possible Match';
      matchColor = 'amber';
    }

    return {
      ...scheme,
      matchScore: score,
      matchLevel,
      matchLabel,
      matchColor,
      whyItMatches: reasons[0]
    };
  });

  // Sort by match score descending
  return scoredSchemes.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Intelligent prototype matching for SchemeSathi AI Assistant
 */
export function findMatchingSchemesForAssistant(userInput) {
  const q = userInput.toLowerCase();
  
  const scored = SCHEMES.map(scheme => {
    let score = 0;
    const keywords = scheme.keywords || [];
    const name = scheme.schemeName.toLowerCase();
    const cat = scheme.category.toLowerCase();
    const desc = scheme.description.toLowerCase();
    const elig = scheme.eligibilityCriteria.toLowerCase();
    const ben = scheme.keyBenefits.toLowerCase();

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

  const matching = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.scheme);

  return matching;
}
