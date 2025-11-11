'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Upload, X } from 'lucide-react'

import {
  CreateProjectRequest,
  CreateProjectRequestSchema,
} from '@/api/types/project'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUserStore } from '@/stores'

export default function Page() {
  const { user } = useUserStore()

  const form = useForm({
    resolver: zodResolver(CreateProjectRequestSchema),
    defaultValues: {
      image: '',
      subject: '',
      keywords: [],
      github: '',
      members: [user?.id],
      files: [],
      description: '',
    },
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const keywords = form.watch('keywords') || []
  const members = form.watch('members') || []

  const handleImageUpload = (file: File) => {
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      if (file.size <= 5 * 1024 * 1024) {
        const reader = new FileReader()
        reader.onloadend = () => {
          form.setValue('image', reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        alert('파일 크기는 5MB 이하여야 합니다.')
      }
    } else {
      alert('PNG 또는 JPG 파일만 업로드 가능합니다.')
    }
  }

  const handleProjectFileUpload = (file: File) => {
    if (
      file &&
      (file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'application/pdf')
    ) {
      if (file.size <= 5 * 1024 * 1024) {
        const currentFiles = form.getValues('files') || []
        form.setValue('files', [...currentFiles, file.name])
      } else {
        alert('파일 크기는 5MB 이하여야 합니다.')
      }
    } else {
      alert('PNG, JPG 또는 PDF 파일만 업로드 가능합니다.')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleImageUpload(file)
  }

  const handleProjectFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleProjectFileUpload(file)
  }

  const addKeyword = () => {
    form.setValue('keywords', [...keywords, ''])
  }

  const onSubmit = (data: CreateProjectRequest) => {
    console.log(data)
  }

  return (
    <div className="flex min-h-dvh w-full flex-col">
      <div className="flex items-center justify-between border-b border-neutral-100 bg-white px-16 py-8">
        <div className="flex flex-col text-neutral-700">
          <p className="text-3xl leading-9 font-bold">프로젝트 업로드</p>
          <p className="text-base leading-6">새로운 프로젝트를 업로드하세요</p>
        </div>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="bg-teal-500 text-white hover:bg-teal-600"
        >
          <Upload size={24} />
          <span className="font-medium">업로드하기</span>
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full justify-center gap-8 bg-neutral-50 p-8"
        >
          <div className="flex w-full max-w-lg flex-col gap-3">
            <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-8">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>주제</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-between rounded-xl border border-neutral-100 bg-white px-4 py-3">
                        <Input
                          placeholder="프로젝트 주제를 입력해주세요"
                          {...field}
                          maxLength={50}
                          className="flex-1 border-0 p-0 text-sm shadow-none focus-visible:ring-0"
                        />
                        <div className="flex items-center gap-2 rounded border border-neutral-200 bg-neutral-100 px-2 py-1">
                          <p className="text-xs text-neutral-500">
                            {field.value.length}/50
                          </p>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-8">
              <FormField
                control={form.control}
                name="keywords"
                render={() => (
                  <FormItem>
                    <FormLabel>키워드</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword, index) => (
                          <div
                            key={index}
                            className="flex w-fit items-center gap-2 rounded-xl border border-neutral-100 bg-white px-4 py-2"
                          >
                            <Input
                              value={keyword}
                              onChange={(e) => {
                                const updated = [...keywords]
                                updated[index] = e.target.value
                                form.setValue('keywords', updated)
                              }}
                              className="h-auto w-auto min-w-[60px] border-0 p-0 text-sm text-neutral-500 shadow-none focus-visible:ring-0"
                            />
                            <X
                              size={14}
                              className="cursor-pointer text-neutral-400 hover:text-neutral-600"
                              onClick={() =>
                                form.setValue(
                                  'keywords',
                                  keywords.filter((_, i) => i !== index)
                                )
                              }
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addKeyword}
                          className="flex cursor-pointer items-center gap-1 rounded-xl border border-teal-500 bg-teal-50 px-4 py-2"
                        >
                          <Plus size={16} className="text-teal-500" />
                          <p className="text-sm text-teal-500">추가</p>
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>프로젝트 설명</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="프로젝트 설명을 입력해주세요"
                        {...field}
                        className="min-h-[200px] rounded-2xl border-neutral-100 bg-white p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-5 rounded-2xl border border-neutral-100 bg-white px-8 py-8 pb-7">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-neutral-700">멤버</p>
                {/*<button*/}
                {/*  type="button"*/}
                {/*  onClick={() => {*/}
                {/*    const currentMembers = form.getValues('members') || []*/}
                {/*    form.setValue('members', [...currentMembers, ''])*/}
                {/*  }}*/}
                {/*  className="flex items-center gap-1 rounded-xl border border-teal-500 bg-teal-50 px-4 py-2"*/}
                {/*>*/}
                {/*  <Plus size={16} className="text-teal-500" />*/}
                {/*  <p className="text-sm text-teal-500">추가</p>*/}
                {/*</button>*/}
              </div>
              <div className="flex flex-col gap-4">
                {members.map((member, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
                      <p className="text-sm text-neutral-700">
                        {user?.nickname.at(0)}
                      </p>
                    </div>
                    <p className="text-sm text-neutral-700">{user?.nickname}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex w-full max-w-lg flex-col gap-8">
            <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-8">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>대표 이미지</FormLabel>
                    <FormControl>
                      <div>
                        <input
                          type="file"
                          id="main-image"
                          accept="image/png,image/jpeg"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(file)
                          }}
                        />
                        <label
                          htmlFor="main-image"
                          onDragOver={handleDragOver}
                          onDrop={handleImageDrop}
                          className="flex cursor-pointer flex-col items-center justify-center gap-6 rounded-2xl border border-dashed border-neutral-500 py-16 transition-colors hover:bg-neutral-50"
                        >
                          {field.value ? (
                            <div className="flex flex-col items-center gap-2">
                              <p className="text-sm text-neutral-700">
                                이미지 업로드됨
                              </p>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center rounded-lg border border-teal-500 bg-teal-50 p-4">
                                <Upload size={24} className="text-teal-500" />
                              </div>
                              <div className="flex flex-col items-center gap-0 text-center">
                                <p className="text-base font-medium text-neutral-700">
                                  프로젝트를 대표할 이미지를 업로드하세요
                                </p>
                                <div className="text-sm text-neutral-500">
                                  <p className="mb-0">
                                    PNG, JPG 파일을 드래그하거나 클릭하세요
                                  </p>
                                  <p className="text-xs">(최대 5MB)</p>
                                </div>
                              </div>
                            </>
                          )}
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-8">
              <p className="text-sm font-semibold text-neutral-700">
                프로젝트 파일
              </p>
              <input
                type="file"
                id="project-file"
                accept="image/png,image/jpeg,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleProjectFileUpload(file)
                }}
              />
              <label
                htmlFor="project-file"
                onDragOver={handleDragOver}
                onDrop={handleProjectFileDrop}
                className="flex cursor-pointer flex-col items-center justify-center gap-6 rounded-2xl border border-dashed border-neutral-500 py-16 transition-colors hover:bg-neutral-50"
              >
                {form.watch('files')?.length ? (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-neutral-700">
                      {form.watch('files')?.length}개 파일 업로드됨
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center rounded-lg border border-teal-500 bg-teal-50 p-4">
                      <Upload size={24} className="text-teal-500" />
                    </div>
                    <div className="flex flex-col items-center gap-0 text-center">
                      <p className="text-base font-medium text-neutral-700">
                        프로젝트 파일을 업로드하세요
                      </p>
                      <div className="text-sm text-neutral-500">
                        <p className="mb-0">
                          PNG, JPG, PDF 파일을 드래그하거나 클릭하세요
                        </p>
                        <p className="text-xs">(최대 5MB)</p>
                      </div>
                    </div>
                  </>
                )}
              </label>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-8">
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github 레포지토리</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/repository"
                        {...field}
                        className="rounded-xl border-neutral-100 bg-white px-4 py-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
