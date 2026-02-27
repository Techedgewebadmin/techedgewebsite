export type SocialLink = {
  icon: string;
  href: string;
  label: string;
};

export type ContactInfo = {
  address: {
    street: string;
    city: string;
    country: string;
  };
  email: string;
  phone: string;
  workingHours: string;
  workingDays: string;
};

export const socialLinks: SocialLink[] = [
  { icon: 'mdi:instagram', href: 'https://www.instagram.com/', label: 'Instagram' },
  { icon: 'mdi:facebook', href: 'https://www.facebook.com/', label: 'Facebook' },
  { icon: 'mdi:linkedin', href: 'https://www.linkedin.com/', label: 'LinkedIn' },
  { icon: 'mdi:twitter', href: 'https://twitter.com/', label: 'X.com' },
];


export const contactInfo: ContactInfo = {
  address: {
    street: "Mendoza, New York",
    city: "NY 11111",
    country: "United States",
  },
  email: "contact@cipres.com",
  phone: "(+000) 111 222 333",
  workingHours: "Monday - Friday | 9AM - 5PM",
  workingDays: "Sat-Sun: Closed",
};
