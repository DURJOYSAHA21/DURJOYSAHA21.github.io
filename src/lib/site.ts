export const GITHUB_USER = "DURJOYSAHA21";

/** Plain `<a>`/`<img>` URLs do not get Next's basePath, so prefix them by hand. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const PROFILE = {
  first: "Durjoy",
  last: "Saha",
  photo: "/durjoy.jpg",
  cv: "/durjoy-saha-cv.pdf",
  role: "cse final year · ai/ml research + web development · dhaka",
  status: "final year · open to internships",
  /** The CV's own summary words, used verbatim where they are quoted. */
  self: ["hardworking", "quick learner", "multi-tasker"],
} as const;

export const CONTACT = {
  email: "durjoy.saha1115@gmail.com",
  phone: "+880 1726 651486",
  phoneHref: "tel:+8801726651486",
  github: `https://github.com/${GITHUB_USER}`,
  location: "Block F, Bashundhara R/A, Dhaka-1212",
} as const;

/**
 * What he built, sorted by why it exists. Course work and personal tools are
 * projects; hackathon and datathon entries are competitions (ARENAS); the code
 * written for a paper lives with the paper (RESEARCH_BUILDS). Blurbs come from
 * the CV and from each repository's own README — nothing is invented here.
 */
export type Build = {
  title: string;
  /** Only when the code is actually on GitHub. */
  repo?: string;
  track: "course" | "personal";
  period: string;
  stack: string[];
  blurb: string;
};

export const BUILDS: Build[] = [
  {
    title: "SkillHub",
    repo: "SkillHub",
    track: "course",
    period: "Jan — Apr 2026",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    blurb:
      "The degree's full-stack project: an online learning platform where a student signs up, enrolls in a course, pays, chats, searches and filters, then sits an assessment. Built on MERN and written up as numbered test cases, so auth, payment security, compatibility, maintainability and search performance each got their own pass.",
  },
  {
    title: "Zoo Management System",
    repo: "Zoo-Management-System",
    track: "course",
    period: "Feb — May 2025",
    stack: ["C#", "ASP.NET", "SQL Server"],
    blurb:
      "An OOP-II project running a zoo: animals, staff, tasks and transactions, with real-time chat, OTP login, a zoo map, doctor assignment and a local banking system. The point was to make the object model visible in something that actually runs.",
  },
  {
    title: "Job Portal Management System",
    repo: "JOB-PORTAL",
    track: "course",
    period: "2026",
    stack: ["PHP", "MySQL"],
    blurb:
      "A hiring loop in one application with four separate surfaces — employer, job seeker, recruiter and admin — each seeing the same postings from a different seat. Built in PHP as a course project.",
  },
  {
    title: "Shop Management System",
    repo: "Shop-Management",
    track: "course",
    period: "2026",
    stack: ["Java"],
    blurb:
      "A shop-front exercise in Java: a customer browses laptops and phones and buys them while stock and sales move through the flow. Small on purpose — it was the course build for object-oriented modelling.",
  },
  {
    title: "Luffy — The Unknown Journey",
    track: "course",
    period: "",
    stack: ["C++", "OpenGL", "GLUT"],
    blurb:
      "The computer graphics project: a small game where a player moves through an unknown journey, drawn and animated directly with GLUT in C++ — geometry, camera and motion written by hand instead of pulled from an engine.",
  },
  {
    title: "DevVault",
    repo: "DevVault",
    track: "personal",
    period: "2026",
    stack: ["C#", "CLI"],
    blurb:
      "A Windows developer-environment assistant for the command line, written because cloning someone else's repository should not cost an hour of guessing. It reports whether the environment is ready, what kind of project a folder holds, which frameworks and dependencies it uses, where each dependency came from, whether any is declared twice, which local ports are busy, and what to install after a fresh clone.",
  },
  {
    title: "JobMatch-BD",
    repo: "jobmatch-bd",
    track: "personal",
    period: "2026",
    stack: ["spaCy", "sentence-transformers", "FastAPI", "React"],
    blurb:
      "Job matching built for Bangladeshi CS and tech seekers. spaCy pulls structured requirements out of noisy postings, sentence-transformers ranks a resume against them, and a FastAPI backend serves a React front end so the ranking stays explainable instead of a bare score.",
  },
];

/** Time-boxed entries. These are competitions he entered, not projects. */
export type Arena = {
  event: string;
  kind: "hackathon" | "datathon" | "contest";
  title: string;
  year: string;
  repo?: string;
  stack: string[];
  note: string;
};

