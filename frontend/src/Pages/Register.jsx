import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
        adminCode
      });

      alert("Registration Successful ✅");
      navigate("/login");

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "";

      // ✅ Handles "User already exists"
      if (message.toLowerCase().includes("already")) {
        alert("User already registered. Please login.");
        navigate("/login");
        return;
      }

      alert(message || "Registration Failed ❌");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Register</h2>

        <form onSubmit={submit}>

          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            value={adminCode}
            placeholder="Admin Code (optional)"
            onChange={(e) => setAdminCode(e.target.value)}
          />

          <button className="btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p>
          Already user? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;