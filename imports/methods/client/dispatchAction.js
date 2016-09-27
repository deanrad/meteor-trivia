import { UniMethod } from 'meteor/deanius:uni-method'

let clientSidePlaceholder = () => {}
let preDispatch = (action) => {
  console.log(`Dispatching ${action.type} action to server`)
}

export const { dispatchAction } = UniMethod.methods({
  dispatchAction: {
    clientMethod: preDispatch,
    serverMethod: clientSidePlaceholder
  }
})

window.dispatchAction = dispatchAction
