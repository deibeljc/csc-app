import { matches } from './matches'
import type { StandardScenario } from './matches.scenarios'

describe('matches', () => {
  scenario('returns all matches', async (scenario: StandardScenario) => {
    const result = await matches()

    expect(result.length).toEqual(Object.keys(scenario.match).length)
  })
})
