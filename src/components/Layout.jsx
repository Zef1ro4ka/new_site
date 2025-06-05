import React, { useEffect, useState } from 'react';
import Clock from './Clock';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import '../style.css';

const Layout = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="layout">
      <Sidebar
        isClosed={isSidebarClosed}
        toggleSidebar={() => setIsSidebarClosed(prev => !prev)}
      />
      
      <Clock />
      <SearchBar isSidebarClosed={isSidebarClosed} />
      {
        typeof children === 'function'
          ? children({ isSidebarClosed, theme, setTheme })  // ← тут передаємо
          : children
      }
    </div>
  );
};

export default Layout;
