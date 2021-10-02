import { MetaTags } from '@redwoodjs/web'
import TeamCell from 'src/components/Cells/TeamCell'
import TeamTransactionTimelineCell from 'src/components/Cells/TeamTransactionTimelineCell'

type TeamPageProps = {
  id: string
  name: string
}

const TeamPage = ({ name }: TeamPageProps) => {
  return (
    <div className="p-4">
      <MetaTags
        title="Team"
        // description="Team description"
        /* you should un-comment description and add a unique description, 155 characters or less
        You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <h1 className="text-2xl pb-8">{name}</h1>

      <div className="pb-4">
        <h3 className="text-xl pb-4">Players</h3>
        <TeamCell name={name} />
      </div>
      <div>
        <h3 className="text-xl pb-4">Team Transactions</h3>
        <TeamTransactionTimelineCell name={name} />
      </div>
    </div>
  )
}

export default TeamPage
