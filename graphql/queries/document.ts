import { gql } from '@apollo/client';

const GET_DOCUMENTS = gql`
  query GetDocuments {
    getUploadedDocuments {
      id
      fileUrl
      document {
        name
      }
    }
    getDocuments {
      id
      name
      description
      type
      signature
    }
  }
`;

export { GET_DOCUMENTS };
