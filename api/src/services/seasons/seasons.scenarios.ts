import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.SeasonCreateArgs>({
  season: { one: { number: 87467 }, two: { number: 1475927 } },
})

export type StandardScenario = typeof standard
