import React from 'react'

import {SectionContainer, SectionHeading, TabHeading} from '@option-ui'

import {MindlessUrlList} from './MindlessUrlList'
import {MindlessIcon} from '@utils'

export const WebsitesTab = () => {
  return (
    <div className="space-y-6 text-amber-50">
      <TabHeading>
        <MindlessIcon /> Mindless websites
      </TabHeading>

      <SectionContainer>
        <SectionHeading>
          Add the URLs, or part of the URLs, to the websites you tend to use
          mindlessly
        </SectionHeading>
        <MindlessUrlList />
      </SectionContainer>
    </div>
  )
}
