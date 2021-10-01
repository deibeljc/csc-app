export const schema = gql`
  type UserRole {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    User: User
    userId: String
  }

  type Query {
    userRoles: [UserRole!]! @requireAuth(roles: ["admin"])
  }

  input CreateUserRoleInput {
    name: String!
    userId: String!
  }

  input UpdateUserRoleInput {
    name: String
    userId: String
  }

  type Mutation {
    addRoleToUser(input: CreateUserRoleInput!): User! @requireAuth
  }
`
