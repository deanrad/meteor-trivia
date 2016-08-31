import * as Game from './reducers/game'
import * as Round from './reducers/round'
import { resetAction } from './reducers/reset'
import { advanceQuestionAction } from './reducers/advanceQuestion'

export default {
  Game: Game.actions,
  Round: Round.actions,
  resetAction,
  advanceQuestionAction
}
