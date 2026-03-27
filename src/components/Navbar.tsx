import { useState } from 'react';
import type { Theme } from '../types';

interface Props {
  theme: Theme;
  onToggle: () => void;
  onNewTask: () => void;
  activeTab: 'board' | 'dashboard';
  onTabChange: (tab: 'board' | 'dashboard') => void;
}

export default function Navbar({ theme, onToggle, onNewTask, activeTab, onTabChange }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTabChange = (tab: 'board' | 'dashboard') => {
    onTabChange(tab);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-[var(--bg)]/80 glass border-b border-[var(--border)]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">FT</span>
            </div>
            <span className="text-[var(--text)] font-bold text-base tracking-tight">FlowTrack</span>
          </div>

          {/* Desktop tabs */}
          <nav className="hidden sm:flex items-center gap-1 ml-4">
            {(['board', 'dashboard'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all
                  ${activeTab === tab
                    ? 'bg-violet-600 text-white'
                    : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--hover)]'
                  }`}
              >
                {tab === 'board' ? '🗂 Board' : '📊 Dashboard'}
              </button>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Desktop: theme toggle + new task */}
          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggle} />
            <NewTaskBtn onClick={onNewTask} />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggle} />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="w-8 h-8 rounded-lg flex flex-col items-center justify-center gap-1.5
                text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--hover)] transition-colors"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-4.5 bg-current rounded-full transition-all duration-300 origin-center
                  ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`block h-0.5 w-4.5 bg-current rounded-full transition-all duration-300
                  ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-4.5 bg-current rounded-full transition-all duration-300 origin-center
                  ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-4 pb-4 flex flex-col gap-2 border-t border-[var(--border)] pt-3">
            {(['board', 'dashboard'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${activeTab === tab
                    ? 'bg-violet-600 text-white'
                    : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--hover)]'
                  }`}
              >
                {tab === 'board' ? '🗂  Board' : '📊  Dashboard'}
              </button>
            ))}
            <button
              onClick={() => { onNewTask(); setMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm
                font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors mt-1"
            >
              <span className="text-base leading-none">+</span> New Task
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop to close menu on tap */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-20 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--muted)]
        hover:text-[var(--text)] hover:bg-[var(--hover)] transition-colors"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

function NewTaskBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold
        bg-violet-600 hover:bg-violet-500 text-white transition-colors shadow-sm"
    >
      <span className="text-base leading-none">+</span>
      New Task
    </button>
  );
}
