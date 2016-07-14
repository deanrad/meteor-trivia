import { Meteor } from 'meteor/meteor'
import { createStore, combineReducers } from 'redux'
import reducer from './reducers/root'

let storeFactory = createStore

if (Meteor.isClient) {
  if (window.devToolsExtension) {
    storeFactory = window.devToolsExtension()(createStore)
  }
}

export default storeFactory(reducer)
