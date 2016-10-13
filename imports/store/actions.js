import * as Game from './reducers/game'
import * as Round from './reducers/round'
import { resetAction } from './reducers/root'

export default {
  Game: Game.actions,
  Round: Round.actions,
  resetAction
}
