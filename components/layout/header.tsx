import { Wind } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-cream-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-sm">
            <Wind className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-warm-900 leading-tight">
              4castPro
            </h1>
            <p className="text-xs text-warm-500 leading-tight hidden sm:block">
              UK Wind Power Forecast Monitor
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-warm-400 hidden sm:inline">
            Data: BMRS Elexon
          </span>
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>
    </header>
  );
}
