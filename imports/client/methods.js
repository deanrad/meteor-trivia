import store from '../store/store'

export const preDispatch = (action) => console.log(`Handling ${action.type} on client`)
