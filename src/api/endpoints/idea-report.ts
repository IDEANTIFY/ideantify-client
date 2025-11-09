import { apiClient } from '@/api'
import {
  CreateIdeaReportMetadataRequest,
  CreateIdeaReportRequest,
  IdeaReportListResponse,
  IdeaReportResultDetailResponse,
  JobIdWebsocketTopicResponse,
} from '@/api'

export const ideaReportApi = {
  createIdeaReport: async (
    data: CreateIdeaReportRequest
  ): Promise<JobIdWebsocketTopicResponse> => {
    return apiClient.post('idea-reports', { json: data }).json()
  },

  createIdeaReportMetadata: async (
    data: CreateIdeaReportMetadataRequest
  ): Promise<JobIdWebsocketTopicResponse> => {
    return apiClient.post('idea-reports/metadata', { json: data }).json()
  },

  getIdeaReportList: async (): Promise<IdeaReportListResponse[]> => {
    return apiClient.get('idea-reports/results').json()
  },

  getIdeaReportResult: async (
    resultId: string
  ): Promise<IdeaReportResultDetailResponse> => {
    return apiClient.get(`idea-reports/results/${resultId}`).json()
  },
}
