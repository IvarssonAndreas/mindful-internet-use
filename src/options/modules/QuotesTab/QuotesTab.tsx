import React from 'react'
import {
  TabHeading,
  QuoteToggleList,
  SectionContainer,
  SectionHeading,
} from '@option-ui'

import {UserQuoteList} from './UserQuoteList'
import {QuotesIcon} from '@utils'

export const QuotesTab = () => {
  return (
    <div className="space-y-6 text-amber-50">
      <div>
        <TabHeading>
          <QuotesIcon />
          Motivational quotes
        </TabHeading>
      </div>

      <SectionContainer>
        <SectionHeading>Your own quotes</SectionHeading>
        <UserQuoteList />
      </SectionContainer>

      <SectionContainer>
        <QuoteToggleList />
      </SectionContainer>
    </div>
  )
}

export default QuotesTab
