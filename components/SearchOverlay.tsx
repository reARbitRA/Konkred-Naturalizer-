'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, BookOpen, FileCode, Shield, Layers, ChevronRight } from 'lucide-react';

export interface SearchDocItem {
  id: string;
  section: string;
  title: string;
  content: string;
  type: 'doc' | 'architecture' | 'api' | 'code' | 'security';
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  items: SearchDocItem[];
  onSelectResult: (id: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  items,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return items.slice(0, 6);
    }
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query, items]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTypeIcon = (type: SearchDocItem['type']) => {
    switch (type) {
      case 'doc':
        return <BookOpen className="w-4 h-4 text-[var(--accent-primary)]" />;
      case 'architecture':
        return <Layers className="w-4 h-4 text-[var(--accent-secondary)]" />;
      case 'code':
        return <FileCode className="w-4 h-4 text-[var(--accent-warm)]" />;
      case 'security':
        return <Shield className="w-4 h-4 text-red-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-[var(--accent-primary)]" />;
    }
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text.substring(0, 120) + '...';
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.slice(0, 5).map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-[var(--accent-warm)]/30 text-[var(--accent-warm)] px-1 rounded font-semibold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-[var(--card-bg)] border border-[var(--border-active)] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Input Bar */}
        <div className="p-4 border-b border-[var(--border-color)] flex items-center gap-3 bg-[var(--bg-secondary)]">
          <Search className="w-5 h-5 text-[var(--accent-primary)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, API routes, architecture, security rules..."
            className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none font-mono text-sm"
            id="search-input-field"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs font-mono"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-active)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-[var(--border-color)]/50">
          {results.length === 0 ? (
            <div className="p-8 text-center text-[var(--text-muted)] font-mono text-sm">
              No results matching &quot;{query}&quot;. Try searching for <span className="text-[var(--accent-primary)]">semantic</span>, <span className="text-[var(--accent-primary)]">rate limit</span>, or <span className="text-[var(--accent-primary)]">WordNet</span>.
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectResult(item.id);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-[var(--card-hover)] transition-colors flex items-start justify-between group"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 shrink-0 p-1.5 rounded-md bg-[var(--bg-primary)] border border-[var(--border-color)]">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-[var(--accent-primary)] tracking-wider">
                        {item.section}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] font-mono">•</span>
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] font-mono mt-1 line-clamp-2 leading-relaxed">
                      {highlightText(item.content, query)}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 transition-all mt-2 shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)] text-[10px]">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)] text-[10px]">↓</kbd> navigate</span>
            <span><kbd className="px-1 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)] text-[10px]">ESC</kbd> close</span>
          </div>
          <span>ARBITRA QA CORE Index: {items.length} records</span>
        </div>
      </div>
    </div>
  );
};
