import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useAuthPortal = () => {
  const location = useLocation();

  const [portalState, setPortalState] = useState("LOGIN");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.pathname === "/Signup") {
      setPortalState("SIGNUP");
    } else {
      setPortalState("LOGIN");
    }
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (portalState === "LOGIN") {
        console.log("Logging in:", { username, password });
      } else {
        console.log("Signing up:", { username, email, password });
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};

export default useAuthPortal;
