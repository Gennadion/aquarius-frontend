# AquaWise Frontend

A modern frontend project built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Linting:** ESLint

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
aquawise-frontend/
├── public/                    # Static assets
│   ├── fonts/                 # Custom fonts
│   └── images/                # Images and icons
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/                # UI primitives (Button, Input, etc.)
│   │   └── layout/            # Layout components (Header, Footer, etc.)
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions and libraries
│   ├── services/              # API service functions
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Helper utilities
├── .gitignore
├── next.config.js             # Next.js configuration
├── package.json
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── README.md
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)


