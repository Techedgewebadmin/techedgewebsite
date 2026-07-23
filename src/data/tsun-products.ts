// TSUN GEN3 Microinverter 2-in-1 — Supply Partner
// HSN 85044090 | GST: 12%

export interface TsunProduct {
  id: number;
  slug: string;
  name: string;
  model: string;
  series: 'GEN3';
  powerW: number;             // AC output W
  pvInputs: number;           // DC inputs (always 2)
  mpptsCount: number;         // always 2
  mpptVoltageRange: string;   // 16–60 V
  maxInputVoltage: number;    // V
  startupVoltage: number;     // V
  maxInputCurrentPerInput: number; // A
  recommendedModulePower: string;  // '300–600+ W'
  maxOutputCurrent: number;   // A
  acVoltage: string;
  acFrequency: string;
  powerFactor: string;
  thd: string;
  peakEfficiency: number;     // %
  euEfficiency: number;       // %
  mpptEfficiency: number;     // %
  ipRating: string;
  communication: string;
  dimensions: string;
  weight: number;             // kg
  operatingTemp: string;
  warranty: string;
  certifications: string[];
  features: string[];
  useCases: string[];
  gstRate: 12;
  sellingPrice: number;       // INR excl. GST
  seoTitle: string;
  seoDescription: string;
}

