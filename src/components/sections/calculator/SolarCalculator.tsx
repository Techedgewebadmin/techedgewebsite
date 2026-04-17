"use client";
import { useState, useCallback, useRef, useEffect } from "react";

const INDIAN_CITIES = [
  "Ahmedabad","Agra","Ajmer","Aligarh","Amritsar","Aurangabad",
  "Ballari","Belagavi","Bengaluru","Bhopal","Bhubaneswar","Bidar",
  "Chennai","Chitradurga","Coimbatore","Davangere","Dehradun","Delhi","Dharwad",
  "Faridabad","Gadag","Gurgaon","Guwahati","Hassan","Hubballi","Hyderabad",
  "Indore","Jaipur","Jalandhar","Jodhpur","Kanpur","Kochi","Kolkata",
  "Koppal","Kozhikode","Lucknow","Ludhiana","Madurai","Mandya","Mangaluru",
  "Mumbai","Mysuru","Nagpur","Nashik","Noida","Patna","Pune",
  "Raipur","Raichur","Rajkot","Ranchi","Shivamogga","Surat","Thane",
  "Thiruvananthapuram","Tiruchirappalli","Tumakuru","Udupi",
  "Vadodara","Varanasi","Vijayawada","Visakhapatnam",
];

function CityInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  const suggestions = query.length >= 2
    ? INDIAN_CITIES.filter(c => c.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="City / Location *"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#8DC63F] outline-none transition-colors"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden shadow-xl">
          {suggestions.map(city => (
            <li key={city}
              onMouseDown={() => { setQuery(city); onChange(city); setOpen(false); }}
              className="px-3 py-2 text-sm text-white/80 hover:bg-[#8DC63F]/15 hover:text-white cursor-pointer transition-colors">
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from "recharts";

// ─── Financial helpers ────────────────────────────────────────────────────────

function calcIRR(cashFlows: number[]): number {
  let rate = 0.1;
  for (let i = 0; i < 1000; i++) {
    let npv = 0, dnpv = 0;
    cashFlows.forEach((cf, t) => {
      const d = Math.pow(1 + rate, t);
      npv += cf / d;
      dnpv -= (t * cf) / (d * (1 + rate));
    });
    if (Math.abs(dnpv) < 1e-10) break;
    const next = rate - npv / dnpv;
    if (Math.abs(next - rate) < 1e-7) { rate = next; break; }
    rate = next;
  }
  return isFinite(rate) && rate > -1 ? rate : 0;
}

function calcEMI(principal: number, annualRate: number, tenureYears: number): number {
  if (annualRate === 0) return principal / (tenureYears * 12);
  const r = annualRate / 100 / 12;
  const n = tenureYears * 12;
  return principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

function fmt(n: number): string {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

// PDF-safe formatter: uses "Rs." instead of ₹ (jsPDF Helvetica doesn't support ₹ glyph)
// Also handles negative values cleanly
function fmtPdf(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1e7) return `${sign}Rs.${(abs / 1e7).toFixed(2)} Cr`;
  if (abs >= 1e5) return `${sign}Rs.${(abs / 1e5).toFixed(2)} L`;
  return `${sign}Rs.${Math.round(abs).toLocaleString("en-IN")}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Inputs {
  customerType: "residential" | "commercial";
  name: string;
  mobile: string;
  email: string;
  company: string;
  city: string;
  gstRegistered: boolean;
  claimAD: boolean;
  taxRate: number;
  claimITC: boolean;
  systemKwp: number;
  costPerKwp: number;
  monthlyBill: number;
  tariff: number;
  escalation: number;
  degradation: number;
  peakSunHours: number;
  financing: "self" | "partial" | "full";
  loanPct: number;
  interestRate: number;
  tenure: number;
}

interface YearData {
  year: number;
  generation: number;
  savings: number;
  emi: number;
  netCashFlow: number;
  cumSavings: number;
  cumCost: number;
  adBenefit: number;
}

// ─── Calculator logic ─────────────────────────────────────────────────────────

function runCalc(inp: Inputs) {
  const systemCost = inp.systemKwp * inp.costPerKwp;
  const loanAmt = financing(inp.financing, systemCost, inp.loanPct);
  const equity = systemCost - loanAmt;
  const emiMonthly = loanAmt > 0 ? calcEMI(loanAmt, inp.interestRate, inp.tenure) : 0;
  const emiAnnual = emiMonthly * 12;

  // GST ITC — EPC composite supply rule: 70% of value at 5% + 30% at 18% = 8.9% blended
  const itcBenefit = inp.customerType === "commercial" && inp.gstRegistered && inp.claimITC ? systemCost * 0.089 : 0;

  const years: YearData[] = [];
  let cumSavings = -equity + itcBenefit;
  let cumCost = equity - itcBenefit;
  let currentTariff = inp.tariff;
  let remainingWDV = systemCost;
  const cashFlows: number[] = [-(equity - itcBenefit)];

  for (let y = 1; y <= 25; y++) {
    const degradationFactor = Math.pow(1 - inp.degradation / 100, y - 1);
    const generation = inp.systemKwp * inp.peakSunHours * 365 * degradationFactor;
    const savings = generation * currentTariff;

    // AD benefit
    let adBenefit = 0;
    if (inp.gstRegistered && inp.claimAD && remainingWDV > 1000) {
      const dep = remainingWDV * 0.4;
      adBenefit = dep * (inp.taxRate / 100);
      remainingWDV -= dep;
    }

    const emiThisYear = y <= inp.tenure ? emiAnnual : 0;
    const netCashFlow = savings + adBenefit - emiThisYear;

    cumSavings += netCashFlow;
    cumCost = Math.max(0, cumCost - savings - adBenefit + emiThisYear);

    cashFlows.push(netCashFlow);
    years.push({
      year: y, generation: Math.round(generation), savings: Math.round(savings),
      emi: Math.round(emiThisYear), netCashFlow: Math.round(netCashFlow),
      cumSavings: Math.round(cumSavings), cumCost: Math.round(Math.max(0, equity - itcBenefit - cumSavings)),
      adBenefit: Math.round(adBenefit),
    });

    currentTariff *= (1 + inp.escalation / 100);
  }

  const irr = calcIRR(cashFlows) * 100;

  // Project IRR: financing-agnostic — always on full system cost
  // Buyer pays EMI so use full cost as year-0 outflow, savings (before EMI) as inflows
  const projectCashFlows = [-(systemCost - itcBenefit), ...years.map(y => y.savings + y.adBenefit)];
  const projectIRR = calcIRR(projectCashFlows) * 100;

  const totalSavings25 = years.reduce((s, y) => s + y.savings + y.adBenefit, 0);
  const roi = ((totalSavings25 - systemCost) / systemCost) * 100;

  // Net monthly cash in pocket (Yr 1 savings minus EMI)
  const netMonthlyCashFlow = Math.round(((years[0]?.savings || 0) - (years[0]?.emi || 0)) / 12);

  // Payback: total net cost of system vs net annual cash in pocket (savings - EMI)
  // Same outflow for all scenarios so loan payback is correctly longer (due to interest drain on recovery)
  const totalOutflow = systemCost - itcBenefit;

  let payback = 0;
  let cumNet = 0;
  for (const y of years) {
    const prev = cumNet;
    const annualNet = y.savings + y.adBenefit - y.emi;
    if (annualNet <= 0) continue;
    cumNet += annualNet;
    if (cumNet >= totalOutflow && prev < totalOutflow) {
      payback = y.year - 1 + (totalOutflow - prev) / annualNet;
      break;
    }
  }

  return { years, irr, projectIRR, roi, payback, systemCost, loanAmt, equity, emiMonthly, itcBenefit, totalSavings25, netMonthlyCashFlow };
}

function financing(type: string, cost: number, pct: number) {
  if (type === "self") return 0;
  if (type === "full") return cost * 0.9;
  return cost * (pct / 100);
}

// ─── Scenario comparison ──────────────────────────────────────────────────────

function ScenarioCard({ label, projectIRR, payback, savings25, netMonthly, highlight }: {
  label: string; projectIRR: number; payback: number; savings25: number; netMonthly: number; highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl p-4 border ${highlight ? "border-[#8DC63F] bg-[#8DC63F]/10" : "border-white/10 bg-white/5"}`}>
      <div className="text-sm font-semibold text-[#8DC63F] mb-3">{label}</div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Payback</span>
          <span className="text-white font-semibold">{payback.toFixed(1)} yrs</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Project IRR</span>
          <span className="text-white font-semibold">{projectIRR.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Net / Month (Yr 1)</span>
          <span className={`font-semibold ${netMonthly >= 0 ? "text-[#8DC63F]" : "text-red-400"}`}>
            {netMonthly >= 0 ? "+" : ""}{fmt(netMonthly)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">25-yr Savings</span>
          <span className="text-white font-semibold">{fmt(savings25)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Tooltip formatter ────────────────────────────────────────────────────────

const RsTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-xs">
      <div className="font-semibold text-white mb-1">Year {label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex gap-3 justify-between">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="text-white font-semibold">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Number input ─────────────────────────────────────────────────────────────

function SliderInput({ label, value, min, max, step, unit, onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit: string;
  onChange: (v: number) => void;
}) {
  const [raw, setRaw] = useState(String(value));
  useEffect(() => { setRaw(String(value)); }, [value]);

  const displayUnit = unit === "₹" ? "₹" : unit.trim();
  const unitLabel = unit === "₹" ? `₹` : unit.trim();

  const commit = () => {
    const v = parseFloat(raw);
    if (!isNaN(v)) onChange(Math.min(Math.max(v, min), max));
    else setRaw(String(value));
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs text-white/50">
        {label}{unitLabel ? <span className="text-white/30"> ({unitLabel})</span> : ""}
      </label>
      <div className="relative">
        {unit === "₹" && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/40 pointer-events-none select-none">₹</span>}
        <input
          type="text" inputMode="decimal" value={raw}
          onChange={e => { if (/^[0-9]*\.?[0-9]*$/.test(e.target.value)) setRaw(e.target.value); }}
          onBlur={commit}
          onKeyDown={e => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
          className={`w-full bg-white/5 border border-white/10 rounded-lg py-2.5 text-sm text-white focus:border-[#8DC63F] outline-none transition-colors ${unit === "₹" ? "pl-7 pr-3" : "px-3"}`}
        />
      </div>
    </div>
  );
}

// ─── PDF Generator ────────────────────────────────────────────────────────────

async function generatePDF(inp: Inputs, result: ReturnType<typeof runCalc>) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210, m = 14; // page width, margin
  const col = w - m * 2;
  const isRes = inp.customerType === "residential";
  const yr1 = result.years[0];
  const yr1Monthly = Math.round((yr1?.savings || 0) / 12);
  const financingLabel = inp.financing === "self"
    ? "Self-funded (no loan)"
    : inp.financing === "full"
    ? `90% Bank Loan @ ${inp.interestRate}% for ${inp.tenure} yrs`
    : `${inp.loanPct}% Bank Loan @ ${inp.interestRate}% for ${inp.tenure} yrs`;

  // ── HEADER ──────────────────────────────────────────────────────────────────
  doc.setFillColor(20, 20, 20);
  doc.rect(0, 0, w, 30, "F");
  doc.setFillColor(141, 198, 63);
  doc.rect(0, 0, 4, 30, "F"); // green left accent bar

  doc.setTextColor(141, 198, 63);
  doc.setFontSize(20); doc.setFont("helvetica", "bold");
  doc.text("TECHEDGE", m, 13);
  doc.setFontSize(8); doc.setTextColor(200, 200, 200); doc.setFont("helvetica", "normal");
  doc.text(isRes ? "Home Solar Decision Report" : "Solar Investment Decision Report", m, 20);
  doc.text(`Prepared for: ${inp.name}  |  ${inp.city}  |  ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`, m, 26);
  doc.setTextColor(141, 198, 63); doc.setFontSize(7.5);
  doc.text("techedgeindia.co.in  |  +91 98440 97096", w - m, 20, { align: "right" });
  doc.text("sales@techedgeindia.co.in", w - m, 26, { align: "right" });

  let y = 38;

  // ── TWO-COLUMN: System Info  |  Contact / Company ───────────────────────────
  const lc = m, rc = m + col / 2 + 4; // left col, right col x
  const cw = col / 2 - 4;

  // Left: system details
  doc.setFillColor(245, 247, 242);
  doc.roundedRect(lc, y, cw, 34, 2, 2, "F");
  doc.setFontSize(7); doc.setFont("helvetica", "bold"); doc.setTextColor(80, 80, 80);
  doc.text("SYSTEM DETAILS", lc + 4, y + 6);
  const sysRows = [
    [`${inp.systemKwp} kWp On-Grid Solar`, `Generates ~${(yr1?.generation || 0).toLocaleString("en-IN")} units/yr`],
    [`Total Cost: ${fmtPdf(result.systemCost)}`, `Tariff: Rs.${inp.tariff}/unit`],
    [`Financing: ${inp.financing === "self" ? "Self-funded" : `${inp.financing === "full" ? "90" : inp.loanPct}% Loan @ ${inp.interestRate}%`}`, `Location: ${inp.city}`],
  ];
  doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(30, 30, 30);
  sysRows.forEach((row, i) => {
    doc.text(row[0], lc + 4, y + 14 + i * 7);
    doc.setTextColor(80, 80, 80); doc.text(row[1], lc + 4, y + 19 + i * 7);
    doc.setTextColor(30, 30, 30);
  });

  // Right: contact / company
  doc.setFillColor(245, 247, 242);
  doc.roundedRect(rc, y, cw, 34, 2, 2, "F");
  doc.setFontSize(7); doc.setFont("helvetica", "bold"); doc.setTextColor(80, 80, 80);
  doc.text(isRes ? "PREPARED FOR" : "BUSINESS DETAILS", rc + 4, y + 6);
  doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(20, 20, 20);
  doc.text(inp.name, rc + 4, y + 14);
  doc.setFontSize(7.5); doc.setTextColor(60, 60, 60);
  if (!isRes && inp.company) doc.text(inp.company, rc + 4, y + 21);
  doc.text(`Mobile: ${inp.mobile}`, rc + 4, isRes || !inp.company ? y + 21 : y + 27);
  if (inp.email) doc.text(inp.email, rc + 4, isRes || !inp.company ? y + 28 : y + 33);

  y += 40;

  // ── KPI CARDS ────────────────────────────────────────────────────────────────
  const kpiData = isRes
    ? [
        { label: "Payback Period", val: result.payback > 0 ? `${result.payback.toFixed(1)} yrs` : "N/A", sub: "break-even" },
        { label: "Monthly Savings", val: fmtPdf(yr1Monthly), sub: "from Year 1" },
        { label: "Annual Savings", val: fmtPdf(yr1?.savings || 0), sub: "Year 1" },
        { label: "25-Year Total", val: fmtPdf(result.totalSavings25), sub: "electricity savings" },
      ]
    : [
        { label: "Payback Period", val: result.payback > 0 ? `${result.payback.toFixed(1)} yrs` : "N/A", sub: "break-even" },
        { label: "Project IRR", val: `${result.projectIRR.toFixed(1)}%`, sub: "annualised return" },
        { label: "25-Year Savings", val: fmtPdf(result.totalSavings25), sub: "total electricity savings" },
        { label: "Total ROI", val: `${result.roi.toFixed(0)}%`, sub: "return on investment" },
      ];

  const cardW = (col - 9) / 4;
  kpiData.forEach(({ label, val, sub }, i) => {
    const x = m + i * (cardW + 3);
    doc.setFillColor(26, 26, 26);
    doc.roundedRect(x, y, cardW, 22, 2, 2, "F");
    doc.setFillColor(141, 198, 63);
    doc.rect(x, y, cardW, 3, "F");
    doc.setTextColor(141, 198, 63);
    doc.setFontSize(11); doc.setFont("helvetica", "bold");
    doc.text(val, x + cardW / 2, y + 13, { align: "center" });
    doc.setFontSize(6); doc.setFont("helvetica", "normal"); doc.setTextColor(180, 180, 180);
    doc.text(label, x + cardW / 2, y + 8, { align: "center" });
    doc.text(sub, x + cardW / 2, y + 19, { align: "center" });
  });
  y += 28;

  // ── THE INVESTMENT CASE (narrative) ─────────────────────────────────────────
  doc.setFillColor(235, 245, 220);
  doc.roundedRect(m, y, col, isRes ? 38 : 46, 2, 2, "F");
  doc.setFillColor(141, 198, 63);
  doc.rect(m, y, 3, isRes ? 38 : 46, "F");

  doc.setFontSize(8); doc.setFont("helvetica", "bold"); doc.setTextColor(50, 90, 10);
  doc.text("THE INVESTMENT CASE", m + 7, y + 7);
  doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(30, 30, 30);

  if (isRes) {
    const lines = [
      `You invest ${fmtPdf(result.systemCost)} today in a ${inp.systemKwp} kWp rooftop solar system. From the very first month, your`,
      `electricity bill drops by approximately ${fmtPdf(yr1Monthly)} every month — that's ${fmtPdf(yr1?.savings || 0)} saved in just the first year.`,
      ``,
      `With electricity tariffs rising ~${inp.escalation}% every year, your savings grow automatically. In ${result.payback.toFixed(1)} years, the`,
      `system has fully paid for itself. For the remaining ${(25 - result.payback).toFixed(0)}+ years, every unit of solar power is`,
      `essentially free — adding up to ${fmtPdf(result.totalSavings25)} in total savings over 25 years.`,
    ];
    lines.forEach((line, i) => doc.text(line, m + 7, y + 14 + i * 5));
  } else {
    const itcNote = result.itcBenefit > 0 ? ` After GST ITC recovery of ${fmtPdf(result.itcBenefit)}, your effective net investment is lower.` : "";
    const adNote = inp.claimAD ? ` 40% Accelerated Depreciation provides additional tax savings in Years 1–3.` : "";
    const lines = [
      `A ${inp.systemKwp} kWp solar installation for ${inp.company || inp.name} at ${inp.city} costs ${fmtPdf(result.systemCost)}.${itcNote}`,
      `The system generates ~${(yr1?.generation || 0).toLocaleString("en-IN")} units/year, replacing grid power at Rs.${inp.tariff}/unit — saving`,
      `${fmtPdf(yr1?.savings || 0)} in Year 1 alone, growing at ${inp.escalation}% annually as tariffs rise.${adNote}`,
      ``,
      `This investment delivers a Project IRR of ${result.projectIRR.toFixed(1)}% — well above bank FD rates (6–7%) and most`,
      `debt instruments, with zero market volatility. Payback in ${result.payback.toFixed(1)} years. After that, 25 years of near-free`,
      `power generating ${fmtPdf(result.totalSavings25)} in cumulative savings — making this a high-conviction capital allocation.`,
    ];
    lines.forEach((line, i) => doc.text(line, m + 7, y + 14 + i * 5));
  }
  y += isRes ? 44 : 52;

  // ── MILESTONE PROJECTIONS TABLE ──────────────────────────────────────────────
  doc.setFontSize(8); doc.setFont("helvetica", "bold"); doc.setTextColor(30, 30, 30);
  doc.text("KEY MILESTONE PROJECTIONS", m, y + 5); y += 9;

  const milestones = result.years.filter(r => [1, 3, 5, 10, 15, 20, 25].includes(r.year));

  const tCols = isRes
    ? ["Year", "Units Generated", "Annual Savings", "Cumulative Savings"]
    : ["Year", "Annual Savings", inp.claimAD ? "AD Benefit" : "EMI", "Net Cash Flow", "Cumulative"];
  const tWidths = isRes ? [16, 52, 50, 62] : [16, 40, 36, 42, 46];

  doc.setFillColor(30, 30, 30);
  doc.rect(m, y, col, 6.5, "F");
  let cx = m;
  tCols.forEach((c, i) => {
    doc.setTextColor(255, 255, 255); doc.setFontSize(6.5); doc.setFont("helvetica", "bold");
    doc.text(c, cx + tWidths[i] / 2, y + 4.3, { align: "center" });
    cx += tWidths[i];
  });
  y += 6.5;

  milestones.forEach((row, idx) => {
    if (idx % 2 === 0) { doc.setFillColor(248, 250, 245); doc.rect(m, y, col, 6, "F"); }
    cx = m;
    const tVals = isRes
      ? [
          `Year ${row.year}`,
          `${row.generation.toLocaleString("en-IN")} units`,
          fmtPdf(row.savings),
          fmtPdf(row.cumSavings),
        ]
      : [
          `Year ${row.year}`,
          fmtPdf(row.savings),
          inp.claimAD ? (row.adBenefit > 0 ? fmtPdf(row.adBenefit) : "—") : (row.emi > 0 ? fmtPdf(row.emi) : "—"),
          fmtPdf(row.netCashFlow),
          fmtPdf(row.cumSavings),
        ];
    // highlight break-even row
    const isBreakEven = row.cumSavings >= 0 && (result.years[idx > 0 ? idx - 1 : 0]?.cumSavings || 0) < 0;
    tVals.forEach((v, i) => {
      doc.setTextColor(isBreakEven ? 60 : 40, isBreakEven ? 100 : 40, isBreakEven ? 10 : 40);
      doc.setFontSize(7); doc.setFont("helvetica", isBreakEven ? "bold" : "normal");
      doc.text(v, cx + tWidths[i] / 2, y + 4, { align: "center" });
      cx += tWidths[i];
    });
    y += 6;
  });

  y += 6;

  // ── ASSUMPTIONS + NEXT STEPS (two columns) ───────────────────────────────────
  const halfW = col / 2 - 3;
  doc.setFillColor(248, 248, 248); doc.roundedRect(m, y, halfW, 28, 2, 2, "F");
  doc.setFillColor(248, 248, 248); doc.roundedRect(m + halfW + 6, y, halfW, 28, 2, 2, "F");

  doc.setFontSize(6.5); doc.setFont("helvetica", "bold"); doc.setTextColor(80, 80, 80);
  doc.text("ASSUMPTIONS USED", m + 4, y + 6);
  doc.setFont("helvetica", "normal"); doc.setTextColor(60, 60, 60);
  const assumptions = [
    `Peak sun hours: ${inp.peakSunHours} hrs/day`,
    `Tariff escalation: ${inp.escalation}%/yr`,
    `Panel degradation: ${inp.degradation}%/yr`,
    `Project life: 25 years`,
  ];
  assumptions.forEach((a, i) => doc.text(a, m + 4, y + 12 + i * 4.5));

  doc.setFontSize(6.5); doc.setFont("helvetica", "bold"); doc.setTextColor(80, 80, 80);
  doc.text("NEXT STEPS", m + halfW + 10, y + 6);
  doc.setFont("helvetica", "normal"); doc.setTextColor(60, 60, 60);
  const steps = [
    "1. Book a free site survey with Techedge",
    "2. Receive detailed DPR & custom quote",
    "3. Approve design & sign agreement",
    "4. Installation in 4–6 weeks",
  ];
  steps.forEach((s, i) => doc.text(s, m + halfW + 10, y + 12 + i * 4.5));

  // ── FOOTER ───────────────────────────────────────────────────────────────────
  doc.setFillColor(20, 20, 20);
  doc.rect(0, 282, w, 15, "F");
  doc.setFillColor(141, 198, 63); doc.rect(0, 282, w, 1.5, "F");
  doc.setTextColor(160, 160, 160); doc.setFontSize(6.5); doc.setFont("helvetica", "normal");
  doc.text("This report is for indicative purposes only. Actual results may vary based on site conditions, tariff changes, and equipment performance.", w / 2, 288, { align: "center" });
  doc.setTextColor(141, 198, 63);
  doc.text("Techedge Solar EPC  |  sales@techedgeindia.co.in  |  +91 98440 97096  |  techedgeindia.co.in", w / 2, 293, { align: "center" });

  doc.save(`Techedge_Solar_ROI_${inp.name.replace(/\s/g, "_")}.pdf`);
}

// ─── Main component ───────────────────────────────────────────────────────────

const DEFAULT: Inputs = {
  customerType: "commercial",
  name: "", mobile: "", email: "", company: "", city: "",
  gstRegistered: true, claimAD: true, taxRate: 25, claimITC: true,
  systemKwp: 25, costPerKwp: 55000,
  monthlyBill: 25000, tariff: 7.5,
  escalation: 5, degradation: 0.5, peakSunHours: 4.5,
  financing: "self", loanPct: 70, interestRate: 9, tenure: 7,
};

export default function SolarCalculator() {
  const [inp, setInp] = useState<Inputs>(DEFAULT);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = useCallback(<K extends keyof Inputs>(key: K, val: Inputs[K]) =>
    setInp(prev => ({ ...prev, [key]: val })), []);

  const result = runCalc(inp);

  // Scenario comparison — use user's actual loan inputs for partial
  const scenarioSelf = runCalc({ ...inp, financing: "self" });
  const scenarioPartial = runCalc({ ...inp, financing: "partial" });
  const scenarioFull = runCalc({ ...inp, financing: "full" });

  // Break-even chart: offset cumSavings so it starts at 0 and crosses investment line
  const breakEvenInvestment = result.systemCost - result.itcBenefit;
  const breakEvenData = result.years.map(y => ({
    year: y.year,
    "Cumulative Savings": y.cumSavings + breakEvenInvestment,
  }));

  // Show every 5 years on X axis for clean readability
  const savingsData = result.years
    .filter(y => y.year === 1 || y.year % 5 === 0)
    .map(y => ({
      year: `Yr ${y.year}`,
      "Annual Savings": y.savings + (inp.customerType === "commercial" ? y.adBenefit : 0),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData(formRef.current!);
      await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(formData as any).toString() });
      setSubmitted(true);
      await generatePDF(inp, result);
    } catch {
      await generatePDF(inp, result);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const systemCost = inp.systemKwp * inp.costPerKwp;

  return (
    <div className="bg-[#111] text-white min-h-screen">
      {/* On-Grid notice bar */}
      <div className="border-b border-white/8 bg-white/3 px-4 py-2.5 flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2 text-[#8DC63F] text-xs font-semibold">
          ☀️ On-Grid (Grid-Tied) Systems
        </div>
        <span className="text-white/20 text-xs hidden sm:block">|</span>
        <div className="text-white/40 text-xs">
          For Off-Grid or Hybrid —{" "}
          <a href="/contact" className="text-[#8DC63F] underline underline-offset-2 hover:text-white transition-colors">
            Contact us for a custom quote
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6 items-start">

          {/* ── LEFT PANEL: All Inputs (scrollable) ── */}
          <div className="space-y-4">

            {/* Customer type — most prominent choice */}
            <div className="flex gap-2">
              {(["residential", "commercial"] as const).map(t => (
                <button key={t} onClick={() => {
                    set("customerType", t);
                    if (t === "residential" && inp.systemKwp > 50) set("systemKwp", 10);
                    if (t === "commercial" && inp.systemKwp < 5) set("systemKwp", 25);
                  }}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${inp.customerType === t ? "bg-[#8DC63F] text-black border-[#8DC63F]" : "border-white/15 text-white/60 hover:border-white/30 hover:text-white"}`}>
                  {t === "residential" ? "🏠 Residential" : "🏭 Commercial / Industrial"}
                </button>
              ))}
            </div>

            {/* Section: Your Details */}
            <div className="bg-white/4 rounded-2xl border border-white/10">
              <div className="px-5 py-3 border-b border-white/8">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Your Details</span>
              </div>
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input value={inp.name} onChange={e => set("name", e.target.value)} placeholder="Full Name *"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#8DC63F] outline-none transition-colors" />
                  <input value={inp.mobile} onChange={e => set("mobile", e.target.value)} placeholder="Mobile *" type="tel"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#8DC63F] outline-none transition-colors" />
                </div>
                <CityInput value={inp.city} onChange={v => set("city", v)} />
                <input value={inp.email} onChange={e => set("email", e.target.value)} placeholder="Email (optional)" type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#8DC63F] outline-none transition-colors" />
                {inp.customerType === "commercial" && (
                  <input value={inp.company} onChange={e => set("company", e.target.value)} placeholder="Company / Business Name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#8DC63F] outline-none transition-colors" />
                )}
              </div>
            </div>

            {/* Section: System */}
            <div className="bg-white/4 rounded-2xl border border-white/10">
              <div className="px-5 py-3 border-b border-white/8">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">System Size & Cost</span>
              </div>
              <div className="p-5 space-y-4">
                <SliderInput label="System Size" value={inp.systemKwp}
                  min={inp.customerType === "residential" ? 1 : 5}
                  max={inp.customerType === "residential" ? 50 : 1000}
                  step={inp.customerType === "residential" ? 1 : 5}
                  unit=" kWp"
                  onChange={v => set("systemKwp", Math.min(v, inp.customerType === "residential" ? 50 : 1000))} />
                <SliderInput label="Cost per kWp" value={inp.costPerKwp} min={40000} max={80000} step={1000} unit="₹"
                  onChange={v => set("costPerKwp", v)} />
                <div className="bg-[#8DC63F]/10 border border-[#8DC63F]/25 rounded-lg px-4 py-2.5 flex justify-between items-center">
                  <span className="text-xs text-white/50">Total System Cost</span>
                  <span className="text-[#8DC63F] font-black text-base">{fmt(systemCost)}</span>
                </div>
              </div>
            </div>

            {/* Section: Electricity */}
            <div className="bg-white/4 rounded-2xl border border-white/10">
              <div className="px-5 py-3 border-b border-white/8">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Electricity</span>
              </div>
              <div className="p-5 space-y-4">
                <SliderInput label="Current Tariff" value={inp.tariff} min={4} max={12} step={0.25} unit=" ₹/unit"
                  onChange={v => set("tariff", v)} />
                <SliderInput label="Monthly Bill" value={inp.monthlyBill} min={1000} max={500000} step={1000} unit="₹"
                  onChange={v => set("monthlyBill", v)} />
                <SliderInput label="Peak Sun Hours / Day" value={inp.peakSunHours} min={3} max={6} step={0.25} unit=" hrs"
                  onChange={v => set("peakSunHours", v)} />
                <SliderInput label="Annual Tariff Escalation" value={inp.escalation} min={1} max={10} step={0.5} unit="%"
                  onChange={v => set("escalation", v)} />
                <SliderInput label="Panel Degradation / Year" value={inp.degradation} min={0.1} max={1} step={0.1} unit="%"
                  onChange={v => set("degradation", v)} />
              </div>
            </div>

            {/* Section: Financing */}
            <div className="bg-white/4 rounded-2xl border border-white/10">
              <div className="px-5 py-3 border-b border-white/8">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Financing</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {([["self", "Self Funded"], ["partial", "Partial Loan"], ["full", "Full Loan"]] as const).map(([val, label]) => (
                    <button key={val} onClick={() => set("financing", val)}
                      className={`py-2.5 rounded-lg text-xs font-semibold border transition-colors ${inp.financing === val ? "bg-[#8DC63F] text-black border-[#8DC63F]" : "border-white/10 text-white/60 hover:border-white/30"}`}>
                      {label}
                    </button>
                  ))}
                </div>

                {inp.financing !== "self" && (
                  <div className="space-y-4 pt-2">
                    {inp.financing === "partial" && (
                      <SliderInput label="Loan Percentage" value={inp.loanPct} min={10} max={90} step={5} unit="%"
                        onChange={v => set("loanPct", v)} />
                    )}
                    <SliderInput label="Interest Rate" value={inp.interestRate} min={6} max={15} step={0.25} unit="% p.a."
                      onChange={v => set("interestRate", v)} />
                    <SliderInput label="Loan Tenure" value={inp.tenure} min={1} max={15} step={1} unit=" yrs"
                      onChange={v => set("tenure", v)} />
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-white/5 rounded-lg px-3 py-2.5 text-center">
                        <div className="text-white/40 mb-1">Loan Amount</div>
                        <div className="text-white font-semibold">{fmt(result.loanAmt)}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg px-3 py-2.5 text-center">
                        <div className="text-white/40 mb-1">Your Equity</div>
                        <div className="text-white font-semibold">{fmt(result.equity)}</div>
                      </div>
                      <div className="bg-[#8DC63F]/10 border border-[#8DC63F]/25 rounded-lg px-3 py-2.5 text-center">
                        <div className="text-white/40 mb-1">Monthly EMI</div>
                        <div className="text-[#8DC63F] font-bold">{fmt(result.emiMonthly)}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section: Tax Benefits — commercial only */}
            {inp.customerType === "commercial" && (
              <div className="bg-white/4 rounded-2xl border border-white/10">
                <div className="px-5 py-3 border-b border-white/8">
                  <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Tax Benefits</span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">GST Registered?</span>
                    <button onClick={() => set("gstRegistered", !inp.gstRegistered)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${inp.gstRegistered ? "bg-[#8DC63F]" : "bg-white/20"}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${inp.gstRegistered ? "left-7" : "left-1"}`} />
                    </button>
                  </div>

                  {inp.gstRegistered && (
                    <div className="flex items-center justify-between pt-3 border-t border-white/8">
                      <div>
                        <div className="text-sm text-white/80">Claim GST ITC</div>
                        <div className="text-xs text-white/40">Recovers 8.9% of system cost (EPC rate)</div>
                      </div>
                      <button onClick={() => set("claimITC", !inp.claimITC)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${inp.claimITC ? "bg-[#8DC63F]" : "bg-white/20"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${inp.claimITC ? "left-7" : "left-1"}`} />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-white/8">
                    <div>
                      <div className="text-sm text-white/80">Claim 40% Accelerated Depreciation</div>
                      <div className="text-xs text-white/40">For companies & firms only</div>
                    </div>
                    <button onClick={() => set("claimAD", !inp.claimAD)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${inp.claimAD ? "bg-[#8DC63F]" : "bg-white/20"}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${inp.claimAD ? "left-7" : "left-1"}`} />
                    </button>
                  </div>

                  {inp.claimAD && (
                    <div className="pt-3 border-t border-white/8">
                      <div className="text-xs text-white/50 mb-2">Effective Tax Rate</div>
                      <div className="flex gap-2">
                        {[25, 30].map(r => (
                          <button key={r} onClick={() => set("taxRate", r)}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${inp.taxRate === r ? "bg-[#8DC63F]/20 border-[#8DC63F] text-[#8DC63F]" : "border-white/10 text-white/50"}`}>
                            {r}%
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT PANEL: Results ── */}
          <div className="space-y-5">

            {/* KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Payback Period", value: result.payback > 0 && result.payback < 25 ? `${result.payback.toFixed(1)} yrs` : "N/A", sub: "years to break even" },
                { label: "25-Year Savings", value: fmt(result.totalSavings25), sub: "total energy savings" },
                { label: "Project IRR", value: `${result.projectIRR.toFixed(1)}%`, sub: "return on total project cost" },
                { label: "Total ROI", value: `${result.roi.toFixed(0)}%`, sub: "return on investment" },
              ].map(({ label, value, sub }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-[#8DC63F]/40 transition-colors">
                  <div className="text-xs text-white/40 mb-1">{label}</div>
                  <div className="text-2xl font-black text-[#8DC63F]">{value}</div>
                  <div className="text-[10px] text-white/30 mt-1">{sub}</div>
                </div>
              ))}
            </div>

            {/* Year 1 quick stats */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-white/40 text-xs mb-1">Year 1 Generation</div>
                <div className="text-white font-bold">{result.years[0]?.generation.toLocaleString("en-IN")} units</div>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-1">Monthly Savings (Yr 1)</div>
                <div className="text-[#8DC63F] font-bold">{fmt(result.years[0]?.savings / 12)}</div>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-1">Annual Savings (Yr 1)</div>
                <div className="text-[#8DC63F] font-bold">{fmt(result.years[0]?.savings)}</div>
              </div>
            </div>

            {/* Break-even chart */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-sm font-bold text-white">How quickly do you get your money back?</h3>
              </div>
              <p className="text-xs text-white/40 mb-4">
                The green line is your total savings growing every year. Once it crosses your investment cost — you've fully paid back.
              </p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={breakEvenData} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                  <XAxis
                    dataKey="year"
                    tickFormatter={v => v % 5 === 0 || v === 1 ? `Yr ${v}` : ""}
                    tick={{ fill: "#ffffff40", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tickFormatter={v => v >= 1e7 ? `${(v/1e7).toFixed(1)}Cr` : v >= 1e5 ? `${(v/1e5).toFixed(0)}L` : `${(v/1000).toFixed(0)}K`}
                    tick={{ fill: "#ffffff40", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    width={42}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-xs">
                          <div className="font-semibold text-white mb-1.5">Year {label}</div>
                          {payload.map((p: any) => (
                            <div key={p.name} className="flex justify-between gap-4">
                              <span style={{ color: p.color }}>{p.name}</span>
                              <span className="text-white font-semibold">{fmt(p.value)}</span>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  />
                  <ReferenceLine
                    y={breakEvenInvestment}
                    stroke="#ff6b6b"
                    strokeDasharray="6 3"
                    label={{ value: "Your Investment", fill: "#ff6b6b", fontSize: 10, position: "insideTopRight" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Cumulative Savings"
                    name="Total Savings So Far"
                    stroke="#8DC63F"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-5 h-0.5 bg-[#8DC63F] inline-block" /> Total Savings So Far</span>
                <span className="flex items-center gap-1.5"><span className="w-5 border-t border-dashed border-[#ff6b6b] inline-block" /> Your Investment</span>
              </div>
            </div>

            {/* Annual savings chart */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-1">How much will you save each year?</h3>
              <p className="text-xs text-white/40 mb-4">Savings grow every year as electricity rates rise.</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={savingsData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                  <XAxis dataKey="year" tick={{ fill: "#ffffff40", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis
                    tickFormatter={v => v >= 1e7 ? `${(v/1e7).toFixed(1)}Cr` : v >= 1e5 ? `${(v/1e5).toFixed(0)}L` : `${(v/1000).toFixed(0)}K`}
                    tick={{ fill: "#ffffff40", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    width={42}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-xs">
                          <div className="font-semibold text-white mb-1">{label}</div>
                          <div className="text-[#8DC63F] font-semibold">Savings: {fmt(payload[0].value as number)}</div>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="Annual Savings" fill="#8DC63F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Scenario comparison */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-4">Financing Scenario Comparison</h3>
              <div className="grid grid-cols-3 gap-3">
                <ScenarioCard label={`Self-Funded${inp.financing === "self" ? " ✓" : ""}`} projectIRR={scenarioSelf.projectIRR} payback={scenarioSelf.payback} savings25={scenarioSelf.totalSavings25} netMonthly={scenarioSelf.netMonthlyCashFlow} highlight={inp.financing === "self"} />
                <ScenarioCard label={`${inp.loanPct}% Bank Loan${inp.financing === "partial" ? " ✓" : ""}`} projectIRR={scenarioPartial.projectIRR} payback={scenarioPartial.payback} savings25={scenarioPartial.totalSavings25} netMonthly={scenarioPartial.netMonthlyCashFlow} highlight={inp.financing === "partial"} />
                <ScenarioCard label={`Full Loan (90%)${inp.financing === "full" ? " ✓" : ""}`} projectIRR={scenarioFull.projectIRR} payback={scenarioFull.payback} savings25={scenarioFull.totalSavings25} netMonthly={scenarioFull.netMonthlyCashFlow} highlight={inp.financing === "full"} />
              </div>
            </div>

            {/* GST ITC Eligibility — commercial only */}
            {inp.customerType === "commercial" && <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🏛️</span>
                <h3 className="text-sm font-bold text-white">GST ITC Eligibility — Who Can Claim?</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#8DC63F]/8 border border-[#8DC63F]/25 rounded-xl p-4">
                  <div className="text-[#8DC63F] text-xs font-bold uppercase tracking-wider mb-3">✅ Eligible</div>
                  <ul className="space-y-2 text-xs text-white/70">
                    <li className="flex gap-2"><span className="text-[#8DC63F] mt-0.5 shrink-0">•</span>Any <strong className="text-white">GST-registered business</strong> using solar for commercial/industrial premises</li>
                    <li className="flex gap-2"><span className="text-[#8DC63F] mt-0.5 shrink-0">•</span>Companies, LLPs, partnerships, proprietorships</li>
                    <li className="flex gap-2"><span className="text-[#8DC63F] mt-0.5 shrink-0">•</span>Factories, fuel stations, cold storage, hotels, offices</li>
                    <li className="flex gap-2"><span className="text-[#8DC63F] mt-0.5 shrink-0">•</span>Output supply must be <strong className="text-white">taxable</strong> (not exempt)</li>
                  </ul>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                  <div className="text-red-400 text-xs font-bold uppercase tracking-wider mb-3">❌ Not Eligible</div>
                  <ul className="space-y-2 text-xs text-white/70">
                    <li className="flex gap-2"><span className="text-red-400 mt-0.5 shrink-0">•</span>Residential / individual homeowners</li>
                    <li className="flex gap-2"><span className="text-red-400 mt-0.5 shrink-0">•</span>Businesses under <strong className="text-white">Composition Scheme</strong></li>
                    <li className="flex gap-2"><span className="text-red-400 mt-0.5 shrink-0">•</span>Entities making only exempt supplies</li>
                    <li className="flex gap-2"><span className="text-red-400 mt-0.5 shrink-0">•</span>Trusts / NGOs with no taxable output</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-white/3 border border-white/8 rounded-xl p-4">
                <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3">Key Conditions to Claim</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/60">
                  <div className="flex gap-2"><span className="text-[#8DC63F] shrink-0">1.</span>Valid <strong className="text-white/80">tax invoice</strong> from solar supplier</div>
                  <div className="flex gap-2"><span className="text-[#8DC63F] shrink-0">2.</span>Supplier filed <strong className="text-white/80">GSTR-1</strong> (credit shows in your GSTR-2B)</div>
                  <div className="flex gap-2"><span className="text-[#8DC63F] shrink-0">3.</span>System <strong className="text-white/80">capitalised</strong> as asset in books</div>
                  <div className="flex gap-2"><span className="text-[#8DC63F] shrink-0">4.</span>Claim before <strong className="text-white/80">30 Nov</strong> of the following financial year</div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <div className="bg-[#8DC63F]/10 border border-[#8DC63F]/30 rounded-lg px-3 py-1.5">
                  <span className="text-white/70">EPC blended ITC = </span><span className="text-[#8DC63F] font-bold">8.9% of project cost</span>
                </div>
                <div className="bg-white/3 border border-white/8 rounded-lg px-3 py-1.5 w-full text-white/50">
                  70% × 5% + 30% × 18% = 3.5% + 5.4% = <strong className="text-white/70">8.9%</strong>
                </div>
              </div>

              <p className="text-[10px] text-white/30 mt-3">This is general guidance only. Consult your CA to confirm eligibility for your specific entity and use case.</p>
            </div>}

            {/* Download */}
            {!submitted ? (
              <div className="bg-gradient-to-br from-[#8DC63F]/10 to-transparent border border-[#8DC63F]/30 rounded-2xl p-6">
                <h3 className="text-white font-bold text-base mb-1">Download Your Report</h3>
                <p className="text-white/50 text-xs mb-4">
                  {inp.name ? `Ready for ${inp.name}${inp.city ? `, ${inp.city}` : ""}.` : "Enter your name and mobile to download."}{" "}
                  Personalised PDF with your 25-year projection.
                </p>

                <form ref={formRef} onSubmit={handleSubmit} name="solar-calculator" data-netlify="true" data-netlify-honeypot="bot-field" className="space-y-3">
                  <input type="hidden" name="form-name" value="solar-calculator" />
                  <input type="hidden" name="bot-field" />
                  <input type="hidden" name="name" value={inp.name} />
                  <input type="hidden" name="mobile" value={inp.mobile} />
                  <input type="hidden" name="email" value={inp.email} />
                  <input type="hidden" name="city" value={inp.city} />
                  <input type="hidden" name="company" value={inp.company} />
                  <input type="hidden" name="system-kwp" value={inp.systemKwp} />
                  <input type="hidden" name="system-cost" value={fmt(systemCost)} />
                  <input type="hidden" name="tariff" value={`₹${inp.tariff}/unit`} />
                  <input type="hidden" name="financing-type" value={inp.financing} />
                  <input type="hidden" name="payback-years" value={result.payback.toFixed(1)} />
                  <input type="hidden" name="irr" value={`${result.irr.toFixed(1)}%`} />
                  <input type="hidden" name="savings-25yr" value={fmt(result.totalSavings25)} />
                  <input type="hidden" name="customer-type" value={inp.customerType} />
                  <input type="hidden" name="gst-registered" value={inp.gstRegistered ? "Yes" : "No"} />

                  <button type="submit" disabled={submitting || !inp.name || !inp.mobile}
                    className="w-full bg-[#8DC63F] text-black font-bold py-3.5 rounded-xl hover:bg-[#7ab535] transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                    {submitting ? "Generating..." : "⬇ Download PDF Report"}
                  </button>
                  {(!inp.name || !inp.mobile) && (
                    <p className="text-xs text-amber-400/70 text-center">Enter your name and mobile number above to download.</p>
                  )}
                  <p className="text-xs text-white/30 text-center">Your report downloads automatically. We may reach out to discuss your project.</p>
                </form>
              </div>
            ) : (
              <div className="bg-[#8DC63F]/10 border border-[#8DC63F]/40 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-white font-bold text-lg mb-2">Report Downloaded!</h3>
                <p className="text-white/60 text-sm mb-4">Our team at Techedge will review your project details and reach out within 24 hours.</p>
                <a href="/contact" className="inline-block bg-[#8DC63F] text-black font-bold px-6 py-2.5 rounded-xl hover:bg-[#7ab535] transition-colors text-sm">
                  Talk to an Expert →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
