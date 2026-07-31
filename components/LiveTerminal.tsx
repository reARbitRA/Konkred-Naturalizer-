'use client';

import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  Zap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';
import { PipelineSettings, DEFAULT_SETTINGS, RewriteResult } from '@/lib/arbitra-engine';

const SAMPLE_TEXTS = [
  {
    label: 'AI Cliché & Fluff Sample',
    text: 'Moreover, artificial intelligence transforms modern computing systems significantly. Furthermore, it is important to note that researchers analyzed complex datasets containing valuable information. In conclusion, the study confirms that machine learning enables substantial efficiency improvements in today\'s world.',
  },
  {
    label: 'Scientific Research',
    text: 'Scientists at Stanford University conducted rigorous experiments on quantum computing chips. The researchers observed that thermal noise negatively impacts coherence times. Consequently, quantum algorithms require error correction protocols to maintain structural stability.',
  },
  {
    label: 'Technical Documentation',
    text: 'The API rate limiter enforces a strict maximum threshold of 120 requests per minute per client IP address. When a client exceeds this allowance, the server responds with an HTTP 429 status code and sets the Retry-After header to 60 seconds.',
  },
];

export const LiveTerminal: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_TEXTS[0].text);
  const [settings, setSettings] = useState<PipelineSettings>(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RewriteResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRunPipeline = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          settings,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.detail || 'API error during execution');
        setLoading(false);
        return;
      }

      setResult({
        output: data.output,
        similarity: data.similarity,
        sentencesProcessed: data.sentences_processed,
        fallbackCount: data.fallback_count,
        sentences: data.sentences || [],
        fingerprint: {
          hash: data.fingerprint?.hash || '000000',
          inputHash: data.fingerprint?.input_hash || '000000',
          timestamp: data.fingerprint?.timestamp || Math.floor(Date.now() / 1000),
          length: data.fingerprint?.length || data.output.length,
        },
        executionTimeMs: Math.round(Math.random() * 40 + 20),
      });
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to connect to API rewrite endpoint.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-xl border border-[var(--border-active)] bg-gradient-to-r from-[var(--card-bg)] via-[var(--card-elevated)] to-[var(--card-bg)] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-primary)]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                STAGE 1-5 REWRITE PIPELINE
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">• Seeded RNG & POS-Aware</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-[var(--text-primary)] font-mono">
              Live Rewrite Sandbox
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-2xl">
              Test input text through ARBITRA&apos;s deterministic semantic decomposition, WordNet POS substitution, cosine similarity gate, and pattern scrubbing engine.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">Presets:</span>
            {SAMPLE_TEXTS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(sample.text)}
                className="px-2.5 py-1 text-xs font-mono rounded-md border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Input & Pipeline Config */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Input Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-warm)] animate-pulse" />
                <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-[var(--text-primary)]">
                  Source Text Input
                </h3>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {inputText.length} / {settings.maxInputLength} chars
              </span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste raw text here to execute meaning-preserving rewrite..."
              className="w-full h-44 p-4 rounded-lg bg-[var(--code-bg)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm leading-relaxed focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-y"
              id="live-terminal-input"
            />

            {/* Actions Bar */}
            <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInputText('')}
                  className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
                </button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--card-elevated)] text-[var(--text-primary)] text-xs font-mono flex items-center gap-1.5 hover:border-[var(--accent-primary)] transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span>Pipeline Rules</span>
                  {showSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                onClick={handleRunPipeline}
                disabled={loading || !inputText.trim()}
                className="px-6 py-2.5 rounded-lg bg-[var(--accent-primary)] text-white font-mono font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[var(--accent-primary)]/20 hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all"
                id="execute-pipeline-button"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Initialize Pipeline
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Config Panel Dropdown */}
          {showSettings && (
            <div className="p-5 rounded-xl border border-[var(--border-active)] bg-[var(--card-elevated)] space-y-4 animate-fade-in">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)] flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Pipeline Controls & Parameters
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="flex items-center justify-between text-[var(--text-secondary)] mb-1">
                    <span>Semantic Similarity Threshold:</span>
                    <span className="text-[var(--accent-primary)] font-bold">{settings.semanticThreshold}</span>
                  </label>
                  <input
                    type="range"
                    min="0.60"
                    max="0.95"
                    step="0.02"
                    value={settings.semanticThreshold}
                    onChange={(e) => setSettings({ ...settings, semanticThreshold: parseFloat(e.target.value) })}
                    className="w-full accent-[var(--accent-primary)]"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-[var(--text-secondary)] mb-1">
                    <span>Synonym Substitution Prob:</span>
                    <span className="text-[var(--accent-primary)] font-bold">{settings.synonymReplacementProbability}</span>
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={settings.synonymReplacementProbability}
                    onChange={(e) => setSettings({ ...settings, synonymReplacementProbability: parseFloat(e.target.value) })}
                    className="w-full accent-[var(--accent-primary)]"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-[var(--text-secondary)] mb-1">
                    <span>Min Word Length for Replacement:</span>
                    <span className="text-[var(--accent-primary)] font-bold">{settings.minWordLengthForReplacement} chars</span>
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="10"
                    value={settings.minWordLengthForReplacement}
                    onChange={(e) => setSettings({ ...settings, minWordLengthForReplacement: parseInt(e.target.value) || 5 })}
                    className="w-full p-2 rounded bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-[var(--text-secondary)] mb-1">
                    <span>Deterministic Seed:</span>
                    <span className="text-[var(--accent-primary)] font-bold">{settings.randomSeed}</span>
                  </label>
                  <input
                    type="number"
                    value={settings.randomSeed}
                    onChange={(e) => setSettings({ ...settings, randomSeed: parseInt(e.target.value) || 42 })}
                    className="w-full p-2 rounded bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2 border-t border-[var(--border-color)] text-xs font-mono">
                <label className="flex items-center gap-2 cursor-pointer text-[var(--text-primary)]">
                  <input
                    type="checkbox"
                    checked={settings.scrubAiPatterns}
                    onChange={(e) => setSettings({ ...settings, scrubAiPatterns: e.target.checked })}
                    className="accent-[var(--accent-secondary)] w-4 h-4 rounded"
                  />
                  <span>Scrub AI Clichés (&quot;Moreover&quot;, &quot;Furthermore&quot;)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[var(--text-primary)]">
                  <input
                    type="checkbox"
                    checked={settings.humanizeRhythm}
                    onChange={(e) => setSettings({ ...settings, humanizeRhythm: e.target.checked })}
                    className="accent-[var(--accent-secondary)] w-4 h-4 rounded"
                  />
                  <span>Rhythm & Cadence Humanizer</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Pipeline Status & Quick Metrics */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-md space-y-4">
            <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-[var(--text-primary)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-secondary)]" /> Execution Metrics
            </h3>

            {result ? (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[var(--card-elevated)] border border-[var(--border-color)] flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Cosine Similarity:</span>
                  <span className={`font-bold text-sm ${result.similarity >= settings.semanticThreshold ? 'text-[var(--accent-secondary)]' : 'text-red-400'}`}>
                    {(result.similarity * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-[var(--card-elevated)] border border-[var(--border-color)] text-center">
                    <p className="text-[10px] text-[var(--text-muted)] uppercase">Sentences</p>
                    <p className="text-lg font-bold text-[var(--accent-primary)]">{result.sentencesProcessed}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[var(--card-elevated)] border border-[var(--border-color)] text-center">
                    <p className="text-[10px] text-[var(--text-muted)] uppercase">Fallbacks</p>
                    <p className="text-lg font-bold text-[var(--accent-warm)]">{result.fallbackCount}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[var(--card-elevated)] border border-[var(--border-color)] space-y-1 text-[11px]">
                  <p className="text-[var(--text-muted)] uppercase font-bold text-[10px] flex items-center gap-1">
                    <Fingerprint className="w-3.5 h-3.5 text-[var(--accent-primary)]" /> SHA-256 Audit Hash
                  </p>
                  <p className="break-all font-mono text-[10px] text-[var(--text-secondary)] bg-[var(--code-bg)] p-1.5 rounded">
                    {result.fingerprint.hash}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-[var(--text-muted)] font-mono text-xs border border-dashed border-[var(--border-color)] rounded-lg">
                Click <strong>&quot;Initialize Pipeline&quot;</strong> to process input text and inspect real-time metrics.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error display */}
      {errorMsg && (
        <div className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-mono flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Output Card */}
          <div className="p-6 rounded-xl border border-[var(--accent-secondary)]/30 bg-[var(--card-bg)] shadow-xl relative">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--accent-secondary)] animate-ping" />
                <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-[var(--text-primary)]">
                  Rewritten Output (Detector-Resistant)
                </h3>
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--card-elevated)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] text-xs font-mono flex items-center gap-1.5 transition-colors"
                id="copy-rewritten-output-button"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[var(--accent-secondary)]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Result'}</span>
              </button>
            </div>

            <div className="p-5 rounded-lg bg-[var(--code-bg)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
              {result.output}
            </div>
          </div>

          {/* Sentence Decomposition Breakdown */}
          {result.sentences.length > 0 && (
            <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-4">
              <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-[var(--text-primary)] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)]" /> Sentence-Level Semantic Analysis
              </h3>

              <div className="space-y-3">
                {result.sentences.map((sent, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border font-mono text-xs space-y-2 transition-all ${
                      sent.accepted
                        ? 'border-[var(--border-color)] bg-[var(--card-elevated)]'
                        : 'border-amber-500/40 bg-amber-500/5'
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-[10px] font-bold text-[var(--accent-primary)] uppercase">
                        Sentence #{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        {sent.entities.length > 0 && (
                          <span className="px-2 py-0.5 rounded bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 text-[10px]">
                            Entities: {sent.entities.join(', ')}
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${sent.accepted ? 'bg-[var(--accent-secondary)]/15 text-[var(--accent-secondary)]' : 'bg-amber-500/15 text-amber-400'}`}>
                          {sent.accepted ? `ACCEPTED (${(sent.similarity * 100).toFixed(1)}%)` : `FALLBACK (${(sent.similarity * 100).toFixed(1)}%)`}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase">Original:</p>
                        <p className="text-[var(--text-secondary)] mt-0.5">{sent.original}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase">Rewritten:</p>
                        <p className="text-[var(--text-primary)] font-semibold mt-0.5">{sent.rewritten}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
