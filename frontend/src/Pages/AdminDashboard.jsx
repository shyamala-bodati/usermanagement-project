import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import Charts from "../components/Charts";
import UserTable from "../components/UserTable";
import { getAllPosts } from "../services/postService";

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);
  const loadIssues = async () => {
  try {
    const data = await getAllPosts();
    setIssues(data);
  } catch (err) {
    console.log("Issue fetch failed");
  }
};

  const load = async () => {
    try {
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load users", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    load();
  }, []);
useEffect(() => {
  load();
  loadIssues();
}, []);
  // ACTIVE USERS
  const active = users.filter(u => {
    if (!u?.lastLogin) return false;
    const lastLogin = new Date(u.lastLogin);
    if (isNaN(lastLogin)) return false;

    const days = (new Date() - lastLogin) / (1000 * 60 * 60 * 24);
    return days < 7;
  }).length;

  const inactive = Math.max(users.length - active, 0);

  // NEW JOINERS
  const newJoiners = users.filter(u => {
    if (!u?.createdAt) return false;
    const created = new Date(u.createdAt);
    if (isNaN(created)) return false;

    const days = (new Date() - created) / (1000 * 60 * 60 * 24);
    return days < 7;
  }).length;

  // TOP PERFORMER
  const topPerformer = users.reduce((max, user) => {
    const current = user?.loginCount || 0;
    const maxCount = max?.loginCount || 0;
    return current > maxCount ? user : max;
  }, null);

  // ATTENDANCE
  const attendance =
    users.length > 0
      ? Math.round((active / users.length) * 100)
      : 0;

  // SYSTEM HEALTH
  const systemStatus =
    attendance >= 70 ? "Healthy" : "Needs Attention";

  // WEEKLY GROWTH
  const weeklyGrowth =
    users.length > 0
      ? Math.round((newJoiners / users.length) * 100)
      : 0;

  return (
    <div className="dashboard">
<Sidebar issues={issues} />

      <div className="main">

        {/* HEADER */}
        <Header />

        {/* KPI */}
        <div className="kpi-grid">
          <StatsCard title="Total Employees" value={users.length} />
          <StatsCard title="Active" value={active} />
          <StatsCard title="Inactive" value={inactive} />
        </div>

        {/* CHART + RIGHT PANEL */}
        <div className="dashboard-row">

          <div className="chart-full">
            <Charts active={active} inactive={inactive}/>
          </div>

          <div className="right-panel">

            <div className="insight-card">
              <h4>New Joiners</h4>
              <p>{newJoiners}</p>
            </div>

            <div className="insight-card">
              <h4>Top Performer</h4>
              <p>{topPerformer?.name || "N/A"}</p>
            </div>

            <div className="insight-card">
              <h4>Attendance</h4>
              <p>{attendance}%</p>
            </div>

            <div className="insight-card">
              <h4>System Health</h4>
              <p>{systemStatus}</p>
            </div>

            <div className="insight-card">
              <h4>Weekly Growth</h4>
              <p>{weeklyGrowth}%</p>
            </div>

          </div>

        </div>

        {/* TABLE */}
        <UserTable users={users} setUsers={setUsers} />

      </div>

    </div>
  );
}

export default AdminDashboard;