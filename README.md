# Efes Event Hub: Responsive Event Management Platform

Task: Design and Develop a Responsive Event Management Website  
Competition: K Explore: Web Designing  
Template Reference: Hostinger Builder "Efes" Event Template  
Technologies: HTML5, CSS3, JavaScript (ES6+)  

---

## 1. Executive Summary

Efes Event Hub is an event discovery and registration platform built for the K Explore web designing competition, directly adapted from the layout architecture, high-contrast visual rhythm, and typography of the official **Hostinger Website Builder "Efes" template**.

The platform is designed around the signature Efes aesthetic:
- **Color Palette:** Deep Royal Violet (`#230d66`), Crisp White (`#ffffff`), Contrast Purple (`#463089`), and Saffron Gold (`#f59e0b`).
- **Typography:** Classical serif display in **Playfair Display** (96px H1 desktop scale) paired with high-legibility geometric sans-serif in **Montserrat** for body, UI controls, navigation, and badges.
- **Form Factor:** Sharp rectangular geometry (`border-radius: 0px`), clean borders, and alternating high-contrast section rhythm (Deep Violet to Pure White).
- **Zero Build Dependencies:** Operates natively in any browser with zero package managers, build steps, or frameworks.

---

## 2. Hostinger Efes Sections Implemented

Efes Event Hub replicates the complete section sequence of the Hostinger Efes event template:

1. **Top Announcement Bar & Header Navigation:** Minimalist top bar with stylized monogram branding ("EFES EVENTS"), primary navigation anchors (Home, Programs, About, Experts, Agenda), currency tag ("INR (₹) Enabled"), and slide-out "My Passes" vault drawer trigger.
2. **Hero Section (Efes Block 0):** High-contrast deep violet section featuring an editorial event date tag, massive serif display heading ("National Innovation & Cultural Conclave 2026"), narrative introduction, instant search bar, telemetry counters (8 curated programs, INR / Free access, live clocks), and an interactive Flagship Spotlight Card with real-time countdown.
3. **Philosophy Statement Banner (Efes Block B-OuEvMPr):** Crisp white section presenting the prominent centered quote in Playfair Display: *"In a world of rapid digital change, it is essential to build platforms that elevate community, craftsmanship, and open access."*
4. **About The Summit & Unconference Pillars (Efes Block QLOF7S9Wn5yvnap8e_ykg):** 3-column card grid highlighting the event foundation:
   - 01. The Aim: Democratizing high-impact technical workshops and open toolchains with zero paywalls.
   - 02. Dynamic Discussion: Keynote panels across applied machine learning, zero-trust cybersecurity, classical music, and venture funding.
   - 03. Collaborative Brainstorm: Intensive hackathons and design sprints with direct one-on-one architecture reviews.
5. **Interactive Event Directory & Filter Engine:** High-performance catalog featuring all 8 events with:
   - Discipline category pills (Technology, Music, Business, Arts, Workshops, Sports, Academic).
   - Format filter (All, In-Person, Virtual, Hybrid).
   - Admission tier filter (All, Free Access Only, Paid Passes in INR ₹).
   - Sort orders (Date, Price: Low to High, Title).
   - Dual-view toggle (Expanded Card Grid View vs Compact Schedule List View).
6. **Discussion Experts & Keynotes Grid (Efes Block bJZ4Bl4dz):** Pure white background with editorial speaker portrait cards featuring Dr. Arvind Rao, Niladri Sen, Meera Iyer, and Sunita Deshmukh.
7. **Program Schedule & Agenda (Efes Block RwM2mi99S):** Deep violet section laying out the complete chronological timetable with time badges (09:30 AM, 11:00 AM, 02:00 PM, 04:30 PM, 06:30 PM) and session descriptions.
8. **Institutional Partners & Patrons (Efes Block Y-XRjOS_r):** Pure white background featuring clean monochrome partner typography.
9. **Closing Call to Action (Efes Block tkagUNy765):** Deep violet banner inviting attendees to reserve passes with prominent call-to-action buttons.
10. **Interactive Modals & Pass Vault Drawer:**
    - Event Detail Modal with program overview and full session agenda.
    - Registration Modal with live INR (₹) total calculation and client-side validation.
    - Digital Boarding Pass Modal with unique pass codes (`VIS-2026-XXXX`) and one-click `.ics` calendar invite downloads.
    - Slide-out Pass Vault Drawer managing stored registrations with print layout support (`window.print()`) and JSON export.

