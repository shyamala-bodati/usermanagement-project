import { useState } from "react";

function PostList({ posts = [], onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  if (!posts.length) {
    return <div className="card">No posts yet</div>;
  }

  const handleSave = (id) => {
    if (!editText.trim()) return;

    onUpdate(id, editText);
    setEditingId(null);
    setEditText("");
  };

  return (
    <>
      {posts.filter(Boolean).map((post) => (
        <div className="card post-card" key={post._id}>
          {editingId === post._id ? (
            <div className="edit-container">
              <textarea
                className="edit-textarea"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />

              <div className="edit-buttons">
                <button
                  className="save-btn"
                  onClick={() => handleSave(post._id)}
                >
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => {
                    setEditingId(null);
                    setEditText("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="post-header">
                <p className="post-content">{post.content}</p>

                <div className="post-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingId(post._id);
                      setEditText(post.content);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <small className="post-date">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString()
                  : ""}
              </small>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default PostList;