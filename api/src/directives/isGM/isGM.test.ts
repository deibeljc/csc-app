import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import isGmOfFranchise from './isGmOfFranchise'

describe('isGmOfFranchise directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(isGmOfFranchise.schema).toBeTruthy()
    expect(getDirectiveName(isGmOfFranchise.schema)).toBe('isGmOfFranchise')
  })

  it('has a isGmOfFranchise throws an error if validation does not pass', () => {
    const mockExecution = mockRedwoodDirective(isGmOfFranchise, {})

    expect(mockExecution).toThrowError(
      'Implementation missing for isGmOfFranchise'
    )
  })
})
