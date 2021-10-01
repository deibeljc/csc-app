import { render } from '@redwoodjs/testing/web'

import TransactionTimeline from './TransactionTimeline'

describe('TransactionTimeline', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TransactionTimeline />)
    }).not.toThrow()
  })
})
