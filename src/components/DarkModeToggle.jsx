import { useState, useEffect } from 'react';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme from the document class
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    
    // Toggle dark class on <html> element
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      // Removed background, borders, and padding. Added hover effect and transition.
      className="flex items-center justify-center p-2 rounded-full transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 outline-none"
      aria-label="Toggle Dark Mode"
    >
      <span className="text-2xl">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}