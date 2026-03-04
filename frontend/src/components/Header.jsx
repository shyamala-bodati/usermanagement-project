import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header(){

  const { user } = useContext(AuthContext);

  return(
    <div className="topbar">

      {/* LEFT - LOGO + TITLE */}
      <div className="logo-title">
        <div className="logo-icon">N</div>

        <div>
          <h2>Nexora Operations Hub</h2>
          <p className="subtitle">Workforce Intelligence Dashboard</p>
        </div>
      </div>

      {/* RIGHT - USER */}
      <div className="admin-name">
        {user?.name} ({user?.role})
      </div>

    </div>
  )
}

export default Header;