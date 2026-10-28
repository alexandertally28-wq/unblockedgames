import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Home, 
  Lock, 
  Search, 
  Plus, 
  X, 
  ExternalLink, 
  Bookmark, 
  Smartphone, 
  Laptop, 
  Maximize2, 
  AlertTriangle,
  Compass,
  Globe2,
  ShieldCheck,
  Share2
} from 'lucide-react';

const DEFAULT_QUICK_LINKS = [
  { 
    name: 'SillyPup', 
    url: 'https://sillypup.cfd', 
    desc: 'SillyPup Web Proxy & Unblock Portal', 
    icon: '🐶' 
  },
  { 
    name: 'Space Waves', 
    url: 'https://www.crazygames.com/embed/space-waves', 
    desc: 'CrazyGames Wave Runner', 
    icon: '⚡' 
  },
  { 
    name: 'DuckDuckGo', 
    url: 'https://html.duckduckgo.com/html/', 
    desc: 'Private Search Engine', 
    icon: '🦆' 
  },
  { 
    name: 'Wikipedia', 
    url: 'https://en.m.wikipedia.org/wiki/Main_Page', 
    desc: 'The Free Encyclopedia', 
    icon: '🌐' 
  },
  { 
    name: 'Internet Archive', 
    url: 'https://archive.org/web/', 
    desc: 'Wayback Machine & Digital Library', 
    icon: '🏛️' 
  },
  { 
    name: 'Scratch MIT', 
    url: 'https://scratch.mit.edu/explore/projects/all', 
    desc: 'Creative Coding & Projects', 
    icon: '🐱' 
  },
  { 
    name: 'W3Schools', 
    url: 'https://www.w3schools.com/', 
    desc: 'Web Development Tutorials', 
    icon: '💻' 
  },
  { 
    name: 'Hacker News', 
    url: 'https://news.ycombinator.com/', 
    desc: 'Tech & Science Discussion', 
    icon: '📰' 
  },
  { 
    name: 'Open Library', 
    url: 'https://openlibrary.org/', 
    desc: 'Free Digital Book Catalog', 
    icon: '📚' 
  },
  { 
    name: 'Lichess', 
    url: 'https://lichess.org/tv', 
    desc: 'Free Open Source Chess', 
    icon: '♟️' 
  }
];

