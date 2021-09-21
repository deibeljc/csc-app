import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MatchCreateArgs>({
  match: {
    one: {
      HomeTeam: {
        create: { name: 'String', acronym: 'String', tier: 'MINOR' },
      },
      AwayTeam: {
        create: { name: 'String', acronym: 'String', tier: 'MINOR' },
      },
    },
    two: {
      HomeTeam: {
        create: { name: 'String', acronym: 'String', tier: 'MINOR' },
      },
      AwayTeam: {
        create: { name: 'String', acronym: 'String', tier: 'MINOR' },
      },
    },
  },
})

export type StandardScenario = typeof standard
