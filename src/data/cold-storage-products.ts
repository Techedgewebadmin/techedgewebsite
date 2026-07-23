// Techedge Smart Solar Hybrid Cold Storage — Portable, Outdoor, Modular
// Solar + LiFePO4 battery hybrid cold room. Supply & installation by Techedge SPE India Pvt. Ltd.
// GST: 70:30 composite supply split — 5% on goods (HSN 8541), 18% on installation services (SAC 9983)

export interface ColdStorageProduct {
  id: string;
  slug: string;
  name: string;
  capacityMT: number;
  totalPriceInclGst: number;
  goodsValue: number;      // 70% deemed value, 5% GST
  servicesValue: number;   // 30% deemed value, 18% GST
  compressorTR: number;
  solarKWp: number;
  inverterKW: number;
  inverterPhase: 'Single Phase' | 'Three Phase';
  batteryKWh: number;
  batteryModules: string;
  tempRange: string;
  panelInsulation: string;
  warranty: string;
  deliveryWeeks: string;
  installationDays: string;
  scopeOfSupply: string[];
  exclusions: string[];
  features: string[];
  useCases: string[];
  seoTitle: string;
  seoDescription: string;
}

export const coldStorageProducts: ColdStorageProduct[] = [
  {
    id: 'cs-5mt',
    slug: 'smart-solar-cold-storage-5mt',
    name: 'Techedge Smart Solar Cold Storage — 5MT',
    capacityMT: 5,
    totalPriceInclGst: 1306800,
    goodsValue: 840000,
    servicesValue: 360000,
    compressorTR: 1.5,
    solarKWp: 7,
    inverterKW: 5,
    inverterPhase: 'Single Phase',
    batteryKWh: 20.4,
    batteryModules: '4 × 5.1 kWh LiFePO₄',
    tempRange: '+2°C to +15°C (adjustable)',
    panelInsulation: '100mm PUF insulated wall, roof and floor panels',
    warranty: '1-year comprehensive system warranty, component-wise OEM warranty applicable',
    deliveryWeeks: '4–6 weeks from PO + advance',
    installationDays: '7–10 working days from material delivery',
    scopeOfSupply: [
      '5 MT modular cold room — 100mm PUF insulated wall, roof and floor panels',
      'Insulated cold room door with safety lock and internal emergency release',
      '1.5 TR high-efficiency refrigeration — inverter duty scroll compressor, air-cooled condensing unit, ceiling-mounted evaporator, VFD, digital controller',
      '7 kWp N-Type TOPCon solar PV with hot-dip galvanised (HDG) module mounting structure',
      '5 kW hybrid inverter',
      '20.4 kWh LiFePO₄ battery bank (4 × 5.1 kWh) with integrated BMS',
      'AC & DC distribution boards, DC combiner box, surge protection, earthing and lightning protection',
      'Complete electrical wiring, cabling, interconnections and terminations',
      'Internal LED lighting and PVC strip curtains',
      'IoT-based remote monitoring — temperature, solar generation and battery status via mobile app',
      'Complete installation, testing, commissioning, performance testing and user training',
    ],
    exclusions: [
      'Civil works — foundation, PCC, RCC, flooring, ramps, drainage',
      'Grid connectivity, net metering and DISCOM approvals',
      'DG set, fuel and DG synchronisation system',
      'Internet/Wi-Fi connectivity for IoT monitoring',
      'Building, shed, roofing or any permanent structure',
      'Consumables, refrigerant top-up and preventive maintenance after warranty',
    ],
    features: [
      'Fully portable and modular — deployable outdoors without a permanent building',
      'Runs on solar by day, LiFePO₄ battery by night — zero diesel dependency',
      'Automatic solar / battery / grid switching — compressor never stops',
      'IoT remote monitoring — check temperature and battery status from your phone',
      'LiFePO₄ chemistry — 6,000 cycle life, safe for outdoor Indian climate (up to 45°C)',
      '100mm PUF insulation on all panels — minimises compressor load and energy use',
    ],
    useCases: [
      'FPO / FPC farm-gate produce storage',
      'SHG and cooperative cold chain aggregation points',
      'Fruit, vegetable and flower storage — 7–14 day hold',
      'Off-grid and weak-grid rural sites',
      'Farmer markets and last-mile distribution hubs',
      'Dairy and milk chilling collection centres',
    ],
    seoTitle: 'Smart Solar Cold Storage 5MT — Portable Outdoor Hybrid Cold Room | Techedge',
    seoDescription: 'Techedge 5MT smart solar hybrid cold storage — portable, outdoor-ready modular cold room with 7kWp solar, 20.4kWh LiFePO4 battery and IoT monitoring. For FPOs, farmers and SHGs across India.',
  },
  {
    id: 'cs-10mt',
    slug: 'smart-solar-cold-storage-10mt',
    name: 'Techedge Smart Solar Cold Storage — 10MT',
    capacityMT: 10,
    totalPriceInclGst: 2395800,
    goodsValue: 1540000,
    servicesValue: 660000,
    compressorTR: 3,
    solarKWp: 15,
    inverterKW: 12,
    inverterPhase: 'Three Phase',
    batteryKWh: 40.8,
    batteryModules: '8 × 5.1 kWh LiFePO₄',
    tempRange: '+4°C to +15°C (adjustable)',
    panelInsulation: '100mm PUF insulated wall, roof and floor panels',
    warranty: '1-year comprehensive system warranty, component-wise OEM warranty applicable',
    deliveryWeeks: '4–6 weeks from PO + advance',
    installationDays: '7–10 working days from material delivery',
    scopeOfSupply: [
      '10 MT modular cold room — 100mm PUF insulated wall, roof and floor panels',
      'Insulated cold room door with safety lock and internal emergency release',
      '3 TR high-efficiency refrigeration — inverter duty scroll compressor, air-cooled condensing unit, ceiling-mounted evaporator, VFD, digital controller',
      '15 kWp N-Type TOPCon solar PV with hot-dip galvanised (HDG) module mounting structure',
      '12 kW three-phase hybrid inverter',
      '40.8 kWh LiFePO₄ battery bank (8 × 5.1 kWh) with integrated BMS',
      'AC & DC distribution boards, DC combiner box, surge protection, earthing and lightning protection',
      'Complete electrical wiring, cabling, interconnections and terminations',
      'Internal LED lighting and PVC strip curtains',
      'IoT-based remote monitoring — temperature, solar generation and battery status via mobile app',
      'Complete installation, testing, commissioning, performance testing and user training',
    ],
    exclusions: [
      'Civil works — foundation, PCC, RCC, flooring, ramps, drainage',
      'Grid connectivity, net metering and DISCOM approvals',
      'DG set, fuel and DG synchronisation system',
      'Internet/Wi-Fi connectivity for IoT monitoring',
      'Building, shed, roofing or any permanent structure',
      'Consumables, refrigerant top-up and preventive maintenance after warranty',
    ],
    features: [
      'Fully portable and modular — deployable outdoors without a permanent building',
      'Three-phase hybrid system — sized for larger FPC / cooperative aggregation volumes',
      'Runs on solar by day, LiFePO₄ battery by night — zero diesel dependency',
      'Automatic solar / battery / grid switching — compressor never stops',
      'IoT remote monitoring — check temperature and battery status from your phone',
      'LiFePO₄ chemistry — 6,000 cycle life, safe for outdoor Indian climate (up to 45°C)',
    ],
    useCases: [
      'Larger FPO / FPC and cooperative cold chain hubs',
      'Multi-village produce aggregation centres',
      'Fruit, vegetable and flower storage at scale — 7–14 day hold',
      'Off-grid and weak-grid rural sites with higher throughput',
      'District-level agri-processing and packhouse storage',
      'Dairy cooperative bulk milk chilling',
    ],
    seoTitle: 'Smart Solar Cold Storage 10MT — Portable Outdoor Hybrid Cold Room | Techedge',
    seoDescription: 'Techedge 10MT smart solar hybrid cold storage — portable, outdoor-ready modular cold room with 15kWp solar, 40.8kWh LiFePO4 battery and IoT monitoring. For larger FPOs and cooperatives across India.',
  },
];
