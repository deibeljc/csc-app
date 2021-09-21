import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { email: 'String9858219', hashedPassword: 'String', salt: 'String' },
    two: { email: 'String350451', hashedPassword: 'String', salt: 'String' },
  },
})

export type StandardScenario = typeof standard
