import React from 'react'
import {OnOffSwitch} from './OnOffSwitch'
import {Logo} from '@utils'
import browser from 'webextension-polyfill'
import {TempAccessList} from './TempAccessList'

const buttonStyle =
  'rounded-lg p-4  w-[180px]  will-change-transform hover:ring hover:ring-amber-50  tracking-wider text-xs font-bold uppercase transition focus-visible:outline-none focus-visible:outline-amber-50 active:scale-90'

export const Popup = () => {
  return (
    <div className="bg-mui-gold  pt-1">
      <div className="  border-mui-gold bg-gradient-to-tl from-mui-blue-dark to-mui-blue p-4">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center">
            <Logo size={24} />

            <div className="pl-2 text-sm font-bold text-amber-50">
              Mindful <br /> <span>Internet Use</span>
            </div>
          </div>
          <OnOffSwitch />
        </div>
        <TempAccessList />
        <div className="mt-10 flex justify-center gap-2">
          <button
            onClick={() => addToCurrentUrlToMindlessList()}
            className={`${buttonStyle}  bg-mui-blue-darkest text-amber-50 shadow-md  shadow-mui-blue-darkest    focus:outline-none focus-visible:outline-mui-blue focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 `}
          >
            Add current url
          </button>
          <button
            onClick={() => goToOptions()}
            className={`${buttonStyle}  bg-mui-blue-darkest text-amber-50  shadow-md  shadow-mui-blue-darkest focus:outline-none focus-visible:outline-mui-blue focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 active:border-mui-blue-darkest`}
          >
            Options
          </button>
        </div>
      </div>
    </div>
  )
}

const addToCurrentUrlToMindlessList = async () => {
  // eslint-disable-next-line no-undef
  const {dangerList} = await browser.storage.sync.get(['dangerList'])
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  })

  console.log(tabs[0].url)
  console.log(dangerList)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const alreadyExits = dangerList?.some(
    (url: string | undefined) => tabs[0].url === url,
  )
  console.log('alreadyExits', alreadyExits)

  if (!alreadyExits) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newDangerList = [...dangerList, tabs[0].url]
    console.log(newDangerList)
    // eslint-disable-next-line no-undef
    await browser.storage.sync.set({dangerList: newDangerList})
    // eslint-disable-next-line no-undef
    await browser.tabs.update(tabs[0].id, {url: tabs[0].url})
  }
}

const goToOptions = async () => {
  // eslint-disable-next-line no-undef
  await browser.tabs.create({url: 'options.html'})
}
