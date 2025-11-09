import { z } from 'zod'

export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    code: z.string(),
    message: z.string(),
    data: dataSchema,
  })

export type ApiResponse<T> = {
  success: boolean
  code: string
  message: string
  data: T
}
