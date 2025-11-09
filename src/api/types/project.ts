import { z } from 'zod'

import { SimpleUserResponseSchema } from '@/api'

export const CreateProjectRequestSchema = z.object({
  image: z.string().min(1),
  subject: z.string().min(1),
  keywords: z.array(z.string()).optional(),
  github: z.string().optional(),
  members: z.array(z.string().uuid()).optional(),
  files: z.array(z.string()).optional(),
  description: z.string().min(1),
})

export const UpdateProjectRequestSchema = z.object({
  image: z.string().min(1),
  subject: z.string().min(1),
  keywords: z.array(z.string()).optional(),
  github: z.string().optional(),
  members: z.array(z.string().uuid()).optional(),
  files: z.array(z.string()).optional(),
  description: z.string().optional(),
})

export const ProjectResponseSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  image: z.string(),
  subject: z.string(),
  keywords: z.array(z.string()).optional(),
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
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  user: SimpleUserResponseSchema,
  content: z.string(),
  deleted: z.boolean(),
})

export const CreatedCommentResponseSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  user: CommentUserSchema,
  content: z.string(),
})

export const ProjectDetailResponseSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  image: z.string(),
  subject: z.string(),
  keywords: z.array(z.string()).optional(),
  github: z.string().optional(),
  members: z.array(z.string().uuid()).optional(),
  files: z.array(z.string()).optional(),
  description: z.string().optional(),
  comments: z.array(CommentResponseSchema),
  ownerId: z.string().uuid(),
})

export const ProjectListResponseSchema = z.object({
  id: z.string().uuid(),
  image: z.string(),
  subject: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).optional(),
  members: z.array(z.string().uuid()).optional(),
})

export const ProjectLikeResponseSchema = z.object({
  liked: z.boolean(),
  likesCount: z.number(),
})

export const ProjectBookmarkResponseSchema = z.object({
  bookmarked: z.boolean(),
  bookmarkCount: z.number(),
})

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
