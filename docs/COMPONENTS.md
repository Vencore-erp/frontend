# Component Library & Design System

## Design Philosophy: "Institutional Modernism"
The UI is designed to convey stability, trust, and precision. It draws inspiration from financial terminals (Bloomberg, Aladdin) and modern enterprise tools (Linear, Stripe).

### Color Palette
*   **Midnight Slate (`#0B1120`)**: Primary navigation and headers. Represents authority.
*   **Regal Blue (`#0052CC`)**: Primary actions and active states. Represents trust.
*   **Cool Grey (`#F8FAFC`)**: Backgrounds. Reduces eye strain.
*   **Emerald (`#10B981`)** / **Rose (`#F43F5E`)**: Semantic colors for positive/negative financial states.

### Typography
*   **Inter (Sans-serif)**: Primary UI text.
*   **Geist Mono / Monospace**: Used strictly for **Financial Figures**, **Dates**, and **IDs** (PR-2026-001) to ensure tabular alignment.

---

## Core Components

### 1. DataTable (`components/ui/data-table.tsx`)
A powerful, high-density table component built for financial datasets.
*   **Features:** Pagination, Sorting, Row Linking.
*   **Usage:** Used in almost every list view (PR List, Invoice List).

### 2. StatusBadge (`components/ui/status-badge.tsx`)
Standardized indicator for document statuses.
*   **Variants:** 
    *   `APPROVED`, `COMPLETED`: Green
    *   `PENDING`, `OPEN`: Blue/Gray
    *   `REJECTED`, `BLACKLISTED`: Red
    *   `WARNING`, `RISK_HIGH`: Amber
*   **Usage:** `<StatusBadge status="PENDING" />`

### 3. Sidebar (`components/layout/Sidebar.tsx`)
Role-aware navigation menu.
*   **Logic:** Accepts a `role` prop to render different menu items for Operators vs. Vendors.

### 4. CardSpotlight (`components/ui/card-spotlight.tsx`)
Interactive dashboard cards with a subtle spotlight hover effect. Used for KPIs.

---

## Icons
We use **Lucide React** for all iconography. Icons should be used sparingly and consistently (e.g., `FileText` for documents, `Users` for vendors).
