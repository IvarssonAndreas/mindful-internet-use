import React, {ReactNode} from 'react'
import {Switch} from '@option-ui'

interface QuoteToggleListItemProps {
  children: ReactNode
  enabled: boolean
  onToggle: (enabled: boolean) => void
  heading?: boolean
}

export const QuoteToggleListItem = ({
  enabled,
  onToggle,
  children,
  heading = false,
}: QuoteToggleListItemProps) => {
  return (
    <li
      className={`${enabled ? 'opacity-100' : 'opacity-60'}  ${
        heading ? 'bg-mui-blue' : 'odd:bg-mui-blue-dark even:bg-mui-blue'
      } my-0.5 flex items-center justify-between gap-4 rounded p-4 text-amber-50`}
    >
      {children}
      <Switch onChange={enabled => onToggle(enabled)} enabled={enabled} />
    </li>
  )
}
