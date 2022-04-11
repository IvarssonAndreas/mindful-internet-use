// @ts-nocheck

import {DefaultQuoteWithoutShow} from '../../allQuotes'
import {Quote} from '@types'

export const filterSubStrings = (strings: string[], string: string) =>
  strings.filter(
    elem => string.toLowerCase().indexOf(elem.toLowerCase()) !== -1,
  )

export const syncQuotes = (
  rawQuotes: DefaultQuoteWithoutShow[],
  currentQuotes: Quote[] | null,
): Quote[] => {
  if (!currentQuotes) {
    return rawQuotes.map(quote => ({...quote, show: true}))
  }

  return rawQuotes.map(rawQuote => {
    const quoteThatAlreadyExist = currentQuotes.find(
      currentQuote => currentQuote.qoute === rawQuote.qoute,
    )
    const show =
      typeof quoteThatAlreadyExist === 'undefined'
        ? false
        : quoteThatAlreadyExist.show

    return {...rawQuote, show}
  })
}

export const isSubStringInArray = (
  string: string,
  strings: string[],
): boolean =>
  Boolean(
    strings.find(
      elem => string.toLowerCase().indexOf(elem.toLowerCase()) !== -1,
    ),
  )

export const findSubString = (
  strings: string[],
  string: string,
): string | undefined =>
  strings.find(elem => elem.toLowerCase().indexOf(string.toLowerCase()) !== -1)
