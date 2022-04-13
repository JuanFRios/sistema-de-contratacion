import { gql } from '@apollo/client';

const GET_DOCUMENTS = gql`
  query GetDocuments {
    getDocuments {
      id
      name
      description
      type
      signature
    }
  }
`;

const GET_REQUIRED_DOCUMENTS = gql`
  query Query {
    getDocuments {
      id
      name
      description
      type
      signature
      createdAt
      updatedAt
    }
  }
`;

export { GET_DOCUMENTS, GET_REQUIRED_DOCUMENTS };
