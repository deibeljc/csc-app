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
    addPlayerToTeam(input: AddPlayerInput!): Team @requireAuth
    dropPlayerFromTeam(input: DropPlayerInput!): Team @requireAuth
    tradePlayerFromTeam(input: TradePlayerInput!): Team @requireAuth
    createTeam(input: CreateTeamInput!): Team @requireAuth
  }
`
