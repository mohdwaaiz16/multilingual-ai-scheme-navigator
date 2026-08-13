/**
 * Multilingual AI Government Scheme Navigator - Schemes Dataset
 * 
 * Source of Truth: Schemes.txt
 * Contains exact 20 verified Indian government welfare schemes with no modifications or hallucinations.
 */

export const SCHEMES = [
  {
    id: "pm-jay",
    schemeName: "Ayushman Bharat – PM-JAY",
    category: "Healthcare",
    type: "Centrally Sponsored",
    eligibilityCriteria: "Families identified under SECC 2011 data and other eligible vulnerable groups.",
    ageLimit: "No age bar.",
    incomeLimit: "Eligibility is based on the prescribed government criteria; there is no single fixed income limit for all beneficiaries.",
    keyBenefits: "Health coverage of up to ₹5 lakh per family per year for eligible secondary and tertiary hospitalization.",
    requiredDocuments: [
      "Aadhaar card",
      "Ration card",
      "Other eligibility proof"
    ],
    applicationProcess: "Eligibility can be checked through the official portal or through an empanelled hospital/Ayushman Mitra.",
    officialSource: "pmjay.gov.in",
    officialUrl: "https://pmjay.gov.in",
    description: "Comprehensive health assurance scheme offering up to ₹5 lakh cashless coverage per family per year for eligible secondary and tertiary care hospitalization.",
    keywords: ["health", "hospital", "medical", "insurance", "ayushman", "pmjay", "cashless", "5 lakh", "treatment", "doctor"]
  },
  {
    id: "pmmvy",
    schemeName: "PM Matru Vandana Yojana (PMMVY)",
    category: "Maternity Welfare",
    type: "Centrally Sponsored",
    eligibilityCriteria: "Eligible pregnant women and lactating mothers as per the scheme guidelines.",
    ageLimit: "Generally 19 years and above.",
    incomeLimit: "Priority is given to eligible women from economically vulnerable groups as specified by the scheme.",
    keyBenefits: "Financial assistance is provided directly to eligible beneficiaries through their bank accounts.",
    requiredDocuments: [
      "Aadhaar card",
      "Mother and Child Protection (MCP) card",
      "Bank account details",
      "Other required documents"
    ],
    applicationProcess: "Registration can be done through an Anganwadi Centre, health facility, or the official PMMVY portal.",
    officialSource: "pmmvy.wcd.gov.in",
    officialUrl: "https://pmmvy.wcd.gov.in",
    description: "Direct cash incentive scheme for pregnant women and lactating mothers for improved health, nutrition and wage compensation.",
    keywords: ["maternity", "pregnant", "mother", "women", "infant", "nutrition", "cash assistance", "child", "pmmvy", "lactating"]
  },
  {
    id: "pmay-u",
    schemeName: "PM Awas Yojana – Urban (PMAY-U)",
    category: "Urban Housing",
    type: "Centrally Sponsored",
    eligibilityCriteria: "Urban families who do not own a pucca house anywhere in India and meet the applicable PMAY-U eligibility conditions.",
    ageLimit: "18+ years.",
    incomeLimit: "EWS – up to ₹3 lakh per year, LIG – ₹3–6 lakh, MIG – ₹6–18 lakh, subject to the applicable component and current guidelines.",
    keyBenefits: "Interest subsidy on eligible home loans or financial assistance for house construction, depending on the applicable scheme component.",
    requiredDocuments: [
      "Aadhaar card",
      "Income certificate",
      "Land/property documents where applicable",
      "Bank details"
    ],
    applicationProcess: "Apply through the official PMAY-U portal or through a Common Service Centre (CSC).",
    officialSource: "pmaymis.gov.in",
    officialUrl: "https://pmaymis.gov.in",
    description: "Affordable housing mission enabling urban families to acquire or construct pucca houses with interest subsidies and financial support.",
    keywords: ["housing", "urban", "home loan", "subsidy", "pucca house", "pmay", "pmay-u", "construction", "ews", "lig", "mig", "flat"]
  },
  {
    id: "pmay-g",
    schemeName: "PM Awas Yojana – Gramin (PMAY-G)",
    category: "Rural Housing",
    type: "Centrally Sponsored",
    eligibilityCriteria: "Rural households that are homeless or living in kutcha/dilapidated houses and are identified according to the applicable PMAY-G selection criteria.",
    ageLimit: "18+ years for the relevant beneficiary/household conditions.",
    incomeLimit: "Based on rural poverty/deprivation and the applicable SECC/PMAY-G selection criteria.",
    keyBenefits: "Financial assistance for construction of a pucca house, with assistance generally varying between ₹1.20 lakh in plain areas and ₹1.30 lakh in hilly/difficult areas.",
    requiredDocuments: [
      "Aadhaar card",
      "Bank account details",
      "Job card number where applicable",
      "Beneficiary/household identification details"
    ],
    applicationProcess: "Beneficiary identification and verification are handled through the Gram Sabha and relevant local/block authorities.",
    officialSource: "pmayg.nic.in",
    officialUrl: "https://pmayg.nic.in",
    description: "Rural housing scheme delivering financial support of ₹1.20L - ₹1.30L to homeless and kutcha-house dwelling rural families for pucca home construction.",
    keywords: ["rural housing", "gramin", "village", "home construction", "pucca house", "pmayg", "kutcha house", "shelter", "gram sabha"]
  },
  {
    id: "pm-surya-ghar",
    schemeName: "PM Surya Ghar: Muft Bijli Yojana",
    category: "Solar Energy",
    type: "Central",
    eligibilityCriteria: "Indian residential households with a suitable rooftop and a valid electricity connection, subject to the scheme guidelines.",
    ageLimit: "No specific age bar.",
    incomeLimit: "No specific income limit.",
    keyBenefits: "Households can receive central financial assistance for installing rooftop solar systems and can benefit from electricity generation, with the scheme targeting up to 300 units of free/low-cost electricity per month depending on generation and household consumption.",
    requiredDocuments: [
      "Aadhaar card",
      "Electricity bill / consumer details",
      "Rooftop-related information or photographs where required",
      "Bank account details"
    ],
    applicationProcess: "Apply online through the official PM Surya Ghar portal.",
    officialSource: "pmsuryaghar.gov.in",
    officialUrl: "https://pmsuryaghar.gov.in",
    description: "Rooftop solar initiative offering substantial central subsidies to enable residential households to generate up to 300 units of free electricity monthly.",
    keywords: ["solar", "electricity", "rooftop solar", "power", "subsidy", "muft bijli", "green energy", "pm surya ghar", "light bill"]
  },
  {
    id: "pmuy",
    schemeName: "PM Ujjwala Yojana (PMUY 2.0)",
    category: "Clean Cooking Energy",
    type: "Central",
    eligibilityCriteria: "Adult women from eligible poor households who meet the PMUY eligibility conditions.",
    ageLimit: "18 years and above for women applicants.",
    incomeLimit: "Eligibility is based on the prescribed deprivation/household criteria rather than one universal income ceiling.",
    keyBenefits: "Deposit-free LPG connection, with applicable assistance for the first refill and stove according to the prevailing scheme provisions.",
    requiredDocuments: [
      "Aadhaar card",
      "Ration card or family composition document",
      "Bank account details",
      "Other KYC documents as required"
    ],
    applicationProcess: "Apply online through the official PMUY portal or visit the nearest LPG distributor.",
    officialSource: "pmuy.gov.in",
    officialUrl: "https://pmuy.gov.in",
    description: "Welfare scheme providing deposit-free LPG gas connections and initial refill/stove assistance to adult women in low-income households.",
    keywords: ["lpg", "gas connection", "cooking gas", "women", "cylinder", "ujjwala", "pmuy", "clean fuel", "smoke free", "kitchen"]
  },
  {
    id: "pmkvy",
    schemeName: "PM Kaushal Vikas Yojana (PMKVY 4.0)",
    category: "Skill Training",
    type: "Central",
    eligibilityCriteria: "Eligible Indian youth seeking skill development and employment-oriented training, including eligible unemployed youth and school/college dropouts.",
    ageLimit: "Generally 15–45 years for relevant training programmes, subject to course-specific conditions.",
    incomeLimit: "No general income limit.",
    keyBenefits: "Free industry-relevant skill training, assessment and certification, along with employment or placement-related support where applicable.",
    requiredDocuments: [
      "Aadhaar card",
      "Bank account details",
      "Educational certificates where required"
    ],
    applicationProcess: "Register through Skill India Digital or an authorized PMKVY training centre.",
    officialSource: "skillindiadigital.gov.in",
    officialUrl: "https://www.skillindiadigital.gov.in",
    description: "Skill development initiative offering free industry-aligned vocational training, government certification, and placement assistance for Indian youth.",
    keywords: ["skill training", "vocational", "certification", "youth", "employment", "job training", "pmkvy", "skill india", "courses"]
  },
  {
    id: "pm-shri",
    schemeName: "PM-SHRI Schools Scheme",
    category: "School Education",
    type: "Centrally Sponsored",
    eligibilityCriteria: "Students enrolled or seeking admission in designated PM-SHRI Government schools, subject to the school’s admission rules.",
    ageLimit: "School-going age as applicable to the relevant class.",
    incomeLimit: "No general income requirement.",
    keyBenefits: "Students receive access to improved school infrastructure, modern laboratories, ICT facilities, experiential learning, and environmentally sustainable school facilities.",
    requiredDocuments: [
      "School admission and enrollment documents as required by the concerned school"
    ],
    applicationProcess: "Admission is carried out through the designated PM-SHRI schools according to their applicable admission procedures.",
    officialSource: "pmshrischools.education.gov.in",
    officialUrl: "https://pmshrischools.education.gov.in",
    description: "School transformation initiative providing modern classrooms, cutting-edge ICT labs, experiential learning, and green school infrastructure.",
    keywords: ["school", "education", "students", "smart class", "pm shri", "labs", "ict", "infrastructure", "children"]
  },
  {
    id: "csis",
    schemeName: "Central Sector Interest Subsidy Scheme (CSIS)",
    category: "Higher Education",
    type: "Central",
    eligibilityCriteria: "Economically weaker students pursuing eligible professional or technical courses in India through an eligible education loan.",
    ageLimit: "Student age as per applicable admission and education-loan conditions.",
    incomeLimit: "Annual family income up to ₹4.5 lakh.",
    keyBenefits: "Full interest subsidy during the moratorium period, covering the course period plus the applicable additional period under the scheme.",
    requiredDocuments: [
      "Income certificate from the authorized authority",
      "Admission proof",
      "Education-loan sanction letter",
      "Other required documents"
    ],
    applicationProcess: "Apply through the applicable education-loan/interest-subsidy process, including the Vidya Lakshmi portal where applicable.",
    officialSource: "vidyalakshmi.co.in",
    officialUrl: "https://www.vidyalakshmi.co.in",
    description: "Education loan interest subsidy scheme providing 100% interest waiver during the study moratorium for economically weaker students in higher education.",
    keywords: ["education loan", "interest subsidy", "higher education", "engineering", "medical", "technical courses", "vidya lakshmi", "csis", "college"]
  },
  {
    id: "post-matric-scholarship",
    schemeName: "Post Matric Scholarship for SC/ST/OBC",
    category: "Student Scholarship",
    type: "Centrally Sponsored",
    eligibilityCriteria: "Eligible SC, ST, and OBC students studying in Class 11 and above, subject to the applicable state/central scholarship guidelines.",
    ageLimit: "Student age as applicable to the course and educational level.",
    incomeLimit: "The income ceiling varies according to the category and applicable scholarship guidelines.",
    keyBenefits: "Eligible students may receive tuition-fee support and maintenance allowance, subject to the applicable scheme and state guidelines.",
    requiredDocuments: [
      "Caste certificate",
      "Income certificate",
      "Marksheets",
      "Aadhaar card",
      "Bank account details",
      "Educational documents"
    ],
    applicationProcess: "Apply through the National Scholarship Portal (NSP) or the relevant State Scholarship Portal, depending on the scheme.",
    officialSource: "scholarships.gov.in",
    officialUrl: "https://scholarships.gov.in",
    description: "Financial assistance scholarship offering tuition fees reimbursement and monthly maintenance allowances for SC, ST, and OBC post-matric students.",
    keywords: ["scholarship", "sc", "st", "obc", "post matric", "tuition fee", "college", "nsp", "maintenance allowance", "study"]
  },
  {
    id: "agnipath",
    schemeName: "Agnipath Scheme",
    category: "Defence Service",
    type: "Central",
    eligibilityCriteria: "Eligible Indian citizens who meet the prescribed educational, physical, medical, and other recruitment requirements for service in the Armed Forces.",
    ageLimit: "Generally 17.5–21 years, with recruitment-specific age conditions notified for each intake.",
    incomeLimit: "No income limit.",
    keyBenefits: "Four-year service opportunity in the Armed Forces, monthly remuneration, and a Seva Nidhi package on completion of the service period as per the applicable scheme provisions.",
    requiredDocuments: [
      "Educational marksheets / certificates",
      "Aadhaar card",
      "Sports / NCC certificates where applicable"
    ],
    applicationProcess: "Apply online through the official recruitment portal of the relevant Armed Force, such as Join Indian Army for Army recruitment.",
    officialSource: "joinindianarmy.nic.in",
    officialUrl: "https://joinindianarmy.nic.in",
    description: "Armed forces youth service initiative offering a 4-year tenure in the Indian Army, Navy, or Air Force with monthly salary and Seva Nidhi retirement package.",
    keywords: ["defence", "army", "navy", "air force", "agniveer", "agnipath", "military", "recruitment", "seva nidhi", "soldier"]
  },
  {
    id: "jal-jeevan-mission",
    schemeName: "Jal Jeevan Mission (JJM)",
    category: "Rural Water Supply",
    type: "Centrally Sponsored",
    eligibilityCriteria: "Rural households across India covered under the Jal Jeevan Mission implementation framework.",
    ageLimit: "No age bar.",
    incomeLimit: "No general income limit.",
    keyBenefits: "Provision of Functional Household Tap Connections (FHTCs) to provide adequate and safe drinking water to rural households, with the mission aiming for 55 litres per person per day.",
    requiredDocuments: [
      "Household / residence identification and other documents required by the local implementation authority"
    ],
    applicationProcess: "Implementation is carried out at the village level through Gram Panchayats, Pani Samitis/Village Water and Sanitation Committees, and relevant local authorities.",
    officialSource: "jaljeevanmission.gov.in",
    officialUrl: "https://jaljeevanmission.gov.in",
    description: "Nationwide rural infrastructure initiative delivering safe, potable tap water at 55 litres per person per day to every rural household.",
    keywords: ["water", "drinking water", "tap connection", "rural", "jal jeevan", "fhtc", "clean water", "sanitation", "pipeline"]
  },
  {
    id: "pmmy",
    schemeName: "PM MUDRA Yojana (PMMY)",
    category: "Business Credit",
    type: "Central",
    eligibilityCriteria: "Non-farm micro and small enterprises engaged in manufacturing, trading, or service activities.",
    ageLimit: "18+ years.",
    incomeLimit: "No specific income limit.",
    keyBenefits: "Collateral-free business loans under Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 lakh), and Tarun (₹5 lakh to ₹10 lakh) categories, with loan amounts up to ₹10 lakh.",
    requiredDocuments: [
      "Business plan",
      "Identity proof",
      "Address proof",
      "Bank statements",
      "Other documents required by the lender"
    ],
    applicationProcess: "Apply through a participating bank branch or through the JanSamarth portal.",
    officialSource: "mudra.org.in",
    officialUrl: "https://www.mudra.org.in",
    description: "Micro-enterprise credit initiative offering collateral-free business loans up to ₹10 lakh across Shishu, Kishore, and Tarun tiers for small enterprises.",
    keywords: ["business loan", "mudra", "micro enterprise", "credit", "collateral free", "shishu", "kishore", "tarun", "small business", "finance"]
  },
  {
    id: "pm-svanidhi",
    schemeName: "PM SVANidhi",
    category: "Street Vendor Credit",
    type: "Central",
    eligibilityCriteria: "Eligible street vendors operating in urban areas who meet the scheme’s identification and eligibility requirements.",
    ageLimit: "18+ years.",
    incomeLimit: "No fixed general income limit; eligibility is linked to eligible street-vendor status.",
    keyBenefits: "Collateral-free working-capital loans, with the loan limit increasing in subsequent cycles subject to repayment and scheme conditions, along with applicable interest subsidy.",
    requiredDocuments: [
      "Certificate of Vending / Letter of Recommendation or other vendor identification",
      "Aadhaar card",
      "Required KYC documents"
    ],
    applicationProcess: "Apply through the PM SVANidhi portal, Common Service Centre, or participating lending institution.",
    officialSource: "pmsvanidhi.mohua.gov.in",
    officialUrl: "https://pmsvanidhi.mohua.gov.in",
    description: "Micro-credit working capital loan scheme for urban street vendors featuring affordable collateral-free loans with interest subsidies and digital cashbacks.",
    keywords: ["street vendor", "hawker", "working capital", "micro credit", "svanidhi", "vendor loan", "urban livelihood", "thela"]
  },
  {
    id: "pm-vishwakarma",
    schemeName: "PM Vishwakarma Scheme",
    category: "Artisans & Craftspeople",
    type: "Central",
    eligibilityCriteria: "Traditional artisans and craftspeople working in one of the 18 specified trades and meeting the scheme’s eligibility conditions.",
    ageLimit: "18+ years.",
    incomeLimit: "No specific general income limit.",
    keyBenefits: "Skill training, toolkit incentive of up to ₹15,000, and collateral-free credit support of up to ₹3 lakh in applicable stages.",
    requiredDocuments: [
      "Aadhaar card",
      "Bank account details",
      "Documents/information establishing eligibility as an artisan in the relevant trade"
    ],
    applicationProcess: "Apply through a Common Service Centre (CSC), followed by verification through the prescribed local authorities.",
    officialSource: "pmvishwakarma.gov.in",
    officialUrl: "https://pmvishwakarma.gov.in",
    description: "End-to-end holistic support for traditional artisans across 18 craft trades offering skill training, ₹15,000 toolkit grants, and collateral-free credit up to ₹3 lakh.",
    keywords: ["artisan", "craftsperson", "carpenter", "blacksmith", "potter", "sculptor", "vishwakarma", "toolkit", "traditional trade", "handicrafts"]
  },
  {
    id: "stand-up-india",
    schemeName: "Stand-Up India Scheme",
    category: "Entrepreneurship",
    type: "Central",
    eligibilityCriteria: "Eligible SC/ST and/or women entrepreneurs establishing a greenfield enterprise.",
    ageLimit: "18+ years.",
    incomeLimit: "No specific income limit.",
    keyBenefits: "Bank loans ranging from ₹10 lakh to ₹1 crore for eligible greenfield enterprises.",
    requiredDocuments: [
      "Project report",
      "Identity proof",
      "Caste certificate where applicable",
      "Business documents",
      "Other bank-required documents"
    ],
    applicationProcess: "Apply through the Stand-Up India portal or approach a participating bank branch.",
    officialSource: "standupmitra.in",
    officialUrl: "https://www.standupmitra.in",
    description: "Flagship entrepreneurship scheme facilitating bank loans between ₹10 lakh and ₹1 crore to women and SC/ST founders setting up greenfield ventures.",
    keywords: ["entrepreneurship", "women entrepreneur", "sc", "st", "greenfield", "business startup", "stand up india", "1 crore loan", "factory"]
  },
  {
    id: "pmegp",
    schemeName: "PM Employment Generation Programme (PMEGP)",
    category: "Employment Generation",
    type: "Central",
    eligibilityCriteria: "Eligible individuals and organizations such as self-help groups, institutions, and cooperatives establishing new micro-enterprises, subject to scheme conditions.",
    ageLimit: "18+ years for individual applicants.",
    incomeLimit: "No general income ceiling for individual beneficiaries under the scheme.",
    keyBenefits: "Credit-linked margin-money subsidy for eligible projects, with subsidy rates generally ranging from 15% to 35% depending on category and location.",
    requiredDocuments: [
      "Aadhaar card",
      "Project report",
      "Educational / technical documents where applicable",
      "Caste / category proof where applicable",
      "Other required documents"
    ],
    applicationProcess: "Apply online through the KVIC PMEGP portal and complete the prescribed bank and verification process.",
    officialSource: "kviconline.gov.in",
    officialUrl: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
    description: "Credit-linked government subsidy program fostering employment generation through new micro-enterprises with margin money subsidies up to 35%.",
    keywords: ["employment", "subsidy", "pmegp", "kvic", "micro enterprise", "manufacturing", "services", "self employment", "job creation"]
  },
  {
    id: "sisfs",
    schemeName: "Startup India Seed Fund Scheme (SISFS)",
    category: "Startup Funding",
    type: "Central",
    eligibilityCriteria: "Eligible DPIIT-recognized startups meeting the scheme’s incorporation, innovation, and funding requirements.",
    ageLimit: "Not applicable as an individual age criterion; startup incorporation-age conditions apply.",
    incomeLimit: "No general income limit.",
    keyBenefits: "Financial support for proof of concept, prototype development, product trials, market entry, and commercialization. Eligible startups may receive grants of up to ₹20 lakh and investment support of up to ₹50 lakh through the applicable mechanism.",
    requiredDocuments: [
      "DPIIT recognition details",
      "Business plan",
      "Pitch deck",
      "Incorporation documents",
      "Other documents required during application"
    ],
    applicationProcess: "Apply online through the Startup India portal and participate in the selection process through eligible incubators.",
    officialSource: "seedfund.startupindia.gov.in",
    officialUrl: "https://seedfund.startupindia.gov.in",
    description: "Early-stage financial seed support delivering up to ₹20 lakh grants and ₹50 lakh debt/convertible investments to DPIIT-recognized tech and innovation startups.",
    keywords: ["startup", "seed fund", "dpiit", "incubator", "prototype", "innovation", "grant", "venture", "sisfs", "tech startup"]
  },
  {
    id: "cgtmse",
    schemeName: "Credit Guarantee Scheme – CGTMSE",
    category: "MSME Loan Guarantee",
    type: "Central",
    eligibilityCriteria: "Eligible new and existing Micro and Small Enterprises (MSEs) seeking credit facilities from participating lenders.",
    ageLimit: "No specific individual age limit; the enterprise and applicant must meet lender and scheme requirements.",
    incomeLimit: "No general income limit; eligibility is based on the MSE and credit-facility conditions.",
    keyBenefits: "Credit guarantee support for eligible collateral-free business loans, subject to the applicable guarantee ceiling and scheme guidelines.",
    requiredDocuments: [
      "Project report",
      "Business registration documents",
      "GST details where applicable",
      "KYC documents",
      "Other lender-required documents"
    ],
    applicationProcess: "Approach a participating bank/NBFC or other eligible member lending institution for the credit facility and request applicable CGTMSE guarantee coverage.",
    officialSource: "cgtmse.in",
    officialUrl: "https://www.cgtmse.in",
    description: "Institutional credit guarantee system enabling Micro and Small Enterprises to secure collateral-free bank loans with government guarantee coverage.",
    keywords: ["msme", "credit guarantee", "cgtmse", "mse", "business credit", "collateral free loan", "bank finance", "working capital"]
  },
  {
    id: "srms",
    schemeName: "Self Employment Scheme for Rehabilitation of Manual Scavengers (SRMS)",
    category: "Rehabilitation / Business",
    type: "Central",
    eligibilityCriteria: "Eligible identified/released manual scavengers and their dependents covered under the rehabilitation programme.",
    ageLimit: "18+ years for relevant self-employment assistance.",
    incomeLimit: "No general income limit; eligibility is based on identification under the rehabilitation scheme.",
    keyBenefits: "Assistance for self-employment, including capital subsidy, concessional credit, and training-related support according to the applicable scheme provisions.",
    requiredDocuments: [
      "Identification/eligibility proof issued through the prescribed local authority",
      "Aadhaar card",
      "Bank details",
      "Other required documents"
    ],
    applicationProcess: "Apply through the designated State Channelising Agencies (SCAs) and implementing authorities.",
    officialSource: "nsfdc.nic.in",
    officialUrl: "https://nsfdc.nic.in",
    description: "Rehabilitation initiative delivering capital subsidies, concessional loans, and livelihood skill training to manual scavengers and their dependents.",
    keywords: ["rehabilitation", "self employment", "srms", "manual scavengers", "subsidy", "concessional loan", "livelihood", "nsfdc", "dignity"]
  }
];
