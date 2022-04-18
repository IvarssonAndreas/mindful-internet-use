import React, {useEffect, useState} from 'react'
import {Switch as HeadlessUiSwitch} from '@headlessui/react'
import {useInterval, useSyncedState} from '@utils'

const INITIAL_SECONDS_LEFT = 60

export const OnOffSwitch = () => {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS_LEFT)
  const [syncedIsMIUEnabled, setSyncedIsMIUEnabled] =
    useSyncedState('isMIUEnabled')
  const [state, setState] = useState<'off' | 'on' | 'running'>('on')

  useEffect(() => {
    setState(syncedIsMIUEnabled ? 'on' : 'off')
  }, [syncedIsMIUEnabled])

  useInterval(
    () => {
      if (secondsLeft > 0) setSecondsLeft(secondsLeft => secondsLeft - 1)
      else {
        setSyncedIsMIUEnabled(false)
        setState('off')
      }
    },
    state === 'running' ? 1000 : null,
  )

  const handleChange = () => {
    if (state === 'running' || state === 'off') {
      setSyncedIsMIUEnabled(true)
      setState('on')
      setSecondsLeft(INITIAL_SECONDS_LEFT)
    } else {
      setState('running')
    }
  }

  const isOn = state === 'on' || state === 'running'

  let label = 'ON'
  if (state === 'off') {
    label = 'OFF'
  } else if (state === 'running') {
    label = String(secondsLeft)
  }

  if (syncedIsMIUEnabled === null) {
    return null
  }

  return (
    <HeadlessUiSwitch
      checked={isOn}
      onChange={() => handleChange()}
      className={`group relative inline-flex h-[32px] w-[80px] shrink-0 items-center rounded-lg border bg-amber-50 hover:ring hover:ring-amber-50 focus:outline-none focus-visible:outline-mui-blue focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2`}
    >
      <span
        className={`${
          isOn
            ? 'translate-x-[38px] rounded-lg border border-mui-blue-darkest bg-mui-blue-darkest text-amber-50   group-hover:bg-mui-blue-darkest'
            : 'translate-x-[1px] rounded-lg border border-mui-blue-light  text-mui-blue  group-hover:border-mui-blue '
        }  s  inline-block flex  w-[40px] transform items-center justify-center p-1 text-sm font-bold  transition `}
      >
        {label}
      </span>
    </HeadlessUiSwitch>
  )
}
