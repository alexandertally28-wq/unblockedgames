import React, { useRef, useState } from 'react';
import { 
  X, 
  RotateCcw, 
  Maximize2, 
  ExternalLink, 
  Bookmark, 
  HelpCircle,
  Volume2,
  Share2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function GamePlayer({
  game,
  onClose,
  isFavorite,
  onToggleFavorite
}) {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [showControls, setShowControls] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const handlePopout = () => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${game.title} - Unblocked</title>
            <style>
              body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
              iframe { border: none; width: 100%; height: 100%; }
            </style>
          </head>
          <body>
            <iframe src="${game.iframeSrc}" allow="fullscreen; autoplay; gamepad"></iframe>
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4">
      <div 
        ref={containerRef}
        className="w-full max-w-5xl h-[92vh] max-h-[850px] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Game Player Header */}
        <div className="h-14 bg-slate-950 px-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ 
                backgroundColor: `${game.accentColor || '#06b6d4'}22`,
                color: game.accentColor || '#38bdf8' 
              }}
            >
              {game.title.charAt(0)}
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                {game.title}
                <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                  {game.category}
                </span>
              </h2>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReload}
              title="Reload Game"
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleFavorite(game.id)}
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              className={`p-2 rounded-lg border transition-colors ${
                isFavorite 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                  : 'text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border-slate-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handlePopout}
              title="Open in Stealth Popout (about:blank)"
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={handleFullscreen}
              title="Toggle Fullscreen Game"
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowControls(prev => !prev)}
              title="Toggle Controls Guide"
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              title="Close (Esc)"
              className="p-2 text-slate-400 hover:text-rose-400 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Game Iframe Viewport */}
        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src={game.iframeSrc}
            title={game.title}
            className="w-full h-full border-none"
            allow="fullscreen; autoplay; gamepad; keyboard"
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
          />
        </div>

        {/* Bottom Controls Cheat Sheet */}
        {showControls && (
          <div className="bg-slate-950 border-t border-slate-800 px-4 py-3 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-300">Controls:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {game.controls && game.controls.map((ctrl, i) => (
                    <span key={i} className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono text-[11px]">
                      {ctrl}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-slate-500 text-[11px] font-mono">
                Source: <span className="text-cyan-400 font-semibold">{game.iframeSrc}</span> (JSON Iframe Config)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
