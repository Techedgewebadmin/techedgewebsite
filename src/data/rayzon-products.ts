// Rayzon Solar TOPCon Modules — Supply Partner
// Made in India | ALMM Listed | BIS Certified | HSN 85414011 | GST: 5%

export interface RayzonProduct {
  id: string;
  slug: string;
  name: string;
  model: string;
  series: string;
  powerWp: number;
  cellType: 'N-type TOPCon';
  cellConfig: string;
  moduleEfficiency: number;   // %
  isc: number;                // A
  voc: number;                // V
  imp: number;                // A
  vmp: number;                // V
  tempCoeffPmax: string;
  bifacial: boolean;
  bifacialityFactor: string;
  glassType: string;
  frameThickness: string;
  certifications: string[];
  productWarranty: string;
  performanceWarranty: string;
  madeInIndia: true;
  almm: boolean;
}

export const rayzonProducts: RayzonProduct[] = [
  {
    id: 'rz-615',
    slug: 'rayzon-topcon-615wp',
    name: 'Rayzon TOPCon 615Wp',
    model: '210R-615',
    series: '210R Domestic',
    powerWp: 615,
    cellType: 'N-type TOPCon',
    cellConfig: '132 half-cut cells (210R, 16BB)',
    moduleEfficiency: 22.60,
    isc: 15.66,
    voc: 48.54,
    imp: 14.88,
    vmp: 40.32,
    tempCoeffPmax: '-0.28%/°C',
    bifacial: true,
    bifacialityFactor: '80±5%',
    glassType: 'Bifacial glass-glass',
    frameThickness: '11.9 mm',
    certifications: ['BIS (IS 14286)', 'IEC 61215', 'IEC 61730', 'UL 61215', 'ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'],
    productWarranty: '15 years',
    performanceWarranty: '30 years linear',
    madeInIndia: true,
    almm: true,
  },
  {
    id: 'rz-620',
    slug: 'rayzon-topcon-620wp',
    name: 'Rayzon TOPCon 620Wp',
    model: '210R-620',
    series: '210R Domestic',
    powerWp: 620,
    cellType: 'N-type TOPCon',
    cellConfig: '132 half-cut cells (210R, 16BB)',
    moduleEfficiency: 22.78,
    isc: 15.68,
    voc: 48.65,
    imp: 14.91,
    vmp: 41.58,
    tempCoeffPmax: '-0.28%/°C',
    bifacial: true,
    bifacialityFactor: '80±5%',
    glassType: 'Bifacial glass-glass',
    frameThickness: '11.9 mm',
    certifications: ['BIS (IS 14286)', 'IEC 61215', 'IEC 61730', 'UL 61215', 'ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'],
    productWarranty: '15 years',
    performanceWarranty: '30 years linear',
    madeInIndia: true,
    almm: true,
  },
  {
    id: 'rz-625',
    slug: 'rayzon-topcon-625wp',
    name: 'Rayzon TOPCon 625Wp',
    model: '210R-625',
    series: '210R Domestic',
    powerWp: 625,
    cellType: 'N-type TOPCon',
    cellConfig: '132 half-cut cells (210R, 16BB)',
    moduleEfficiency: 22.97,
    isc: 15.70,
    voc: 48.79,
    imp: 14.94,
    vmp: 41.83,
    tempCoeffPmax: '-0.28%/°C',
    bifacial: true,
    bifacialityFactor: '80±5%',
    glassType: 'Bifacial glass-glass',
    frameThickness: '11.9 mm',
    certifications: ['BIS (IS 14286)', 'IEC 61215', 'IEC 61730', 'UL 61215', 'ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'],
    productWarranty: '15 years',
    performanceWarranty: '30 years linear',
    madeInIndia: true,
    almm: true,
  },
];
