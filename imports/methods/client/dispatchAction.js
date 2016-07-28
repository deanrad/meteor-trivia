import { UniMethod } from 'meteor/deanius:uni-method'

let handleDispatch = () => {}
let preDispatch = (action) => {
  console.log(`Dispatching ${action.type} action to server`)
}

export const { dispatchAction } = UniMethod.methods({
  dispatchAction: {
    clientStub: preDispatch,
    serverMethod: handleDispatch
  }
})
