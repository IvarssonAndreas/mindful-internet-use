import React, {ReactNode} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorFallback, errorHandler} from '@ui'

interface SectionContainerProps {
  children: ReactNode
}

export const SectionContainer = ({children}: SectionContainerProps) => {
  return (
    <div className="space-y-2 rounded-xl bg-mui-blue p-6 shadow-sm shadow-mui-blue-darkest">
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
        {children}
      </ErrorBoundary>
    </div>
  )
}
