import React, {useState} from 'react'
import {
  TabHeading,
  QuoteToggleList,
  SectionContainer,
  SectionHeading,
} from '@option-ui'

import {UserQuoteList} from './UserQuoteList'

import {QuotesIcon, useSyncedState} from '@utils'
import {Quote} from '@types'

import {ErrorFallback, errorHandler} from '@ui'
import {ErrorBoundary} from 'react-error-boundary'

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
