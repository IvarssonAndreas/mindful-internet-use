import React, {useReducer} from 'react'
import {SectionContainer, SectionHeading, TabHeading} from '@option-ui'
import {
  CopyAfterBreathingSetting,
  QuoteWhileBreathing,
  SettingSwitchContainer,
} from './SwitchSettings'

import {SettingsIcon} from '@utils'
import {SelectBreathingPattern} from '../../../breathing-patterns/SelectBreathingPattern'
import {NumberOfBreathSetting} from './NumberOfBreathSetting'
import {MaxAccessTime} from './MaxAccessTime'

type LockedStatus = 'locked' | 'unlocked'
export const SettingsTab = () => {
  const [lockedStatus, unlock] = useReducer(
    (): LockedStatus => 'unlocked',
    'locked',
  )
  return (
    <div className="space-y-6 text-amber-50">
      <TabHeading>
        <SettingsIcon />
        Settings
      </TabHeading>

      <SectionContainer>
        <SettingSwitchContainer>
          <SectionHeading>Show quote while breathing</SectionHeading>
          <QuoteWhileBreathing />
        </SettingSwitchContainer>
        <SettingSwitchContainer>
          <SectionHeading>
            What to do before accessing a mindless website
          </SectionHeading>
          <CopyAfterBreathingSetting />
        </SettingSwitchContainer>
      </SectionContainer>

      <SectionContainer>
        <SectionHeading>Number of breath on breathing timer</SectionHeading>
        <NumberOfBreathSetting lockedStatus={lockedStatus} onUnlock={unlock} />

        <SectionHeading>
          Maximum selectable access time after breathing
        </SectionHeading>
        <MaxAccessTime lockedStatus={lockedStatus} onUnlock={unlock} />
      </SectionContainer>

      <SectionContainer>
        <SelectBreathingPattern />
      </SectionContainer>
    </div>
  )
}
