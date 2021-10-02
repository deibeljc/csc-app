import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const seasons = () => {
  return db.season.findMany()
}

export const createSeason = ({ number }) => {
  return db.season.create({
    data: {
      number,
    },
  })
}

export const Season = {
  Matches: (_obj, { root }: ResolverArgs<ReturnType<typeof Season>>) =>
    db.season.findUnique({ where: { id: root.id } }).Matches(),
}
