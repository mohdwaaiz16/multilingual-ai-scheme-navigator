import { SCHEMES, ALL_CATEGORY_SCHEMES } from '../data/schemes.js';
import { CATEGORIES } from '../data/categories.js';

const getString = (field) => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field.en || Object.values(field)[0] || '';
};

/**
 * Filter and search schemes across all 70 schemes with multi-criteria support
 */
export function filterSchemes({
  query = '',
  category = 'all',
  subcategory = 'all',
  governmentLevel = 'all',
  status = 'all',
  targetAudience = 'all',
  sortBy = 'relevance'
}) {
  let results = [...SCHEMES];

  // 1. Text Query Filter across all rich fields
  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    results = results.filter(scheme => {
      const inName = (getString(scheme.schemeName) || '').toLowerCase().includes(q);
      const inCategory = (getString(scheme.category) || '').toLowerCase().includes(q);
      const inSubcat = (getString(scheme.subcategory) || '').toLowerCase().includes(q);
      const inDesc = (getString(scheme.description) || '').toLowerCase().includes(q);
      const inWhy = (getString(scheme.whyStarted) || '').toLowerCase().includes(q);
      const inWho = (getString(scheme.whoCanBenefit) || '').toLowerCase().includes(q);
      const inHow = (getString(scheme.howItWorks) || '').toLowerCase().includes(q);
      const inEligibility = (getString(scheme.eligibilityCriteria) || '').toLowerCase().includes(q);
      const inBenefits = (getString(scheme.keyBenefits) || '').toLowerCase().includes(q);
      const inMinistry = (getString(scheme.implementingMinistry) || '').toLowerCase().includes(q);
      const inKeywords = (scheme.keywords || []).some(k => k.toLowerCase().includes(q));
      return inName || inCategory || inSubcat || inDesc || inWhy || inWho || inHow || inEligibility || inBenefits || inMinistry || inKeywords;
    });
  }

  // 2. Category Filter (checks both primary category and category membership array)
  if (category && category !== 'all') {
    const catLower = category.toLowerCase();
    results = results.filter(scheme => {
      const primaryMatch = (getString(scheme.category) || '').toLowerCase() === catLower || (scheme.categorySlug || '').toLowerCase() === catLower;
      const arrayMatch = (scheme.categories || []).some(c => c.toLowerCase() === catLower);
      return primaryMatch || arrayMatch;
    });
  }

  // 3. Subcategory Filter
  if (subcategory && subcategory !== 'all') {
    results = results.filter(scheme => 
      (getString(scheme.subcategory) || '').toLowerCase() === subcategory.toLowerCase()
    );
  }

  // 4. Government Level Filter
  if (governmentLevel && governmentLevel !== 'all') {
    results = results.filter(scheme => 
      (scheme.governmentLevel || '').toLowerCase().includes(governmentLevel.toLowerCase())
    );
  }

  // 5. Status Filter
  if (status && status !== 'all') {
    results = results.filter(scheme => 
      (scheme.status || '').toLowerCase().includes(status.toLowerCase())
    );
  }

  // 6. Beneficiary / Target Audience Filter
  if (targetAudience && targetAudience !== 'all') {
    const aud = targetAudience.toLowerCase();
    results = results.filter(scheme => {
      const content = `${getString(scheme.schemeName)} ${getString(scheme.category)} ${getString(scheme.subcategory)} ${getString(scheme.whoCanBenefit)} ${getString(scheme.eligibilityCriteria)} ${(scheme.keywords || []).join(' ')}`.toLowerCase();
      if (aud === 'students' || aud === 'student') return content.includes('student') || content.includes('scholarship') || content.includes('education') || content.includes('school') || content.includes('college');
      if (aud === 'women' || aud === 'mother') return content.includes('women') || content.includes('mother') || content.includes('maternity') || content.includes('girl');
      if (aud === 'business' || aud === 'entrepreneur' || aud === 'msme') return content.includes('business') || content.includes('enterprise') || content.includes('msme') || content.includes('loan') || content.includes('startup') || content.includes('vendor') || content.includes('artisan');
      if (aud === 'farmer') return content.includes('farmer') || content.includes('agriculture') || content.includes('kisan') || content.includes('crop') || content.includes('rural');
      if (aud === 'employee' || aud === 'government employee') return content.includes('employee') || content.includes('pension') || content.includes('cghs') || content.includes('gpf') || content.includes('nps');
      if (aud === 'senior citizen' || aud === 'pensioner') return content.includes('pension') || content.includes('senior citizen') || content.includes('old age') || content.includes('vayoshri');
      if (aud === 'youth' || aud === 'job seeker' || aud === 'unemployed') return content.includes('youth') || content.includes('skill') || content.includes('training') || content.includes('internship') || content.includes('apprenticeship');
      return true;
    });
  }

  // 7. Sorting
  if (sortBy === 'name-asc') {
    results.sort((a, b) => (a.schemeName || '').localeCompare(b.schemeName || ''));
  } else if (sortBy === 'name-desc') {
    results.sort((a, b) => (b.schemeName || '').localeCompare(a.schemeName || ''));
  } else if (sortBy === 'category') {
    results.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
  }

  return results;
}

