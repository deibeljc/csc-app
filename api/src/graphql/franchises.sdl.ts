export const schema = gql`
  type Franchise {
    id: String!
    name: String!
    gm: Player
    gmId: String
    agm: Player
    agmId: String
    Teams: [Team]!
  }

  type Query {
    franchises: [Franchise!]! @requireAuth
  }

  input CreateFranchiseInput {
    name: String!
    gmId: String
    agmId: String
    Teams: [CreateTeamInput]
  }

  input UpdateFranchiseInput {
    name: String
    gmId: String
    agmId: String
  }

  type Mutation {
    createFranchise(input: CreateFranchiseInput!): Franchise @requireAuth
  }
`
