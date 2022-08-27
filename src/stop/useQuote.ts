import {useEffect, useState} from 'react'
import browser from 'webextension-polyfill'
import {Quote} from '@types'
import {useErrorHandler} from 'react-error-boundary'
export const useQuote = () => {
  const [quote, setQuote] = useState<Quote | 'notInitialized'>('notInitialized')
  const handleError = useErrorHandler()

  useEffect(() => {
    const getQuote = async () => {
      const {defaultQuotes = [], userQuotes = []} =
        await browser.storage.sync.get(['defaultQuotes', 'userQuotes'])
      const quotesWithShow = (defaultQuotes as Quote[]).filter(
        quote => quote.show,
      )
      const formattedUserQuotes: Quote[] = (userQuotes as string[]).map(
        (userQuote: string) => ({qoute: userQuote, show: true}),
      )
      const allQuotes = [...quotesWithShow, ...formattedUserQuotes]

      const randomQuote = allQuotes.length
        ? getRandom(allQuotes)
        : getRandom(defaultQuotes as Quote[])

      setQuote(randomQuote)
    }

    getQuote().catch(e => handleError(e))
  }, [handleError])

  return quote
}

function getRandom<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
