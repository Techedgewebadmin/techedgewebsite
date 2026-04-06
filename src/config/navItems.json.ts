export type NavItem = {
  title: string;
  href: string;
  sectionId?: string;
  icon?: string;
};

export const navItems: NavItem[] = [
  { title: "Home", href: "/", sectionId: "home", icon: "mdi:home" },
  { title: "Solutions", href: "/solutions", sectionId: "solutions", icon: "mdi:solar-panel" },
  { title: "Projects", href: "/projects", sectionId: "projects", icon: "mdi:folder-multiple" },
  { title: "Services", href: "/services", icon: "mdi:tools" },
  { title: "Blog", href: "/blog", icon: "mdi:post" },
  { title: "About Us", href: "/about", sectionId: "about", icon: "mdi:information" },
  { title: "Contact Us", href: "/contact", sectionId: "contact", icon: "mdi:email" },
];

export const footerOtherItems: NavItem[] = [
  { title: "Term of Use", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "FAQ", href: "/about/#faq" },
  { title: "Sitemap", href: "/sitemap" },
];
