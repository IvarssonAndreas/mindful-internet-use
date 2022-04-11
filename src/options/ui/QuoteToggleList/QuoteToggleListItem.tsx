import React, {ReactNode} from 'react'

import {Switch} from '@option-ui'
import {useIsMounted} from '@headlessui/react/dist/hooks/use-is-mounted'

interface QuoteToggleListItemProps {
  children: ReactNode
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

export const QuoteToggleListItem = ({
  enabled,
  onToggle,
  children,
}: QuoteToggleListItemProps) => {
  return (
    <li
      className={`${
        enabled ? 'opacity-100' : 'opacity-60'
      } my-0.5 flex items-center justify-between gap-4 rounded p-2 text-amber-50 odd:bg-mui-blue even:bg-mui-blue-dark`}
    >
      {children}
      <Switch onChange={enabled => onToggle(enabled)} enabled={enabled} />
    </li>
  )
}
