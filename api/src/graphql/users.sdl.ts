export const schema = gql`
  type User {
    id: String!
    email: String!
    Player: Player
    playerId: String
    hashedPassword: String!
    UserRoles: [UserRole]
    salt: String!
  }

  type Query {
    users: [User!]! @requireAuth(roles: ["admin"])
  }

  input CreateUserInput {
    email: String!
    name: String
    playerId: String
    hashedPassword: String!
    salt: String!
  }

  input UpdateUserInput {
    email: String
    name: String
    playerId: String
  }

  type Mutation {
    updateUser(id: String!, input: UpdateUserInput!): User @requireAuth
  }
`
