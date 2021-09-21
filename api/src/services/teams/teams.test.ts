import { teams } from './teams'
import type { StandardScenario } from './teams.scenarios'

describe('teams', () => {
  scenario('returns all teams', async (scenario: StandardScenario) => {
    const result = await teams()

    expect(result.length).toEqual(Object.keys(scenario.team).length)
  })
})
