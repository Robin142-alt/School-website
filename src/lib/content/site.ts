import cmsSeed from "@/lib/content/cms-seed.json";

export const siteConfig = {
  name: "St. Clare's Maragoli Girls School",
  shortName: "St. Clare's Maragoli",
  description:
    "A trust-building, parent-friendly digital experience for a future-facing girls' secondary school in Vihiga County, Kenya.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Grounded girls. Courageous futures.",
  heroStatement:
    "A public girls' secondary school in Vihiga County designed to help every learner feel seen, guided, and ready for the CBC era.",
  location: "Maragoli, Vihiga County, Kenya",
  phoneDisplay: "+254 104 500 945",
  phoneHref: "tel:+254104500945",
  whatsappHref: "https://wa.me/254104500945",
  mapQuery: "St. Clare's Maragoli Girls School, Vihiga County, Kenya",
  mainNav: [
    { href: "/academics", label: "Academics" },
    { href: "/student-life", label: "Student Life" },
    { href: "/gallery", label: "Gallery" },
    { href: "/admissions", label: "Admissions" },
    { href: "/community", label: "Community" },
    { href: "/alumni", label: "Alumni" },
    { href: "/management", label: "Management" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const heroStats = [
  {
    value: "C2",
    label: "Public girls' secondary school foundation",
  },
  {
    value: "3",
    label: "CBC pathways explained in parent-friendly language",
  },
  {
    value: "2026",
    label: "Grade 10 pathway transition readiness",
  },
  {
    value: "Mobile-first",
    label: "Designed for parents who rely on phone and WhatsApp",
  },
];

export const trustSignals = [
  "Clear school story and leadership voice to build parental confidence.",
  "Simple language for CBC pathways, admissions, and communication routines.",
  "Structured quick actions for calls, WhatsApp, forms, and campus visits.",
];

export const aboutContent = {
  mission:
    "To nurture disciplined, future-ready young women through excellent teaching, close mentorship, and opportunities that connect classroom learning to real life.",
  vision:
    "To become a trusted girls' school where character, confidence, and competence grow together for service in Kenya and beyond.",
  story:
    "Families do not just want a school. They want a place where a girl is protected, stretched, listened to, and prepared for a wider world. This digital experience presents St. Clare's Maragoli as that promise: rooted in community, clear in direction, and ambitious about what girls from Vihiga can become.",
  principalMessage:
    "Our commitment is simple: every girl should know what she is working toward, who is walking with her, and why her future matters. We are building a school culture where parents are informed, teachers are visible, and learners are proud to belong.",
};

export const coreValues = [
  {
    title: "Integrity",
    description: "We build girls whose words, choices, and habits can be trusted.",
  },
  {
    title: "Diligence",
    description: "We celebrate steady effort, preparation, and academic discipline.",
  },
  {
    title: "Courage",
    description: "We teach girls to speak up, explore boldly, and lead with confidence.",
  },
  {
    title: "Sisterhood",
    description: "We create a culture where girls rise together instead of alone.",
  },
  {
    title: "Service",
    description: "We connect learning to community responsibility and empathy.",
  },
  {
    title: "Stewardship",
    description: "We care well for time, talent, resources, and the environment around us.",
  },
];

export const storyPillars = [
  {
    title: "Belonging before brilliance",
    detail:
      "When girls feel safe and known, they participate more, ask better questions, and aim higher.",
  },
  {
    title: "Clarity for parents",
    detail:
      "The site strips away institutional confusion so families can understand next steps quickly on any phone.",
  },
  {
    title: "Preparation for pathways",
    detail:
      "CBC choices become less intimidating when students see practical routes from strengths to careers.",
  },
];

export const pathways = [
  {
    name: "STEM",
    focus:
      "For girls who enjoy problem-solving, scientific inquiry, design, computing, engineering, and health sciences.",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Studies"],
    outcomes: ["Engineering", "Medicine", "Technology", "Research", "Applied Sciences"],
  },
  {
    name: "Social Sciences",
    focus:
      "For learners drawn to leadership, people, business, policy, law, entrepreneurship, and communication.",
    subjects: ["History", "Geography", "Business Studies", "Literature", "Languages"],
    outcomes: ["Law", "Teaching", "Business", "Public Service", "Media"],
  },
  {
    name: "Arts & Sports",
    focus:
      "For creative, expressive, and performance-driven girls who thrive in arts, design, movement, and cultural leadership.",
    subjects: ["Visual Arts", "Music", "Performing Arts", "Physical Education", "Design"],
    outcomes: ["Creative Industries", "Sports Leadership", "Design", "Performance", "Community Arts"],
  },
];

export const departments = [
  {
    name: "Languages & Communication",
    summary:
      "Strong reading, writing, speaking, and debate habits that shape confidence in every pathway.",
  },
  {
    name: "Mathematics & Computing",
    summary:
      "Numeracy, logic, coding foundations, and practical problem-solving for a digital future.",
  },
  {
    name: "Sciences",
    summary:
      "Hands-on scientific thinking that connects classwork to health, environment, and innovation.",
  },
  {
    name: "Humanities & Business",
    summary:
      "Context for leadership, entrepreneurship, citizenship, and informed decision-making.",
  },
  {
    name: "Creative Arts",
    summary:
      "Expression, storytelling, design thinking, and confidence through visible student work.",
  },
  {
    name: "Games, Wellness & Guidance",
    summary:
      "Discipline, resilience, life skills, and emotional support alongside academic growth.",
  },
];

export const performanceData = cmsSeed.performanceData;

export const learningSupport = [
  "Subject clinics and structured prep for assessment confidence.",
  "Mentorship check-ins that identify learning gaps early.",
  "Career conversations that connect pathway choices to real futures.",
  "Guidance for parents on how to support study routines at home.",
];

export const clubs = [
  {
    name: "STEM & Innovation Club",
    summary: "Prototype, solve, and present ideas that respond to real community challenges.",
  },
  {
    name: "Debate & Public Speaking",
    summary: "Build poise, clear thinking, and the courage to speak with substance.",
  },
  {
    name: "Journalism & Media",
    summary: "Tell school stories, document events, and sharpen communication skills.",
  },
  {
    name: "Music, Drama & Creative Arts",
    summary: "Grow expression, teamwork, and stage confidence through performance.",
  },
  {
    name: "Environmental Action Team",
    summary: "Lead cleanliness, tree care, and sustainability projects around campus.",
  },
  {
    name: "Sports & Fitness",
    summary: "Use games and training to teach discipline, resilience, and school pride.",
  },
];

export const campusRhythm = [
  "Morning check-ins that set a focused tone for the day.",
  "Classroom routines built around order, feedback, and participation.",
  "Clubs, sports, and pastoral care that support the whole learner.",
  "Celebrations of effort so girls see progress before results arrive.",
];

export const admissionSteps = [
  {
    step: "1",
    title: "Make first contact",
    detail:
      "Call, WhatsApp, or fill the admissions form so the school can understand the learner's needs early.",
  },
  {
    step: "2",
    title: "Receive a guided checklist",
    detail:
      "Parents get a short, plain-language explanation of documents, reporting timelines, and pathway conversations.",
  },
  {
    step: "3",
    title: "Visit or virtual clarification",
    detail:
      "Families can ask questions about school culture, academic support, and transition readiness before joining.",
  },
  {
    step: "4",
    title: "Confirm onboarding",
    detail:
      "The school shares joining guidance, reporting expectations, and the communication channel to use after admission.",
  },
];

export const admissionRequirements = [
  "Learner's recent academic record or transfer documents.",
  "Parent or guardian contact details for communication.",
  "Any special learning, medical, or welfare notes the school should prepare for.",
  "Readiness to discuss the learner's strengths before CBC pathway selection.",
];

export const admissionFaqs = [
  {
    question: "How do parents start the admissions conversation?",
    answer:
      "The easiest path is a phone call, WhatsApp message, or the short admissions form on this website.",
  },
  {
    question: "Will CBC pathways be explained before a learner chooses?",
    answer:
      "Yes. The school should guide the family through strengths, interests, and future options before confirming a pathway direction.",
  },
  {
    question: "Can parents ask about fees before reporting?",
    answer:
      "Yes. The finance and admissions team should walk families through the fee structure and payment rhythm before onboarding.",
  },
  {
    question: "What if a parent is not comfortable with long online forms?",
    answer:
      "This experience is designed for low-friction support. Parents can call or WhatsApp and a staff member can guide the process.",
  },
];

export const feeGuide = [
  {
    title: "Learning and tuition support",
    detail:
      "Tuition-linked items, assessment support, and core learning resources confirmed by the school each term.",
  },
  {
    title: "Meals and student welfare",
    detail:
      "The predictable costs that support daily student care, routines, and wellbeing on campus.",
  },
  {
    title: "Activities and development",
    detail:
      "Clubs, games, practical learning experiences, and agreed school development contributions.",
  },
  {
    title: "Joining requirements",
    detail:
      "Uniform, personal items, and any one-time onboarding essentials clearly shared before reporting.",
  },
];

export const parentExperience = [
  {
    title: "Clear communication",
    description:
      "Parents should never have to guess the next step. Key notices are short, visible, and repeated across familiar channels.",
  },
  {
    title: "Simple fee understanding",
    description:
      "Fee information is structured by category so families can plan without scanning long documents.",
  },
  {
    title: "Fast contact paths",
    description:
      "Call, WhatsApp, inquiry forms, and visit directions are one tap away on every page.",
  },
];

export const communicationChannels = [
  {
    title: "Phone-first support",
    detail:
      "Families who prefer direct conversation can call or request a callback without navigating complex systems.",
  },
  {
    title: "WhatsApp-friendly follow-up",
    detail:
      "A familiar channel for reminders, clarifications, and light-touch guidance between office conversations.",
  },
  {
    title: "Announcement feed",
    detail:
      "News and event updates provide one place to check what is happening and what parents should know next.",
  },
];

export const alumniOpportunities = [
  {
    title: "Mentor a pathway circle",
    detail:
      "Share real-world experience with girls exploring STEM, social sciences, arts, or sports futures.",
  },
  {
    title: "Lead a career conversation",
    detail:
      "Return for a talk, panel, or workshop that expands how learners imagine themselves.",
  },
  {
    title: "Support bursary and opportunity funds",
    detail:
      "Help remove practical barriers so talented girls can stay focused on learning.",
  },
];

export const alumniVoices = cmsSeed.testimonials;

export const newsPosts = cmsSeed.newsPosts;

export const events = cmsSeed.events;

export const contactHighlights = [
  {
    title: "Call the school office",
    detail: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
  },
  {
    title: "Chat on WhatsApp",
    detail: "For quick questions and parent-friendly follow-up",
    href: siteConfig.whatsappHref,
  },
  {
    title: "Find the campus",
    detail: siteConfig.location,
    href: `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}`,
  },
];

export function getLatestNews(limit = 3) {
  return [...newsPosts]
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
    .slice(0, limit);
}

export function getUpcomingEvents(limit = 3) {
  return [...events]
    .sort((a, b) => Number(new Date(a.startDate)) - Number(new Date(b.startDate)))
    .slice(0, limit);
}

export function getNewsBySlug(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}
