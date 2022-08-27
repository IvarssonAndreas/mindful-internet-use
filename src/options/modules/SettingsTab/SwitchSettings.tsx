import React, {ReactNode} from 'react'
import {useSyncedState} from '@utils'
import {Switch} from '@option-ui'

export const CopyAfterBreathingSetting = () => {
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

export const QuoteWhileBreathing = () => {
  const [quoteWhileBreathing, setQuoteWhileBreathing] = useSyncedState(
    'showQuoteWhileBreathing',
  )

  return (
    <SettingSwitch
      isOn={quoteWhileBreathing}
      onChange={setQuoteWhileBreathing}
      offLabel="No"
      onLabel="Yes"
    />
  )
}

interface SettingSwitchProps {
  /** State of the switch or null if not initialized */
  isOn: boolean | null
  onLabel: string
  offLabel: string
  onChange: (isOn: boolean) => void
}

export const SettingSwitch = ({
  offLabel,
  onLabel,
  isOn,
  onChange,
}: SettingSwitchProps) => {
  const selectedStyle =
    'text-amber-50  underline decoration-mui-gold decoration-1 underline-offset-4'

  return (
    <label className="flex items-center space-x-3 text-gray-400">
      <span className={!isOn ? selectedStyle : ''}>{offLabel}</span>
      {isOn !== null && <Switch enabled={isOn} onChange={onChange} />}
      <span className={isOn ? selectedStyle : ''}>{onLabel}</span>
    </label>
  )
}

export const SettingSwitchContainer = ({children}: {children: ReactNode}) => {
  return <div className="flex flex-col space-y-2">{children}</div>
}
