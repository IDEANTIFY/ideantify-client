import { z } from 'zod'

export const KeywordResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export const SelectKeywordsRequestSchema = z.object({
  keywordIds: z.array(z.string().uuid()).min(1),
})

export type KeywordResponse = z.infer<typeof KeywordResponseSchema>
export type SelectKeywordsRequest = z.infer<typeof SelectKeywordsRequestSchema>
