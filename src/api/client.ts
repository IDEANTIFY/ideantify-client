import ky from 'ky'
import { toast } from 'sonner'

import { useAuthStore } from '@/stores/auth-store'

import { ApiResponse } from './types'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export const apiClient = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const { accessToken } = useAuthStore.getState()
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`)
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (!response.ok) {
          const data = await response.json<ApiResponse<unknown>>()
          toast.error(data.message || '요청에 실패했습니다.')
          throw new Error(data.message || 'Request failed')
        }

        const data = await response.json<ApiResponse<unknown>>()

        if (!data.success) {
          toast.error(data.message || '요청에 실패했습니다.')
          throw new Error(data.message || 'Request failed')
        }

        return new Response(JSON.stringify(data.data), {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        })
      },
    ],
  },
})
