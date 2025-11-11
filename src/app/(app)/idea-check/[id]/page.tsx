'use client'

import { use } from 'react'

import { PROJECT_DETAIL } from '@/__mock__/project_detail'
import IdeaReport from '@/app/(app)/idea-check/components/idea-report'
import InputArea from '@/app/(app)/idea-check/components/input-area'
import { Separator } from '@/components/ui/separator'

interface Props {
  params: Promise<{ id: string }>
}

export default function Page({ params }: Props) {
  const { id: reportId } = use(params)

  // const [report, setReport] = useState<IdeaReportResultDetailResponse>()
  //
  // useEffect(() => {
  //   ;(async () => {
  //     setReport(await ideaReportApi.getIdeaReportResult(reportId))
  //   })()
  // }, [])

  // if (!report) return null

  return (
    <div className="flex min-h-dvh w-full flex-col items-center gap-12">
      <InputArea
        defaultQuery={PROJECT_DETAIL.detailed_report.query.query}
        defaultMetadata={{
          summary: PROJECT_DETAIL.detailed_report.query.summary,
          purpose: PROJECT_DETAIL.detailed_report.query.purpose,
          differentiation: PROJECT_DETAIL.detailed_report.query.differentiation,
          technology: PROJECT_DETAIL.detailed_report.query.technology,
          target: PROJECT_DETAIL.detailed_report.query.technology,
        }}
      />

      <Separator />

      <IdeaReport
        reportId={reportId}
        similarity={
          PROJECT_DETAIL.summary_report.report_summary.evaluation_scores
            .similarity
        }
        creativity={
          PROJECT_DETAIL.summary_report.report_summary.evaluation_scores
            .creativity
        }
        feasibility={
          PROJECT_DETAIL.summary_report.report_summary.evaluation_scores
            .feasibility
        }
        analysisNarrative={
          PROJECT_DETAIL.summary_report.report_summary.analysis_narrative
        }
        detailedResults={PROJECT_DETAIL.detailed_report.detailed_results}
      />
    </div>
  )
}
