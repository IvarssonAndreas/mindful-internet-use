import React from 'react'
import {SelectProps} from '@option-ui'
import {useSyncedState} from '@utils'
import {LockedSelect, LockedSelectProps} from './LockedSelect'

const options: SelectProps<number>['options'] = [
  {label: '2min', value: 2},
  {label: '5min', value: 5},
  {label: '10min', value: 10},
  {label: '15min', value: 15},
  {label: '30min', value: 30},
  {label: '45min', value: 45},
  {label: '60min', value: 60},
  {label: '90min', value: 90},
  {label: '120min', value: 120},
]

type MaxAccessTimeProps = {
  lockedStatus: LockedSelectProps['lockedStatus']
  onUnlock: LockedSelectProps['onUnlock']
}
export const MaxAccessTime = ({lockedStatus, onUnlock}: MaxAccessTimeProps) => {
  const [selected, setSelected] = useSyncedState('maxAccessTime')

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
