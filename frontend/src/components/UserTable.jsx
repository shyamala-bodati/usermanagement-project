import { deleteUser } from "../services/userService";
import { useState } from "react";
import EmployeeModal from "./EmployeeModal";

function UserTable({ users, setUsers }) {

  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // SEARCH FILTER
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION
  const usersPerPage = 5;
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / usersPerPage);

  // DELETE USER
  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(prev => prev.filter(u => u._id !== id));
  };

  // UPDATE USER AFTER EDIT
  const handleUpdate = (updatedUser) => {
    setUsers(prev =>
      prev.map(u => u._id === updatedUser._id ? updatedUser : u)
    );
    setSelectedUser(null);
  };

  return (
    <div className="table-card">

      {/* SEARCH */}
      <input
        className="search"
        placeholder="Search employee..."
        onChange={(e)=>setSearch(e.target.value)}
      />

      {/* TABLE */}
      <table className="table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Logins</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {currentUsers.map(u => {

            // ✅ SAFE ACTIVE LOGIC
            const isActive =
              u.lastLogin &&
              !isNaN(new Date(u.lastLogin)) &&
              ((new Date() - new Date(u.lastLogin)) / (1000*60*60*24)) < 7;

            return (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.loginCount}</td>

                <td>
                  <span className={isActive ? "badge active" : "badge inactive"}>
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={()=>setSelectedUser(u)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={()=>handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}

        </tbody>

      </table>

      {/* PAGINATION */}
      <div className="pagination">
        {[...Array(totalPages)].map((_,i)=>(
          <button
            key={i}
            onClick={()=>setCurrentPage(i+1)}
            className={currentPage===i+1 ? "active-page":""}
          >
            {i+1}
          </button>
        ))}
      </div>

      {/* EDIT MODAL */}
      {selectedUser && (
        <EmployeeModal
          user={selectedUser}
          onClose={()=>setSelectedUser(null)}
          onUpdate={handleUpdate}
        />
      )}

    </div>
  );
}

export default UserTable;