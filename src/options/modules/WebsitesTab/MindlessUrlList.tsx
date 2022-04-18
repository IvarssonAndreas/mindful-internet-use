import React from 'react'

import {InputList} from '@option-ui'
import {useSyncedState} from '@utils'

export const MindlessUrlList = () => {
  const [urls, setUrls] = useSyncedState('dangerList')

  if (!urls) {
    return null
  }

  return (
    <InputList breathingRequired list={urls} onChange={urls => setUrls(urls)} />
  )
}
