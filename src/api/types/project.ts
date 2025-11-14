import { z } from 'zod'

import { SimpleUserResponseSchema } from '@/api'

// Request DTOs
export const CreateProjectRequestSchema = z.object({
  image: z.string().min(1),
  subject: z.string().min(1),
  github: z.string().optional(),
  members: z.array(z.string().uuid()).optional(),
  files: z.array(z.string()).optional(),
  description: z.string().min(1),
})

export const UpdateProjectRequestSchema = z.object({
  image: z.string().min(1),
  subject: z.string().min(1),
  github: z.string().optional(),
  members: z.array(z.string().uuid()).optional(),
  files: z.array(z.string()).optional(),
  description: z.string().optional(),
})

// Response DTOs
export const ProjectResponseSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  image: z.string(),
  subject: z.string(),
  github: z.string().optional(),
  members: z.array(z.string().uuid()).optional(),
  files: z.array(z.string()).optional(),
  description: z.string().optional(),
})

export const CommentUserSchema = z.object({
  id: z.string().uuid(),
  nickname: z.string(),
  avatar: z.string().optional(),
})

export const CommentResponseSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  user: SimpleUserResponseSchema,
  content: z.string(),
  deleted: z.boolean(),
})

export const CreatedCommentResponseSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  user: CommentUserSchema,
  content: z.string(),
})

export const ProjectDetailResponseSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  image: z.string(),
  subject: z.string(),
  github: z.string().optional(),
  members: z.array(z.string().uuid()).optional(),
  files: z.array(z.string()).optional(),
  description: z.string().optional(),
  comments: z.array(CommentResponseSchema),
  owner_id: z.string().uuid(),
})

export const ProjectListResponseSchema = z.object({
  id: z.string().uuid(),
  image: z.string(),
  subject: z.string(),
  description: z.string(),
  members: z.array(z.string().uuid()).optional(),
})

export const ProjectLikeResponseSchema = z.object({
  liked: z.boolean(),
  likes_count: z.number(),
})

export const ProjectBookmarkResponseSchema = z.object({
  bookmarked: z.boolean(),
  bookmark_count: z.number(),
})

// Types
export type CreateProjectRequest = z.infer<typeof CreateProjectRequestSchema>
export type UpdateProjectRequest = z.infer<typeof UpdateProjectRequestSchema>
export type ProjectResponse = z.infer<typeof ProjectResponseSchema>
export type CommentUser = z.infer<typeof CommentUserSchema>
export type CommentResponse = z.infer<typeof CommentResponseSchema>
export type CreatedCommentResponse = z.infer<
  typeof CreatedCommentResponseSchema
>
export type ProjectDetailResponse = z.infer<typeof ProjectDetailResponseSchema>
export type ProjectListResponse = z.infer<typeof ProjectListResponseSchema>
export type ProjectLikeResponse = z.infer<typeof ProjectLikeResponseSchema>
export type ProjectBookmarkResponse = z.infer<
  typeof ProjectBookmarkResponseSchema
>
