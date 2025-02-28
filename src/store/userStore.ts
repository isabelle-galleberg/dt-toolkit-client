import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { register, login, getMe } from '../services/userService';
import { User } from '../types/user';

interface UserState {
  user: User | null;
  token: string | null;
  registerUser: (username: string, password: string) => Promise<void>;
  loginUser: (username: string, password: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  logoutUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      registerUser: async (username, password) => {
        const { user, token } = await register(username, password);
        set({ user, token });
        localStorage.setItem('token', token);
      },

      loginUser: async (username, password) => {
        const { user, token } = await login(username, password);
        set({ user, token });
        localStorage.setItem('token', token);
      },

      fetchUser: async () => {
        try {
          const user = await getMe();
          set({ user });
        } catch (error) {
          set({ user: null, token: null });
          localStorage.removeItem('token');
          console.error('Error fetching user profile:', error);
        }
      },

      logoutUser: () => {
        set({ user: null, token: null });
        localStorage.removeItem('token');
      },
    }),
    {
      name: 'user-store',
    }
  )
);
