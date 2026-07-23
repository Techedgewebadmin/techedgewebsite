// Generates the Techedge-branded Deye price list PDF from src/data/deye-products.ts.
// Run: npx tsx scripts/generate-deye-price-list.mjs
// Output: public/downloads/techedge-deye-price-list.pdf

import { jsPDF } from "jspdf";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { deyeProducts, categoryMeta } from "../src/data/deye-products.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../public/downloads/techedge-deye-price-list.pdf");

const EFFECTIVE_DATE = "July 2026";
const GREEN = [141, 198, 63];
const DARK = [20, 20, 20];
const GREY = [110, 110, 110];
const LIGHT = [245, 247, 242];

// jsPDF's standard (non-embedded) Helvetica font only reliably renders plain
// ASCII — smart dashes, bullets, middle dots etc. render as garbled/overlapping
// glyphs on many viewers. Normalise everything to plain ASCII before drawing.
const clean = (s) =>
  String(s)
    .replace(/[‒-―−]/g, "-") // en/em dash, minus sign
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/•/g, "-") // bullet
    .replace(/·/g, "-") // middle dot
    .replace(/…/g, "...")
    .replace(/×/g, "x")
    .replace(/→/g, "->")
    .replace(/₹/g, "Rs. ")
    .replace(/[^\x00-\x7F]/g, ""); // strip anything else non-ASCII

const text = (doc, str, x, y, opts) => doc.text(clean(str), x, y, opts);

const inr = (n) => "Rs. " + Math.round(n).toLocaleString("en-IN");

const specText = (p) => {
  if (p.powerKw) return `${p.powerKw} kW${p.phase && p.phase !== "N/A" ? `, ${p.phase}` : ""}`;
  if (p.capacityKwh) return `${p.capacityKwh} kWh`;
  return p.subcategory;
};

const categories = ["On-Grid", "Micro", "Hybrid", "Battery", "All-in-One"];

const doc = new jsPDF({ unit: "mm", format: "a4" });
const W = doc.internal.pageSize.getWidth();
const H = doc.internal.pageSize.getHeight();
const M = 15;
const COLS = { model: M, spec: M + 84, gst: M + 126, excl: M + 141, incl: M + 168 };
const MODEL_WIDTH = COLS.spec - COLS.model - 2;
const ROW_H = 6.2;
const LINE_H = 3.5;
let page = 1;

function drawHeader() {
  doc.setFillColor(...DARK);
  doc.rect(0, 0, W, 24, "F");
  doc.setFillColor(...GREEN);
  doc.rect(0, 0, 4, 24, "F");

  doc.setTextColor(...GREEN);
  doc.setFontSize(17);
  doc.setFont("helvetica", "bold");
  text(doc, "TECHEDGE", M, 11);

  doc.setFontSize(8);
  doc.setTextColor(210, 210, 210);
  doc.setFont("helvetica", "normal");
  text(doc, "Deye Solar Inverters & Battery Storage - Price List", M, 17);
  doc.setFontSize(7);
  doc.setTextColor(160, 160, 160);
  text(doc, `Effective ${EFFECTIVE_DATE} - Prices exclusive of transport & installation`, M, 21.5);

  doc.setTextColor(...GREEN);
  doc.setFontSize(7.5);
  text(doc, "techedgeindia.co.in", W - M, 11, { align: "right" });
  doc.setTextColor(200, 200, 200);
  text(doc, "+91 98440 97096", W - M, 15.5, { align: "right" });
  text(doc, "sales@techedgeindia.co.in", W - M, 20, { align: "right" });
}

