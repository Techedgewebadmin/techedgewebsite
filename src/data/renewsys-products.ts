// RenewSys Solar Modules — Supply Partner
// Made in India | ALMM Listed | BIS Certified | HSN 85414011 | GST: 5%

export interface RenewSysProduct {
  id: string;
  slug: string;
  name: string;
  model: string;
  series: 'DESERV EXTREME';
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
  bifacialityFactor?: string;
  glassType: string;
  dimensions: string;
  weight: number;             // kg
  certifications: string[];
  productWarranty: string;
  performanceWarranty: string;
  madeInIndia: true;
  almm: boolean;
  dcr: boolean;
}

export const renewSysProducts: RenewSysProduct[] = [
  {
    id: 'rs-600',
    slug: 'renewsys-deserv-extreme-600wp',
    name: 'RenewSys DESERV EXTREME 600Wp',
    model: 'RS600132TGC',
    series: 'DESERV EXTREME',
    powerWp: 600,
    cellType: 'N-type TOPCon',
    cellConfig: '132 half-cut cells (G12R)',
    moduleEfficiency: 22.60,
    isc: 15.66,
    voc: 48.54,
    imp: 14.88,
    vmp: 40.32,
    tempCoeffPmax: '-0.28%/°C',
    bifacial: true,
    bifacialityFactor: '80±5%',
    glassType: 'Glass-to-Glass (bifacial dual glass)',
    dimensions: '2278 × 1134 × 30 mm',
    weight: 32.5,
    certifications: ['BIS (IS 14286)', 'IEC 61215', 'IEC 61730', 'ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'],
    productWarranty: '12 years',
    performanceWarranty: '30 years linear',
    madeInIndia: true,
    almm: true,
    dcr: true,
  },
  {
    id: 'rs-610',
    slug: 'renewsys-deserv-extreme-610wp',
    name: 'RenewSys DESERV EXTREME 610Wp',
    model: 'RS610132TGC',
    series: 'DESERV EXTREME',
    powerWp: 610,
    cellType: 'N-type TOPCon',
    cellConfig: '132 half-cut cells (G12R)',
    moduleEfficiency: 22.97,
    isc: 15.68,
    voc: 48.65,
    imp: 14.91,
    vmp: 40.91,
    tempCoeffPmax: '-0.28%/°C',
    bifacial: true,
    bifacialityFactor: '80±5%',
    glassType: 'Glass-to-Glass (bifacial dual glass)',
    dimensions: '2278 × 1134 × 30 mm',
    weight: 32.5,
    certifications: ['BIS (IS 14286)', 'IEC 61215', 'IEC 61730', 'ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'],
    productWarranty: '12 years',
    performanceWarranty: '30 years linear',
    madeInIndia: true,
    almm: true,
    dcr: true,
  },
  {
    id: 'rs-615',
    slug: 'renewsys-deserv-extreme-615wp',
    name: 'RenewSys DESERV EXTREME 615Wp',
    model: 'RS615132TGC',
    series: 'DESERV EXTREME',
    powerWp: 615,
    cellType: 'N-type TOPCon',
    cellConfig: '132 half-cut cells (G12R)',
    moduleEfficiency: 23.16,
    isc: 15.70,
    voc: 48.79,
    imp: 14.93,
    vmp: 41.19,
    tempCoeffPmax: '-0.28%/°C',
    bifacial: true,
    bifacialityFactor: '80±5%',
    glassType: 'Glass-to-Glass (bifacial dual glass)',
    dimensions: '2278 × 1134 × 30 mm',
    weight: 32.5,
    certifications: ['BIS (IS 14286)', 'IEC 61215', 'IEC 61730', 'ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'],
    productWarranty: '12 years',
    performanceWarranty: '30 years linear',
    madeInIndia: true,
    almm: true,
    dcr: true,
  },
  {
    id: 'rs-620',
    slug: 'renewsys-deserv-extreme-620wp',
    name: 'RenewSys DESERV EXTREME 620Wp',
    model: 'RS620132TGC',
    series: 'DESERV EXTREME',
    powerWp: 620,
    cellType: 'N-type TOPCon',
    cellConfig: '132 half-cut cells (G12R)',
    moduleEfficiency: 23.35,
    isc: 15.71,
    voc: 48.92,
    imp: 14.95,
    vmp: 41.46,
    tempCoeffPmax: '-0.28%/°C',
    bifacial: true,
    bifacialityFactor: '80±5%',
    glassType: 'Glass-to-Glass (bifacial dual glass)',
    dimensions: '2278 × 1134 × 30 mm',
    weight: 32.5,
    certifications: ['BIS (IS 14286)', 'IEC 61215', 'IEC 61730', 'ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'],
    productWarranty: '12 years',
    performanceWarranty: '30 years linear',
    madeInIndia: true,
    almm: true,
    dcr: true,
  },
  {
    id: 'rs-625',
    slug: 'renewsys-deserv-extreme-625wp',
    name: 'RenewSys DESERV EXTREME 625Wp',
    model: 'RS625132TGC',
    series: 'DESERV EXTREME',
    powerWp: 625,
    cellType: 'N-type TOPCon',
    cellConfig: '132 half-cut cells (G12R)',
    moduleEfficiency: 23.54,
    isc: 15.73,
    voc: 49.18,
    imp: 14.98,
    vmp: 41.72,
    tempCoeffPmax: '-0.28%/°C',
    bifacial: true,
    bifacialityFactor: '80±5%',
    glassType: 'Glass-to-Glass (bifacial dual glass)',
    dimensions: '2278 × 1134 × 30 mm',
    weight: 32.5,
    certifications: ['BIS (IS 14286)', 'IEC 61215', 'IEC 61730', 'ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'],
    productWarranty: '12 years',
    performanceWarranty: '30 years linear',
    madeInIndia: true,
    almm: true,
    dcr: true,
  },
];
