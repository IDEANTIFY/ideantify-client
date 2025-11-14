import { apiClient } from '@/api'
import { UrlResponse } from '@/api'

export const s3Api = {
  uploadImage: async (file: File): Promise<UrlResponse> => {
    const formData = new FormData()
    formData.append('file', file)

    return apiClient
      .post('s3/projects/image', {
        body: formData,
        headers: {
          // FormData를 사용할 때는 Content-Type을 자동으로 설정되도록 제거
          'Content-Type': undefined,
        },
      })
      .json()
  },

  uploadFile: async (file: File): Promise<UrlResponse> => {
    const formData = new FormData()
    formData.append('file', file)

    return apiClient
      .post('s3/projects/file', {
        body: formData,
        headers: {
          // FormData를 사용할 때는 Content-Type을 자동으로 설정되도록 제거
          'Content-Type': undefined,
        },
      })
      .json()
  },
}
