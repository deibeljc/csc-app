import type { User } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'
import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const transactions = ({ teamId }) => {
  const user = context.currentUser as User
  if (teamId && user) {
    logger.info({ user: user.id }, 'Finding pending transactions for a user')
    return db.transaction.findMany({
      where: {
        OR: [
          {
            From: {
              id: teamId,
            },
          },
          {
            To: {
              id: teamId,
            },
          },
        ],
      },
    })
  }
  return db.transaction.findMany()
}

export const Transaction = {
  Player: (_obj, { root }: ResolverArgs<ReturnType<typeof Transaction>>) =>
    db.transaction.findUnique({ where: { id: root.id } }).Player(),
  From: (_obj, { root }: ResolverArgs<ReturnType<typeof Transaction>>) =>
    db.transaction.findUnique({ where: { id: root.id } }).From(),
  To: (_obj, { root }: ResolverArgs<ReturnType<typeof Transaction>>) =>
    db.transaction.findUnique({ where: { id: root.id } }).To(),
}
