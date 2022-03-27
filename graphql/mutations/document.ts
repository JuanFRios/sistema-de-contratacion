import { gql } from '@apollo/client';

const CREATE_DOCUMENT = gql`
  mutation Mutation($data: CreateUserAccountInput!) {
    createUserAccount(data: $data) {
      id
    }
  }
`;

export { CREATE_DOCUMENT };
