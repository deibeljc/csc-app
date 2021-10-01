import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

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
  UserRoles: (_obj, { root }: ResolverArgs<ReturnType<typeof User>>) =>
    db.user.findUnique({ where: { id: root.id } }).UserRoles(),
}
