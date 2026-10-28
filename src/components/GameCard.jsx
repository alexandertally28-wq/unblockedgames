import React from 'react';
import { Play, Star, ExternalLink, Zap } from 'lucide-react';

export default function GameCard({
  game,
  onPlay
}) {
  return (
    <div 
      onClick={() => onPlay(game)}
      className="group relative flex flex-col bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-2xl hover:shadow-cyan-950/30 cursor-pointer max-w-md w-full"
    >
      {/* Banner / Graphic Preview */}
      <div className="relative aspect-[16/9] w-full bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-slate-950 to-slate-900" />
        
        {/* Animated Wave Silhouette */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
            <Zap className="w-8 h-8 fill-current" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400">
            SUPERTRAIN WAVE
          </span>
        </div>

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px] z-20">
          <div className="w-14 h-14 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-xl shadow-cyan-400/40 scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-3 left-3 z-10 text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-800/80">
          {game.badge || 'CrazyGames'}
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-extrabold text-slate-100 text-lg group-hover:text-cyan-400 transition-colors">
              {game.title}
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">CrazyGames Official Iframe Embed</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
            <Star className="w-4 h-4 fill-current text-amber-400" />
            <span>{game.rating}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">
          {game.description}
        </p>

        {/* Controls preview */}
        <div className="text-[11px] text-slate-400 bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5 space-y-1 mb-4">
          <span className="font-semibold text-slate-300 block mb-0.5">How to Play:</span>
          {game.controls.map((ctrl, i) => (
            <div key={i} className="text-slate-400 flex items-center gap-1.5 font-mono text-[10px]">
              <span className="text-cyan-400">▸</span> {ctrl}
            </div>
          ))}
        </div>

        {/* Footer Play Button */}
        <button 
          className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Launch Space Waves</span>
        </button>
      </div>
    </div>
  );
}
