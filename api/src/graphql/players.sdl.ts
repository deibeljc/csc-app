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

  enum PlayerType {
    FREE_AGENT
    PERM_FREE_AGENT
    PERM_FREE_AGENT_SIGNED
    SIGNED
    BANNED
    INACTIVE
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
    setPlayerActivity(
      playerId: String!
      active: Boolean!
      isPermFreeAgent: Boolean = False
    ): Player @requireAuth(roles: ["admin"])
  }
`
