import React from 'react'
import { dispatchAction } from '../methods/client/dispatchAction'
import Actions from '../store/actions'

export const Game = ({ title, status }) => (
  <div>
    <h1>Game:{ title } ({ status })</h1>
    <button onClick={() => dispatchAction(Actions.Game.begin()) }>
        Begin Game
    </button>
    <button onClick={() => dispatchAction(Actions.Game.end()) }>
        End Game
    </button>
    <br/>
    <button onClick={() => dispatchAction(Actions.Round.begin()) }>
        Begin Round
    </button>
    <button onClick={() => dispatchAction(Actions.Round.judge('closed')) }>
        Close Round To Answers
    </button>
    <button onClick={() => dispatchAction(Actions.Round.credit(1)) }>
        Give Credit (1)
    </button>
    <button onClick={() => dispatchAction(Actions.Round.advance()) }>
        Next Round
    </button>
  </div>
)
