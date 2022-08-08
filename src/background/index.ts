// @ts-nocheck
import browser from 'webextension-polyfill'
import {
  syncTempAccess,
  syncStorage,
  handleStorageChange,
  handlePageLoad,
} from './API/API'
import {defaultQuotes} from '../allQuotes'
import {MiuStorage} from '@types'
import {errorHandler} from '@ui'

export type BackgroundState = {
  tempAccess: MiuStorage['tempAccess']
  dangerList: MiuStorage['dangerList']
  isMIUEnabled: MiuStorage['isMIUEnabled']
  reload: boolean | null
  lastUrl: string
}

const main = () => {
  const state: BackgroundState = {
    tempAccess: [],
    dangerList: [],
    reload: true,
    lastUrl: null,
    isMIUEnabled: true,
  }

  syncStorage(defaultQuotes, async () => {
    const {dangerList, tempAccess, isMIUEnabled} =
      (await browser.storage.sync.get([
        'dangerList',
        'tempAccess',
        'isMIUEnabled',
      ])) as Pick<MiuStorage, 'dangerList' | 'tempAccess' | 'isMIUEnabled'>

    state.dangerList = dangerList
    state.tempAccess = syncTempAccess(tempAccess)
    state.isMIUEnabled = isMIUEnabled

    browser.storage.onChanged.addListener(changes => {
      handleStorageChange(changes, state)
    })

    browser.tabs.onActivated.addListener(async () => {
      try {
        const [currentTab] = await browser.tabs.query({
          active: true,
          currentWindow: true,
        })

        state.tempAccess = syncTempAccess(state.tempAccess)
        handlePageLoad({url: currentTab.url, tabId: currentTab.id}, state)
      } catch (e) {
        errorHandler(e as Error, {extra: 'functionName: onActivated'})
      }
    })

    browser.windows.onFocusChanged.addListener(async windowId => {
      if (windowId === -1) {
        return
      }

      try {
        const [currentTab] = await browser.tabs.query({
          active: true,
          currentWindow: true,
        })

        state.tempAccess = syncTempAccess(state.tempAccess)
        handlePageLoad({url: currentTab.url, tabId: currentTab.id}, state)
      } catch (e) {
        errorHandler(e as Error, {extra: 'functionName: onFocusChanged'})
      }
    })

    browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      try {
        const isStopPage = tab.url.includes(
          browser.runtime.getURL('/stop.html'),
        )

        if (!isStopPage) {
          state.tempAccess = syncTempAccess(state.tempAccess)
          handlePageLoad({url: tab.url, tabId}, state)
        }
      } catch (e) {
        errorHandler(e as Error, {
          extra: JSON.stringify({functionName: 'onUpdated', changeInfo}),
        })
      }
    })
  })
}

try {
  main()
} catch (e) {
  errorHandler(e)
}
