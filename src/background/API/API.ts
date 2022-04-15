import dayjs from 'dayjs'
import {
  syncQuotes,
  filterSubStrings,
  isSubStringInArray,
  findSubString,
} from '../utilities/utilities'
import browser from 'webextension-polyfill'
import {MiuStorage, TempAccess} from '@types'
import {DefaultQuoteWithoutShow} from '../../allQuotes'
import {BackgroundState} from '../index'
import {errorHandler} from '@ui'

export const syncTempAccess = (tempAccess: TempAccess[]): TempAccess[] => {
  const updated = tempAccess.filter(
    temp => dayjs().diff(dayjs(temp.firstAccess), 'minutes') <= temp.time,
  )

  if (updated.length < tempAccess.length) {
    browser.storage.sync.set({tempAccess: updated})
  }
  return updated
}

export const reloadIfStopPage = async () => {
  try {
    const tabs = await browser.tabs.query({
      active: true,
      lastFocusedWindow: true,
    })

    if (!(tabs && tabs[0] && tabs[0].url)) {
      return
    }

    const {url} = tabs[0]

    const isStopPage = url.includes(browser.runtime.getURL('/stop.html'))
    if (isStopPage) {
      browser.tabs.update(tabs[0].id, {url})
    }
  } catch (e) {
    errorHandler(e as Error, {extra: 'functionName: reloadIfStopPage'})
  }
}

export const syncStorage = async (
  rawQuotes: DefaultQuoteWithoutShow[],
  callback: () => void,
) => {
  const {
    numBreath = 4,
    userQuotes = [],
    dangerList = [],
    defaultQuotes = null,
    tempAccess = [],
    copy = false,
    isMIUEnabled = true,
  } = (await browser.storage.sync.get([
    'defaultQuotes',
    'copy',
    'dangerList',
    'tempAccess',
    'userQuotes',
    'isMIUEnabled',
    'numBreath',
  ])) as MiuStorage
  console.log('sync')
  await browser.storage.sync.set({
    numBreath,
    userQuotes,
    dangerList,
    defaultQuotes: syncQuotes(rawQuotes, defaultQuotes),
    tempAccess,
    copy,
    isMIUEnabled,
  })

  callback()
}

export const isMindless = (
  url: string,
  mindlessURLs: string[],
  tempAccessURLs: string[],
  state: BackgroundState,
) => {
  if (/^chrome-extension:/.test(url) || !mindlessURLs) {
    return
  }

  const isMindless = isSubStringInArray(url, mindlessURLs)

  const longestMatch = filterSubStrings(state.dangerList, url).reduce(
    (a, b) => (a.length > b.length ? a : b),
    '',
  )
  const tempAccessPattern = findSubString(tempAccessURLs, longestMatch)

  if (!isMindless) return

  if (!(tempAccessPattern && tempAccessPattern.length <= longestMatch.length)) {
    return longestMatch
  }
}

type StorageChanges<S extends Partial<MiuStorage>> = {
  [storageKey in keyof S]: {
    newValue: S[storageKey]
    oldValue: S[storageKey]
  }
}

export const handleStorageChange = (
  changes: StorageChanges<MiuStorage>,
  currentState: BackgroundState,
) => {
  if (changes.isMIUEnabled) {
    currentState.isMIUEnabled = changes.isMIUEnabled.newValue
  }

  if (changes.dangerList) {
    currentState.dangerList = changes.dangerList.newValue
  }
  if (changes.tempAccess) {
    currentState.tempAccess = changes.tempAccess.newValue
  }
}

export const handlePageLoad = (
  {url, tabId}: {url: string; tabId: number},
  currentState: BackgroundState,
) => {
  const tempAccessURLs = currentState.tempAccess
    ? currentState.tempAccess.map(temp => temp.blockPattern)
    : []
  const mindlessURLs = currentState.dangerList || []
  const pattern = isMindless(url, mindlessURLs, tempAccessURLs, currentState)
  const stopUrl = browser.runtime.getURL('/stop.html')
  const isStopPage = url.includes(stopUrl)

  if (isStopPage) {
    reloadIfStopPage()
  }

  if (pattern && currentState.isMIUEnabled) {
    browser.tabs.update(tabId, {
      url: browser.runtime.getURL(`stop.html?url=${url}&pattern=${pattern}`),
    })
  }
}
