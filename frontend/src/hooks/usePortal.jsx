import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import API_URL from "../config";

const useAuthPortal = () => {
  const location = useLocation();
  const { dispatch } = useAuthContext();

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

  const signup = async (username, email, password) => {
    const response = await fetch(API_URL + "/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
      console.log(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (portalState === "LOGIN") {
        await login(username, password);
      } else {
        await signup(username, email, password);
      }
    } catch (err) {
      setError("Something went wrong.");
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
