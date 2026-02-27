# Component Documentation

Comprehensive reference for all components in the **CIPRES Template**. Components are organized by their directory structure for easy navigation.

---

## Table of Contents

1. [Common Components](#common-components)
2. [UI Components](#ui-components)
   - [Accordion](#accordion)
   - [Buttons](#buttons)
   - [Cards](#cards)
   - [Navigation](#navigation)
3. [Section Components](#section-components)
   - [Home Sections](#home-sections)
   - [About Sections](#about-sections)
   - [Contact Sections](#contact-sections)
   - [Projects Sections](#projects-sections)
4. [Component Patterns](#component-patterns)

---

## Common Components

Located in `src/components/common/`. These are universal utility components used across the entire application.

### `BaseHead.astro`
**Location:** `src/components/common/BaseHead.astro`

SEO meta tags component for the `<head>` element. Handles title, description, keywords, and Open Graph tags.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Page title |
| `description` | `string` | Meta description |
| `keywords` | `string` | SEO keywords (optional) |

### `BreadCrumb.astro`
**Location:** `src/components/common/BreadCrumb.astro`

Breadcrumb navigation to show the current page hierarchy.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `items` | `Array<{label: string, href?: string}>` | List of breadcrumb items |

### `Cta.astro`
**Location:** `src/components/common/Cta.astro`

Large call-to-action section with a solar panel icon graphic, heading, and action button. Used at the bottom of major pages.

### `CtaSlug.astro`
**Location:** `src/components/common/CtaSlug.astro`

A compact Call-to-Action box used in specific content areas (e.g., blog posts, dynamic pages).

**Features:**
- Centered layout with title and description
- Two action buttons: "Contact us" (solid) and "See Projects" (outline)
- Fully localized text using `t()`

### `Footer.astro`
**Location:** `src/components/common/Footer.astro`

Global site footer containing navigation links, social media icons, and copyright information.

### `Heading.astro`
**Location:** `src/components/common/Heading.astro`

Standardized section eyebrow heading. Displays styled text with a rotated arrow icon.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `heading` | `string` | The text to display |

### `LoadingScreen.tsx`
**Location:** `src/components/common/LoadingScreen.tsx`

React component that displays an initial loading animation. It waits for the hero video to load (or a timeout) before sliding up to reveal the content.

---

## UI Components

Located in `src/components/ui/`. Reusable interface elements.

### Accordion
**Location:** `src/components/ui/accordion/Accordion.tsx`

Interactive FAQ styled accordion.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `items` | `Array<{question: string, answer: string}>` | List of FAQ items |

---

### Buttons
**Location:** `src/components/ui/buttons/`

#### `Button.astro`
Polymorphic button component supporting both `<button>` and `<a>` tags.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'solid' \| 'outline'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon' \| 'none'` | `'none'` | Size preset |
| `href` | `string` | `undefined` | If set, renders as `<a>` |
| `group` | `boolean` | `false` | Enables group hover states |

---

### Cards
**Location:** `src/components/ui/cards/`

#### `ProjectCard.astro`
Displays a project thumbnail with a hover overlay showing details and a "View" button.
**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `project` | `CollectionEntry<'projects'>` | Project data object |
| `size` | `'large' \| 'small'` | Size variant |

#### `SocialCard.astro`
A link card displaying a social media icon and label.
**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `href` | `string` | URL |
| `icon` | `string` | Iconify icon name |
| `label` | `string` | Display text |

---

### Navigation
**Location:** `src/components/ui/nav/`

#### `Navbar.astro`
The main fixed navigation bar. Implements a scroll-aware generic animation that compacts the navbar after scrolling down.

#### `FullscreenMenu.tsx`
A React overlay menu filling the screen when the mobile toggle or menu button is clicked. Features GSAP staggered animations for menu items.

---

## Section Components

Located in `src/components/sections/`. Large, page-specific layout blocks.

### Home Sections
**Location:** `src/components/sections/home/`

#### `HeroSection.astro`
Full-viewport hero area with background video, overlay text, and animated entrance effects.

#### `Partners.astro`
Grid display of partner or client logos.

#### `OurProjects.astro`
Displays a grid of featured projects using `ProjectCard`.

#### `chose-us/`
- **`ChoseUs.astro`**: Main section wrapper for "Why Choose Us".
- **`FeatureCard.astro`**: **Moved here from UI**. Displays a single feature with icon, title, and description. Supports `default` (clean) and `accent` (dashed border) variants.
- **`FeatureCardMobile.tsx`**: React version of the feature card optimized for mobile interactions or carousels.

#### `our-service/`
- **`SolarServices.tsx`**: Desktop interactive tabs for switching between service details.
- **`SolarServicesMobile.tsx`**: Mobile-optimized accordion view for services.
- **`OurService.astro`**: Main wrapper that conditionally renders the desktop or mobile version based on viewport (or mounts both with media queries).

#### `testimonials/`
- **`Testimonials.astro`**: Section wrapper with heading and layout.
- **`TestimonialsCarousel.tsx`**: Interactive React carousel to swipe through client testimonials.

#### `work-process/`
- **`WorkProcess.astro`**: Wrapper component.
- **`WorkProcessScroll.tsx`**: Advanced scroll-spy component.
  - **Left Column**: Sticky container showing the active step number and image.
  - **Right Column**: Scrollable list of process descriptions.
  - As the user scrolls the right column, the left column updates to match the visible step.

---

### About Sections
**Location:** `src/components/sections/about/`

- **`HeroSectionAbout.astro`**: Hero section specific to the About page.
- **`CompanyOverview.astro`**: Information block about the company history/mission.
- **`FaqSection.astro`**: Wrapper for the `Accordion` component to display FAQs.

---

### Contact Sections
**Location:** `src/components/sections/contact/`

- **`ContactForm.astro`**: The main container layout for the contact page.
- **`ContactContent.astro`**: Displays contact info (address, phone, email) and social links.
  - *Note: The actual `<form>` logic is internal to `ContactForm.astro`.*

---

### Projects Sections
**Location:** `src/components/sections/projects/`

- **`HeroSectionProjects.astro`**: Hero section for the Projects listing page.
- **`ProjectList.astro`**: Standard grid layout for projects.
- **`ProjectListHover.tsx`**: Interactive list where hovering a project item reveals/updates a floating preview image.

---

## Component Patterns

### Styling & Animation
- **Tailwind CSS v4**: Used for 99% of styling.
- **GSAP**: Used for complex animations (Navbar scroll, Hero entrance, Fullscreen menu, Project hover effects).
- **Class-Variance-Authority (CVA)**: Used in versatile UI components like `Button` and `FeatureCard` to manage style variants.

### Icons
- **Astro Icon**: Used in `.astro` files (e.g., `<Icon name="arrow" />`).
- **Iconify React**: Used in `.tsx` files (e.g., `<Icon icon="mdi:home" />`).

### Data Fetching
- Content is largely driven by `src/config/*.json.ts` files or Astro Content Collections (`src/content/projects`).
- Localization is handled via the `t()` helper function which maps keys to strings in `src/config/labels.ts`.

---

**For more information on configuration and content management, see [README.md](./README.md).**
