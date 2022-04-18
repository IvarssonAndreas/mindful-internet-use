import React, {ReactNode} from 'react'

import {CheckIcon} from '@heroicons/react/outline'

export interface RadioButtonProps {
  children: ReactNode
  checked?: boolean
  onChange: (checked: boolean) => void
  name: string
}

export const RadioButton = ({
  children,
  onChange,
  checked,
  name,
}: RadioButtonProps) => {
  return (
    <label className="flex items-center gap-6 hover:cursor-pointer">
      <span
        className={`${
          checked ? ' ring ring-mui-gold' : 'bg-amber-50'
        } relative inline-block  h-6 w-6 flex-shrink-0 cursor-pointer rounded-2xl  text-center transition focus-within:outline-amber-50  focus-within:ring focus-within:ring-mui-gold`}
      >
        <input
          name={name}
          type="radio"
          onChange={e => onChange(e.target.checked)}
          checked={checked}
          className="opacity-0"
        />

        <span
          aria-hidden
          className={`absolute top-[50%]  left-[50%] z-10  block h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 bg-transparent  `}
        >
          <span
            className={`${
              checked ? 'scale-100 ' : 'scale-0 '
            }  block h-full w-full rounded-2xl bg-mui-blue-darkest p-1 transition-transform  `}
          >
            <CheckIcon />
          </span>
        </span>
      </span>
      {children}
    </label>
  )
}
