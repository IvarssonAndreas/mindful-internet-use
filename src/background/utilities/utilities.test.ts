// @ts-nocheck

import {filterSubStrings, syncQuotes} from './utilities'

describe('filterSubStrings', () => {
  it('should return strings that is a substring of input string', () => {
    const strings = ['Andreas', 'Hello', 'Andre', 'Hej']

    const substrings = filterSubStrings(strings, 'Andreas')

    expect(substrings).toEqual(['Andreas', 'Andre'])
  })

  it('should count same string as substring', () => {
    const strings = ['Hej']

    const substrings = filterSubStrings(strings, strings[0])

    expect(substrings).toEqual(strings)
  })

  it('should be a case insensitve', () => {
    const strings = ['andreas', 'Hello', 'Andre', 'Hej']

    const substrings = filterSubStrings(strings, 'andreas')

    expect(substrings).toEqual(['andreas', 'Andre'])
  })
  it('should work with empty array', () => {
    const strings: string[] = []

    const substrings = filterSubStrings(strings, 'Andreas')

    expect(substrings).toEqual([])
  })
})

describe('syncQuotes', () => {
  it('should return newQuotes with show === true when the currentQuotes are undefined', () => {
    const newQuotes = [{qoute: 'a', author: 'a'}]
    const currentQuotes = undefined

    const quotes = syncQuotes(newQuotes, currentQuotes)

    expect(quotes).toEqual([{qoute: 'a', author: 'a', show: true}])
  })

  it('should return currentQuote if newQuote is equall to currentQuote', () => {
    const newQuotes = [{qoute: 'a', author: 'a'}]
    const currentQuotes = [{qoute: 'a', author: 'a', show: true}]

    const quotes = syncQuotes(newQuotes, currentQuotes)

    expect(quotes[0]).toEqual(currentQuotes[0])
  })

  it('should return currentQuotes where newQuotes equalls currentQoutes', () => {
    const newQuotes = [
      {qoute: 'a', author: 'a'},
      {qoute: 'b', author: 'b'},
    ]
    const currentQuotes = [
      {qoute: 'a', author: 'a', show: true},
      {qoute: 'b', author: 'b', show: false},
    ]

    const quotes = syncQuotes(newQuotes, currentQuotes)

    expect(quotes).toEqual(currentQuotes)
  })

  it('should return newQoutes with show == false if no match with currentQuotes', () => {
    const newQuotes = [
      {qoute: 'c', author: 'c'},
      {qoute: 'd', author: 'd'},
    ]
    const currentQuotes = [
      {qoute: 'a', author: 'a', show: true},
      {qoute: 'b', author: 'b', show: false},
    ]

    const quotes = syncQuotes(newQuotes, currentQuotes)

    expect(quotes).toEqual([
      {qoute: 'c', author: 'c', show: false},
      {qoute: 'd', author: 'd', show: false},
    ])
  })
  it('should return currentQuote if match with newQuote else newQuote with show == false', () => {
    const newQuotes = [
      {qoute: 'a', author: 'a'},
      {qoute: 'd', author: 'd'},
    ]
    const currentQuotes = [
      {qoute: 'a', author: 'a', show: true},
      {qoute: 'b', author: 'b', show: false},
    ]

    const quotes = syncQuotes(newQuotes, currentQuotes)

    expect(quotes).toEqual([
      {qoute: 'a', author: 'a', show: true},
      {qoute: 'd', author: 'd', show: false},
    ])
  })
})
