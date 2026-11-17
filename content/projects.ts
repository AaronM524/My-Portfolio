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
      "Scans the market and ranks bullish and bearish trade setups by combining live prices, options flow, AI news sentiment and your own ticker filters.",
    highlights: [
      "Six signal detectors: RSI reversals, MACD crossovers, VWAP reclaims, volume spikes, options-flow correlation and moving-average crosses.",
      "When indicators agree, the setup gets a 0–100 confidence score, a calculated entry price and a 2× ATR stop-loss.",
      "A Llama 3.1 assistant answers plain-English questions about tickers and active signals, and sizes positions to your account.",
    ],
    engineering:
      "Yahoo Finance and Finnhub requests run concurrently with per-call timeouts, so multi-ticker scans finish inside serverless execution limits.",
    stack: ["Next.js", "TypeScript", "Supabase", "SWR", "Llama 3.1", "Finnhub", "Yahoo Finance"],
    repo: "",
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
      "Budgets, transactions, savings goals and spending analytics in one dashboard.",
    highlights: [
      "Category budgets and savings goals with real-time analytics on where the money goes.",
      "Smart Tips, an AI-driven engine, compares each month's spending against your budgets and suggests where to cut back.",
      "A reusable, accessibility-focused component library replaced one-off styling as the app grew.",
    ],
    stack: ["Next.js", "TypeScript", "React", "SQL", "CSS"],
    repo: "",
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
      "Personalized SAT practice with daily study plans and progress tracking.",
    highlights: [
      "A practice engine filters questions by section and difficulty and grades answers instantly.",
      "Study plans with daily task limits and goal tracking keep prep consistent.",
      "Supabase authentication and protected routes; works on desktop and phone.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "SQL", "CSS"],
    repo: "",
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
