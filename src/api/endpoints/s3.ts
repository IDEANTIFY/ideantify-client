import { apiClient } from '@/api'
import { UrlResponse } from '@/api'

export const s3Api = {
  uploadImage: async (file: File): Promise<UrlResponse> => {
    const formData = new FormData()
    formData.append('file', file)

    return apiClient
      .post('s3/projects/image', {
        body: formData,
      })
      .json()
  },

  uploadFile: async (file: File): Promise<UrlResponse> => {
    const formData = new FormData()
    formData.append('file', file)

    return apiClient
      .post('s3/projects/file', {
        body: formData,
      })
      .json()
  },
}
