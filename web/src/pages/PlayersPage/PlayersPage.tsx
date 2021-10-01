import PlayersCell from 'src/components/Cells/PlayersCell'
import { MetaTags } from '@redwoodjs/web'

const PlayersPage = () => {
  return (
    <>
      <MetaTags
        title="Players"
        // description="Players description"
        /* you should un-comment description and add a unique description, 155 characters or less
        You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <PlayersCell />
    </>
  )
}

export default PlayersPage
