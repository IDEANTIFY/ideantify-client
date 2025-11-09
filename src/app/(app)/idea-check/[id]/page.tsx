'use client'

import { use, useEffect, useState } from 'react'

import { IdeaReportResultDetailResponse, ideaReportApi } from '@/api'
import IdeaReport from '@/app/(app)/idea-check/components/idea-report'
import InputArea from '@/app/(app)/idea-check/components/input-area'
import { Separator } from '@/components/ui/separator'

interface Props {
  params: Promise<{ id: string }>
}

export default function Page({ params }: Props) {
  const { id: reportId } = use(params)

  const [report, setReport] = useState<IdeaReportResultDetailResponse>()

  useEffect(() => {
    ;(async () => {
      setReport(await ideaReportApi.getIdeaReportResult(reportId))
    })()
  }, [])

  if (!report) return null

  return (
    <div className="flex min-h-dvh w-full flex-col items-center gap-12">
      <InputArea
        defaultQuery={report.query}
        defaultMetadata={{
          summary: report.summary,
          purpose: report.purpose,
          differentiation: report.differentiation,
          technology: report.technology,
          target: report.target,
        }}
      />

      <Separator />

      <IdeaReport
        reportId={reportId}
        similarity={report.similarity}
        creativity={report.creativity}
        feasibility={report.feasibility}
        analysisNarrative={report.analysisNarrative}
        detailedResults={report.detailedResults}
      />
    </div>
  )
}
