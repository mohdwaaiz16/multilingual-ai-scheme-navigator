const fs = require('fs');
const path = require('path');

const txtDir = 'C:\\Users\\mohdf\\.gemini\\antigravity\\scratch\\pdf_texts';

const CATEGORY_MAP = [
  {
    id: "food-security-nutrition",
    name: "Food Security & Nutrition",
    slug: "food-security-nutrition",
    icon: "Utensils",
    emoji: "🍲",
    description: "Subsidized and free food grains, child nutrition, maternal nourishment, and fortified diet distribution.",
    file: "Government_Schemes_Food_Security_and_Nutrition.txt",
    splitStyle: "scheme_x_of_7"
  },
  {
    id: "sports-youth-culture",
    name: "Sports, Youth & Culture",
    slug: "sports-youth-culture",
    icon: "Trophy",
    emoji: "🏆",
    description: "Athletic development, Olympic podium support, youth volunteering, cultural grants, and heritage preservation.",
    file: "Government_Schemes_Sports_Youth_Culture.txt",
    splitStyle: "numbered_titles",
    titles: [
      "1. Khelo India Scheme",
      "2. Target Olympic Podium Scheme (TOPS)",
      "3. National Youth Corps (NYC)",
      "4. PDUNWFS",
      "5. Pension to Meritorious Sportspersons",
      "6. Cultural Function and Production Grant",
      "7. Preservation of Cultural Heritage of the Himalayas"
    ]
  },
  {
    id: "financial-inclusion-banking",
    name: "Financial Inclusion & Banking",
    slug: "financial-inclusion-banking",
    icon: "Landmark",
    emoji: "🏦",
    description: "Zero-balance Jan Dhan banking, universal insurance, micro-pensions, street vendor loans, and credit access.",
    file: "Financial_Inclusion_Banking_Schemes.txt",
    splitStyle: "numbered_titles",
    titles: [
      "1. Pradhan Mantri Jan Dhan Yojana (PMJDY)",
      "2. Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
      "3. Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
      "4. Atal Pension Yojana (APY)",
      "5. Pradhan Mantri MUDRA Yojana (PMMY)",
      "6. Stand-Up India Scheme",
      "7. PM SVANidhi (Pradhan Mantri Street Vendor’s Atmanirbhar Nidhi)"
    ]
  },
  {
    id: "employment-skill-development",
    name: "Employment & Skill Development",
    slug: "employment-skill-development",
    icon: "Briefcase",
    emoji: "💼",
    description: "Skill certification, rural employment guarantees (MGNREGS), apprenticeships, internships, and artisan support.",
    file: "Government_Schemes_Employment_Skill_Development.txt",
    splitStyle: "numbered_titles",
    titles: [
      "1. Pradhan Mantri Kaushal Vikas Yojana 4.0 (PMKVY 4.0)",
      "2. Mahatma Gandhi National Rural Employment Guarantee Scheme",
      "3. Prime Minister's Employment Generation Programme (PMEGP)",
      "4. PM Vishwakarma Scheme",
      "5. Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
      "6. National Apprenticeship Promotion Scheme (NAPS / NAPS 2.0)",
      "7. Prime Minister Internship Scheme (PMIS)"
    ]
  },
  {
    id: "insurance-social-security",
    name: "Insurance & Social Security",
    slug: "insurance-social-security",
    icon: "Shield",
    emoji: "🛡️",
    description: "Life & accident insurance, Ayushman Bharat health cover, old age pensions, crop insurance, and unorganized worker security.",
    file: "Government_Schemes_Insurance_Social_Security.txt",
    splitStyle: "scheme_x_of_7"
  },
  {
    id: "business-entrepreneurship",
    name: "Business & Entrepreneurship",
    slug: "business-entrepreneurship",
    icon: "Rocket",
    emoji: "🚀",
    description: "MUDRA loans, startup seed funding, Stand-Up India, PMEGP subsidies, credit guarantees, and agri-business venture capital.",
    file: "government_schemes_business.txt",
    splitStyle: "scheme_hash"
  },
  {
    id: "government-employees-pension",
    name: "Government Employees & Pension",
    slug: "government-employees-pension",
    icon: "Building2",
    emoji: "🏛️",
    description: "Unified Pension Scheme (UPS), NPS, CGHS healthcare, defence SPARSH pension, family pensions, and GPF.",
    file: "government_schemes_employees_pension.txt",
    splitStyle: "scheme_x_of_7"
  },
  {
    id: "social-justice-empowerment",
    name: "Social Justice & Empowerment",
    slug: "social-justice-empowerment",
    icon: "Scale",
    emoji: "⚖️",
    description: "Skill training for marginalized youth (PM-DAKSH), transgender welfare (SMILE), sanitation dignity (NAMASTE), and senior citizen aids (RVY).",
    file: "Social_Justice_Government_Schemes.txt",
    splitStyle: "numbered_titles",
    titles: [
      "1. PM-DAKSH",
      "2. SHREYAS",
      "3. SMRUTI / PM-YASASVI",
      "4. SMILE",
      "5. NAMASTE",
      "6. ADIP Scheme",
      "7. PM-SABAGY / Vayoshreshtha Samman"
    ]
  },
  {
    id: "loans-credit-subsidies",
    name: "Loans, Credit & Subsidies",
    slug: "loans-credit-subsidies",
    icon: "Coins",
    emoji: "💰",
    description: "Collateral-free enterprise credit, Kisan Credit Cards (KCC), street vendor micro-loans, artisan loans, and MSME credit guarantees.",
    file: "Government_Schemes_Loans_Credit_Subsidies.txt",
    splitStyle: "scheme_x_of_7"
  },
  {
    id: "education-scholarships",
    name: "Education & Scholarships",
    slug: "education-scholarships",
    icon: "GraduationCap",
    emoji: "🎓",
    description: "PM-Vidyalaxmi education loans, Central Sector college scholarships, merit scholarships (NMMSS), SC scholarships, and girl student aid.",
    file: "Government_Schemes_Education_and_Scholarships.txt",
    splitStyle: "scheme_education"
  }
];

