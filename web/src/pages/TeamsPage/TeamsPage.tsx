import { MetaTags } from '@redwoodjs/web'
import TeamsCell from 'src/components/Cells/TeamsCell'

const TeamsPage = () => {
  return (
    <div>
      <MetaTags
        title="Teams"
        // description="Teams description"
        /* you should un-comment description and add a unique description, 155 characters or less
        You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <TeamsCell />
    </div>
  )
}

export default TeamsPage
