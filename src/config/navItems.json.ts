export type NavItem = {
  title: string;
  href: string;
  icon?: string;
};

export const navItems: NavItem[] = [
  { title: "Home", href: "/", icon: "mdi:home" },
  { title: "Projects", href: "/projects", icon: "mdi:folder-multiple" },
  { title: "About Us", href: "/about", icon: "mdi:information" },
  { title: "Contact Us", href: "/contact", icon: "mdi:email" },
];

export const footerOtherItems: NavItem[] = [
  { title: "Term of Use", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "FAQ", href: "/about/#faq" },
];
