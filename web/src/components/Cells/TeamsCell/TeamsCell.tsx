import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { ChevronRightIcon } from '@heroicons/react/solid'

import { TransactionsQuery } from 'types/graphql'

export const QUERY = gql`
  query TransactionsQuery {
    franchises {
      id
      name
      gm {
        name
      }
      agm {
        name
      }
      Teams {
        id
        tier
        name
        Players {
          id
          name
        }
      }
    }
  }
`

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
    pollInterval: 2500,
  }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  franchises,
}: CellSuccessProps<TransactionsQuery>) => {
  return (
    <div>
      {franchises.map((franchise) => (
        <div
          key={franchise.id}
          className="bg-white shadow overflow-hidden sm:rounded-md"
        >
          <div className="bg-white">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {franchise.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                GM is {franchise.gm.name}. AGM is {franchise.agm.name}
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {franchise.Teams.map((team) => (
                <li key={team.id}>
                  <button
                    className="px-4 sm:px-6 py-4  w-full h-full flex items-center hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      navigate(routes.team({ name: team.name }))
                    }}
                  >
                    <div className="min-w-0 flex-1 flex flex-col items-start text-left">
                      <div>{team.name}</div>
                      <p className="mt-1 text-sm text-gray-500">{team.tier}</p>
                    </div>

                    <div>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
