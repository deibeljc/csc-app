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

export const users = () => {
  return db.user.findMany()
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    where: {
      id,
    },
    data: {
      ...input,
    },
  })
}

export const User = {
  Player: (_obj, { root }: ResolverArgs<ReturnType<typeof User>>) =>
    db.user.findUnique({ where: { id: root.id } }).Player(),
}
