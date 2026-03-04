import { useState } from "react";
import { updateUser } from "../services/userService";

function EmployeeModal({ user, onClose, onUpdate }) {

  const [form, setForm] = useState(user);

  const handleSave = async () => {
    try {
      const updated = await updateUser(user._id, form);
      onUpdate(updated);   // update table
      onClose();           // close modal
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Edit Employee</h2>

        <input
          value={form.name}
          onChange={(e)=>setForm({...form, name:e.target.value})}
        />

        <input
          value={form.email}
          onChange={(e)=>setForm({...form, email:e.target.value})}
        />

        <input
          value={form.role}
          onChange={(e)=>setForm({...form, role:e.target.value})}
        />

        <div className="modal-actions">

          <button
            className="edit-btn"
            onClick={handleSave}
          >
            Save
          </button>

          <button 
            className="delete-btn"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </div>
    </div>
  )
}

export default EmployeeModal;