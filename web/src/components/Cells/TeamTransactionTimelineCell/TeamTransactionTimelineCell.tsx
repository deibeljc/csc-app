import type { FindTeamTransactionTimelineQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { PlayerType } from '@prisma/client'

import { PlusIcon, MinusIcon } from '@heroicons/react/solid'
import { AnimatePresence, motion } from 'framer-motion'

export const QUERY = gql`
  query FindTeamTransactionTimelineQuery($name: String!) {
    transactions(teamName: $name) {
      id
      Player {
        name
      }
      From {
        name
      }
      To {
        name
      }
      playerTypeBefore
      playerTypeAfter
      fromTeamApproved
      toTeamApproved
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Success = ({
  transactions,
}: CellSuccessProps<FindTeamTransactionTimelineQuery>) => {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        <AnimatePresence initial={false}>
          {transactions.map((transaction, eventIdx) => {
            const bgColor =
              transaction.playerTypeAfter === PlayerType.FREE_AGENT
                ? `bg-red-400`
                : `bg-green-400`
            const Icon =
              transaction.playerTypeAfter === PlayerType.FREE_AGENT
                ? MinusIcon
                : PlusIcon
            const text =
              transaction.playerTypeAfter === PlayerType.FREE_AGENT
                ? `${transaction.Player.name} was dropped from ${transaction.From.name}`
                : `${transaction.Player.name} was signed to ${transaction.To.name}`
            return (
              <motion.li
                key={transaction.id}
                initial={{ opacity: 0, y: '25%', scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: '-25%',
                  transition: { duration: 0.2 },
                }}
              >
                <div className="relative pb-8">
                  {eventIdx !== transactions.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={classNames(
                          bgColor,
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                        )}
                      >
                        <Icon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">{text}</p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime={transaction.createdAt}>
                          {new Date(transaction.createdAt).toLocaleString()}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>
    </div>
  )
}
