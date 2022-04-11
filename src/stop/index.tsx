import React from 'react'
import {render} from 'react-dom'

import '../index.css'
import './stopIndex.css'
import Stop from './Stop'

import {ErrorFallbackPage, errorHandler} from '@ui'
import {ErrorBoundary} from 'react-error-boundary'
import {SentryInit} from '@lib'

const ui = (
  <ErrorBoundary FallbackComponent={ErrorFallbackPage} onError={errorHandler}>
    <Stop />
  </ErrorBoundary>
)
SentryInit()

render(ui, window.document.querySelector('#root'))

// @ts-ignore
if (module.hot) module.hot.accept() // eslint-disable-line
