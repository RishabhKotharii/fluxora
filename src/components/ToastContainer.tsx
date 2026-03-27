import React from 'react';
import { useToast } from '../hooks/useToast';

export default function ToastContainer() {
  const { toasts, remove } = useToast();

  if (toasts.length === 0) return null;

  const typeStyles = {
    success: 'bg-emerald-500',
    error: 'bg-rose-500',
    info: 'bg-violet-500',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => remove(t.id)}
          className={`${typeStyles[t.type]} text-white px-4 py-3 rounded-xl shadow-xl
            flex items-center gap-3 cursor-pointer min-w-64 animate-slide-in text-sm font-medium`}
          style={{ animation: 'slideIn 0.3s ease' }}
        >
          <span className="flex-1">{t.message}</span>
          <span className="text-white/70 hover:text-white text-xs">✕</span>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
