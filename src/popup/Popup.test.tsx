import React from 'react'
import {act, render, screen, waitFor, within} from '@testing-library/react'

import {Popup} from './Popup'

import dayjs from 'dayjs'
import {mockStorageSync} from '../test-utils/mockStorage'
import user from '@testing-library/user-event'
import browser from 'webextension-polyfill'
import {TempAccess} from '@types'

describe('Popup', () => {
  beforeEach(() => {
    // Ignore error for now since not able to remove act warning from useInterval!!!!!
    jest.spyOn(console, 'error').mockImplementation(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function
    jest.useFakeTimers()
    mockStorageSync()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe('Enable switch', () => {
    test('switch should be ON if mui is enabled', async () => {
      mockStorageSync({isMIUEnabled: true})
      render(<Popup />)
      expect(
        await screen.findByRole('switch', {name: /on/i}),
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('switch', {name: /off/i}),
      ).not.toBeInTheDocument()
    })
    test('switch should be OFF if mui is NOT enabled', async () => {
      mockStorageSync({isMIUEnabled: false})
      render(<Popup />)
      expect(
        await screen.findByRole('switch', {name: /off/i}),
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('switch', {name: /on/i}),
      ).not.toBeInTheDocument()
    })

    test('should render accessList if has any items', async () => {
      mockStorageSync({
        tempAccess: [
          {time: 5, firstAccess: dayjs().format(), blockPattern: 'facebook'},
        ],
      })
      render(<Popup />)
      expect(
        await screen.findByRole('list', {name: /currently accessed websites/i}),
      ).toBeInTheDocument()
    })
  })

  test('should NOT render accessList if is empty', async () => {
    mockStorageSync({tempAccess: []})
    render(<Popup />)
    await waitFor(() => {
      expect(
        screen.queryByRole('list', {name: /currently accessed websites/i}),
      ).not.toBeInTheDocument()
    })
  })

  test('should render the items from storage ', async () => {
    const tempAccess = [
      {blockPattern: 'svt', time: 10, firstAccess: dayjs().format()},
      {blockPattern: 'tv4', time: 20, firstAccess: dayjs().format()},
    ]
    mockStorageSync({
      tempAccess,
    })
    render(<Popup />)
    const list = await screen.findByRole('list', {
      name: /currently accessed websites/i,
    })
    const items = within(list).getAllByRole('listitem')
    expect(items.length).toBe(tempAccess.length)
    expect(items.map(item => item.textContent)).toMatchInlineSnapshot(`
      Array [
        "svt 10:00",
        "tv4 20:00",
      ]
    `)

    // advance the timers by a second
    // @ts-ignore
    act(() => jest.advanceTimersByTime(1000))

    expect(items.map(item => item.textContent)).toMatchInlineSnapshot(`
      Array [
        "svt 09:59",
        "tv4 19:59",
      ]
    `)
  })

  test('sync storage when item is removed ', async () => {
    const itemToRemove: TempAccess = {
      blockPattern: 'svt',
      time: 10,
      firstAccess: dayjs().format(),
    }
    const rest: TempAccess[] = [
      {blockPattern: 'tv4', time: 10, firstAccess: dayjs().format()},
    ]
    mockStorageSync({tempAccess: [...rest, itemToRemove]})

    render(<Popup />)

    const list = await screen.findByRole('list', {
      name: /currently accessed websites/i,
    })
    const listItems = within(list).getAllByRole('listitem')
    const listItemToRemove = listItems.find(item =>
      item.textContent!.includes(itemToRemove.blockPattern),
    )!

    const removeButton = within(listItemToRemove).getByRole('button')

    user.click(removeButton)

    expect(browser.storage.sync.set).toBeCalledWith({tempAccess: rest})
    expect(browser.storage.sync.set).toBeCalledTimes(1)
  })
})