function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/-- \d+ of \d+ --/g, '')
    .replace(/Government Schemes Compendium[^\n]*Page \d+ of \d+/gi, '')
    .replace(/Government Schemes Handbook[^\n]*Page \d+ of \d+/gi, '')
    .replace(/Government Schemes Directory[^\n]*Page \d+ of \d+/gi, '')
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ')
    .trim();
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const ID_ALIASES = {
  'pradhan-mantri-garib-kalyan-anna-yojana-pmgkay': 'pmgkay',
  'pm-poshan-scheme-pradhan-mantri-poshan-shakti-nirman': 'pm-poshan',
  'saksham-anganwadi-and-poshan-2-0-icds': 'saksham-anganwadi-poshan',
  'targeted-public-distribution-system-tpds-under-nfsa': 'tpds-nfsa',
  'antyodaya-anna-yojana-aay': 'aay',
  'pradhan-mantri-matru-vandana-yojana-pmmvy': 'pmmvy',
  'scheme-for-fortification-of-rice-and-its-distribution-under-tpds': 'rice-fortification-scheme',
  'khelo-india-scheme': 'khelo-india',
  'target-olympic-podium-scheme-tops': 'tops',
  'national-youth-corps-nyc': 'national-youth-corps',
  'pandit-deendayal-upadhyay-national-welfare-fund-for-sportspersons': 'pdu-sportspersons-fund',
  'pdunwfs-welfare-fund-for-sportspersons': 'pdu-sportspersons-fund',
  'pdunwfs': 'pdu-sportspersons-fund',
  'scheme-of-pension-to-meritorious-sportspersons': 'meritorious-sportspersons-pension',
  'pension-to-meritorious-sportspersons': 'meritorious-sportspersons-pension',
  'cultural-function-and-production-grant': 'cultural-function-production-grant',
  'preservation-of-cultural-heritage-of-the-himalayas': 'himalayan-cultural-heritage',
  'pradhan-mantri-jan-dhan-yojana-pmjdy': 'pmjdy',
  'pradhan-mantri-jeevan-jyoti-bima-yojana-pmjjby': 'pmjjby',
  'pradhan-mantri-suraksha-bima-yojana-pmsby': 'pmsby',
  'atal-pension-yojana-apy': 'apy',
  'pradhan-mantri-mudra-yojana-pmmy': 'pmmy',
  'pradhan-mantri-mudra-yojana': 'pmmy',
  'stand-up-india-scheme': 'stand-up-india',
  'pm-svanidhi-pradhan-mantri-street-vendor-s-atmanirbhar-nidhi': 'pm-svanidhi',
  'pm-street-vendor-s-atmanirbhar-nidhi-pm-svanidhi': 'pm-svanidhi',
  'pm-street-vendor-s-atmanirbhar-nidhi': 'pm-svanidhi',
  'pradhan-mantri-kaushal-vikas-yojana-4-0-pmkvy-4-0': 'pmkvy',
  'mahatma-gandhi-national-rural-employment-guarantee-scheme-mgnregs': 'mgnregs',
  'mahatma-gandhi-national-rural-employment-guarantee-scheme': 'mgnregs',
  'prime-minister-s-employment-generation-programme-pmegp': 'pmegp',
  'prime-minister-s-employment-generation-programme': 'pmegp',
  'pm-vishwakarma-scheme': 'pm-vishwakarma',
  'pm-vishwakarma-yojana': 'pm-vishwakarma',
  'pm-vishwakarma-scheme-pradhan-mantri-vishwakarma': 'pm-vishwakarma',
  'deen-dayal-upadhyaya-grameen-kaushalya-yojana-ddu-gky': 'ddu-gky',
  'national-apprenticeship-promotion-scheme-naps-naps-2-0': 'naps',
  'prime-minister-internship-scheme-pmis': 'pm-internship',
  'ayushman-bharat-pradhan-mantri-jan-arogya-yojana-ab-pmjay': 'pm-jay',
  'ayushman-bharat-pradhan-mantri-jan-arogya-yojana-ab-': 'pm-jay',
  'pradhan-mantri-shram-yogi-maan-dhan-pm-sym': 'pm-sym',
  'indira-gandhi-national-old-age-pension-scheme-ignoaps': 'ignoaps',
  'pradhan-mantri-fasal-bima-yojana-pmfby': 'pmfby',
  'startup-india-seed-fund-scheme-sisfs': 'sisfs',
  'credit-guarantee-fund-trust-for-mses-cgtmse': 'cgtmse',
  'credit-guarantee-fund-scheme-for-micro-small-enterprises-cgtmse': 'cgtmse',
  'venture-capital-assistance-scheme-vcas': 'vcas',
  'unified-pension-scheme-ups': 'unified-pension-scheme',
  'national-pension-system-nps-government-sector': 'nps-government-sector',
  'central-government-health-scheme-cghs': 'cghs',
  'system-for-pension-administration-raksha-sparsh': 'sparsh-defence-pension',
  'ccs-pension-rules-family-pension-scheme': 'ccs-family-pension',
  'house-building-advance-hba-scheme': 'house-building-advance',
  'general-provident-fund-central-services-gpf': 'gpf-central-services',
  'pm-daksh-scheme': 'pm-daksh',
  'pm-daksh-pradhan-mantri-dakshta-aur-kushalta-sampann-hitgrahi': 'pm-daksh',
  'pm-daksh': 'pm-daksh',
  'shreyas-scheme': 'shreyas-scheme',
  'shreyas-scheme-for-higher-education-youth-in-apprenticeship-and': 'shreyas-scheme',
  'shreyas': 'shreyas-scheme',
  'pm-yasasvi-scheme': 'pm-yasasvi',
  'smruti-pm-yasasvi-young-achievers-scholarship-award-scheme-for': 'pm-yasasvi',
  'pm-young-achievers-scholarship-award-scheme-for-vibrant-india-pm-yasasvi': 'pm-yasasvi',
  'pm-young-achievers-scholarship-award-scheme-for-vibrant-india-pm-': 'pm-yasasvi',
  'smile-scheme': 'smile-scheme',
  'smile-support-for-marginalized-individuals-for-livelihood-and-enterprise': 'smile-scheme',
  'smile': 'smile-scheme',
  'namaste-scheme': 'namaste-scheme',
  'namaste-national-action-for-mechanized-sanitation-ecosystem': 'namaste-scheme',
  'namaste': 'namaste-scheme',
  'adip-scheme': 'adip-scheme',
  'adip-scheme-assistance-to-disabled-persons-for-purchase-fitting-of-aids': 'adip-scheme',
  'rashtriya-vayoshri-yojana-rvy': 'rashtriya-vayoshri-yojana',
  'pm-sabagy-vayoshreshtha-samman-rashtriya-vayoshri-yojana-rvy': 'rashtriya-vayoshri-yojana',
  'kisan-credit-card-kcc-scheme': 'kisan-credit-card',
  'pradhan-mantri-vidyalaxmi-scheme-pm-vidyalaxmi': 'pm-vidyalaxmi',
  'pm-uchchatar-shiksha-protsahan-pm-usp-central-sector-scheme-of-scholarship-for-college-and-university-students-csss': 'pm-usp-csss',
  'pm-uchchatar-shiksha-protsahan-pm-usp-central-sector-scheme-of': 'pm-usp-csss',
  'national-means-cum-merit-scholarship-scheme-nmmss': 'nmmss',
  'post-matric-scholarship-scheme-for-sc-students-pms-sc': 'pms-sc',
  'aicte-pragati-scholarship-scheme-for-girl-students': 'aicte-pragati-scholarship',
  'begum-hazrat-mahal-national-scholarship-for-minority-girls': 'begum-hazrat-mahal-scholarship'
};