export const tsunProducts: TsunProduct[] = [
  {
    id: 501,
    slug: 'tsun-gen3-mx800-micro-inverter',
    name: 'TSUN GEN3 MX800 Micro Inverter',
    model: 'MX800',
    series: 'GEN3',
    powerW: 800,
    pvInputs: 2,
    mpptsCount: 2,
    mpptVoltageRange: '16–60 V',
    maxInputVoltage: 60,
    startupVoltage: 22,
    maxInputCurrentPerInput: 18,
    recommendedModulePower: '300–600+ W',
    maxOutputCurrent: 4,
    acVoltage: '220/230/240 V',
    acFrequency: '50/60 Hz',
    powerFactor: '>0.99',
    thd: '<3%',
    peakEfficiency: 96.7,
    euEfficiency: 96.5,
    mpptEfficiency: 99.9,
    ipRating: 'IP67',
    communication: 'WiFi + Bluetooth + RS485×2',
    dimensions: '261 × 228 × 32 mm',
    weight: 2.8,
    operatingTemp: '-40°C to +65°C',
    warranty: '15 years',
    certifications: ['CE', 'BIS (India)', 'VDE', 'ETL/Intertek', 'NEC 2020', 'ISO 9001', 'ISO 14001'],
    features: [
      'Built-in WiFi + Bluetooth — no separate gateway required, direct app monitoring',
      'RS485×2 communication — first in class for micro inverters, enables professional monitoring integration',
      'BIS India certified — compliant with Indian grid standards for DISCOM net metering approval',
      'Per-panel MPPT (2 independent channels) — zero shading loss between panels',
      'IP67 fully sealed — rated for Indian monsoon, dust, and humidity',
      'Trunk cable T-connector AC bus — clean daisy-chain wiring across rooftop, no long individual runs',
      '99.9% MPPT efficiency — extracts the maximum possible power from each panel at all times',
      'Natural convection cooling — no fans, no moving parts, silent operation',
      'Plug and play installation — AC cable 0.5m with T connector included',
      '<50 mW night-time standby consumption — negligible parasitic draw',
    ],
    useCases: [
      'Residential rooftop with shading or mixed orientations',
      'Villas and independent homes',
      'DISCOM net metering applications requiring BIS certification',
      'Phased solar expansion — add panels one at a time',
      'Small commercial rooftop < 10 kW',
      'Replacement of failed string inverter with panel-level retrofit',
    ],
    gstRate: 12,
    sellingPrice: 6500,
    seoTitle: 'TSUN GEN3 MX800 Micro Inverter 800W India | BIS Certified | Techedge',
    seoDescription: 'TSUN GEN3 MX800 800W micro inverter — 96.7% efficiency, IP67, BIS India certified, built-in WiFi+Bluetooth+RS485, 15-year warranty. 2 PV inputs, per-panel MPPT. Supply by Techedge Bengaluru.',
  },
  {
    id: 502,
    slug: 'tsun-gen3-mx900-micro-inverter',
    name: 'TSUN GEN3 MX900 Micro Inverter',
    model: 'MX900',
    series: 'GEN3',
    powerW: 900,
    pvInputs: 2,
    mpptsCount: 2,
    mpptVoltageRange: '16–60 V',
    maxInputVoltage: 60,
    startupVoltage: 22,
    maxInputCurrentPerInput: 18,
    recommendedModulePower: '300–600+ W',
    maxOutputCurrent: 4.5,
    acVoltage: '220/230/240 V',
    acFrequency: '50/60 Hz',
    powerFactor: '>0.99',
    thd: '<3%',
    peakEfficiency: 96.7,
    euEfficiency: 96.5,
    mpptEfficiency: 99.9,
    ipRating: 'IP67',
    communication: 'WiFi + Bluetooth + RS485×2',
    dimensions: '261 × 228 × 32 mm',
    weight: 2.8,
    operatingTemp: '-40°C to +65°C',
    warranty: '15 years',
    certifications: ['CE', 'BIS (India)', 'VDE', 'ETL/Intertek', 'NEC 2020', 'ISO 9001', 'ISO 14001'],
    features: [
      'Built-in WiFi + Bluetooth — no separate gateway required, direct app monitoring',
      'RS485×2 communication — first in class for micro inverters, enables professional monitoring integration',
      'BIS India certified — compliant with Indian grid standards for DISCOM net metering approval',
      'Per-panel MPPT (2 independent channels) — zero shading loss between panels',
      'IP67 fully sealed — rated for Indian monsoon, dust, and humidity',
      'Trunk cable T-connector AC bus — clean daisy-chain wiring across rooftop, no long individual runs',
      '99.9% MPPT efficiency — extracts the maximum possible power from each panel at all times',
      'Natural convection cooling — no fans, no moving parts, silent operation',
      'Plug and play installation — AC cable 0.5m with T connector included',
      '<50 mW night-time standby consumption — negligible parasitic draw',
    ],
    useCases: [
      'Residential rooftop with shading or mixed orientations',
      'Villas and independent homes',
      'DISCOM net metering applications requiring BIS certification',
      'Phased solar expansion — add panels one at a time',
      'Small commercial rooftop < 10 kW',
      'Replacement of failed string inverter with panel-level retrofit',
    ],
    gstRate: 12,
    sellingPrice: 7200,
    seoTitle: 'TSUN GEN3 MX900 Micro Inverter 900W India | BIS Certified | Techedge',
    seoDescription: 'TSUN GEN3 MX900 900W micro inverter — 96.7% efficiency, IP67, BIS India certified, built-in WiFi+Bluetooth+RS485, 15-year warranty. 2 PV inputs, per-panel MPPT. Supply by Techedge Bengaluru.',
  },
  {
    id: 503,
    slug: 'tsun-gen3-mx1000-micro-inverter',
    name: 'TSUN GEN3 MX1000 Micro Inverter',
    model: 'MX1000',
    series: 'GEN3',
    powerW: 1000,
    pvInputs: 2,
    mpptsCount: 2,
    mpptVoltageRange: '16–60 V',
    maxInputVoltage: 60,
    startupVoltage: 22,
    maxInputCurrentPerInput: 18,
    recommendedModulePower: '300–600+ W',
    maxOutputCurrent: 5,
    acVoltage: '220/230/240 V',
    acFrequency: '50/60 Hz',
    powerFactor: '>0.99',
    thd: '<3%',
    peakEfficiency: 96.7,
    euEfficiency: 96.5,
    mpptEfficiency: 99.9,
    ipRating: 'IP67',
    communication: 'WiFi + Bluetooth + RS485×2',
    dimensions: '261 × 228 × 32 mm',
    weight: 2.8,
    operatingTemp: '-40°C to +65°C',
    warranty: '15 years',
    certifications: ['CE', 'BIS (India)', 'VDE', 'ETL/Intertek', 'NEC 2020', 'ISO 9001', 'ISO 14001'],
    features: [
      'Built-in WiFi + Bluetooth — no separate gateway required, direct app monitoring',
      'RS485×2 communication — first in class for micro inverters, enables professional monitoring integration',
      'BIS India certified — compliant with Indian grid standards for DISCOM net metering approval',
      'Per-panel MPPT (2 independent channels) — zero shading loss between panels',
      'IP67 fully sealed — rated for Indian monsoon, dust, and humidity',
      'Trunk cable T-connector AC bus — clean daisy-chain wiring across rooftop, no long individual runs',
      '99.9% MPPT efficiency — extracts the maximum possible power from each panel at all times',
      'Natural convection cooling — no fans, no moving parts, silent operation',
      'Plug and play installation — AC cable 0.5m with T connector included',
      '<50 mW night-time standby consumption — negligible parasitic draw',
    ],
    useCases: [
      'Residential rooftop with shading or mixed orientations',
      'Villas and independent homes',
      'DISCOM net metering applications requiring BIS certification',
      'Phased solar expansion — add panels one at a time',
      'Small commercial rooftop < 10 kW',
      'Replacement of failed string inverter with panel-level retrofit',
    ],
    gstRate: 12,
    sellingPrice: 7800,
    seoTitle: 'TSUN GEN3 MX1000 Micro Inverter 1000W India | BIS Certified | Techedge',
    seoDescription: 'TSUN GEN3 MX1000 1000W micro inverter — 96.7% efficiency, IP67, BIS India certified, built-in WiFi+Bluetooth+RS485, 15-year warranty. 2 PV inputs, per-panel MPPT. Flagship GEN3 model. Supply by Techedge Bengaluru.',
  },
];
