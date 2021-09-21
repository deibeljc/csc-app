import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ProgrammerCell from 'src/components/ProgrammerCell'

const ProgrammersPage = () => {
  return (
    <>
      <MetaTags
        title="Programmers"
        // description="Programmers description"
        /* you should un-comment description and add a unique description, 155 characters or less
        You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <h1>ProgrammersPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/ProgrammersPage/ProgrammersPage.tsx</code>
      </p>
      <ProgrammerCell />
    </>
  )
}

export default ProgrammersPage
