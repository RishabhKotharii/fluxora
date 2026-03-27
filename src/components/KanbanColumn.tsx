import type { Column, Task } from '../types';
import { COLUMN_COLORS } from '../utils/constants';
import TaskCard from './TaskCard';

interface Props {
  column: Column;
  tasks: Task[];
  onAdd: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: 'forward' | 'backward') => void;
}

const COLUMN_ICONS: Record<Column, string> = {
  Backlog: '📋',
  Ready: '✅',
  'In Progress': '⚡',
  Done: '🎉',
};

export default function KanbanColumn({ column, tasks, onAdd, onEdit, onDelete, onMove }: Props) {
  return (
    <div className="flex flex-col bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden min-h-96 w-full">
      {/* Column Header */}
      <div className="px-4 py-3 border-b border-[var(--border)] flex items-center gap-2.5">
        <span className="text-base">{COLUMN_ICONS[column]}</span>
        <span className="text-[var(--text)] font-semibold text-sm flex-1">{column}</span>
        <span className={`${COLUMN_COLORS[column]} text-white text-[10px] font-bold w-5 h-5
          flex items-center justify-center rounded-full`}>
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
            <div className="text-3xl mb-2 opacity-30">○</div>
            <p className="text-[var(--muted)] text-xs">No tasks here</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))
        )}
      </div>

      {/* Add button (only on Backlog) */}
      {column === 'Backlog' && (
        <div className="p-3 border-t border-[var(--border)]">
          <button
            onClick={onAdd}
            className="w-full py-2 rounded-lg text-xs font-medium text-[var(--muted)] border border-dashed
              border-[var(--border)] hover:border-violet-500 hover:text-violet-400 transition-colors flex items-center
              justify-center gap-1.5"
          >
            <span className="text-lg leading-none">+</span> Add Task
          </button>
        </div>
      )}
    </div>
  );
}
