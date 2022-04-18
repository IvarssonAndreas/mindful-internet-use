import React, {useState} from 'react'

import {RadioButton, RadioButtonProps} from '../ui/RadioButton'
import {BreathingPattern, breathingPatterns, SelectLabelInfo} from './'

import {SectionHeading} from '@option-ui'
import {BreathingOverlay, Button} from '@ui'

import {useSyncedState} from '@utils'

export const SelectBreathingPattern = () => {
  const [selectedName, SetSelectedName] = useSyncedState(
    'selectedBreathingPattern',
  )

  const [isPreview, setIsPreview] = useState(false)

  const maxBreathingDuration = Math.max(
    ...breathingPatterns.map(({duration}) => duration),
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <SectionHeading>Select breathing pattern </SectionHeading>
        <Button onClick={() => setIsPreview(true)}>Preview</Button>
      </div>
      {isPreview && (
        <BreathingOverlay
          onClose={() => setIsPreview(false)}
          onBreathingComplete={() => setIsPreview(false)}
        />
      )}

      <div role="radiogroup" className="space-y-2 px-2  py-4">
        {breathingPatterns.map(pattern => (
          <BreathingOption
            key={pattern.name}
            width={getWidth(pattern, maxBreathingDuration)}
            breathingPattern={pattern}
            checked={pattern.name === selectedName}
            onChange={() => SetSelectedName(pattern.name)}
          />
        ))}
      </div>
    </>
  )
}

const getWidth = (
  breathingPattern: BreathingPattern,
  maxDurationForAllPatterns: number,
): number => {
  return (breathingPattern.duration / maxDurationForAllPatterns) * 100
}

interface BreathingOptionProps {
  onChange: RadioButtonProps['onChange']
  checked: RadioButtonProps['checked']
  breathingPattern: BreathingPattern
  width: number
}

const BreathingOption = ({
  checked,
  onChange,
  breathingPattern,
  width,
}: BreathingOptionProps) => {
  return (
    <div
      className={`
      ${
        checked ? 'ring ring-mui-gold' : ''
      } rounded-lg px-4  transition odd:bg-mui-blue-dark even:bg-mui-blue hover:ring hover:ring-amber-50`}
    >
      <RadioButton
        name="breathing-option"
        checked={checked}
        onChange={checked => onChange(checked)}
      >
        <div
          style={{width: `${width}%`}}
          className="flex  flex-col gap-2 py-7 font-bold"
        >
          <SelectLabel labelInfos={breathingPattern.patternSecondsInfos} />

          <div
            className="h-5 w-full flex-grow rounded "
            style={{
              background: `linear-gradient(to right, ${breathingPattern.borderColorInterval})`,
            }}
          />

          <SelectLabel labelInfos={breathingPattern.patternLabelInfos} />
        </div>
        <div className="text-lg font-bold">{breathingPattern.duration}s</div>
      </RadioButton>
    </div>
  )
}

const SelectLabel = ({labelInfos}: {labelInfos: SelectLabelInfo[]}) => {
  return (
    <div className="flex justify-end">
      {labelInfos.map(([widthInPercentage, label], index) => (
        <span
          key={index}
          style={{flex: widthInPercentage}}
          className="text-center"
        >
          {label}
        </span>
      ))}
    </div>
  )
}
