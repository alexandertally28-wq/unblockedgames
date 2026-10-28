import React, { useRef, useState } from 'react';
import { 
  X, 
  RotateCcw, 
  Maximize2, 
  ExternalLink, 
  HelpCircle,
  Zap,
  Globe,
  Monitor
} from 'lucide-react';

export default function GamePlayer({
  game,
  onClose
}) {
  const containerRef = useRef(null);
  const [sourceMode, setSourceMode] = useState('embed'); // 'embed' | 'native'
  const [iframeKey, setIframeKey] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const activeSrc = (sourceMode === 'native' && game.fallbackSrc)
    ? game.fallbackSrc
    : game.iframeSrc;

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
              body, html { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#000; }
              iframe { border:none; width:100%; height:100%; }
            </style>
          </head>
          <body>
            <iframe src="${activeSrc}" allow="fullscreen; autoplay; gamepad; keyboard" allowfullscreen></iframe>
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
        {/* Player Header */}
        <div className="h-14 bg-slate-950 px-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
              {game.category === 'Web Proxy' ? <Globe className="w-4 h-4" /> : <Zap className="w-4 h-4 fill-current" />}
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                {game.title}
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                  {game.badge || game.category}
                </span>
              </h2>
            </div>
          </div>

          {/* Source Mode Switcher (if fallback available) */}
          {game.fallbackSrc && (
            <div className="hidden sm:flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setSourceMode('embed')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  sourceMode === 'embed'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>Online Embed</span>
              </button>

              <button
                onClick={() => setSourceMode('native')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  sourceMode === 'native'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-3 h-3" />
                <span>Built-in Engine</span>
              </button>
            </div>
          )}

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReload}
              title="Reload Frame"
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
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
              title="Fullscreen Game"
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

        {/* Game Iframe Viewport */}
        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
          <iframe
            key={iframeKey}
            src={activeSrc}
            title={game.title}
            className="w-full h-full border-none bg-black"
            allow="fullscreen; autoplay; gamepad; keyboard"
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
            allowFullScreen
          />
        </div>

        {/* Footer info bar */}
        {showControls && (
          <div className="bg-slate-950 border-t border-slate-800 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">Instructions:</span>
              <span className="text-slate-400 font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {game.controls.join(' · ')}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
              <a 
                href={game.originalUrl || game.iframeSrc} 
                target="_blank" 
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Direct Site ({game.title})</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>·</span>
              <span>Iframe JSON Registered</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
