import { useNavigate } from "react-router-dom";
import { deletePost } from "../services/postService";

function Sidebar({ issues = [] }) {

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      window.location.reload();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
   <aside className="sidebar">

    {/* LOGO */}
    <div className="brand">
      <h2 className="brand-text">NEXORA</h2>
      <img 
        src="/nexora.png"
        alt="Nexora Logo"
        className="brand-img"
      />
    </div>

    {/* ABOUT */}
   <div className="about-card">

  <h4 className="about-title">About Nexora</h4>

  <p className="about-text">
    Nexora is an educational platform that supports
    structured learning, collaboration, and growth
    through an engaging environment.
  </p>

</div>

    {/* ISSUES */}
    <div className="issue-section">

      <h4>Employee Issues</h4>

      {issues.length === 0 ? (
        <p className="no-issue">No issues raised</p>
      ) : (
        issues.slice(0,5).map(issue => (
          <div key={issue._id} className="issue-card">

            <div className="issue-header">
              <strong>{issue.createdBy?.name}</strong>

              <button
                className="issue-delete"
                onClick={() => handleDelete(issue._id)}
              >
                ✖
              </button>
            </div>

            <p>{issue.content}</p>

          </div>
        ))
      )}

    </div>

    {/* MENU */}
    <div className="sidebar-menu">

      <p className="sidebar-item" onClick={() => navigate("/employee")}>
        Employees
      </p>
      <div className="admin-insight">

  <h4>Admin Insight</h4>

  <p>
    Monitor engagement and ensure a
    supportive learning environment.
  </p>

</div>

      <p 
        className="sidebar-item logout"
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        Logout
      </p>

    </div>

   </aside>
  );
}

export default Sidebar;