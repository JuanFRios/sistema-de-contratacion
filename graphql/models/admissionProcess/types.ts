import { gql } from 'apollo-server-micro';

const AdmissionProcessTypes = gql`
  enum Enum_StatusAdmissionProcess {
    Interview_Phase
    Hiring_Phase
    Discarded
  }

  type AdmissionProcess {
    id: ID
    vacancy: Vacancy
    vacancyId: String
    candidate: User
    candidateId: String
    status: Enum_StatusAdmissionProcess
    interviews: [Interview]
    uploadDocumentation: [UploadedDocument]
    createdAt: Date
    updatedAt: Date
  }

  input AdmissionProcessCreateInput {
    vacancyId: String!
    candidateId: String!
    status: Enum_StatusAdmissionProcess!
  }

  type Query {
    getAdmissionProcessess: [AdmissionProcess]
    getAdmissionProcess(id: String!): AdmissionProcess
  }

  type Mutation {
    createAdmissionProcess(data: AdmissionProcessCreateInput!): AdmissionProcess
  }
`;

export { AdmissionProcessTypes };
