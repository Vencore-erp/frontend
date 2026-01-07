# Frontend Architecture Guide

## Project Structure
The project follows the standard **Next.js App Router** structure, organized by Feature Modules.

```
frontend/
├── app/                        # Application Routes (App Router)
│   ├── admin/                  # Admin Module
│   ├── auth/                   # Authentication Module (Login, Register, MFA)
│   ├── finance/                # Finance Module (Invoices, Payments)
│   ├── operator/               # Operator Dashboard
│   ├── procurement/            # Core Procurement (PR, RFQ, PO, GR, Vendors)
│   ├── supervisor/             # Supervisor Dashboard
│   ├── vendor/                 # Vendor Portal Module
│   ├── layout.tsx              # Root Layout
│   └── page.tsx                # Root Redirect
├── components/                 # Shared Components
│   ├── layout/                 # Layout Components (Sidebar, Header)
│   └── ui/                     # UI Primitives (Button, Badge, Table)
├── lib/                        # Utilities (cn, formatters)
└── public/                     # Static Assets
```

## Routing Strategy
We utilize **Route Groups** and **Role-Based Layouts** to manage distinct workspaces.

### Role-Based Layouts
Each major role has its own dedicated workspace. While they verify role permissions (simulated), they share common layout elements like the `<Sidebar />` and `<Header />`.

*   `app/operator/layout.tsx`: Layout for Procurement Operators.
*   `app/supervisor/layout.tsx`: Layout for Approval Supervisors.
*   `app/finance/layout.tsx`: Layout for Finance Officers.
*   `app/vendor/layout.tsx`: Layout for External Vendors (Limited Sidebar).

### Procurement Module Strategy
The `app/procurement/` directory acts as a shared module accessible by multiple internal roles (Operator, Supervisor). It handles the core business entities:
*   `/procurement/pr`: Purchase Requisitions
*   `/procurement/rfq`: Requests for Quotation
*   `/procurement/po`: Purchase Orders
*   `/procurement/gr`: Goods Receipts
*   `/procurement/vendors`: Vendor Master Data

## Data Flow (Mock Implementation)
Currently, the application uses **Hardcoded Mock Data** within the page components to demonstrate high-fidelity UI states. 

**Future Integration Strategy:**
1.  Replace mock arrays with `useQuery` hooks (TanStack Query).
2.  Connect to backend API defined in `API_CONTRACT.md`.
3.  Implement Server Actions for form submissions.

## Design Patterns
*   **Server Components:** Used for Layouts and initial data fetching (simulated).
*   **Client Components:** Used for interactive elements (DataTables, Forms, Charts).
*   **Composition:** Heavy use of reusable `DataTable` and `StatusBadge` to ensure consistency.
