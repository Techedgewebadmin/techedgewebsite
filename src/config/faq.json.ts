export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "What types of solar systems does Techedge install?",
    answer:
      "We install on-grid, off-grid, and hybrid solar systems for residential, commercial, industrial, and agricultural applications. We also specialise in solar-hybrid cold storage systems where uninterrupted power is critical. System type is recommended based on your load profile, grid availability, and specific requirements.",
  },
  {
    question: "What is included in Techedge's EPC service?",
    answer:
      "EPC means we handle everything — Engineering (site survey, load analysis, system design, DPR preparation), Procurement (Tier-1 panels, inverters, MMS, cables, protection equipment), and Construction (installation, commissioning, grid interconnection, documentation handover). You get a single accountable partner from concept to commissioning.",
  },
  {
    question: "How much can I save with solar?",
    answer:
      "Savings depend on your system size, tariff, and consumption pattern. As a benchmark: a 30 kWp commercial system generates approximately 130 units/day and saves ₹25,000–₹35,000/month at ₹7–₹8/unit. A 150 kWp industrial system can save ₹16–₹18 lakhs/year. We provide site-specific savings projections as part of our free site survey.",
  },
  {
    question: "What is the payback period for a solar investment?",
    answer:
      "For most commercial and industrial systems, payback is between 3 and 5 years. Projects with DG replacement (hybrid systems) often achieve payback in under 3 years due to combined savings from both grid and diesel. After payback, the system generates pure savings for the remaining 20+ years of its life.",
  },
  {
    question: "Do you help with subsidies and financing?",
    answer:
      "Yes. We assist with MNRE/DISCOM subsidy applications, PM Surya Ghar scheme documentation, and AIF (Agriculture Infrastructure Fund) interest subvention for eligible agri-infrastructure projects. We also prepare DPRs for bank financing and can connect you with lending partners including SBI, IREDA, SIDBI, and Tata Capital.",
  },
  {
    question: "What happens during a free site survey?",
    answer:
      "Our engineer visits your site, assesses the rooftop or land area, reviews your electricity bills, evaluates structural suitability, checks shadow-free zones, and documents grid connection points. Within a few days you receive a proposal with exact system size, generation estimate, investment, savings projection, and payback calculation — at no cost.",
  },
  {
    question: "Do you provide Operations & Maintenance after installation?",
    answer:
      "Yes. Techedge offers scheduled O&M packages including panel cleaning, inverter health checks, performance monitoring, fault diagnosis, and annual structural inspections. A maintained system holds above 90% output for 25 years. An unmaintained one can lose 15–20% within 5 years. We recommend O&M for all commercial and industrial installations.",
  },
  {
    question: "How long does installation take?",
    answer:
      "A typical 10–30 kWp rooftop installation is completed in 3–5 days after materials arrive on-site. Larger commercial and industrial systems (100–500 kWp) take 2–6 weeks depending on scope. Timeline includes MMS installation, panel mounting, electrical works, and commissioning. Net metering application is filed in parallel.",
  },
  {
    question: "Which brands and equipment do you use?",
    answer:
      "We use Tier-1 solar panels (Goldi Solar, Waaree, Adani Solar), hybrid inverters (Deye, SolarEdge, Sungrow), and high-voltage lithium battery storage (Deye HV). All equipment carries manufacturer warranties and is selected to match project requirements. We do not compromise on equipment quality.",
  },
  {
    question: "Can solar work for my cold storage or agricultural facility?",
    answer:
      "Yes — and it works particularly well. Cold storages have high, predictable daytime loads that align with solar generation, delivering high utilisation and fast payback. For facilities that cannot afford power cuts, we design hybrid systems with battery backup to maintain continuous compressor operation. We have successfully delivered solar hybrid cold storage installations in Karnataka.",
  },
];
