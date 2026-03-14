# 4castPro (UK Wind Power Forecast Monitor App)

A Next.js dashboard for visualising UK national wind power generation, comparing actuals vs. forecasts for January 2024 using data from the Elexon BMRS API.

**Live App:** [https://4cast-pro.vercel.app/](https://4cast-pro.vercel.app/)

---

## Project Structure

```
4castPro/
├── app/                        # Next.js App Router
│   ├── api/
│   │   ├── actuals/route.ts    # API route – fetches actual wind generation data
│   │   └── forecasts/route.ts  # API route – fetches wind forecast data
│   ├── globals.css             # Global styles (Tailwind CSS)
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page – renders the dashboard
│   └── providers.tsx           # React Query and other providers
│
├── components/
│   ├── dashboard/
│   │   ├── chart-section.tsx   # Chart container/section wrapper
│   │   ├── chart-tooltip.tsx   # Custom tooltip for Recharts
│   │   ├── control-panel.tsx   # Dashboard controls (date range, horizon)
│   │   ├── dashboard.tsx       # Main dashboard component
│   │   ├── date-range-picker.tsx # Date range selector
│   │   ├── horizon-slider.tsx  # Forecast horizon slider
│   │   ├── stats-cards.tsx     # Summary statistic cards
│   │   └── wind-chart.tsx      # Wind generation line/area chart
│   ├── layout/
│   │   ├── footer.tsx          # App footer
│   │   └── header.tsx          # App header/navbar
│   └── ui/                     # Reusable UI primitives (Button, Card, Calendar, etc.)
│
├── hooks/
│   ├── use-chart-data.ts       # Hook for transforming data for charts
│   └── use-wind-data.ts        # Hook for fetching wind data via React Query
│
├── lib/
│   ├── api-client.ts           # HTTP client for Elexon API calls
│   ├── chart-config.ts         # Recharts configuration and theme
│   ├── constants.ts            # App-wide constants
│   ├── data-transforms.ts      # Data processing and transformation utilities
│   ├── forecast-logic.ts       # Forecast horizon selection and error calculation
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # General utility functions
│
├── notebooks/
│   ├── forecast_error_analysis.ipynb   # Jupyter notebook – forecast accuracy analysis
│   ├── wind_reliability_analysis.ipynb # Jupyter notebook – wind reliability & variability
│   └── requirements.txt               # Python dependencies for notebooks
│
├── public/                     # Static assets
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── postcss.config.mjs          # PostCSS / Tailwind configuration
├── eslint.config.mjs           # ESLint configuration
├── package.json                # Node.js dependencies and scripts
└── README.md
```

## Notebooks

### 1. Forecast Error Analysis (`forecast_error_analysis.ipynb`)

Analyses Elexon wind forecast accuracy across multiple horizons (1h-48h), computing MAE/RMSE/MAPE metrics and visualising error distributions, bias, and time-of-day patterns.

### 2. Wind Reliability Analysis (`wind_reliability_analysis.ipynb`)

Examines GB wind generation reliability/variability, duration curves, capacity factors, ramp rates, hourly patterns, and recommends a p10 firm contribution level for capacity planning.

---

## Prerequisites

- **Node.js** >= 18
- **npm** (comes with Node.js)
- **Python** >= 3.9 (only needed for the Jupyter notebooks)

## Getting Started

### Web Application

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Other commands

| Command         | Description                  |
|-----------------|------------------------------|
| `npm run build` | Create a production build    |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint                   |

### Jupyter Notebooks

```bash
# 1. Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

# 2. Install Python dependencies
pip install -r notebooks/requirements.txt

# 3. Launch Jupyter
jupyter notebook notebooks/
```

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Charts:** Recharts
- **Data Fetching:** TanStack React Query
- **UI Primitives:** Radix UI
- **Data Source:** Elexon BMRS API (UK wind generation & forecasts)
- **Notebooks:** Python, pandas, matplotlib, seaborn

## Deployment

The app is deployed on Vercel: [https://4cast-pro.vercel.app/](https://4cast-pro.vercel.app/)

---

## AI Tools Usage

This project was built with assistance from Claude. Claude was used as an AI assistant during development primarily to speed up repetitive and boilerplate-heavy tasks.

Having prior experience with Next.js and the React ecosystem, I was already familiar with the framework and overall architecture. However, setting up all the boilerplate manually, component scaffolding, API routes, Tailwind/Radix UI primitives, provider wiring, and TypeScript types can be quite time-consuming. To accelerate the setup process, I used Claude to help generate the initial scaffolding such as layout components, dashboard UI, API route handlers, custom hooks, and configuration files.

For the core features, I first researched and designed the approach myself particularly around the Elexon BMRS API integration, forecast horizon selection logic, and the data transformation pipeline for comparing actuals vs. forecasts. After deciding on the data flow and visualisation strategy, I worked with Claude to implement optimised versions of the data processing utilities, chart configurations, and the forecast error calculation logic.

Claude was also used to help generate the Jupyter notebooks for the analytical side of the project. I defined the analysis goals (forecast error metrics across horizons, reliability/variability assessment, capacity factor analysis) and the notebook structure, and Claude produced the data fetching, computation, and visualisation code which I then reviewed and adjusted where necessary.

Overall, Claude functioned as a productivity assistant that handled repetitive tasks efficiently. However, no code was accepted blindly, every generated piece of code was carefully reviewed by me line by line, and several parts were modified or refined to ensure correctness, clarity, and alignment with the intended architecture.
