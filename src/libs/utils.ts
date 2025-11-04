import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface OverlayProps {
  isOpen: boolean
  close: () => void
}

export interface AsyncOverlayProps<T> extends Omit<OverlayProps, 'close'> {
  close: (param: T) => void
}
