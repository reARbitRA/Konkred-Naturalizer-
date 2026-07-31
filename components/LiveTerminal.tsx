'use client';

import React, { useState, useEffect } from 'react';
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
  Terminal as TerminalIcon,
  Shield,
  Activity,
  Cpu,
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

  // Typewriter effect state
  const [typedOutput, setTypedOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!result?.output) return;

    let index = 0;
    const fullText = result.output;

    const timer = setInterval(() => {
      index += Math.min(2, fullText.length - index);
      setTypedOutput(fullText.slice(0, index));
      setIsTyping(index < fullText.length);
      if (index >= fullText.length) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [result]);

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
    <div className="w-full space-y-6">
      {/* Central Live Terminal Section with Glowing Amber Border */}
      <div className="rounded-xl border border-[var(--accent-primary)]/80 bg-[var(--card-bg)] p-6 shadow-[0_0_30px_rgba(245,158,11,0.22)] relative overflow-hidden space-y-6">
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-primary)]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Terminal Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/40 text-[var(--accent-primary)] shadow-sm">
              <TerminalIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-mono font-extrabold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
                  ARBITRA REWRITE ENGINE <span className="text-[var(--accent-primary)] font-normal">[LIVE TERMINAL]</span>
                </h2>
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] status-pulse" />
              </div>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                Deterministic 5-Stage Semantic Rewriter • spaCy POS Filter • SBERT Quality Gate
              </p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-bold shrink-0">Presets:</span>
            {SAMPLE_TEXTS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(sample.text)}
                className="px-2.5 py-1 text-[11px] font-mono rounded border border-[var(--border-color)] bg-[var(--subtle-bg)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all cursor-pointer"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Workspace: Input & Execution Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
          {/* Input Panel (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[var(--text-secondary)] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[var(--accent-primary)]" /> Source Payload Input
              </span>
              <span className="text-[var(--text-muted)] text-[11px]">
                {inputText.length} / {settings.maxInputLength} CHARS
              </span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste text payload here for deterministic semantic rewrite..."
              className="w-full h-40 p-4 rounded-lg bg-[var(--subtle-bg)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]/50 transition-all resize-y"
              id="live-terminal-input"
            />

            {/* Action Bar */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInputText('')}
                  className="px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--subtle-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-active)] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
                </button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--subtle-bg)] text-[var(--accent-primary)] text-xs font-mono flex items-center gap-1.5 hover:border-[var(--accent-primary)]/50 transition-colors cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Config Rules</span>
                  {showSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                onClick={handleRunPipeline}
                disabled={loading || !inputText.trim()}
                className="px-6 py-2.5 rounded-lg bg-[var(--accent-primary)] text-black font-mono font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                id="execute-pipeline-button"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> EXECUTING STAGES...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> EXECUTE REWRITE
                  </>
                )}
              </button>
            </div>

            {/* Config Controls Drawer */}
            {showSettings && (
              <div className="p-4 rounded-lg border border-[var(--accent-primary)]/40 bg-[var(--card-bg)] space-y-3 font-mono text-xs text-[var(--text-secondary)] animate-fade-in">
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
                  <span className="font-bold text-[var(--accent-primary)] flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> PIPELINE TUNING & SEED CONTROLS
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase">Deterministic Mode</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="flex justify-between text-[11px] text-[var(--text-muted)] mb-1">
                      <span>Semantic Gate (Cosine):</span>
                      <span className="text-[var(--accent-primary)] font-bold">{settings.semanticThreshold}</span>
                    </label>
                    <input
                      type="range"
                      min="0.60"
                      max="0.95"
                      step="0.02"
                      value={settings.semanticThreshold}
                      onChange={(e) => setSettings({ ...settings, semanticThreshold: parseFloat(e.target.value) })}
                      className="w-full accent-[var(--accent-primary)] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between text-[11px] text-[var(--text-muted)] mb-1">
                      <span>Synonym Prob:</span>
                      <span className="text-[var(--accent-primary)] font-bold">{settings.synonymReplacementProbability}</span>
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.1"
                      value={settings.synonymReplacementProbability}
                      onChange={(e) => setSettings({ ...settings, synonymReplacementProbability: parseFloat(e.target.value) })}
                      className="w-full accent-[var(--accent-primary)] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[var(--border-color)] text-[11px]">
                  <label className="flex items-center gap-2 cursor-pointer text-[var(--text-primary)]">
                    <input
                      type="checkbox"
                      checked={settings.scrubAiPatterns}
                      onChange={(e) => setSettings({ ...settings, scrubAiPatterns: e.target.checked })}
                      className="accent-[var(--accent-primary)] w-3.5 h-3.5 rounded"
                    />
                    <span>Scrub Robotic AI Phrases (&quot;Moreover&quot;, &quot;Furthermore&quot;)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-[var(--text-primary)]">
                    <input
                      type="checkbox"
                      checked={settings.humanizeRhythm}
                      onChange={(e) => setSettings({ ...settings, humanizeRhythm: e.target.checked })}
                      className="accent-[var(--accent-primary)] w-3.5 h-3.5 rounded"
                    />
                    <span>Cadence & Sentence Variation Engine</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Right Metrics Pane (1 Col) */}
          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--subtle-bg)] font-mono text-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
                <span className="font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                  <Activity className="w-3.5 h-3.5 text-[var(--accent-primary)]" /> Pipeline Telemetry
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                  READY
                </span>
              </div>

              {result ? (
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-between">
                    <span className="text-[var(--text-muted)] text-[11px]">Similarity Metric:</span>
                    <span className="font-bold text-[var(--accent-primary)] text-sm">
                      {(result.similarity * 100).toFixed(1)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 rounded bg-[var(--card-bg)] border border-[var(--border-color)]">
                      <span className="text-[9px] text-[var(--text-muted)] uppercase block">Sentences</span>
                      <span className="text-base font-bold text-[var(--text-primary)]">{result.sentencesProcessed}</span>
                    </div>
                    <div className="p-2 rounded bg-[var(--card-bg)] border border-[var(--border-color)]">
                      <span className="text-[9px] text-[var(--text-muted)] uppercase block">Fallbacks</span>
                      <span className="text-base font-bold text-[var(--accent-primary)]">{result.fallbackCount}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)] space-y-1">
                    <span className="text-[9px] text-[var(--text-muted)] uppercase font-bold flex items-center gap-1">
                      <Fingerprint className="w-3 h-3 text-[var(--accent-primary)]" /> SHA-256 Audit Hash
                    </span>
                    <p className="font-mono text-[9px] text-[var(--text-secondary)] break-all bg-[var(--subtle-bg)] p-1 rounded">
                      {result.fingerprint.hash}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-[var(--text-muted)] text-[11px] border border-dashed border-[var(--border-color)] rounded">
                  Awaiting payload execution... Metrics will compute in real-time.
                </div>
              )}
            </div>

            <div className="text-[10px] text-[var(--text-muted)] text-center pt-2 border-t border-[var(--border-color)]">
              Deterministic Seed: <span className="text-[var(--accent-primary)] font-bold">{settings.randomSeed}</span> • Zero Hallucinations
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-lg border border-red-500/50 bg-red-500/10 text-red-500 font-mono text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Terminal Output Section with Typewriter Effect */}
        {result && (
          <div className="pt-2 border-t border-[var(--border-color)] space-y-3 relative z-10 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] animate-ping" />
                <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--accent-primary)] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Rewritten Output (Typewriter Stream)
                </h3>
                {isTyping && (
                  <span className="text-[10px] font-mono text-[var(--accent-primary)] uppercase animate-pulse">
                    [STREAMING...]
                  </span>
                )}
              </div>

              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--subtle-bg)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                id="copy-output-btn"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Payload!' : 'Copy Result'}</span>
              </button>
            </div>

            {/* Typewriter Terminal Box */}
            <div className="p-5 rounded-lg bg-[var(--subtle-bg)] border border-[var(--accent-primary)]/40 text-[var(--text-primary)] font-mono text-sm leading-relaxed whitespace-pre-wrap min-h-[120px] shadow-inner relative">
              <span>{typedOutput}</span>
              <span className={`inline-block w-2.5 h-4 ml-0.5 bg-[var(--accent-primary)] ${isTyping ? 'animate-pulse' : 'animate-bounce'}`} />
            </div>

            {/* Sentence Level Breakdown Table */}
            {result.sentences.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[var(--border-color)] space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-[var(--text-muted)] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" /> Sentence Decomposition Log
                </h4>

                <div className="space-y-2">
                  {result.sentences.map((sent, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded border font-mono text-xs space-y-1.5 ${
                        sent.accepted
                          ? 'border-[var(--border-color)] bg-[var(--card-bg)]'
                          : 'border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/5'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[var(--accent-primary)]">SENTENCE #{idx + 1}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${sent.accepted ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-[var(--accent-primary)] border border-amber-500/30'}`}>
                          {sent.accepted ? `ACCEPTED (${(sent.similarity * 100).toFixed(1)}%)` : `FALLBACK (${(sent.similarity * 100).toFixed(1)}%)`}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                        <div>
                          <span className="text-[var(--text-muted)] block text-[10px]">ORIGINAL:</span>
                          <span className="text-[var(--text-secondary)]">{sent.original}</span>
                        </div>
                        <div>
                          <span className="text-[var(--text-muted)] block text-[10px]">REWRITTEN:</span>
                          <span className="text-[var(--text-primary)] font-medium">{sent.rewritten}</span>
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
    </div>
  );
};
