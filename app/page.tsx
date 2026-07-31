'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, ViewMode } from '@/components/Navbar';
import { BentoDashboard } from '@/components/BentoDashboard';
import { LiveTerminal } from '@/components/LiveTerminal';
import { KnowledgeCenter } from '@/components/KnowledgeCenter';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { ApiTester } from '@/components/ApiTester';
import { ConfigEditor } from '@/components/ConfigEditor';
import { SearchOverlay, SearchDocItem } from '@/components/SearchOverlay';
import { ShieldCheck, Terminal, BookOpen, Network, Send, Settings, ArrowRight, CheckCircle2 } from 'lucide-react';

const SEARCH_ITEMS: SearchDocItem[] = [
  {
    id: 'ch1',
    section: 'Overview',
    title: 'ARBITRA QA CORE v6.2 Overview',
    content: 'Deterministic meaning-preserving semantic rewrite engine. Zero generative LLMs, zero hallucinations, cosine similarity quality gate.',
    type: 'doc',
  },
  {
    id: 'ch2',
    section: 'Pipeline',
    title: '5-Stage Execution Pipeline',
    content: 'Decomposition, POS-aware WordNet synonym replacement, SBERT cosine similarity gate (0.78 threshold), rhythm engine, and AI scrubbing.',
    type: 'architecture',
  },
  {
    id: 'ch3',
    section: 'Architecture',
    title: 'System Architecture & Trust Boundaries',
    content: 'Double-checked lock thread-safe singleton model loaders for spaCy and SentenceTransformer. Pydantic validation enclaves.',
    type: 'architecture',
  },
  {
    id: 'ch4',
    section: 'Security',
    title: 'Security Policy & Rate Limiting',
    content: 'Thread-safe rate limiter (120 req/min), X-Forwarded-For proxy tracking, max 50,000 char validation, SHA-256 fingerprint audit.',
    type: 'security',
  },
  {
    id: 'ch5',
    section: 'API',
    title: 'REST API Specification',
    content: '/v1/rewrite POST endpoint, /health liveness probe, /ready readiness probe, cURL request structure and response schema.',
    type: 'api',
  },
  {
    id: 'ch6',
    section: 'Code Base',
    title: 'Full Python Code Inventory',
    content: 'main.py, pipeline.py, semantic.py, rewrite.py, style.py, noise.py, qa_validator.py, security.py, audit.py.',
    type: 'code',
  },
  {
    id: 'ch7',
    section: 'Testing',
    title: 'Pytest Suite & CI/CD Pipeline',
    content: '60+ comprehensive unit and integration tests covering determinism, rate limiting, entity preservation, and WordNet lookups.',
    type: 'code',
  },
  {
    id: 'ch8',
    section: 'Deployment',
    title: 'Docker & Production Deployment',
    content: 'Dockerfile multi-stage caching for spaCy and NLTK, docker-compose.yml configuration, Makefile commands.',
    type: 'doc',
  },
];

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewMode>('sandbox');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [readingProgress, setReadingProgress] = useState(0);

  // Sync theme with document HTML attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleSelectSearchResult = (id: string) => {
    setCurrentView('docs');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Header Navigation */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        bookmarkCount={bookmarks.length}
        readingProgress={readingProgress}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'sandbox' && <BentoDashboard />}
        {currentView === 'docs' && (
          <KnowledgeCenter
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
          />
        )}
        {currentView === 'architecture' && <ArchitectureDiagram />}
        {currentView === 'api' && <ApiTester />}
        {currentView === 'config' && <ConfigEditor />}
      </main>

      {/* Search Overlay Modal */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={SEARCH_ITEMS}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--card-bg)] py-8 mt-16 font-mono text-xs text-[var(--text-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--accent-primary)]" />
            <span className="font-bold text-[var(--text-primary)]">ARBITRA QA CORE v6.2.0</span>
            <span>— Deterministic Semantic Engine</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[var(--text-muted)]">
            <span>Powered by spaCy + SBERT + Gemini</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[var(--accent-secondary)]">
              <CheckCircle2 className="w-3.5 h-3.5 inline" /> Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
