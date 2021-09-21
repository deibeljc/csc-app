import { franchises } from './franchises'
import type { StandardScenario } from './franchises.scenarios'

describe('franchises', () => {
  scenario('returns all franchises', async (scenario: StandardScenario) => {
    const result = await franchises()

    expect(result.length).toEqual(Object.keys(scenario.franchise).length)
  })
})
