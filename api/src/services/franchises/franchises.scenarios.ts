import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.FranchiseCreateArgs>({
  franchise: { one: { name: 'String' }, two: { name: 'String' } },
})

export type StandardScenario = typeof standard
