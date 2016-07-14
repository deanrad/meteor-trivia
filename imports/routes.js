import React from 'react'
import { Route } from 'react-router'
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr'

const TriviaApp = () => (
  <h1>Trivia !</h1>
)

// eslint-disable-next-line new-cap
ReactRouterSSR.Run(
  <Route>
    <Route path="/" component={TriviaApp} />
  </Route>
)
