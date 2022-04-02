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
  }
`;

export { GET_DOCUMENTS };
