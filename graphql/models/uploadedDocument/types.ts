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
`;

export { UploadedDocumentTypes };
