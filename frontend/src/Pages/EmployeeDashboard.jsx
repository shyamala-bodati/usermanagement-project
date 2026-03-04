import StatsCard from "../components/StatsCard";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getMyPosts,
  createPost,
  deletePost,
  updatePost,
} from "../services/postService";
import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // ================== LOAD POSTS ==================
  const load = async () => {
    try {
      const data = await getMyPosts();
      setPosts(data);
    } catch (error) {
      console.log("Failed to load posts:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ================== CREATE POST ==================
  const handleCreatePost = async (text) => {
    try {
      const newPost = await createPost(text);
      setPosts((prev) => [newPost, ...prev]);
    } catch (error) {
      console.log("Create failed:", error.response?.data || error.message);
    }
  };

  // ================== DELETE POST ==================
  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      console.log("Delete failed:", error.response?.data || error.message);
    }
  };

  // ================== UPDATE POST ==================
  const handleUpdate = async (id, content) => {
    try {
      await updatePost(id, content);
      load(); // reload posts after update
    } catch (error) {
      console.log("Update failed:", error.response?.data || error.message);
    }
  };

  // ================== LOGOUT ==================
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  // ================== METRICS ==================
  const loginDays = user?.streakCount || 1;
  const performance = loginDays * 5;
  const productivity = posts.length > 0 ? Math.min(posts.length * 10, 100) : 0;
  const engagement = performance + productivity;

  const attendanceStatus =
    posts.length > 0
      ? "Present & Active"
      : loginDays > 0
      ? "Present"
      : "Absent";

  const status = loginDays >= 3 ? "Consistent" : "Warming Up";
  const mode = posts.length > 0 ? "Active" : "Idle";
  const momentum = loginDays >= 5 ? "Strong" : "Building";

  const focusLevel =
    posts.length >= 5
      ? "Excellent"
      : posts.length >= 3
      ? "Good"
      : posts.length >= 1
      ? "Average"
      : "Needs Improvement";

  const activityLevel =
    loginDays >= 7
      ? "Very High"
      : loginDays >= 4
      ? "High"
      : loginDays >= 2
      ? "Moderate"
      : "Low";

  const systemInsight =
    engagement >= 50
      ? "🔥 Outstanding! You're highly engaged"
      : engagement >= 20
      ? "🚀 Good momentum! Keep it up"
      : "📌 Stay active to boost your performance";

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h1 className="company-name">NEXORA</h1>

        <div className="about-sidebar">
          <h4>About Nexora</h4>
          <p>
            Nexora is an educational platform that supports
            structured learning and collaboration in a
            focused environment.
          </p>
        </div>

        <div className="status-section">
          <div className="status-card">
            <p>Status</p>
            <h3>{status}</h3>
          </div>

          <div className="status-card">
            <p>Mode</p>
            <h3>{mode}</h3>
          </div>

          <div className="status-card">
            <p>Momentum</p>
            <h3>{momentum}</h3>
          </div>
        </div>

        <div className="attendance-box">
          <p>Work Presence</p>
          <h2>{attendanceStatus}</h2>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="employee-main">
        <div className="employee-header">
          <h1>Welcome, {user?.name} 👋</h1>
          <span>{user?.role}</span>
        </div>

        {/* KPI */}
        <div className="employee-kpi">
          <StatsCard title="Performance Score" value={performance} />
          <StatsCard title="Productivity" value={`${productivity}%`} />
          <StatsCard title="Engagement" value={engagement} />
          <StatsCard
            title="Work Streak"
            value={`${loginDays} ${loginDays === 1 ? "day" : "days"}`}
          />
        </div>

        {/* INSIGHTS */}
        <div className="employee-insights">
          <div className="insight-card">
            <h4>Focus Level</h4>
            <p>{focusLevel}</p>
          </div>

          <div className="insight-card">
            <h4>Activity Level</h4>
            <p>{activityLevel}</p>
          </div>

          <div className="insight-card full">
            <h4>System Insight</h4>
            <p>{systemInsight}</p>
          </div>
        </div>

        {/* POSTS */}
        <div className="post-section">
          <h3>Raise an Issue</h3>
          <PostForm onPost={handleCreatePost} />

          <PostList
            posts={posts}
            onDelete={handleDeletePost}
            onUpdate={handleUpdate}
          />
        </div>
      </main>
    </div>
  );
}

export default EmployeeDashboard;