// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'
import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="home">
        <Set wrap={DefaultLayout}>
          <Route path="/teams" page={TeamsPage} name="teams" />
          <Route path="/team/{name}" page={TeamPage} name="team" />
          <Route path="/players" page={PlayersPage} name="players" />
        </Set>
      </Private>
      <Set wrap={DefaultLayout} prerender>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound prerender page={NotFoundPage} />
    </Router>
  )
}

export default Routes
