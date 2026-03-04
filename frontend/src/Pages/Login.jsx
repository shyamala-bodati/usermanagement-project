import { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async(e)=>{
    e.preventDefault();

    if(!email || !password){
      alert("Enter email & password");
      return;
    }

    try {

      const data = await loginUser({email,password});

      setUser(data.user);

      if(data.user.role === "admin"){
        navigate("/admin");
      } else {
        navigate("/employee");
      }

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "";

      if (message.toLowerCase().includes("not found")) {
        alert("User not found. Please register.");
        return;
      }

      if (message.toLowerCase().includes("password")) {
        alert("Incorrect password ❌");
        return;
      }

      alert(message || "Login failed ❌");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Login</h2>

        <form onSubmit={submit}>
          <input
            value={email}
            placeholder="Email"
            onChange={e=>setEmail(e.target.value)}
          />

          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={e=>setPassword(e.target.value)}
          />

          <button className="btn">Login</button>
        </form>

        <p>
          New user? <Link to="/">Register</Link>
        </p>
<p>
  <Link to="/forgot-password">Forgot Password?</Link>
</p>
      </div>
    </div>
  )
}

export default Login;