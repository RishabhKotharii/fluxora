import React, { useState } from 'react';
import type { Task, Priority, Tag } from './types';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';
import { toast } from './hooks/useToast';
import Navbar from './components/Navbar';
import TaskModal from './components/TaskModal';
import ToastContainer from './components/ToastContainer';
import BoardPage from './pages/BoardPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const { addTask, updateTask, deleteTask, moveTask, getColumnTasks, stats } = useTasks();
  const { theme, toggle } = useTheme();

  const [activeTab, setActiveTab] = useState<'board' | 'dashboard'>('board');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleSave = (data: { title: string; description: string; priority: Priority; tag: Tag }) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      toast('Task updated', 'info');
    } else {
      addTask(data);
      toast('Task created 🎉', 'success');
    }
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
    toast('Task deleted', 'error');
  };

  const handleMove = (id: string, direction: 'forward' | 'backward') => {
    moveTask(id, direction);
    toast(direction === 'forward' ? 'Moved forward →' : '← Moved back', 'info');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-[var(--bg)] transition-colors duration-300">
      <Navbar
        theme={theme}
        onToggle={toggle}
        onNewTask={() => setShowModal(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'board' ? (
          <BoardPage
            getColumnTasks={getColumnTasks}
            onAdd={() => setShowModal(true)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onMove={handleMove}
          />
        ) : (
          <DashboardPage stats={stats} />
        )}
      </main>

      {showModal && (
        <TaskModal
          onClose={handleCloseModal}
          onSave={handleSave}
          editTask={editingTask}
        />
      )}

      <ToastContainer />
    </div>
  );
}
