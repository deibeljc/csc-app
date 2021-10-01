export const schema = gql`
  type Player {
    id: String!
    name: String!
    type: PlayerType!
    steamId: String!
    discordId: String!
    tier: Tier!
    Team: Team
    teamId: String
    freeAgent: Boolean!
    GMOfFranchise: Franchise
    AGMOfFranchise: Franchise
    User: User
  }

  enum Tier {
    MINOR
    MAJOR
    ELITE
    UNASSIGNED
  }

  type Query {
    players: [Player!]! @requireAuth
  }

  input CreatePlayerInput {
    name: String!
  }

  input UpdatePlayerInput {
    name: String
    steamId: String
    userId: String
    discordId: String
    tier: Tier
    teamId: String
    freeAgent: Boolean
  }

  type Mutation {
    createPlayer(input: CreatePlayerInput!): Player @requireAuth
  }
`
