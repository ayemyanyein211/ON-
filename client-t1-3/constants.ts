import { SiteData, TeamMember, ServiceItem, PackageItem, University, Scholarship, BlogPost } from './types';

// --- SECURITY CONFIGURATION ---
// Passwords are now stored as SHA-256 hashes
// Admin Password ("admin123"): 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9
// 2FA Code ("123456"): 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92

export const ADMIN_CREDENTIALS = {
  email: "admin@omnorianexus.com",
  passwordHash: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9", 
  twoFactorHash: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92" 
};

export const INITIAL_DATA: SiteData = {
  companyName: "OMNORIA NEXUS",
  logoUrl: "", 
  tagline: "ON to the World | One-Stop International Services",
  vision: "To be a globally trusted one-stop hub for international education, travel, and student support services—guiding individuals ON to the world with confidence, clarity, and reliability.",
  mission: [
    "To provide one-stop and individual international services tailored to the needs of students and travelers",
    "To deliver accurate information, professional consultation, and reliable support",
    "To simplify education, visa, travel, and settlement processes",
    "To assist clients step by step or through complete service solutions",
    "To support international journeys from consultation to arrival and beyond"
  ],
  disclaimer: "Omnoria Nexus provides consultation, information, and administrative support services only. We do not issue scholarships, visas, or exchange programs. All final decisions are made by universities, institutions, embassies, and official authorities.",
  values: [
    { title: "Transparency & Integrity", description: "We provide honest information, clear processes, and ethical guidance at every stage." },
    { title: "One-Stop Convenience", description: "We offer complete solutions under one platform while allowing clients to choose individual services as needed." },
    { title: "Client-Centered Service", description: "Every student and traveler receives personalized attention and flexible service options." },
    { title: "Professional Excellence", description: "We maintain high standards in service quality, accuracy, and international compliance." },
    { title: "Global Connectivity", description: "We connect clients ON to the world through global education, travel, and mobility opportunities." },
    { title: "Reliability & Responsibility", description: "We commit to timely support and responsible guidance, respecting institutional and governmental regulations." }
  ],
  contact: {
    phone: ["+95 92039787", "+40 747257022", "+40 779228837"],
    email: "omnorianexus@gmail.com",
    address: "Yangon, Myanmar / Bucharest, Romania",
    whatsapp: ["+40 779228837", "+95 9771711747"],
    socials: {
      facebook: "https://www.facebook.com/share/1C6f79NtdE/?mibextid=wwXIfr",
      instagram: "https://www.instagram.com/omnoria_nexus_2026/?hl=en",
      tiktok: "", // Replaces Twitter/X
      youtube: "https://youtube.com/@omnorianexus?si=aTVMjuJ1jWdrGx3H"
    }
  },
  policy: {
    servicePolicy: "Omnoria Nexus provides consultation, information, guidance, and administrative support services related to international education, travel, visas, documentation, and student support. We do not issue Visas, Scholarships, Exchange programs, Residence permits, or Airline tickets directly. All final decisions are made by universities, institutions, embassies, airlines, and government authorities.",
    refundPolicy: "Service fees paid to Omnoria Nexus are generally non-refundable, as fees cover consultation time, administrative work, and professional services already rendered. Partial refunds may be considered only if the service has not started AND no documentation or processing work has been completed.",
    liability: "Omnoria Nexus shall not be held liable for Visa, admission, or scholarship rejections; Delays caused by embassies, institutions, or government authorities; Changes in laws, policies, or immigration rules."
  }
};

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: '1',
    name: "Mya Khwar Nyo",
    position: "Founder & CEO",
    bio: "Mya Khwar Nyo is the founder of Omnoria Nexus and leads the team with vision and expertise in international education, travel, and student support. She oversees all operations to ensure high-quality, personalized services for every client.",
    email: "ceo@omnorianexus.com",
    linkedin: "#",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500",
    reviews: [
      { id: 'r1', clientName: "Thandar Lwin", text: "Mya guided me through every step of my university application in Romania. Highly recommended!", rating: 5 },
      { id: 'r2', clientName: "John Smith", text: "Exceptional leadership and very transparent service.", rating: 5 }
    ]
  },
  {
    id: '2',
    name: "Aye Mya Nyein",
    position: "Co-Manager & Operations Lead",
    bio: "Aye Mya Nyein oversees day-to-day operations and ensures seamless management across all areas of Omnoria Nexus. She handles client services, including consultation, admissions, visas, travel planning, and documentation.",
    email: "ops@omnorianexus.com",
    linkedin: "#",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500",
    reviews: [
      { id: 'r3', clientName: "Hlaing Min", text: "Aye made the visa process so simple for me. Thank you!", rating: 4 }
    ]
  },
  {
    id: '3',
    name: "Pyae Sone Hein",
    position: "Service Coordinator & Marketing Lead",
    bio: "Pyae Sone Hein provides end-to-end support for students and travelers, managing admissions, visas, travel, and accommodation services. In addition, he oversees marketing and social media.",
    email: "coordinator@omnorianexus.com",
    linkedin: "#",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500",
    reviews: []
  },
  {
    id: '4',
    name: "Jerry Ei Ei Nyein",
    position: "Scholarship & Exchange Program Specialist",
    bio: "Jerry specializes in providing guidance and information on scholarships and international exchange programs. She helps students explore opportunities and supports them throughout the application process.",
    email: "scholarships@omnorianexus.com",
    linkedin: "#",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=500",
    reviews: [
      { id: 'r4', clientName: "Sarah M.", text: "Thanks to Jerry, I found a scholarship that covers my tuition!", rating: 5 }
    ]
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  { id: 's1', name: "Each Consultation", price: "30 Euro", description: "Admission, Visa, Travel, or Accommodation consultation.", availableCountries: ["Global"] },
  { id: 's2', name: "Whole Consultation", price: "100 Euro", description: "Comprehensive consultation covering all aspects.", availableCountries: ["Global"] },
  { id: 's3', name: "Money Transfer & Exchange Assistance", price: "1% Commission", description: "Assistance with secure money transfers and exchange information.", availableCountries: ["Global"] },
  { id: 's4', name: "Flight Ticket Assistance", price: "10 Euro", description: "Booking and routing assistance.", availableCountries: ["Global"] },
  { id: 's5', name: "Fast Notary Legalization / MOFA", price: "30 Euro", description: "Fast Notary legalization and MOFA attestation support.", availableCountries: ["Myanmar", "Thailand", "Romania"] },
  { id: 's6', name: "Insurance Assistance", price: "15 Euro", description: "Student and travel insurance assistance.", availableCountries: ["Global"] },
  { id: 's7', name: "Airport Pickup & Transport Info", price: "80 Euro", description: "Pickup and public transport information.", availableCountries: ["Romania", "Thailand"] },
  { id: 's8', name: "Personalized Travel Planning", price: "Custom", description: "Tailored travel planning services.", availableCountries: ["Global"] },
];

