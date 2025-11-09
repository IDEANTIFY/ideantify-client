import { apiClient } from '@/api'
import { KeywordResponse, SelectKeywordsRequest } from '@/api/types'

export const keywordApi = {
  getAllKeywords: async (): Promise<KeywordResponse[]> => {
    return apiClient.get('keywords').json()
  },

  selectKeywords: async (
    data: SelectKeywordsRequest
  ): Promise<KeywordResponse[]> => {
    return apiClient.put('keywords/me', { json: data }).json()
  },
}
