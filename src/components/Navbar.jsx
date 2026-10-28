import React from 'react';
import { 
  Globe, 
  ShieldAlert, 
  Maximize2, 
  Minimize2,
  ShieldCheck,
  Lock
} from 'lucide-react';

export default function Navbar({
  onOpenStealthModal,
  panicKey,
  onTriggerPanic
}) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-base">NEXUS</span>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/60 uppercase tracking-widest">
                UNBLOCK BROWSER
              </span>
            </div>
          </div>
        </div>

        {/* Center Sandbox Status Badge */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="font-medium text-slate-300">Sandbox Isolation Active</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-[11px] font-mono text-cyan-400">Multi-Tab Engine</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Stealth & Cloak settings */}
          <button
            onClick={onOpenStealthModal}
            title="Tab Cloak & Stealth Settings"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-800/50 rounded-lg transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Tab Stealth</span>
          </button>

          {/* Panic Key trigger */}
          <button
            onClick={onTriggerPanic}
            title={`Press [${panicKey.toUpperCase()}] at any time to instantly cloak`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium text-rose-300 bg-rose-950/40 hover:bg-rose-950/80 border border-rose-900/50 rounded-lg transition-colors cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span>[{panicKey.toUpperCase()}] Panic</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
