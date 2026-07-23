// Vsole Hybrid & On-Grid Inverters — Supply Partner
// HSN 85044090 | GST: 12%

export interface VsoleProduct {
  id: string;
  slug: string;
  name: string;
  series: 'LV-1ph' | 'LV-3ph' | 'HV-3ph' | 'OG-1ph' | 'OG-3ph';
  type: 'hybrid' | 'ongrid';
  powerKW: number;
  phases: 1 | 3;
  batteryVoltage?: string;
  maxEfficiency: number;
  mpptCount: number;
  maxPvVoltage: number;
  maxChargeCurrentA?: number;
  acVoltage: string;
  ipRating: string;
  warranty: string;
}

export const vsoleProducts: VsoleProduct[] = [
  // LV Single Phase Hybrid (48V battery)
  { id: 'vs-lv1-3k', slug: 'vsole-lv1ph-3kw',  name: 'Vsole LV 3kW 1Ph',  series: 'LV-1ph', type: 'hybrid', powerKW: 3,  phases: 1, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 500,  maxChargeCurrentA: 80,  acVoltage: '220/230 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-lv1-5k', slug: 'vsole-lv1ph-5kw',  name: 'Vsole LV 5kW 1Ph',  series: 'LV-1ph', type: 'hybrid', powerKW: 5,  phases: 1, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 500,  maxChargeCurrentA: 120, acVoltage: '220/230 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-lv1-6k', slug: 'vsole-lv1ph-6kw',  name: 'Vsole LV 6kW 1Ph',  series: 'LV-1ph', type: 'hybrid', powerKW: 6,  phases: 1, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 500,  maxChargeCurrentA: 120, acVoltage: '220/230 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-lv1-8k', slug: 'vsole-lv1ph-8kw',  name: 'Vsole LV 8kW 1Ph',  series: 'LV-1ph', type: 'hybrid', powerKW: 8,  phases: 1, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 500,  maxChargeCurrentA: 120, acVoltage: '220/230 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-lv1-10k', slug: 'vsole-lv1ph-10kw', name: 'Vsole LV 10kW 1Ph', series: 'LV-1ph', type: 'hybrid', powerKW: 10, phases: 1, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 500,  maxChargeCurrentA: 160, acVoltage: '220/230 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-lv1-15k', slug: 'vsole-lv1ph-15kw', name: 'Vsole LV 15kW 1Ph', series: 'LV-1ph', type: 'hybrid', powerKW: 15, phases: 1, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 500,  maxChargeCurrentA: 160, acVoltage: '220/230 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-lv1-20k', slug: 'vsole-lv1ph-20kw', name: 'Vsole LV 20kW 1Ph', series: 'LV-1ph', type: 'hybrid', powerKW: 20, phases: 1, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 500,  maxChargeCurrentA: 200, acVoltage: '220/230 V', ipRating: 'IP65', warranty: '5 years' },
  // LV Three Phase Hybrid (48V battery)
  { id: 'vs-lv3-5k', slug: 'vsole-lv3ph-5kw',  name: 'Vsole LV 5kW 3Ph',  series: 'LV-3ph', type: 'hybrid', powerKW: 5,  phases: 3, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 600,  maxChargeCurrentA: 80,  acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-lv3-6k', slug: 'vsole-lv3ph-6kw',  name: 'Vsole LV 6kW 3Ph',  series: 'LV-3ph', type: 'hybrid', powerKW: 6,  phases: 3, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 600,  maxChargeCurrentA: 80,  acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-lv3-8k', slug: 'vsole-lv3ph-8kw',  name: 'Vsole LV 8kW 3Ph',  series: 'LV-3ph', type: 'hybrid', powerKW: 8,  phases: 3, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 600,  maxChargeCurrentA: 100, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-lv3-10k', slug: 'vsole-lv3ph-10kw', name: 'Vsole LV 10kW 3Ph', series: 'LV-3ph', type: 'hybrid', powerKW: 10, phases: 3, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 600,  maxChargeCurrentA: 210, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-lv3-12k', slug: 'vsole-lv3ph-12kw', name: 'Vsole LV 12kW 3Ph', series: 'LV-3ph', type: 'hybrid', powerKW: 12, phases: 3, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 600,  maxChargeCurrentA: 210, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-lv3-15k', slug: 'vsole-lv3ph-15kw', name: 'Vsole LV 15kW 3Ph', series: 'LV-3ph', type: 'hybrid', powerKW: 15, phases: 3, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 600,  maxChargeCurrentA: 210, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-lv3-20k', slug: 'vsole-lv3ph-20kw', name: 'Vsole LV 20kW 3Ph', series: 'LV-3ph', type: 'hybrid', powerKW: 20, phases: 3, batteryVoltage: '48 V', maxEfficiency: 97.6, mpptCount: 2, maxPvVoltage: 600,  maxChargeCurrentA: 210, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  // HV Three Phase Hybrid (HV battery)
  { id: 'vs-hv3-15k', slug: 'vsole-hv3ph-15kw', name: 'Vsole HV 15kW 3Ph', series: 'HV-3ph', type: 'hybrid', powerKW: 15,  phases: 3, batteryVoltage: 'HV', maxEfficiency: 98.0, mpptCount: 2, maxPvVoltage: 1000, maxChargeCurrentA: 40, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-hv3-20k', slug: 'vsole-hv3ph-20kw', name: 'Vsole HV 20kW 3Ph', series: 'HV-3ph', type: 'hybrid', powerKW: 20,  phases: 3, batteryVoltage: 'HV', maxEfficiency: 98.0, mpptCount: 2, maxPvVoltage: 1000, maxChargeCurrentA: 40, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-hv3-25k', slug: 'vsole-hv3ph-25kw', name: 'Vsole HV 25kW 3Ph', series: 'HV-3ph', type: 'hybrid', powerKW: 25,  phases: 3, batteryVoltage: 'HV', maxEfficiency: 98.0, mpptCount: 2, maxPvVoltage: 1000, maxChargeCurrentA: 50, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-hv3-30k', slug: 'vsole-hv3ph-30kw', name: 'Vsole HV 30kW 3Ph', series: 'HV-3ph', type: 'hybrid', powerKW: 30,  phases: 3, batteryVoltage: 'HV', maxEfficiency: 98.0, mpptCount: 2, maxPvVoltage: 1000, maxChargeCurrentA: 50, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-hv3-40k', slug: 'vsole-hv3ph-40kw', name: 'Vsole HV 40kW 3Ph', series: 'HV-3ph', type: 'hybrid', powerKW: 40,  phases: 3, batteryVoltage: 'HV', maxEfficiency: 98.0, mpptCount: 3, maxPvVoltage: 1100, maxChargeCurrentA: 60, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-hv3-50k', slug: 'vsole-hv3ph-50kw', name: 'Vsole HV 50kW 3Ph', series: 'HV-3ph', type: 'hybrid', powerKW: 50,  phases: 3, batteryVoltage: 'HV', maxEfficiency: 98.0, mpptCount: 3, maxPvVoltage: 1100, maxChargeCurrentA: 60, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-hv3-60k', slug: 'vsole-hv3ph-60kw', name: 'Vsole HV 60kW 3Ph', series: 'HV-3ph', type: 'hybrid', powerKW: 60,  phases: 3, batteryVoltage: 'HV', maxEfficiency: 98.0, mpptCount: 3, maxPvVoltage: 1100, maxChargeCurrentA: 60, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-hv3-75k', slug: 'vsole-hv3ph-75kw', name: 'Vsole HV 75kW 3Ph', series: 'HV-3ph', type: 'hybrid', powerKW: 75,  phases: 3, batteryVoltage: 'HV', maxEfficiency: 98.0, mpptCount: 4, maxPvVoltage: 1100, maxChargeCurrentA: 75, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-hv3-80k', slug: 'vsole-hv3ph-80kw', name: 'Vsole HV 80kW 3Ph', series: 'HV-3ph', type: 'hybrid', powerKW: 80,  phases: 3, batteryVoltage: 'HV', maxEfficiency: 98.0, mpptCount: 4, maxPvVoltage: 1100, maxChargeCurrentA: 75, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  // On-Grid Single Phase
  { id: 'vs-og1-3k', slug: 'vsole-og1ph-3kw',  name: 'Vsole On-Grid 3kW 1Ph',  series: 'OG-1ph', type: 'ongrid', powerKW: 3,  phases: 1, maxEfficiency: 97.5, mpptCount: 1, maxPvVoltage: 550,  acVoltage: '220/230 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-og1-6k', slug: 'vsole-og1ph-6kw',  name: 'Vsole On-Grid 6kW 1Ph',  series: 'OG-1ph', type: 'ongrid', powerKW: 6,  phases: 1, maxEfficiency: 97.5, mpptCount: 2, maxPvVoltage: 550,  acVoltage: '220/230 V', ipRating: 'IP65', warranty: '5 years' },
  // On-Grid Three Phase (selected representative models)
  { id: 'vs-og3-12k', slug: 'vsole-og3ph-12kw',  name: 'Vsole On-Grid 12kW 3Ph',  series: 'OG-3ph', type: 'ongrid', powerKW: 12,  phases: 3, maxEfficiency: 98.5, mpptCount: 2, maxPvVoltage: 1000, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-og3-30k', slug: 'vsole-og3ph-30kw',  name: 'Vsole On-Grid 30kW 3Ph',  series: 'OG-3ph', type: 'ongrid', powerKW: 30,  phases: 3, maxEfficiency: 98.5, mpptCount: 3, maxPvVoltage: 1000, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-og3-50k', slug: 'vsole-og3ph-50kw',  name: 'Vsole On-Grid 50kW 3Ph',  series: 'OG-3ph', type: 'ongrid', powerKW: 50,  phases: 3, maxEfficiency: 98.5, mpptCount: 3, maxPvVoltage: 1000, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-og3-100k', slug: 'vsole-og3ph-100kw', name: 'Vsole On-Grid 100kW 3Ph', series: 'OG-3ph', type: 'ongrid', powerKW: 100, phases: 3, maxEfficiency: 98.8, mpptCount: 4, maxPvVoltage: 1100, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
  { id: 'vs-og3-350k', slug: 'vsole-og3ph-350kw', name: 'Vsole On-Grid 350kW 3Ph', series: 'OG-3ph', type: 'ongrid', powerKW: 350, phases: 3, maxEfficiency: 98.8, mpptCount: 6, maxPvVoltage: 1100, acVoltage: '220/380 V', ipRating: 'IP65', warranty: '5 years' },
];

export const vsoleHybrid = vsoleProducts.filter(p => p.type === 'hybrid');
export const vsoleOngrid  = vsoleProducts.filter(p => p.type === 'ongrid');
export const vsoleLV1ph   = vsoleProducts.filter(p => p.series === 'LV-1ph');
export const vsoleLV3ph   = vsoleProducts.filter(p => p.series === 'LV-3ph');
export const vsoleHV3ph   = vsoleProducts.filter(p => p.series === 'HV-3ph');
