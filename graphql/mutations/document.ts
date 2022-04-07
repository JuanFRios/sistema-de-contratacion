import { gql } from '@apollo/client';

const CREATE_DOCUMENT = gql`
  mutation Mutation($data: DocumentCreateInput!) {
    createDocument(data: $data) {
      id
    }
  }
`;

const CREATE_OR_UPDATE_DOCUMENT_UPLOAD = gql`
  mutation Mutation($data: UploadedDocumentCreateOrUpdateInput!) {
    createOrUpdateUploadedDocument(data: $data) {
      id
    }
  }
`;

export { CREATE_DOCUMENT, CREATE_OR_UPDATE_DOCUMENT_UPLOAD };
