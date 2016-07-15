import { createPublication } from './createPublication'
import { Games } from '/imports/collections/collections'

createPublication('gameUpdates', () => {
  return Games.find()
})
