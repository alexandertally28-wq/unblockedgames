import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  EyeOff, 
  ExternalLink, 
  Zap, 
  Check, 
  FileText, 
  Folder, 
  GraduationCap 
} from 'lucide-react';

const CLOAK_PRESETS = [
  {
    id: 'default',
    name: 'Default Nexus',
    title: 'Nexus Unblocked Games & Browser',
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306b6d4'><path d='M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'/></svg>",
    badge: 'Standard'
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    title: 'Classes',
    icon: "https://ssl.gstatic.com/classroom/favicon.png",
    badge: 'Popular Disguise'
  },
  {
    id: 'drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
    badge: 'Disguise'
  },
  {
    id: 'docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico",
    badge: 'Disguise'
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    title: 'Dashboard',
    icon: "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico",
    badge: 'LMS Disguise'
  }
];

export default function StealthCloakModal({
  isOpen,
  onClose,
  currentCloak,
  onSelectCloak,
  panicKey,
  onSetPanicKey,
  panicUrl,
  onSetPanicUrl
}) {
  const [customKey, setCustomKey] = useState(panicKey);
  const [customUrl, setCustomUrl] = useState(panicUrl);

  if (!isOpen) return null;

  const handleLaunchAboutBlank = () => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${document.title}</title>
            <style>
              body, html { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#090d16; }
              iframe { border:none; width:100%; height:100%; }
            </style>
          </head>
          <body>
            <iframe src="${window.location.href}" allow="fullscreen; autoplay; gamepad"></iframe>
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  const handleSavePanicSettings = (e) => {
    e.preventDefault();
    onSetPanicKey(customKey);
    onSetPanicUrl(customUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <EyeOff className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Stealth & Cloaking Engine</h2>
              <p className="text-xs text-slate-400">Camouflage your tab and set instant emergency triggers</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Tab Cloak Presets */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Tab Title & Icon Cloaking
            </h3>
            <div className="space-y-2">
              {CLOAK_PRESETS.map((preset) => {
                const isSelected = currentCloak === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => onSelectCloak(preset)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300 shadow-sm'
                        : 'bg-slate-950/50 hover:bg-slate-800/60 border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={preset.icon} 
                        alt="" 
                        className="w-5 h-5 object-contain rounded"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div>
                        <div className="text-sm font-semibold">{preset.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">Title: "{preset.title}"</div>
                      </div>
                    </div>
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500">{preset.badge}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Panic Key Settings */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Emergency Panic Key
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Pressing this key anywhere instantly redirects your browser to the designated safe URL.
            </p>

            <form onSubmit={handleSavePanicSettings} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Trigger Key</label>
                  <select
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Escape">Escape [Esc]</option>
                    <option value="]">Bracket Close [ ] ]</option>
                    <option value="`">Backtick [ ` ]</option>
                    <option value="F2">Function Key [ F2 ]</option>
                    <option value="q">Letter [ Q ]</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Redirect Target</label>
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://classroom.google.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
              >
                Save Panic Key Settings
              </button>
            </form>
          </div>

          {/* About:Blank Window Cloaker */}
          <div className="pt-2 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              About:Blank Cloaked Window
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Launch this entire portal in an isolated <code className="text-cyan-400">about:blank</code> window so that history records no external URL.
            </p>
            <button
              onClick={handleLaunchAboutBlank}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-cyan-950/40 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Launch Stealth Window (about:blank)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
