import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar.jsx';
import GameCard from './components/GameCard.jsx';
import GamePlayer from './components/GamePlayer.jsx';
import UnblockBrowser from './components/UnblockBrowser.jsx';
import StealthCloakModal from './components/StealthCloakModal.jsx';
import AddCustomGameModal from './components/AddCustomGameModal.jsx';
import initialGames from './data/games.json';
import { 
  Gamepad2, 
  Sparkles, 
  Dice5, 
  Flame, 
  Layers, 
  Bookmark, 
  Plus, 
  ShieldCheck, 
  ArrowRight,
  Filter
} from 'lucide-react';

const CATEGORIES = ['All', 'Arcade', 'Action', 'Puzzle', 'Retro', 'Sports', 'Casual'];

export default function App() {
  const [activeView, setActiveView] = useState('games'); // 'games' | 'browser' | 'favorites'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState(null);
  
  // Custom games stored in localStorage
  const [customGames, setCustomGames] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nexus_custom_games') || '[]');
    } catch {
      return [];
    }
  });

  // Favorites stored in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('nexus_favorites') || '["snake", "2048", "tetris"]'));
    } catch {
      return new Set(['snake', '2048', 'tetris']);
    }
  });

  // Cloaking & Panic states
  const [stealthModalOpen, setStealthModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentCloak, setCurrentCloak] = useState(() => localStorage.getItem('nexus_cloak') || 'default');
  const [panicKey, setPanicKey] = useState(() => localStorage.getItem('nexus_panic_key') || 'Escape');
  const [panicUrl, setPanicUrl] = useState(() => localStorage.getItem('nexus_panic_url') || 'https://classroom.google.com');

  // Combined games
  const allGames = useMemo(() => {
    return [...customGames, ...initialGames];
  }, [customGames]);

  // Filtered games based on category, search, and view
  const displayedGames = useMemo(() => {
    return allGames.filter(game => {
      // Favorites view check
      if (activeView === 'favorites' && !favorites.has(game.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && game.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = game.title.toLowerCase().includes(q);
        const matchCat = game.category.toLowerCase().includes(q);
        const matchDesc = game.description.toLowerCase().includes(q);
        const matchTags = game.tags?.some(t => t.toLowerCase().includes(q));
        return matchTitle || matchCat || matchDesc || matchTags;
      }

      return true;
    });
  }, [allGames, activeView, selectedCategory, searchQuery, favorites]);

  // Featured games for hero banner
  const featuredGames = useMemo(() => {
    return allGames.slice(0, 4);
  }, [allGames]);

  // Toggle favorite
  const handleToggleFavorite = (gameId) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(gameId)) next.delete(gameId);
      else next.add(gameId);
      localStorage.setItem('nexus_favorites', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  // Add custom game
  const handleAddGame = (newGame) => {
    const updated = [newGame, ...customGames];
    setCustomGames(updated);
    localStorage.setItem('nexus_custom_games', JSON.stringify(updated));
    setSelectedGame(newGame);
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allGames, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "games.json");
    dlAnchorElem.click();
  };

  // Trigger Panic Redirect
  const triggerPanic = () => {
    window.location.replace(panicUrl);
  };

  // Global keydown listener for Panic Key and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === panicKey || (panicKey === 'Escape' && e.key === 'Escape' && !selectedGame && !stealthModalOpen && !addModalOpen)) {
        triggerPanic();
      } else if (e.key === 'Escape' && selectedGame) {
        setSelectedGame(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panicKey, panicUrl, selectedGame, stealthModalOpen, addModalOpen]);

  // Tab cloaking updater
  const handleSelectCloak = (preset) => {
    setCurrentCloak(preset.id);
    localStorage.setItem('nexus_cloak', preset.id);

    // Update document title
    document.title = preset.title;

    // Update favicon
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = preset.icon;
  };

  // Random game picker
  const handleRandomPlay = () => {
    if (allGames.length === 0) return;
    const random = allGames[Math.floor(Math.random() * allGames.length)];
    setSelectedGame(random);
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAddModal={() => setAddModalOpen(true)}
        onOpenStealthModal={() => setStealthModalOpen(true)}
        favoritesCount={favorites.size}
        panicKey={panicKey}
        onTriggerPanic={triggerPanic}
      />

      {/* Main Content Area */}
      {activeView === 'browser' ? (
        <UnblockBrowser />
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8">
          
          {/* Hero Welcome Banner (Only on full library when not searching) */}
          {activeView === 'games' && !searchQuery && selectedCategory === 'All' && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/30 p-6 sm:p-8">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% UNBLOCKED HTML5 ARCADE & BROWSER</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                  High-Performance Games & Sandboxed Web Access
                </h1>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Experience offline-ready iframe games stored in clean JSON configurations with instant controls, zero-latency canvas physics, and stealth tab cloaking.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleRandomPlay}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    <Dice5 className="w-4 h-4" />
                    <span>Play Random Game</span>
                  </button>

                  <button
                    onClick={() => setActiveView('browser')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700/80 transition-all cursor-pointer"
                  >
                    <span>Launch Unblock Browser</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
            {/* Functional Category Buttons (Segmented Controls) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline">
                Genre:
              </span>
              {CATEGORIES.map(category => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Quick stats indicator */}
            <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
              <span>Showing {displayedGames.length} game{displayedGames.length === 1 ? '' : 's'}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400 font-mono">Iframe Engine Ready</span>
            </div>
          </div>

          {/* Games Grid */}
          {displayedGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayedGames.map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlay={setSelectedGame}
                  isFavorite={favorites.has(game.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-200">No Games Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
                {activeView === 'favorites' 
                  ? 'You have not added any games to your favorites yet. Click the bookmark icon on any game card!'
                  : `No games match the query "${searchQuery}". Try a different keyword or category.`}
              </p>
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

        </main>
      )}

      {/* Active Game Player Overlay Modal */}
      {selectedGame && (
        <GamePlayer
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          isFavorite={favorites.has(selectedGame.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Stealth & Cloak Modal */}
      <StealthCloakModal
        isOpen={stealthModalOpen}
        onClose={() => setStealthModalOpen(false)}
        currentCloak={currentCloak}
        onSelectCloak={handleSelectCloak}
        panicKey={panicKey}
        onSetPanicKey={(key) => {
          setPanicKey(key);
          localStorage.setItem('nexus_panic_key', key);
        }}
        panicUrl={panicUrl}
        onSetPanicUrl={(url) => {
          setPanicUrl(url);
          localStorage.setItem('nexus_panic_url', url);
        }}
      />

      {/* Add Custom Game Modal */}
      <AddCustomGameModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddGame={handleAddGame}
        onExportJson={handleExportJson}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/70 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">NEXUS ARCADE</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Unblock Browser & Games Portal</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>JSON Iframe Registry</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button 
              onClick={() => setStealthModalOpen(true)}
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Panic Key: [{panicKey.toUpperCase()}]
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button 
              onClick={handleExportJson}
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Export games.json
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
