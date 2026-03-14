import { Dashboard } from "@/components/dashboard/dashboard";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold text-warm-900">
          Wind Generation Dashboard
        </h2>
        <p className="text-sm text-warm-500 mt-1">
          UK national wind power: actuals vs forecasts for January 2024
        </p>
      </div>
      <Dashboard />
    </div>
  );
}
