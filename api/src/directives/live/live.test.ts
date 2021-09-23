import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import live from './live'

describe('live directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(live.schema).toBeTruthy()
    expect(getDirectiveName(live.schema)).toBe('live')
  })

  it('has a live throws an error if validation does not pass', () => {
    const mockExecution = mockRedwoodDirective(live, {})

    expect(mockExecution).toThrowError('Implementation missing for live')
  })
})
