import { gql } from 'apollo-server-micro';

const ProfileTypes = gql`
  input UserUpdateInput {
    phone: StringEditField
    identification: StringEditField
    address: StringEditField
  }

  type Profile {
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
