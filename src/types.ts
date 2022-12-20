import {TimeOptions} from './stop/CompleteButtons'

export type Quote = {
  /** quote is misspelled but not safe to correct since users has already quotes in localstorage */
  qoute: string
  author?: string
  show: boolean
}

export type TempAccess = {
  blockPattern: string
  /** ISO-format */
  firstAccess: string
  /** Number of minutes on website */
  time: number
}

export type MiuStorage = {
  maxAccessTime: TimeOptions
  isMIUEnabled: boolean
  tempAccess: TempAccess[]
  defaultQuotes: Quote[]
  copy: boolean
  dangerList: string[]
  userQuotes: string[]
  numBreath: number
  selectedBreathingPattern: BreathingPatternName
  showQuoteWhileBreathing: boolean
}

export type MiuStorageKey = keyof MiuStorage

export type BreathingPatternName = '424' | '4444' | '55' | '478' | '4242'

export type BreathingLabel = 'Breathe In' | 'Hold' | 'Breathe Out'
