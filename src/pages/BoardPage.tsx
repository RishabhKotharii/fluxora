import React, { useState } from 'react';
import type { Column, Priority, Tag, Task } from '../types';
import { COLUMNS } from '../utils/constants';
import KanbanColumn from '../components/KanbanColumn';
import FilterBar from '../components/FilterBar';

interface Props {
  getColumnTasks: (col: Column, p: Priority | 'All', t: Tag | 'All') => Task[];
  onAdd: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: 'forward' | 'backward') => void;
}

export default function BoardPage({ getColumnTasks, onAdd, onEdit, onDelete, onMove }: Props) {
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'All'>('All');
  const [tagFilter, setTagFilter] = useState<Tag | 'All'>('All');

  return (
    <div className="flex flex-col gap-5">
      <FilterBar
        priorityFilter={priorityFilter}
        tagFilter={tagFilter}
        onPriorityChange={setPriorityFilter}
        onTagChange={setTagFilter}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col}
            column={col}
            tasks={getColumnTasks(col, priorityFilter, tagFilter)}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
      </div>
    </div>
  );
}
