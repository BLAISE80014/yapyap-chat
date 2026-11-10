import React, { useEffect, useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('yapyap-theme') || 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('yapyap-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(current => current === 'light' ? 'dark' : 'light');

  return (
    <button type='button' className='theme-toggle' onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      {theme === 'light' ? '☾' : '☀'}
    </button>
  );
}

export default ThemeToggle;
