import React from 'react';
import { Play, Star, ExternalLink, Zap, Globe, ShieldCheck } from 'lucide-react';

export default function GameCard({
  game,
  onPlay
}) {
  const isProxy = game.category === 'Web Proxy';

  return (
    <div 
      onClick={() => onPlay(game)}
      className="group relative flex flex-col bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-2xl hover:shadow-cyan-950/30 cursor-pointer w-full"
    >
      {/* Banner / Graphic Preview */}
      <div className="relative aspect-[16/9] w-full bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800/80">
        <div 
          className="absolute inset-0"
          style={{
            background: isProxy
              ? 'radial-gradient(circle at center, rgba(245, 158, 11, 0.15), transparent 70%)'
              : 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15), transparent 70%)'
          }}
        />
        
        {/* Silhouette / Visual Icon */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all shadow-lg"
            style={{
              backgroundColor: isProxy ? 'rgba(245, 158, 11, 0.1)' : 'rgba(6, 182, 212, 0.1)',
              borderColor: isProxy ? 'rgba(245, 158, 11, 0.4)' : 'rgba(6, 182, 212, 0.4)',
              borderWidth: '1.5px',
              color: isProxy ? '#f59e0b' : '#06b6d4'
            }}
          >
            {isProxy ? <Globe className="w-8 h-8" /> : <Zap className="w-8 h-8 fill-current" />}
          </div>
          <span 
            className="text-xs font-mono font-bold tracking-widest uppercase"
            style={{ color: isProxy ? '#f59e0b' : '#06b6d4' }}
          >
            {isProxy ? 'UNBLOCK PROXY' : 'SUPERTRAIN WAVE'}
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
          {game.badge || 'Portal'}
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-extrabold text-slate-100 text-lg group-hover:text-cyan-400 transition-colors">
              {game.title}
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {game.iframeSrc}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
            <Star className="w-4 h-4 fill-current text-amber-400" />
            <span>{game.rating}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">
          {game.description}
        </p>

        {/* Instructions */}
        <div className="text-[11px] text-slate-400 bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5 space-y-1 mb-4">
          <span className="font-semibold text-slate-300 block mb-0.5">Instructions:</span>
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
          <span>Launch {game.title}</span>
        </button>
      </div>
    </div>
  );
}
