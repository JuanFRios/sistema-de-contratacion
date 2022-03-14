import { gql } from '@apollo/client';

const GET_USERS = gql`
  query Query {
    getUsers {
      id
    }
  }
`;

export { GET_USERS };
