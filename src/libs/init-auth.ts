import { userApi } from '@/api/endpoints'
import { useAuthStore } from '@/stores/auth-store'
import { useIdleStore } from '@/stores/idle-store'
import { useUserStore } from '@/stores/user-store'

export async function initAuth() {
  const { accessToken } = useAuthStore.getState()
  const { setUser } = useUserStore.getState()
  const { setReady } = useIdleStore.getState()

  if (accessToken) {
    setUser(await userApi.getMyProfile())
  }

  setReady(true)
}
