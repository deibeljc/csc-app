import type { Prisma } from '@prisma/client'
import type {
  ResolverArgs,
  BeforeResolverSpecType,
} from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const seasons = () => {
  return db.season.findMany()
}

export const Season = {
  Matches: (_obj, { root }: ResolverArgs<ReturnType<typeof season>>) =>
    db.season.findUnique({ where: { id: root.id } }).Matches(),
}
