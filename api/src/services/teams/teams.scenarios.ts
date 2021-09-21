import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TeamCreateArgs>({
  team: {
    one: { name: 'String', acronym: 'String', tier: 'MINOR' },
    two: { name: 'String', acronym: 'String', tier: 'MINOR' },
  },
})

export type StandardScenario = typeof standard
