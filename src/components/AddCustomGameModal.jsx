import React, { useState } from 'react';
import { X, Plus, Play, Download, Upload, Check, AlertCircle } from 'lucide-react';

export default function AddCustomGameModal({
  isOpen,
  onClose,
  onAddGame,
  onExportJson,
  onImportJson
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [iframeSrc, setIframeSrc] = useState('');
  const [description, setDescription] = useState('');
  const [controlsInput, setControlsInput] = useState('Arrow keys to move, Space to action');
  const [accentColor, setAccentColor] = useState('#06b6d4');
  const [previewActive, setPreviewActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !iframeSrc.trim()) {
      setErrorMsg('Please provide a game title and valid iframe URL.');
      return;
    }

    const controls = controlsInput
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const newGame = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category: category,
      description: description.trim() || 'Custom user embedded iframe game.',
      controls: controls.length > 0 ? controls : ['Standard keyboard/mouse controls'],
      iframeSrc: iframeSrc.trim(),
      rating: 5.0,
      plays: 1,
      tags: ['Custom', category],
      badge: 'User Custom',
      accentColor: accentColor,
      isCustom: true
    };

    onAddGame(newGame);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Add Custom Iframe Game</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                JSON STORE
              </span>
            </h2>
            <p className="text-xs text-slate-400">Add any playable HTML5 game or web iframe into your library</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          {errorMsg && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Game Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cyber Glider"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Arcade">Arcade</option>
                <option value="Action">Action</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Retro">Retro</option>
                <option value="Sports">Sports</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Iframe Source (URL or HTML Embed Link)
            </label>
            <input
              type="text"
              required
              value={iframeSrc}
              onChange={(e) => setIframeSrc(e.target.value)}
              placeholder="e.g. https://example.com/game or /games/custom.html"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Stored as the <code className="text-cyan-400">iframeSrc</code> property in the games JSON configuration.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Gameplay Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of how the game plays..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Controls (comma-separated)
            </label>
            <input
              type="text"
              value={controlsInput}
              onChange={(e) => setControlsInput(e.target.value)}
              placeholder="Arrow Keys, Spacebar to jump, Mouse click"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Accent Glow</label>
              <div className="flex items-center gap-2">
                {['#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#a855f7'].map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setAccentColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      accentColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="ml-auto pt-4">
              <button
                type="button"
                onClick={() => setPreviewActive(!previewActive)}
                disabled={!iframeSrc.trim()}
                className="text-xs text-cyan-400 hover:text-cyan-300 disabled:opacity-40 underline font-semibold"
              >
                {previewActive ? 'Hide Test Preview' : 'Test Iframe Preview'}
              </button>
            </div>
          </div>

          {previewActive && iframeSrc && (
            <div className="border border-slate-800 rounded-lg overflow-hidden h-48 bg-black">
              <iframe
                src={iframeSrc}
                title="Preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-forms allow-same-origin"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onExportJson}
                title="Download updated games JSON"
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-lg shadow-cyan-500/20 transition-all"
              >
                Add Game to Library
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
