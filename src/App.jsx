import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import UnblockBrowser from './components/UnblockBrowser.jsx';
import GameCard from './components/GameCard.jsx';
import GamePlayer from './components/GamePlayer.jsx';
import StealthCloakModal from './components/StealthCloakModal.jsx';
import gamesData from './data/games.json';
import { Zap, Play, ExternalLink, Globe, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('browser'); // 'browser' | 'games'
  const [selectedGame, setSelectedGame] = useState(null);
  const [stealthModalOpen, setStealthModalOpen] = useState(false);
  const [currentCloak, setCurrentCloak] = useState(() => localStorage.getItem('nexus_cloak') || 'default');
  const [panicKey, setPanicKey] = useState(() => localStorage.getItem('nexus_panic_key') || 'Escape');
  const [panicUrl, setPanicUrl] = useState(() => localStorage.getItem('nexus_panic_url') || 'https://classroom.google.com');

  const spaceWavesGame = gamesData[0];

  // Trigger Panic Redirect
  const triggerPanic = () => {
    window.location.replace(panicUrl);
  };

  // Global keydown listener for Panic Key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === panicKey && !stealthModalOpen && !selectedGame) {
        triggerPanic();
      } else if (e.key === 'Escape' && selectedGame) {
        setSelectedGame(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panicKey, panicUrl, stealthModalOpen, selectedGame]);

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

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenStealthModal={() => setStealthModalOpen(true)}
        panicKey={panicKey}
        onTriggerPanic={triggerPanic}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full">
        {activeView === 'browser' ? (
          <UnblockBrowser />
        ) : (
          <div className="max-w-5xl mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center text-center mb-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-md">
                <Zap className="w-3.5 h-3.5" />
                <span>UNBLOCKED IFRAME & PROXY REGISTRY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                Unblocked Games & Proxies
              </h1>
              <p className="text-sm text-slate-400 max-w-lg leading-relaxed">
                Launch Space Waves or access SillyPup Proxy (sillypup.cfd) directly in theater mode or via the Unblock Browser tabs.
              </p>
            </div>

            {/* Games & Proxies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
              {gamesData.map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlay={(g) => setSelectedGame(g)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Game Player Theater */}
      {selectedGame && (
        <GamePlayer
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
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
    </div>
  );
}
