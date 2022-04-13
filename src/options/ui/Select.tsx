import React, {Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'

interface Option<Value = string> {
  label: string
  value: Value
}

export interface SelectProps<Value = string> {
  color?: keyof typeof colorVariants
  defaultLabel?: string
  disabled?: boolean
  options: Option<Value>[]
  autoFocus?: boolean
  selectedValue: Option<Value>['value']
  onSelectValue: (selected: Option<Value>['value']) => void
}

export function Select<Value>({
  color = 'mui-blue',
  defaultLabel,
  options,
  disabled,
  autoFocus = false,
  selectedValue,
  onSelectValue,
}: SelectProps<Value>) {
  const selectedOption = options.find(option => option.value === selectedValue)

  if (!selectedOption && !defaultLabel) {
    throw new Error(
      `"selectedValue" needs to be a value in the "options": selectedValue=${JSON.stringify(
        selectedValue,
      )} options=${JSON.stringify(options)} `,
    )
  }

  return (
    <Listbox
      disabled={disabled}
      value={selectedOption?.value}
      onChange={onSelectValue}
    >
      <div className="relative mt-1">
        <Listbox.Button
          autoFocus={autoFocus}
          className={`${colorVariants[color].button} relative w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left text-lg font-bold tracking-wider shadow shadow-mui-blue-darkest focus:outline-none focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 disabled:cursor-not-allowed`}
        >
          <span className="block truncate">
            {selectedOption?.label ?? defaultLabel}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-amber-50"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={`${colorVariants[color].options} absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
          >
            {options.map(option => (
              <Listbox.Option
                key={option.label}
                className={({active}) =>
                  `relative cursor-pointer select-none rounded-lg border-2 border-transparent py-2 pl-10 pr-4 text-amber-50  ${
                    colorVariants[color].optionHover
                  }
                      ${active ? colorVariants[color].optionActive : ''}
                    }`
                }
                value={option.value}
              >
                {({selected}) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-50">
                        <CheckIcon
                          className={`h-5 w-5 ${colorVariants[color].checkIcon}`}
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

const colorVariants = {
  'mui-blue': {
    button:
      'focus-visible:ring-offset-amber-50  hover:ring hover:ring-amber-50 bg-mui-blue-dark hover:bg-mui-blue-light focus-visible:outline-amber-50 active:bg-mui-blue-darkest',
    options: 'bg-mui-blue-dark',
    optionHover: 'hover:bg-mui-blue-darkest',
    optionActive: 'bg-mui-blue-darkest border-amber-50 ',
    checkIcon: 'fill-amber-50',
  },
}
