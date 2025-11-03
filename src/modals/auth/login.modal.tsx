import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { OverlayProps } from '@/libs/utils'

interface LoginModalProps extends OverlayProps {
  service: string
}

export default function LoginModal({
  service,
  isOpen,
  close,
}: LoginModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="overflow-clip p-0 sm:max-w-sm">
        <DialogHeader className="items-center px-4 pt-8 pb-2">
          <DialogTitle>{service}는 로그인 후 이용이 가능해요.</DialogTitle>
          <DialogDescription>
            30초만에 로그인 하고 계속해볼까요?
          </DialogDescription>
        </DialogHeader>

        <Button
          variant="ghost"
          className="bg-kakao-background hover:bg-kakao-background/90 rounded-t-none py-6"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 0C4.029 0 0 3.13 0 7C0 9.583 1.637 11.85 4.125 13.14L3.225 16.65C3.135 17.01 3.51 17.298 3.825 17.1L8.01 14.49C8.334 14.523 8.664 14.543 9 14.543C13.971 14.543 18 11.413 18 7.543C18 3.673 13.971 0 9 0Z"
              fill="#3C1E1E"
            />
          </svg>
          <span className="text-sm font-semibold">카카오톡으로 쉬운 시작</span>
        </Button>
      </DialogContent>
    </Dialog>
  )
}
