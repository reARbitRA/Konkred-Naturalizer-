'use client';

import React from 'react';
import {
  Terminal,
  BookOpen,
  Network,
  Send,
  Settings,
  Search,
  Bookmark,
  Sun,
  Moon,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export type ViewMode = 'sandbox' | 'docs' | 'architecture' | 'api' | 'config';

interface NavbarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  bookmarkCount: number;
  readingProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  theme,
  onToggleTheme,
  onOpenSearch,
  bookmarkCount,
  readingProgress,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)]/90 backdrop-blur-md transition-colors duration-300">
      {/* Top progress bar */}
      <div className="h-0.5 w-full bg-[var(--border-color)] overflow-hidden">
        <div
          className="h-full bg-[var(--accent-primary)] transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, readingProgress))}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Status */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => onSelectView('sandbox')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            id="brand-logo-button"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--card-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)] group-hover:border-[var(--accent-primary)] transition-all shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-extrabold text-sm tracking-wider uppercase italic text-[var(--text-primary)]">
                  ARBITRA<span className="text-[var(--accent-primary)] font-normal ml-1">v6.2</span>
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] status-pulse" title="System Status: Orchestrating" />
              </div>
              <p className="text-[10px] text-[var(--text-muted)] font-mono flex items-center gap-1.5 uppercase tracking-widest">
                <span className="text-[var(--accent-primary)] font-bold">[ORCHESTRATING]</span>
                <span className="hidden sm:inline">• US-EAST-1</span>
              </p>
            </div>
          </button>
        </div>

        {/* View Mode Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--card-bg)] p-1 rounded-lg border border-[var(--border-color)]">
          <button
            onClick={() => onSelectView('sandbox')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              currentView === 'sandbox'
                ? 'bg-[var(--accent-primary)] text-black font-bold shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
            }`}
            id="nav-tab-sandbox"
          >
            <Terminal className="w-3.5 h-3.5" /> Live Terminal
          </button>

          <button
            onClick={() => onSelectView('docs')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              currentView === 'docs'
                ? 'bg-[var(--accent-primary)] text-black font-bold shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
            }`}
            id="nav-tab-docs"
          >
            <BookOpen className="w-3.5 h-3.5" /> Knowledge Base
          </button>

          <button
            onClick={() => onSelectView('architecture')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              currentView === 'architecture'
                ? 'bg-[var(--accent-primary)] text-black font-bold shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
            }`}
            id="nav-tab-architecture"
          >
            <Network className="w-3.5 h-3.5" /> Architecture Graph
          </button>

          <button
            onClick={() => onSelectView('api')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              currentView === 'api'
                ? 'bg-[var(--accent-primary)] text-black font-bold shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
            }`}
            id="nav-tab-api"
          >
            <Send className="w-3.5 h-3.5" /> API Tester
          </button>

          <button
            onClick={() => onSelectView('config')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              currentView === 'config'
                ? 'bg-[var(--accent-primary)] text-black font-bold shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
            }`}
            id="nav-tab-config"
          >
            <Settings className="w-3.5 h-3.5" /> Config & Rules
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-active)] text-xs font-mono transition-all"
            title="Search documentation (Cmd+K)"
            id="search-trigger-button"
          >
            <Search className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="hidden sm:inline">Search docs...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-sans font-semibold text-[var(--text-muted)] bg-[var(--bg-primary)] border border-[var(--border-color)] rounded">
              ⌘K
            </kbd>
          </button>

          {/* Bookmarks Counter */}
          {bookmarkCount > 0 && (
            <button
              onClick={() => onSelectView('docs')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--accent-warm)]/10 text-[var(--accent-warm)] border border-[var(--accent-warm)]/30 text-xs font-mono"
              title={`${bookmarkCount} saved bookmarks`}
              id="bookmarks-counter-button"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{bookmarkCount}</span>
            </button>
          )}

          {/* Dual Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all transform active:scale-95"
            title={`Switch to ${theme === 'dark' ? 'Pristine Light' : 'Navy Dark'} theme`}
            id="theme-toggle-button"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[var(--accent-warm)] transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--accent-primary)] transition-transform duration-300 hover:-rotate-45" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Tab bar */}
      <div className="flex lg:hidden overflow-x-auto border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-2 py-1.5 gap-1 scrollbar-none">
        <button
          onClick={() => onSelectView('sandbox')}
          className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap ${
            currentView === 'sandbox' ? 'bg-[var(--accent-primary)] text-white' : 'text-[var(--text-secondary)]'
          }`}
        >
          Terminal
        </button>
        <button
          onClick={() => onSelectView('docs')}
          className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap ${
            currentView === 'docs' ? 'bg-[var(--accent-primary)] text-white' : 'text-[var(--text-secondary)]'
          }`}
        >
          Docs
        </button>
        <button
          onClick={() => onSelectView('architecture')}
          className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap ${
            currentView === 'architecture' ? 'bg-[var(--accent-primary)] text-white' : 'text-[var(--text-secondary)]'
          }`}
        >
          Architecture
        </button>
        <button
          onClick={() => onSelectView('api')}
          className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap ${
            currentView === 'api' ? 'bg-[var(--accent-primary)] text-white' : 'text-[var(--text-secondary)]'
          }`}
        >
          API
        </button>
        <button
          onClick={() => onSelectView('config')}
          className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap ${
            currentView === 'config' ? 'bg-[var(--accent-primary)] text-white' : 'text-[var(--text-secondary)]'
          }`}
        >
          Config
        </button>
      </div>
    </header>
  );
};
