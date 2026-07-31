'use client';

import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon, ArrowUpRight, ShieldCheck, Activity, Cpu, Sparkles } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string;
  label: string;
  subtext: string;
  status: string;
  statusColor?: 'amber' | 'emerald' | 'cyan' | 'zinc';
  icon: LucideIcon;
  details?: { label: string; val: string }[];
  index?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  label,
  subtext,
  status,
  statusColor = 'amber',
  icon: Icon,
  details = [],
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--accent-primary)] transition-all duration-300 shadow-md overflow-hidden flex flex-col justify-between"
    >
      {/* Top Accent Subtle Amber Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-primary)]/5 rounded-full blur-xl group-hover:bg-[var(--accent-primary)]/10 transition-colors pointer-events-none" />

      <div>
        {/* Header Header */}
        <div className="flex items-center justify-between gap-2 border-b border-[var(--border-color)] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[var(--subtle-bg)] border border-[var(--border-color)] text-[var(--accent-primary)] group-hover:border-[var(--accent-primary)]/40 transition-colors">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
              {title}
            </span>
          </div>

          <span
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider uppercase border ${
              statusColor === 'emerald'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : statusColor === 'cyan'
                ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30'
                : 'bg-amber-500/10 text-[var(--accent-primary)] border-amber-500/30'
            }`}
          >
            {status}
          </span>
        </div>

        {/* Main Stat Display */}
        <div className="space-y-1 my-2">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] tracking-tight">
              {value}
            </h2>
            <span className="text-xs font-mono font-bold text-[var(--accent-primary)] flex items-center gap-0.5">
              {label}
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] font-mono text-[var(--text-muted)] truncate leading-relaxed">
            {subtext}
          </p>
        </div>
      </div>

      {/* High-Density Details Sub-grid */}
      {details.length > 0 && (
        <div className="mt-3 pt-2 border-t border-[var(--border-color)] grid grid-cols-2 gap-2 font-mono text-[10px]">
          {details.map((item, idx) => (
            <div key={idx} className="p-1.5 rounded bg-[var(--subtle-bg)] border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block uppercase font-medium">{item.label}</span>
              <span className="text-[var(--text-primary)] font-bold block truncate">{item.val}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
