'use client';

import Link from 'next/link';
import { useTheme } from './theme-provider';
import { Moon, Sun } from 'lucide-react';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="relative z-50 border-b border-border/50 glass-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-orbitron font-bold glow-text">
              MINDTRX
            </h1>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/privacy" 
              className="text-sm hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent transition-all electric-button"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

