// Lithium Valley LiFePO4 Battery Modules — Supply Partner
// BIS Certified | HSN 85076000 | GST: 12%

export interface LithiumValleyProduct {
  id: string;
  slug: string;
  name: string;
  model: string;
  series: 'Residential' | 'C&I';
  capacityKWh: number;       // per module
  maxCapacityKWh: number;    // fully stacked
  nominalVoltage: number;    // V per module
  capacityAh: number;
  maxStackLayers: number;
  maxChargeCurrent: number;  // A
  maxDischargeCurrent: number; // A
  cycleLife: number;         // cycles @ 80% DoD
  dod: number;               // %
  ipRating: string;
  chemistry: 'LiFePO4';
  certifications: string[];
  warranty: string;
  formFactor: string;
  features: string[];
}

export const lithiumValleyProducts: LithiumValleyProduct[] = [
  {
    id: 'lv-h256',
    slug: 'lithium-valley-2-56kwh',
    name: 'Lithium Valley LV-BST-H2.56',
    model: 'LV-BST-H2.56Ba',
    series: 'Residential',
    capacityKWh: 2.56,
    maxCapacityKWh: 25.6,
    nominalVoltage: 51.2,
    capacityAh: 50,
    maxStackLayers: 10,
    maxChargeCurrent: 100,
    maxDischargeCurrent: 100,
    cycleLife: 6000,
    dod: 80,
    ipRating: 'IP65',
    chemistry: 'LiFePO4',
    certifications: ['BIS (India)', 'IEC 62619', 'UN38.3', 'CE', 'CB', 'UL 1973', 'UL 9540A'],
    warranty: '10 years',
    formFactor: 'Stackable wall/floor mount',
    features: [
      'Stack 1–10 modules (2.56–25.6 kWh)',
      'BIS India certified — R-41147222',
      'Built-in BMS with cell balancing',
      'Compatible with major hybrid inverters',
      'No maintenance — sealed LiFePO4',
      '6000 cycles @ 80% DoD — 16+ year calendar life',
    ],
  },
  {
    id: 'lv-h512',
    slug: 'lithium-valley-5-12kwh',
    name: 'Lithium Valley LV-BST-H5.12',
    model: 'LV-BST-H5.12Aa',
    series: 'Residential',
    capacityKWh: 5.12,
    maxCapacityKWh: 30.72,
    nominalVoltage: 51.2,
    capacityAh: 100,
    maxStackLayers: 6,
    maxChargeCurrent: 100,
    maxDischargeCurrent: 100,
    cycleLife: 6000,
    dod: 80,
    ipRating: 'IP65',
    chemistry: 'LiFePO4',
    certifications: ['BIS (India)', 'IEC 62619', 'UN38.3', 'CE', 'CB', 'UL 1973', 'UL 9540A'],
    warranty: '10 years',
    formFactor: 'Stackable wall/floor mount',
    features: [
      'Stack 1–6 modules (5.12–30.72 kWh)',
      'BIS India certified — R-41147222',
      'Built-in BMS with cell balancing',
      'Compatible with major hybrid inverters',
      'No maintenance — sealed LiFePO4',
      '6000 cycles @ 80% DoD — 16+ year calendar life',
    ],
  },
  {
    id: 'lv-iess-60',
    slug: 'lithium-valley-indoor-bess-60kwh',
    name: 'Lithium Valley Indoor BESS 60 kWh',
    model: 'LV-IESS-Hx_RH5.12x',
    series: 'C&I',
    capacityKWh: 60,
    maxCapacityKWh: 60,
    nominalVoltage: 614.4,
    capacityAh: 100,
    maxStackLayers: 1,
    maxChargeCurrent: 100,
    maxDischargeCurrent: 100,
    cycleLife: 6000,
    dod: 80,
    ipRating: 'IP55',
    chemistry: 'LiFePO4',
    certifications: ['IEC 62619', 'UN38.3', 'CE', 'CB'],
    warranty: '10 years',
    formFactor: 'Cabinet / Rack',
    features: [
      '60 kWh all-in-one cabinet system',
      'Indoor safe — no ventilation required',
      'High voltage (614V) for commercial inverters',
      'Integrated BMS and thermal management',
      '6000 cycles @ 80% DoD',
    ],
  },
  {
    id: 'lv-si153',
    slug: 'lithium-valley-ci-bess-153kwh',
    name: 'Lithium Valley C&I BESS 153 kWh',
    model: 'SI153A',
    series: 'C&I',
    capacityKWh: 153,
    maxCapacityKWh: 153,
    nominalVoltage: 768,
    capacityAh: 200,
    maxStackLayers: 1,
    maxChargeCurrent: 200,
    maxDischargeCurrent: 200,
    cycleLife: 6000,
    dod: 80,
    ipRating: 'IP55',
    chemistry: 'LiFePO4',
    certifications: ['IEC 62619', 'UN38.3', 'CE', 'CB'],
    warranty: '10 years',
    formFactor: 'Cabinet / Rack',
    features: [
      '153 kWh C&I energy storage system',
      'Container or indoor cabinet format',
      'Integrated fire suppression ready',
      'CAN / RS485 / Modbus communication',
      '6000 cycles @ 80% DoD',
    ],
  },
  {
    id: 'lv-si215',
    slug: 'lithium-valley-ci-bess-215kwh',
    name: 'Lithium Valley C&I BESS 215 kWh',
    model: 'SI215A',
    series: 'C&I',
    capacityKWh: 215,
    maxCapacityKWh: 215,
    nominalVoltage: 768,
    capacityAh: 280,
    maxStackLayers: 1,
    maxChargeCurrent: 280,
    maxDischargeCurrent: 280,
    cycleLife: 6000,
    dod: 80,
    ipRating: 'IP55',
    chemistry: 'LiFePO4',
    certifications: ['IEC 62619', 'UN38.3', 'CE', 'CB'],
    warranty: '10 years',
    formFactor: 'Cabinet / Rack',
    features: [
      '215 kWh C&I energy storage system',
      'Container or indoor cabinet format',
      'Integrated fire suppression ready',
      'CAN / RS485 / Modbus communication',
      '6000 cycles @ 80% DoD',
    ],
  },
];

export const lvResidential = lithiumValleyProducts.filter(p => p.series === 'Residential');
export const lvCommercial  = lithiumValleyProducts.filter(p => p.series === 'C&I');
