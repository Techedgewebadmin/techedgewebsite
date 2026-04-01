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
    street: "No. 10/11, Maragondanahalli Tavarekere",
    city: "Bangalore – 562130",
    country: "India",
  },
  email: "sales@techedgeindia.co.in",
  phone: "(+91) 98440 97096",
  workingHours: "",
  workingDays: "",
};
