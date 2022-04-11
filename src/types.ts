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
  isMIUEnabled: boolean
  tempAccess: TempAccess[]
  defaultQuotes: Quote[]
  copy: boolean
  dangerList: string[]
  userQuotes: string[]
  numBreath: number
}
