import { gql } from '@apollo/client';

const GET_VACANCIES = gql`
  query Query {
    getClients {
      id
      name
      updatedAt
      createdAt
    }
  }
`;

export { GET_VACANCIES };
