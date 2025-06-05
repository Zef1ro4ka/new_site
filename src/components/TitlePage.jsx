import React from 'react';
import Layout from './Layout';
import RequestsPanel from './RequestsPanel';
import MainContent from './MainContent';
import ThemeSwitcher from './ThemeSwitcher';
import Sidebar from './Sidebar';
function TitlePage() {
  return (
    <Layout>
      {({ isSidebarClosed, theme, setTheme }) => (
        <>
          <RequestsPanel isSidebarClosed={isSidebarClosed} />
          <div className="main-content">
            <div className='top-controls'>
              <button className="add_client">Новий клієнт</button>
              <ThemeSwitcher theme={theme} setTheme={setTheme} />
            </div>
            <MainContent />
          </div>
        </>
      )}
    </Layout>
  );
}

export default TitlePage;
