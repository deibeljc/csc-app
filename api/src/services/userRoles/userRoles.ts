import { ResolverArgs, UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export enum Roles {
  ADMIN = 'admin',
  GM = 'gm',
  AGM = 'agm',
}

export const userRoles = () => {
  return db.userRole.findMany()
}

export const addRoleToUser = ({ input }) => {
  if (!Object.values(Roles).includes(input.name)) {
    throw new UserInputError(
      `Role name must be on of the following ${Object.values(Roles).join(', ')}`
    )
  }

  return db.user.update({
    where: {
      id: input.userId,
    },
    data: {
      UserRoles: {
        create: {
          name: input.name,
        },
      },
    },
  })
}

export const UserRole = {
  User: (_obj, { root }: ResolverArgs<ReturnType<typeof UserRole>>) =>
    db.userRole.findUnique({ where: { id: root.id } }).User(),
}
