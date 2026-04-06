export type Service = {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: "System Design & Engineering",
    description:
      "Every project starts with a proper site survey, load analysis, and roof assessment. Our engineers design the full system — panel layout, MMS structure, inverter sizing, cable routing, and protection scheme — before a single bolt is tightened. No shortcuts, no guesswork.",
    image:
      "/images/services/panels-one.webp",
    icon: "design"
  },
  {
    title: "Installation & Integration",
    description:
      "Our trained installation teams handle everything from MMS fabrication and panel mounting to inverter commissioning and grid interconnection. We work across rooftop scales — from kW residential systems to MW industrial plants — with full safety compliance on every site.",
    image:
      "/images/services/installation-mms.jpg",
    icon: "installation",
  },
  {
    title: "Operations & Maintenance",
    description:
      "A solar system earns its ROI over 25 years — and only if it is maintained properly. Techedge offers scheduled O&M services including panel cleaning, performance monitoring, inverter health checks, and fault diagnosis. We keep your system generating at peak output, year after year.",
    image:
      "/images/services/installation-site.jpg",
    icon: "maintenance",
  },
  {
    title: "Consulting & Support",
    description:
      "From DPR preparation for bank financing and AIF subsidy applications to net metering approvals and DISCOM liaison — Techedge handles the paperwork and compliance so you don't have to. We guide every project from concept to commissioning.",
    image:
      "/images/services/panels-four.webp",
    icon: "suport",
  },
];
