import React, {useState} from 'react'

import {Select, SelectProps} from '@option-ui'
import {useSyncedState} from '@utils'
import {BreathingOverlay, Button, LockedBeforeBreathing} from '@ui'
import {LockClosedIcon} from '@heroicons/react/solid'

const options: SelectProps<number>['options'] = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6},
  {label: '7', value: 7},
  {label: '8', value: 8},
  {label: '9', value: 9},
  {label: '10', value: 10},
]

export const NumberOfBreathSetting = () => {
  const [selected, setSelected] = useSyncedState<number>('numBreath')
  const [lockedStatus, setLockedStatus] = useState<'unlocked' | 'locked'>(
    'locked',
  )

  if (selected === null) {
    return null
  }

  return (
    <div
      className={`${
        lockedStatus === 'locked' ? 'h-[160px]' : ''
      } relative isolate`}
    >
      <div className="w-[150px]">
        <Select
          disabled={lockedStatus === 'locked'}
          onSelectValue={value => setSelected(value)}
          selectedValue={selected}
          options={options}
        />
      </div>
      {lockedStatus === 'locked' && (
        <div className="z-10 mx-auto w-full">
          <LockedBeforeBreathing
            description={
              <p className="text-center text-sm font-bold	 uppercase leading-7 tracking-wider text-amber-50">
                Setting requires breathing
              </p>
            }
            onUnlock={() => setLockedStatus('unlocked')}
          />
        </div>
      )}
    </div>
  )
}
