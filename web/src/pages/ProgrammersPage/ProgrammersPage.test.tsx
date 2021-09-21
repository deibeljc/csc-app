import { render } from '@redwoodjs/testing/web'

import ProgrammersPage from './ProgrammersPage'

describe('ProgrammersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProgrammersPage />)
    }).not.toThrow()
  })
})
