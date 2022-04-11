// @ts-nocheck
import dayjs from 'dayjs'
import {syncTempAccess} from './API'
import browser from 'webextension-polyfill'
import {TempAccess} from '@types'

const buildTempAccess = (): TempAccess[] => {
  const fiveMinAgo = dayjs().subtract(5, 'minute')
  return [
    {
      firstAccess: fiveMinAgo,
      time: '123',
      blockPattern: 'svt',
    },
    {
      firstAccess: fiveMinAgo,
      time: 1,
      blockPattern: 'svt2',
    },
    {
      firstAccess: fiveMinAgo,
      time: 15,
      blockPattern: 'svt3',
    },
    {
      firstAccess: fiveMinAgo,
      time: 4,
      blockPattern: 'svt4',
    },
  ]
}

describe('syncTempAccess', function () {
  beforeEach(function () {
    jest.clearAllMocks()
  })

  it('should return all items where "time" minutes has not passed since first access', () => {
    const tempAccess = buildTempAccess()
    const updatedTempAccess = syncTempAccess(tempAccess)
    expect(updatedTempAccess).toEqual([tempAccess[0], tempAccess[2]])
  })

  it('should call chrome.storage.sync.set with all items where "time" minutes has not passed since first access', () => {
    const tempAccess = buildTempAccess()
    const updatedTempAccess = syncTempAccess(tempAccess)
    expect(browser.storage.sync.set).toBeCalledTimes(1)
    expect(browser.storage.sync.set).toBeCalledWith({
      tempAccess: updatedTempAccess,
    })
  })

  it('should call not chrome.storage.sync.set if input and output is the same', () => {
    const fiveMinAgo = dayjs().subtract(5, 'minute')
    const tempAccess: TempAccess[] = [
      {firstAccess: fiveMinAgo, time: 20, blockPattern: 'svt1'},
    ]

    const updatedTempAccess = syncTempAccess(tempAccess)

    expect(updatedTempAccess).toEqual(tempAccess)
    expect(browser.storage.sync.set).not.toBeCalled()
  })
})
