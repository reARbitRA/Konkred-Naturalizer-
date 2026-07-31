'use client';

import React, { useState } from 'react';
import { Settings, Save, RotateCcw, Copy, Check, Sliders } from 'lucide-react';
import { DEFAULT_SETTINGS } from '@/lib/arbitra-engine';

export const ConfigEditor: React.FC = () => {
  const [config, setConfig] = useState({
    systemName: 'ARBITRA_QA_CORE',
    version: '6.2.0',
    mode: 'PRODUCTION',
    spacyModel: 'en_core_web_sm',
    sbertModel: 'sentence-transformers/all-mpnet-base-v2',
    semanticThreshold: DEFAULT_SETTINGS.semanticThreshold,
    randomSeed: DEFAULT_SETTINGS.randomSeed,
    maxInputLength: DEFAULT_SETTINGS.maxInputLength,
    synonymReplacementProb: DEFAULT_SETTINGS.synonymReplacementProbability,
    rateLimitPerMin: 120,
    enableAuditLog: true,
    trustProxyHeaders: false,
    logLevel: 'INFO',
  });

  const [copied, setCopied] = useState(false);

  const yamlContent = `SYSTEM:
  NAME: ${config.systemName}
  VERSION: "${config.version}"
  MODE: ${config.mode}
  SPACY_MODEL: ${config.spacyModel}
  SBERT_MODEL: ${config.sbertModel}

PIPELINE:
  SEMANTIC_THRESHOLD: ${config.semanticThreshold}
  RANDOM_SEED: ${config.randomSeed}
  MAX_INPUT_LENGTH: ${config.maxInputLength}
  SYNONYM_REPLACEMENT_PROBABILITY: ${config.synonymReplacementProb}

SECURITY:
  RATE_LIMIT_PER_MIN: ${config.rateLimitPerMin}
  ENABLE_AUDIT_LOG: ${config.enableAuditLog}
  TRUST_PROXY_HEADERS: ${config.trustProxyHeaders}
  ALLOWED_ORIGINS:
    - "http://localhost:3000"
    - "http://127.0.0.1:3000"

LOGGING:
  LEVEL: ${config.logLevel}
  JSON: true`;

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(yamlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Title */}
      <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              Configuration & Rule Manager (`config.yaml`)
            </h1>
            <p className="text-sm font-mono text-[var(--text-secondary)] mt-0.5">
              Customize pipeline seeds, semantic threshold constraints, rate limits, and model loading specs.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Form Controls */}
        <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-4 font-mono text-xs">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)] flex items-center gap-2">
            <Sliders className="w-4 h-4" /> System & Pipeline Controls
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-[var(--text-muted)] block mb-1 font-bold">MODE:</label>
              <select
                value={config.mode}
                onChange={(e) => setConfig({ ...config, mode: e.target.value })}
                className="w-full p-2 rounded bg-[var(--card-elevated)] border border-[var(--border-color)] text-[var(--text-primary)]"
              >
                <option value="PRODUCTION">PRODUCTION</option>
                <option value="DEVELOPMENT">DEVELOPMENT</option>
                <option value="TEST">TEST</option>
              </select>
            </div>

            <div>
              <label className="text-[var(--text-muted)] block mb-1 font-bold">Semantic Threshold ({config.semanticThreshold}):</label>
              <input
                type="range"
                min="0.60"
                max="0.95"
                step="0.02"
                value={config.semanticThreshold}
                onChange={(e) => setConfig({ ...config, semanticThreshold: parseFloat(e.target.value) })}
                className="w-full accent-[var(--accent-primary)]"
              />
            </div>

            <div>
              <label className="text-[var(--text-muted)] block mb-1 font-bold">Rate Limit (req/min):</label>
              <input
                type="number"
                value={config.rateLimitPerMin}
                onChange={(e) => setConfig({ ...config, rateLimitPerMin: parseInt(e.target.value) || 120 })}
                className="w-full p-2 rounded bg-[var(--card-elevated)] border border-[var(--border-color)] text-[var(--text-primary)]"
              />
            </div>

            <div className="pt-2 border-t border-[var(--border-color)] space-y-2">
              <label className="flex items-center gap-2 text-[var(--text-primary)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.enableAuditLog}
                  onChange={(e) => setConfig({ ...config, enableAuditLog: e.target.checked })}
                  className="accent-[var(--accent-secondary)]"
                />
                <span>Enable Immutable SHA-256 Audit Logging</span>
              </label>

              <label className="flex items-center gap-2 text-[var(--text-primary)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.trustProxyHeaders}
                  onChange={(e) => setConfig({ ...config, trustProxyHeaders: e.target.checked })}
                  className="accent-[var(--accent-secondary)]"
                />
                <span>Trust Proxy Headers (X-Forwarded-For)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Generated YAML Preview */}
        <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)]">
              `config.yaml` Output
            </h3>
            <button
              onClick={handleCopyYaml}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--card-elevated)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] text-xs font-mono flex items-center gap-1.5"
              id="copy-yaml-config-button"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied YAML!' : 'Copy YAML'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-lg bg-[var(--code-bg)] border border-[var(--border-color)] text-[var(--accent-secondary)] font-mono text-xs overflow-x-auto h-72 leading-relaxed">
            {yamlContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
