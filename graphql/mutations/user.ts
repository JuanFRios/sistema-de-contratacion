import { gql } from '@apollo/client';

const CREATE_USER_ACCOUNT = gql`
  mutation Mutation($data: CreateUserAccountInput!) {
    createUserAccount(data: $data) {
      id
    }
  }
`;
const UPDATE_PROFILE_IMAGE = gql`
  mutation UpdateProfileImage($user: String, $image: String) {
    updateProfileImage(user: $user, image: $image) {
      id
      profile {
        customImage
      }
    }
  }
`;
const UPDATE_USER_ACCOUNT = gql`
  mutation UpdateUser($user: String!, $data: UserUpdateInput!) {
    updateUser(user: $user, data: $data) {
      id
    }
  }
`;

export { CREATE_USER_ACCOUNT, UPDATE_PROFILE_IMAGE, UPDATE_USER_ACCOUNT };
