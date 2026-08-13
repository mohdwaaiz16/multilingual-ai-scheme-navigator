# Multilingual AI Government Scheme Navigator

## Overview
The **Multilingual AI Government Scheme Navigator** is a modern, citizen-focused digital platform created to assist ordinary citizens across India in discovering, understanding, and navigating government welfare schemes. The platform provides plain-language explanations of eligibility criteria, scheme benefits, interactive document readiness checklists, and direct links to official government application portals.

The platform is designed strictly as an **informational navigator** (not a government authority), consistently directing citizens to verify final guidelines on designated official government portals.

---

## Current Phase
**Frontend Phase 1** (Initial Prototype Release)

---

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (Civic & Accessible Color Palette)
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)
- **Language**: JavaScript (ES Modules)

---

## Features Implemented in Phase 1

1. **20 Verified Government Schemes Dataset**:
   - Structured JSON/JS data models extracted directly from the verified source dataset (`Schemes.txt`).
   - Includes schemes across Healthcare (PM-JAY), Maternity (PMMVY), Urban/Rural Housing (PMAY-U, PMAY-G), Solar Energy (PM Surya Ghar), Clean Energy (PMUY 2.0), Skill Training (PMKVY 4.0), Education (PM-SHRI, CSIS, Post-Matric Scholarships), Defence (Agnipath), Water (Jal Jeevan Mission), and Enterprise Credit (MUDRA, SVANidhi, PM Vishwakarma, Stand-Up India, PMEGP, SISFS, CGTMSE, SRMS).

2. **Landing Page (`/`)**:
   - High-impact hero section with direct search and quick query chips.
   - Interactive **Quick Scheme Finder** widget (Need, Beneficiary, State).
   - **Popular Categories Grid** with direct category exploration.
   - **Featured Schemes** showcase.
   - **How It Works** 5-step citizen roadmap.
   - **AI Assistant Prototype Banner** and **Official Trust & Disclaimer Notices**.

3. **Scheme Finder & Browse Directory (`/schemes`)**:
   - Instant search across scheme names, descriptions, categories, and keywords.
   - Comprehensive multi-parameter filtering:
     - By Category (All 20 verified categories)
     - By Scheme Type (Central Sector vs. Centrally Sponsored)
     - By Target Beneficiary (Students, Women, Entrepreneurs, Youth, Rural Households)
   - Dynamic sorting (Default, A-Z, Z-A, Category).
   - Live matched results counter and Active Filter chips with one-click clear.
   - Dedicated Category view tab.
   - Responsive mobile filter drawer.

4. **Detailed Scheme Deep Dive (`/schemes/:id`)**:
   - Overview and classification badges.
   - Age limit, income eligibility, and administration type summary.
   - Key benefits highlight card.
   - Detailed eligibility criteria breakdown.
   - **Interactive Document Checklist** with readiness progress tracking and print support.
   - Step-by-step application guidance.
   - Prominent **"Visit Official Source"** button pointing to verified government domains with mandatory verification notice.
   - Contextual related schemes recommendations.

5. **AI Scheme Assistant Prototype (`/assistant`)**:
   - Citizen-friendly conversational chat UI with message bubbles.
   - Suggested query prompt chips for instant exploration.
   - Local semantic matching engine providing relevant advice and embedding interactive scheme cards directly into the conversation.
   - Clear UI indicators stating prototype status.

6. **Language Selector (UI Prototype)**:
   - Support indicator for English, हिन्दी (Hindi), and తెలుగు (Telugu).

7. **Responsive & Accessible Design**:
   - Mobile-first layouts with smooth hamburger navigation and touch-friendly controls.
   - High-contrast typography and clear focus rings for accessibility.
   - Custom 404 page for nonexistent routes.

---

## Current Limitations (Phase 1)
- **Static Frontend Only**: Operates entirely on client-side local data with zero backend server dependencies.
- **No Real AI Model API**: The AI Assistant operates as a frontend prototype with local matching and does not yet invoke external LLM APIs (OpenAI / Gemini / Claude).
- **No External Database**: Data is bundled locally in `src/data/schemes.js`.
- **UI-Only Multilingual Engine**: Language switcher demonstrates UI selection; full multilingual translation engine is planned for Phase 2.
- **No User Accounts / Authentication**: No login or personalized citizen profile storage in this phase.

---

## Future Roadmap (Phase 2 & Beyond)
- **Backend Architecture**: Fast, lightweight API backend (FastAPI / Node.js).
- **Verified Production Database**: Scalable database (PostgreSQL / Supabase) expanding from 20 to 50+ central and state schemes.
- **Real Multilingual AI Engine**: LLM integration (Gemini / OpenAI / Claude) with multilingual NLP supporting 12+ Indian regional languages and voice input.
- **Personalized Eligibility Calculator**: Deep qualification rules engine matching citizen income certificates, caste categories, land holdings, and state domicile.
- **Official API Integrations**: Live portal status checks and DigiLocker document synchronization.
- **Admin Dashboard**: Content management system for verifying, updating, and publishing government scheme changes.

---

## Getting Started Locally

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repo-url>

# Navigate into project directory
cd scheme-navigator

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## License & Source Integrity
All scheme parameters in this repository are based on official Indian government scheme guidelines and documentation.
