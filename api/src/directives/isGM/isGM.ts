import {
  createValidatorDirective,
  ForbiddenError,
  ValidatorDirectiveFunc,
} from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'

export const schema = gql`
  directive @isGM on FIELD_DEFINITION
`

const validate: ValidatorDirectiveFunc = async ({ context }) => {
  /**
   * Write your validation logic inside this function.
   * Validator directives do not have access to the field value, i.e. they are called before resolving the value
   *
   * - Throw an error, if you want to stop executing e.g. not sufficient permissions
   * - Validator directives can be async or sync
   * - Returned value will be ignored
   */

  type Variables = {
    playerId?: string
    teamId?: string
    franchiseId?: string
  }

  const { teamId, franchiseId } = context.variables as Variables

  if (teamId) {
    const teamWithFranchise = await db.team.findUnique({
      where: {
        id: teamId,
      },
      include: {
        Franchise: true,
      },
    })

    if (!teamWithFranchise) {
      throw new Error(`Team ${teamId} does not exist`)
    }

    if (teamWithFranchise.Franchise.gmId !== context.currentUser.playerId) {
      throw new ForbiddenError(`You are not the GM for this team`)
    }
  }

  if (franchiseId) {
    const franchise = await db.franchise.findUnique({
      where: {
        id: franchiseId,
      },
    })

    if (!franchise) {
      throw new Error(`Franchise ${franchiseId} does not exist`)
    }

    if (franchise.gmId !== context.currentUser.playerId) {
      throw new ForbiddenError(`You are not the GM for this team`)
    }
  }
}

const isGmOfFranchise = createValidatorDirective(schema, validate)

export default isGmOfFranchise
