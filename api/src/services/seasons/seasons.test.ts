import { seasons } from './seasons'
import type { StandardScenario } from './seasons.scenarios'

describe('seasons', () => {
  scenario('returns all seasons', async (scenario: StandardScenario) => {
    const result = await seasons()

    expect(result.length).toEqual(Object.keys(scenario.season).length)
  })
})