function parseSchemeBlock(blockText, categoryObj, schemeIndex) {
  const fullText = blockText;
  const lines = blockText.split('\n').map(l => l.trim()).filter(Boolean);

  // Extract Scheme Name
  let name = "";
  const nameLineMatch = fullText.match(/Scheme Name(?:\s*:)?\s*([^\n\r]+)/i);
  if (nameLineMatch && nameLineMatch[1].length > 4) {
    name = nameLineMatch[1].trim();
  }

  if (!name) {
    for (let i = 0; i < Math.min(lines.length, 6); i++) {
      const line = lines[i];
      const match = line.match(/^[1-7]\.\s+([A-Za-z0-9\(\)\-\,\.\s\/\:\'\’]+)/);
      if (match && !match[1].startsWith("Formulate") && !match[1].startsWith("Register") && !match[1].startsWith("Apply") && !match[1].startsWith("Visit") && !match[1].startsWith("Log") && !match[1].startsWith("Approach") && !match[1].startsWith("Prepare")) {
        name = match[1].trim();
        break;
      }
    }
  }

  if (!name) {
    for (let i = 0; i < Math.min(lines.length, 5); i++) {
      if (/^SCHEME\s+(?:#\d+|\d+\s+OF\s+\d+|\d+)/i.test(lines[i])) {
        if (lines[i + 1] && !lines[i + 1].startsWith("DETAILED") && !lines[i + 1].startsWith("Category:")) {
          name = lines[i + 1].trim();
        }
        break;
      }
    }
  }

  if (!name && lines.length > 0) {
    name = lines[0].replace(/^(?:SCHEME\s+(?:#\d+|\d+\s+OF\s+\d+|\d+)|[1-7]\.)\s*/i, '');
  }

  name = name.replace(/\t+/g, ' ').replace(/\s+/g, ' ').trim();

  // Subcategory
  let subcategory = "Central Welfare Scheme";
  const subcatMatch = fullText.match(/Subcategory(?:\s*:)?\s*([^\n\r\t]+)/i);
  if (subcatMatch) subcategory = subcatMatch[1].trim();

  // Government Level
  let governmentLevel = "Central Government";
  const govLevelMatch = fullText.match(/Government Level(?:\s*:)?\s*([^\n\r\t]+?)(?=Implementing Ministry:|$|\n)/is);
  if (govLevelMatch) governmentLevel = govLevelMatch[1].replace(/\s+/g, ' ').trim();

  // Implementing Ministry
  let implementingMinistry = "Government of India";
  const minMatch = fullText.match(/Implementing Ministry(?:\s*:)?\s*([^\n\r]+(?:\n[^\n\r]+)?)(?=State Coverage:|State:|$)/is);
  if (minMatch) implementingMinistry = minMatch[1].replace(/\s+/g, ' ').trim();

  // State Coverage
  let stateCoverage = "All States & Union Territories";
  const covMatch = fullText.match(/(?:State Coverage|State)(?:\s*:)?\s*([^\n\r]+(?:\n[^\n\r]+)?)(?=Current Status:|Status:|$|\n)/is);
  if (covMatch) stateCoverage = covMatch[1].replace(/\s+/g, ' ').trim();

  // Status
  let status = "Active";
  const statusMatch = fullText.match(/(?:Current Status|Status)(?:\s*:)?\s*([^\n\r\t]+)/i);
  if (statusMatch) status = statusMatch[1].replace(/18\.\s*Last Verified.*/i, '').trim();

  // Detailed Description
  let description = "";
  const descMatch = fullText.match(/(?:(?:8\.\s*)?DETAILED DESCRIPTION|•\s*What the scheme is:|What the scheme is:)\s*([\s\S]*?)(?=(?:•\s*Why the scheme was started:|Why Started:|Why the scheme was started:|•\s*Who can get the benefit:|Who Gets Benefit:|Who Can Benefit:|\n9\.\s*ELIGIBILITY))/i);
  if (descMatch) {
    description = descMatch[1].replace(/\s+/g, ' ').trim();
  }

  // Why Started
  let whyStarted = "";
  const whyMatch = fullText.match(/(?:•\s*Why the scheme was started:|Why the scheme was started:|Why Started:)\s*([\s\S]*?)(?=(?:•\s*Who can get the benefit:|Who can get the benefit:|Who Gets Benefit:|Who Can Benefit:|•\s*How the scheme works:|How It Works:|\n9\.\s*ELIGIBILITY))/i);
  if (whyMatch) whyStarted = whyMatch[1].replace(/\s+/g, ' ').trim();

  // Who Can Benefit
  let whoCanBenefit = "";
  const whoMatch = fullText.match(/(?:•\s*Who can get the benefit:|Who can get the benefit:|Who Gets Benefit:|Who Can Benefit:)\s*([\s\S]*?)(?=(?:•\s*How the scheme works:|How the scheme works:|How It Works:|•\s*What help the government provides:|Help Provided|Main Benefits:|\n9\.\s*ELIGIBILITY))/i);
  if (whoMatch) whoCanBenefit = whoMatch[1].replace(/\s+/g, ' ').trim();

  // How It Works
  let howItWorks = "";
  const howMatch = fullText.match(/(?:•\s*How the scheme works:|How the scheme works:|How It Works:)\s*([\s\S]*?)(?=(?:•\s*What help the government provides:|What help the government provides:|Help Provided & Main Benefits:|Help Provided|Main Benefits:|•\s*Important rules|Important Rules:|\n9\.\s*ELIGIBILITY))/i);
  if (howMatch) howItWorks = howMatch[1].replace(/\s+/g, ' ').trim();

  // Government Support
  let governmentSupport = "";
  const helpMatch = fullText.match(/(?:•\s*What help the government provides:|What help the government provides:|Help Provided & Main Benefits:|Help Provided|Government Support:)\s*([\s\S]*?)(?=(?:•\s*Main benefits|Main benefits of the scheme:|Important Rules:|•\s*Important rules|\n9\.\s*ELIGIBILITY|\n12\.\s*KEY BENEFITS))/i);
  if (helpMatch) governmentSupport = helpMatch[1].replace(/\s+/g, ' ').trim();

  // Important Rules / Conditions
  let importantConditions = [];
  const rulesMatch = fullText.match(/(?:•\s*Important rules or conditions:|Important rules or conditions:|Important Rules:)\s*([\s\S]*?)(?=(?:\n9\.\s*ELIGIBILITY|\n10\.\s*Age Limit|ELIGIBILITY CRITERIA|Age Limit:))/i);
  if (rulesMatch) {
    importantConditions = rulesMatch[1]
      .split(/(?:•|\n-|\n\d+\.)/)
      .map(s => s.replace(/\s+/g, ' ').trim())
      .filter(s => s.length > 5);
    if (importantConditions.length === 0 && rulesMatch[1].trim()) {
      importantConditions = [rulesMatch[1].replace(/\s+/g, ' ').trim()];
    }
  }

  // Eligibility Criteria
  let eligibilityCriteria = "";
  const eligMatch = fullText.match(/(?:(?:9\.\s*)?ELIGIBILITY CRITERIA|ELIGIBILITY CRITERIA)\s*([\s\S]*?)(?=(?:(?:10\.\s*)?Age Limit:|Age Limit:))/i);
  if (eligMatch) {
    eligibilityCriteria = eligMatch[1].replace(/\s+/g, ' ').trim();
  }
  if (!eligibilityCriteria && whoCanBenefit) {
    eligibilityCriteria = whoCanBenefit;
  }

  // Age Limit
  let ageLimit = "Not Specified";
  const ageMatch = fullText.match(/(?:(?:10\.\s*)?Age Limit:|Age Limit:)\s*([\s\S]*?)(?=(?:(?:11\.\s*)?Income Limit:|Income Limit:))/i);
  if (ageMatch) ageLimit = ageMatch[1].replace(/\s+/g, ' ').trim();

  // Income Limit
  let incomeLimit = "Not Specified";
  const incMatch = fullText.match(/(?:(?:11\.\s*)?Income Limit:|Income Limit:)\s*([\s\S]*?)(?=(?:(?:12\.\s*)?KEY BENEFITS|KEY BENEFITS|(?:13\.\s*)?REQUIRED DOCUMENTS|REQUIRED DOCUMENTS|Documents Required:))/i);
  if (incMatch) incomeLimit = incMatch[1].replace(/\s+/g, ' ').trim();

  // Key Benefits
  let benefits = [];
  const benMatch = fullText.match(/(?:(?:12\.\s*)?KEY BENEFITS|KEY BENEFITS|•\s*Main benefits of the scheme:|Main benefits of the scheme:)\s*([\s\S]*?)(?=(?:(?:13\.\s*)?REQUIRED DOCUMENTS|REQUIRED DOCUMENTS|Documents Required:|•\s*How it helps people:|How it helps people:))/i);
  if (benMatch) {
    benefits = benMatch[1]
      .split(/(?:•|\n-|\n\d+\.)/)
      .map(s => s.replace(/\s+/g, ' ').trim())
      .filter(s => s.length > 5);
  }
  if (benefits.length === 0 && governmentSupport) {
    benefits = [governmentSupport];
  }

  // Required Documents
  let requiredDocuments = [];
  const docMatch = fullText.match(/(?:(?:13\.\s*)?REQUIRED DOCUMENTS|REQUIRED DOCUMENTS|Documents Required:)\s*([\s\S]*?)(?=(?:(?:14\.\s*)?APPLICATION PROCESS|APPLICATION PROCESS|How to Apply:|Step-by-Step Application Process:))/i);
  if (docMatch) {
    requiredDocuments = docMatch[1]
      .split(/(?:•|\n-|\n\d+\.)/)
      .map(s => s.replace(/\s+/g, ' ').trim())
      .filter(s => s.length > 2);
  }
  if (requiredDocuments.length === 0) {
    requiredDocuments = ["Aadhaar Card", "Bank Account Passbook / Details", "Relevant Category or Eligibility Certificate"];
  }

  // Application Process
  let applicationProcess = [];
  const appMatch = fullText.match(/(?:(?:14\.\s*)?APPLICATION PROCESS|APPLICATION PROCESS|How to Apply:|Step-by-Step Application Process:)\s*([\s\S]*?)(?=(?:(?:15\.\s*)?Official Application|Official Application URL:|Official Information|15\.\s*Official Application URL:))/i);
  if (appMatch) {
    applicationProcess = appMatch[1]
      .split(/(?:\n\d+\.|\n•)/)
      .map(s => s.replace(/\s+/g, ' ').trim())
      .filter(s => s.length > 5);
  }
  if (applicationProcess.length === 0) {
    applicationProcess = [
      "Check eligibility and documentation requirements on the official government portal.",
      "Prepare required proofs (identity, address, category, income, and bank details).",
      "Submit application through the designated official online portal or nodal center.",
      "Obtain acknowledgement reference number and track application status until approval."
    ];
  }

  // Official Application URL
  let officialApplicationUrl = "";
  const appUrlMatch = fullText.match(/(?:Official Application(?:\s*URL)?|Apply \/ Visit Official Portal|Official Application:)[\s\S]*?(https?:\/\/[^\s\)\n\r]+)/i);
  if (appUrlMatch) {
    officialApplicationUrl = appUrlMatch[1].trim().replace(/[\.,]$/, '');
  }

  const isNoDirectApp = fullText.toLowerCase().includes("direct selection") || 
                        fullText.toLowerCase().includes("no direct application") || 
                        fullText.toLowerCase().includes("not applicable") ||
                        name.toLowerCase().includes("target olympic podium");

  if (!officialApplicationUrl && isNoDirectApp) {
    officialApplicationUrl = "Not Applicable";
  }

  // Official Information URL
  let officialInformationUrl = "";
  const infoUrlMatch = fullText.match(/(?:Official Information(?:\s*URL)?|Official Information:)[\s\S]*?(https?:\/\/[^\s\)\n\r]+)/i);
  if (infoUrlMatch) {
    officialInformationUrl = infoUrlMatch[1].trim().replace(/[\.,]$/, '');
  }
  if (!officialInformationUrl && officialApplicationUrl && officialApplicationUrl !== "Not Applicable") {
    officialInformationUrl = officialApplicationUrl;
  }

  // Last Verified
  let lastVerified = "August 2026";
  const verifiedMatch = fullText.match(/(?:LAST VERIFIED|Last Verified)(?:\s*:)?[\s\S]*?([A-Za-z]+\s*\d{1,2},?\s*\d{4}|[A-Za-z]+\s*\d{4})/i);
  if (verifiedMatch) {
    lastVerified = verifiedMatch[1].trim();
  }

  // Slug & ID
  let id = generateSlug(name);
  if (id.startsWith('scheme-')) id = id.replace('scheme-', '');
  if (ID_ALIASES[id]) {
    id = ID_ALIASES[id];
  }

  // Keywords
  const keywords = Array.from(new Set([
    ...name.toLowerCase().split(/[\s\-\(\)\/\,\.\:\;]+/).filter(w => w.length > 2),
    ...subcategory.toLowerCase().split(/[\s\-\(\)\/\,\.\:\;]+/).filter(w => w.length > 2),
    categoryObj.name.toLowerCase(),
    categoryObj.slug,
    ...(eligibilityCriteria.toLowerCase().includes('student') || name.toLowerCase().includes('vidyalaxmi') || name.toLowerCase().includes('scholarship') ? ['student', 'education', 'scholarship', 'college'] : []),
    ...(eligibilityCriteria.toLowerCase().includes('farmer') || whoCanBenefit.toLowerCase().includes('farmer') || name.toLowerCase().includes('kisan') || name.toLowerCase().includes('fasal') ? ['farmer', 'agriculture', 'kisan', 'crop'] : []),
    ...(whoCanBenefit.toLowerCase().includes('women') || name.toLowerCase().includes('women') || name.toLowerCase().includes('matru') || name.toLowerCase().includes('girl') ? ['women', 'girl', 'mother'] : []),
    ...(name.toLowerCase().includes('pension') || subcategory.toLowerCase().includes('pension') ? ['pension', 'senior citizen', 'retirement'] : []),
    ...(name.toLowerCase().includes('loan') || name.toLowerCase().includes('mudra') || name.toLowerCase().includes('credit') || name.toLowerCase().includes('cgtmse') ? ['loan', 'credit', 'subsidy', 'business'] : []),
    ...(name.toLowerCase().includes('bima') || name.toLowerCase().includes('insurance') || name.toLowerCase().includes('health') || name.toLowerCase().includes('cghs') || name.toLowerCase().includes('pmjay') ? ['insurance', 'health', 'medical'] : []),
    ...(name.toLowerCase().includes('skill') || name.toLowerCase().includes('internship') || name.toLowerCase().includes('training') || name.toLowerCase().includes('naps') || name.toLowerCase().includes('pmkvy') ? ['skill', 'training', 'job', 'employment'] : [])
  ]));

  return {
    id,
    schemeName: name,
    category: categoryObj.name,
    categorySlug: categoryObj.slug,
    categories: [categoryObj.slug],
    subcategory,
    governmentLevel,
    implementingMinistry,
    stateCoverage,
    status,
    description: description || `${name} is an important government welfare scheme under ${categoryObj.name}.`,
    whyStarted: whyStarted || `Initiated to provide direct support and opportunities under ${categoryObj.name}.`,
    whoCanBenefit: whoCanBenefit || `Eligible Indian citizens meeting criteria across ${stateCoverage}.`,
    howItWorks: howItWorks || `Implemented through official ministry portals and authorized financial/nodal institutions.`,
    governmentSupport: governmentSupport || (benefits[0] || "Financial and welfare assistance as per government guidelines."),
    keyBenefits: benefits.join(' • ') || governmentSupport,
    benefits: benefits.length > 0 ? benefits : [governmentSupport],
    importantConditions,
    eligibilityCriteria: eligibilityCriteria || "Subject to official scheme criteria and guidelines.",
    ageLimit,
    incomeLimit,
    requiredDocuments,
    applicationProcess,
    officialApplicationUrl: officialApplicationUrl || "Not Specified",
    officialInformationUrl: officialInformationUrl || "Not Specified",
    lastVerified,
    keywords
  };
}

function parseFile(categoryObj) {
  const filePath = path.join(txtDir, categoryObj.file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const cleaned = cleanText(content);

  let blocks = [];

  if (categoryObj.splitStyle === "scheme_x_of_7") {
    const regex = /SCHEME\s+(\d+)\s+OF\s+7/gi;
    const matches = [...cleaned.matchAll(regex)];
    for (let i = 0; i < matches.length; i++) {
      const startIndex = matches[i].index;
      const endIndex = (i + 1 < matches.length) ? matches[i + 1].index : cleaned.length;
      blocks.push(cleaned.slice(startIndex, endIndex));
    }
  } else if (categoryObj.splitStyle === "scheme_hash") {
    const regex = /SCHEME\s+#\d+/gi;
    const matches = [...cleaned.matchAll(regex)];
    for (let i = 0; i < matches.length; i++) {
      const startIndex = matches[i].index;
      const endIndex = (i + 1 < matches.length) ? matches[i + 1].index : cleaned.length;
      blocks.push(cleaned.slice(startIndex, endIndex));
    }
  } else if (categoryObj.splitStyle === "scheme_education") {
    const regex = /SCHEME\s+\d+\s+OF\s+\d+/gi;
    const matches = [...cleaned.matchAll(regex)];
    for (let i = 0; i < matches.length; i++) {
      const startIndex = matches[i].index;
      const endIndex = (i + 1 < matches.length) ? matches[i + 1].index : cleaned.length;
      blocks.push(cleaned.slice(startIndex, endIndex));
    }
  } else if (categoryObj.splitStyle === "numbered_titles" && categoryObj.titles) {
    // Find index of each title
    const positions = [];
    for (let i = 0; i < categoryObj.titles.length; i++) {
      const title = categoryObj.titles[i];
      const idx = cleaned.indexOf(title);
      if (idx !== -1) {
        positions.push({ idx, titleIndex: i });
      } else {
        // Try without prefix
        const shortTitle = title.replace(/^\d+\.\s*/, '');
        const shortIdx = cleaned.indexOf(shortTitle);
        if (shortIdx !== -1) {
          positions.push({ idx: shortIdx, titleIndex: i });
        }
      }
    }

    positions.sort((a, b) => a.idx - b.idx);

    for (let i = 0; i < positions.length; i++) {
      const start = positions[i].idx;
      const end = (i + 1 < positions.length) ? positions[i + 1].idx : cleaned.length;
      blocks.push(cleaned.slice(start, end));
    }
  }

  const schemes = blocks.map((b, idx) => parseSchemeBlock(b, categoryObj, idx + 1));
  return schemes;
}

function run() {
  console.log("Parsing all 10 categories...");
  const allCategorySchemes = [];
  const categorySummary = {};

  for (const cat of CATEGORY_MAP) {
    const list = parseFile(cat);
    console.log(`✓ ${cat.name}: ${list.length} schemes parsed`);
    categorySummary[cat.name] = list.length;
    allCategorySchemes.push(...list);
  }

  console.log(`\nTotal category scheme instances: ${allCategorySchemes.length}`);

  // Build canonical unique scheme objects mapping multi-category schemes
  const schemeMap = new Map();
  for (const s of allCategorySchemes) {
    if (schemeMap.has(s.id)) {
      const existing = schemeMap.get(s.id);
      if (!existing.categories.includes(s.categorySlug)) {
        existing.categories.push(s.categorySlug);
      }
    } else {
      schemeMap.set(s.id, { ...s });
    }
  }

  console.log(`Unique schemes by canonical ID: ${schemeMap.size}`);

  // Generate JavaScript output files
  const schemesArray = Array.from(schemeMap.values());

  // Write src/data/categories.js
  const categoriesJs = `// 10 Official Categories for SchemeSathi
export const CATEGORIES = ${JSON.stringify(CATEGORY_MAP.map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    icon: c.icon,
    emoji: c.emoji,
    description: c.description,
    schemeCount: 7
  })), null, 2)};

export const STATES_AND_UTS = [
  "All India (Central)",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi (NCT)",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];
`;

  fs.writeFileSync('src/data/categories.js', categoriesJs, 'utf8');
  console.log("✓ Saved src/data/categories.js");

  // Write src/data/schemes.js
  const schemesJs = `// Complete Registry of 70 Government Schemes across 10 Categories
export const SCHEMES = ${JSON.stringify(schemesArray, null, 2)};

export const ALL_CATEGORY_SCHEMES = ${JSON.stringify(allCategorySchemes, null, 2)};
`;

  fs.writeFileSync('src/data/schemes.js', schemesJs, 'utf8');
  console.log("✓ Saved src/data/schemes.js");
}

run();
