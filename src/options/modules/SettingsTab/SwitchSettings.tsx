import React from 'react'
import {useSyncedState} from '@utils'
import {SettingSwitch} from './SettingSwitch'

export const AfterBreathingSetting = () => {
  const [copyAfterBreathing, setCopyAfterBreathing] = useSyncedState('copy')

  return (
    <SettingSwitch
      isOn={copyAfterBreathing}
      onChange={setCopyAfterBreathing}
      offLabel="Just breathe"
      onLabel="Breathe and copy quote letter by letter"
    />
  )
}
