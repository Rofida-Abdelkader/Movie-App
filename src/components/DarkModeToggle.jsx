import { useState, useEffect } from 'react';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    
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
      className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 
                 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
    >
      <span className="text-xl">
        {isDark ? '🌙' : '☀️'}
      </span>
      
      <span className="font-medium">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}