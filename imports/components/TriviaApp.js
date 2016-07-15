import React from 'react'
import { Round } from './Round'

export const TriviaApp = ({ game, round }) => (
  <div>
  <h1>Trivia !</h1>
  { game.title }
  <hr/>
  { game.status }
  <hr/>
  <Round {...round} />
  </div>
)
