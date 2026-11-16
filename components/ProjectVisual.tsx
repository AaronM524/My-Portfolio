import type { Visual } from "@/content/projects";

// Illustrations, not screenshots. They show what each app does using only facts from
// the project descriptions. Replace with real screenshots whenever you have them.

/* ── TradeSignal: candlestick chart annotated with the six detectors ── */

function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

function buildCandles() {
  const r = seeded(11);
  const n = 54;
  const out: { o: number; c: number; h: number; l: number; v: number }[] = [];
  let p = 220;
  for (let i = 0; i < n; i++) {
    // dip, base, then a breakout: gives the detectors something to point at
    const drift = i < 16 ? 3.4 : i < 24 ? 0.2 : i < 34 ? -2.2 : -3.6;
    const o = p;
    const c = o + drift + (r() - 0.5) * 16;
    const h = Math.min(o, c) - 3 - r() * 9;
    const l = Math.max(o, c) + 3 + r() * 9;
    const v = 0.25 + r() * 0.45 + (i === 35 || i === 36 ? 0.6 : 0);
    out.push({ o, c, h, l, v });
    p = c;
  }
  return out;
}

const candles = buildCandles();
const W = 1000, CW = 13, GAP = (W - 40) / candles.length;
const x = (i: number) => 20 + i * GAP + GAP / 2;
const ma = candles.map((_, i) => {
  const s = candles.slice(Math.max(0, i - 7), i + 1);
  return s.reduce((a, k) => a + k.c, 0) / s.length;
});
const maPath = ma.map((y, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y.toFixed(1)}`).join(" ");

const notes = [
  { i: 17, label: "RSI reversal", above: false },
  { i: 26, label: "MACD crossover", above: true },
  { i: 31, label: "VWAP reclaim", above: false },
  { i: 36, label: "Volume spike", above: true },
  { i: 40, label: "MA cross", above: false },
  { i: 46, label: "Options flow", above: true },
];

function Chart() {
  const last = candles[candles.length - 1];
  const entry = last.c + 6;
  const stop = entry + 48;
  return (
    <svg className="chart" viewBox="0 80 1000 320" role="img" aria-label="Illustration of a price chart with TradeSignal's six detectors marking setups">
      {[130, 200, 270, 340].map((y) => <line key={y} className="chart-grid" x1="0" x2="1000" y1={y} y2={y} />)}
      {candles.map((k, i) => {
        const up = k.c < k.o;
        return (
          <g key={i} className={`cdl ${up ? "up" : "dn"}`} style={{ ["--d" as string]: i }}>
            <line x1={x(i)} x2={x(i)} y1={k.h} y2={k.l} />
            <rect x={x(i) - CW / 2} y={Math.min(k.o, k.c)} width={CW} height={Math.max(2, Math.abs(k.c - k.o))} rx="2" />
            <rect className="vol" x={x(i) - CW / 2} y={392 - k.v * 46} width={CW} height={k.v * 46} rx="2" />
          </g>
        );
      })}
      <path className="ma" d={maPath} />
      <g className="levels">
        <line x1="700" x2="1000" y1={entry} y2={entry} className="lvl-entry" />
        <text x="708" y={entry - 10}>Entry</text>
        <line x1="700" x2="1000" y1={stop} y2={stop} className="lvl-stop" />
        <text x="992" y={stop + 20} textAnchor="end">Stop at 2× ATR</text>
      </g>
      {notes.map((n, j) => {
        const k = candles[n.i];
        const y0 = n.above ? k.h - 6 : k.l + 6;
        const y1 = n.above ? k.h - 46 : k.l + 46;
        const w = n.label.length * 8.6 + 26;
        return (
          <g key={n.label} className="note" style={{ ["--n" as string]: j }}>
            <line x1={x(n.i)} x2={x(n.i)} y1={y0} y2={y1} />
            <circle cx={x(n.i)} cy={y0} r="4" />
            <rect x={x(n.i) - w / 2} y={n.above ? y1 - 30 : y1} width={w} height="30" rx="15" />
            <text x={x(n.i)} y={n.above ? y1 - 10 : y1 + 20} textAnchor="middle">{n.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Budgexia: budget vs. spent, with a Smart Tip ── */

function Budget() {
  const rows = [
    { c: "Rent", b: 92, s: 92 },
    { c: "Groceries", b: 70, s: 54 },
    { c: "Dining out", b: 46, s: 63, over: true },
    { c: "Transport", b: 38, s: 27 },
    { c: "Savings goal", b: 80, s: 58, goal: true },
  ];
  return (
    <div className="budget" role="img" aria-label="Illustration of category budgets with a Smart Tip">
      {rows.map((r, i) => (
        <div key={r.c} className={`b-row ${r.over ? "over" : ""} ${r.goal ? "goal" : ""}`} style={{ ["--d" as string]: i }}>
          <span className="b-name">{r.c}</span>
          <div className="b-track">
            <span className="b-fill" style={{ width: `${r.s}%` }} />
            <span className="b-cap" style={{ left: `${r.b}%` }} />
          </div>
        </div>
      ))}
      <div className="b-tip">
        <strong>Smart Tip</strong>
        <span>Dining out is over budget this month. Here are three ways to bring it back.</span>
      </div>
    </div>
  );
}

/* ── PrepAI: answer sheet + filters ── */

function Bubbles() {
  const picks = [1, 3, 0, 2, 2, 1, 3, 0];
  const correct = [1, 3, 0, 1, 2, 1, 3, 0];
  return (
    <div className="sheet" role="img" aria-label="Illustration of an answer sheet with section and difficulty filters">
      <div className="sheet-filters">
        <span className="pill on">Math</span>
        <span className="pill">Reading and Writing</span>
        <span className="pill on">Hard</span>
      </div>
      <ol className="sheet-grid">
        {picks.map((p, q) => (
          <li key={q} style={{ ["--d" as string]: q }} className={p === correct[q] ? "ok" : "miss"}>
            <span className="q">{q + 1}</span>
            {["A", "B", "C", "D"].map((L, i) => (
              <span key={L} className={`bub ${i === p ? "fill" : ""} ${i === correct[q] && p !== correct[q] ? "right" : ""}`}>{L}</span>
            ))}
          </li>
        ))}
      </ol>
      <div className="sheet-plan">
        <span>Today&apos;s plan</span>
        <span className="dots"><i className="on" /><i className="on" /><i className="on" /><i /></span>
      </div>
    </div>
  );
}

export default function ProjectVisual({ type }: { type: Visual }) {
  if (type === "chart") return <Chart />;
  if (type === "budget") return <Budget />;
  if (type === "bubbles") return <Bubbles />;
  return null;
}
