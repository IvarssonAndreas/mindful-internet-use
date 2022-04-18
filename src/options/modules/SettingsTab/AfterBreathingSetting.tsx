import React from 'react'
import {SectionContainer, SectionHeading, Switch} from '@option-ui'
import {useSyncedState} from '@utils'

export const AfterBreathingSetting = () => {
  const [copyAfterBreathing, setCopyAfterBreathing] = useSyncedState('copy')

  const selectedStyle = 'text-amber-50'

  return (
    <label className="flex items-center space-x-3 text-gray-400">
      <span className={!copyAfterBreathing ? selectedStyle : ''}>
        Just breathe
      </span>
      {copyAfterBreathing !== null && (
        <Switch
          enabled={copyAfterBreathing}
          onChange={copyAfterBreathing =>
            setCopyAfterBreathing(copyAfterBreathing)
          }
        />
      )}
      <span className={copyAfterBreathing ? selectedStyle : ''}>
        Breathe and copy quote letter by letter
      </span>
    </label>
  )
}
