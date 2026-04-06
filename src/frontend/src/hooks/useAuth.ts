import { useCallback, useState } from "react";
import type { AuthState } from "../types";

const AUTH_KEY = "auc_auth";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "504560@AUC";

function getStoredAuth(): AuthState {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return { isLoggedIn: false, role: null };
}

function saveAuth(auth: AuthState) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export function useAuth() {
  const [auth, setAuthState] = useState<AuthState>(getStoredAuth);

  const loginAdmin = useCallback(
    (username: string, password: string): boolean => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const newAuth: AuthState = {
          isLoggedIn: true,
          role: "admin",
          adminUsername: username,
          memberName: "Administrator",
        };
        saveAuth(newAuth);
        setAuthState(newAuth);
        return true;
      }
      // Also check admin users in localStorage
      try {
        const admins = JSON.parse(localStorage.getItem("auc_admins") || "[]");
        const found = admins.find(
          (a: { username: string; password: string; name: string }) =>
            a.username === username && a.password === password,
        );
        if (found) {
          const newAuth: AuthState = {
            isLoggedIn: true,
            role: "admin",
            adminUsername: username,
            memberName: found.name,
          };
          saveAuth(newAuth);
          setAuthState(newAuth);
          return true;
        }
      } catch {
        // ignore
      }
      return false;
    },
    [],
  );

  const loginUser = useCallback(
    (mobile: string, accessCode: string): boolean => {
      try {
        const members = JSON.parse(localStorage.getItem("auc_members") || "[]");
        const member = members.find(
          (m: {
            phone: string;
            accessCode: string;
            id: string;
            name: string;
            status: string;
          }) => m.phone === mobile && m.accessCode === accessCode,
        );
        if (member && member.status === "active") {
          const newAuth: AuthState = {
            isLoggedIn: true,
            role: "user",
            memberId: member.id,
            memberName: member.name,
          };
          saveAuth(newAuth);
          setAuthState(newAuth);
          return true;
        }
      } catch {
        // ignore
      }
      return false;
    },
    [],
  );

  const logout = useCallback(() => {
    const emptyAuth: AuthState = { isLoggedIn: false, role: null };
    saveAuth(emptyAuth);
    setAuthState(emptyAuth);
  }, []);

  return { auth, loginAdmin, loginUser, logout };
}
