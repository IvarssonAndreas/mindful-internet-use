import React, {useState} from 'react'

import {InputList, SectionContainer, SectionHeading} from '@option-ui'
import {useSyncedState} from '@utils'

export const UserQuoteList = () => {
  const [quotes, setQuotes] = useSyncedState<string[]>('userQuotes')

  if (!quotes) {
    return null
  }
  return <InputList list={quotes} onChange={quotes => setQuotes(quotes)} />
}
