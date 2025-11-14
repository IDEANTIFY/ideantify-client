import { z } from 'zod'

// Request DTOs
export const CreateChatRoomRequestSchema = z.object({
  content: z.string().min(1),
})

export const UserChatRequestSchema = z.object({
  content: z.string().min(1),
})

// Response DTOs
export const CreateChatRoomResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  websocket_topic: z.string(),
})

export const UserChatSendResponseSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  websocket_topic: z.string(),
})

export const ChatRoomTypeEnum = z.enum(['USER', 'DEVELOP', 'IDEA_REPORT'])

export const ChatRoomResponseSchema = z.object({
  chat_room_id: z.string().uuid(),
  title: z.string(),
  type: ChatRoomTypeEnum,
  idea_report_id: z.string().uuid().optional(),
  created_at: z.string(),
})

export const ChatRoomListResponseSchema = z.object({
  chat_rooms: z.array(ChatRoomResponseSchema),
})

export const ChatMessageSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  role: z.string(),
  content: z.string(),
})

export const ChatRoomMetaSchema = z.object({
  id: z.string().uuid(),
  type: ChatRoomTypeEnum,
  title: z.string(),
  idea_report_id: z.string().uuid().optional(),
})

export const ChatMessageListResponseSchema = z.object({
  chat_room: ChatRoomMetaSchema,
  messages: z.array(ChatMessageSchema),
})

// Types
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
