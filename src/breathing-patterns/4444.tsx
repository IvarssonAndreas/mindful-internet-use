import {BreathingLabel} from '@types'
import {BreathingPattern} from './index'
import {BREATHING_COLORS} from './colors'

const times = [0, 0.25, 0.5, 0.75, 1]
const scale = [1, 1.3, 1.3, 1, 1]
const borderColorInterval = `${BREATHING_COLORS.in} 0%,
                ${BREATHING_COLORS.in} 25%,
                ${BREATHING_COLORS.hold} 25%,
                ${BREATHING_COLORS.hold} 50%,
                ${BREATHING_COLORS.out} 50%,
                ${BREATHING_COLORS.out} 75%,
                ${BREATHING_COLORS.hold} 75%,
                ${BREATHING_COLORS.hold} 100%`

const getBreathingLabel = (durationPassed: number): BreathingLabel => {
  if (durationPassed < 4) {
    return 'Breathe In'
  } else if (durationPassed >= 4 && durationPassed < 8) {
    return 'Hold'
  } else if (durationPassed >= 8 && durationPassed < 12) {
    return 'Breathe Out'
  } else if (durationPassed >= 12 && durationPassed < 16) {
    return 'Hold'
  }

  throw new Error(
    `Outside out expected duration passed was "${durationPassed}"`,
  )
}

const patternLabelInfos: BreathingPattern['patternLabelInfos'] = [
  [25, 'Breathe In'],
  [25, 'Hold'],
  [25, 'Breathe Out'],
  [25, 'Hold'],
]

const patternSecondsInfos: BreathingPattern['patternSecondsInfos'] = [
  [25, 4],
  [25, 4],
  [25, 4],
  [25, 4],
]

export const breathing4444: BreathingPattern = {
  name: '4444',
  times,
  scale,
  borderColorInterval,
  duration: 16,
  patternLabelInfos,
  patternSecondsInfos,
  getBreathingLabel,
}
