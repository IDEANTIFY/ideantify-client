import { apiClient } from '@/api'
import {
  ChatMessageListResponse,
  ChatRoomListResponse,
  CreateChatRoomRequest,
  CreateChatRoomResponse,
  UserChatRequest,
  UserChatSendResponse,
} from '@/api/types'

export interface IdeaReport {
  id: string
  query: string
  analysisNarrative: string
}

export const chatApi = {
  getUserChatRooms: async (): Promise<ChatRoomListResponse> => {
    return apiClient.get('api/users/rooms').json()
  },

  createChatRoom: async (
    data: CreateChatRoomRequest
  ): Promise<CreateChatRoomResponse> => {
    return apiClient.post('api/users/rooms', { json: data }).json()
  },

  getUserChatMessages: async (
    chatRoomId: string,
    params?: { page?: number; size?: number }
  ): Promise<ChatMessageListResponse> => {
    return apiClient
      .get(`api/users/rooms/${chatRoomId}`, {
        searchParams: params as Record<string, string>,
      })
      .json()
  },

  sendUserChat: async (
    chatRoomId: string,
    data: UserChatRequest
  ): Promise<UserChatSendResponse> => {
    return apiClient
      .post(`api/users/rooms/${chatRoomId}`, { json: data })
      .json()
  },

  createIdeaReportChatRoom: async (
    ideaReportId: string,
    data: CreateChatRoomRequest
  ): Promise<CreateChatRoomResponse> => {
    return apiClient
      .post(`api/idea-reports/${ideaReportId}/rooms`, { json: data })
      .json()
  },

  createDevelopChatRoom: async (
    data: CreateChatRoomRequest
  ): Promise<CreateChatRoomResponse> => {
    return apiClient.post('api/develop/rooms', { json: data }).json()
  },

  getIdeaReports: async (): Promise<IdeaReport[]> => {
    return apiClient.get('api/idea-reports/results').json()
  },
}
