import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuthPortal from "../hooks/usePortal";

const LoginSignup = () => {
  const {
    portalState,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,
  } = useAuthPortal();

  const location = useLocation();

  return (
    <div className="LoginPortal">
      <form onSubmit={handleSubmit}>
        <h2>{portalState}</h2>
        <label>USERNAME</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        {portalState === "SIGNUP" && (
          <>
            <label>EMAIL</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </>
        )}

        <label>PASSWORD</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button disabled={loading}>{portalState}</button>
      </form>
    </div>
  );
};

export default LoginSignup;
