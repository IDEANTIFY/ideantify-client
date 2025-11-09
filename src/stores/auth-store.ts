import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  setToken: (accessToken: string) => void
  clearToken: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setToken: (accessToken) => set({ accessToken }),
      clearToken: () => set({ accessToken: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
