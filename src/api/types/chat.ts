import { z } from 'zod'

export const CreateChatRoomRequestSchema = z.object({
  content: z.string().min(1),
})

export const CreateChatRoomResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
})

export const UserChatRequestSchema = z.object({
  content: z.string(),
})

export const UserChatSendResponseSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
})

export const ChatRoomTypeEnum = z.enum(['USER', 'DEVELOP', 'IDEA_REPORT'])

export const ChatRoomResponseSchema = z.object({
  chatRoomId: z.string().uuid(),
  title: z.string(),
  type: ChatRoomTypeEnum,
  ideaReportId: z.string().uuid().optional(),
  createdAt: z.string(),
})

export const ChatRoomListResponseSchema = z.object({
  chatRooms: z.array(ChatRoomResponseSchema),
})

export const ChatMessageSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  role: z.string(),
  content: z.string(),
})

export const ChatRoomMetaSchema = z.object({
  id: z.string().uuid(),
  type: ChatRoomTypeEnum,
  title: z.string(),
  ideaReportId: z.string().uuid().optional(),
})

export const ChatMessageListResponseSchema = z.object({
  chatRoom: ChatRoomMetaSchema,
  messages: z.array(ChatMessageSchema),
})

export type CreateChatRoomRequest = z.infer<typeof CreateChatRoomRequestSchema>
export type CreateChatRoomResponse = z.infer<
  typeof CreateChatRoomResponseSchema
>
export type UserChatRequest = z.infer<typeof UserChatRequestSchema>
export type UserChatSendResponse = z.infer<typeof UserChatSendResponseSchema>
export type ChatRoomType = z.infer<typeof ChatRoomTypeEnum>
export type ChatRoomResponse = z.infer<typeof ChatRoomResponseSchema>
export type ChatRoomListResponse = z.infer<typeof ChatRoomListResponseSchema>
export type ChatMessage = z.infer<typeof ChatMessageSchema>
export type ChatRoomMeta = z.infer<typeof ChatRoomMetaSchema>
export type ChatMessageListResponse = z.infer<
  typeof ChatMessageListResponseSchema
>
