import { useState, useEffect, useCallback } from 'react';
import type { Task, Column, Priority, Tag } from '../types';
import { loadTasks, saveTasks, generateId } from '../utils/storage';
import { COLUMNS, PRIORITY_ORDER } from '../utils/constants';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback(
    (data: { title: string; description: string; priority: Priority; tag: Tag }) => {
      const newTask: Task = {
        id: generateId(),
        ...data,
        column: 'Backlog',
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [...prev, newTask]);
    },
    []
  );

  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback((id: string, direction: 'forward' | 'backward') => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = COLUMNS.indexOf(t.column);
        const nextIdx = direction === 'forward' ? idx + 1 : idx - 1;
        if (nextIdx < 0 || nextIdx >= COLUMNS.length) return t;
        return { ...t, column: COLUMNS[nextIdx] as Column };
      })
    );
  }, []);

  const getColumnTasks = useCallback(
    (column: Column, priorityFilter: Priority | 'All', tagFilter: Tag | 'All') => {
      return tasks
        .filter((t) => t.column === column)
        .filter((t) => priorityFilter === 'All' || t.priority === priorityFilter)
        .filter((t) => tagFilter === 'All' || t.tag === tagFilter)
        .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    },
    [tasks]
  );

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.column === 'Done').length,
    byColumn: COLUMNS.map((col) => ({
      name: col,
      count: tasks.filter((t) => t.column === col).length,
    })),
    byTag: ['Bug', 'Feature', 'Improvement'].map((tag) => ({
      name: tag,
      count: tasks.filter((t) => t.tag === tag).length,
    })),
  };

  return { tasks, addTask, updateTask, deleteTask, moveTask, getColumnTasks, stats };
}
