import { apiClient } from '@/api'
import {
  CreateProjectRequest,
  CreatedCommentResponse,
  ProjectBookmarkResponse,
  ProjectDetailResponse,
  ProjectLikeResponse,
  ProjectListResponse,
  ProjectResponse,
  UpdateProjectRequest,
} from '@/api/types'

export const projectApi = {
  createProject: async (
    data: CreateProjectRequest
  ): Promise<ProjectResponse> => {
    return apiClient.post('projects', { json: data }).json()
  },

  getProject: async (projectId: string): Promise<ProjectDetailResponse> => {
    return apiClient.get(`projects/${projectId}`).json()
  },

  updateProject: async (
    projectId: string,
    data: UpdateProjectRequest
  ): Promise<ProjectResponse> => {
    return apiClient.put(`projects/${projectId}`, { json: data }).json()
  },

  deleteProject: async (projectId: string): Promise<void> => {
    return apiClient.delete(`projects/${projectId}`).json()
  },

  getProjectList: async (params?: {
    bookmark?: boolean
    like?: boolean
    own?: boolean
    user?: string
    page?: number
    size?: number
  }): Promise<ProjectListResponse[]> => {
    return apiClient
      .get('projects/list', { searchParams: params as Record<string, string> })
      .json()
  },

  likeProject: async (projectId: string): Promise<ProjectLikeResponse> => {
    return apiClient.post(`projects/${projectId}/like`).json()
  },

  unlikeProject: async (projectId: string): Promise<ProjectLikeResponse> => {
    return apiClient.delete(`projects/${projectId}/like`).json()
  },

  bookmarkProject: async (
    projectId: string
  ): Promise<ProjectBookmarkResponse> => {
    return apiClient.post(`projects/${projectId}/bookmark`).json()
  },

  unbookmarkProject: async (
    projectId: string
  ): Promise<ProjectBookmarkResponse> => {
    return apiClient.delete(`projects/${projectId}/bookmark`).json()
  },

  addComment: async (
    projectId: string,
    content: string,
    parentId?: string
  ): Promise<CreatedCommentResponse> => {
    const searchParams = parentId ? { parent: parentId } : undefined
    return apiClient
      .post(`projects/${projectId}/comments`, { json: content, searchParams })
      .json()
  },

  updateComment: async (
    projectId: string,
    commentId: string,
    content: string
  ): Promise<CreatedCommentResponse> => {
    return apiClient
      .put(`projects/${projectId}/comments/${commentId}`, { json: content })
      .json()
  },

  deleteComment: async (
    projectId: string,
    commentId: string
  ): Promise<void> => {
    return apiClient
      .delete(`projects/${projectId}/comments/${commentId}`)
      .json()
  },
}
