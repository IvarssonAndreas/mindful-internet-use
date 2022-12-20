import React from 'react'

import {SelectProps} from '@option-ui'
import {useSyncedState} from '@utils'
import {LockedSelect} from './LockedSelect'

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

type NumberOfBreathSettingProps = {
  lockedStatus: 'locked' | 'unlocked'
  onUnlock: () => void
}
export const NumberOfBreathSetting = ({
  lockedStatus,
  onUnlock,
}: NumberOfBreathSettingProps) => {
  const [selected, setSelected] = useSyncedState('numBreath')

  return (
    <LockedSelect
      selectedValue={selected}
      lockedStatus={lockedStatus}
      onUnlock={onUnlock}
      options={options}
      onSelectValue={setSelected}
    />
  )
}
