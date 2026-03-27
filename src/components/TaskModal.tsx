import React, { useState, useEffect } from 'react';
import type { Task, Priority, Tag } from '../types';
import { PRIORITY_COLORS, TAG_COLORS } from '../utils/constants';

interface Props {
  onClose: () => void;
  onSave: (data: { title: string; description: string; priority: Priority; tag: Tag }) => void;
  editTask?: Task | null;
}

const PRIORITIES: Priority[] = ['High', 'Medium', 'Low'];
const TAGS: Tag[] = ['Bug', 'Feature', 'Improvement'];

export default function TaskModal({ onClose, onSave, editTask }: Props) {
  const [title, setTitle] = useState(editTask?.title ?? '');
  const [description, setDescription] = useState(editTask?.description ?? '');
  const [priority, setPriority] = useState<Priority>(editTask?.priority ?? 'Medium');
  const [tag, setTag] = useState<Tag>(editTask?.tag ?? 'Feature');
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required'); return; }
    onSave({ title: title.trim(), description: description.trim(), priority, tag });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[var(--text)] font-semibold text-lg">
            {editTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button onClick={onClose} className="text-[var(--muted)] hover:text-[var(--text)] transition-colors text-xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">Title *</label>
            <input
              autoFocus
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(''); }}
              placeholder="What needs to be done?"
              className="w-full bg-[var(--input)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm
                text-[var(--text)] placeholder-[var(--muted)] outline-none focus:border-violet-500 transition-colors"
            />
            {error && <p className="text-rose-400 text-xs mt-1">{error}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows={3}
              className="w-full bg-[var(--input)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm
                text-[var(--text)] placeholder-[var(--muted)] outline-none focus:border-violet-500 resize-none transition-colors"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">Priority</label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all
                    ${priority === p ? PRIORITY_COLORS[p] + ' ring-1 ring-current' : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--muted)]'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">Tag</label>
            <div className="flex gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all
                    ${tag === t ? TAG_COLORS[t] + ' ring-1 ring-current' : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--muted)]'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-[var(--border)]
                text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--muted)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-violet-600 hover:bg-violet-500
                text-white transition-colors"
            >
              {editTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
