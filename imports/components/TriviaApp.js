import React from 'react'
import { Round } from './Round'
import { Game } from './Game'

export const TriviaApp = ({ game, round }) => (
  <div>
  <Game {...game} />

  <Round {...round} />
  </div>
)
