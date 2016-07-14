import React from 'react'
import { Route } from 'react-router'
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr'
import { connect, Provider } from 'react-redux'

import { TriviaApp } from './components/TriviaApp'

// eslint-disable-next-line new-cap
ReactRouterSSR.Run(
  <Route>
    <Route path="/" component={TriviaApp} />
  </Route>
)
