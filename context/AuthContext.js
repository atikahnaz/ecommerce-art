"use client";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    console.log(user);
    console.log(sessionId);
  }, [user]);

  const login = (userdata, userSession) => {
    setUser(userdata);
    setSessionId(userSession);
    console.log("user login start");
  };

  const logout = () => {
    setUser(null);
    setSessionId(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
