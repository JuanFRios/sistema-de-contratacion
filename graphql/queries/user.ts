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
        address
      }
    }
  }
`;
const GET_USER_PROFILE = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      id
      email
      name
      image
      profile {
        id
        customImage
        address
        phone
        identification
      }
    }
  }
`;

export { GET_CANDIDATES, GET_USER_PROFILE };
