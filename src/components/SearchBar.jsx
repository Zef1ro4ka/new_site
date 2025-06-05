import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../style.css'; // Підключення стилів

function SearchBar({ isSidebarClosed }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className={`search-bar-container ${isSidebarClosed ? 'sidebar-closed' : ''}`}>
      {isOpen ? (
        <input
          type="text"
          placeholder="Пошук..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setIsOpen(false)}
          autoFocus
          className="search-input"
        />
      ) : (
        <FaSearch className="search-icon" onClick={() => setIsOpen(true)} />
      )}
    </div>
  );
}

export default SearchBar;
