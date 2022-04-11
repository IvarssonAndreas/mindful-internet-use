import React, {useEffect, useState} from 'react'

import {SectionContainer, SectionHeading} from '@option-ui'
import {ErrorBoundary} from 'react-error-boundary'
import {QuoteToggleListItem} from './QuoteToggleListItem'
import {Quote} from '@types'
import {ErrorFallback, errorHandler} from '@ui'
import {useSyncedState} from '@utils'

export const QuoteToggleList = () => {
  const [isMajorSwitchEnabled, setIsMajorSwitchEnabled] = useState<
    boolean | null
  >(null)
  const [defaultQuotes, setDefaultQuotes] =
    useSyncedState<Quote[]>('defaultQuotes')

  useEffect(() => {
    setIsMajorSwitchEnabled(isAnyShow(defaultQuotes ?? []))
  }, [defaultQuotes])

  if (!defaultQuotes) {
    return null
  }

  const handleItemSwitch = (show: boolean, quoteToUpdate: Quote) => {
    const newQuotes = defaultQuotes.map(qoute =>
      isSameQuote(qoute, quoteToUpdate) ? {...qoute, show} : qoute,
    )

    setDefaultQuotes(newQuotes)
  }

  const handleAllSwitch = (enabled: boolean) => {
    setDefaultQuotes(defaultQuotes.map(qoute => ({...qoute, show: enabled})))
  }

  return (
    <ul className="max-h-[400px] overflow-y-auto">
      {isMajorSwitchEnabled !== null && (
        <QuoteToggleListItem
          enabled={isMajorSwitchEnabled}
          onToggle={enabled => handleAllSwitch(enabled)}
        >
          <SectionHeading>Default quotes</SectionHeading>
        </QuoteToggleListItem>
      )}
      {defaultQuotes.map(quote => (
        <QuoteToggleListItem
          key={quote.qoute + (quote.author ?? '')}
          onToggle={enabled => handleItemSwitch(enabled, quote)}
          enabled={quote.show}
        >
          <div>
            {quote.qoute}
            <span className="ml-2 italic text-mui-gold">
              {quote.author ?? ''}
            </span>
          </div>{' '}
        </QuoteToggleListItem>
      ))}
    </ul>
  )
}

const isAnyShow = (quotes: Quote[] = []): boolean =>
  quotes.some(({show}) => show)

const isSameQuote = (quote1: Quote, quote2: Quote): boolean => {
  const isSameQuoteText = quote1.qoute === quote2.qoute
  const isSameAuthor = quote1.author === quote2.author
  return isSameQuoteText && isSameAuthor
}
