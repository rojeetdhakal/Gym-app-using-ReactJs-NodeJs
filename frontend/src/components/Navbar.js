import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>WORKOUT BUDDY</h2>
          <img src="" alt="" />
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>log out</button>
            </div>
          )}
          {!user && (
          <div>
            <Link to="/signup"> <b>Signup</b></Link>
            <Link to="/login"><b>Login</b></Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
