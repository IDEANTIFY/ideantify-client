import { apiClient } from '@/api'
import {
  SimpleUserResponse,
  TrendingIssueResponse,
  UpdateProfileRequest,
  UserResponse,
} from '@/api/types'

export const userApi = {
  getMyProfile: async (): Promise<UserResponse> => {
    return apiClient.get('users/me').json()
  },

  updateMyProfile: async (
    data: UpdateProfileRequest
  ): Promise<UserResponse> => {
    return apiClient.put('users/me', { json: data }).json()
  },

  getUserProfile: async (userId: string): Promise<UserResponse> => {
    return apiClient.get(`users/${userId}`).json()
  },

  searchUsers: async (query?: string): Promise<SimpleUserResponse[]> => {
    const searchParams = query ? { query } : undefined
    return apiClient.get('users', { searchParams }).json()
  },

  followUser: async (userId: string): Promise<void> => {
    return apiClient.post(`users/${userId}/following`).json()
  },

  unfollowUser: async (userId: string): Promise<void> => {
    return apiClient.delete(`users/${userId}/following`).json()
  },

  getFollowings: async (): Promise<SimpleUserResponse[]> => {
    return apiClient.get('users/me/followings').json()
  },

  getFollowers: async (): Promise<SimpleUserResponse[]> => {
    return apiClient.get('users/me/followers').json()
  },

  getTrendingIssues: async (): Promise<TrendingIssueResponse[]> => {
    return apiClient.get('users/issues').json()
  },
}