export const ARENAS: Arena[] = [
  {
    event: "BUP CSE Fest 2026",
    kind: "hackathon",
    title: "GridWise LLM",
    year: "2026",
    repo: "gridwise-llm",
    stack: ["Gemini", "PuLP", "FastAPI"],
    note: "Built for the preliminary round: a public HTTP API that reads a campus operator's notes with Gemini, then hands the numbers to a PuLP optimiser and returns a cost-optimal 24-hour energy schedule. The model interprets the brief — it never gets to fake the arithmetic.",
  },
  {
    event: "Datathon",
    kind: "datathon",
    title: "Financial Risk Prediction",
    year: "—",
    stack: [],
    note: "Financial risk prediction modelled under datathon time rules. Dataset, model and result are still to be written up.",
  },
  {
    event: "AIUB Programming Contest",
    kind: "contest",
    title: "Competitive programming",
    year: "Mar 2024",
    stack: ["C++"],
    note: "Contest rounds in C++ — the same habit behind the 300+ problems solved on Codeforces and LeetCode.",
  },
];

/** Code that exists because of a paper, shown inside the research board. */
export const RESEARCH_BUILDS = [
  {
    title: "ExpVishing Detection",
    repo: "Explainable-and-Generalizable-Deepfake-Detection-for-Vishing-Attack-Recognition",
    label: "the code behind paper 01",
    stack: ["Wav2Vec2", "PyTorch", "SHAP"],
    note: "Voice-cloning attacks scored with EER and AUC on ASVspoof and In-the-Wild, plus SHAP attribution showing which parts of the signal drove each decision instead of trusting a black box.",
  },
  {
    title: "Vishing-Detection",
    repo: "Vishing-Detection",
    label: "tested build",
    stack: ["librosa", "torchaudio", "scikit-learn"],
    note: "The final tested notebook: feature extraction, training and evaluation kept in one reproducible run.",
  },
];

export type Edu = {
  /** Short badge shown on the tile: BSc / HSC / SSC. */
  level: string;
  school: string;
  degree: string;
  period: string;
  board: string;
  resultLabel: string;
  result: string;
  points: string[];
};

/** Newest first: the degree, then HSC and SSC underneath it. */
export const EDUCATION: Edu[] = [
  {
    level: "BSc",
    school: "American International University–Bangladesh (AIUB)",
    degree: "B.Sc. in Computer Science and Engineering",
    period: "2023 — 2027 (expected)",
    board: "Dhaka",
    resultLabel: "CGPA",
    result: "4.00 / 4.00",
    points: [
      "Final year of a four-year CSE degree",
      "Research experience in deepfake detection and applied NLP",
      "Degree projects: SkillHub (MERN), Zoo Management System (C# / ASP.NET), Restaurant Management System (Java)",
    ],
  },
  {
    level: "HSC",
    school: "Major General Mahmudul Hasan Adarsha College",
    degree: "Higher Secondary Certificate — Science",
    period: "2022",
    board: "Dhaka Board",
    resultLabel: "GPA",
    result: "5.00 / 5.00",
    points: ["Science group, Dhaka Board"],
  },
  {
    level: "SSC",
    school: "Bindu Basini Government Boys’ High School",
    degree: "Secondary School Certificate — Science",
    period: "2020",
    board: "Dhaka Board",
    resultLabel: "GPA",
    result: "5.00 / 5.00",
    points: ["Science group, Dhaka Board"],
  },
];

export type Paper = {
  title: string;
  venue: string;
  status: string;
  year: string;
  note: string;
  link?: string;
};

