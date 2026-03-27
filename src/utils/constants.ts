import type { Priority, Column } from '../types';

export const COLUMNS: Column[] = ['Backlog', 'Ready', 'In Progress', 'Done'];

export const PRIORITY_ORDER: Record<Priority, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};

export const COLUMN_COLORS: Record<Column, string> = {
  Backlog: 'bg-slate-500',
  Ready: 'bg-violet-500',
  'In Progress': 'bg-amber-500',
  Done: 'bg-emerald-500',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  High: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Low: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
};

export const TAG_COLORS: Record<string, string> = {
  Bug: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
  Feature: 'text-violet-300 bg-violet-500/10 border-violet-500/20',
  Improvement: 'text-teal-300 bg-teal-500/10 border-teal-500/20',
};
