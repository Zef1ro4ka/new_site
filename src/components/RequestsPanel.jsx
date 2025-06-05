import React from 'react';

function RequestsPanel({ isSidebarClosed }) {
  return (
    <div className={`requests-panel ${isSidebarClosed ? 'sidebar-closed' : ''}`} id="requestsPanel">
      <h3>Останні заявки</h3>
      <table className="request-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Адреса</th>
            <th>Контактні данні</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12.05.25</td>
            <td>м.Васильків, вул. Грушевського, 134</td>
            <td>+380999999999</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RequestsPanel;
