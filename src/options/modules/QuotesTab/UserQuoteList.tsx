import React from 'react'

import {InputList} from '@option-ui'
import {useSyncedState} from '@utils'

export const UserQuoteList = () => {
  const [quotes, setQuotes] = useSyncedState('userQuotes')

  if (!quotes) {
    return null
  }
  return <InputList list={quotes} onChange={quotes => setQuotes(quotes)} />
}
