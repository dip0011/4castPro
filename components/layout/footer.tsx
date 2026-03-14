export function Footer() {
  return (
    <footer className="border-t border-cream-200 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-warm-400">
          4castPro (UK Wind Power Forecast Monitor)
        </p>
        <p className="text-xs text-warm-400">
          Data sourced from BMRS Elexon API &bull; January 2024
        </p>
      </div>
    </footer>
  );
}
