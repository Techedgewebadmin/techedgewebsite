export type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "I had doubts about whether solar would actually work for a fuel station — the loads are heavy and continuous. Techedge did a proper site assessment, explained the system design clearly, and delivered exactly what they promised. Six years on, the system is still performing without a single issue. That kind of reliability says everything about their engineering.",
    author: "Mr. Raghavendra M",
    role: "Owner, Shri Durgha Fuels — HPCL Retail Outlet, Sagara",
  },
  {
    id: 2,
    quote: "Techedge was involved from day one — DPR, AIF interest subvention, multiple site visits at every stage of planning and execution, right through to commissioning. What impressed me most was the attention to minute details and their deep knowledge of both cold storage operations and solar systems. They knew exactly what our facility needed. The hybrid system with battery backup has kept our compressors running without interruption through every power cut. A team that truly understands what they are building — and delivers on it.",
    author: "Sri Chandrakanth",
    role: "Owner, 80 MT Cold Storage Facility — Bilekere Hobli, Mysuru",
  },
  {
    id: 3,
    quote: "We recently got our home solar system installed by TechEdge India, and the overall experience was really smooth. From the initial discussion to the final setup, everything was handled in a clear and straightforward way. The installation was done neatly, and the team made sure we understood how everything works. Since the installation, we've already started noticing a drop in our electricity bills. Overall, it feels like a solid long-term decision for our home. Would definitely recommend TechEdge India to anyone thinking about going solar.",
    author: "K.C. Thimmashetty",
    role: "Homeowner — 5 kWp Residential Solar, Bengaluru",
    photo: "/images/kc-thimmashetty-client.jpeg",
  },
  {
    id: 4,
    quote: "Our electricity bill was killing the business — over one lakh in peak months. Techedge came in, studied our bills, applied for the SELCO grant on our behalf, and installed the entire system. Now we save over ₹61,000 every month. That money goes back to our farmer members. I didn't have to worry about a single document or approval — they handled everything end to end.",
    author: "Mrs. Arati Abhay Nilakhe",
    role: "Founder, Mandprabha Farmer Producer Company — Shinganapur, Satara",
  },
  {
    id: 5,
    quote: "As a women-led FPC sourcing millets from small farmers, every rupee of profit matters. The solar system has made our processing unit financially stable and energy-independent. We now plan our procurement better because we know our energy cost is fixed for 25 years. Techedge understood our business, not just the solar system.",
    author: "Mandprabha FPC Committee",
    role: "Board of Directors, Mandprabha Farmer Producer Company — Satara, Maharashtra",
  },
];
