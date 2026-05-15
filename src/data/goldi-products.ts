// Goldi Solar — Authorised Dealer & EPC Supply
// GST: 5% on solar PV modules (HSN 85414011)

export interface GoldiProduct {
  id: number;
  slug: string;
  name: string;
  model: string;
  series: string;
  powerWp: number;
  type: string;           // e.g. "Bifacial Monocrystalline TOPCon"
  efficiency: number;     // %
  vocV: number;
  vmpV: number;
  iscA: number;
  impA: number;
  bifaciality?: string;   // e.g. "80 ± 5%"
  rearPowerWp?: number;   // max rear-side power with 10% rear gain
  temperatureCoeffPmax: string;
  maxSystemVoltage: number;
  dimensions: string;     // mm W×L×H
  weight: number;         // kg
  modulesPerPallet: number;
  palletsPerContainer: number;
  modulesPerContainer: number;
  productWarranty: string;
  performanceWarranty: string;
  certifications: string[];
  gstRate: 5;
  features: string[];
  useCases: string[];
  seoTitle: string;
  seoDescription: string;
}

export const goldiProducts: GoldiProduct[] = [
  {
    id: 201,
    slug: 'goldi-solar-gs12r-t132-gf-600wp',
    name: 'Goldi Solar HELOC PLUS 600 Wp',
    model: 'GS12R-T132-GF-600',
    series: 'HELOC PLUS',
    powerWp: 600,
    type: 'Bifacial Monocrystalline TOPCon',
    efficiency: 22.21,
    vocV: 48.40,
    vmpV: 40.30,
    iscA: 15.80,
    impA: 14.89,
    bifaciality: '80 ± 5%',
    rearPowerWp: 660,
    temperatureCoeffPmax: '-0.30% / °C',
    maxSystemVoltage: 1500,
    dimensions: '2382 × 1134 × 30 mm',
    weight: 33.7,
    modulesPerPallet: 36,
    palletsPerContainer: 20,
    modulesPerContainer: 720,
    productWarranty: '12 years',
    performanceWarranty: '30 years linear',
    certifications: ['IEC 61215:2021', 'IEC 61730:2023', 'IS 14286:2010', 'IEC 62716', 'IEC 60068-2-62', 'IEC CD 61215-2:2018', 'UL 61730-1&2', 'IEC 62804', 'CEC'],
    gstRate: 5,
    features: [
      '600 Wp TOPCon bifacial monocrystalline — 22.21% module efficiency',
      'HELOC PLUS cell technology — lower LID, lower BOS cost, faster payback',
      'N-type TOPCon — lower Le-TID & LID degradation vs PERC',
      '10–30% additional power gain from bifacial rear-side generation',
      'Excellent weak-light performance — generates power on cloudy days',
      'Anti-PID performance guarantee — suitable for high-humidity regions',
      '1500 V max system voltage — fewer strings, lower BOS cost',
      'Hail resistant — max 25mm diameter at 23 m/s',
      '12-year product warranty + 30-year linear performance warranty',
      'Made in India — ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 certified facility',
    ],
    useCases: [
      'Rooftop solar — residential & commercial',
      'Ground-mounted utility solar farms',
      'Carport and BIPV installations',
      'Industrial rooftop EPC projects',
      'Solar microgrid and off-grid projects',
      'Agricultural solar (agrivoltaic)',
    ],
    seoTitle: 'Goldi Solar HELOC PLUS 600 Wp Bifacial TOPCon Module India | Techedge',
    seoDescription: 'Goldi Solar GS12R-T132-GF 600 Wp bifacial TOPCon monocrystalline module — 22.21% efficiency, 30yr warranty, Made in India. Authorised dealer supply & EPC installation by Techedge India.',
  },
  {
    id: 202,
    slug: 'goldi-solar-gs12r-t132-gf-605wp',
    name: 'Goldi Solar HELOC PLUS 605 Wp',
    model: 'GS12R-T132-GF-605',
    series: 'HELOC PLUS',
    powerWp: 605,
    type: 'Bifacial Monocrystalline TOPCon',
    efficiency: 22.39,
    vocV: 48.40,
    vmpV: 40.50,
    iscA: 15.83,
    impA: 14.94,
    bifaciality: '80 ± 5%',
    rearPowerWp: 665,
    temperatureCoeffPmax: '-0.30% / °C',
    maxSystemVoltage: 1500,
    dimensions: '2382 × 1134 × 30 mm',
    weight: 33.7,
    modulesPerPallet: 36,
    palletsPerContainer: 20,
    modulesPerContainer: 720,
    productWarranty: '12 years',
    performanceWarranty: '30 years linear',
    certifications: ['IEC 61215:2021', 'IEC 61730:2023', 'IS 14286:2010', 'IEC 62716', 'IEC 60068-2-62', 'IEC CD 61215-2:2018', 'UL 61730-1&2', 'IEC 62804', 'CEC'],
    gstRate: 5,
    features: [
      '605 Wp TOPCon bifacial monocrystalline — 22.39% module efficiency',
      'HELOC PLUS N-type cell — superior temperature coefficient -0.30%/°C',
      'Bifacial factor 80±5% — up to 665 Wp with rear-side gain',
      '1500 V system voltage — optimised for large commercial arrays',
      'Anti-PID guarantee — suitable for humid and coastal sites',
      'Excellent weak-light performance on overcast days',
      '12-year product + 30-year linear performance warranty',
      'Made in India — IEC, IS14286, CEC certified',
    ],
    useCases: [
      'Commercial & industrial rooftop (50 kW–5 MW)',
      'Ground-mounted solar parks',
      'RESCO / IPP projects',
      'Captive solar for factories',
      'Solar microgrid power plants',
    ],
    seoTitle: 'Goldi Solar HELOC PLUS 605 Wp Bifacial TOPCon Module India | Techedge',
    seoDescription: 'Goldi Solar GS12R-T132-GF 605 Wp bifacial TOPCon — 22.39% efficiency, bifaciality 80±5%, 30yr warranty. Authorised dealer & EPC supply by Techedge India.',
  },
  {
    id: 203,
    slug: 'goldi-solar-gs12r-t132-gf-610wp',
    name: 'Goldi Solar HELOC PLUS 610 Wp',
    model: 'GS12R-T132-GF-610',
    series: 'HELOC PLUS',
    powerWp: 610,
    type: 'Bifacial Monocrystalline TOPCon',
    efficiency: 22.58,
    vocV: 49.00,
    vmpV: 40.70,
    iscA: 15.86,
    impA: 14.99,
    bifaciality: '80 ± 5%',
    rearPowerWp: 671,
    temperatureCoeffPmax: '-0.30% / °C',
    maxSystemVoltage: 1500,
    dimensions: '2382 × 1134 × 30 mm',
    weight: 33.7,
    modulesPerPallet: 36,
    palletsPerContainer: 20,
    modulesPerContainer: 720,
    productWarranty: '12 years',
    performanceWarranty: '30 years linear',
    certifications: ['IEC 61215:2021', 'IEC 61730:2023', 'IS 14286:2010', 'IEC 62716', 'IEC 60068-2-62', 'IEC CD 61215-2:2018', 'UL 61730-1&2', 'IEC 62804', 'CEC'],
    gstRate: 5,
    features: [
      '610 Wp TOPCon bifacial — 22.58% efficiency, best-in-class energy yield',
      'Rear-side gain brings effective output up to 671 Wp',
      'N-type TOPCon reduces annual degradation vs PERC by 0.1–0.2%/yr',
      'Snow load 5400 Pa, wind load 2400 Pa — suitable for all Indian climates',
      'IP68 J-box, 3 bypass diodes, MC4 connectors — IEC compliant',
      '30-year linear power output warranty — 89.5% at year 30',
      'Made in India, ISO 9001/14001/45001 certified facility',
    ],
    useCases: [
      'Large commercial EPC projects',
      'Net metering rooftop solar',
      'Government / PSU solar tenders',
      'Solar + storage hybrid systems',
      'High-efficiency space-constrained rooftops',
    ],
    seoTitle: 'Goldi Solar HELOC PLUS 610 Wp Bifacial TOPCon Module India | Techedge',
    seoDescription: 'Goldi Solar GS12R-T132-GF 610 Wp bifacial TOPCon — 22.58% efficiency, rear gain to 671 Wp, 30yr warranty. Buy from Techedge India — authorised Goldi Solar dealer & EPC contractor.',
  },
  {
    id: 204,
    slug: 'goldi-solar-gs12r-t132-gf-615wp',
    name: 'Goldi Solar HELOC PLUS 615 Wp',
    model: 'GS12R-T132-GF-615',
    series: 'HELOC PLUS',
    powerWp: 615,
    type: 'Bifacial Monocrystalline TOPCon',
    efficiency: 22.76,
    vocV: 49.30,
    vmpV: 40.90,
    iscA: 15.89,
    impA: 15.04,
    bifaciality: '80 ± 5%',
    rearPowerWp: 676,
    temperatureCoeffPmax: '-0.30% / °C',
    maxSystemVoltage: 1500,
    dimensions: '2382 × 1134 × 30 mm',
    weight: 33.7,
    modulesPerPallet: 36,
    palletsPerContainer: 20,
    modulesPerContainer: 720,
    productWarranty: '12 years',
    performanceWarranty: '30 years linear',
    certifications: ['IEC 61215:2021', 'IEC 61730:2023', 'IS 14286:2010', 'IEC 62716', 'IEC 60068-2-62', 'IEC CD 61215-2:2018', 'UL 61730-1&2', 'IEC 62804', 'CEC'],
    gstRate: 5,
    features: [
      '615 Wp TOPCon bifacial — 22.76% module efficiency',
      'Rear-side power up to 676 Wp with 80% bifaciality',
      'Lowest LCOE in class — N-type, minimal degradation over 30 years',
      'Suitable for BIPV, vertical installation, snowfield, high-humidity environments',
      'Front glass: 2.0mm AR-coated semi-tempered, back glass: 2.0mm toughened',
      'Silver anodised aluminium alloy frame — corrosion resistant',
    ],
    useCases: [
      'Premium rooftop installations (limited space)',
      'BIPV and vertical facade solar',
      'High-value EPC projects requiring max yield',
      'Utility-scale ground-mount',
      'Agrivoltaic / solar agriculture',
    ],
    seoTitle: 'Goldi Solar HELOC PLUS 615 Wp Bifacial TOPCon Module India | Techedge',
    seoDescription: 'Goldi Solar GS12R-T132-GF 615 Wp bifacial TOPCon — 22.76% efficiency, up to 676 Wp rear gain, 30yr warranty. Authorised dealer & EPC installation by Techedge India.',
  },
  {
    id: 205,
    slug: 'goldi-solar-gs12r-t132-gf-620wp',
    name: 'Goldi Solar HELOC PLUS 620 Wp',
    model: 'GS12R-T132-GF-620',
    series: 'HELOC PLUS',
    powerWp: 620,
    type: 'Bifacial Monocrystalline TOPCon',
    efficiency: 22.95,
    vocV: 49.60,
    vmpV: 41.10,
    iscA: 15.92,
    impA: 15.09,
    bifaciality: '80 ± 5%',
    rearPowerWp: 682,
    temperatureCoeffPmax: '-0.30% / °C',
    maxSystemVoltage: 1500,
    dimensions: '2382 × 1134 × 30 mm',
    weight: 33.7,
    modulesPerPallet: 36,
    palletsPerContainer: 20,
    modulesPerContainer: 720,
    productWarranty: '12 years',
    performanceWarranty: '30 years linear',
    certifications: ['IEC 61215:2021', 'IEC 61730:2023', 'IS 14286:2010', 'IEC 62716', 'IEC 60068-2-62', 'IEC CD 61215-2:2018', 'UL 61730-1&2', 'IEC 62804', 'CEC'],
    gstRate: 5,
    features: [
      '620 Wp TOP model — 22.95% efficiency, highest in the GS12R series',
      'Bifacial rear gain to 682 Wp — maximum energy yield per m²',
      'N-type TOPCon: lowest degradation, highest lifetime energy generation',
      '1500 V system voltage enables larger string configurations',
      'Excellent performance in India\'s diverse climates: desert, coastal, humid',
      '100-year design life potential with 30-year linear power warranty',
      '89.5% power output guaranteed at year 30',
    ],
    useCases: [
      'Flagship EPC installations — maximum ROI',
      'Space-constrained high-efficiency rooftops',
      'Premium industrial solar systems',
      'Utility-scale and MW-scale solar parks',
      'Export-quality projects (CEC certified)',
    ],
    seoTitle: 'Goldi Solar HELOC PLUS 620 Wp Bifacial TOPCon Module India | Techedge',
    seoDescription: 'Goldi Solar GS12R-T132-GF 620 Wp bifacial TOPCon — 22.95% efficiency, up to 682 Wp rear gain, 30yr warranty. Top-of-range HELOC PLUS module. Authorised dealer — Techedge India.',
  },
];

export const goldiSeriesMeta = {
  'HELOC PLUS': {
    icon: '☀️',
    label: 'HELOC PLUS Series',
    description: 'Bifacial N-type TOPCon monocrystalline modules — 600–620 Wp, up to 22.95% efficiency, 30-year linear performance warranty. Made in India.',
  },
};
