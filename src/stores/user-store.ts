import { create } from 'zustand'

import { UserResponse } from '@/api/types'

interface UserState {
  user: UserResponse | null
  setUser: (user: UserResponse) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
