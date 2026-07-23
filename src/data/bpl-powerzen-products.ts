// BPL PowerZen AIO — All-in-One Hybrid Inverter + LFP Battery — Supply Partner
// Battery: Li-Ion (LiFePO4) integrated | Warranty up to 10 years

export interface BplPowerzenProduct {
  id: string;
  slug: string;
  name: string;
  series: 'AIO Premium';
  type: 'aio-hybrid-1ph';
  powerKW: number;          // rated output power
  surgeKW: number;          // max AC output power (short duration)
  phases: 1;
  batteryKWh: number;
  batteryVoltage: number;   // V
  batteryAh: number;
  cycleLife: number;
  dod: number;              // % depth of discharge
  maxEfficiency: number;    // %
  mpptVoltageRange: string;
  maxPvInputW: number;
  acVoltage: string;
  ipRating: string;
  warranty: string;
  certifications: string[];
  features: string[];
}

export const bplPowerzenProducts: BplPowerzenProduct[] = [
  {
    id: 'bpl-aio-premium-6-5k',
    slug: 'bpl-powerzen-aio-premium-6-5kva-5kwh',
    name: 'BPL PowerZen AIO Premium 6.5KVA/5kWh',
    series: 'AIO Premium',
    type: 'aio-hybrid-1ph',
    powerKW: 5,
    surgeKW: 10,
    phases: 1,
    batteryKWh: 5,
    batteryVoltage: 51.2,
    batteryAh: 100,
    cycleLife: 6000,
    dod: 90,
    maxEfficiency: 93,
    mpptVoltageRange: '90–435 V',
    maxPvInputW: 6500,
    acVoltage: '230 V, 1-phase',
    ipRating: 'IP 20',
    warranty: 'Up to 10 years',
    certifications: ['BIS IS 16169', 'IS 16221 (Part 2)', 'IEC 62109', 'CE-EMC (EN55032, EN55024)', 'CE-LVD EN60950'],
    features: [
      'All-in-one: inverter, controller and LFP battery in a single tower',
      'Cell-level battery monitoring with over/under voltage, current and temperature protection',
      'RS-485, Modbus and CAN battery communication',
      '< 20 ms backup switch time',
      'Night self-consumption mode',
      '6,000 cycle life at 90% DoD',
    ],
  },
];
