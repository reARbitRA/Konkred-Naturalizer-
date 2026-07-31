'use client';

import React, { useState } from 'react';
import { Network, Shield, ArrowRight, CheckCircle2, Cpu, Database, Lock, Server } from 'lucide-react';

interface StageNode {
  id: string;
  name: string;
  module: string;
  description: string;
  inputs: string;
  outputs: string;
  guarantees: string;
}

const STAGES: StageNode[] = [
  {
    id: 'stage1',
    name: '1. Semantic Decomposition',
    module: 'backend/semantic.py',
    description: 'Decomposes raw input text into immutable SemanticUnit objects using spaCy dependency parsing.',
    inputs: 'Raw text string',
    outputs: 'List of SemanticUnit (frozen dataclass)',
    guarantees: 'Zero text mutation, stable sentence boundary extraction.',
  },
  {
    id: 'stage2',
    name: '2. POS-Aware Synonym Rewrite',
    module: 'backend/rewrite.py',
    description: 'Replaces non-entity nouns, verbs, adjectives, and adverbs with POS-filtered WordNet synonyms.',
    inputs: 'List of SemanticUnit, Seed',
    outputs: 'List of (original, rewritten) sentence pairs',
    guarantees: 'Named entities strictly preserved, POS accuracy guaranteed.',
  },
  {
    id: 'stage3',
    name: '3. Quality Validation Gate',
    module: 'backend/qa_validator.py',
    description: 'Calculates cosine similarity with Sentence-BERT (all-mpnet-base-v2). Rejects low-score rewrites.',
    inputs: 'Original sentence, Rewritten candidate',
    outputs: '{ valid: boolean, similarity: float }',
    guarantees: 'Cosine similarity >= 0.78 threshold; fallback on failure.',
  },
  {
    id: 'stage4',
    name: '4. Rhythm & Cadence Engine',
    module: 'backend/style.py',
    description: 'Applies structural variation, removes redundant adverbs, splits semicolon clauses naturally.',
    inputs: 'Accepted sentences list, Seed',
    outputs: 'Joined text string with varied rhythm',
    guarantees: 'No sentence duplication, preserved logical order.',
  },
  {
    id: 'stage5',
    name: '5. AI-Pattern Scrubbing & Audit',
    module: 'backend/noise.py & audit.py',
    description: 'Strips robotic AI transition phrases and produces immutable SHA-256 audit fingerprint.',
    inputs: 'Styled text string',
    outputs: 'Final output string & Fingerprint JSON',
    guarantees: 'Detector-resistant text, tamper-evident hash.',
  },
];

export const ArchitectureDiagram: React.FC = () => {
  const [activeStage, setActiveStage] = useState<StageNode>(STAGES[0]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Title */}
      <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              Architecture & Dependency Graph
            </h1>
            <p className="text-sm font-mono text-[var(--text-secondary)] mt-0.5">
              Interactive visualization of ARBITRA QA CORE&apos;s 5-stage pipeline, trust boundaries, and component dependency map.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-lg space-y-6">
        <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-[var(--accent-primary)] flex items-center gap-2">
          <Cpu className="w-4 h-4" /> Pipeline Stage Explorer
        </h3>

        {/* Pipeline Nodes Flow Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {STAGES.map((stg) => (
            <button
              key={stg.id}
              onClick={() => setActiveStage(stg)}
              className={`p-3 rounded-lg border text-left font-mono transition-all flex flex-col justify-between ${
                activeStage.id === stg.id
                  ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 shadow-md ring-1 ring-[var(--accent-primary)]'
                  : 'border-[var(--border-color)] bg-[var(--card-elevated)] hover:border-[var(--border-active)]'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold text-[var(--accent-secondary)] uppercase block">
                  {stg.id.toUpperCase()}
                </span>
                <span className="text-xs font-bold text-[var(--text-primary)] block mt-1 line-clamp-1">
                  {stg.name.split('. ')[1]}
                </span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] mt-2 block truncate">
                {stg.module}
              </span>
            </button>
          ))}
        </div>

        {/* Active Stage Detail Panel */}
        <div className="p-5 rounded-lg border border-[var(--border-active)] bg-[var(--code-bg)] font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <h4 className="text-sm font-bold text-[var(--accent-primary)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-secondary)]" /> {activeStage.name}
            </h4>
            <span className="px-2 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-muted)] text-[10px]">
              Module: {activeStage.module}
            </span>
          </div>

          <p className="text-[var(--text-secondary)] leading-relaxed">{activeStage.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-2.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)]">
              <span className="text-[10px] uppercase text-[var(--text-muted)] block font-bold">Inputs</span>
              <span className="text-[var(--text-primary)] text-xs mt-1 block">{activeStage.inputs}</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)]">
              <span className="text-[10px] uppercase text-[var(--text-muted)] block font-bold">Outputs</span>
              <span className="text-[var(--text-primary)] text-xs mt-1 block">{activeStage.outputs}</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)]">
              <span className="text-[10px] uppercase text-[var(--accent-secondary)] block font-bold">Guarantee</span>
              <span className="text-[var(--accent-secondary)] text-xs mt-1 block">{activeStage.guarantees}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dependency Graph Table */}
      <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-4">
        <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-[var(--accent-primary)] flex items-center gap-2">
          <Server className="w-4 h-4" /> System Dependency Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border border-[var(--border-color)] rounded-lg">
            <thead className="bg-[var(--card-elevated)] text-[var(--accent-primary)]">
              <tr>
                <th className="p-3 border-b border-[var(--border-color)]">MODULE</th>
                <th className="p-3 border-b border-[var(--border-color)]">IMPORTS / DEPENDENCIES</th>
                <th className="p-3 border-b border-[var(--border-color)]">ROLE & RESPONSIBILITY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
              <tr>
                <td className="p-3 font-bold text-[var(--text-primary)]">backend/main.py</td>
                <td className="p-3 text-[var(--accent-warm)]">FastAPI, middleware, pipeline, audit</td>
                <td className="p-3">HTTP router, CORS, validation exception handlers.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--text-primary)]">backend/pipeline.py</td>
                <td className="p-3 text-[var(--accent-warm)]">semantic, rewrite, qa_validator, style, noise</td>
                <td className="p-3">Canonical 5-stage orchestration entry point.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--text-primary)]">backend/nlp_models.py</td>
                <td className="p-3 text-[var(--accent-warm)]">spacy, sentence_transformers, config</td>
                <td className="p-3">Lazy singleton loader with double-checked thread lock.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--text-primary)]">backend/security.py</td>
                <td className="p-3 text-[var(--accent-warm)]">threading, time, collections</td>
                <td className="p-3">Thread-safe sliding-window rate limiter (120 req/min).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
