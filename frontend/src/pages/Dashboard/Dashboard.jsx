import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome to FlashMind Dashboard</h1>
      </header>

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <ul>
          <li>Home</li>
          <li>Flashcards</li>
          <li>Statistics</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="dashboard-content">
        <section className="dashboard-widgets">
          <div className="widget">Widget 1</div>
          <div className="widget">Widget 2</div>
          <div className="widget">Widget 3</div>
        </section>

        <section className="dashboard-tables">
          <h2>Recent Activities</h2>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John</td>
                <td>Created Flashcard</td>
                <td>2025-12-23</td>
              </tr>
              <tr>
                <td>Aya</td>
                <td>Reviewed Flashcard</td>
                <td>2025-12-22</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
