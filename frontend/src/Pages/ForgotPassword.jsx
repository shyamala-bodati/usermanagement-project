import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

const submit = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/forgot-password",
      { email }
    );

    const token = res.data.token;

    navigate(`/reset-password/${token}`);

  } catch (error) {
    alert(error.response?.data?.message || "Error");
  }
};
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn" onClick={submit}>
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;