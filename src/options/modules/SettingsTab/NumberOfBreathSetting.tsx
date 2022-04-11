import React, {useState} from 'react'

import {SectionContainer, SectionHeading, Select, SelectProps} from '@option-ui'
import {useSyncedState} from '@utils'

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
  return (
    <div className="w-[220px]">
      {selected !== null && (
        <Select
          onSelectValue={value => setSelected(value)}
          selectedValue={selected}
          options={options}
        />
      )}
    </div>
  )
}
