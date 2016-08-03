import React from 'react'
import { Round } from './Round'

export const TriviaApp = ({ game, round }) => (
  <div>
  <h1>Game:{ game.title } ({ game.status })</h1>

  <Round {...round} />
  </div>
)
