# SchemeSathi — Multilingual AI Government Scheme Navigator

## Overview
**SchemeSathi** is a citizen-focused platform designed to help ordinary people across India answer:
> *"What government schemes might I be eligible for?"*

SchemeSathi acts as a **scheme companion and navigator** (not a government authority), presenting personalized potential scheme matches, plain-language benefit breakdowns, interactive document readiness checklists, and direct links to official government application portals.

---

## 5-Screen User Experience

```text
Screen 1: Home (/)
  ↓
Screen 2: User Details (/find)
  ↓
Screen 3: AI Results (/results)
  ↓
Screen 4: Scheme Details (/schemes/:id)
  ↓
Screen 5: SchemeSathi AI (/assistant)
```

1. **Screen 1 — Home (`/`)**: High-impact landing page, keyword search across 20 schemes, 8 popular quick categories, featured initiatives, 4-step "How It Works" flow, and trust message.
2. **Screen 2 — User Details (`/find`)**: Clean multi-section form capturing Age, State, Occupation, Annual Income, and selectable Profile Role cards with dynamic follow-up questions.
3. **Screen 3 — AI Results (`/results`)**: Scored matches with clear indicators (🟢 High Match, 🟡 Possible Match, ⚪ Explore), specific "Why it may match" explanations, user profile summary, and "Edit Details" control.
4. **Screen 4 — Scheme Details (`/schemes/:id`)**: Category classification, "Potential Match" tag, About this scheme, Key benefits cards, Eligibility criteria matrix, interactive Document Checklist with progress tracking & print support, Numbered application steps, and verified Official Source button.
5. **Screen 5 — SchemeSathi AI (`/assistant`)**: Conversational AI companion prototype with suggested prompt chips and embedded scheme recommendations.

---

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 (Civic & Accessible Color Palette)
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)
- **Language**: JavaScript (ES Modules)

---

## The 20 Verified Schemes Integrated
1. **Ayushman Bharat – PM-JAY** (Healthcare)
2. **PM Matru Vandana Yojana (PMMVY)** (Maternity Welfare)
3. **PM Awas Yojana – Urban (PMAY-U)** (Urban Housing)
4. **PM Awas Yojana – Gramin (PMAY-G)** (Rural Housing)
5. **PM Surya Ghar: Muft Bijli Yojana** (Solar Energy)
6. **PM Ujjwala Yojana (PMUY 2.0)** (Clean Cooking Energy)
7. **PM Kaushal Vikas Yojana (PMKVY 4.0)** (Skill Training)
8. **PM-SHRI Schools Scheme** (School Education)
9. **Central Sector Interest Subsidy Scheme (CSIS)** (Higher Education)
10. **Post Matric Scholarship for SC/ST/OBC** (Student Scholarship)
11. **Agnipath Scheme** (Defence Service)
12. **Jal Jeevan Mission (JJM)** (Rural Water Supply)
13. **PM MUDRA Yojana (PMMY)** (Business Credit)
14. **PM SVANidhi** (Street Vendor Credit)
15. **PM Vishwakarma Scheme** (Artisans & Craftspeople)
16. **Stand-Up India Scheme** (Entrepreneurship)
17. **PM Employment Generation Programme (PMEGP)** (Employment Generation)
18. **Startup India Seed Fund Scheme (SISFS)** (Startup Funding)
19. **Credit Guarantee Scheme – CGTMSE** (MSME Loan Guarantee)
20. **Self Employment Scheme for Rehabilitation of Manual Scavengers (SRMS)** (Rehabilitation / Business)

---

## Local Development

```bash
# Navigate to project
cd scheme-navigator

# Install dependencies
npm install

# Start local server
npm run dev

# Build for production
npm run build
```
