import React, {useEffect, useState} from 'react'
import {Breathing} from './Breathing'
import {CompleteBreathing} from './CompleteBreathing'
import {CopyQuote} from './CopyQuote'
import {
  Logo,
  useBreathingPattern,
  useNumberOfBreath,
  useSyncedState,
} from '@utils'

import {motion} from 'framer-motion'
import {QuoteWhileBreathing} from './QuoteWhileBreathing'
import {useQuote} from './useQuote'

type Step =
  | 'breathing'
  | 'completeBreathing'
  | 'copyQuote'
  | 'breathingWithQuote'
  | 'notInitialized'

const useCurrentStep = () => {
  const [showQuoteWhileBreathing] = useSyncedState('showQuoteWhileBreathing')
  const [currentStep, setCurrentStep] = useState<Step>('notInitialized')

  useEffect(() => {
    if (showQuoteWhileBreathing) {
      setCurrentStep('breathingWithQuote')
    } else {
      setCurrentStep('breathing')
    }
  }, [showQuoteWhileBreathing])

  return [currentStep, setCurrentStep] as const
}

const Stop = () => {
  const numberOfBreath = useNumberOfBreath()
  const isCopyQuote = useIsCopyQuote()
  const quote = useQuote()
  const [currentStep, setCurrentStep] = useCurrentStep()
  const breathingPattern = useBreathingPattern()

  if (currentStep === 'notInitialized' || quote === 'notInitialized') {
    return null
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 1.5}}
      className="grid h-full place-content-center overflow-hidden bg-gradient-to-tl from-mui-blue-dark to-mui-blue text-amber-50"
    >
      <div className="absolute left-5 top-5">
        <div className="  flex items-center">
          <Logo />

          <div className="p-2  font-bold">
            Mindful <br /> <span className="text-mui-gold">Internet Use</span>
          </div>
        </div>
      </div>
      {(() => {
        switch (currentStep) {
          case 'breathing':
          case 'breathingWithQuote':
            return (
              <div>
                {currentStep === 'breathingWithQuote' && (
                  <QuoteWhileBreathing quote={quote} />
                )}

                {numberOfBreath && breathingPattern ? (
                  <Breathing
                    breathingPattern={breathingPattern}
                    numberOfBreath={numberOfBreath}
                    onComplete={() =>
                      setCurrentStep(
                        isCopyQuote ? 'copyQuote' : 'completeBreathing',
                      )
                    }
                  />
                ) : null}
              </div>
            )
          case 'completeBreathing':
            return <CompleteBreathing quote={quote} />
          case 'copyQuote':
            return <CopyQuote quote={quote} />
          default:
            throwUnhandledStopStep(currentStep)
        }
      })()}
    </motion.div>
  )
}

const throwUnhandledStopStep = (currentStep: never): never => {
  throw new Error(`'${JSON.stringify(currentStep)}' is not a valid step`)
}

const useIsCopyQuote = () => {
  const [isCopy] = useSyncedState('copy')

  return isCopy
}

export default Stop
