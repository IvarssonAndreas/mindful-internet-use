import React, {ReactNode} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorFallback, errorHandler} from '@ui'

interface SectionContainerProps {
  children: ReactNode
}

export const SectionContainer = ({children}: SectionContainerProps) => {
  return (
    <div className="flex flex-col justify-between space-y-6 rounded-xl bg-mui-blue px-8 py-7 shadow-sm shadow-mui-blue-darkest">
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
        {children}
      </ErrorBoundary>
    </div>
  )
}
