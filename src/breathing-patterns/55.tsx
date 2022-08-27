import {BreathingLabel} from '@types'
import {BreathingPattern} from './index'
import {BREATHING_COLORS} from './colors'

const times = [0, 0.5, 1]
const scale = [1, 1.3, 1]
const borderColorInterval = ` ${BREATHING_COLORS.in} 0%,
                  ${BREATHING_COLORS.in} 50%,
                  ${BREATHING_COLORS.out} 50%,
                 ${BREATHING_COLORS.out} 100%`

const getBreathingLabel = (durationPassed: number): BreathingLabel => {
  if (durationPassed < 5) {
    return 'Breathe In'
  } else if (durationPassed >= 5 && durationPassed < 10) {
    return 'Breathe Out'
  }

  throw new Error(
    `Outside out expected duration passed was "${durationPassed}"`,
  )
}

const patternLabelInfos: BreathingPattern['patternLabelInfos'] = [
  [50, 'Breathe In'],
  [50, 'Breathe Out'],
]

const patternSecondsInfos: BreathingPattern['patternSecondsInfos'] = [
  [50, 5],
  [50, 5],
]

export const breathing55: BreathingPattern = {
  name: '55',
  times,
  scale,
  borderColorInterval,
  duration: 10,
  patternLabelInfos,
  patternSecondsInfos,
  getBreathingLabel,
}
