import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import UnblockBrowser from './components/UnblockBrowser.jsx';
import StealthCloakModal from './components/StealthCloakModal.jsx';

export default function App() {
  const [stealthModalOpen, setStealthModalOpen] = useState(false);
  const [currentCloak, setCurrentCloak] = useState(() => localStorage.getItem('nexus_cloak') || 'default');
  const [panicKey, setPanicKey] = useState(() => localStorage.getItem('nexus_panic_key') || 'Escape');
  const [panicUrl, setPanicUrl] = useState(() => localStorage.getItem('nexus_panic_url') || 'https://classroom.google.com');

  // Trigger Panic Redirect
  const triggerPanic = () => {
    window.location.replace(panicUrl);
  };

  // Global keydown listener for Panic Key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === panicKey && !stealthModalOpen) {
        triggerPanic();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panicKey, panicUrl, stealthModalOpen]);

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
        onOpenStealthModal={() => setStealthModalOpen(true)}
        panicKey={panicKey}
        onTriggerPanic={triggerPanic}
      />

      {/* Main Full-Height Unblock Browser */}
      <main className="flex-1 flex flex-col w-full">
        <UnblockBrowser />
      </main>

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
