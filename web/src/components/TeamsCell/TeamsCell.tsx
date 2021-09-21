import type { TeamsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query TeamsQuery {
    teams {
      id
      PlayersReceived {
        Player {
          name
        }
      }
      PlayersTradedAway {
        Player {
          name
        }
        createdAt
      }
    }
    transactions(myPending: true) {
      id
      From {
        name
      }
      To {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ transactions }: CellSuccessProps<TeamsQuery>) => {
  return (
    <ul>
      {transactions.map((item) => {
        return (
          <li key={item.id}>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </li>
        )
      })}
    </ul>
  )
}
