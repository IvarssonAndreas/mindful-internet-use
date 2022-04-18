import {BreathingLabel} from '@types'
import {BreathingPattern} from './index'
import {BREATHING_COLORS} from './colors'

const times = [0, 0.21, 0.58, 1]
const scale = [1, 1.3, 1.3, 1]
const borderColorInterval = `${BREATHING_COLORS.in} 0%,
                ${BREATHING_COLORS.in} 21%,
                ${BREATHING_COLORS.hold} 21%,
               ${BREATHING_COLORS.hold} 58%,
                ${BREATHING_COLORS.out} 58%,
               ${BREATHING_COLORS.out} 100%`

const getBreathingLabel = (durationPassed: number): BreathingLabel => {
  if (durationPassed < 4) {
    return 'Breathe In'
  } else if (durationPassed >= 4 && durationPassed < 4 + 7) {
    return 'Hold'
  } else if (durationPassed >= 4 + 7 && durationPassed < 4 + 7 + 8) {
    return 'Breathe Out'
  }

  throw new Error(
    `Outside out expected duration passed was "${durationPassed}"`,
  )
}

const patternLabelInfos: BreathingPattern['patternLabelInfos'] = [
  [21, 'Breathe In'],
  [37, 'Hold'],
  [42, 'Breathe Out'],
]

const patternSecondsInfos: BreathingPattern['patternSecondsInfos'] = [
  [21, 4],
  [37, 7],
  [42, 8],
]

export const breathing478: BreathingPattern = {
  name: '478',
  times,
  scale,
  borderColorInterval,
  duration: 4 + 7 + 8,
  patternLabelInfos,
  patternSecondsInfos,
  getBreathingLabel,
}
