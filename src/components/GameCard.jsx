import React from 'react';
import { Star, Play, Bookmark, Sparkles } from 'lucide-react';

export default function GameCard({
  game,
  onPlay,
  isFavorite,
  onToggleFavorite
}) {
  return (
    <div 
      onClick={() => onPlay(game)}
      className="group relative flex flex-col bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-cyan-950/20 cursor-pointer"
    >
      {/* Visual Header / Banner */}
      <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden flex items-center justify-center border-b border-slate-800/60">
        {/* Abstract Game Icon / Visual Preview */}
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black transition-transform duration-300 group-hover:scale-110"
          style={{ 
            backgroundColor: `${game.accentColor || '#06b6d4'}18`,
            border: `1.5px solid ${game.accentColor || '#06b6d4'}44`,
            color: game.accentColor || '#38bdf8'
          }}
        >
          {game.title.charAt(0)}
        </div>

        {/* Play Overlay Hover Icon */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
          <div className="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-cyan-500/40 scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Favorite Star Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(game.id);
          }}
          title={isFavorite ? "Remove from Favorites" : "Save to Favorites"}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg border backdrop-blur-md transition-colors ${
            isFavorite 
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
              : 'bg-slate-900/60 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Subtle Category Kicker on Image */}
        <div className="absolute bottom-2.5 left-2.5 text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800/80">
          {game.category}
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-bold text-slate-100 text-base group-hover:text-cyan-400 transition-colors line-clamp-1">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 shrink-0">
            <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>{game.rating || 4.8}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3 flex-1">
          {game.description}
        </p>

        {/* Metadata stats with zero-pill discipline (clean text + separators) */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-2.5 border-t border-slate-800/60">
          <span>{game.plays ? `${game.plays.toLocaleString()} plays` : 'Verified HTML5'}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Iframe Sandbox</span>
          {game.badge && (
            <>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-cyan-400 font-semibold">{game.badge}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
