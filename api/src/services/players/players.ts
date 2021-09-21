import {
  ResolverArgs,
  BeforeResolverSpecType,
  UserInputError,
} from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const players = async () => {
  console.time('findPlayers')
  const players = await db.player.findMany()
  console.timeEnd('findPlayers')
  return players
}

export const createPlayer = async ({ input }) => {
  const user = await db.user.findUnique({ where: { id: input.userId } })

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
      discordId: input.discordId,
      name: input.name,
      steamId: input.steamId,
      tier: input.tier,
      User: {
        connect: {
          id: input.userId,
        },
      },
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
