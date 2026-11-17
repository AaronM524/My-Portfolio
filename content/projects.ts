// All projects live here. To add one, copy an object and fill it in.
// featured: true  -> full-width color panel
// featured: false -> row in "More projects" (that list appears once one exists)
// repo / live: leave as "" to hide the button.
// theme: which color world the panel uses (see .t-* classes in globals.css).
// image: a screenshot in public/ (shown in a browser frame instead of the illustration).

export type Visual = "chart" | "budget" | "bubbles" | "none";
export type Theme = "navy" | "mint" | "pencil" | "cobalt" | "paper";

export type Project = {
  slug: string;
  name: string;
  kind: string;
  date: string;
  category: "Personal" | "Academic" | "Other";
  featured: boolean;
  status?: string;
  summary: string;
  highlights: string[];
  engineering?: string;
  stack: string[];
  repo: string;
  live: string;
  image?: string;
  visual: Visual;
  theme: Theme;
};

export const projects: Project[] = [
  {
    slug: "tradesignal",
    name: "TradeSignal",
    kind: "AI-Powered Stock Signal Platform",
    date: "Aug 2026",
    category: "Personal",
    featured: true,
    status: "Deployed",
    summary:
      "A stock scanner that looks for trade setups and ranks them from most bullish to most bearish.",
    highlights: [
      "It checks for six patterns, like RSI reversals and MACD crossovers, and gives each setup a score from 0 to 100.",
      "Every setup comes with an entry price and a stop-loss, so you know where to get in and where to get out.",
      "There's an AI chat built in. You can ask it about a ticker or a signal, and it can help you size a position.",
    ],
    engineering:
      "Pulling data from Yahoo Finance and Finnhub fast enough. I run the requests in parallel with timeouts so a scan finishes before the server cuts it off.",
    stack: ["Next.js", "TypeScript", "Supabase", "SWR", "Llama 3.1", "Finnhub", "Yahoo Finance"],
    repo: "https://github.com/AaronM524/TradeSignal",
    live: "https://tradesignal-orcin.vercel.app/",
    image: "/projects/tradesignal.webp",
    visual: "chart",
    theme: "navy",
  },
  {
    slug: "budgexia",
    name: "Budgexia",
    kind: "Personal Budgeting Platform",
    date: "Jan 2026",
    category: "Personal",
    featured: true,
    summary:
      "A budgeting app where you set budgets, log what you spend and track your savings goals, all in one place.",
    highlights: [
      "You set a budget for each category and can see right away where your money is going.",
      "Smart Tips compares this month's spending to your budgets and points out where you could cut back.",
      "I made my own set of reusable components so the app stayed consistent as I kept adding features.",
    ],
    stack: ["Next.js", "TypeScript", "React", "SQL", "CSS"],
    repo: "https://github.com/AaronM524/Budgexia",
    live: "https://budgexia.vercel.app/",
    image: "/projects/budgexia.webp",
    visual: "budget",
    theme: "mint",
  },
  {
    slug: "prepai",
    name: "PrepAI",
    kind: "SAT Preparation Web App",
    date: "Dec 2025",
    category: "Personal",
    featured: true,
    status: "Launched",
    summary:
      "An SAT practice app that gives you a daily study plan and keeps track of how you're doing.",
    highlights: [
      "You pick a section and a difficulty, answer questions, and find out right away if you got them right.",
      "You set a daily goal and it splits your prep into small tasks so you stay on track.",
      "You sign in with your own account, and it works on your phone too.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "SQL", "CSS"],
    repo: "https://github.com/AaronM524/SAT-Prep",
    live: "https://satprep-three.vercel.app/",
    image: "/projects/prepai.webp",
    visual: "bubbles",
    theme: "pencil",
  },
  // ── Earlier work: smaller sites from before Stevens ──
  {
    slug: "shaun-portfolio", name: "Shaun's Portfolio Website", kind: "Portfolio site", date: "", category: "Other", featured: false,
    summary: "A responsive portfolio site with animations, built to showcase someone else's professional work.",
    highlights: [], stack: ["HTML", "CSS", "JavaScript", "Vue"],
    repo: "https://github.com/AaronM524/Shaun-s-Portfolio-Website", live: "https://aaronm524.github.io/Shaun-s-Portfolio-Website/",
    visual: "none", theme: "paper",
  },
  {
    slug: "trunk-or-treat", name: "Halloween Trunk or Treat", kind: "Event site", date: "", category: "Other", featured: false,
    summary: "An event site with interactive, animated elements.",
    highlights: [], stack: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/AaronM524/Halloween-Trunk-or-Treat", live: "https://aaronm524.github.io/Halloween-Trunk-or-Treat/",
    visual: "none", theme: "paper",
  },
  {
    slug: "college-site", name: "College Website", kind: "University site", date: "", category: "Other", featured: false,
    summary: "A college site covering academic programs, campus information and student services.",
    highlights: [], stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    repo: "https://github.com/AaronM524/College-Website", live: "https://aaronm524.github.io/College-Website/",
    visual: "none", theme: "paper",
  },
  {
    slug: "coffee-shop", name: "Coffee Shop Website", kind: "Business site", date: "", category: "Other", featured: false,
    summary: "A coffee shop site with a menu, location details and an online ordering concept.",
    highlights: [], stack: ["HTML", "CSS"],
    repo: "https://github.com/AaronM524/Coffee-Shop-Project-single-AaronM20", live: "https://aaronm524.github.io/Coffee-Shop-Project-single-AaronM20/",
    visual: "none", theme: "paper",
  },
];
