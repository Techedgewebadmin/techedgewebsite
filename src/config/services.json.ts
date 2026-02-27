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
      "We analyze your location, energy usage patterns, roof layout, and future scalability to design a solar system that's both efficient and cost-effective. Our engineers tailor every component from panel placement to inverter configuration - ensuring maximum energy generation for your property.",
    image:
      "/images/services/panels-one.webp",
    icon: "design"
  },
  {
    title: "Installation & Integration",
    description:
      "Our engineers tailor every component from panel placement to inverter configuration - ensuring maximum energy generation for your property. We deliver precision-driven, future-ready energy architecture with continuous monitoring and proactive maintenance services.",
    image:
      "/images/services/panels-two.webp",
    icon: "installation",
  },
  {
    title: "Monitoring & Maintenance",
    description:
      "We deliver precision-driven, future-ready energy architecture with continuous monitoring and proactive maintenance services. Expert guidance throughout your solar journey, from initial consultation to ongoing technical support and optimization.",
    image:
      "/images/services/panels-three.webp",
    icon: "maintenance",
  },
  {
    title: "Consulting & Support",
    description:
      "Expert guidance throughout your solar journey, from initial consultation to ongoing technical support and optimization. We analyze your location, energy usage patterns, roof layout, and future scalability to design solutions.",
    image:
      "/images/services/panels-four.webp",
    icon: "suport",
  },
];
