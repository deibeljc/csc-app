import { createGraphQLHandler } from '@redwoodjs/graphql-server'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { db } from 'src/lib/db'
import { getCurrentUser } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

export const liveQueryStore = new InMemoryLiveQueryStore({})

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  getCurrentUser,
  sdls,
  services,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
