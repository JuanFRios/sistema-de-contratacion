import { gql } from '@apollo/client';

const CREATE_VACANCY = gql`
  mutation Mutation($data: CreateUserAccountInput!) {
    createUserAccount(data: $data) {
      id
    }
  }
`;

export { CREATE_VACANCY };
