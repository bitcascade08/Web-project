/**
 * Vistara Event Hub - Events Database
 * Dynamic dates calculated relative to current time for active countdown clocks.
 * Pricing is configured in Indian Rupees (₹), with open-access events marked Free.
 */

function getFutureOffsetDate(days, hours = 0, minutes = 0) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(d.getHours() + hours, minutes, 0, 0);
  return d.toISOString();
}

const EVENTS_DATA = [
  {
    id: "vis-1",
    title: "National Hackathon and AI Sprint 2026",
    category: "technology",
    categoryLabel: "Technology",
    format: "Hybrid",
    date: getFutureOffsetDate(3, 4, 30),
    formattedDate: "Nov 6, 2026 • 09:30 AM IST",
    venue: "Tech Park Auditorium, Bengaluru & Online Stream",
    price: "Free",
    isFree: true,
    numericPrice: 0,
    currencySymbol: "₹",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "A 36-hour competitive hackathon focused on applied AI, open data protocols, and developer toolchains.",
    fullDescription: "Join student developers, engineers, and researchers for an intensive 36-hour sprint. Teams build solutions across healthcare diagnostics, agricultural logistics, and public digital infrastructure with direct mentorship from senior staff engineers.",
    speaker: "Dr. Arvind Rao (Head of AI Research, Applied Systems)",
    organizer: "National Developer Guild",
    totalCapacity: 600,
    seatsRemaining: 48,
    isSpotlight: true,
    tags: ["Hackathon", "AI", "Open Source", "Bengaluru"],
    agenda: [
      { time: "09:30 AM", session: "Opening Ceremony and Problem Statements Announcement" },
      { time: "11:00 AM", session: "Sprint Begins and Architecture Mentorship" },
      { time: "06:00 PM", session: "Midpoint Progress Review and Code Evaluation" }
    ]
  },
  {
    id: "vis-2",
    title: "Raga and Rhythm: Fusion Music Concert",
    category: "music",
    categoryLabel: "Music & Concerts",
    format: "In-Person",
    date: getFutureOffsetDate(5, 7, 0),
    formattedDate: "Nov 8, 2026 • 06:30 PM IST",
    venue: "Shanmukhananda Auditorium, Mumbai",
    price: "₹499",
    isFree: false,
    numericPrice: 499,
    currencySymbol: "₹",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "A live evening blending classical Hindustani instrumentation with modern acoustic and jazz arrangements.",
    fullDescription: "A musical concert featuring sitar, sarod, tabla, and modern acoustic bass. The ensemble performs classical morning and evening ragas adapted for contemporary acoustics in an auditorium setting.",
    speaker: "Performers: Niladri Sen Trio with Special Guest Percussionists",
    organizer: "Sangeet Heritage Foundation",
    totalCapacity: 1200,
    seatsRemaining: 140,
    isSpotlight: false,
    tags: ["Classical Fusion", "Live Concert", "Sitar", "Mumbai"],
    agenda: [
      { time: "06:30 PM", session: "Auditorium Seating and Opening Remarks" },
      { time: "07:00 PM", session: "Acoustic Raga Explorations: Sitar and Tabla" },
      { time: "08:30 PM", session: "Ensemble Fusion Finale" }
    ]
  },
  {
    id: "vis-3",
    title: "Founders and Startup Conclave 2026",
    category: "business",
    categoryLabel: "Business & Startups",
    format: "In-Person",
    date: getFutureOffsetDate(8, 2, 15),
    formattedDate: "Nov 11, 2026 • 10:00 AM IST",
    venue: "Research Park Convention Center, New Delhi",
    price: "Free",
    isFree: true,
    numericPrice: 0,
    currencySymbol: "₹",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Interactive pitch forum and networking conclave connecting early-stage founders with seed investors.",
    fullDescription: "A full-day summit bringing together founders, product managers, and angel syndicates. Features ten live startup presentations, panel discussions on unit economics, and dedicated 1-on-1 discussion lounges.",
    speaker: "Keynote: Meera Iyer (Partner, Bharat Seed Fund)",
    organizer: "E-Cell Federation",
    totalCapacity: 350,
    seatsRemaining: 28,
    isSpotlight: false,
    tags: ["Startups", "Venture", "Entrepreneurship", "New Delhi"],
    agenda: [
      { time: "10:00 AM", session: "Welcome Address: Building Scalable Products" },
      { time: "11:30 AM", session: "Live 5-Minute Pitch Demonstrations" },
      { time: "02:00 PM", session: "Founder-Investor Roundtables" }
    ]
  },
  {
    id: "vis-4",
    title: "Nritya: Classical and Contemporary Dance Fest",
    category: "cultural",
    categoryLabel: "Arts & Culture",
    format: "In-Person",
    date: getFutureOffsetDate(11, 8, 30),
    formattedDate: "Nov 14, 2026 • 05:00 PM IST",
    venue: "Kalakshetra Foundation, Chennai",
    price: "₹250",
    isFree: false,
    numericPrice: 250,
    currencySymbol: "₹",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "A regional festival highlighting Bharatanatyam, Kathak, and contemporary choreographic performances.",
    fullDescription: "Celebrates classical and contemporary Indian choreographic works. Includes ensemble recitals, lecture-demonstrations on mudras and rhythm patterns, and open discussions with performing artists.",
    speaker: "Curated by Guru Ananya Swaminathan",
    organizer: "Chennai Cultural Arts Forum",
    totalCapacity: 500,
    seatsRemaining: 92,
    isSpotlight: false,
    tags: ["Dance", "Bharatanatyam", "Culture", "Chennai"],
    agenda: [
      { time: "05:00 PM", session: "Lamp Lighting and Traditional Invocation" },
      { time: "05:45 PM", session: "Solo and Duet Classical Recitals" },
      { time: "07:30 PM", session: "Contemporary Ensemble Performance" }
    ]
  },
  {
    id: "vis-5",
    title: "Full-Stack Web and Cloud Architecture Masterclass",
    category: "workshops",
    categoryLabel: "Workshops",
    format: "Virtual",
    date: getFutureOffsetDate(14, 1, 0),
    formattedDate: "Nov 17, 2026 • 02:00 PM IST",
    venue: "Live Virtual Lab (Google Meet & GitHub)",
    price: "Free",
    isFree: true,
    numericPrice: 0,
    currencySymbol: "₹",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Hands-on engineering workshop on clean system design, REST interfaces, and serverless deployment.",
    fullDescription: "A practical developer session covering database indexing, caching strategies, and responsive UI architecture. Every attendee receives repository templates and deployment walkthroughs.",
    speaker: "Instructor: Rohan Verma (Staff Architect)",
    organizer: "Open Web Collective",
    totalCapacity: 800,
    seatsRemaining: 110,
    isSpotlight: false,
    tags: ["Web Development", "Cloud", "Architecture", "Hands-on"],
    agenda: [
      { time: "02:00 PM", session: "Core Web Architecture and Request Lifecycle" },
      { time: "03:15 PM", session: "Building Resilient RESTful APIs and Schema Design" },
      { time: "04:30 PM", session: "Live Deployment and Performance Profiling" }
    ]
  },
  {
    id: "vis-6",
    title: "Bengaluru Midnight 10K and 5K Run",
    category: "sports",
    categoryLabel: "Sports & Fitness",
    format: "In-Person",
    date: getFutureOffsetDate(18, 15, 30),
    formattedDate: "Nov 21, 2026 • 10:30 PM IST",
    venue: "Cubbon Park Peripheral Loop, Bengaluru",
    price: "₹699",
    isFree: false,
    numericPrice: 699,
    currencySymbol: "₹",
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "A night-time road run supporting sports training programs, featuring electronic timing chips and medals.",
    fullDescription: "An annual community night run through the illuminated perimeter of Cubbon Park. Certified timing chips, hydration stations every 2.5 kilometers, on-site physio support, and commemorative technical t-shirts provided to all registered participants.",
    speaker: "Race Director: Coach Sandeep Patil",
    organizer: "Bengaluru Athletics Club",
    totalCapacity: 1500,
    seatsRemaining: 220,
    isSpotlight: false,
    tags: ["10K", "5K", "Running", "Night Run", "Fitness"],
    agenda: [
      { time: "09:30 PM", session: "Bib Collection and Warm-Up Drills" },
      { time: "10:30 PM", session: "10K Competitive Wave Flag-Off" },
      { time: "11:00 PM", session: "5K Community Run Flag-Off" }
    ]
  },
  {
    id: "vis-7",
    title: "UI/UX Product Design and Accessibility Bootcamp",
    category: "workshops",
    categoryLabel: "Workshops",
    format: "Hybrid",
    date: getFutureOffsetDate(22, 5, 0),
    formattedDate: "Nov 25, 2026 • 11:00 AM IST",
    venue: "HITEC City Design Center, Hyderabad & Online",
    price: "₹399",
    isFree: false,
    numericPrice: 399,
    currencySymbol: "₹",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Intensive design sprint focusing on accessibility standards, design systems, and responsive layouts.",
    fullDescription: "Learn to build accessible design components from Figma to responsive HTML and CSS. Includes live usability audit sessions, keyboard navigation testing, and color contrast evaluation.",
    speaker: "Kavita Nair (Principal Product Designer)",
    organizer: "Design Guild Hyderabad",
    totalCapacity: 250,
    seatsRemaining: 35,
    isSpotlight: false,
    tags: ["UI/UX", "Figma", "Accessibility", "Design Systems"],
    agenda: [
      { time: "11:00 AM", session: "Accessibility Fundamentals and Contrast Audits" },
      { time: "01:00 PM", session: "Component Architecture and Motion Guidelines" },
      { time: "03:00 PM", session: "Design Review Sprint and Project Feedback" }
    ]
  },
  {
    id: "vis-8",
    title: "Inter-University Youth Debate and Policy Summit",
    category: "academic",
    categoryLabel: "Academic & Debate",
    format: "In-Person",
    date: getFutureOffsetDate(26, 9, 0),
    formattedDate: "Nov 29, 2026 • 10:00 AM IST",
    venue: "Central University Convocation Hall, Pune",
    price: "Free",
    isFree: true,
    numericPrice: 0,
    currencySymbol: "₹",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "A three-tier parliamentary debate competition addressing public digital goods, climate action, and trade.",
    fullDescription: "Bringing together collegiate debating teams across the country. Teams debate motions on economic policy, technology regulation, and sustainability before an adjudicator panel of policy analysts and legal scholars.",
    speaker: "Chief Adjudicator: Prof. Vikram Joshi",
    organizer: "National Parliamentary Debate Society",
    totalCapacity: 400,
    seatsRemaining: 65,
    isSpotlight: false,
    tags: ["Debate", "Policy", "Students", "Pune"],
    agenda: [
      { time: "10:00 AM", session: "Preliminary Debating Rounds (3 Parallel Rooms)" },
      { time: "02:00 PM", session: "Semi-Final Parliamentary Match" },
      { time: "04:30 PM", session: "Grand Finale and Awards Ceremony" }
    ]
  }
];

const FALLBACK_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><defs><linearGradient id="vg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e3a8a"/><stop offset="100%" stop-color="%232563eb"/></linearGradient></defs><rect width="800" height="450" fill="url(%23vg)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-weight="700" font-size="24">Vistara Event Hub</text></svg>`;
