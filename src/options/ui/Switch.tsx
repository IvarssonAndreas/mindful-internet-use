import React from 'react'
import {Switch as HeadlessUiSwitch} from '@headlessui/react'

export interface SwitchProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

export const Switch = ({enabled = false, onChange}: SwitchProps) => {
  return (
    <HeadlessUiSwitch
      checked={Boolean(enabled)}
      onChange={enabled => onChange(enabled)}
      className={`group relative inline-flex h-7 w-10 shrink-0 items-center rounded-lg bg-amber-50  hover:opacity-80 focus-visible:outline-mui-blue`}
    >
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-1'
        } inline-block h-5 w-4 transform rounded-md bg-mui-blue-dark transition  group-hover:bg-mui-blue-darkest group-hover:bg-mui-blue-light`}
      />
    </HeadlessUiSwitch>
  )
}
