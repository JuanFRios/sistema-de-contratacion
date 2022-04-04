import { gql } from '@apollo/client';

const GET_CANDIDATES = gql`
  query GetCandidates {
    getCandidates {
      id
      email
      name
      image
      profile {
        phone
        identification
        customImage
      }
    }
  }
`;

export { GET_CANDIDATES };
