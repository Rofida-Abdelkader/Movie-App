import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Read from localStorage on first render instead of always starting false
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && document.documentElement.classList.contains('dark'));
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-center p-2 rounded-full transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 outline-none"
      aria-label="Toggle Dark Mode"
    >
      <span className="text-2xl">
        {isDark ? <FaMoon /> : <FaSun color='yellow' />}
      </span>
    </button>
  );
}