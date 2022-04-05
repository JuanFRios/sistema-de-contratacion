import { gql } from 'apollo-server-micro';

const ProfileTypes = gql`
  input UserUpdateInput {
    phone: StringEditField
    identification: StringEditField
    address: StringEditField
    customImage: String
  }

  type Profile {
    id: ID!
    user: User!
    phone: String!
    identification: String!
    address: String!
    customImage: String
  }

  type Mutation {
    updateProfileImage(user: String, image: String): User
    updateUser(user: String!, data: UserUpdateInput!): User
  }
`;

export { ProfileTypes };
