'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { userApi } from '@/api'
import { useAuthStore, useUserStore } from '@/stores'

export default function Page() {
  const router = useRouter()

  const params = useSearchParams()
  const token = params.get('token')
  const onboarding = params.get('onboarding')

  const { setToken } = useAuthStore()
  const { setUser } = useUserStore()

  useEffect(() => {
    if (!token) {
      router.back()
      return
    }

    ;(async () => {
      setToken(token)
      setUser(await userApi.getMyProfile())

      if (onboarding === 'true') {
        router.replace('/my-page/onboarding')
      } else {
        router.replace('/idea-check')
      }
    })()
  }, [])
}
