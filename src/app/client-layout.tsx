'use client'

import { ReactNode, useEffect, useState } from 'react'
import Confetti from 'react-confetti'

import { OverlayProvider } from 'overlay-kit'
import { toast } from 'sonner'

import { initAuth } from '@/libs/init-auth'
import { useIdleStore } from '@/stores'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const { isReady } = useIdleStore()

  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    initAuth()
  }, [])

  useEffect(() => {
    const onboardingCompleted = sessionStorage.getItem('onboarding')

    if (onboardingCompleted === 'completed') {
      sessionStorage.removeItem('onboarding')
      setTimeout(() => {
        setShowConfetti(true)
        toast.info('회원가입이 완료되었어요!')
      })
    }
  }, [])

  return (
    <OverlayProvider>
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          tweenDuration={3000}
        />
      )}
      {isReady ? children : null}
    </OverlayProvider>
  )
}
