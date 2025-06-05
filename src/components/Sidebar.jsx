import React from 'react';

function Sidebar({ isClosed, toggleSidebar }) {
  return (
    <div className={`sidebar-wrapper ${isClosed ? 'closed' : 'open'}`} id="sidebarWrapper">
      <aside className="sidebar">
        <p className="sidebar-menu">Меню</p>
        <a className='menu_button' href="1.html">Графік(ще не готово)</a>
        <a className='menu_button' href="2.html">Ціни за роботу(ще не готово)</a>
        <a className='menu_button' href="3.html">Тимчасовий перед 1 числом(ще не готово)</a>
        <a className='menu_button' href="4.html">СМС(ще не готово)</a>
        <a className='menu_button' href="5.html">Графік прозвона абонентів(ще не готово)</a>
      </aside>
      <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
    </div>
  );
}

export default Sidebar;
