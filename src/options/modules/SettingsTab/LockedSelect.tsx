import {Select} from '@option-ui'
import React from 'react'
import {LockedBeforeBreathing} from '@ui'

export type LockedSelectProps<V = unknown> = {
  selectedValue: V | null
  lockedStatus: 'locked' | 'unlocked'
  onUnlock: () => void
  options: {label: string; value: V}[]
  onSelectValue: (value: V) => void
}

export const LockedSelect = <V,>({
  selectedValue,
  lockedStatus,
  onUnlock,
  onSelectValue,
  options,
}: LockedSelectProps<V>) => {
  return (
    <div
      className={`${lockedStatus === 'locked' ? 'h-[160px]' : ''} relative `}
    >
      <div className="w-[150px]">
        {selectedValue && (
          <Select
            disabled={lockedStatus === 'locked'}
            onSelectValue={value => onSelectValue(value)}
            selectedValue={selectedValue}
            options={options}
          />
        )}
      </div>
      {lockedStatus === 'locked' && (
        <div className="z-10 mx-auto w-full">
          <LockedBeforeBreathing
            description={
              <p className="text-center text-sm font-bold	 uppercase leading-7 tracking-wider text-amber-50">
                Setting requires breathing
              </p>
            }
            onUnlock={onUnlock}
          />
        </div>
      )}
    </div>
  )
}
