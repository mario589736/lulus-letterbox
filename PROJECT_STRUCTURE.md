# Next.js 14 Project Structure

This document outlines the complete structure of the generated Next.js 14 project with TypeScript, Tailwind CSS, and hybrid rendering capabilities.

## Root Directory

```
nextjs-project/
├── next.config.ts              # Next.js configuration with image domains and server settings
├── tailwind.config.js          # Tailwind CSS with custom color palette and fonts
├── next-sitemap.config.js      # SEO sitemap generation configuration
├── tsconfig.json               # TypeScript configuration with path aliases
├── postcss.config.mjs          # PostCSS configuration for Tailwind
├── eslint.config.mjs           # ESLint configuration
├── package.json                # Dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── .gitignore                  # Git ignore rules
├── next-env.d.ts              # Next.js TypeScript declarations
├── README.md                   # Comprehensive project documentation
└── PROJECT_STRUCTURE.md       # This file
```

## Source Directory (`src/`)

```
src/
├── app/
│   └── globals.css             # Global styles with Tailwind imports and custom fonts
├── pages/                      # Pages Router directory
│   ├── _app.tsx               # App component for global layout and CSS imports
│   ├── index.tsx              # Homepage with getStaticProps (SSG)
│   └── profile/
│       └── [id].tsx           # Dynamic user profile with getServerSideProps (SSR)
├── components/                 # Reusable React components
│   ├── SEOHead.tsx            # SEO meta tags and Open Graph component
│   ├── HeroBanner.tsx         # Hero section with next/image optimization
│   └── BlogCard.tsx           # Blog post card component
├── lib/                       # Utility functions and API
│   └── api.ts                 # Mock API functions with simulated delays
└── types/                     # TypeScript type definitions
    └── index.ts               # Interface definitions for BlogPost, User, SEOProps
```

## Public Directory (`public/`)

```
public/
├── favicon.ico                # Site favicon
├── sitemap.xml               # Generated sitemap index
├── sitemap-0.xml             # Generated sitemap with pages
├── robots.txt                # Generated robots.txt for SEO
└── [other static assets]     # SVG icons and images
```

## Generated Directories

```
.next/                         # Next.js build output (auto-generated)
node_modules/                  # NPM dependencies (auto-generated)
```

## Key Features Implemented

### 1. Hybrid Rendering
- **Static Generation (SSG)**: `pages/index.tsx` uses `getStaticProps`
- **Server-Side Rendering (SSR)**: `pages/profile/[id].tsx` uses `getServerSideProps`
- **Incremental Static Regeneration (ISR)**: Homepage revalidates every 24 hours

### 2. SEO Optimizations
- **Dynamic Meta Tags**: `components/SEOHead.tsx` with Open Graph and Twitter Card support
- **Sitemap Generation**: Automatic via `next-sitemap` with `postbuild` script
- **Robots.txt**: Auto-generated for search engine crawling
- **Canonical URLs**: Proper URL structure for SEO

### 3. Image Optimization
- **Next.js Image Component**: Used in `HeroBanner.tsx` and `BlogCard.tsx`
- **Priority Loading**: Hero images load with priority
- **Responsive Sizing**: Proper sizes attribute for responsive images
- **External Domain Support**: Configured for picsum.photos and other image services

### 4. Tailwind CSS Setup
- **Custom Color Palette**: Primary, secondary, and accent color schemes
- **Custom Fonts**: Inter for sans-serif, Fira Code for monospace
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Component Styling**: Modern card layouts and gradient effects

### 5. TypeScript Configuration
- **Strict Mode**: Full type checking enabled
- **Path Aliases**: `@/*` for clean imports
- **Interface Definitions**: Proper typing for all data structures
- **Component Props**: Fully typed React components

## Data Flow

### Static Site Generation (SSG)
```
Build Time → fetchBlogPosts() → getStaticProps → Static HTML
```

### Server-Side Rendering (SSR)
```
Request → fetchUserById(id) → getServerSideProps → Dynamic HTML
```

### Client-Side Navigation
```
User Click → Next.js Router → Prefetched Pages → Instant Navigation
```

## Build Process

1. **Development**: `npm run dev` - Hot reloading with Turbopack
2. **Production Build**: `npm run build` - Optimized build with SSG/SSR
3. **Sitemap Generation**: Automatic via `postbuild` hook
4. **Production Server**: `npm run start` - Server for SSR pages
5. **Static Export**: `npm run export` - For static hosting (converts SSR to CSR)

## Mock Data Structure

### Blog Posts
- 3 sample blog posts with realistic content
- Authors, publication dates, and featured images
- Proper slugs for URL structure

### Users
- 3 user profiles with avatars and bios
- Associated blog posts per author
- Realistic join dates and statistics

### API Simulation
- Artificial delays (300-500ms) for realistic loading
- Error handling for missing users
- Proper TypeScript return types

## Performance Features

- **Image Optimization**: Automatic WebP conversion and sizing
- **Code Splitting**: Automatic by Next.js
- **Pre-rendering**: Static pages for better performance
- **Font Optimization**: Google Fonts with display swap
- **Bundle Analysis**: Available via Next.js built-in analyzer

## SEO Features

- **Meta Tags**: Title, description, Open Graph, Twitter Cards
- **Structured Data**: Proper semantic HTML structure
- **Sitemap**: XML sitemap with proper priority and change frequency
- **Robots.txt**: Search engine crawling instructions
- **Canonical URLs**: Prevent duplicate content issues

This project demonstrates modern Next.js development practices with proper separation of concerns, type safety, and production-ready optimizations. 