import React from 'react'
import {render} from 'react-dom'

import '../index.css'
import {Popup} from './Popup'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorFallbackPage, errorHandler} from '@ui'

const ui = (
  <ErrorBoundary FallbackComponent={ErrorFallbackPage} onError={errorHandler}>
    <Popup />
  </ErrorBoundary>
)

render(ui, window.document.querySelector('#root'))

// @ts-ignore
if (module.hot) module.hot.accept() // eslint-disable-line
