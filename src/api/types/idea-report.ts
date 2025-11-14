import { z } from 'zod'

// Request DTOs
export const CreateIdeaReportRequestSchema = z.object({
  query: z.string().min(1),
  summary: z.string().min(1),
  purpose: z.string().min(1),
  differentiation: z.string().min(1),
  technology: z.string().min(1),
  target: z.string().min(1),
})

export const CreateIdeaReportMetadataRequestSchema = z.object({
  query: z.string().min(1),
})

// Response DTOs
export const JobIdWebsocketTopicResponseSchema = z.object({
  id: z.string().uuid(),
  websocket_topic: z.string(),
})

export const CreateIdeaReportMetadataResponseSchema = z.object({
  query: z.string(),
  summary: z.string(),
  purpose: z.string(),
  differentiation: z.string(),
  technology: z.string(),
  target: z.string(),
})

export const ResultItemSchema = z.object({
  id: z.string().uuid(),
  source_type: z.string(),
  title: z.string(),
  keyword: z.string(),
  link: z.string(),
  thumbnail: z.string().optional(),
  summary: z.string(),
  score: z.string(),
  insight: z.string(),
})

export const IdeaReportResponseSchema = z.object({
  id: z.string().uuid(),
  similarity: z.number(),
  creativity: z.number(),
  feasibility: z.number(),
  analysis_narrative: z.string(),
  detailed_results: z.array(ResultItemSchema),
})

export const IdeaReportListResponseSchema = z.object({
  id: z.string().uuid(),
  query: z.string(),
  analysis_narrative: z.string(),
})

export const IdeaReportResultDetailResponseSchema = z.object({
  id: z.string().uuid(),
  query: z.string(),
  summary: z.string(),
  purpose: z.string(),
  differentiation: z.string(),
  technology: z.string(),
  target: z.string(),
  similarity: z.number(),
  creativity: z.number(),
  feasibility: z.number(),
  analysis_narrative: z.string(),
  detailed_results: z.array(ResultItemSchema),
})

// Types
export type CreateIdeaReportRequest = z.infer<
  typeof CreateIdeaReportRequestSchema
>
export type CreateIdeaReportMetadataRequest = z.infer<
  typeof CreateIdeaReportMetadataRequestSchema
>
export type JobIdWebsocketTopicResponse = z.infer<
  typeof JobIdWebsocketTopicResponseSchema
>
export type CreateIdeaReportMetadataResponse = z.infer<
  typeof CreateIdeaReportMetadataResponseSchema
>
export type ResultItem = z.infer<typeof ResultItemSchema>
export type IdeaReportResponse = z.infer<typeof IdeaReportResponseSchema>
export type IdeaReportListResponse = z.infer<
  typeof IdeaReportListResponseSchema
>
export type IdeaReportResultDetailResponse = z.infer<
  typeof IdeaReportResultDetailResponseSchema
>
