import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import TeamCell from 'src/components/Cells/TeamCell'

type TeamPageProps = {
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
      <TeamCell name={name} />
    </div>
  )
}

export default TeamPage
