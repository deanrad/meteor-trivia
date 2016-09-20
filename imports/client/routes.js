import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import { connect, Provider } from 'react-redux'

import { TriviaApp } from '../components/TriviaApp'
import store from '../store/store'

const ConnectedTriviaApp = connect(state => state)(TriviaApp)

Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route>
          <Route path="/" component={ConnectedTriviaApp} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('react-app')
  )
})
