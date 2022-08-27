import React from 'react'
import {SectionContainer, SectionHeading, TabHeading} from '@option-ui'
import {
  CopyAfterBreathingSetting,
  QuoteWhileBreathing,
  SettingSwitchContainer,
} from './SwitchSettings'
import {NumberOfBreathSetting} from './NumberOfBreathSetting'
import {SettingsIcon} from '@utils'
import {SelectBreathingPattern} from '../../../breathing-patterns/SelectBreathingPattern'

export const SettingsTab = () => {
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
        <NumberOfBreathSetting />
      </SectionContainer>

      <SectionContainer>
        <SelectBreathingPattern />
      </SectionContainer>
    </div>
  )
}
