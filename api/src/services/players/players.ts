import { ResolverArgs, UserInputError } from '@redwoodjs/graphql-server'
import { PlayerType } from '@prisma/client'

import { db } from 'src/lib/db'

export const players = async () => {
  console.time('findPlayers')
  const players = await db.player.findMany()
  console.timeEnd('findPlayers')
  return players
}

export const createPlayer = async ({ input }) => {
  const user = await db.user.findUnique({
    where: { id: context.currentUser?.id },
  })

  if (!user) {
    throw new UserInputError('User Id does not exist', {
      message: 'User does not exist',
    })
  }

  const existingPlayer = await db.player.findMany({
    where: { name: { equals: input.name } },
  })
  if (existingPlayer.length > 0) {
    throw new UserInputError('Name is already taken', {
      message: 'Name is already taken, please choose a new one',
    })
  }

  // We by default create out player as a free agent
  return db.player.create({
    data: {
      name: input.name,
      User: {
        connect: {
          id: context.currentUser.id,
        },
      },
    },
  })
}

export const setPlayerActivity = async ({
  playerId,
  active,
  isPermFreeAgent,
}) => {
  const player = await db.player.findUnique({ where: { id: playerId } })

  if (active && player.type !== PlayerType.INACTIVE) {
    throw new UserInputError('User is already active')
  }

  if (!active && player.type === PlayerType.INACTIVE) {
    throw new UserInputError('User is already inactive')
  }

  const type = active
    ? isPermFreeAgent
      ? PlayerType.PERM_FREE_AGENT
      : PlayerType.FREE_AGENT
    : PlayerType.INACTIVE

  // Create our transaction
  const transaction = await db.transaction.create({
    data: {
      Player: {
        connect: {
          id: playerId,
        },
      },
      fromTeamApproved: true,
      toTeamApproved: true,
      pending: false,
      playerTypeBefore: player.type,
      playerTypeAfter: type,
    },
  })

  // Do some extra stuff when setting a player to inactive
  if (player.teamId && !active) {
    // If the player has a team connected we want to mark the transaction as the player is coming from a team
    await db.transaction.update({
      where: { id: transaction.id },
      data: {
        From: {
          connect: {
            id: player.teamId,
          },
        },
      },
    })
    // We also want to disconnect that player from the team as they won't be on it anymore
    await db.team.update({
      where: {
        id: player.teamId,
      },
      data: {
        Players: {
          disconnect: {
            id: player.id,
          },
        },
      },
    })
  }

  return db.player.update({
    where: {
      id: playerId,
    },
    data: {
      type,
    },
  })
}

export const Player = {
  Team: (_obj, { root }: ResolverArgs<ReturnType<typeof Player>>) =>
    db.player.findUnique({ where: { id: root.id } }).Team(),
  GMOfFranchise: (_obj, { root }: ResolverArgs<ReturnType<typeof Player>>) =>
    db.player.findUnique({ where: { id: root.id } }).GMOfFranchise(),
  AGMOfFranchise: (_obj, { root }: ResolverArgs<ReturnType<typeof Player>>) =>
    db.player.findUnique({ where: { id: root.id } }).AGMOfFranchise(),
  User: (_obj, { root }: ResolverArgs<ReturnType<typeof Player>>) =>
    db.player.findUnique({ where: { id: root.id } }).User(),
}
