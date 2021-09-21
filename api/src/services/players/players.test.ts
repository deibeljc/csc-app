import { players } from './players'
import type { StandardScenario } from './players.scenarios'

describe('players', () => {
  scenario('returns all players', async (scenario: StandardScenario) => {
    const result = await players()

    expect(result.length).toEqual(Object.keys(scenario.player).length)
  })
})
