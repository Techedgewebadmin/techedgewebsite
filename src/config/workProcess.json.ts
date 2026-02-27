export type Process = {
  number: string;
  title: string;
  description: string;
  image: string;
}

export const processes: Process[] = [
  {
    number: "01",
    title: "Consultation & Site Assessment",
    description: "We begin with a detailed analysis of your goals, budget, and location. Our team evaluates your site conditions to determine the best fit for your action.",
    image: "/images/workprocess/consultation.webp"
  },
  {
    number: "02",
    title: "System Design & Proposal",
    description: "Based on our findings, we create a custom system and provide a clear proposal with performance estimates, timelines, and cost projections.",
    image: "/images/workprocess/systemdesign.webp"
  },
  {
    number: "03",
    title: "Installation & Integration",
    description: "Our cetified technicians carry out the installation efficiently and safely, ensuring seamless integration with your infrastructure and the local power grid.",
    image: "/images/workprocess/installation.webp"
  },
  {
    number: "04",
    title: "Monitoring & Support",
    description: "Once live, your system is monitored in real time. You get full visibility into performance, while we handle maintenance, updates, and long-term support.",
    image: "/images/workprocess/monitoring.webp"
  }
];
