import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";
import "./header.css";

import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { setIsAuthenticated, isAuthenticated, myData } =
    useContext(AuthContext);

  const handleLogout = () => {
    axios
      .post("https://blog-backend-qcdy.onrender.com/user/logout", {}, { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(false);
        toast("Logout Successful");
        console.log("User logout success", res);
      })
      .catch((err) => {
        console.log("Error while logout", err);
      });
    navigate("/login");
  };

  return (
    <nav className="">
      <div className="headers navbar-container">
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className={`menu ${isMenuOpen ? "menu-open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>

          <div className="sideBar">
            <Link to="/create-blog">Create-Blog</Link><br/>

            <Link to="/blog-list">Blog-List</Link><br/>

          </div>
          <Link to="/register">Register</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Log Out</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
        {isAuthenticated && (
          <div className="pt-2">
            <FaUser className="mx-3"/>
            <p >{myData?.name}</p>
            {/* <p>{myData?.email}</p> */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
