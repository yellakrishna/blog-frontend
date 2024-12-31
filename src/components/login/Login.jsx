import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) return <Navigate to="/profile" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    axios
      .post("https://blog-backend-qcdy.onrender.com/user/login", payload, {
        withCredentials: true,
      })
      .then((res) => {
        setIsAuthenticated(true);
        setLoading(false);
        toast("Login Successful");
        console.log("Login done", res);
        // localStorage.setItem('token', JSON.stringify(res.data.token))
        navigate("/profile");
      })
      .catch((err) => {
        toast("Invalid Credencial");
        console.log("Error while login", err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="registers m-5">
        <h1 className="heads">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="logins">
            <label>Email</label>
            <br />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <br />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="mt-3 mx-5 btn btn-info mb-3"
          >
            {loading ? "Submitting.." : "Sign up"}
          </button>
          <p>You have create Register<Link to="/register">Register</Link></p>
        </form>
      </div>
    </>
  );
};

export default Login;
