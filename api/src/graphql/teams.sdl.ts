export const schema = gql`
  type Team {
    id: String!
    name: String!
    acronym: String!
    tier: Tier!
    Players: [Player]!
    MatchesWon: [Match]!
    HomeMatches: [Match]!
    AwayMatches: [Match]!
    PlayersTradedAway: [Transaction]
    PlayersReceived: [Transaction]
    Franchise: Franchise
    franchiseId: String
  }

  enum Tier {
    MINOR
    MAJOR
    ELITE
  }

  type Query {
    teams: [Team!]! @requireAuth
    team(name: String!): Team @requireAuth
  }

  input CreateTeamInput {
    name: String!
    acronym: String!
    tier: Tier!
    franchiseId: String
  }

  input UpdateTeamInput {
    name: String
    acronym: String
    tier: Tier
    franchiseId: String
  }

  input AddPlayerInput {
    teamId: String!
    playerId: String!
  }

  input DropPlayerInput {
    teamId: String!
    playerId: String!
  }

  input TradePlayerInput {
    playerId: String!
    fromTeamId: String!
    toTeamId: String!
  }

  type Mutation {
    addPlayerToTeam(input: AddPlayerInput!): Team @requireAuth @isGM
    dropPlayerFromTeam(input: DropPlayerInput!): Team @requireAuth @isGM
    tradePlayerFromTeam(input: TradePlayerInput!): Transaction @requireAuth
    createTeam(input: CreateTeamInput!): Team @requireAuth(roles: ["admin"])
  }
`
