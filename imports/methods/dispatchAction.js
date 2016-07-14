import { Meteor } from 'meteor/meteor'
import { UniMethod } from 'meteor/deanius:uni-method'

let handleDispatch = () => {}
let preDispatch = () => {}

// eslint-disable-next-line global-require
Meteor.atClient(() => { preDispatch = require('../client/methods').preDispatch })
// eslint-disable-next-line global-require
Meteor.atServer(() => { handleDispatch = require('../server/methods').handleDispatch })

export const { dispatchAction } = UniMethod.methods({
  dispatchAction: {
    clientStub: preDispatch,
    serverMethod: handleDispatch
  }
})
