import type { FindTeamQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { ChartSquareBarIcon, ViewListIcon } from '@heroicons/react/solid'

export const QUERY = gql`
  query FindTeamQuery($name: String!) {
    team: team(name: $name) {
      id
      Players {
        id
        name
        tier
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ team }: CellSuccessProps<FindTeamQuery>) => {
  return (
    <div>
      <div className="pb-4">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.Players.map((p) => (
            <li
              key={p.id}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">
                      {p.name}
                    </h3>
                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      {p.tier}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {p.tier}
                  </p>
                </div>
                <img
                  className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                  src="https://via.placeholder.com/50"
                  alt=""
                />
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    <button className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                      <ChartSquareBarIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Stats</span>
                    </button>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex">
                    <button className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                      <ViewListIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Matches</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
