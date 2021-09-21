import { transactions } from './transactions'
import type { StandardScenario } from './transactions.scenarios'

describe('transactions', () => {
  scenario('returns all transactions', async (scenario: StandardScenario) => {
    const result = await transactions()

    expect(result.length).toEqual(Object.keys(scenario.transaction).length)
  })
})
