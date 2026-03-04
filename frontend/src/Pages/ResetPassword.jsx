import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      alert("Password updated successfully");

      // 🔥 Redirect to login page
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={submit}>
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;