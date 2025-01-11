import { create } from "zustand";

interface AuthState {
  user: { name: string; email: string; id: string | null } | null; // Added id field
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  getCurrentUser: () => {
    user: { name: string; email: string } | null;
    token: string | null;
  }; // New action
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  // Login action
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:3000/bigo/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Login failed");
      }

      const data = await response.json();
      set({
        user: { name: data.name, email: data.email, id: data._id },
        token: data.token,
        loading: false,
      });
      localStorage.setItem("user", data.user); // Save user locally
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Signup action
  signup: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:3000/bigo/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Signup failed");
      }

      const data = await response.json();
      set({
        user: { name: data.name, email: data.email },
        token: data.token,
        loading: false,
      });
      localStorage.setItem("token", data.token); // Save token locally
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Logout action
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token"); // Remove token from storage
  },

  // Get current user action
  getCurrentUser: () => {
    return {
      user: useAuthStore.getState().user,
      token: useAuthStore.getState().token,
    };
  },
}));