function drawTableHead(y) {
  doc.setFillColor(...LIGHT);
  doc.rect(M, y, W - 2 * M, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(60, 60, 60);
  text(doc, "Model / Description", COLS.model + 1, y + 4.2);
  text(doc, "Spec", COLS.spec + 1, y + 4.2);
  text(doc, "GST", COLS.gst + 1, y + 4.2);
  text(doc, "Price (excl. GST)", COLS.excl + 1, y + 4.2);
  text(doc, "Price (incl. GST)", COLS.incl + 1, y + 4.2);
  return y + 10; // extra clearance so the first row's shading never overlaps the header text
}

function drawFooter() {
  doc.setFontSize(7);
  doc.setTextColor(...GREY);
  text(doc, `Page ${page}`, W - M, H - 8, { align: "right" });
  text(doc, "Techedge SPE India Pvt. Ltd. - authorised Deye dealer, Bengaluru", M, H - 8);
}

function newPage() {
  doc.addPage();
  page++;
  drawHeader();
  drawFooter();
  return 32;
}

drawHeader();
drawFooter();
let y = 32;

for (const cat of categories) {
  const meta = categoryMeta[cat];
  const products = deyeProducts.filter((p) => p.category === cat);
  if (products.length === 0) continue;

  if (y > H - 40) y = newPage();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  text(doc, `${meta.label} (${products.length})`, M, y);
  y += 6;
  y = drawTableHead(y);

  let shadeNext = false; // never shade the row immediately under a header — avoids painting over its text
  for (const p of products) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.3);
    let nameLines = doc.splitTextToSize(clean(p.name), MODEL_WIDTH);
    if (nameLines.length > 2) {
      nameLines = [nameLines[0], nameLines[1].replace(/.{3}$/, "...")];
    }
    const rowH = Math.max(ROW_H, nameLines.length * LINE_H + 2.6);

    if (y + rowH > H - 18) {
      y = newPage();
      y = drawTableHead(y);
      shadeNext = false;
    }
    if (shadeNext) {
      doc.setFillColor(250, 250, 250);
      doc.rect(M, y - 4.4, W - 2 * M, rowH, "F");
    }
    shadeNext = !shadeNext;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.3);
    doc.setTextColor(...DARK);
    doc.text(nameLines, COLS.model + 1, y); // already cleaned above

    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 90);
    text(doc, specText(p), COLS.spec + 1, y);
    text(doc, `${p.gstRate}%`, COLS.gst + 1, y);

    doc.setTextColor(...DARK);
    text(doc, inr(p.sellingPrice), COLS.excl + 1, y);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 101, 52);
    text(doc, inr(p.sellingPrice * (1 + p.gstRate / 100)), COLS.incl + 1, y);

    y += rowH;
  }
  y += 6;
}

// Notes page
if (y > H - 70) y = newPage();
y += 4;
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(...DARK);
text(doc, "Notes", M, y);
y += 7;

const notes = [
  "All prices above are EPC selling prices, exclusive of transport charges.",
  "GST: 5% on inverters (HSN 8541), 18% on batteries, accessories and ESS systems.",
  "Installation and site visit charges during installation are extra, at actuals.",
  "Warranty - On-grid inverters up to 10 kW: 10 years. On-grid inverters above 10 kW: 8 years.",
  "Warranty - Hybrid inverters: 5 years. LiFePO4 batteries (6,000 cycles): 10 years.",
  "Customers purchasing a Deye hybrid inverter together with a Deye battery receive a comprehensive 10-year warranty on both.",
  "Prices are indicative and subject to change without prior notice. Contact Techedge for a current, site-specific quotation.",
];
doc.setFont("helvetica", "normal");
doc.setFontSize(8);
doc.setTextColor(70, 70, 70);
for (const note of notes) {
  const lines = doc.splitTextToSize(clean(`-  ${note}`), W - 2 * M);
  doc.text(lines, M, y); // already cleaned
  y += lines.length * 4.6 + 1.5;
}

const bytes = doc.output("arraybuffer");
writeFileSync(OUT_PATH, Buffer.from(bytes));
console.log(`Written ${OUT_PATH} (${deyeProducts.length} products, ${page} pages)`);
