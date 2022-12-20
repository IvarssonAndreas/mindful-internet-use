import {MiuStorage} from '@types'
import browser from 'webextension-polyfill'
import {pick} from '@utils'

export function buildStorage(overrides: Partial<MiuStorage> = {}): MiuStorage {
  return {
    isMIUEnabled: true,
    tempAccess: [],
    dangerList: [],
    userQuotes: [],
    defaultQuotes: [],
    copy: false,
    numBreath: 4,
    showQuoteWhileBreathing: false,
    selectedBreathingPattern: '424',
    maxAccessTime: 120,
    ...overrides,
  }
}

export function mockStorageSync(overrides: Partial<MiuStorage> = {}) {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  browser.storage.sync.get.mockImplementation((key: string | string[]) => {
    const storage = buildStorage(overrides)
    return pick(storage, Array.isArray(key) ? key : [key])
  })
}
