import React, {ReactNode, useState} from 'react'

import {AnimatePresence} from 'framer-motion'
import {LockClosedIcon} from '@heroicons/react/solid'
import {Button} from './Button'

import {BreathingOverlay} from './BreathingOverlay'

interface LockedBeforeBreathingProps {
  onUnlock: () => void
  description?: ReactNode
}

export const LockedBeforeBreathing = ({
  onUnlock,
  description,
}: LockedBeforeBreathingProps) => {
  const [isUnlocking, setIsUnlocking] = useState(false)

  return (
    <AnimatePresence>
      <div className="absolute -top-[4px] -left-[10px] -right-[10px] bottom-0 flex flex-col items-center justify-center space-y-2 rounded-lg bg-gradient-to-tr  from-mui-blue to-mui-blue-alpha p-5 text-amber-50">
        {!isUnlocking ? (
          <>
            <div className="backdrop-blur-lg">{description}</div>

            <LockClosedIcon className="h-20 w-20" />
            <Button onClick={() => setIsUnlocking(true)}>Unlock</Button>
          </>
        ) : (
          <BreathingOverlay
            onClose={() => setIsUnlocking(false)}
            onBreathingComplete={() => onUnlock()}
          />
        )}
      </div>
    </AnimatePresence>
  )
}
