import { gql } from 'apollo-server-micro';

const UploadedDocumentTypes = gql`
  type UploadedDocument {
    id: ID
    admissionProcess: AdmissionProcess
    admissionProcessId: String
    document: Document
    documentId: String
    fileUrl: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getUploadedDocuments: [UploadedDocument]
    getUploadedDocument(id: String!): UploadedDocument
  }

  input UploadedDocumentCreateOrUpdateInput {
    admissionProcessId: String
    fileUrl: String
    documentId: String
  }

  type Mutation {
    createOrUpdateUploadedDocument(data: UploadedDocumentCreateOrUpdateInput!): UploadedDocument
  }
`;

export { UploadedDocumentTypes };
