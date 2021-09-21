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

export const matches = () => {
  return db.match.findMany()
}

export const Match = {
  HomeTeam: (_obj, { root }: ResolverArgs<ReturnType<typeof match>>) =>
    db.match.findUnique({ where: { id: root.id } }).HomeTeam(),
  AwayTeam: (_obj, { root }: ResolverArgs<ReturnType<typeof match>>) =>
    db.match.findUnique({ where: { id: root.id } }).AwayTeam(),
  Season: (_obj, { root }: ResolverArgs<ReturnType<typeof match>>) =>
    db.match.findUnique({ where: { id: root.id } }).Season(),
  Winner: (_obj, { root }: ResolverArgs<ReturnType<typeof match>>) =>
    db.match.findUnique({ where: { id: root.id } }).Winner(),
}
