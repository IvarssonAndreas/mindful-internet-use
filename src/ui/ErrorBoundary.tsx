import React from 'react'

import {TabHeading} from '@option-ui'
import {Button} from '@ui'
import {FallbackProps} from 'react-error-boundary'

export function ErrorFallbackPage({error, resetErrorBoundary}: FallbackProps) {
  return (
    <div className="grid h-full min-w-[400px] place-content-center p-5 text-amber-50">
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    </div>
  )
}

export const ErrorFallback = ({error, resetErrorBoundary}: FallbackProps) => {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-[300px] flex-col  space-y-10"
    >
      <TabHeading>Something went wrong</TabHeading>
      <p className="text-mui-gold">{error.message}</p>
      <Button variant="text" color="mui-gold" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  )
}

export const errorHandler = (
  error: Error,
  info: {componentStack?: string; extra?: string} = {},
) => {
  console.error(error)
}