---

## 3. Indian Rupee (₹) Pricing Split

Per competition requirements, admission fees are balanced between free community access and transparent fees in Indian Rupees (`₹`):
- **Free Entry Events (4):**
  - National Hackathon and AI Sprint 2026 (Bengaluru & Online)
  - Founders and Startup Conclave 2026 (New Delhi)
  - Inter-University Cultural Fest (Chennai)
  - Clean Tech and EV Mobility Symposium (Hyderabad)
- **Paid Events in Indian Rupees (4):**
  - Raga and Rhythm: Fusion Music Concert: `₹499` (Mumbai)
  - UI/UX Design Systems Masterclass: `₹399` (Bengaluru)
  - Dark Web and Zero-Trust Defense Summit: `₹699` (Pune)
  - Premier Badminton Championship: `₹250` (Bengaluru)

The registration dialog automatically multiplies the per-pass rate by attendee count (1 to 5 passes) in Indian Rupees, while free events confirm zero-cost access.

---

## 4. File Structure

```
8015/
├── index.html            # Semantic HTML5 single-page application (Hostinger Efes layout)
├── test.html             # Automated in-browser test suite (27 unit & integration tests)
├── css/
│   └── styles.css        # Hostinger Efes design system, variables, typography & layouts
├── js/
│   ├── data.js           # 8 curated events with dynamic dates, speakers & agendas
│   ├── storage.js        # LocalStorage persistence manager with memory fallback
│   ├── validation.js     # Form input validator (name, RFC email, 10-digit mobile, terms)
│   └── app.js            # Controller: clocks, search debounce, dual-view, dialogs & drawer
└── README.md             # Project documentation and deployment guide
```

---

## 5. Automated Verification Suite

An automated test suite is provided in `test.html`. To run the tests, open `test.html` in any web browser.

The suite asserts 27 conditions:
- Full name input validation: standard Indian names, hyphenated names, length boundaries, symbol rejections.
- RFC email validation: standard addresses, subdomains, missing components.
- Phone validation: standard 10-digit mobile numbers, formatted inputs, short number rejections.
- Pass count constraints: boundary checks from 1 to 5 passes.
- Terms agreement validation.
- Storage manager: pass creation with `VIS-2026-` identifier prefix, retrieval by ID, deletion, theme persistence.
- Data fixtures: 8 events array verification, 4 free programs verification, 4 INR programs verification, category filtering, and flagship spotlight configuration.

Verification Result: 27 tests executed, 27 passed, 0 failed.

---

## 6. How to Run Locally

1. Double-click `index.html` to open directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.
2. Open `test.html` in your browser to inspect and run the automated test suite.

Optional local server via Python:
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in your browser.

---

## 7. Version Control (Git Setup)

All git histories and repository files have been excluded from the directory so that you have complete ownership to create your own commits.

To initialize your own local Git repository and push to GitHub:

```bash
# 1. Initialize a new Git repository
git init

# 2. Stage all project files
git add .

# 3. Create your initial commit
git commit -m "Initial commit of Efes Event Hub"

# 4. Set the main branch
git branch -M main

# 5. Link your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push to GitHub
git push -u origin main
```

### GitHub Pages Deployment
1. In your GitHub repository, open Settings.
2. Select Pages from the left navigation.
3. Under Build and deployment > Branch, choose `main` and root `/`.
4. Click Save. Your website will be live in 1 to 2 minutes at `https://<your-username>.github.io/<your-repo-name>/`.

---

## 8. License
Distributed under the MIT License. Developed for the K Explore web designing competition.
