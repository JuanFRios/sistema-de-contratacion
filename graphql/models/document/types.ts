import { gql } from 'apollo-server-micro';

const DocumentTypes = gql`
  type Query {
    getDocuments: [Document]
  }

  enum Enum_DocumentType {
    Company
    Candidate
  }

  type Document {
    id: ID
    name: String
    description: String
    type: Enum_DocumentType
    signature: Boolean
    createdAt: Date
    updatedAt: Date
  }

  input DocumentCreateInput {
    name: String!
    description: String!
    type: Enum_DocumentType!
    signature: Boolean!
  }

  type Mutation {
    createDocument(data: DocumentCreateInput!): Document
  }
`;

export { DocumentTypes };
