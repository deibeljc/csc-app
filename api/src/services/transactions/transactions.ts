import type { User } from '@prisma/client'
import type {
  ResolverArgs,
  BeforeResolverSpecType,
} from '@redwoodjs/graphql-server'
import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const transactions = ({ myPending }) => {
  const user = context.currentUser as User
  if (myPending && user) {
    logger.info({ user: user.id }, 'Finding pending transactions for a user')
    return db.transaction.findMany({
      where: {
        AND: [
          {
            pending: true,
          },
          {
            OR: [
              {
                From: {
                  Franchise: {
                    agmId: {
                      equals: user.playerId,
                    },
                  },
                },
              },
              {
                To: {
                  Franchise: {
                    agmId: {
                      equals: user.playerId,
                    },
                  },
                },
              },
            ],
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
