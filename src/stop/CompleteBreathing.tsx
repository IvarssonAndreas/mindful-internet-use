import React from 'react'
import {CompleteButtons} from './CompleteButtons'
import {StopContentWrapper} from './StopContentWrapper'
import {Quote} from './Quote'
import type {Quote as QuoteType} from '@types'

export const CompleteBreathing = ({quote}: {quote: QuoteType}) => {
  return (
    <StopContentWrapper>
      <Quote quote={quote} />
      <CompleteButtons />
    </StopContentWrapper>
  )
}