export const INITIAL_PACKAGES: PackageItem[] = [
  {
    id: 'p1',
    title: "Package 1: Education Consultation & Admission",
    price: "200 EURO",
    features: [
      "Academic and career consultation", 
      "Money transfer and exchange information", 
      "University and institution admission guidance", 
      "Notary legalization & MOFA attestation", 
      "Application assistance and documentation support"
    ],
    availableCountries: ["Global"]
  },
  {
    id: 'p2',
    title: "Package 2: Scholarships & Exchange",
    price: "200 EURO",
    features: [
      "Scholarship opportunity information", 
      "Eligibility and requirement guidance", 
      "Application process support", 
      "Document preparation and submission assistance", 
      "Exchange program information and coordination"
    ],
    availableCountries: ["Global"]
  },
  {
    id: 'p3',
    title: "Package 3: Visa & Legal Documentation",
    price: "300 EURO",
    features: [
      "Visa information and application support", 
      "Online e-Visa application assistance", 
      "Notary legalization & MOFA attestation", 
      "TRC (Temporary Residence Certificate) information", 
      "General document information services", 
      "Banking Information"
    ],
    availableCountries: ["Global"]
  },
  {
    id: 'p4',
    title: "Package 4: Travel Planning & Mobility",
    price: "100 EURO",
    features: [
      "Personalized travel planning and guidance", 
      "Flight ticket booking assistance", 
      "Travel route and transit information", 
      "Airport pickup coordination and arrival information", 
      "Public transport and local travel guidance"
    ],
    availableCountries: ["Global"]
  },
  {
    id: 'p5',
    title: "Package 5: Accommodation, Financial & Health",
    price: "200 EURO",
    features: [
      "Accommodation information and arrangement assistance", 
      "Money transfer and exchange information", 
      "Student and travel insurance assistance", 
      "Contract and Tax", 
      "Medical certificate guidance and processing support", 
      "Banking information"
    ],
    availableCountries: ["Global"]
  },
  {
    id: 'p6',
    title: "Package 6: One-Stop Service Package",
    price: "650 EURO",
    features: [
      "Complete Solution for Education, Travel, Settlement", 
      "All services from Package 1, 3, 4 & 5 included",
      "Academic & Career Consultation",
      "Visa & E-Visa Support",
      "Travel Planning & Airport Pickup",
      "Accommodation & Settlement Support"
    ],
    availableCountries: ["Global"]
  }
];

export const INITIAL_UNIVERSITIES: University[] = [
  { id: 'u1', name: "University of Bucharest", countries: ["Romania"], description: "One of the oldest and most prestigious universities in Romania." },
  { id: 'u2', name: "Politehnica University", countries: ["Romania"], description: "Top technical university for engineering and computer science." },
  { id: 'u3', name: "Mahidol University", countries: ["Thailand"], description: "Top ranked university in Thailand offering international programs." }
];

export const INITIAL_SCHOLARSHIPS: Scholarship[] = [
  { id: 'sc1', name: "Romanian Government Scholarship", countries: ["Romania"], amount: "Full Tuition + Stipend", deadline: "March 15, 2025" },
  { id: 'sc2', name: "DAAD Scholarship", countries: ["Germany"], amount: "Monthly Stipend", deadline: "October 30, 2024" }
];

export const INITIAL_BLOG: BlogPost[] = [
  { id: 'b1', title: "Guide to Studying in Romania", date: "2024-05-10", content: "Romania offers affordable tuition and high-quality education for international students...", imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000" },
  { id: 'b2', title: "Visa Interview Tips", date: "2024-06-12", content: "Be honest, clear, and concise when speaking to consular officers. Prepare your documents...", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000" }
];