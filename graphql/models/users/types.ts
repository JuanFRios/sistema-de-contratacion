import { gql } from 'apollo-server-micro';

const UserTypes = gql`
  type User {
    id: ID
    email: String
    name: String
    image: String
    emailVerified: Date
    role: Role
    #profile: Profile
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getUsers: [User]
    getUser(email: String!): User
  }

  input CreateUserAccountInput {
    email: String!
    name: String!
    image: String!
    auth0Id: String!
    role: String!
    vacancyId: String!
  }

  type Mutation {
    createUserAccount(data: CreateUserAccountInput!): User
  }
`;

export { UserTypes };
