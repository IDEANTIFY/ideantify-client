'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Github, Instagram, Linkedin, Trash2, User } from 'lucide-react'

import { s3Api } from '@/api'
import { UpdateProfileRequest, UpdateProfileRequestSchema } from '@/api/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { OverlayProps } from '@/libs/utils'

interface EditProfileModalProps extends OverlayProps {
  initialData: UpdateProfileRequest
  onSubmit: (data: UpdateProfileRequest) => Promise<void>
}

export default function EditProfileModal({
  isOpen,
  close,
  initialData,
  onSubmit,
}: EditProfileModalProps) {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

  const form = useForm<UpdateProfileRequest>({
    resolver: zodResolver(UpdateProfileRequestSchema),
    defaultValues: initialData,
  })

  useEffect(() => {
    form.reset(initialData)
  }, [initialData, form])

  const handleAvatarUpload = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      return
    }

    setIsUploadingAvatar(true)
    try {
      const response = await s3Api.uploadImage(file)
      form.setValue('avatar', response.url)
    } catch (error) {
      console.error('아바타 업로드 실패:', error)
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  const handleSubmit = async (data: UpdateProfileRequest) => {
    try {
      await onSubmit(data)
      close()
    } catch (error) {
      console.error('프로필 업데이트 실패:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormControl>
                      <div className="group relative">
                        <input
                          type="file"
                          id="avatar-upload"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleAvatarUpload(file)
                          }}
                          disabled={isUploadingAvatar}
                        />
                        <label
                          htmlFor="avatar-upload"
                          className="cursor-pointer"
                        >
                          <Avatar className="h-32 w-32 ring-4 ring-neutral-100 transition-opacity hover:opacity-90">
                            <AvatarImage src={field.value ?? undefined} />
                            <AvatarFallback className="text-3xl">
                              {form.watch('nickname')?.at(0) || '?'}
                            </AvatarFallback>
                          </Avatar>
                        </label>

                        {field.value && !isUploadingAvatar && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              form.setValue('avatar', '')
                            }}
                            className="absolute right-1 bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}

                        {isUploadingAvatar && (
                          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                        <Input
                          placeholder="닉네임"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <p className="text-sm font-medium text-neutral-500">
                  소셜 프로필 (선택)
                </p>

                <FormField
                  control={form.control}
                  name="profile.github"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Github className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                          <Input
                            placeholder="GitHub"
                            className="pl-10"
                            {...field}
                            value={field.value || ''}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profile.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Linkedin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                          <Input
                            placeholder="LinkedIn"
                            className="pl-10"
                            {...field}
                            value={field.value || ''}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profile.instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Instagram className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                          <Input
                            placeholder="Instagram"
                            className="pl-10"
                            {...field}
                            value={field.value || ''}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={close}
              >
                취소
              </Button>
              <Button
                type="submit"
                className="bg-ideantify hover:bg-ideantify/90 flex-1 text-white"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? '저장 중...' : '저장'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
