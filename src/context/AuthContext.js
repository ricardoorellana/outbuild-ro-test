import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const deleteSession = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const createSession = (user) => {
    localStorage.setItem('user', user);
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, createSession, deleteSession }}>
      {children}
    </AuthContext.Provider>
  );
};
