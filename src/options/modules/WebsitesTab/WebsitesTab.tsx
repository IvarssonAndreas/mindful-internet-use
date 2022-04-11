import React from 'react'

import {SectionContainer, SectionHeading, TabHeading} from '@option-ui'

import {MindlessUrlList} from './MindlessUrlList'
import {MindlessIcon} from '@utils'
import {ErrorFallback, errorHandler} from '@ui'
import {ErrorBoundary} from 'react-error-boundary'

export const WebsitesTab = () => {
  return (
    <div className="space-y-6 text-amber-50">
      <TabHeading>
        <MindlessIcon /> Mindless websites
      </TabHeading>

      <SectionContainer>
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
          <SectionHeading>
            Add the URLs, or part of the URLs, to the websites you tend to use
            mindlessly
          </SectionHeading>
          <MindlessUrlList />
        </ErrorBoundary>
      </SectionContainer>
    </div>
  )
}
