// src/components/Navbar.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/chatroom">
        🌍 LangSwap
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/chatroom">ChatRoom</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/onboarding">Edit Profile</Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
