import React from 'react';
import { 
  Gamepad2, 
  Globe, 
  Bookmark, 
  ShieldAlert, 
  Plus, 
  Search, 
  Maximize2, 
  Minimize2,
  SlidersHorizontal
} from 'lucide-react';

export default function Navbar({
  activeView,
  setActiveView,
  searchQuery,
  setSearchQuery,
  onOpenAddModal,
  onOpenStealthModal,
  favoritesCount,
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
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => setActiveView('games')} 
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:scale-105 transition-all">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-base">NEXUS</span>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/60 uppercase tracking-widest">
                UNBLOCKED
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono -mt-0.5">Games & Browser Hub</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, genres, or tags..."
              className="w-full bg-slate-900/90 text-sm text-slate-200 placeholder-slate-500 pl-9 pr-4 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Navigation Switcher */}
        <nav className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800/80">
          <button
            onClick={() => setActiveView('games')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeView === 'games'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Games</span>
          </button>

          <button
            onClick={() => setActiveView('browser')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeView === 'browser'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Browser</span>
          </button>

          <button
            onClick={() => setActiveView('favorites')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeView === 'favorites'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Favorites</span>
            {favoritesCount > 0 && (
              <span className="text-[10px] bg-slate-800 text-cyan-400 font-bold px-1.5 py-0.2 rounded-full">
                {favoritesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Add Custom Game Button */}
          <button
            onClick={onOpenAddModal}
            title="Add Custom Iframe Game"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add Game</span>
          </button>

          {/* Stealth & Cloak settings */}
          <button
            onClick={onOpenStealthModal}
            title="Tab Cloak & Stealth Settings"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-800/40 rounded-lg transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Stealth</span>
          </button>

          {/* Panic Key indicator */}
          <button
            onClick={onTriggerPanic}
            title={`Press [${panicKey.toUpperCase()}] at any time to instantly cloak`}
            className="hidden lg:flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-rose-300 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/40 rounded-md transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span>[{panicKey.toUpperCase()}] Panic</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="px-4 pb-2.5 md:hidden">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search games or tags..."
            className="w-full bg-slate-900 text-sm text-slate-200 placeholder-slate-500 pl-9 pr-4 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500/80"
          />
        </div>
      </div>
    </header>
  );
}
