import React from 'react'

import {InputList, SectionContainer, SectionHeading} from '@option-ui'
import {useSyncedState} from '@utils'

export const MindlessUrlList = () => {
  const [urls, setUrls] = useSyncedState<string[]>('dangerList')

  if (!urls) {
    return null
  }

  return (
    <InputList breathingRequired list={urls} onChange={urls => setUrls(urls)} />
  )
}
