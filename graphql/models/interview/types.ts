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
    admissionProcess: AdmissionProcess
    admissionProcessId: String
    interviewer: User
    interviewerId: String
    date: Date
    meetingDetail: String
    notes: String
    status: Enum_InterviewStatus
    createdAt: Date
    updatedAt: Date
  }

  input InterviewFilterId {
    id: String!
  }

  input InterviewInterviewerId {
    interviewerId: String!
  }

  input InterviewCreateInput {
    name: String!
    admissionProcessId: String!
    interviewerId: String!
    date: Date!
    meetingDetail: String!
  }

  input InterviewCompleteInput {
    notes: String
  }

  type Mutation {
    createInterview(data: InterviewCreateInput!): Interview
    completeInterview(where: InterviewFilterId!, data: InterviewCompleteInput!): Interview
  }

  type Query {
    getInterviewsByInterviewerId(where: InterviewInterviewerId): [Interview]
  }
`;

export { InterviewTypes };
