import React from 'react'
import {Dialog} from '@headlessui/react'
import {motion} from 'framer-motion'
import {XIcon} from '@heroicons/react/outline'
import {Breathing} from '../stop/Breathing'
import {useBreathingPattern, useNumberOfBreath} from '@utils'

interface BreathingOverlayProps {
  onClose: () => void
  onBreathingComplete: () => void
}

export const BreathingOverlay = ({
  onClose,
  onBreathingComplete,
}: BreathingOverlayProps) => {
  const numberOfBreath = useNumberOfBreath()
  const breathingPattern = useBreathingPattern()

  if (numberOfBreath === null || breathingPattern === null) {
    return null
  }

  return (
    <Dialog
      as={motion.div}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
      open={true}
      onClose={() => onClose()}
    >
      <button
        onClick={() => onClose()}
        className="absolute right-5 top-5 z-40 rounded-3xl p-4 text-amber-50 transition hover:cursor-pointer hover:ring hover:ring-amber-50   hover:ring-opacity-75 focus-visible:outline-none focus-visible:ring focus-visible:ring-amber-50 focus-visible:ring-offset-amber-50"
      >
        <XIcon className="h-8 w-8" />
      </button>
      <Dialog.Overlay className="fixed inset-0  bg-gradient-to-tr from-mui-blue-alpha to-mui-blue-dark" />
      <div className="my-8 inline-block w-full max-w-md transform  rounded-2xl  p-6 text-left align-middle  transition-all">
        <Breathing
          breathingPattern={breathingPattern}
          onComplete={() => onBreathingComplete()}
          numberOfBreath={numberOfBreath}
        />
      </div>
    </Dialog>
  )
}
