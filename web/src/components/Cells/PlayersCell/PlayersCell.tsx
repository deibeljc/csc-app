import type { PlayersQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { PlayerType } from '@prisma/client'
import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query PlayersQuery {
    players {
      id
      name
      type
      Team {
        name
      }
      tier
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ players }: CellSuccessProps<PlayersQuery>) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Team Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tier
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, personIdx) => {
                  let typeColor: string

                  switch (player.type) {
                    case PlayerType.SIGNED:
                      typeColor = 'bg-red-100 text-red-800'
                      break
                    case PlayerType.PERM_FREE_AGENT_SIGNED:
                      typeColor = 'bg-red-100 text-red-800'
                      break
                    case PlayerType.PERM_FREE_AGENT:
                      typeColor = 'bg-yellow-100 text-yellow-800'
                      break
                    default:
                      typeColor = 'bg-green-100 text-green-800'
                  }

                  return (
                    <tr
                      key={player.id}
                      className={
                        personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {player.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          className="text-blue-400"
                          to={routes.team({ name: player.Team?.name })}
                        >
                          {player.Team?.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {player.tier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${typeColor}`}
                        >
                          {player.type}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
