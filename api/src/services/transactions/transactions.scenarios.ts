import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: { playerTypeBefore: 'FREE_AGENT', playerTypeAfter: 'FREE_AGENT' },
    two: { playerTypeBefore: 'FREE_AGENT', playerTypeAfter: 'FREE_AGENT' },
  },
})

export type StandardScenario = typeof standard
