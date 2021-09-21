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

export const franchises = () => {
  return db.franchise.findMany()
}

export const createFranchise = ({ input }) => {
  return db.franchise.create({
    data: {
      name: input.name,
      gm: {
        connect: {
          id: input.gmId,
        },
      },
      agm: {
        connect: {
          id: input.agmId,
        },
      },
      Teams: {
        create: input.Teams,
      },
    },
  })
}

export const Franchise = {
  gm: (_obj, { root }: ResolverArgs<ReturnType<typeof Franchise>>) =>
    db.franchise.findUnique({ where: { id: root.id } }).gm(),
  agm: (_obj, { root }: ResolverArgs<ReturnType<typeof Franchise>>) =>
    db.franchise.findUnique({ where: { id: root.id } }).agm(),
  Teams: (_obj, { root }: ResolverArgs<ReturnType<typeof Franchise>>) =>
    db.franchise.findUnique({ where: { id: root.id } }).Teams(),
}