export const RESEARCH: Paper[] = [
  {
    title: "Explainable and Generalizable Deepfake Detection for Vishing Attack Recognition",
    venue: "I-COSTE 2026",
    status: "Accepted · not yet published",
    year: "2026",
    note: "Voice-cloning attacks scored on ASVspoof and In-the-Wild with EER and AUC, plus SHAP explanations of what the model actually listened to. I-COSTE 2026: Sustainable Technology for Humanity and Global Impact.",
  },
  {
    title:
      "Using Chatbots for Mental Health Support Among University Students in Bangladesh: An Exploratory Study",
    venue: "NBHRC 2025",
    status: "Abstract published",
    year: "2025",
    note: "Abstract and poster on chatbot-supported mental health care for Bangladeshi university students, presented at the Dhaka Medical College Research and Academic Club meeting in August 2025.",
  },
  {
    title:
      "Transformational Leadership and Organizational Change in Bangladeshi Higher Education Institutions",
    venue: "7th ICIS",
    status: "Conference paper presented",
    year: "2025",
    note: "Paper at the 7th International Conference on Integrated Sciences on how leadership style shapes change inside Bangladeshi higher education.",
  },
  {
    title:
      "A Comparative Study of Ensemble Machine Learning Models for Darknet Traffic Detection",
    venue: "ICCIT 2026",
    status: "under review",
    year: "2026",
    note: "Ensemble classifiers measured against each other for spotting darknet traffic rather than trusting a single model's score.",
  },
  {
    title: "PCOSNet: A Lightweight and Explainable Framework for Robust PCOS Detection",
    venue: "ICCIT 2026",
    status: "under review",
    year: "2026",
    note: "A small framework for PCOS detection, held to two demands at once: stay lightweight and stay explainable.",
  },
  {
    title:
      "Ova-VSSM: VMamba-Inspired Lightweight Architecture for Multi-Class Ovarian Ultrasound Image Classification",
    venue: "ICCIT 2026",
    status: "under review",
    year: "2026",
    note: "A VMamba-inspired architecture doing multi-class classification on ovarian ultrasound images at a fraction of the usual weight.",
  },
  {
    title:
      "Explainable Fake News Detection with Traditional Machine Learning: Evaluating Text Representations and Dataset Artifacts",
    venue: "ICRPSET 2026",
    status: "under review",
    year: "2026",
    note: "Fake news detection without a large model: which text representation actually earns the accuracy, and how much of it is a dataset artifact.",
  },
];

/** Paper counts read off the list itself, so no tally is ever typed twice. */
const UNDER_REVIEW = RESEARCH.filter((paper) => paper.status === "under review").length;

export const PAPER_TOTALS = {
  submitted: RESEARCH.length,
  accepted: RESEARCH.length - UNDER_REVIEW,
  underReview: UNDER_REVIEW,
};

export type Honor = {
  title: string;
  issuer: string;
  year: string;
  kind: "honor" | "certification";
};

export const HONORS: Honor[] = [
  { title: "Dean’s Award", issuer: "AIUB", year: "—", kind: "honor" },
  {
    title: "Presenting author, abstract and poster",
    issuer: "NBHRC 2025 · Dhaka Medical College Research and Academic Club",
    year: "Aug 2025",
    kind: "honor",
  },
  {
    title: "IT Essentials",
    issuer: "Cisco Networking Academy",
    year: "—",
    kind: "certification",
  },
  {
    title: "YUNet International Youth Upskill Summit",
    issuer: "Youth Upskill Network",
    year: "Jul 2025",
    kind: "certification",
  },
];

export const CO_CURRICULAR = [
  {
    title: "Executive member, Hasimukh Club",
    note: "Organized events and coordinated club activities.",
  },
  {
    title: "General member, R&D section — AIUB Computer Club",
    note: "Contributed to club projects, technical activities and events.",
  },
  { title: "School volunteer", note: "Community service and school events." },
  { title: "Inter-school cricket", note: "Played competitive tournament cricket." },
];

export const ACHIEVEMENTS = [
  {
    value: 300,
    suffix: "+",
    label: "problems solved",
    note: "Data structures and web-development problems on Codeforces and LeetCode.",
  },
];

export type SkillAccent = "gold" | "teal" | "clay" | "brass";
export type SkillGroup = { label: string; accent: SkillAccent; items: string[] };

/** Categories follow the CV's TECHNICAL SKILLS list; framework names come from its project stacks. */
export const SKILLS: SkillGroup[] = [
  {
    label: "languages",
    accent: "gold",
    items: ["C", "C++", "Java", "Python", "SQL", "JavaScript", "TypeScript"],
  },
  { label: "ai / ml", accent: "brass", items: ["NLP", "Machine learning"] },
  { label: "frontend", accent: "teal", items: ["HTML", "CSS", "JavaScript", "React"] },
  { label: "backend", accent: "clay", items: ["TypeScript", "Node.js", "Express"] },
  { label: "databases", accent: "brass", items: ["MySQL", "SQL Server", "MongoDB"] },
  {
    label: "tools & ways of working",
    accent: "gold",
    items: [
      "Git",
      "GitHub",
      "Debugging",
      "Problem solving",
      "Word",
      "Excel",
      "PowerPoint",
      "Access",
    ],
  },
];

/** Ticker strip: the CV's technical vocabulary, deduplicated, in board order. */
export const TECH_WORDS = [...new Set(SKILLS.flatMap((group) => group.items))];
