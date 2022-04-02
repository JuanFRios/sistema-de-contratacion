import { gql } from '@apollo/client';

const GET_CANDIDATES = gql`
  query GetCandidates {
    getCandidates {
      id
      email
      name
      profile {
        phone
        identification
      }
    }
  }
`;

export { GET_CANDIDATES };
