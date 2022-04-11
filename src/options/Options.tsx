import React, {useState} from 'react'
import {
  NavList,
  NavListProps,
  QuotesTab,
  SettingsTab,
  WebsitesTab,
} from './modules'
import {Logo} from '@utils'

type ActiveTab = NavListProps['activeTab']

const Options = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('websites')
  return (
    <div className="relative grid  h-full grid-cols-[17rem_1fr]  bg-mui-gold ">
      <div>
        <div className="fixed  h-screen w-[17rem] bg-mui-gold  ">
          <div className=" m-4 flex items-center">
            <Logo />

            <div className="p-2 text-lg font-bold ">
              Mindful <br /> <span className="text-amber-50">Internet Use</span>
            </div>
          </div>
          <NavList onChange={tab => setActiveTab(tab)} activeTab={activeTab} />
        </div>
      </div>
      <div className="h-full">
        <div className="h-[50px] bg-transparent"> </div>
        <main className="min-h-7 h-[calc(100%-50px)] rounded-tl-2xl bg-gradient-to-tl from-mui-blue-dark to-mui-blue p-14 shadow-inner shadow-2xl ">
          <div className=" max-w-5xl">
            {(() => {
              switch (activeTab) {
                case 'websites':
                  return <WebsitesTab />
                case 'quotes':
                  return <QuotesTab />
                case 'settings':
                  return <SettingsTab />
                default:
                  throwUnhandledNavigationItem(activeTab)
              }
            })()}
          </div>
        </main>
      </div>
    </div>
  )
}

const throwUnhandledNavigationItem = (navigationItem: never): never => {
  throw new Error(
    `'${JSON.stringify(navigationItem)}' is not a navigation item`,
  )
}

export default Options
