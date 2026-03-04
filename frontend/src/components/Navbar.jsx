import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const { user, logout } = useContext(AuthContext);

  return (
    <div className="glass header">
      <h3>WorkPulse</h3>
      {user && <button className="btn" onClick={logout}>Logout</button>}
    </div>
  );
}

export default Navbar;