import { useEffect } from "react";
import useAuthPortal from "../hooks/usePortal";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

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

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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

        {error !== "" && <div className="Error">{error}</div>}

        <button disabled={loading}>{portalState}</button>
      </form>
    </div>
  );
};

export default LoginSignup;
