// Adani Solar DCR Modules — Supply Partner
// DCR (Domestic Content Requirement) compliant, MNRE approved | HSN 85414011 | GST: 5%

export interface AdaniProduct {
  id: string;
  name: string;
  model: string;
  powerWp: number;
  dcrCompliant: boolean;
  mnreApproved: boolean;
  availability: string;
  certifications: string[];
  features: string[];
  useCases: string[];
}

export const adaniProducts: AdaniProduct[] = [
  {
    id: 'adani-545-dcr',
    name: 'Adani Solar DCR 545Wp',
    model: 'Adani DCR-545',
    powerWp: 545,
    dcrCompliant: true,
    mnreApproved: true,
    availability: 'Ready stock',
    certifications: ['DCR Compliant', 'MNRE Approved', 'Adani Solar Quality Assurance'],
    features: [
      '545Wp high power output for maximum energy generation per panel',
      'DCR (Domestic Content Requirement) compliant — eligible for government and subsidy-linked projects requiring DCR modules',
      'MNRE approved — meets Ministry of New and Renewable Energy standards',
      'Engineered for long-term durability in Indian climate conditions',
      'Backed by Adani Solar\'s global manufacturing standards and performance warranty',
      'Ready stock available — fast turnaround for EPC and bulk orders',
    ],
    useCases: [
      'DCR-mandated government and PM Surya Ghar subsidy projects',
      'DISCOM net-metered residential and commercial rooftops',
      'CPSU and public sector tenders requiring DCR modules',
      'EPC projects needing fast-turnaround, in-stock supply',
    ],
  },
];
