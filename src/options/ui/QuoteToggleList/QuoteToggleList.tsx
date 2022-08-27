import React, {useEffect, useState} from 'react'

import {SectionHeading} from '@option-ui'
import {QuoteToggleListItem} from './QuoteToggleListItem'
import {Quote} from '@types'
import {useSyncedState} from '@utils'

export const QuoteToggleList = () => {
  const [isMajorSwitchEnabled, setIsMajorSwitchEnabled] = useState<
    boolean | null
  >(null)
  const [defaultQuotes, setDefaultQuotes] = useSyncedState('defaultQuotes')

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
    <div>
      {isMajorSwitchEnabled !== null && (
        <div className="sticky top-0 z-40 pr-2">
          <QuoteToggleListItem
            heading
            enabled={isMajorSwitchEnabled}
            onToggle={enabled => handleAllSwitch(enabled)}
          >
            <SectionHeading className="mb-0">Default quotes</SectionHeading>
          </QuoteToggleListItem>
        </div>
      )}
      <ul className="max-h-[400px] overflow-y-auto">
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
    </div>
  )
}

const isAnyShow = (quotes: Quote[] = []): boolean =>
  quotes.some(({show}) => show)

const isSameQuote = (quote1: Quote, quote2: Quote): boolean => {
  const isSameQuoteText = quote1.qoute === quote2.qoute
  const isSameAuthor = quote1.author === quote2.author
  return isSameQuoteText && isSameAuthor
}
