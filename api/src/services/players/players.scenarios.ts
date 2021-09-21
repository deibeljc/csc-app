import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PlayerCreateArgs>({
  player: {
    one: {
      name: 'String',
      steamId: 'String',
      discordId: 'String',
      tier: 'MINOR',
      freeAgent: true,
    },
    two: {
      name: 'String',
      steamId: 'String',
      discordId: 'String',
      tier: 'MINOR',
      freeAgent: true,
    },
  },
})

export type StandardScenario = typeof standard
