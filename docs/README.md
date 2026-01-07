# NEXUS PROCURA Frontend Documentation

## Overview
**NEXUS PROCURA** is an enterprise-grade e-Procurement ERP system tailored for the Indonesian banking sector. This frontend application serves as the primary interface for all stakeholders (Operators, Supervisors, Finance, Vendors, and Admins).

The application is built with **Next.js 14 (App Router)** and follows a strict "Institutional Modernism" design language to ensure clarity, trust, and efficiency in high-stakes financial workflows.

## Technology Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Components:** Custom "Institutional" Design System (Radix UI primitives compatible)
- **Charts:** Recharts (Mockups implemented)
- **State Management:** React Hooks / URL Search Params (for demo state)

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
npm install
```

### Running Development Server
```bash
npm run dev
```
Access the application at `http://localhost:3000`.

## Key Features
1.  **Role-Based Access Control (RBAC):** Distinct dashboards and route protection for Operator, Supervisor, Finance, Admin, and Vendor.
2.  **Procure-to-Pay Workflow:** Full cycle support from PR -> RFQ -> PO -> GR -> Invoice -> Payment.
3.  **High-Density Data Tables:** Optimized for financial data with sorting, filtering, and status badges.
4.  **Institutional Design:** High-contrast, accessibility-focused UI processing heavy data loads without visual clutter.

## Documentation Index
- [Architecture Guide](./ARCHITECTURE.md) - Project structure, routing strategy, and layouts.
- [Component Library](./COMPONENTS.md) - Guide to shared UI components and design tokens.
- [Page Directory](./PAGES.md) - Inventory of all implemented routes and their functions.
