'use client'

import { useEffect, useRef, useState } from 'react'

import { SendHorizonal, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/libs/utils'

export default function Page() {
  const [query, setQuery] = useState('')
  const [isIdeaDeveloping, setIsIdeaDeveloping] = useState(false)
  const [isReportLoading, setIsReportLoading] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  return (
    <div className="flex h-screen w-full flex-col">
      <div
        ref={scrollRef}
        className="flex w-full flex-1 flex-col items-center overflow-y-auto bg-neutral-50 px-4 py-4"
      >
        <div className="flex w-full max-w-2xl flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-center rounded-xl border border-neutral-100 bg-white p-4">
              <p className="flex-1 text-base leading-6 text-neutral-700">
                너의 이름은 뭐야?
              </p>
            </div>
            <div className="flex w-full items-center justify-center rounded-xl p-4">
              <p className="flex-1 text-base leading-6 text-neutral-700">
                저는 GPT-5입니다.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-center rounded-xl border border-neutral-100 bg-white p-4">
              <p className="flex-1 text-base leading-6 text-neutral-700">
                GPT의 뜻이 뭐야
              </p>
            </div>
            <div className="flex w-full items-center justify-center rounded-xl p-4">
              <div className="flex-1 text-base text-neutral-700">
                <p className="mb-0 leading-6">
                  GPT는 Generative Pre-trained Transformer의 약자입니다.
                </p>
                <ul className="mb-0 list-disc">
                  <li className="mb-0 ms-6">
                    <span className="leading-6">
                      Generative: 새로운 텍스트를 생성할 수 있다는 의미
                    </span>
                  </li>
                  <li className="mb-0 ms-6">
                    <span className="leading-6">
                      Pre-trained: 대규모 데이터로 사전 학습을 거쳤다는 의미
                    </span>
                  </li>
                  <li className="ms-6">
                    <span className="leading-6">
                      Transformer: 자연어 처리(NLP)에서 주로 쓰이는 딥러닝
                      모델 아키텍처 이름
                    </span>
                  </li>
                </ul>
                <p className="leading-6">
                  즉, "사전 학습된 생성형 트랜스포머"라는 뜻입니다.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-center rounded-xl border border-neutral-100 bg-white p-4">
              <p className="flex-1 text-base leading-6 text-neutral-700">
                트랜스포머가 뭔데?
              </p>
            </div>
            <div className="flex w-full items-center justify-center rounded-xl p-4">
              <div className="flex-1 text-base text-neutral-700">
                <p className="mb-0 leading-6">
                  트랜스포머(Transformer)는 2017년 구글이 발표한 자연어
                  처리(NLP)용 딥러닝 모델 아키텍처입니다. 핵심은
                  어텐션(attention) 메커니즘을 기반으로 입력 문장의 각 단어가
                  서로 얼마나 중요한 관계를 맺는지 계산하는 구조입니다.
                </p>
                <p className="mb-0 leading-6">간단히 말하면:</p>
                <ul className="mb-0 list-disc">
                  <li className="mb-0 ms-6">
                    <span className="leading-6">
                      RNN, LSTM 같은 이전 모델은 문장을 앞에서부터 순서대로
                      읽어야 했음 → 긴 문장에서 비효율적.
                    </span>
                  </li>
                  <li className="ms-6">
                    <span className="leading-6">
                      트랜스포머는 병렬 처리가 가능하고, 문장의 모든 단어
                      사이의 관계를 한 번에 고려함 → 긴 문맥도 잘 이해.
                    </span>
                  </li>
                </ul>
                <p className="mb-0 leading-6">
                  이 덕분에 번역, 요약, 질의응답, 코드 생성 등 다양한 자연어
                  작업에서 기존 모델보다 훨씬 뛰어난 성능을 냅니다.
                </p>
                <p className="leading-6">
                  원리 더 자세히 설명해드릴까요, 아니면 직관적으로 이해할 수
                  있는 비유로 설명해드릴까요?
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-center rounded-xl border border-neutral-100 bg-white p-4">
              <p className="flex-1 text-base leading-6 text-neutral-700">
                아니야 LSTM 원리가 궁금해
              </p>
            </div>
            <div className="flex w-full items-center justify-center rounded-xl p-4">
              <div className="flex-1 text-base leading-6 text-neutral-700">
                <p className="mb-0">
                  좋습니다. LSTM(Long Short-Term Memory)의 원리를 간단히 정리해
                  드리겠습니다.
                </p>
                <p className="mb-0">
                  LSTM은 RNN(Recurrent Neural Network)의 한 종류로, 장기 의존성
                  문제(Long-term dependency)를 해결하기 위해 고안된
                  구조입니다. 핵심은 셀 상태(cell state)와 게이트(gate)입니다.
                </p>
                <p className="mb-0">1. 기본 아이디어</p>
                <p className="mb-0">
                  일반 RNN은 문장이 길어질수록 과거 정보가 점점 희미해지거나
                  (기울기 소실, vanishing gradient) 폭발하는 문제(gradient
                  explosion)가 발생합니다. LSTM은 이 문제를 해결하기 위해 셀
                  상태라는 장기 기억 장치를 두고, 게이트를 통해 정보의 흐름을
                  제어합니다.
                </p>
                <p className="mb-0">2. 핵심 구성 요소</p>
                <p className="mb-0">LSTM은 3개의 게이트로 구성됩니다:</p>
                <ul className="mb-0 list-disc">
                  <li className="mb-0 ms-6">
                    <span className="leading-6">
                      Forget Gate (망각 게이트): 이전 셀 상태에서 어떤 정보를
                      버릴지 결정
                    </span>
                  </li>
                  <li className="mb-0 ms-6">
                    <span className="leading-6">
                      Input Gate (입력 게이트): 새로운 정보 중 어떤 것을 셀
                      상태에 저장할지 결정
                    </span>
                  </li>
                  <li className="ms-6">
                    <span className="leading-6">
                      Output Gate (출력 게이트): 셀 상태를 바탕으로 어떤 정보를
                      출력할지 결정
                    </span>
                  </li>
                </ul>
                <p className="mb-0">3. 동작 과정</p>
                <p className="mb-0">
                  각 시간 단계(time step)마다 LSTM 셀은 다음과 같이 동작합니다:
                </p>
                <ul className="mb-0 list-decimal">
                  <li className="mb-0 ms-6">
                    <span className="leading-6">
                      Forget Gate가 이전 셀 상태 중 불필요한 정보를 제거
                    </span>
                  </li>
                  <li className="mb-0 ms-6">
                    <span className="leading-6">
                      Input Gate가 현재 입력에서 중요한 정보를 선택하여 셀
                      상태에 추가
                    </span>
                  </li>
                  <li className="ms-6">
                    <span className="leading-6">
                      Output Gate가 업데이트된 셀 상태를 바탕으로 현재 출력을
                      계산
                    </span>
                  </li>
                </ul>
                <p>
                  이렇게 LSTM은 게이트를 통해 중요한 정보는 오래 기억하고,
                  불필요한 정보는 빠르게 잊어버리면서 장기 의존성 문제를
                  해결합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex w-full shrink-0 flex-col items-center bg-white p-12">
        <div className="relative w-full max-w-2xl">
          <Textarea
            className="h-32 w-full resize-none rounded-3xl p-6 text-base"
            placeholder="아이디어를 알려주세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            disabled={!query}
            className="bg-ideantify hover:bg-ideantify/90 absolute top-4 right-4 text-white disabled:bg-neutral-500"
          >
            <SendHorizonal />
          </Button>

          <div className="absolute bottom-4 left-4 flex gap-2">
            <Button
              className={cn(
                'border bg-white text-xs disabled:bg-neutral-500',
                isIdeaDeveloping
                  ? 'border-ideantify text-ideantify hover:bg-teal-50'
                  : 'border-neutral-500 text-neutral-500 hover:bg-neutral-50'
              )}
              onClick={() => setIsIdeaDeveloping((prev) => !prev)}
            >
              <Zap /> 아이디어 디벨롭
            </Button>
            <Button
              className={cn(
                'border bg-white text-xs disabled:bg-neutral-500',
                isReportLoading
                  ? 'border-ideantify text-ideantify hover:bg-teal-50'
                  : 'border-neutral-500 text-neutral-500 hover:bg-neutral-50'
              )}
              onClick={() => setIsReportLoading((prev) => !prev)}
            >
              <Zap /> 아이디어 검증 리포트 불러오기
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