/**
 * Get the 7 schemes belonging to a specific category slug
 */
export function getSchemesForCategory(categorySlug) {
  const slugLower = categorySlug.toLowerCase();
  return ALL_CATEGORY_SCHEMES.filter(s => s.categorySlug.toLowerCase() === slugLower);
}

/**
 * Intelligent deterministic matching engine for SchemeSathi across all 70 schemes
 */
export function calculateSchemeMatches(userProfile) {
  const { age, state, occupation, income, role, subDetails = {} } = userProfile;
  const ageNum = parseInt(age, 10) || 25;
  const occ = (occupation || '').toLowerCase();
  const r = (role || '').toLowerCase();
  const inc = (income || '').toLowerCase();

  const isLowIncome = inc.includes('below') || inc.includes('1–3') || inc.includes('3–5');

  const scoredSchemes = SCHEMES.map(scheme => {
    let score = 35; // Baseline explore score
    let reasons = [];

    const name = (getString(scheme.schemeName) || '').toLowerCase();
    const cat = (getString(scheme.category) || '').toLowerCase();
    const subcat = (getString(scheme.subcategory) || '').toLowerCase();
    const elig = (getString(scheme.eligibilityCriteria) || '').toLowerCase();
    const who = (getString(scheme.whoCanBenefit) || '').toLowerCase();
    const id = scheme.id;

    // --- 1. Student / Education / Scholarship Matching ---
    if (r === 'student' || occ === 'student') {
      if (cat.includes('education') || subcat.includes('scholarship') || elig.includes('student')) {
        score = 90;
        if (id === 'pm-vidyalaxmi') {
          score = 96;
          reasons.push("You are a student seeking higher education and may qualify for collateral-free, guarantor-free education loans with 3% interest subvention.");
        } else if (id === 'pm-usp-csss') {
          score = 94;
          reasons.push("As a college/university student scoring above the 80th percentile in Class 12 with family income under ₹4.5 Lakh, you may receive annual scholarship support.");
        } else if (id === 'pm-yasasvi' || id === 'pm-yasasvi-scholarship') {
          score = 93;
          reasons.push("Provides Top Class School & College scholarships (₹75,000–₹1,25,000/yr) for OBC, EBC, and DNT students.");
        } else if (id === 'pms-sc') {
          score = 92;
          reasons.push("Covers full non-refundable tuition fees and maintenance allowance for post-matric higher education.");
        } else if (id === 'nmmss') {
          score = 88;
          reasons.push("Provides ₹12,000 per annum merit scholarships for secondary school students.");
        } else if (id === 'aicte-pragati-scholarship') {
          score = 87;
          reasons.push("Offers ₹50,000 per annum scholarship assistance for girl students entering technical degree/diploma courses.");
        } else if (id === 'begum-hazrat-mahal-scholarship') {
          score = 86;
          reasons.push("Provides financial scholarship assistance for meritorious minority girl students in classes 9 to 12.");
        } else {
          score = 85;
          reasons.push(`This scheme under ${getString(scheme.category)} provides structured education assistance and student support.`);
        }
      }
    }

    // --- 2. Farmer / Agriculture Matching ---
    if (r === 'farmer' || occ === 'farmer') {
      if (id === 'kisan-credit-card') {
        score = 96;
        reasons.push("As a farmer/agricultural producer, you can access hassle-free crop credit up to ₹3 Lakh at an effective 4% subsidized interest rate.");
      } else if (id === 'pmfby') {
        score = 95;
        reasons.push("Provides comprehensive crop insurance against non-preventable natural risks at minimal premium rates (1.5%–2%).");
      } else if (id === 'vcas') {
        score = 88;
        reasons.push("Offers interest-free venture capital assistance up to ₹50 Lakh for farmer-producer agri-business projects.");
      } else if (cat.includes('food') || subcat.includes('food') || cat.includes('loans')) {
        score = 80;
        reasons.push("Supports rural and farming households with subsidized food security and institutional credit facilities.");
      }
    }

    // --- 3. Entrepreneur / Business Owner / Self-Employed Matching ---
    if (r === 'entrepreneur' || occ === 'business owner' || occ === 'self-employed') {
      if (cat.includes('business') || cat.includes('loans') || subcat.includes('credit') || subcat.includes('startup')) {
        if (id === 'pmmy') {
          score = 96;
          reasons.push("You indicated business ownership/entrepreneurship and can apply for collateral-free micro-enterprise loans up to ₹10 Lakh (Shishu, Kishore, Tarun).");
        } else if (id === 'sisfs') {
          score = 95;
          reasons.push("Offers up to ₹20 Lakh in grants and ₹50 Lakh in debt/convertible debentures for DPIIT-recognized early-stage startups.");
        } else if (id === 'pmegp') {
          score = 94;
          reasons.push("Provides 15%–35% margin money government subsidies for setting up new manufacturing (up to ₹50L) or service (up to ₹20L) units.");
        } else if (id === 'cgtmse') {
          score = 92;
          reasons.push("Provides institutional credit guarantee coverage up to ₹5 Crore for collateral-free MSME bank loans.");
        } else if (id === 'stand-up-india') {
          score = 90;
          reasons.push("Facilitates bank loans from ₹10 Lakh to ₹1 Crore for SC/ST and Women greenfield entrepreneurs.");
        } else if (id === 'pm-svanidhi') {
          score = 88;
          reasons.push("Provides collateral-free working capital micro-loans (₹10k, ₹20k, ₹50k) with 7% interest subsidy for street vendors.");
        } else if (id === 'pm-vishwakarma') {
          score = 87;
          reasons.push("Provides ₹15,000 modern toolkit incentives and collateral-free credit at 5% interest for traditional artisans & craftspeople.");
        }
      }
    }

    // --- 4. Job Seeker / Youth / Skill Training Matching ---
    if (r === 'job seeker' || occ === 'unemployed') {
      if (id === 'pmkvy') {
        score = 96;
        reasons.push("You are seeking employment or skill enhancement and can access free government-certified industry skill training and stipend support.");
      } else if (id === 'pm-internship') {
        score = 95;
        reasons.push("Offers 12-month internship opportunities in top 500 companies with ₹5,000/month stipend and ₹6,000 one-time grant for youth aged 21–24.");
      } else if (id === 'naps') {
        score = 93;
        reasons.push("Provides on-the-job apprenticeship training with 25% stipend support directly reimbursed by the Central Government.");
      } else if (id === 'ddu-gky') {
        score = 90;
        reasons.push("Placement-linked skill training guaranteeing at least 70% job placement for rural youth.");
      } else if (id === 'mgnregs') {
        score = 88;
        reasons.push("Guarantees at least 100 days of wage employment per financial year for adult members in rural households.");
      } else if (id === 'national-youth-corps') {
        score = 85;
        reasons.push("Engages youth aged 18–29 as volunteers with monthly honorarium of ₹5,000 for national development initiatives.");
      }
    }

    // --- 5. Government Employee & Pension Matching ---
    if (r === 'employee' || occ === 'employee') {
      if (cat.includes('government employees') || subcat.includes('pension')) {
        if (id === 'unified-pension-scheme') {
          score = 95;
          reasons.push("Assures a guaranteed pension of 50% of average basic pay for central government employees with 25+ years of service.");
        } else if (id === 'cghs') {
          score = 94;
          reasons.push("Provides comprehensive cashless outpatient and inpatient medical care for central government employees and pensioners.");
        } else if (id === 'nps-government-sector') {
          score = 92;
          reasons.push("Defines pension wealth accumulation with a 14% matching employer contribution by the Central Government.");
        } else if (id === 'house-building-advance') {
          score = 90;
          reasons.push("Offers simple-interest advances up to ₹25 Lakh for permanent government employees constructing or purchasing a house.");
        } else if (id === 'gpf-central-services') {
          score = 88;
          reasons.push("Offers tax-exempt provident fund savings with guaranteed government interest returns.");
        }
      }
    }

    // --- 6. Low Income & Universal Social Security Schemes ---
    if (isLowIncome) {
      if (id === 'pmgkay') {
        score = Math.max(score, 94);
        reasons.push("Provides completely free 5 kg food grains per person per month (35 kg for AAY families) under the National Food Security Act.");
      } else if (id === 'pm-jay') {
        score = Math.max(score, 93);
        reasons.push("Offers cashless health cover up to ₹5 Lakh per family per year for secondary and tertiary hospitalization.");
      } else if (id === 'tpds-nfsa' || id === 'aay') {
        score = Math.max(score, 92);
        reasons.push("Guarantees highly subsidized or free essential food grains to ensure basic nutritional security.");
      } else if (id === 'pm-sym') {
        score = Math.max(score, 90);
        reasons.push("Offers a guaranteed monthly pension of ₹3,000 after age 60 for unorganized workers earning under ₹15,000/month.");
      } else if (id === 'pmjdy') {
        score = Math.max(score, 88);
        reasons.push("Provides zero-balance savings bank accounts with free RuPay debit card and ₹2 Lakh inbuilt accident insurance.");
      } else if (id === 'pm-daksh') {
        score = Math.max(score, 87);
        reasons.push("Free skill development training with stipend support for SC, OBC, EBC, DNT, and sanitation worker youth.");
      }
    }

    // --- 7. Senior Citizen / Old Age Pension Matching ---
    if (ageNum >= 60) {
      if (id === 'ignoaps') {
        score = 95;
        reasons.push("Provides monthly non-contributory old age pensions for BPL senior citizens aged 60 and above.");
      } else if (id === 'rashtriya-vayoshri-yojana') {
        score = 94;
        reasons.push("Provides free physical assistive aids and living devices (wheelchairs, hearing aids, spectacles) for senior citizens.");
      } else if (id === 'cghs' || id === 'pm-jay') {
        score = Math.max(score, 92);
        reasons.push("Comprehensive healthcare coverage protecting against senior citizen medical and hospitalization costs.");
      }
    }

    // Fallback reason
    if (reasons.length === 0) {
      reasons.push(`This welfare scheme under ${getString(scheme.category)} may be explored based on your profile criteria.`);
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

  return scoredSchemes.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Intelligent prototype matching for SchemeSathi AI Assistant across all 70 schemes
 */
export function findMatchingSchemesForAssistant(userInput) {
  const q = userInput.toLowerCase();
  
  const scored = SCHEMES.map(scheme => {
    let score = 0;
    const keywords = scheme.keywords || [];
    const name = (getString(scheme.schemeName) || '').toLowerCase();
    const cat = (getString(scheme.category) || '').toLowerCase();
    const subcat = (getString(scheme.subcategory) || '').toLowerCase();
    const desc = (getString(scheme.description) || '').toLowerCase();
    const elig = (getString(scheme.eligibilityCriteria) || '').toLowerCase();
    const ben = (getString(scheme.keyBenefits) || '').toLowerCase();
    const who = (getString(scheme.whoCanBenefit) || '').toLowerCase();

    const words = q.split(/[\s\-\,\.\?\!]+/).filter(w => w.length > 2);
    words.forEach(word => {
      if (name.includes(word)) score += 6;
      if (cat.includes(word)) score += 4;
      if (subcat.includes(word)) score += 3;
      if (keywords.some(k => k.includes(word))) score += 3;
      if (who.includes(word)) score += 2;
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
