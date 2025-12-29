import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { Link } from "react-router-dom";

const LoginPage = props => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    context.authenticate(userName, password);
  };

  let location = useLocation();

  // Capture the previous page location
  const { from } = location.state || { from: { pathname: "/" } };

  if (context.isAuthenticated === true) {
    // FIX: Explicitly pass 'from.pathname' and 'from.state' to ensure 
    // the movieId is not lost during the redirect.
    return <Navigate to={from.pathname} state={from.state} replace />;
  }

  return (
    <>
      <h2>Login page</h2>
      <p>You must log in to view the protected pages </p>
      <input
        id="username"
        placeholder="user name"
        onChange={e => {
          setUserName(e.target.value);
        }}
      ></input>
      <br />
      <input
        id="password"
        type="password"
        placeholder="password"
        onChange={e => {
          setPassword(e.target.value);
        }}
      ></input>
      <br />
      {/* Login Button */}
      <button onClick={login}>Log in</button>
      <p>
        Not Registered? <Link to="/signup">Sign Up!</Link>
      </p>
    </>
  );
};

export default LoginPage;