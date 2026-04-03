export type Partner = {
  name: string;
  url: string;
  logo?: string;
  tagline: string;
  role: string;
  about: string;
  offerings: { title: string; items: string[] }[];
};

export type Solution = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  tagline: string;
  description: string;
  color: { bg: string; text: string; border: string };
  highlights: { label: string; value: string }[];
  benefits: string[];
  useCases: string[];
  howItWorks: { step: string; desc: string }[];
  partner?: Partner;
};

export const solutions: Solution[] = [
  {
    slug: "on-grid-solar",
    title: "ON-GRID Solar",
    shortTitle: "ON-GRID",
    icon: "☀️",
    tagline: "Grid-tied solar for maximum savings",
    description:
      "On-grid (grid-tied) solar systems connect directly to the utility grid. Excess energy you generate is exported back to the grid, earning you credits through net metering — making this the most cost-effective solar solution for homes and businesses with a reliable grid supply.",
    color: { bg: "#fefce8", text: "#a16207", border: "#fde047" },
    highlights: [
      { label: "System Type", value: "Grid-Tied" },
      { label: "Battery", value: "Not Required" },
      { label: "Best ROI", value: "3–5 Years" },
      { label: "Ideal For", value: "Homes & Offices" },
    ],
    benefits: [
      "Lowest upfront cost — no battery required",
      "Net metering credits for exported power",
      "Reduce electricity bills by 60–90%",
      "Zero maintenance battery concerns",
      "Approved under PM Surya Ghar & DISCOM net metering policies",
      "Scalable from 1 kW to MW-scale commercial",
    ],
    useCases: [
      "Residential homes with reliable grid",
      "Commercial offices and IT parks",
      "Industrial rooftops",
      "Educational institutions",
      "Hospitals and healthcare facilities",
    ],
    howItWorks: [
      { step: "Solar panels generate DC power", desc: "Photovoltaic panels convert sunlight into direct current (DC) electricity." },
      { step: "Inverter converts DC to AC", desc: "A grid-tied inverter converts DC to AC power compatible with your appliances and the grid." },
      { step: "Power your premises first", desc: "Solar power is consumed on-site first, reducing your grid import." },
      { step: "Export surplus to grid", desc: "Excess generation is exported to the DISCOM grid and credited via net metering." },
    ],
  },
  {
    slug: "off-grid-solar",
    title: "OFF-GRID Solar",
    shortTitle: "OFF-GRID",
    icon: "🏕️",
    tagline: "Complete energy independence, anywhere",
    description:
      "Off-grid solar systems operate entirely independently of the utility grid. With battery storage at their core, these systems are ideal for remote locations, farms, and areas with unreliable or no grid connectivity — delivering uninterrupted power 24/7.",
    color: { bg: "#f0fdf4", text: "#15803d", border: "#86efac" },
    highlights: [
      { label: "System Type", value: "Standalone" },
      { label: "Battery", value: "Required" },
      { label: "Grid Required", value: "No" },
      { label: "Ideal For", value: "Remote & Rural" },
    ],
    benefits: [
      "100% energy independence from the grid",
      "Reliable power in remote or rural areas",
      "Eliminates electricity bills entirely",
      "Suitable for farms, resorts, and telecom towers",
      "Lithium or Lead-Acid battery options",
      "Generator backup integration available",
    ],
    useCases: [
      "Remote farms and agricultural pumping",
      "Rural homes with no grid access",
      "Telecom towers and remote infrastructure",
      "Eco-resorts and tourism facilities",
      "Border outposts and defence installations",
    ],
    howItWorks: [
      { step: "Solar panels generate DC power", desc: "Panels capture sunlight and generate DC electricity throughout the day." },
      { step: "Charge controller manages battery charging", desc: "A MPPT charge controller optimises charging and protects battery life." },
      { step: "Batteries store energy", desc: "Lithium or lead-acid battery banks store surplus solar energy for use at night or on cloudy days." },
      { step: "Inverter powers AC loads", desc: "An off-grid inverter converts stored DC power to AC for your appliances." },
    ],
  },
  {
    slug: "hybrid-solar",
    title: "Hybrid Solar",
    shortTitle: "HYBRID",
    icon: "⚡",
    tagline: "Solar + battery + grid — the smart choice",
    description:
      "Hybrid solar systems combine the best of both worlds: grid-tied solar with battery backup. You generate and store your own power, use the grid when needed, and export surplus energy. Smart energy management ensures you always have power — even during outages.",
    color: { bg: "#eff6ff", text: "#1d4ed8", border: "#93c5fd" },
    highlights: [
      { label: "System Type", value: "Grid + Battery" },
      { label: "Battery", value: "Required" },
      { label: "Backup", value: "Yes" },
      { label: "Ideal For", value: "Homes & Business" },
    ],
    benefits: [
      "Backup power during grid outages",
      "Time-of-use optimisation — charge when grid is cheap",
      "Self-consumption of solar with battery buffer",
      "Net metering benefit retained",
      "Smart load management via hybrid inverter",
      "Future-proof: EV charging ready",
    ],
    useCases: [
      "Homes and villas wanting outage protection",
      "Commercial buildings with critical loads",
      "Clinics and diagnostic centres",
      "Data centres and server rooms",
      "Retail and hospitality businesses",
    ],
    howItWorks: [
      { step: "Solar generates power", desc: "Panels generate DC electricity, which flows to the hybrid inverter." },
      { step: "Hybrid inverter manages energy flows", desc: "The inverter intelligently directs power: charge batteries, power loads, or export to grid." },
      { step: "Batteries buffer excess energy", desc: "Surplus solar charges the battery bank for use at night or during outages." },
      { step: "Grid as backup", desc: "Grid supplements when solar and battery are insufficient; excess is exported via net metering." },
    ],
  },
  {
    slug: "hybrid-solar-cold-storage",
    title: "Hybrid Solar Cold Storage",
    shortTitle: "COLD STORAGE",
    icon: "❄️",
    tagline: "Solar-powered cold chain — built with RINAC",
    description:
      "A complete cold chain energy solution combining RINAC's world-class cold storage infrastructure with Techedge's hybrid solar design. RINAC builds and installs the cold room — we power it sustainably. Together we deliver zero-downtime, energy-efficient cold storage for pharmaceuticals, horticulture, dairy, food processing, and more.",
    color: { bg: "#f0f9ff", text: "#0369a1", border: "#7dd3fc" },
    highlights: [
      { label: "System Type", value: "Hybrid + DG" },
      { label: "Cold Storage", value: "RINAC Built" },
      { label: "Load Priority", value: "Refrigeration" },
      { label: "Energy Savings", value: "60–80%" },
    ],
    benefits: [
      "Turnkey solution — RINAC builds the cold room, Techedge designs the solar",
      "Uninterrupted power for compressors with zero temperature excursions",
      "DG generator integration with Auto Transfer Switch (ATS)",
      "Priority load management — refrigeration always protected first",
      "60–80% reduction in diesel and electricity costs",
      "Compliant with FSSAI, NHB, and pharma cold chain standards",
      "Remote monitoring: temperature, humidity, and power from one dashboard",
      "Modular and scalable — from small walk-in chillers to large warehouses",
      "Suitable for PIR/RPUF insulated modular cold rooms (PreServa, LiteCold series)",
    ],
    useCases: [
      "Pharmaceutical cold storage (2°C–8°C)",
      "Vaccine distribution hubs",
      "Horticulture and flower cold chains",
      "Dairy and milk chilling centres",
      "Food processing and frozen storage (−18°C to −25°C)",
      "Fish and meat processing plants",
      "Seed banks and agriculture storage",
      "Hospital blood banks",
      "Ripening chambers for fruits",
      "CA/MA controlled atmosphere storage",
    ],
    howItWorks: [
      { step: "RINAC designs & builds the cold room", desc: "RINAC engineers specify and install the modular cold storage — panels, refrigeration systems, and controls." },
      { step: "Techedge designs the solar system", desc: "We size the hybrid solar + battery system around the compressor load profile and daily run hours." },
      { step: "Smart load controller prioritises cooling", desc: "Critical compressor loads always have power; non-critical loads are shed automatically during shortage." },
      { step: "DG auto-starts on grid failure", desc: "An Auto Transfer Switch (ATS) seamlessly engages the diesel generator when solar, battery, and grid are all unavailable." },
    ],
    partner: {
      name: "RINAC India Ltd.",
      url: "https://rinac.com",
      tagline: "Cooling with a Warm Touch",
      role: "Cold Storage Infrastructure Partner",
      about:
        "RINAC India Ltd. is a leading solution architect and builder in cold chain infrastructure and clean modular construction, with 30+ years of experience, 10,000+ projects, 14 branches across India, and presence in 23 countries. RINAC designs and installs the cold storage — Techedge powers it with solar.",
      offerings: [
        {
          title: "Cold Room Solutions",
          items: [
            "Modular cold rooms (PreServa, LiteCold, Sapphire series)",
            "Walk-in chillers and deep freezers",
            "Blast chillers and blast freezers",
            "Individual Quick Freezers (IQF)",
            "Ripening chambers",
            "High/Low RH chambers",
            "CA/MA controlled atmosphere storage",
          ],
        },
        {
          title: "Refrigeration & Equipment",
          items: [
            "Complete refrigeration systems",
            "Ice machines and ice bank tanks",
            "Refrigerated transport containers (ChillKart)",
            "Storage and racking systems",
          ],
        },
        {
          title: "Modular Construction",
          items: [
            "PIR/RPUF insulated sandwich panels",
            "InstaRoof, InstaCeil, InstaWall systems",
            "Prefabricated facilities",
            "Food processing facility EPC",
          ],
        },
        {
          title: "Industries Served",
          items: [
            "Pharmaceuticals and vaccines",
            "Agriculture and horticulture",
            "Dairy and ice cream",
            "Fish, meat and poultry",
            "Seed storage",
            "Food retail and processing",
          ],
        },
      ],
    },
  },
];
