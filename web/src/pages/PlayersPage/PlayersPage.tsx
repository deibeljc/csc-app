import PlayersCell from 'src/components/PlayersCell'
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
      <div className="pb-5 border-b border-gray-200 mb-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Players</h3>
      </div>
      <PlayersCell />
    </>
  )
}

export default PlayersPage
