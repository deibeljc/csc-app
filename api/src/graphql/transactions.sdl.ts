export const schema = gql`
  type Transaction {
    id: String!
    Player: Player
    From: Team
    fromTeamId: String
    To: Team
    toTeamId: String
    fromTeamApproved: Boolean!
    toTeamApproved: Boolean!
    pending: Boolean!
    playerTypeBefore: PlayerType!
    playerTypeAfter: PlayerType!
    createdAt: DateTime!
  }

  enum PlayerType {
    FREE_AGENT
    PERM_FREE_AGENT
    PERM_FREE_AGENT_SIGNED
    SIGNED
    BANNED
  }
  enum PlayerType {
    FREE_AGENT
    PERM_FREE_AGENT
    PERM_FREE_AGENT_SIGNED
    SIGNED
    BANNED
  }

  type Query {
    transactions(myPending: Boolean): [Transaction!]! @requireAuth
  }

  input CreateTransactionInput {
    fromTeamId: String
    toTeamId: String
    playerTypeBefore: PlayerType!
    playerTypeAfter: PlayerType!
  }

  input UpdateTransactionInput {
    fromTeamId: String
    toTeamId: String
    playerTypeBefore: PlayerType
    playerTypeAfter: PlayerType
  }
`
