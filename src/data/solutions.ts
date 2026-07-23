export type Partner = {
  name: string;
  url: string;
  logo?: string;
  tagline: string;
  role: string;
  about: string;
  offerings: { title: string; items: string[] }[];
};

export type CaseStudy = {
  image: string;
  title: string;
  subtitle: string;
  stats: { label: string; value: string }[];
  href: string;
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
  caseStudy?: CaseStudy;
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
    caseStudy: {
      image: "/img/mandprabha-fpc-millet-processing.jpeg",
      title: "Mandprabha FPC — 45 kW On-Grid Solar",
      subtitle: "Women-led millet processing unit, Shinganapur, Satara, Maharashtra. SELCO Foundation grant secured by Techedge.",
      stats: [
        { label: "Monthly Saving", value: "₹61,000" },
        { label: "Payback", value: "16 months" },
        { label: "Annual ROI", value: "73%" },
        { label: "CO₂ Avoided", value: "61 t/yr" },
      ],
      href: "/projects/mandprabha-selco-grant-solar-satara/",
    },
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
  {
    slug: "mini-grid",
    title: "Solar Mini Grid",
    shortTitle: "Mini Grid",
    icon: "🏘️",
    tagline: "Village electrification for India & Africa",
    description:
      "Turnkey solar mini grid systems for rural village electrification. 150 kWp solar + 214.5 kWh Deye BOS-B LiFePO₄ BESS + 100 kW PCS. Powers homes, schools, clinics, water pumps and productive loads. For NGOs, CSR programs, Rotary Clubs and government agencies across India and Africa.",
    color: { bg: "#fefce8", text: "#92400e", border: "#fbbf24" },
    highlights: [
      { label: "Solar Capacity", value: "150 kWp" },
      { label: "Battery Storage", value: "214.5 kWh" },
      { label: "AC Output", value: "100 kW" },
      { label: "Project Budget", value: "₹1–1.4 Cr" },
    ],
    benefits: [
      "Powers 50–200 households with schools, clinics and water pumps",
      "Zero diesel — replaces expensive generator fuel supply",
      "214.5 kWh LiFePO₄ BESS with 10-year warranty",
      "Scalable to 429 kWh (2× BOS-B) as community grows",
      "CSR & NGO documentation — SDG mapping, CO₂ savings, impact reports",
      "Supply and EPC across India; international equipment supply for Africa",
    ],
    useCases: [
      "Rural village electrification (India & Africa)",
      "NGO and Rotary Club funded projects",
      "Corporate CSR rural energy access programs",
      "Climate finance and GCF-funded deployment",
      "Island and hilly terrain electrification",
      "Tribal region and forest settlement power",
    ],
    howItWorks: [
      { step: "Solar PV feeds MPPT controller", desc: "100–150 kWp of solar panels connect to the 8-tracker MPPT module — maximising generation without a separate inverter." },
      { step: "PCS manages power flow", desc: "The 100 kW bidirectional PCS charges the BOS-B battery and supplies the AC mini grid at 98.5% efficiency." },
      { step: "BOS-B stores surplus energy", desc: "214.5 kWh LiFePO₄ battery stores daytime solar for 8–10 hours of night backup to the entire village." },
      { step: "Mini grid distributes to community", desc: "415V 3-phase backbone feeds individual homes (230V), schools, clinics, water pumps and productive loads via STS-protected distribution." },
    ],
  },
  {
    slug: "microgrid-solar",
    title: "Solar Microgrid",
    shortTitle: "Microgrid",
    icon: "🌍",
    tagline: "Zero grid dependency for communities worldwide",
    description:
      "A complete solar microgrid system — Deye BOS-B 214.5 kWh LiFePO₄ storage, 100 kW PCS, 200 kWp MPPT and 500 kW STS switching — for NGOs, CSR programs and off-grid communities. Scalable from 100 kW to 2.5 MW. Worldwide supply and design by Techedge.",
    color: { bg: "#f0fdf4", text: "#166534", border: "#86efac" },
    highlights: [
      { label: "Storage", value: "214.5 kWh" },
      { label: "AC Power", value: "100 kW" },
      { label: "Solar Input", value: "200 kWp" },
      { label: "Scalable To", value: "2.5 MW" },
    ],
    benefits: [
      "Zero diesel — eliminate fuel costs and supply chain risks",
      "≥6,000 cycle LiFePO₄ battery with 10-year warranty",
      "Seamless grid/generator backup switching in <20ms",
      "No separate solar inverter — MPPT feeds DC direct to battery",
      "CSR & NGO project documentation and impact reports",
      "Worldwide supply, logistics and commissioning support",
    ],
    useCases: [
      "Rural health clinics and hospitals",
      "Schools and educational centres",
      "Water treatment and pumping stations",
      "Telecom towers and connectivity hubs",
      "Island and eco-resort microgrids",
      "Disaster relief and emergency response",
    ],
    howItWorks: [
      { step: "Solar panels feed MPPT module", desc: "Up to 200 kWp of PV connects to the 8-tracker MPPT module — no separate inverter required." },
      { step: "PCS converts and controls power flow", desc: "The 100 kW bidirectional PCS manages charging, discharging and AC output at 98.5% efficiency." },
      { step: "BOS-B stores surplus energy", desc: "214.5 kWh LiFePO₄ battery stores daytime solar for night-time and peak demand use." },
      { step: "STS switches sources seamlessly", desc: "The STS module auto-switches between solar/battery, grid and generator in under 20ms — zero disruption to critical loads." },
    ],
  },
  {
    slug: "diesel-generator-replacement",
    title: "Diesel Generator Replacement (BESS)",
    shortTitle: "DG Replacement",
    icon: "🔋",
    tagline: "Fuel the future, not the generator",
    description:
      "Replace your diesel generator with a Battery Energy Storage System (BESS). A 50 kW hybrid inverter + LiFePO₄ battery bank delivers silent, zero-fuel backup power — with a lower 5-year cost of ownership than running a DG set, even before adding solar. Ideal for commercial, industrial and institutional sites with frequent power cuts and existing DG dependency.",
    color: { bg: "#fff7ed", text: "#c2410c", border: "#fdba74" },
    highlights: [
      { label: "Fuel Cost", value: "Zero" },
      { label: "Noise", value: "Silent" },
      { label: "5-Yr Savings", value: "₹3.87L+" },
      { label: "CO₂ Avoided", value: "~25 t/yr" },
    ],
    benefits: [
      "Zero fuel cost — eliminate diesel expenses completely",
      "Lower 5-year total cost of ownership than a DG set, even without solar",
      "Silent, zero-emission operation — safe for indoor and commercial use",
      "Fast response and intelligent energy management vs. DG start-up delay",
      "Future-ready — pair with solar for maximum savings and faster ROI",
      "Minimal maintenance — no moving parts, no fuel supply chain",
    ],
    useCases: [
      "Commercial buildings currently running a 50–100 kVA DG set",
      "Manufacturing units and industrial sheds with frequent outages",
      "Showrooms, offices and retail with critical uptime needs",
      "Institutions phasing out diesel for ESG/sustainability targets",
      "Sites where DG noise or emissions are a compliance issue",
    ],
    howItWorks: [
      { step: "Load and DG runtime assessment", desc: "Techedge audits your existing DG fuel bills and outage pattern to size the right BESS capacity." },
      { step: "Hybrid inverter + battery installed", desc: "A hybrid inverter and LiFePO₄ battery bank replace the DG set at the distribution board — no rewiring of loads." },
      { step: "Automatic switchover on grid failure", desc: "The system detects grid outage and switches to battery power within milliseconds — no manual start, no warm-up delay." },
      { step: "Optional solar integration", desc: "Add rooftop solar to recharge the battery for free during the day, maximising savings and cutting payback time further." },
    ],
    caseStudy: {
      image: "/img/studer-tvs-showroom.jpeg",
      title: "Studer Hybrid System, Bengaluru — Zero-Downtime Backup",
      subtitle: "21 kVA 3-phase hybrid inverter + LiFePO₄ battery rack installed inside a live motorcycle showroom, replacing generator dependency for billing, lighting and service bay loads.",
      stats: [
        { label: "System", value: "21 kVA + LiFePO₄" },
        { label: "Outcome", value: "Zero-downtime backup" },
        { label: "Chemistry", value: "LiFePO₄ (indoor-safe)" },
        { label: "Result", value: "Reduced opex" },
      ],
      href: "/projects/studer-tvs-showroom-bangalore/",
    },
  },
  {
    slug: "dre-solar-for-farmers-fpo-shg",
    title: "Distributed Renewable Energy for Farmers, FPOs & SHGs",
    shortTitle: "DRE for FPO/SHG",
    icon: "🌾",
    tagline: "On-grid, hybrid + BESS, and C&I-scale battery systems for rural India",
    description:
      "Techedge designs and installs distributed renewable energy (DRE) systems for Farmer Producer Organisations (FPOs), Self-Help Groups (SHGs), MSMEs and rural enterprises — from grid-tied rooftop solar to hybrid solar + battery storage and larger commercial-scale battery energy storage. We handle the full cycle: site survey, DPR preparation, grant and subsidy documentation (SELCO Foundation, AIF, DISCOM net metering), engineering, supply, installation and commissioning.",
    color: { bg: "#f7fee7", text: "#3f6212", border: "#bef264" },
    highlights: [
      { label: "Installations", value: "200+" },
      { label: "FY26-27 Pipeline", value: "9 units" },
      { label: "Planned Capacity", value: "600 kW+" },
      { label: "Grants Secured", value: "₹7.64L+" },
    ],
    benefits: [
      "End-to-end grant and subsidy documentation — SELCO Foundation, AIF, DISCOM net metering",
      "Three proven technology lines: on-grid PV, hybrid solar + BESS, and C&I-scale battery storage",
      "DPR preparation and energy assessment tailored for FPO/SHG loan and grant applications",
      "16-month average payback on grant-supported on-grid installations",
      "Field-proven components — Deye BIS/IEC certified inverters, LiFePO₄ batteries with 6,000+ cycle life",
      "Remote monitoring and O&M support after commissioning",
    ],
    useCases: [
      "Farmer Producer Organisations (FPOs/FPCs) — processing units",
      "Self-Help Groups (SHGs) and cooperatives",
      "Fuel retail stations and rural MSMEs",
      "Millet, dairy and agri-processing units",
      "Rural residential and institutional rooftops",
      "Cold storage and cold chain aggregation points",
    ],
    howItWorks: [
      { step: "Site survey & energy assessment", desc: "Techedge audits your load profile, roof/land availability and grid connection to size the right system." },
      { step: "DPR & grant documentation", desc: "We prepare the Detailed Project Report and handle SELCO Foundation, AIF or DISCOM documentation on your behalf." },
      { step: "Engineering, supply & installation", desc: "Choose the right technology line — on-grid PV, hybrid + BESS, or C&I-scale battery storage — installed and commissioned by Techedge." },
      { step: "Commissioning & remote monitoring", desc: "Net metering liaison, performance testing, user training, and ongoing remote monitoring / O&M support." },
    ],
    caseStudy: {
      image: "/img/mandprabha-fpc-millet-processing.jpeg",
      title: "Mandprabha Farmer Producer Company, Satara — 45 kW On-Grid",
      subtitle: "Women-led millet processing unit. Techedge secured a ₹7,64,180 SELCO Foundation grant and engineered, supplied and commissioned the system end-to-end.",
      stats: [
        { label: "Savings", value: "₹61K/mo" },
        { label: "Payback", value: "16 months" },
        { label: "Panels", value: "75" },
        { label: "CO₂ Saved", value: "61 t/yr" },
      ],
      href: "/projects/mandprabha-selco-grant-solar-satara/",
    },
  },
];
