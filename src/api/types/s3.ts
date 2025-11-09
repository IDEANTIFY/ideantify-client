import { z } from 'zod'

export const UrlResponseSchema = z.object({
  url: z.string(),
})

export type UrlResponse = z.infer<typeof UrlResponseSchema>
