import { gql } from '@apollo/client';

const CREATE_INTERVIEW = gql`
  mutation Mutation($data: CreateUserAccountInput!) {
    createUserAccount(data: $data) {
      id
    }
  }
`;

export { CREATE_INTERVIEW };
