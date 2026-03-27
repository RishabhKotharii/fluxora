import React from 'react';
import type { Priority, Tag } from '../types';

interface Props {
  priorityFilter: Priority | 'All';
  tagFilter: Tag | 'All';
  onPriorityChange: (v: Priority | 'All') => void;
  onTagChange: (v: Tag | 'All') => void;
}

const PRIORITIES: (Priority | 'All')[] = ['All', 'High', 'Medium', 'Low'];
const TAGS: (Tag | 'All')[] = ['All', 'Bug', 'Feature', 'Improvement'];

function FilterBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
        ${active
          ? 'bg-violet-600 text-white shadow-sm'
          : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--hover)]'
        }`}
    >
      {children}
    </button>
  );
}

export default function FilterBar({ priorityFilter, tagFilter, onPriorityChange, onTagChange }: Props) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-1">
        <span className="text-[var(--muted)] text-xs mr-1">Priority:</span>
        {PRIORITIES.map((p) => (
          <FilterBtn key={p} active={priorityFilter === p} onClick={() => onPriorityChange(p)}>
            {p}
          </FilterBtn>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[var(--muted)] text-xs mr-1">Tag:</span>
        {TAGS.map((t) => (
          <FilterBtn key={t} active={tagFilter === t} onClick={() => onTagChange(t)}>
            {t}
          </FilterBtn>
        ))}
      </div>
    </div>
  );
}
