import { create } from 'zustand'

interface IdleState {
  isReady: boolean
  setReady: (isReady: boolean) => void
}

export const useIdleStore = create<IdleState>((set) => ({
  isReady: false,
  setReady: (isReady) => set({ isReady }),
}))
