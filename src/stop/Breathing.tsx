import React, {ReactNode, useEffect, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {useInterval} from '@utils'
import {BreathingPattern} from '../breathing-patterns'
import {BreathingLabel} from '@types'

interface BreathingProps {
  onComplete: () => void
  numberOfBreath: number
  breathingPattern: BreathingPattern
}

export const Breathing = ({
  onComplete,
  numberOfBreath,
  breathingPattern,
}: BreathingProps) => {
  const numberOfBreathLeft = useNumberOfBreathLeft(
    breathingPattern.duration,
    numberOfBreath,
  )

  const label = useBreatheLabel(
    breathingPattern.duration,
    breathingPattern.getBreathingLabel,
  )

  useEffect(() => {
    if (numberOfBreathLeft <= 0) {
      onComplete()
    }
  }, [numberOfBreathLeft, onComplete])

  if (numberOfBreathLeft < 0) {
    throw new Error(
      'Breathing counter should never be less than 0. This component should be unmounted by now',
    )
  }

  if (numberOfBreathLeft === 0) {
    return null
  }

  return (
    <AnimatePresence>
      <Container
        times={breathingPattern.times}
        breathDuration={breathingPattern.duration}
        scale={breathingPattern.scale}
      >
        <Content label={label} breathLeft={numberOfBreathLeft} />
        <Rotation breathDuration={breathingPattern.duration} />
        <Border borderColorInterval={breathingPattern.borderColorInterval} />
      </Container>
    </AnimatePresence>
  )
}

const useBreatheLabel = (
  breathDurationInSeconds: number,
  getLabel: (durationPassed: number) => BreathingLabel,
) => {
  const [durationPassedInSeconds, setDurationPassed] = useState(0)

  useInterval(() => {
    setDurationPassed(durationPassedInSeconds => {
      const newDurationPassed = durationPassedInSeconds + 1
      return newDurationPassed === breathDurationInSeconds
        ? 0
        : newDurationPassed
    })
  }, 1000)

  if (durationPassedInSeconds >= breathDurationInSeconds) {
    throw new Error(
      `Duration should never be >= than ${breathDurationInSeconds} was "${durationPassedInSeconds}"`,
    )
  }

  return getLabel(durationPassedInSeconds)
}

const useNumberOfBreathLeft = (
  breathDurationInSeconds: number,
  numberOfBreath: number,
) => {
  const [breathLeft, setBreathLeft] = useState(numberOfBreath)

  useInterval(() => {
    setBreathLeft(breathLeft => breathLeft - 1)
  }, breathDurationInSeconds * 1000)

  return breathLeft
}

const Container = ({
  breathDuration,
  times,
  scale,
  children,
}: {
  breathDuration: number
  times: number[]
  scale: number[]
  children: ReactNode
}) => {
  return (
    <motion.div
      transition={{
        duration: breathDuration,
        times,
        repeat: Infinity,
        ease: 'linear',
      }}
      exit={{opacity: 0}}
      animate={{scale}}
      className="scale-1  relative m-auto flex h-[300px] w-[300px] items-center justify-center will-change-transform "
    >
      {children}
    </motion.div>
  )
}

const Content = ({
  label,
  breathLeft,
}: {
  label: BreathingLabel
  breathLeft: number
}) => {
  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col items-center justify-center rounded-full bg-mui-blue-dark">
      <div className="text-[32px] tracking-wide text-amber-50">{label}</div>
      <div className="mt-2 text-center text-4xl text-mui-gold">
        {breathLeft}
      </div>
    </div>
  )
}

const Rotation = ({breathDuration}: {breathDuration: number}) => {
  return (
    <motion.div
      transition={{
        duration: breathDuration,
        repeat: Infinity,
        ease: 'linear',
      }}
      animate={{rotate: [0, 360]}}
      className="absolute left-[140px] -top-[40px] h-[190px] w-[20px] origin-bottom-center"
    >
      <span className="block h-[20px] w-[20px] rounded-full bg-amber-50" />
    </motion.div>
  )
}

const Border = ({borderColorInterval}: {borderColorInterval: string}) => {
  return (
    <div
      style={{
        background: `conic-gradient(${borderColorInterval})`,
      }}
      className="absolute -left-[20px] -top-[20px] h-[340px] w-[340px] rounded-full"
    />
  )
}
