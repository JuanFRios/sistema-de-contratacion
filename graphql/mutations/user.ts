import { gql } from '@apollo/client';

const CREATE_USER_ACCOUNT = gql`
  mutation Mutation($data: CreateUserAccountInput!) {
    createUserAccount(data: $data) {
      id
    }
  }
`;

export { CREATE_USER_ACCOUNT };
