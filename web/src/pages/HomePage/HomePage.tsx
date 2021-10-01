import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <div className="p-4">
      <MetaTags
        title="Home"
        // description="Home description"
        /* you should un-comment description and add a unique description, 155 characters or less
        You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <h1>Home!</h1>
      <p>Put some news and stuff on me or something?</p>
    </div>
  )
}

export default HomePage
