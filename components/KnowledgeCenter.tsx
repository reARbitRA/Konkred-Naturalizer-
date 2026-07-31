'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Bookmark,
  Check,
  Copy,
  Layers,
  Shield,
  FileCode,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Info,
  Star,
  ChevronRight,
  Download,
  Share2,
} from 'lucide-react';

interface KnowledgeCenterProps {
  bookmarks: string[];
  onToggleBookmark: (sectionId: string) => void;
  activeSectionId?: string;
}

export const KnowledgeCenter: React.FC<KnowledgeCenterProps> = ({
  bookmarks,
  onToggleBookmark,
  activeSectionId,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string>('ch1');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Left Sidebar Table of Contents */}
      <aside className="lg:col-span-1 space-y-4 sticky top-20 h-fit">
        <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-md space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)] flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Table of Contents
            </h3>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">8 Chapters</span>
          </div>

          <nav className="space-y-1 font-mono text-xs">
            <button
              onClick={() => setSelectedChapter('ch1')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                selectedChapter === 'ch1'
                  ? 'bg-[var(--accent-primary)] text-white font-bold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
              }`}
            >
              <span>01. System Overview</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            </button>

            <button
              onClick={() => setSelectedChapter('ch2')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                selectedChapter === 'ch2'
                  ? 'bg-[var(--accent-primary)] text-white font-bold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
              }`}
            >
              <span>02. 5-Stage Pipeline</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            </button>

            <button
              onClick={() => setSelectedChapter('ch3')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                selectedChapter === 'ch3'
                  ? 'bg-[var(--accent-primary)] text-white font-bold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
              }`}
            >
              <span>03. Architecture & Design</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            </button>

            <button
              onClick={() => setSelectedChapter('ch4')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                selectedChapter === 'ch4'
                  ? 'bg-[var(--accent-primary)] text-white font-bold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
              }`}
            >
              <span>04. Security Policy</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            </button>

            <button
              onClick={() => setSelectedChapter('ch5')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                selectedChapter === 'ch5'
                  ? 'bg-[var(--accent-primary)] text-white font-bold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
              }`}
            >
              <span>05. API Reference</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            </button>

            <button
              onClick={() => setSelectedChapter('ch6')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                selectedChapter === 'ch6'
                  ? 'bg-[var(--accent-primary)] text-white font-bold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
              }`}
            >
              <span>06. Code Base Files</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            </button>

            <button
              onClick={() => setSelectedChapter('ch7')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                selectedChapter === 'ch7'
                  ? 'bg-[var(--accent-primary)] text-white font-bold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
              }`}
            >
              <span>07. Test Suite & CI</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            </button>

            <button
              onClick={() => setSelectedChapter('ch8')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                selectedChapter === 'ch8'
                  ? 'bg-[var(--accent-primary)] text-white font-bold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
              }`}
            >
              <span>08. Docker & Deploy</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            </button>
          </nav>
        </div>

        {/* Bookmarks Quick List */}
        {bookmarks.length > 0 && (
          <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-2">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent-warm)] flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 fill-current" /> Saved Bookmarks ({bookmarks.length})
            </h4>
            <div className="space-y-1 text-xs font-mono">
              {bookmarks.map((bm) => (
                <button
                  key={bm}
                  onClick={() => setSelectedChapter(bm)}
                  className="w-full text-left truncate text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  • {bm.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Documentation Reading Canvas */}
      <main className="lg:col-span-3 space-y-8">
        {/* CHAPTER 1: SYSTEM OVERVIEW */}
        {selectedChapter === 'ch1' && (
          <article className="space-y-6 animate-fade-in" id="ch1">
            <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                    CHAPTER 01
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] mt-2">
                    System Overview & Philosophy
                  </h1>
                </div>
                <button
                  onClick={() => onToggleBookmark('ch1')}
                  className={`p-2 rounded-lg border transition-all ${
                    isBookmarked('ch1')
                      ? 'bg-[var(--accent-warm)]/20 border-[var(--accent-warm)] text-[var(--accent-warm)]'
                      : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Bookmark chapter"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked('ch1') ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
                <p>
                  <strong>ARBITRA QA CORE v6.2</strong> is a production-grade, deterministic, meaning-preserving semantic rewrite engine designed to produce detector-resistant natural language output without reliance on generative LLMs.
                </p>

                {/* Styled Callout Box: Tip */}
                <div className="p-4 rounded-lg border-l-4 border-[var(--accent-secondary)] bg-[var(--accent-secondary)]/10 text-[var(--text-primary)] text-xs font-mono flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-[var(--accent-secondary)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-[var(--accent-secondary)] mb-1">CORE GUARANTEE: Zero Hallucination</strong>
                    Unlike generative neural networks which can introduce false facts, ARBITRA operates on deterministic POS-filtered synonym substitution backed by WordNet and cosine-similarity semantic gating.
                  </div>
                </div>

                <h3 className="text-base font-bold font-mono text-[var(--text-primary)] pt-2">Key System Principles</h3>
                <ul className="list-disc pl-5 space-y-2 text-xs font-mono text-[var(--text-secondary)]">
                  <li><strong>Deterministic Execution:</strong> All random choices use seeded RNG (`PIPELINE.RANDOM_SEED`). Identical input generates identical output.</li>
                  <li><strong>Semantic Invariance Gate:</strong> Sentence Transformers calculate cosine similarity. If the score drops below `0.78`, the engine falls back to the original sentence automatically.</li>
                  <li><strong>Entity Preservation:</strong> Named entities (organizations, people, locations, technical jargon) are automatically detected via spaCy dependency parsing and strictly protected from replacement.</li>
                  <li><strong>AI-Pattern Scrubbing:</strong> Common robotic transitions (&quot;Moreover&quot;, &quot;Furthermore&quot;, &quot;In conclusion&quot;, &quot;It is important to note that&quot;) are stripped automatically.</li>
                </ul>
              </div>
            </div>
          </article>
        )}

        {/* CHAPTER 2: 5-STAGE PIPELINE */}
        {selectedChapter === 'ch2' && (
          <article className="space-y-6 animate-fade-in" id="ch2">
            <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                    CHAPTER 02
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] mt-2">
                    The 5-Stage Execution Pipeline
                  </h1>
                </div>
                <button
                  onClick={() => onToggleBookmark('ch2')}
                  className={`p-2 rounded-lg border transition-all ${
                    isBookmarked('ch2')
                      ? 'bg-[var(--accent-warm)]/20 border-[var(--accent-warm)] text-[var(--accent-warm)]'
                      : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked('ch2') ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed space-y-6">
                <p>
                  Every piece of text submitted to ARBITRA QA CORE undergoes a 5-stage processing pipeline:
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--card-elevated)]">
                    <h4 className="text-sm font-bold font-mono text-[var(--accent-primary)] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-xs">1</span>
                      Semantic Decomposition (`semantic.py`)
                    </h4>
                    <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                      Uses spaCy (`en_core_web_sm`) to segment raw text into immutable `SemanticUnit` objects. Extracts POS tags, dependency parse trees, and entity boundaries.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--card-elevated)]">
                    <h4 className="text-sm font-bold font-mono text-[var(--accent-primary)] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-xs">2</span>
                      POS-Aware Synonym Rewriting (`rewrite.py`)
                    </h4>
                    <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                      Queries WordNet for POS-filtered synonyms (`NOUN`, `VERB`, `ADJ`, `ADV`). Excludes proper nouns, stop words, and entities. Maintains case sensitivity.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--card-elevated)]">
                    <h4 className="text-sm font-bold font-mono text-[var(--accent-primary)] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-xs">3</span>
                      Quality Validation Gate (`qa_validator.py`)
                    </h4>
                    <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                      Computes Sentence-BERT (`all-mpnet-base-v2`) cosine similarity between original and rewritten sentences. Rejects rewrites scoring below `0.78`.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--card-elevated)]">
                    <h4 className="text-sm font-bold font-mono text-[var(--accent-primary)] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-xs">4</span>
                      Rhythm & Cadence Engine (`style.py`)
                    </h4>
                    <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                      Applies sentence restructuring, strips redundant adverbs, splits long semicolon clauses into natural sentences, and guarantees terminal punctuation.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--card-elevated)]">
                    <h4 className="text-sm font-bold font-mono text-[var(--accent-primary)] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-xs">5</span>
                      AI-Pattern Scrubbing & Micro-variation (`noise.py`)
                    </h4>
                    <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                      Removes robotic AI transition phrases and injects subtle em-dash micro-variations. Generates final SHA-256 audit fingerprint.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* CHAPTER 3: ARCHITECTURE */}
        {selectedChapter === 'ch3' && (
          <article className="space-y-6 animate-fade-in" id="ch3">
            <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                    CHAPTER 03
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] mt-2">
                    System Architecture & Trust Model
                  </h1>
                </div>
                <button
                  onClick={() => onToggleBookmark('ch3')}
                  className={`p-2 rounded-lg border transition-all ${
                    isBookmarked('ch3')
                      ? 'bg-[var(--accent-warm)]/20 border-[var(--accent-warm)] text-[var(--accent-warm)]'
                      : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked('ch3') ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
                <p>
                  The system enforces strict trust boundaries between client requests, memory state, and local model inference:
                </p>

                <div className="p-4 rounded-lg bg-[var(--code-bg)] border border-[var(--border-color)] font-mono text-xs overflow-x-auto space-y-2">
                  <div className="text-[var(--accent-secondary)] font-bold">&#47;&#47; TRUST BOUNDARIES</div>
                  <div>Client Request (Untrusted) ➔ Pydantic Validation ➔ FastAPI Layer</div>
                  <div>FastAPI Layer ➔ Thread-Safe Rate Limiter ➔ Pipeline Orchestrator</div>
                  <div>Pipeline Orchestrator ➔ Singleton Model Pool (spaCy + SBERT)</div>
                  <div>Output Generation ➔ SHA-256 Fingerprinter ➔ HTTP Response</div>
                </div>

                {/* Callout Box: Important */}
                <div className="p-4 rounded-lg border-l-4 border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--text-primary)] text-xs font-mono flex items-start gap-3">
                  <Info className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-[var(--accent-primary)] mb-1">Singleton Model Loader (`nlp_models.py`)</strong>
                    Heavy NLP models (`spaCy` and `SentenceTransformer`) are loaded lazily into memory once per worker using thread-safe double-checked locks (`threading.Lock()`).
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* CHAPTER 4: SECURITY */}
        {selectedChapter === 'ch4' && (
          <article className="space-y-6 animate-fade-in" id="ch4">
            <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                    CHAPTER 04
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] mt-2">
                    Security Policy & Threat Model
                  </h1>
                </div>
                <button
                  onClick={() => onToggleBookmark('ch4')}
                  className={`p-2 rounded-lg border transition-all ${
                    isBookmarked('ch4')
                      ? 'bg-[var(--accent-warm)]/20 border-[var(--accent-warm)] text-[var(--accent-warm)]'
                      : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked('ch4') ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
                {/* Warning Callout */}
                <div className="p-4 rounded-lg border-l-4 border-[var(--accent-warm)] bg-[var(--accent-warm)]/10 text-[var(--text-primary)] text-xs font-mono flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[var(--accent-warm)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-[var(--accent-warm)] mb-1">DoS Prevention & Boundary Protection</strong>
                    All input payloads are bounded via Pydantic (`max_length=50000`). Requests exceeding limit are immediately rejected with HTTP 422.
                  </div>
                </div>

                <h3 className="text-base font-bold font-mono text-[var(--text-primary)]">Rate Limiter Architecture (`security.py`)</h3>
                <p className="text-xs font-mono text-[var(--text-secondary)]">
                  Uses a thread-safe sliding window algorithm (`limit_per_minute=120`). Tracks client IP addresses via `X-Forwarded-For` proxy headers when enabled.
                </p>

                <div className="p-4 rounded-lg bg-[var(--code-bg)] border border-[var(--border-color)] font-mono text-xs">
                  <div className="flex items-center justify-between text-[var(--text-muted)] border-b border-[var(--border-color)] pb-2 mb-2">
                    <span>SECURITY PARAMETER</span>
                    <span>DEFAULT VALUE</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span>RATE_LIMIT_PER_MIN</span><span className="text-[var(--accent-primary)]">120 req/min</span></div>
                    <div className="flex justify-between"><span>MAX_INPUT_LENGTH</span><span className="text-[var(--accent-primary)]">50,000 characters</span></div>
                    <div className="flex justify-between"><span>TRUST_PROXY_HEADERS</span><span className="text-[var(--accent-primary)]">false (configurable)</span></div>
                    <div className="flex justify-between"><span>AUDIT_FINGERPRINT</span><span className="text-[var(--accent-primary)]">SHA-256 immutable hash</span></div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* CHAPTER 5: API REFERENCE */}
        {selectedChapter === 'ch5' && (
          <article className="space-y-6 animate-fade-in" id="ch5">
            <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                    CHAPTER 05
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] mt-2">
                    API Specification & Endpoints
                  </h1>
                </div>
                <button
                  onClick={() => onToggleBookmark('ch5')}
                  className={`p-2 rounded-lg border transition-all ${
                    isBookmarked('ch5')
                      ? 'bg-[var(--accent-warm)]/20 border-[var(--accent-warm)] text-[var(--accent-warm)]'
                      : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked('ch5') ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="mt-4 space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border border-[var(--border-color)] rounded-lg overflow-hidden">
                    <thead className="bg-[var(--card-elevated)] text-[var(--accent-primary)]">
                      <tr>
                        <th className="p-3 border-b border-[var(--border-color)]">ENDPOINT</th>
                        <th className="p-3 border-b border-[var(--border-color)]">METHOD</th>
                        <th className="p-3 border-b border-[var(--border-color)]">DESCRIPTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
                      <tr>
                        <td className="p-3 text-[var(--accent-secondary)] font-bold">/v1/rewrite</td>
                        <td className="p-3 font-bold text-green-400">POST</td>
                        <td className="p-3">Main pipeline endpoint. Accepts JSON payload <code className="text-[var(--accent-primary)]">&#123;&quot;text&quot;: &quot;...&quot;&#125;</code>.</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-[var(--accent-secondary)] font-bold">/health</td>
                        <td className="p-3 font-bold text-blue-400">GET</td>
                        <td className="p-3">Liveness probe. Returns HTTP 200 <code className="text-[var(--accent-primary)]">&#123;&quot;status&quot;: &quot;alive&quot;&#125;</code>.</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-[var(--accent-secondary)] font-bold">/ready</td>
                        <td className="p-3 font-bold text-blue-400">GET</td>
                        <td className="p-3">Readiness probe. Returns HTTP 200 when spaCy & SBERT models are ready.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Example Code snippet */}
                <div className="p-4 rounded-lg bg-[var(--code-bg)] border border-[var(--border-color)] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-b border-[var(--border-color)] pb-2">
                    <span>cURL Example Request</span>
                    <button
                      onClick={() => copyToClipboard('curl -X POST http://localhost:8000/v1/rewrite -H "Content-Type: application/json" -d \'{"text":"Artificial intelligence transforms computing."}\'', 'curl-ex')}
                      className="hover:text-[var(--text-primary)] flex items-center gap-1"
                    >
                      {copiedCode === 'curl-ex' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-[var(--accent-primary)] overflow-x-auto p-2">
                    {`curl -X POST http://localhost:8000/v1/rewrite \\
  -H "Content-Type: application/json" \\
  -d '{"text":"Artificial intelligence transforms modern computing systems."}'`}
                  </pre>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* CHAPTER 6: CODE BASE */}
        {selectedChapter === 'ch6' && (
          <article className="space-y-6 animate-fade-in" id="ch6">
            <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                    CHAPTER 06
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] mt-2">
                    Backend Code File Inventory
                  </h1>
                </div>
                <button
                  onClick={() => onToggleBookmark('ch6')}
                  className={`p-2 rounded-lg border transition-all ${
                    isBookmarked('ch6')
                      ? 'bg-[var(--accent-warm)]/20 border-[var(--accent-warm)] text-[var(--accent-warm)]'
                      : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked('ch6') ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="mt-4 space-y-4 font-mono text-xs">
                <div className="p-4 rounded-lg bg-[var(--card-elevated)] border border-[var(--border-color)] space-y-1">
                  <span className="text-[var(--accent-primary)] font-bold">backend/main.py</span>
                  <p className="text-[var(--text-secondary)] text-[11px]">
                    FastAPI application setup, CORS middleware configuration, exception handling, and `/v1/rewrite` route mounting.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[var(--card-elevated)] border border-[var(--border-color)] space-y-1">
                  <span className="text-[var(--accent-primary)] font-bold">backend/pipeline.py</span>
                  <p className="text-[var(--text-secondary)] text-[11px]">
                    Canonical orchestration module chaining `decompose()`, `semantic_rewrite()`, `validate()`, `humanize()`, and `apply_noise()`.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[var(--card-elevated)] border border-[var(--border-color)] space-y-1">
                  <span className="text-[var(--accent-primary)] font-bold">backend/rewrite.py</span>
                  <p className="text-[var(--text-secondary)] text-[11px]">
                    POS-aware WordNet synonym replacer. Preserves entity case, filters proper nouns, and attachment punctuation.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[var(--card-elevated)] border border-[var(--border-color)] space-y-1">
                  <span className="text-[var(--accent-primary)] font-bold">backend/qa_validator.py</span>
                  <p className="text-[var(--text-secondary)] text-[11px]">
                    Cosine-similarity validator gate using SentenceTransformers `all-mpnet-base-v2`. Rejects rewrites below threshold.
                  </p>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* CHAPTER 7: TESTS */}
        {selectedChapter === 'ch7' && (
          <article className="space-y-6 animate-fade-in" id="ch7">
            <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                    CHAPTER 07
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] mt-2">
                    Test Suite & CI Pipeline
                  </h1>
                </div>
                <button
                  onClick={() => onToggleBookmark('ch7')}
                  className={`p-2 rounded-lg border transition-all ${
                    isBookmarked('ch7')
                      ? 'bg-[var(--accent-warm)]/20 border-[var(--accent-warm)] text-[var(--accent-warm)]'
                      : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked('ch7') ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
                <p>
                  The repository includes 60+ unit and integration tests under `backend/tests/` covering determinism, rate limiting, exception boundaries, and entity preservation.
                </p>

                <div className="p-4 rounded-lg bg-[var(--code-bg)] border border-[var(--border-color)] font-mono text-xs space-y-2">
                  <div className="text-[var(--accent-secondary)] font-bold"># Run full test suite</div>
                  <div className="text-[var(--accent-primary)]">pytest backend/tests -v --cov=backend</div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* CHAPTER 8: DOCKER & DEPLOY */}
        {selectedChapter === 'ch8' && (
          <article className="space-y-6 animate-fade-in" id="ch8">
            <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                    CHAPTER 08
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] mt-2">
                    Docker & Production Deployment
                  </h1>
                </div>
                <button
                  onClick={() => onToggleBookmark('ch8')}
                  className={`p-2 rounded-lg border transition-all ${
                    isBookmarked('ch8')
                      ? 'bg-[var(--accent-warm)]/20 border-[var(--accent-warm)] text-[var(--accent-warm)]'
                      : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked('ch8') ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
                <p>
                  Deploy via Docker Compose with multi-stage layer caching for spaCy and NLTK models.
                </p>

                <div className="p-4 rounded-lg bg-[var(--code-bg)] border border-[var(--border-color)] font-mono text-xs space-y-2">
                  <div className="text-[var(--accent-secondary)] font-bold"># Build and start container</div>
                  <div className="text-[var(--accent-primary)]">docker compose up --build -d</div>
                </div>
              </div>
            </div>
          </article>
        )}
      </main>
    </div>
  );
};
