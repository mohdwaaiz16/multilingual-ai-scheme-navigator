# SchemeSathi — Complete Government Scheme Navigator (10 Categories &bull; 70 Schemes)

## Overview
**SchemeSathi** is a citizen-focused platform designed to help ordinary people across India discover and navigate **70 verified Indian Government welfare schemes** organized across **10 official categories** (7 schemes per category).

SchemeSathi acts as a **scheme companion and navigator** (not a government authority), presenting personalized potential matches, plain-language benefit breakdowns, interactive document readiness checklists, and direct links to official government application portals.

---

## 10 Official Categories (7 Schemes Each = 70 Total)

1. **Food Security & Nutrition** (7 Schemes)
   - Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY)
   - PM POSHAN Scheme (Pradhan Mantri Poshan Shakti Nirman)
   - Saksham Anganwadi and Poshan 2.0 (ICDS)
   - Targeted Public Distribution System (TPDS) under NFSA
   - Antyodaya Anna Yojana (AAY)
   - Pradhan Mantri Matru Vandana Yojana (PMMVY)
   - Scheme for Fortification of Rice and its Distribution under TPDS

2. **Sports, Youth & Culture** (7 Schemes)
   - Khelo India Scheme
   - Target Olympic Podium Scheme (TOPS)
   - National Youth Corps (NYC)
   - Pandit Deendayal Upadhyay National Welfare Fund for Sportspersons
   - Scheme of Pension to Meritorious Sportspersons
   - Cultural Function and Production Grant
   - Preservation of Cultural Heritage of the Himalayas

3. **Financial Inclusion & Banking** (7 Schemes)
   - Pradhan Mantri Jan Dhan Yojana (PMJDY)
   - Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)
   - Pradhan Mantri Suraksha Bima Yojana (PMSBY)
   - Atal Pension Yojana (APY)
   - Pradhan Mantri MUDRA Yojana (PMMY)
   - Stand-Up India Scheme
   - PM SVANidhi (Pradhan Mantri Street Vendor’s Atmanirbhar Nidhi)

4. **Employment & Skill Development** (7 Schemes)
   - Pradhan Mantri Kaushal Vikas Yojana 4.0 (PMKVY 4.0)
   - Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS)
   - Prime Minister's Employment Generation Programme (PMEGP)
   - PM Vishwakarma Scheme
   - Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)
   - National Apprenticeship Promotion Scheme (NAPS / NAPS 2.0)
   - Prime Minister Internship Scheme (PMIS)

5. **Insurance & Social Security** (7 Schemes)
   - Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)
   - Pradhan Mantri Suraksha Bima Yojana (PMSBY)
   - Atal Pension Yojana (APY)
   - Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)
   - Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM)
   - Indira Gandhi National Old Age Pension Scheme (IGNOAPS)
   - Pradhan Mantri Fasal Bima Yojana (PMFBY)

6. **Business & Entrepreneurship** (7 Schemes)
   - Pradhan Mantri Mudra Yojana (PMMY)
   - Stand-Up India Scheme
   - Prime Minister's Employment Generation Programme (PMEGP)
   - Startup India Seed Fund Scheme (SISFS)
   - Credit Guarantee Fund Trust for MSEs (CGTMSE)
   - PM Vishwakarma Yojana
   - Venture Capital Assistance Scheme (VCAS)

7. **Government Employees & Pension** (7 Schemes)
   - Unified Pension Scheme (UPS)
   - National Pension System (NPS) — Government Sector
   - Central Government Health Scheme (CGHS)
   - System for Pension Administration (Raksha) — SPARSH
   - CCS (Pension) Rules — Family Pension Scheme
   - House Building Advance (HBA) Scheme
   - General Provident Fund (Central Services) — GPF

8. **Social Justice & Empowerment** (7 Schemes)
   - PM-DAKSH Scheme
   - SHREYAS Scheme
   - PM-YASASVI Scheme
   - SMILE Scheme
   - NAMASTE Scheme
   - ADIP Scheme
   - Rashtriya Vayoshri Yojana (RVY)

9. **Loans, Credit & Subsidies** (7 Schemes)
   - Pradhan Mantri Mudra Yojana (PMMY)
   - PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)
   - Prime Minister's Employment Generation Programme (PMEGP)
   - Stand-Up India Scheme
   - Kisan Credit Card (KCC) Scheme
   - PM Vishwakarma Scheme (Pradhan Mantri Vishwakarma)
   - Credit Guarantee Fund Scheme for Micro & Small Enterprises (CGTMSE)

10. **Education & Scholarships** (7 Schemes)
    - Pradhan Mantri Vidyalaxmi Scheme (PM-Vidyalaxmi)
    - PM Uchchatar Shiksha Protsahan (PM-USP) — Central Sector Scheme of Scholarship for College and University Students (CSSS)
    - PM Young Achievers Scholarship Award Scheme for Vibrant India (PM-YASASVI)
    - National Means-cum-Merit Scholarship Scheme (NMMSS)
    - Post-Matric Scholarship Scheme for SC Students (PMS-SC)
    - AICTE Pragati Scholarship Scheme for Girl Students
    - Begum Hazrat Mahal National Scholarship for Minority Girls

---

## User Flow & Routes
- **Home (`/`)**: Hero, Search across all 70 schemes, 10-category directory, featured initiatives, 4-step process, trust notice.
- **All Schemes (`/schemes`)**: Search, 10 Category filters, Government Level filter, Beneficiary filter, sorting.
- **Category Page (`/category/:categorySlug`)**: Deep dive into the 7 schemes of any category.
- **Scheme Details (`/schemes/:schemeId`)**: Full breakdown, About, Why Started, Who Can Benefit, How It Works, Government Support, Benefits, Eligibility criteria, Document checklist, Application steps, and Official portal button.
- **User Details (`/find`)**: Interactive questionnaire capturing age, state, role, income, and sub-details.
- **AI Results (`/results`)**: Scored matches (🟢 High Match, 🟡 Possible Match, ⚪ Explore) with evidence-based reasoning.
- **SchemeSathi AI (`/assistant`)**: Conversational companion referencing all 70 schemes with embedded cards.

---

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)
- **Data Source**: 10 Official Government Scheme Compendiums (Extracted & Validated)
