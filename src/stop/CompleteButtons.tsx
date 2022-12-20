import React from 'react'
import dayjs from 'dayjs'
import {Select, SelectProps} from '@option-ui'
import browser from 'webextension-polyfill'
import {motion} from 'framer-motion'
import {Button} from '@ui'
import {useSyncedState} from '@utils'

export const CompleteButtons = () => {
  const [maxAccessTime] = useSyncedState('maxAccessTime')
  const handleAccess = async (accessTime: number | null) => {
    if (accessTime === null) {
      throw new Error('Should accessTime be able to be null here????')
    }

    await makeUrlAccessible(accessTime).catch(e => console.error(e))
  }

  if (maxAccessTime === null) return null

  return (
    <motion.div
      className="flex items-center  gap-5"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 2}}
    >
      <div className="basis-[10rem] ">
        <Select
          autoFocus
          defaultLabel="ACCESS"
          options={timeOptions.filter(o => o.value <= maxAccessTime)}
          onSelectValue={selected => handleAccess(selected)}
          selectedValue={null}
        />
      </div>

      <Button onClick={() => goToOptions()} variant="text" color="mui-blue">
        Options
      </Button>
      <Button onClick={() => closeTab()} variant="text" color="mui-gold">
        Close tab
      </Button>
    </motion.div>
  )
}

const closeTab = async () => {
  const currentTab = await browser.tabs.getCurrent()
  browser.tabs.remove([currentTab.id!]).catch(e => console.error(e))
}

const goToOptions = () => {
  browser.tabs.create({url: 'options.html'}).catch(e => console.error(e))
}

interface TempAccess {
  blockPattern: string
  firstAccess: string
  time: number
}
const makeUrlAccessible = async (time: number) => {
  const currentUrl = new URL(window.location.href)
  const blockUrl = currentUrl.searchParams.get('url')!
  const blockPattern = currentUrl.searchParams.get('pattern')!

  // @ts-ignore
  const {tempAccess} = (await browser.storage.sync.get(['tempAccess'])) as {
    tempAccess: TempAccess[]
  }

  console.log({tempAccess})

  const updatedTempAccess = tempAccess.filter(
    access => access.blockPattern !== blockPattern,
  )
  console.log({updatedTempAccess})

  updatedTempAccess.push({blockPattern, firstAccess: dayjs().format(), time})

  await browser.storage.sync.set({tempAccess: updatedTempAccess})
  window.location.replace(blockUrl)
}

export const timeOptions: SelectProps<number>['options'] = [
  {label: '2min', value: 2},
  {label: '5min', value: 5},
  {label: '10min', value: 10},
  {label: '15min', value: 15},
  {label: '30min', value: 30},
  {label: '45min', value: 45},
  {label: '60min', value: 60},
  {label: '90min', value: 90},
  {label: '120min', value: 120},
]

export type TimeOptions = typeof timeOptions[number]['value']
