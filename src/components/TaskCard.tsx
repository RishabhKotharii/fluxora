import React from 'react';
import type { Task } from '../types';
import { PRIORITY_COLORS, TAG_COLORS, COLUMNS } from '../utils/constants';
import { formatDate } from '../utils/storage';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: 'forward' | 'backward') => void;
}

const PRIORITY_DOTS: Record<string, string> = {
  High: 'bg-rose-400',
  Medium: 'bg-amber-400',
  Low: 'bg-sky-400',
};

export default function TaskCard({ task, onEdit, onDelete, onMove }: Props) {
  const colIdx = COLUMNS.indexOf(task.column);
  const canGoBack = colIdx > 0;
  const canGoForward = colIdx < COLUMNS.length - 1;

  return (
    <div
      className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex flex-col gap-3
        card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-200 group"
    >
      {/* Header */}
      <div className="flex items-start gap-2">
        <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${PRIORITY_DOTS[task.priority]}`} />
        <h3 className="text-[var(--text)] font-medium text-sm leading-snug flex-1">{task.title}</h3>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-[var(--muted)] text-xs leading-relaxed line-clamp-2">{task.description}</p>
      )}

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${PRIORITY_COLORS[task.priority]}`}>
          {task.priority}
        </span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${TAG_COLORS[task.tag]}`}>
          {task.tag}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]">
        <span className="text-[var(--muted)] text-[10px]">{formatDate(task.createdAt)}</span>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {canGoBack && (
            <button
              onClick={() => onMove(task.id, 'backward')}
              title="Move back"
              className="w-6 h-6 rounded-md flex items-center justify-center text-[var(--muted)]
                hover:bg-[var(--hover)] hover:text-[var(--text)] transition-colors text-xs"
            >
              ←
            </button>
          )}
          <button
            onClick={() => onEdit(task)}
            title="Edit"
            className="w-6 h-6 rounded-md flex items-center justify-center text-[var(--muted)]
              hover:bg-[var(--hover)] hover:text-violet-400 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            title="Delete"
            className="w-6 h-6 rounded-md flex items-center justify-center text-[var(--muted)]
              hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
          {canGoForward && (
            <button
              onClick={() => onMove(task.id, 'forward')}
              title="Move forward"
              className="w-6 h-6 rounded-md flex items-center justify-center text-[var(--muted)]
                hover:bg-[var(--hover)] hover:text-[var(--text)] transition-colors text-xs"
            >
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
