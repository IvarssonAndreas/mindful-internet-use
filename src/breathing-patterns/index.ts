import {breathing424} from './424'
import {breathing4444} from './4444'
import {breathing55} from './55'
import {breathing478} from './478'
import {breathing4242} from './4242'

import {BreathingLabel, BreathingPatternName} from '@types'

export const breathingPatterns = [
  breathing424,
  breathing4242,
  breathing4444,
  breathing55,
  breathing478,
] as const

export interface BreathingPattern {
  name: BreathingPatternName
  times: number[]
  scale: number[]
  /** Should be a gradient string */
  borderColorInterval: string
  patternLabelInfos: SelectLabelInfo<BreathingLabel>[]
  patternSecondsInfos: SelectLabelInfo<number>[]
  getBreathingLabel: (durationPassed: number) => BreathingLabel
  duration: number
}

export type SelectLabelInfo<Label extends BreathingLabel | number = any> = [
  widthInPercentrage: number,
  label: Label,
]
