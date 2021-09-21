export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    Player: Player
    playerId: String
    hashedPassword: String!
    salt: String!
  }

  type Query {
    users: [User!]!
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
    updateUser(id: String!, input: UpdateUserInput!): User
  }
`
