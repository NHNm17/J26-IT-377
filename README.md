# AIMS Fabric Monitoring & Decision Support Dashboard
**Automated Apparel Fabric Differentiation System (AIMS)**  
**Group:** J26-IT-377  
**Module Owner:** Member 4 (IT23362512 — Wasana Lakmini)  
**Deliverable:** Frontend Monitoring & Decision Support Platform (Frontend Only)

---

## 1. Overview & System Design

This dashboard is built strictly according to the specifications in `lakminiPrompts.pdf` and the visual reference layouts:
- **Reference 1 (4inlab Quality Dashboard):** Dark industrial navy theme, circular quality yield gauges, dynamic summary cards, recent inspection records table.
- **Reference 2 (Smartex Inspection View):** Fabric weave inspection frame, interactive defect bounding box overlays (holes, tears, stains, wrinkles), weave coordinate axes, and multi-lighting mode toggles (Standard / Top Light / Infrared).
- **Reference 3 (FLIR + Neurala Surface Inspection):** Fabric class distribution donut with central count, class breakdown badges, and dynamic material categorization.
- **Reference 4 (Inspection History Analytics):** Searchable and sortable history data table, date and defect status filtering, batch distribution analytics, and client-side CSV report export.

---

## 2. Strict Engineering Compliance ("DO NOT HALLUCINATE")

1. **No Fake Live Hardware Claims:** No invented live hardware claims.
2. **Dedicated Data Source File:** All records are read directly from `src/data/fabricData.ts`.
3. **No Fabricated Totals:** All metrics (Total Processed, Classified, Defect Flagged, Awaiting Results, Classification Rate, Yield) are computed strictly from array records (`records.length`, `filter()`).
4. **Correct Sensor Labeling:** DHT11 sensor readings are strictly labeled as **"Ambient Temperature & Humidity"** (environmental chamber conditions, not fabric internal moisture).
5. **Defect & Missing Result Honesty:** Samples without defect findings clearly distinguish between `Passed (No Defect)`, `Defect result unavailable`, and `Pending AI`.
6. **Confidence Values:** Confidence percentages are only displayed when provided in the record payload.

---

## 3. Technology Stack

- **Framework:** React 18 + TypeScript
- **Bundler & Dev Server:** Vite 6
- **Styling:** Tailwind CSS (custom industrial color palette: navy, slate, cyber blue, caution amber, emerald green, coral red)
- **Icons:** Lucide React
- **Data Architecture:** Decoupled `dataService` reading from `fabricData.ts` and prepared for direct REST integration with Member 2 (`/api/latest-readings`, `/api/history`).

---

## 4. Project Structure

```
├── src/
│   ├── components/
│   │   ├── history/
│   │   │   └── HistoryView.tsx             # History table, filters, batch charts & CSV export
│   │   ├── inspection/
│   │   │   └── FabricInspectionView.tsx    # Fabric image viewer, defect overlays, sensors & AI results
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx                 # Industrial sidebar navigation
│   │   │   └── TopHeader.tsx               # Top bar with AIMS branding, group ID, and system clock
│   │   ├── overview/
│   │   │   ├── CircularGauge.tsx           # Industrial progress ring (4inlab style)
│   │   │   ├── FabricTypeDistribution.tsx  # Fabric class donut chart (FLIR style)
│   │   │   ├── OverviewView.tsx            # Operational overview dashboard
│   │   │   └── RecentInspectionsTable.tsx  # Recent records table
│   │   └── status/
│   │       └── SystemStatusView.tsx        # Pipeline architecture & verified JSON schema inspector
│   ├── data/
│   │   └── fabricData.ts                   # Realistic fabric inspection dataset
│   ├── services/
│   │   └── dataService.ts                  # Query, filtering, and metric calculation engine
│   ├── styles/
│   │   └── index.css                       # Tailwind directives, industrial scrollbars, and grid background
│   ├── types/
│   │   └── inspection.ts                   # Strict TypeScript contracts for sensors & AI outputs
│   ├── App.tsx                             # Main workspace container & tab navigation
│   └── main.tsx                            # React DOM entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 5. How to Run the Project

### Prerequisites
- Node.js (v18+ or v24+)
- npm

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Start local Vite development server
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Verification & Test Checklist (60% Viva Readiness)

- [x] **Calculations from records:** Totals dynamically update from `src/data/fabricData.ts`.
- [x] **No Demo Banner:** Header displays clean industrial system status without demo alerts.
- [x] **Ambient Sensor Labeling:** DHT11 explicitly labeled as ambient chamber temp/hum.
- [x] **Multi-Sensor Telemetry:** TCS3200 (R, G, B, Clear), FDC1004 (pF capacitance), DHT11 displayed.
- [x] **Defect Bounding Box Overlays:** Visual toggle for anomaly bounding boxes with confidence scores.
- [x] **Lighting Modes:** Standard, Top Light, and Infrared simulated view modes.
- [x] **Search & Filters:** Search by Sample ID, Batch, Status, and Fabric Type.
- [x] **Export CSV:** Instant client-side download of inspection history records.
- [x] **Responsive Industrial UI:** Tested across desktop and mobile viewport breakpoints.