export default function UnblockBrowser() {
  const [tabs, setTabs] = useState([
    {
      id: 'tab-1',
      title: 'New Tab',
      url: 'https://html.duckduckgo.com/html/',
      displayUrl: 'https://html.duckduckgo.com/html/',
      isLoading: false,
      history: ['https://html.duckduckgo.com/html/'],
      historyIndex: 0
    }
  ]);
  const [activeTabId, setActiveTabId] = useState('tab-1');
  const [urlInput, setUrlInput] = useState('https://html.duckduckgo.com/html/');
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [showHelper, setShowHelper] = useState(true);
  const [savedBookmarks, setSavedBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('browser_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const iframeRef = useRef(null);

  const normalizeUrl = (input) => {
    let raw = input.trim();
    if (!raw) return 'https://html.duckduckgo.com/html/';

    // If it looks like a domain or full URL
    if (raw.includes('.') && !raw.includes(' ') && !raw.startsWith('http://') && !raw.startsWith('https://')) {
      return `https://${raw}`;
    }
    if (raw.startsWith('http://') || raw.startsWith('https://')) {
      return raw;
    }
    // Otherwise treat as search query on DuckDuckGo
    return `https://html.duckduckgo.com/html/?q=${encodeURIComponent(raw)}`;
  };

  const handleNavigate = (targetUrl) => {
    const finalUrl = normalizeUrl(targetUrl);
    setUrlInput(finalUrl);

    setTabs(prev => prev.map(tab => {
      if (tab.id === activeTabId) {
        const nextHistory = [...tab.history.slice(0, tab.historyIndex + 1), finalUrl];
        return {
          ...tab,
          url: finalUrl,
          displayUrl: finalUrl,
          title: getDomainTitle(finalUrl),
          history: nextHistory,
          historyIndex: nextHistory.length - 1
        };
      }
      return tab;
    }));
  };

  const getDomainTitle = (urlStr) => {
    try {
      const u = new URL(urlStr);
      return u.hostname.replace('www.', '') || 'Web Page';
    } catch {
      return 'Web Page';
    }
  };

  const handleBack = () => {
    if (activeTab.historyIndex > 0) {
      const newIndex = activeTab.historyIndex - 1;
      const prevUrl = activeTab.history[newIndex];
      setUrlInput(prevUrl);
      setTabs(prev => prev.map(t => t.id === activeTabId ? {
        ...t,
        url: prevUrl,
        displayUrl: prevUrl,
        historyIndex: newIndex
      } : t));
    }
  };

  const handleForward = () => {
    if (activeTab.historyIndex < activeTab.history.length - 1) {
      const newIndex = activeTab.historyIndex + 1;
      const nextUrl = activeTab.history[newIndex];
      setUrlInput(nextUrl);
      setTabs(prev => prev.map(t => t.id === activeTabId ? {
        ...t,
        url: nextUrl,
        displayUrl: nextUrl,
        historyIndex: newIndex
      } : t));
    }
  };

  const handleReload = () => {
    const curr = activeTab.url;
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, url: '' } : t));
    setTimeout(() => {
      setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, url: curr } : t));
    }, 50);
  };

  const handleAddTab = () => {
    const newId = `tab-${Date.now()}`;
    const defaultUrl = 'https://html.duckduckgo.com/html/';
    const newTab = {
      id: newId,
      title: 'New Tab',
      url: defaultUrl,
      displayUrl: defaultUrl,
      isLoading: false,
      history: [defaultUrl],
      historyIndex: 0
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newId);
    setUrlInput(defaultUrl);
  };

  const handleCloseTab = (e, tabId) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const remaining = tabs.filter(t => t.id !== tabId);
    setTabs(remaining);
    if (activeTabId === tabId) {
      const nextActive = remaining[remaining.length - 1];
      setActiveTabId(nextActive.id);
      setUrlInput(nextActive.url);
    }
  };

  const handleToggleBookmark = () => {
    const exists = savedBookmarks.some(b => b.url === activeTab.url);
    let updated;
    if (exists) {
      updated = savedBookmarks.filter(b => b.url !== activeTab.url);
    } else {
      updated = [...savedBookmarks, {
        name: activeTab.title || 'Page Bookmark',
        url: activeTab.url,
        time: Date.now()
      }];
    }
    setSavedBookmarks(updated);
    localStorage.setItem('browser_bookmarks', JSON.stringify(updated));
  };

  const handleOpenPopout = () => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${activeTab.title || 'Sandbox Browser'}</title>
            <style>
              body, html { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#0f172a; }
              iframe { border:none; width:100%; height:100%; }
            </style>
          </head>
          <body>
            <iframe src="${activeTab.url}" allow="fullscreen; autoplay; forms"></iframe>
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  const isBookmarked = savedBookmarks.some(b => b.url === activeTab.url);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] w-full max-w-7xl mx-auto px-2 sm:px-6 py-2.5">
      {/* Browser Main Window Container */}
      <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Tab Strip */}
        <div className="bg-slate-950 px-2 pt-2 flex items-center gap-1 border-b border-slate-800 overflow-x-auto select-none">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setUrlInput(tab.url);
                }}
                className={`group max-w-[180px] min-w-[110px] flex items-center justify-between gap-2 px-3 py-1.5 rounded-t-xl text-xs font-medium cursor-pointer transition-all border-t border-x ${
                  isActive
                    ? 'bg-slate-900 text-cyan-400 border-slate-800 border-b-transparent shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border-transparent'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Globe2 className="w-3.5 h-3.5 shrink-0 opacity-70" />
                  <span className="truncate">{tab.title}</span>
                </div>
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => handleCloseTab(e, tab.id)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}

          {/* Add Tab Button */}
          <button
            onClick={handleAddTab}
            title="Open New Tab"
            className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors ml-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Browser Navigation Toolbar */}
        <div className="bg-slate-900 px-3 py-2 flex items-center gap-2 border-b border-slate-800 shrink-0">
          {/* Back Button */}
          <button
            onClick={handleBack}
            disabled={activeTab.historyIndex <= 0}
            title="Back"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Forward Button */}
          <button
            onClick={handleForward}
            disabled={activeTab.historyIndex >= activeTab.history.length - 1}
            title="Forward"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 hover:bg-slate-800 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Reload Button */}
          <button
            onClick={handleReload}
            title="Reload Frame"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Home Button */}
          <button
            onClick={() => handleNavigate('https://html.duckduckgo.com/html/')}
            title="Home"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Home className="w-4 h-4" />
          </button>

          {/* URL Address Input Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleNavigate(urlInput);
            }}
            className="flex-1 relative flex items-center"
          >
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-emerald-400 pointer-events-none">
              <Lock className="w-3.5 h-3.5" />
            </div>

            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Search with DuckDuckGo or enter web URL (e.g. en.wikipedia.org)..."
              className="w-full bg-slate-950 text-xs sm:text-sm font-mono text-slate-200 placeholder-slate-600 pl-8 pr-16 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/40 transition-all"
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={handleToggleBookmark}
                title={isBookmarked ? "Remove Bookmark" : "Bookmark this Page"}
                className={`p-1 rounded transition-colors ${
                  isBookmarked ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button
                type="submit"
                className="text-[11px] font-semibold bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-0.5 rounded transition-colors"
              >
                GO
              </button>
            </div>
          </form>

          {/* Viewport Width Preset */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewportMode('desktop')}
              title="Desktop View (100%)"
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewportMode === 'desktop' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              title="Mobile View (390px)"
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewportMode === 'mobile' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Open in Cloaked Popout Window */}
          <button
            onClick={handleOpenPopout}
            title="Open in Sandboxed about:blank Window (Cloaked)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Links / Bookmarks Bar */}
        <div className="bg-slate-950/70 px-3 py-1.5 flex items-center gap-2 border-b border-slate-800/80 overflow-x-auto text-xs shrink-0">
          <span className="text-[10px] uppercase font-mono font-bold text-slate-500 shrink-0">
            Quick Hub:
          </span>

          {DEFAULT_QUICK_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigate(link.url)}
              title={link.desc}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 transition-colors shrink-0"
            >
              <span className="text-xs">{link.icon}</span>
              <span>{link.name}</span>
            </button>
          ))}

          {savedBookmarks.length > 0 && (
            <>
              <div className="h-3 w-px bg-slate-800 mx-1 shrink-0"></div>
              {savedBookmarks.map((bm, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigate(bm.url)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md text-amber-400/90 hover:text-amber-300 hover:bg-amber-950/30 transition-colors shrink-0"
                >
                  <Bookmark className="w-3 h-3 fill-current" />
                  <span className="truncate max-w-[120px]">{bm.name}</span>
                </button>
              ))}
            </>
          )}
        </div>

        {/* X-Frame-Options Awareness & Helper Banner */}
        {showHelper && (
          <div className="bg-slate-950/90 border-b border-cyan-900/30 px-3 py-1.5 flex items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                <strong>Sandbox Active:</strong> If a site blocks direct embeds via X-Frame-Options (e.g. YouTube/Google), click the
                <button onClick={handleOpenPopout} className="text-cyan-400 underline font-semibold mx-1 hover:text-cyan-300">
                  about:blank popout
                </button>
                or browse frame-friendly hubs above.
              </span>
            </div>
            <button 
              onClick={() => setShowHelper(false)}
              className="text-slate-500 hover:text-slate-300 p-0.5"
            >
              ✕
            </button>
          </div>
        )}

        {/* Viewport Canvas Frame */}
        <div className="flex-1 bg-slate-950 flex items-center justify-center relative overflow-hidden">
          <div 
            className={`h-full transition-all duration-200 relative bg-white ${
              viewportMode === 'mobile' 
                ? 'w-[390px] border-x-2 border-slate-700 shadow-2xl' 
                : 'w-full'
            }`}
          >
            {activeTab.url ? (
              <iframe
                ref={iframeRef}
                src={activeTab.url}
                title={activeTab.title}
                className="w-full h-full border-none bg-white"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals allow-downloads"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-400">
                <Globe2 className="w-12 h-12 text-slate-700 mb-3" />
                <h3 className="text-base font-bold text-slate-300">Enter a URL to Browse</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Type any website address or search query in the address bar above to load it securely inside the sandbox.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
