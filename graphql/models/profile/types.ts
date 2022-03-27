import { gql } from 'apollo-server-micro';

const ProfileTypes = gql`
  type Profile {
    user: User!
    phone: String!
    identification: String!
    address: String!
    customImage: String
  }
  type Mutation {
    updateProfileImage(user: String, image: String): User
  }
`;

export { ProfileTypes };
