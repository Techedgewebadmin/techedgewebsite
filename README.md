# ☀️ CIPRES - Solar Energy Website

> Professional, modern website for solar energy companies built with Astro 5, React 19, and Tailwind CSS v4. Features advanced animations, responsive design, and a complete contact system with security measures.

[![Astro](https://img.shields.io/badge/Astro-5.15-FF5D01?logo=astro)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## 📑 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Quick Start](#-quick-start)
4. [Project Structure](#-project-structure)
5. [Pages](#-pages)
6. [Components](#-components)
7. [Configuration Files](#-configuration-files)
8. [Contact Form Security](#-contact-form-security)
9. [Deployment](#-deployment)
10. [Environment Variables](#-environment-variables)
11. [SEO Management](#-seo-management)
12. [Customization](#-customization)
13. [Animations](#-animations)
14. [Content Management](#-content-management)
15. [Things to keep in mind](#-things-to-keep-in-mind)
16. [Resources](#-resources)
17. [System Requirements](#-system-requirements)
18. [Known Limitations](#-known-limitations)
19. [Support](#-support)

---

## ✨ Features

### Core Features

- ⚡ **Ultra-fast Performance** - Built with Astro 5 for optimal loading speeds
- 🎨 **Modern Design** - Contemporary UI with Tailwind CSS v4
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🔄 **Smooth Animations** - GSAP-powered professional transitions
- 🌐 **SEO Optimized** - Complete meta tags, sitemap, and robots.txt
- ♿ **Accessible** - WCAG compliant components

### Advanced Features

- 🔒 **Secure Contact Form** - Honeypot + rate limiting + email validation
- 📧 **Email Integration** - Resend API for reliable email delivery
- 🎯 **React Islands** - Selective hydration for maximum efficiency
- 🌍 **Centralized Content** - All text content managed in `labels.ts` for easy updates
- 📊 **Content Collections** - Type-safe content management for projects
- 🎭 **Loading Screen** - Animated loader with video detection

---

## 🛠️ Tech Stack

### Framework & Core

- **[Astro 5.15](https://astro.build/)** - Static Site Generator with SSR
- **[React 19.2](https://react.dev/)** - Interactive islands
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first styling

### Libraries & Tools

- **[GSAP 3.13](https://greensock.com/gsap/)** - Professional animations
- **[Lenis 1.3](https://lenis.darkroom.engineering/)** - Smooth scrolling
- **[class-variance-authority](https://cva.style/)** - Component variants
- **[Resend](https://resend.com/)** - Email API
- **[Astro Icon](https://www.astroicon.dev/)** - Icon system
- **[@iconify-icon/react](https://iconify.design/)** - Additional icons

### Deployment

- **[Netlify Adapter](https://docs.astro.build/en/guides/integrations-guide/netlify/)** - SSR deployment with image CDN

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.14.1 or higher
- npm 9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd solarenterprice

# Install dependencies
npm install

# Set up environment variables
cp .env.template .env
# Edit .env with your credentials

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

---

## 📂 Project Structure

```
solarenterprice/
├── src/
│   ├── actions/           # Server actions (contact form)
│   ├── assets/
│   │   ├── logo.webp      # Company logo
│   │   └── projects/      # Project images (optimized by Astro)
│   ├── components/
│   │   ├── sections/      # Page-specific sections
│   │   └── ui/            # Reusable UI components
│   ├── config/            # Static data (nav, services, labels, etc.)
│   ├── content/
│   │   └── projects/      # Project markdown files
│   ├── icons/
│   │   ├── partners/      # Partner/brand SVG logos
│   │   └── react-use/     # Custom React icon components
│   ├── layouts/           # Base page layouts
│   ├── lib/               # Utility functions
│   ├── pages/             # Application routes
│   └── styles/            # Global CSS and Tailwind config
│   └── content.config.ts  # Content collections schema
├── public/
│   ├── images/            # Static images (services, etc.)
│   └── videos/            # Background videos
├── astro.config.mjs       # Astro configuration
└── package.json           # Dependencies
```

---

## 📄 Pages

### 1. Homepage (`/`)

- Hero section with video background
- Services showcase with animations
- "Why Choose Us" section
- Work process section
- Featured projects
- CTA section

### 2. About (`/about`)

- Hero section with video background
- Company overview
- FAQ section with accordion
- CTA section

### 3. Projects (`/projects`)

- Hero section with video background
- Projects grid with hover effects
- Individual project pages with:
  - Image gallery
  - Project details
  - Technical specifications
- CTA section

### 4. Contact (`/contact`)

- Contact form with validation
- Company information
- Social media links
- Working hours
- Email and phone

### 5. Legal Pages

- **Terms of Service** (`/terms`)
- **Privacy Policy** (`/privacy`)
- **404 Error Page** (`/404`)

---

## 🧩 Components

The project follows a modular component architecture with clear separation between:

- **UI Components** (`ui/`): Reusable building blocks
- **Section Components** (`sections/`): Page-specific sections
- **Utility Components** (`common/`): Shared functionality

See detailed component documentation in [COMPONENTS.md](./COMPONENTS.md)

### Quick Reference

| Component   | Type       | Usage           | Props               |
| ----------- | ---------- | --------------- | ------------------- |
| Button      | UI         | CTA buttons     | variant, size, href |
| Navbar      | Navigation | Site header     | -                   |
| HeroSection | Section    | Homepage hero   | -                   |
| Form        | Contact    | Contact form    | -                   |
| ProjectCard | Card       | Project display | project, size       |

---

## ⚙️ Configuration Files

The project uses multiple configuration files in `src/config/` to manage different aspects of the website. All files export TypeScript types for type safety.

### 1. Navigation (`navItems.json.ts`)

Defines navigation links for navbar and footer.

```typescript
export type NavItem = {
  title: string;
  href: string;
  icon?: string; // Optional Iconify icon name
};

export const navItems: NavItem[] = [
  { title: "Home", href: "/", icon: "mdi:home" },
  { title: "Projects", href: "/projects", icon: "mdi:folder-multiple" },
  { title: "About Us", href: "/about", icon: "mdi:information" },
  { title: "Contact Us", href: "/contact", icon: "mdi:email" },
];

export const footerOtherItems: NavItem[] = [
  { title: "Terms of Service", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "FAQ", href: "/about/#faq" }, // Anchor link
];
```

**Used in:** `Navbar.astro`, `FullscreenMenu.tsx`, `Footer.astro`, `404.astro`

---

### 2. Social Links (`socialLinks.json.ts`)

Social media and contact links for footer and contact page.

```typescript
export type SocialLink = {
  href: string;
  label: string;
  icon: string; // Iconify icon name
};

export const socialLinks: SocialLink[] = [
  {
    href: "https://wa.me/1657998115", // WhatsApp with phone number
    label: "WhatsApp",
    icon: "mdi:whatsapp",
  },
  {
    href: "https://instagram.com/yourcompany",
    label: "Instagram",
    icon: "mdi:instagram",
  },
  {
    href: "https://twitter.com/yourcompany",
    label: "Twitter",
    icon: "mdi:twitter",
  },
  {
    href: "tel:+1657998115", // Phone link
    label: "Phone",
    icon: "mdi:phone",
  },
];
```

**Used in:** `Footer.astro`, `ContactForm.astro`, `ContactContent.astro`, `FullscreenMenu.tsx`

---

### 3. Services (`services.json.ts`)

Services displayed on homepage.

```typescript
export type Service = {
  title: string;
  description: string;
  image: string; // Path to service image
  icon: string; // Icon identifier (must match iconMap in SolarServices.tsx)
};

export const services: Service[] = [
  {
    title: "System Design & Engineering",
    description: "We analyze your location, energy usage patterns...",
    image: "/images/services/panels-one.webp",
    icon: "design", // Maps to DesignIcon in icons-for-react.tsx
  },
  {
    title: "Installation & Integration",
    description: "Our engineers tailor every component...",
    image: "/images/services/panels-two.webp",
    icon: "installation", // Maps to InstallationIcon
  },
  // ... more services
];
```

**Icon Mapping:** Icons must be defined in `src/icons/react-use/icons-for-react.tsx` and mapped in `SolarServices.tsx`:

```tsx
const iconMap = {
  design: DesignIcon,
  installation: InstallationIcon,
  maintenance: MaintenanceIcon,
  support: SupportIcon,
};
```

**Used in:** `SolarServices.tsx`

---

### 4. Features (`features.json.ts`)

Features displayed in "Why Choose Us" section.

```typescript
export interface FeatureProps {
  icon: string; // Iconify icon name
  titleKey: string; // Feature title
  descriptionKey: string; // Feature description
}

export const features: FeatureProps[] = [
  {
    icon: "tabler:chart-bar",
    titleKey: "Efficiency up to 98%",
    descriptionKey: "Advanced solar technology with maximum performance",
  },
  {
    icon: "tabler:link",
    titleKey: "Seamless Integration",
    descriptionKey: "Fits effortlessly into residential and industrial designs",
  },
  // ... more features
];
```

**Used in:** `ChoseUs.astro`

---

### 5. Company Features (`featuresCompany.json.ts`)

Features specific to company overview page.

```typescript
export const featuresCompany = [
  {
    icon: "tabler:solar-panel",
    titleKey: "Global Reach",
    descriptionKey: "Operating across multiple continents",
  },
  // ... more company features
];
```

**Used in:** `CompanyOverview.astro`

---

### 6. FAQ (`faq.json.ts`)

Frequently asked questions for About page.

```typescript
export type FAQ = {
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    question: "How long does installation take?",
    answer: "Typical residential installations take 1-3 days...",
  },
  // ... more FAQs
];
```

**Used in:** `FaqSection.astro`

---

### 7. Work Process (`workProcess.json.ts`)

Steps in the work process timeline.

```typescript
export type WorkStep = {
  number: string;
  title: string;
  description: string;
};

export const workSteps: WorkStep[] = [
  {
    number: "01",
    title: "Consultation",
    description: "Initial assessment of your energy needs",
  },
  // ... more steps
];
```

**Used in:** `WorkProcess.astro`

---

### 8. Testimonials (`testimonials.json.ts`)

Customer testimonials (if used).

```typescript
export type Testimonial = {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    role: "CEO",
    company: "Solar Corp",
    content: "Excellent service and professional installation",
  },
];
```

---

### 9. Translations (`labels.ts`)

All text content and translations for the website.

```typescript
export const labels = {
  // Navigation
  "nav.home": "Home",
  "nav.projects": "Projects",
  "nav.about": "About Us",
  "nav.contact": "Contact Us",

  // Meta tags (SEO)
  "meta.index.title": "CIPRES | Clean Energy Solutions",
  "meta.index.description":
    "Full-cycle EPC and renewable energy development company",
  "meta.index.keywords": "solar energy, clean energy, renewable energy",

  "meta.about.title": "CIPRES | About Us",
  "meta.contact.title": "CIPRES | Contact Us",
  "meta.projects.title": "CIPRES | Projects",
  "meta.privacy.title": "CIPRES | Privacy Policy",
  "meta.terms.title": "CIPRES | Terms of Use",
  "meta.404.title": "404 - Page Not Found",

  // 404 Page
  "404.h1": "404",
  "404.h2": "Page Not Found",
  "404.description": "The page you're looking for doesn't exist",
  "404.back.btn": "Back to Home",
  "404.contact.btn": "Contact Us",
  "404.quick.link": "Or explore these pages:",

  // Hero Section
  "hero.title": "Clean Energy Solutions",
  "hero.subtitle": "Sustainable technology for a better future",

  // Footer
  "footer.title": "Sustainable technology. Global reach. Trusted performance.",
  "footer.menu.title": "Menu",
  "footer.other.title": "Rights",

  // Company
  "company.name": "CIPRES",

  // ... more labels
} as const;
```

**Usage in components:**

```astro
---
import { t } from '@/lib/utils';
---
<h1>{t('hero.title')}</h1>
<title>{t('meta.index.title')}</title>
```

**Used in:** All pages and components for text content

---

---

## 🔒 Contact Form Security

> [!WARNING]
> **Demo Mode Active**: The current contact form (`ContactForm.astro`) is in DEMO MODE for portfolio showcase purposes. It displays a success message without actually sending emails or requiring environment variables.

### Enabling Production Contact Form

To activate the fully functional contact form with email delivery and security features:

1. **Rename Files**:
   ```bash
   # Backup demo version (optional)
   mv src/components/sections/contact/ContactForm.astro src/components/sections/contact/ContactForm.DEMO.astro
   
   # Activate production version
   mv src/components/sections/contact/ContactForm.PRODUCTION.astro src/components/sections/contact/ContactForm.astro
   ```

2. **Set Up Environment Variables**: Follow the instructions in [Environment Variables](#-environment-variables) section below to configure:
   - Resend API (email delivery)
   - Upstash Redis (rate limiting)

3. **Deploy**: The production form will work once environment variables are configured on your hosting platform.


### Production Features

The production contact form (`ContactForm.PRODUCTION.astro`) includes multiple security layers to prevent spam and abuse.

### 1. Honeypot Anti-Spam

Hidden field that bots fill but humans don't see:

```typescript
// In form
<input
  type="text"
  name="company"
  style="position:absolute;left:-9999px;width:1px;height:1px;"
  tabindex="-1"
  autocomplete="off"
  aria-hidden="true"
/>

// In action
company: z.string().optional(), // Honeypot field

if (company) {
  throw new ActionError({
    code: "BAD_REQUEST",
    message: "Invalid submission detected",
  });
}
```

### 2. Rate Limiting with Upstash Redis

**30-second cooldown** between submissions per IP address using Redis for distributed rate limiting.

#### Setup

1. Create free account at [Upstash](https://upstash.com/)
2. Create a Redis database
3. Copy REST URL and Token to `.env`

#### Implementation

```typescript
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

const RATE_LIMIT_WINDOW = 30; // seconds
const MAX_REQUESTS = 1; // requests allowed in the window

// Get user's IP
const ip =
  context.request.headers.get("x-forwarded-for") ||
  context.request.headers.get("x-real-ip") ||
  "unknown";

const rateLimitKey = `rate_limit:contact:${ip}`;

// Check current count
const current = await redis.get<number>(rateLimitKey);

if (current !== null && current >= MAX_REQUESTS) {
  const ttl = await redis.ttl(rateLimitKey);
  throw new ActionError({
    code: "TOO_MANY_REQUESTS",
    message: `Please wait ${ttl} seconds before sending another message`,
  });
}

// Increment counter
const newCount = await redis.incr(rateLimitKey);

// Set expiration on first request
if (newCount === 1) {
  await redis.expire(rateLimitKey, RATE_LIMIT_WINDOW);
}
```

**Why Redis?**

- ✅ Distributed rate limiting (works across multiple servers)
- ✅ Automatic key expiration
- ✅ Persistent storage
- ✅ Free tier available
- ✅ Better than in-memory Map (which resets on server restart)

### 3. Input Validation

Zod schema validation with length limits:

```typescript
input: z.object({
  name: z.string()
    .min(3, "First name is required")
    .max(30, "First name must be at most 30 characters"),
  lastname: z.string()
    .min(3, "Last name is required")
    .max(30, "Last name must be at most 30 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string()
    .min(3, "Subject is required")
    .max(30, "Subject must be at most 30 characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(300, "Message must be at most 300 characters"),
}),
```

### 4. Email Integration (Resend)

Reliable email delivery with HTML and plain text versions, you can modify the email template in `src/actions/index.ts`:

```typescript
const { data, error } = await resend.emails.send({
  from: resendEmail, // Must be verified in Resend
  to: fromEmail,
  subject: `${subject} - Contact from ${name} ${lastname}`,
  html: `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${name} ${lastname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `,
  text: `New Contact Message\n\nName: ${name} ${lastname}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
});
```

### 5. Loading State

Form shows loading spinner while submitting:

```typescript
// In Form.astro
<Button id="submit-btn">
  <span id="btn-text">Submit</span>
  <span id="btn-loader" class="hidden">
    <svg class="animate-spin">...</svg>
    Sending...
  </span>
</Button>

<script>
form.addEventListener('submit', () => {
  submitBtn.disabled = true;
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');
});
</script>
```

---

## 🚀 Deployment

### Platform Configuration

The project uses Vercel adapter by default, but you can easily switch to Netlify, Cloudflare, or any other platform.

#### Current Setup (Vercel)

```typescript
// astro.config.mjs
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: "server",
  adapter: vercel(),
});
```

#### Switch to Netlify

```bash
# Remove Vercel adapter
npm uninstall @astrojs/vercel

# Install Netlify adapter
npm install @astrojs/netlify
```

```typescript
// astro.config.mjs
import netlify from "@astrojs/netlify";

export default defineConfig({
  output: "server",
  adapter: netlify(),
});
```

#### Other Platforms

Cloudflare: @astrojs/cloudflare
Node: @astrojs/node
Deno: @astrojs/deno

See [Astro Adapters Docs](https://astro.build/docs/deploy/)

---

## 🔐 Environment Variables

Create `.env` file in root (copy from `.env.template`):

```env
# Resend Email API (Required for contact form)
# Get your API key from: https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here

# Email address verified in Resend (sender)
RESEND_EMAIL=onboarding@resend.dev

# Your email address (recipient of contact form submissions)
FROM_EMAIL=your-email@example.com

# Upstash Redis (Required for rate limiting)
# Create free database at: https://console.upstash.com/
UPSTASH_REDIS_REST_URL="https://your-redis-url.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-redis-token-here"
```

### Getting API Keys

#### 1. Resend (Email Service)

1. Sign up at [resend.com](https://resend.com/)
2. Go to **API Keys** section
3. Create new API key
4. Copy to `RESEND_API_KEY`
5. Verify your domain or use `onboarding@resend.dev` for testing
6. Set `RESEND_EMAIL` to your verified sender email
7. Set `FROM_EMAIL` to where you want to receive contact form emails

#### 2. Upstash Redis (Rate Limiting)

1. Sign up at [upstash.com](https://upstash.com/)
2. Click **Create Database**
3. Choose **Global** for best performance
4. Select **Free** tier (25MB, 10K commands/day)
5. Copy **REST URL** to `UPSTASH_REDIS_REST_URL`
6. Copy **REST Token** to `UPSTASH_REDIS_REST_TOKEN`

**Free tier limits:**

- 10,000 commands per day
- 25 MB storage
- Perfect for contact form rate limiting

---

## 🔍 SEO Management

The project implements a centralized SEO system using the `labels.ts` configuration file and the `BaseHead.astro` component. All meta tags, titles, descriptions, and keywords are managed in one place for consistency and easy updates.

### Architecture Overview

```
src/config/labels.ts → Page Components → BaseHead.astro → HTML <head>
```

1. **SEO data** is defined in `src/config/labels.ts` under the `meta.*` keys
2. **Pages** import and use the `t()` helper function to access these values
3. **BaseHead component** receives the values as props and renders the appropriate meta tags
4. **HTML** is generated with complete SEO optimization

---

### Meta Tags in `labels.ts`

All SEO-related content is stored in `src/config/labels.ts` using a consistent naming pattern:

```typescript
export const labels = {
  // Homepage SEO
  'meta.index.title': 'CIPRES | Clean Energy Solutions',
  'meta.index.description': 'We are a full-cycle EPC and renewable energy development company...',
  'meta.index.keywords': 'CIPRES, Clean Energy Solutions, EPC, Renewable Energy Development...',

  // About Page SEO  
  'meta.about.title': 'CIPRES | About Us',
  'meta.about.description': 'We are a full-cycle EPC and renewable energy development company...',
  'meta.about.keywords': 'CIPRES, Clean Energy Solutions, EPC...',

  // Contact Page SEO
  'meta.contact.title': 'CIPRES | Contact Us',
  'meta.contact.description': 'Everything you need to know before starting your project...',
  'meta.contact.keywords': 'CIPRES, Clean Energy Solutions...',

  // Projects Page SEO
  'meta.projects.title': 'CIPRES | Projects',
  'meta.projects.description': 'Explore our portfolio of successful solar installations...',
  'meta.projects.keywords': 'CIPRES, Clean Energy Solutions...',

  // Legal Pages SEO
  'meta.privacy.title': 'CIPRES | Privacy Policy',
  'meta.privacy.description': 'Your privacy is important to us...',

  'meta.terms.title': 'CIPRES | Terms of Use',
  'meta.terms.description': 'By using our website, you agree to our terms of use.',

  // 404 Page SEO
  'meta.404.title': '404 - Page Not Found',
  'meta.404.description': 'The page you\'re looking for doesn\'t exist',
} as const;
```

---

### BaseHead Component

**Location:** `src/components/common/BaseHead.astro`

This component generates all SEO-related meta tags for the `<head>` section:

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Page title (displays in browser tab and search results) |
| `description` | `string` | Yes | Meta description (displays in search results) |
| `keywords` | `string` | No | SEO keywords (comma-separated) |

**Generated Tags:**

- `<title>` - Page title
- `<meta name="description">` - Meta description
- `<meta name="keywords">` - SEO keywords (if provided)
- `<meta property="og:title">` - Open Graph title (for social media)
- `<meta property="og:description">` - Open Graph description
- `<meta property="og:type">` - Open Graph type (website)
- `<meta property="og:url">` - Canonical URL
- `<meta name="twitter:card">` - Twitter Card type
- `<meta name="twitter:title">` - Twitter title
- `<meta name="twitter:description">` - Twitter description
- `<link rel="canonical">` - Canonical URL

---

### Usage in Pages

Every page imports the `t()` helper function and passes SEO values to `BaseHead`:

#### Example: Homepage (`src/pages/index.astro`)

```astro
---
import Layout from '@/layouts/Layout.astro';
import BaseHead from '@/components/common/BaseHead.astro';
import { t } from '@/lib/utils';
---

<html lang="en">
  <head>
    <BaseHead
      title={t('meta.index.title')}
      description={t('meta.index.description')}
      keywords={t('meta.index.keywords')}
    />
  </head>
  <body>
    <!-- Page content -->
  </body>
</html>
```

#### Example: About Page (`src/pages/about.astro`)

```astro
---
import BaseHead from '@/components/common/BaseHead.astro';
import { t } from '@/lib/utils';
---

<html lang="en">
  <head>
    <BaseHead
      title={t('meta.about.title')}
      description={t('meta.about.description')}
      keywords={t('meta.about.keywords')}
    />
  </head>
  <body>
    <!-- Page content -->
  </body>
</html>
```

---

### SEO Configuration by Page

| Page | Title Key | Description Key | Keywords Key |
|------|-----------|-----------------|--------------|
| **Homepage** | `meta.index.title` | `meta.index.description` | `meta.index.keywords` |
| **About** | `meta.about.title` | `meta.about.description` | `meta.about.keywords` |
| **Contact** | `meta.contact.title` | `meta.contact.description` | `meta.contact.keywords` |
| **Projects** | `meta.projects.title` | `meta.projects.description` | `meta.projects.keywords` |
| **Privacy** | `meta.privacy.title` | `meta.privacy.description` | - |
| **Terms** | `meta.terms.title` | `meta.terms.description` | - |
| **404** | `meta.404.title` | `meta.404.description` | - |

---

### Dynamic Pages (Project Slugs)

For dynamic routes like individual project pages (`/projects/[slug]`), SEO values are generated from the content collection:

```astro
---
import { getCollection, type CollectionEntry } from 'astro:content';
import BaseHead from '@/components/common/BaseHead.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(project => ({
    params: { slug: project.slug },
    props: { project },
  }));
}

const { project } = Astro.props;
---

<html lang="en">
  <head>
    <BaseHead
      title={`${project.data.title} | CIPRES`}
      description={project.data.description}
      keywords={`solar energy, ${project.data.location}, ${project.data.category}`}
    />
  </head>
  <body>
    <!-- Project content -->
  </body>
</html>
```

---

### How to Update SEO

#### 1. Update Existing SEO Tags

Edit the values in `src/config/labels.ts`:

```typescript
'meta.index.title': 'Your New Title | Company Name',
'meta.index.description': 'Your updated description here',
'meta.index.keywords': 'keyword1, keyword2, keyword3',
```

#### 2. Add SEO for a New Page

1. Add new keys to `labels.ts`:
   ```typescript
   'meta.services.title': 'Our Services | CIPRES',
   'meta.services.description': 'Comprehensive solar energy services',
   'meta.services.keywords': 'solar services, energy solutions',
   ```

2. Use in your page:
   ```astro
   <BaseHead
     title={t('meta.services.title')}
     description={t('meta.services.description')}
     keywords={t('meta.services.keywords')}
   />
   ```

---

### SEO Best Practices

✅ **Title Tags (55-60 characters)**
- Keep under 60 characters to avoid truncation in search results
- Include your brand name
- Make it descriptive and unique per page

✅ **Meta Descriptions (150-160 characters)**
- Keep between 150-160 characters
- Include a call-to-action
- Accurately summarize page content
- Don't duplicate across pages

✅ **Keywords (Optional)**
- Use 5-10 relevant keywords
- Separate with commas
- Include variations and long-tail keywords
- Modern SEO relies more on content than keyword meta tags

✅ **Open Graph Tags**
- Automatically generated by `BaseHead.astro`
- Improves social media sharing appearance
- Uses same title and description as meta tags

✅ **Canonical URLs**
- Automatically set to current page URL
- Prevents duplicate content issues
- Important for SEO ranking

---

### Additional SEO Features

The template includes additional SEO optimizations:

- **Semantic HTML**: Proper heading hierarchy (`h1`, `h2`, `h3`)
- **Alt Text**: All images include descriptive alt attributes
- **Sitemap**: Auto-generated by Astro (configure in `astro.config.mjs`)
- **Robots.txt**: Generated via dynamic route at `src/pages/robot.txt.ts`
- **Performance**: Fast loading times boost SEO rankings
- **Mobile-First**: Responsive design is a ranking factor
- **Accessibility**: WCAG compliance helps SEO

---

## 🎨 Customization

### Colors (`src/styles/global.css`)

```css
@theme inline {
  --color-primary: oklch(0.9646 0.0199 100.58);

  --color-background: oklch(0.9826 0.0068 97.36);
  --color-background-foreground: oklch(0.9311 0.0112 89.73);
  
  --color-foreground: oklch(0.18 0.02 250);

  --color-accent: oklch(0.94 0.022 114.96);
  --color-accent-foreground: oklch(1 0 0);

  --color-secondary: oklch(0.78 0.14 130);
  --color-secondary-foreground: oklch(0.3637 0.0866 148.03);

  --color-secondary-dark: oklch(0.45 0.09 135);

  --color-muted: oklch(0.40 0.02 250);
  --color-muted-foreground: oklch(0.708 0 0);
}
```

### Typography

```css
@theme inline {
  --font-anton: "Anton", sans-serif;
  --font-sans: "DM Sans", sans-serif;
  --font-mono: "Roboto Mono", sans-serif;
  --font-grotesk: "Space Grotesk", sans-serif;
}
```

### Logo

Replace `public/images/logo.webp` with your logo (preferred, used by Navbar) or update the image path in the Navbar component accordingly:

```astro
<!-- src/components/ui/nav/Navbar.astro -->
<img
  src="/images/logo.webp"
  alt="Your Company"
  width={96}
  height={96}
/>
```

### Contact Information

Update in `src/config/socialLinks.json.ts`:

```typescript
const contactInfo = {
  address: {
    street: "Your Street",
    city: "Your City",
    country: "Your Country",
  },
  email: "contact@yourcompany.com",
  phone: "(+XX) XXX XXX XXX",
  hours: "Monday - Friday | 9AM - 5PM",
};
```

### Individual Project Pages (`src/pages/projects/[slug].astro`)

- Dynamic pages generated from markdown files
- Project metadata and content
- **Custom markdown styles:** Edit `src/styles/project-page.css` to customize typography, spacing, and layout for project content

---

## 🎨 Animations

All animations in this project are powered by GSAP and follow a modular structure to keep the code clean, fast, and easy to maintain.
Both Astro and React components share a consistent animation system.
```
src/
 └─ animations/
      └─ hooks/                  # Custom hooks for animations in react
            ├─ useCarouselAnimation.ts
            └─ useRevealHover.ts
```

### SSR Considerations

Due to Server-Side Rendering (SSR) in the project, some animations are implemented directly in components rather than as separate hooks. This is especially true for:

- **ScrollTrigger-based animations**: Require browser APIs (`window`, `document`) that aren't available during SSR
- **Complex timeline animations**: That need to access DOM measurements on the client side

**Best practices applied:**
- All GSAP hooks use `useLayoutEffect` to prevent visual flickering
- SSR guards (`typeof window !== "undefined"`) protect animations from server execution
- `gsap.context()` is used for proper cleanup and scoping

**Example pattern:**
```typescript
useLayoutEffect(() => {
  if (typeof window === "undefined") return;
  
  const ctx = gsap.context(() => {
    // Animation code here
  });
  
  return () => ctx.revert();
}, []);
```

---

## 📝 Content Management

### Adding New Projects

Projects are managed using **Astro Content Collections** with type-safe schema validation.

#### Step 1: Add Project Image

Place your project image in `src/assets/projects/` (e.g., `my-project.webp`).

> **Note:** Images in `src/assets/` are optimized by Astro automatically.

#### Step 2: Create Project File

Create a new `.md` file in `src/content/projects/` (e.g., `my-solar-project.md`):

```markdown
---
title: "Residential Solar Installation"
category: "Residential" # Options: 'Residential', 'Commercial', 'Community', 'Industrial'
location: "San Francisco, CA"
capacity: "10 kW"
date: "December 2024"
image: "../../assets/projects/my-project.webp" # Path relative to this file
description: "Complete solar installation for modern home"
isFeatured: true # Shows on homepage if true
stats:
  panelCount: 30
  co2Saved: "7 tons/year"
  energyGenerated: "14,000 kWh/year"
  paybackPeriod: "6 years"
client: "Smith Family" # Optional
challenges: # Optional
  - "Complex roof angles"
  - "Shading from trees"
solutions: # Optional
  - "Custom mounting system"
  - "Optimized panel placement"
---

## Project Overview

Write your detailed project description here using Markdown...
```

#### Field Reference

| Field                   | Type    | Required | Description                                                                |
| ----------------------- | ------- | -------- | -------------------------------------------------------------------------- |
| `title`                 | string  | ✅       | Project name                                                               |
| `category`              | enum    | ✅       | Must be: `'Residential'`, `'Commercial'`, `'Community'`, or `'Industrial'` |
| `location`              | string  | ✅       | Project location                                                           |
| `capacity`              | string  | ✅       | System capacity (e.g., "10 kW")                                            |
| `date`                  | string  | ✅       | Completion date                                                            |
| `image`                 | path    | ✅       | Relative path to image in `src/assets/projects/`                           |
| `description`           | string  | ✅       | Short description (shown on cards)                                         |
| `isFeatured`            | boolean | ❌       | Default: `false`. Set to `true` to show on homepage                        |
| `stats.panelCount`      | number  | ✅       | Number of solar panels installed                                           |
| `stats.co2Saved`        | string  | ✅       | CO2 reduction per year                                                     |
| `stats.energyGenerated` | string  | ✅       | Energy production per year                                                 |
| `stats.paybackPeriod`   | string  | ✅       | ROI timeframe                                                              |
| `client`                | string  | ❌       | Client name (optional)                                                     |
| `challenges`            | array   | ❌       | List of project challenges (optional)                                      |
| `solutions`             | array   | ❌       | List of solutions implemented (optional)                                   |

#### Step 3: Write Content

Below the frontmatter (`---`), write your project details using standard Markdown.

#### Step 4: Verify

Your project will automatically appear on the `/projects` page and individual page at `/projects/my-solar-project`.

---

## 💡 Things to Keep in Mind

Don't forget to comment out or delete the message in the design below the footer; the message is located in `src/layouts`.

Also, change the demo form to the production version.

### Astro Site domain change
Don't forget to change it to your domain in `astro.config.mjs`

```typescript
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [icon(), react()],
  site: '', // Change to your domain 
  output: 'server',
  adapter: vercel(),
});
```

### Icon Usage

#### In Astro Components (`.astro` files)

You have **two options**:

**Option 1: Custom SVG icons** (from `src/icons/`)

```astro
<Icon name="arrow" size={24} />  <!-- Uses src/icons/arrow.svg -->
<Icon name="partners/tesla" size={80} />  <!-- Uses src/icons/partners/tesla.svg -->
```

**Option 2: Iconify icons** (from iconify.design)

```astro
---
import { Icon } from '@iconify-icon/react';
---
<Icon icon="mdi:instagram" client:only="react" width={24} height={24} />
```

#### In React Components (`.tsx` files)

**Option 1: Iconify icons** (recommended)

```tsx
import { Icon } from "@iconify-icon/react";

<Icon icon="mdi:whatsapp" width={24} height={24} />;
```

**Option 2: Custom React icons**

1. Add your SVG component to `src/icons/react-use/icons-for-react.tsx`:

```tsx
export const MyCustomIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props}>{/* your SVG paths */}</svg>
);
```

2. Import and use:

```tsx
import { MyCustomIcon } from "@/icons/react-use/icons-for-react";

<MyCustomIcon width={50} height={50} className="text-foreground" />;
```

---

### Asset Organization

**Project Images** → `src/assets/projects/`

- Optimized by Astro image service
- Used in project content collections
- Example: `src/assets/projects/residential-home.webp`

**Service/Section Images** → `public/images/`

- Static files served as-is
- Used in services, hero sections, etc.
- Example: `public/images/services/panels-one.webp`

**Videos** → `public/videos/`

- Background videos for hero sections
- Example: `public/videos/video5.mp4`

**Partner Logos** → `src/icons/`

- SVG format (used via `astro-icon`)
- Referenced in `Partners.astro` component
- Example: `src/icons/panel.svg`

---

## 📚 Resources

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Resend API Docs](https://resend.com/docs)

---

**Built with ❤️ using Astro, React, and Tailwind CSS**

---

## 🖥️ System Requirements

- Node.js `>= 18.14.1`
- npm `>= 9.0.0`
- Operating systems: Windows, macOS, Linux
- Development server: `http://localhost:4321`
- Optional services for production features:
  - Resend account and verified sender for email delivery
  - Upstash Redis account for rate limiting

---

## ❗ Known Limitations

- Contact form runs in demo mode until environment variables are configured (`.env`).
- Upstash free tier limits:
  - 10,000 commands per day
  - 25 MB storage
- Some GSAP animations rely on client-only APIs; SSR guards are applied to prevent server execution.

---

## 📞 Support

For support or licensing inquiries, contact: `aguscastets@gmail.com`.
