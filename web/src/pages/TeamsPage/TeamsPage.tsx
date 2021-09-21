import { MetaTags } from '@redwoodjs/web'
import TeamsCell from 'src/components/TeamsCell'

const TeamsPage = () => {
  return (
    <>
      <MetaTags
        title="Teams"
        // description="Teams description"
        /* you should un-comment description and add a unique description, 155 characters or less
        You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <h1>TeamsPage</h1>
      <p>
        Find me in <code>./web/src/pages/TeamsPage/TeamsPage.tsx</code>
      </p>
      <TeamsCell />
    </>
  )
}

export default TeamsPage
