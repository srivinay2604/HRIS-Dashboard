import React, { createContext, useContext, useState, useEffect } from "react";

// ROLES: HR_ADMIN, MANAGER, EMPLOYEE
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null); // null means logged out / login screen
  const [user, setUser] = useState(null); // Mock user profile

  const login = (selectedRole) => {
    setRole(selectedRole);
    // Hardcode a mock user based on role
    if (selectedRole === "HR_ADMIN") {
      setUser({ id: "U-100", name: "Sarah Jenkins", role: "HR Admin", avatar: "", department: "Human Resources" });
    } else if (selectedRole === "MANAGER") {
      setUser({ id: "U-205", name: "Michael Chen", role: "Engineering Manager", avatar: "", department: "Engineering" });
    } else {
      setUser({ id: "U-412", name: "Alex Robinson", role: "Software Engineer", avatar: "", department: "Engineering" });
    }
  };

  const logout = () => {
    setRole(null);
    setUser(null);
  };

  // Set theme colors on body based on role
  useEffect(() => {
    document.body.classList.remove("theme-hr", "theme-manager", "theme-employee");
    if (role === "HR_ADMIN") document.body.classList.add("theme-hr");
    else if (role === "MANAGER") document.body.classList.add("theme-manager");
    else if (role === "EMPLOYEE") document.body.classList.add("theme-employee");
  }, [role]);

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
