import React from 'react'
import {render} from 'react-dom'

import Options from './Options'
import '../index.css'
import './optionsIndex.css'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorFallbackPage, errorHandler} from '@ui'
import {SentryInit} from '@lib'

const ui = (
  <ErrorBoundary FallbackComponent={ErrorFallbackPage} onError={errorHandler}>
    <Options />
  </ErrorBoundary>
)
SentryInit()
render(ui, document.querySelector('#root'))

// @ts-ignore
if (module.hot) module.hot.accept() // eslint-disable-line
