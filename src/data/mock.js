// Mock data for Fullstack Mobile Developer Portfolio

export const personalInfo = {
  name: "Toby Gospel Iwarifgha",
  role: "Mobile App Developer",
  tagline: "Who Am I? A mobile app developer building apps that users love.",
  email: "hello@example.com", // Placeholder
  location: "Port Harcourt, Nigeria",
  availability: "Open to opportunities",
  yearsExperience: 4,
  resumeUrl: "#",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
};

export const bio = `Mobile app developer with 4+ years of experience specializing in cross-platform development using Flutter.

I build scalable applications with clean MVVM architecture, leveraging state management solutions like Riverpod, Provider, and Bloc/Cubit. My expertise includes seamless REST API integration and backend implementation with Firebase and Supabase.

I am experienced in production-ready fintech and crypto applications. Writing quality code using architectural structures that ensures maintainability and scalability as apps grow.`;

export const quickFacts = [
  { label: "Location", value: "Port Harcourt, Nigeria", icon: "MapPin" },
  { label: "Experience", value: "4+ Years", icon: "Briefcase" },
  { label: "Availability", value: "Open to Work", icon: "CheckCircle" },
  { label: "Apps Shipped", value: "3+ Production", icon: "Smartphone" },
];

export const skills = {
  "Mobile Development": [
    "Flutter",
    "Dart",
    "Kotlin",
    "Android",
    "iOS",
  ],
  Frontend: [
    "Riverpod",
    "Provider",
    "Bloc/Cubit",
    "MVVM Architecture",
  ],
  Backend: [
    "REST APIs",
    "Firebase",
    "Supabase",
  ],
  DevOps: [
    "CI/CD",
    "GitHub Actions",
  ],
  Tools: [
    "Git",
    "VS Code",
    "Android Studio",
  ],
};

export const projects = [
  {
    id: 1,
    title: "Hara",
    description:
      "Buy giftcards, easily buy and sell crypto currencies. Instant payout.",
    value: "Streamlined crypto and gift card transactions for users.",
    stack: ["Flutter", "Dart", "REST API"],
    role: "Mobile Developer",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    image: "/api/placeholder/600/400",
    metrics: ["Instant Payouts", "Crypto trading", "Giftcard support"],
  },
  {
    id: 2,
    title: "Dantown",
    description:
      "Buy and sell crypto currencies, swap tokens, get virtual cards, pay utility bills.",
    value: "Solving everyday mobile app problems in the Fintech and Crypto space.",
    stack: ["Flutter", "Dart", "REST API"],
    role: "Mobile Developer",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    image: "/api/placeholder/600/400",
    metrics: ["Virtual Cards", "Utility Bills", "Token Swapping"],
  },
  {
    id: 3,
    title: "Chatter",
    description:
      "Discover the heartbeat of your community with an App designed for local exploration, connection, and empowerment.",
    value: "Connecting local communities through a tailored mobile experience.",
    stack: ["Flutter", "Dart", "REST API"],
    role: "Mobile Developer Intern",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    image: "/api/placeholder/600/400",
    metrics: ["Community driven", "Local exploration", "Empowerment"],
  },
];

export const experience = [
  {
    id: 1,
    role: "Mobile Application Developer",
    company: "Hara Africa",
    period: "Jun 2025 - Present",
    description:
      "Full-time mobile developer focused on crypto and giftcard applications.",
    achievements: [
      "Built cross-platform app using Flutter and Dart",
      "Integrated secure REST APIs for instant payouts and crypto trading",
      "Ensured scalable MVVM architecture and state management",
    ],
  },
  {
    id: 2,
    role: "Mobile Application Developer",
    company: "Dantown",
    period: "May 2025 - Present",
    description:
      "Solving everyday mobile app problems in the Fintech and Crypto space using Flutter and Dart.",
    achievements: [
      "Developed features for buying/selling crypto and token swapping",
      "Integrated virtual cards and utility bill payment systems",
      "Maintained production-ready, quality code for a growing user base",
    ],
  },
  {
    id: 3,
    role: "Flutter Developer",
    company: "Chatter",
    period: "Nov 2024 - Jan 2026",
    description:
      "Full-time developer building an application for local exploration and community connection.",
    achievements: [
      "Implemented core features using Flutter, Dart, and REST APIs",
      "Contributed to building a platform that empowers local communities",
      "Gained foundational experience in production application development",
    ],
  },
];

export const caseStudies = [
  {
    id: 1,
    title: "Scaling FinanceFlow to 2M Users",
    problem:
      "The existing app struggled with performance issues during peak hours, with crash rates exceeding 5% and user complaints about slow transaction processing.",
    constraints:
      "Limited timeline of 8 weeks, no downtime allowed during migration, must maintain backward compatibility with existing user data.",
    approach:
      "Implemented lazy loading and code splitting, migrated to a more efficient state management solution, optimized database queries, and introduced a caching layer.",
    result:
      "Reduced crash rate to 0.3%, improved transaction speed by 340%, achieved 99.9% uptime, and increased user retention by 28%.",
  },
  {
    id: 2,
    title: "Building Offline-First Healthcare App",
    problem:
      "Rural healthcare workers needed access to patient data in areas with unreliable connectivity, existing web-based solution was unusable.",
    constraints:
      "HIPAA compliance required, must work with legacy backend systems, support for devices 5+ years old, minimal training for non-technical staff.",
    approach:
      "Designed offline-first architecture with conflict resolution, implemented end-to-end encryption, built progressive sync system that prioritizes critical data.",
    result:
      "Enabled healthcare delivery to 50K+ patients in remote areas, reduced data entry errors by 67%, achieved 100% HIPAA audit compliance.",
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "Alex transformed our mobile strategy. The app performance improvements alone saved us $200K in support costs.",
    author: "Sarah Mitchell",
    role: "CTO",
    company: "TechCorp Inc.",
  },
  {
    id: 2,
    quote:
      "Exceptional technical skills combined with great communication. Alex explains complex mobile architecture in ways everyone understands.",
    author: "David Park",
    role: "Product Manager",
    company: "HealthTech Startup",
  },
  {
    id: 3,
    quote:
      "The best mobile developer I've worked with. Delivered ahead of schedule with fewer bugs than any project I've managed.",
    author: "Jennifer Wu",
    role: "Engineering Director",
    company: "Digital Agency",
  },
];

export const terminalLines = [
  "$ deploying to production...",
  "[SUCCESS] Build completed in 2.3s",
  "$ running test suite...",
  "[PASS] 847 tests passed, 0 failed",
  "$ checking app performance...",
  "[INFO] Latency: 42ms | Uptime: 99.9%",
  "$ scanning for vulnerabilities...",
  "[SECURE] No critical issues found",
  "$ syncing with backend...",
  "[OK] API response time: 89ms",
];

export const commandPaletteItems = [
  { id: "hero", label: "Go to Hero", section: "hero", shortcut: "H" },
  { id: "about", label: "Go to About", section: "about", shortcut: "A" },
  { id: "skills", label: "Go to Skills", section: "skills", shortcut: "S" },
  { id: "projects", label: "Go to Projects", section: "projects", shortcut: "P" },
  { id: "experience", label: "Go to Experience", section: "experience", shortcut: "E" },
  { id: "case-studies", label: "Go to Case Studies", section: "case-studies", shortcut: "C" },
  { id: "testimonials", label: "Go to Testimonials", section: "testimonials", shortcut: "T" },
  { id: "contact", label: "Go to Contact", section: "contact", shortcut: "K" },
];
