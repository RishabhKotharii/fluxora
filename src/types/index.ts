export type Priority = 'High' | 'Medium' | 'Low';
export type Tag = 'Bug' | 'Feature' | 'Improvement';
export type Column = 'Backlog' | 'Ready' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  tag: Tag;
  column: Column;
  createdAt: string;
}

export type Theme = 'dark' | 'light';
