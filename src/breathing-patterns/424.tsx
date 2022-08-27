import {BreathingLabel} from '@types'
import {BreathingPattern} from './index'
import {BREATHING_COLORS} from './colors'

const times = [0, 0.4, 0.6, 1]
const scale = [1, 1.3, 1.3, 1]
const borderColorInterval = ` ${BREATHING_COLORS.in} 0%,
                 ${BREATHING_COLORS.in} 40%,
                 ${BREATHING_COLORS.hold} 40%,
                 ${BREATHING_COLORS.hold} 60%,
                 ${BREATHING_COLORS.out} 60%,
                 ${BREATHING_COLORS.out} 100%`

const getBreathingLabel = (durationPassed: number): BreathingLabel => {
  if (durationPassed < 4) {
    return 'Breathe In'
  } else if (durationPassed >= 4 && durationPassed < 6) {
    return 'Hold'
  } else if (durationPassed >= 6 && durationPassed <= 10) {
    return 'Breathe Out'
  }

  throw new Error(
    `Outside out expected duration passed was "${durationPassed}"`,
  )
}

const patternLabelInfos: BreathingPattern['patternLabelInfos'] = [
  [40, 'Breathe In'],
  [20, 'Hold'],
  [40, 'Breathe Out'],
]

const patternSecondsInfos: BreathingPattern['patternSecondsInfos'] = [
  [40, 4],
  [20, 2],
  [40, 4],
]

export const breathing424: BreathingPattern = {
  name: '424',
  times,
  scale,
  borderColorInterval,
  duration: 10,
  patternLabelInfos,
  patternSecondsInfos,
  getBreathingLabel,
}
