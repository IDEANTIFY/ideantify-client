'use client'

import { IdeaReportListResponse } from '@/api'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { OverlayProps } from '@/libs/utils'

interface SelectReportModalProps extends OverlayProps {
  ideaReports: IdeaReportListResponse[]
  selectedReportId: string | null
  onSelectReport: (reportId: string) => void
}

export default function SelectReportModal({
  isOpen,
  close,
  ideaReports,
  selectedReportId,
  onSelectReport,
}: SelectReportModalProps) {
  const handleSelectReport = (reportId: string) => {
    onSelectReport(reportId)
    close()
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>아이디어 검증 리포트 선택</DialogTitle>
        </DialogHeader>
        <div className="max-h-96 space-y-2 overflow-y-auto">
          {ideaReports.length === 0 ? (
            <p className="py-8 text-center text-neutral-500">
              생성된 리포트가 없습니다.
            </p>
          ) : (
            ideaReports.map((report) => (
              <button
                key={report.id}
                onClick={() => handleSelectReport(report.id)}
                className="flex w-full cursor-pointer flex-col gap-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left transition-colors hover:bg-neutral-50"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="flex-1 font-medium text-neutral-700">
                    {report.query}
                  </p>
                  {selectedReportId === report.id && (
                    <span className="text-ideantify shrink-0">✓</span>
                  )}
                </div>
                <p className="line-clamp-2 text-xs text-neutral-500">
                  {report.analysis_narrative}
                </p>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
