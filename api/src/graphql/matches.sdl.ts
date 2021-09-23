export const schema = gql`
  type Match {
    id: String!
    HomeTeam: Team!
    homeTeamId: String!
    AwayTeam: Team!
    awayTeamId: String!
    Season: Season
    seasonId: String
    Winner: Team
    teamId: String
  }

  type Query {
    matches: [Match!]! @requireAuth
  }

  input CreateMatchInput {
    homeTeamId: String!
    awayTeamId: String!
    seasonId: String
    teamId: String
  }

  input UpdateMatchInput {
    homeTeamId: String
    awayTeamId: String
    seasonId: String
    teamId: String
  }
`
