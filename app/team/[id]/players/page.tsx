import { PLAYERS } from '@/app/_assets/constants/player'
import PlayerCard from '@/app/_components/PlayerCard'
import React from 'react'

const TeamPlayers = () => {
  return (
    <ul className="grid grid-cols-5 gap-4 p-4">
      {
        PLAYERS.map((player, index) => (<li key={index}><PlayerCard {...player} /></li>))
      }
    </ul>
  )
}

export default TeamPlayers
