# VanhCorp - Next.js Implementation

A modern CRM system for AI transformation sales teams built with Next.js 14, Tailwind CSS, and Shadcn/ui.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Components:** Shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Charts:** Recharts
- **TypeScript:** Full type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Dashboard:** AI Transformation Score, stats cards, charts, insights panel
- **Leads Management:** Table with search, filtering, scoring, CRUD operations
- **Deals Pipeline:** Kanban-style board with drag-and-drop
- **Contacts:** Contact cards with quick actions
- **Activities:** Task timeline with status tracking
- **Reports:** Analytics and data visualization
- **Settings:** User profile and team management

## Project Structure

```
crm_project/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/        # Dashboard routes
│   │   ├── leads/         # Leads module
│   │   ├── contacts/      # Contacts module
│   │   ├── deals/         # Deals module
│   │   ├── activities/    # Activities module
│   │   ├── reports/       # Reports module
│   │   └── settings/      # Settings module
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Shadcn/ui components
│   ├── layout/            # Layout components
│   ├── dashboard/         # Dashboard-specific components
│   ├── leads/             # Leads components
│   ├── deals/             # Deals components
│   └── shared/            # Shared components
├── lib/                   # Utilities and mock data
├── types/                 # TypeScript definitions
└── package.json
```

## Design System

- **Primary:** Indigo (#6366F1)
- **CTA:** Emerald (#10B981)
- **Typography:** Poppins (headings) + Open Sans (body)
- **Style:** Vibrant & Block-based
