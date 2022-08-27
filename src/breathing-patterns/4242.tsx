import {BreathingLabel} from '@types'
import {BreathingPattern} from './index'
import {BREATHING_COLORS} from './colors'

const times = [0, 0.333, 0.5, 0.833, 1]
const scale = [1, 1.3, 1.3, 1, 1]
const borderColorInterval = `${BREATHING_COLORS.in} 0%,
                ${BREATHING_COLORS.in} 33.3%,
                ${BREATHING_COLORS.hold} 33.3%,
                ${BREATHING_COLORS.hold} 50%,
                ${BREATHING_COLORS.out} 50%,
                ${BREATHING_COLORS.out} 83.3%,
                ${BREATHING_COLORS.hold} 83.3%,
                ${BREATHING_COLORS.hold} 100%`

const getBreathingLabel = (durationPassed: number): BreathingLabel => {
  if (durationPassed < 4) {
    return 'Breathe In'
  } else if (durationPassed >= 4 && durationPassed < 6) {
    return 'Hold'
  } else if (durationPassed >= 6 && durationPassed < 10) {
    return 'Breathe Out'
  } else if (durationPassed >= 10 && durationPassed < 12) {
    return 'Hold'
  }

  throw new Error(
    `Outside out expected duration passed was "${durationPassed}"`,
  )
}

const patternLabelInfos: BreathingPattern['patternLabelInfos'] = [
  [33.3, 'Breathe In'],
  [16.6, 'Hold'],
  [33.3, 'Breathe Out'],
  [16.6, 'Hold'],
]

const patternSecondsInfos: BreathingPattern['patternSecondsInfos'] = [
  [33.3, 4],
  [16.6, 2],
  [33.3, 4],
  [16.6, 2],
]

export const breathing4242: BreathingPattern = {
  name: '4242',
  times,
  scale,
  borderColorInterval,
  duration: 4 + 2 + 4 + 2,
  patternLabelInfos,
  patternSecondsInfos,
  getBreathingLabel,
}
