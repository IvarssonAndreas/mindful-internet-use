import React from 'react'
import {Quote} from './Quote'
import type {Quote as QuoteType} from '@types'

export const QuoteWhileBreathing = ({quote}: {quote: QuoteType}) => {
  return (
    <div className="smx-auto absolute top-7 right-7 max-w-[300px]">
      <Quote size="small" quote={quote} />
    </div>
  )
}
