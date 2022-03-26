import { gql } from 'apollo-server-micro';

const InterviewTypes = gql`
  type Query {
    _dummy: String
  }

  enum Enum_InterviewStatus {
    Completed
    NotCompleted
  }

  type Interview {
    id: ID
    name: String
    admissionProcessId: String
    interviewerId: String
    date: Date
    meetingDetail: String
    notes: String
    status: Enum_InterviewStatus
    createdAt: Date
    updatedAt: Date
  }

  input InterviewCreateInput {
    name: String!
    admissionProcessId: String!
    interviewerId: String!
    date: Date!
    meetingDetail: String!
  }

  type Mutation {
    createInterview(data: InterviewCreateInput!): Interview
  }
`;

export { InterviewTypes };
