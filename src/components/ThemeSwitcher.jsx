import React, { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <select id="theme-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Світла</option>
      <option value="dark">Темна</option>
    </select>
  );
};

export default ThemeSwitcher;
