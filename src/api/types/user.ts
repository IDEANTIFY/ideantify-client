import { z } from 'zod'

import { KeywordResponseSchema } from './keyword'

// Request DTOs
export const ProfileSchema = z.object({
  github: z.string().nullish(),
  linkedin: z.string().nullish(),
  instagram: z.string().nullish(),
})

export const UpdateProfileRequestSchema = z.object({
  nickname: z.string().min(1),
  avatar: z.string().nullish(),
  profile: ProfileSchema.nullish(),
})

// Response DTOs
export const PortfolioResponseSchema = z.object({
  github: z.string().optional(),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
})

export const UserResponseSchema = z.object({
  id: z.string().uuid(),
  nickname: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
  followers: z.number(),
  following: z.number(),
  projects: z.number(),
  portfolio: PortfolioResponseSchema.optional(),
  keywords: z.array(KeywordResponseSchema).optional(),
})

export const SimpleUserResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  nickname: z.string(),
  avatar: z.string().optional(),
})

export const TrendingIssueResponseSchema = z.object({
  title: z.string(),
  link: z.string(),
  source: z.string(),
  date: z.string().datetime(),
  image: z.string().optional(),
  snippet: z.string().optional(),
  matched_keywords: z.string().optional(),
})

// Types
export type Profile = z.infer<typeof ProfileSchema>
export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>
export type PortfolioResponse = z.infer<typeof PortfolioResponseSchema>
export type UserResponse = z.infer<typeof UserResponseSchema>
export type SimpleUserResponse = z.infer<typeof SimpleUserResponseSchema>
export type TrendingIssueResponse = z.infer<typeof TrendingIssueResponseSchema>
