'use client'

import { useState } from 'react'

import { Plus, Upload, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function Page() {
  const [title, setTitle] = useState('')
  const [keywords, setKeywords] = useState(['웹 서비스', 'AI'])
  const [newKeyword, setNewKeyword] = useState('')
  const [description, setDescription] = useState('')
  const [members, setMembers] = useState([
    '김이름',
    '김이름',
    '김이름',
    '김이름',
  ])
  const [githubUrl, setGithubUrl] = useState('')
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [projectFile, setProjectFile] = useState<File | null>(null)

  const handleImageUpload = (file: File) => {
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      if (file.size <= 5 * 1024 * 1024) {
        setMainImage(file)
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
        setProjectFile(file)
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
    setKeywords([...keywords, ''])
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between border-b border-neutral-100 bg-white px-16 py-8">
        <div className="flex flex-col text-neutral-700">
          <p className="text-3xl leading-9 font-bold">프로젝트 업로드</p>
          <p className="text-base leading-6">새로운 프로젝트를 업로드하세요</p>
        </div>
        <Button className="bg-teal-500 text-white hover:bg-teal-600">
          <Upload size={24} />
          <span className="font-medium">업로드하기</span>
        </Button>
      </div>

      <div className="flex w-full gap-8 bg-neutral-50 p-8">
        <div className="flex w-full max-w-lg flex-col gap-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-8">
            <p className="text-sm font-semibold text-neutral-700">
              대표 이미지
            </p>
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
              {mainImage ? (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-neutral-700">{mainImage.name}</p>
                  <p className="text-xs text-neutral-500">
                    {(mainImage.size / 1024 / 1024).toFixed(2)}MB
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
              {projectFile ? (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-neutral-700">{projectFile.name}</p>
                  <p className="text-xs text-neutral-500">
                    {(projectFile.size / 1024 / 1024).toFixed(2)}MB
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
            <p className="text-sm font-semibold text-neutral-700">
              Github 레포지토리
            </p>
            <Input
              placeholder="https://github.com/username/repository"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="rounded-xl border-neutral-100 bg-white px-4 py-3"
            />
          </div>
        </div>

        <div className="flex w-full max-w-lg flex-col gap-3">
          <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-8">
            <p className="text-sm font-semibold text-neutral-700">주제</p>
            <div className="flex items-center justify-between rounded-xl border border-neutral-100 bg-white px-4 py-3">
              <Input
                placeholder="프로젝트 주제를 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
                className="flex-1 border-0 p-0 text-sm shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center gap-2 rounded border border-neutral-200 bg-neutral-100 px-2 py-1">
                <p className="text-xs text-neutral-500">{title.length}/50</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-8">
            <p className="text-sm font-semibold text-neutral-700">키워드</p>
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
                      setKeywords(updated)
                    }}
                    className="h-auto w-auto min-w-[60px] border-0 p-0 text-sm text-neutral-500 shadow-none focus-visible:ring-0"
                  />
                  <X
                    size={14}
                    className="cursor-pointer text-neutral-400 hover:text-neutral-600"
                    onClick={() =>
                      setKeywords(keywords.filter((_, i) => i !== index))
                    }
                  />
                </div>
              ))}
              <button
                onClick={addKeyword}
                className="flex cursor-pointer items-center gap-1 rounded-xl border border-teal-500 bg-teal-50 px-4 py-2"
              >
                <Plus size={16} className="text-teal-500" />
                <p className="text-sm text-teal-500">추가</p>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-8">
            <p className="text-sm font-semibold text-neutral-700">
              프로젝트 설명
            </p>
            <Textarea
              placeholder="프로젝트 설명을 입력해주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[200px] rounded-2xl border-neutral-100 bg-white p-4"
            />
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-100 bg-white px-8 py-8 pb-7">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-700">멤버</p>
              <button className="flex items-center gap-1 rounded-xl border border-teal-500 bg-teal-50 px-4 py-2">
                <Plus size={16} className="text-teal-500" />
                <p className="text-sm text-teal-500">추가</p>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {members.map((member, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
                    <p className="text-sm text-neutral-700">김</p>
                  </div>
                  <p className="text-sm text-neutral-700">{member}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
