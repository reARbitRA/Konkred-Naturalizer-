'use client';

import React from 'react';
import { motion } from 'motion/react';
import { StatCard } from '@/components/StatCard';
import { LiveTerminal } from '@/components/LiveTerminal';
import {
  ShieldCheck,
  Cpu,
  Activity,
  Sparkles,
  Lock,
  Layers,
  Terminal,
  Database,
  CheckCircle2,
  FileCheck,
  Zap,
} from 'lucide-react';

export const BentoDashboard: React.FC = () => {
  const statCardsData = [
    {
      title: 'Semantic Score',
      value: '0.942',
      label: '+3.4%',
      subtext: 'Cosine Similarity Threshold: >= 0.78',
      status: 'OPTIMAL',
      statusColor: 'amber' as const,
      icon: Sparkles,
      details: [
        { label: 'Model', val: 'SBERT mpnet-v2' },
        { label: 'Gate Pass', val: '99.4%' },
      ],
    },
    {
      title: 'Pattern Scrubbing',
      value: '99.8%',
      label: 'PURGED',
      subtext: 'Robotic AI Clichés & Fluff Removed',
      status: 'SECURE',
      statusColor: 'amber' as const,
      icon: ShieldCheck,
      details: [
        { label: 'Cliché Filter', val: 'Active' },
        { label: 'Hallucinations', val: '0.00%' },
      ],
    },
    {
      title: 'API Health',
      value: '99.99%',
      label: '14ms',
      subtext: 'Rate Limit: 120 req/min per IP',
      status: 'NOMINAL',
      statusColor: 'amber' as const,
      icon: Activity,
      details: [
        { label: 'Concurrency', val: 'Thread-Safe' },
        { label: 'Uptime', val: '99.99%' },
      ],
    },
    {
      title: 'Execution Depth',
      value: '5 STAGES',
      label: 'DETERMINISTIC',
      subtext: 'spaCy POS + WordNet + SBERT Gate',
      status: 'ACTIVE',
      statusColor: 'amber' as const,
      icon: Cpu,
      details: [
        { label: 'RNG Seed', val: '42 (Fixed)' },
        { label: 'Audit Log', val: 'SHA-256' },
      ],
    },
  ];

  // Motion container variants for staggered fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-7xl mx-auto space-y-6"
    >
      {/* Hero / Header Command Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-primary)]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 font-mono">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 uppercase tracking-widest">
                CYBERSECURITY GRADE REWRITE SYSTEM
              </span>
              <span className="text-xs text-[var(--text-muted)]">• Zero LLM Hallucinations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[var(--text-primary)] flex items-center gap-2">
              ARBITRA<span className="text-[var(--accent-primary)]">.</span>QA CORE COMMAND
            </h1>
            <p className="text-xs text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              High-density deterministic semantic rewrite engine with spaCy POS dependency parsing, SBERT cosine similarity gate (&gt;= 0.78 threshold), and tamper-evident SHA-256 audit fingerprinting.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3 py-2 rounded-lg bg-[var(--subtle-bg)] border border-[var(--border-color)] text-right">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold">STATUS</span>
              <span className="text-xs font-bold text-[var(--accent-primary)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] status-pulse" />
                ORCHESTRATING
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4 StatCards in High-Density Bento Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCardsData.map((card, idx) => (
          <StatCard
            key={card.title}
            index={idx}
            title={card.title}
            value={card.value}
            label={card.label}
            subtext={card.subtext}
            status={card.status}
            statusColor={card.statusColor}
            icon={card.icon}
            details={card.details}
          />
        ))}
      </div>

      {/* Central Live Terminal Section with Glowing Amber Border */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <LiveTerminal />
      </motion.div>

      {/* Bottom Bento Grid: System Architecture & Security Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs"
      >
        {/* Panel 1: Stage Execution Graph */}
        <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <span className="font-bold text-[var(--accent-primary)] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> 5-Stage Execution Order
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">PIPELINE.PY</span>
          </div>

          <div className="space-y-2 text-[11px]">
            {[
              { num: '01', name: 'Semantic Decomposition', detail: 'spaCy dependency parser' },
              { num: '02', name: 'POS-Aware Synonym Swap', detail: 'WordNet noun/verb filter' },
              { num: '03', name: 'SBERT Similarity Gate', detail: 'Cosine >= 0.78 threshold' },
              { num: '04', name: 'Cadence & Rhythm Engine', detail: 'Varied clause structure' },
              { num: '05', name: 'Pattern Scrub & Audit', detail: 'SHA-256 fingerprint' },
            ].map((stg) => (
              <div key={stg.num} className="p-2 rounded bg-[var(--subtle-bg)] border border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold text-[10px] border border-[var(--accent-primary)]/30">
                    {stg.num}
                  </span>
                  <span className="text-[var(--text-primary)] font-medium">{stg.name}</span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">{stg.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Security & Rate Limiting Enclave */}
        <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <span className="font-bold text-[var(--accent-primary)] uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> Security & Rate Enclave
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">SECURITY.PY</span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="p-2.5 rounded bg-[var(--subtle-bg)] border border-[var(--border-color)] flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Sliding Window Rate Limit</span>
              <span className="font-bold text-[var(--text-primary)]">120 req / min</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--subtle-bg)] border border-[var(--border-color)] flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Max Payload Constraint</span>
              <span className="font-bold text-[var(--text-primary)]">50,000 Chars</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--subtle-bg)] border border-[var(--border-color)] flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Proxy Trust Headers</span>
              <span className="font-bold text-[var(--accent-primary)]">X-Forwarded-For</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--subtle-bg)] border border-[var(--border-color)] flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Immutable Audit Logging</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> SHA-256
              </span>
            </div>
          </div>
        </div>

        {/* Panel 3: Deterministic Rule Matrix */}
        <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <span className="font-bold text-[var(--accent-primary)] uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" /> Deterministic Rules
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">CONFIG.YAML</span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="p-2.5 rounded bg-[var(--subtle-bg)] border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[10px]">RNG SEED:</span>
              <span className="text-[var(--text-primary)] font-bold">42 (Reproducible Across Builds)</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--subtle-bg)] border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[10px]">NAMED ENTITY PROTECTION:</span>
              <span className="text-[var(--accent-primary)] font-bold">spaCy NER (Organizations, Places, Names)</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--subtle-bg)] border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[10px]">QUALITY GATE GUARANTEE:</span>
              <span className="text-[var(--text-primary)] font-bold">Automatic Fallback if Cosine &lt; 0.78</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
