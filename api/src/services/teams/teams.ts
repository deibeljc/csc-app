import {
  ResolverArgs,
  BeforeResolverSpecType,
  UserInputError,
} from '@redwoodjs/api'
import { PlayerType } from '@prisma/client'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const teams = () => {
  return db.team.findMany()
}

// TODO: On all these endpoints, restrict by GM/AGM of the respective team or Admins only.
export const addPlayerToTeam = async ({ input }) => {
  const player = await db.player.findUnique({
    where: {
      id: input.playerId,
    },
  })

  // We can restrict based on last match to see if perm FA was on the team before
  // if we want
  if (player.type !== 'FREE_AGENT' && player.type !== 'PERM_FREE_AGENT') {
    throw new UserInputError('Player is not a free agent', {
      message:
        'Player is not eligible to be picked up. They are not a free agent',
    })
  }

  let playerTypeAfter: PlayerType = PlayerType.SIGNED

  if (player.type === 'PERM_FREE_AGENT') {
    playerTypeAfter = PlayerType.PERM_FREE_AGENT_SIGNED
  }

  // Create our transaction
  await db.transaction.create({
    data: {
      Player: {
        connect: {
          id: input.playerId,
        },
      },
      fromTeamApproved: true,
      toTeamApproved: true,
      pending: false,
      playerTypeBefore: player.type,
      playerTypeAfter,
      To: {
        connect: {
          id: input.teamId,
        },
      },
    },
  })

  // Update player type
  await db.player.update({
    where: {
      id: input.playerId,
    },
    data: {
      type: playerTypeAfter,
    },
  })

  return db.team.update({
    where: {
      id: input.teamId,
    },
    data: {
      Players: {
        connect: {
          id: input.playerId,
        },
      },
    },
  })
}

export const dropPlayerFromTeam = async ({ input }) => {
  // Check if the user indeed is on your team right now
  const player = await db.player.findUnique({
    where: {
      id: input.playerId,
    },
  })

  if (
    player.type !== PlayerType.SIGNED &&
    player.type !== PlayerType.PERM_FREE_AGENT_SIGNED
  ) {
    throw new UserInputError('Player is not currently signed to a team')
  }

  if (player.teamId !== input.teamId) {
    throw new UserInputError(
      'Player is not on the team you are dropping them from'
    )
  }

  const playerTypeAfter =
    player.type === PlayerType.PERM_FREE_AGENT_SIGNED
      ? PlayerType.PERM_FREE_AGENT
      : PlayerType.FREE_AGENT

  await db.transaction.create({
    data: {
      Player: {
        connect: {
          id: input.playerId,
        },
      },
      fromTeamApproved: true,
      toTeamApproved: true,
      pending: false,
      playerTypeBefore: player.type,
      playerTypeAfter,
      From: {
        connect: {
          id: input.teamId,
        },
      },
    },
  })

  // Update player type
  await db.player.update({
    where: {
      id: input.playerId,
    },
    data: {
      type: playerTypeAfter,
    },
  })

  return db.team.update({
    where: {
      id: input.teamId,
    },
    data: {
      Players: {
        disconnect: {
          id: input.playerId,
        },
      },
    },
  })
}

export const Team = {
  Players: (_obj, { root }: ResolverArgs<ReturnType<typeof Team>>) =>
    db.team.findUnique({ where: { id: root.id } }).Players(),
  PlayersTradedAway: (_obj, { root }: ResolverArgs<ReturnType<typeof Team>>) =>
    db.team.findUnique({ where: { id: root.id } }).PlayersTradedAway(),
  PlayersReceived: (_obj, { root }: ResolverArgs<ReturnType<typeof Team>>) =>
    db.team.findUnique({ where: { id: root.id } }).PlayersReceived(),
  MatchesWon: (_obj, { root }: ResolverArgs<ReturnType<typeof Team>>) =>
    db.team.findUnique({ where: { id: root.id } }).MatchesWon(),
  HomeMatches: (_obj, { root }: ResolverArgs<ReturnType<typeof Team>>) =>
    db.team.findUnique({ where: { id: root.id } }).HomeMatches(),
  AwayMatches: (_obj, { root }: ResolverArgs<ReturnType<typeof Team>>) =>
    db.team.findUnique({ where: { id: root.id } }).AwayMatches(),
  Franchise: (_obj, { root }: ResolverArgs<ReturnType<typeof Team>>) =>
    db.team.findUnique({ where: { id: root.id } }).Franchise(),
}
