export type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "I recently engaged in a website development project with an outstanding team, and the results were nothing short of exceptional. The team exhibited an exemplary level of professionalism, expertise, and dedication throughout the entire process.",
    author: "Joe Glodberg",
    role: "CEO",
    image: "https://i.pravatar.cc/150?img=11" // Placeholder
  },
  {
    id: 2,
    quote: "The solar installation was seamless and professional. We've seen a significant reduction in our energy bills and couldn't be happier with the service provided by the entire team.",
    author: "Sarah Miller",
    role: "Homeowner",
    image: "https://i.pravatar.cc/150?img=5" // Placeholder
  },
  {
    id: 3,
    quote: "Their expertise in commercial solar solutions helped us achieve our sustainability goals while maximizing ROI. Highly recommended for any business looking to go green.",
    author: "David Chen",
    role: "Operations Director",
    image: "https://i.pravatar.cc/150?img=3" // Placeholder
  }
];
