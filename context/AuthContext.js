"use client";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Retrieve user and session ID from localStorage
    const storedUser = localStorage.getItem("user");
    const storedSessionId = localStorage.getItem("sessionId");

    if (storedUser && storedSessionId) {
      setUser(JSON.parse(storedUser));
      setSessionId(storedSessionId);
    }
  }, []);

  const login = (userdata, userSession) => {
    setUser(userdata);
    setSessionId(userSession);
    console.log("user login start");

    // Store user and session ID in localStorage
    localStorage.setItem("user", JSON.stringify(userdata));
    localStorage.setItem("sessionId", userSession);
  };

  const logout = () => {
    setUser(null);
    setSessionId(null);

    // Remove user and session ID from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("sessionId");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
