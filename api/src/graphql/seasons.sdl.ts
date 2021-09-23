export const schema = gql`
  type Season {
    id: String!
    number: Int!
    Matches: [Match]!
  }

  type Query {
    seasons: [Season!]! @requireAuth
  }

  input CreateSeasonInput {
    number: Int!
  }

  input UpdateSeasonInput {
    number: Int
  }
`
