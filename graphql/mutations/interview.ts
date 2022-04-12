import { gql } from '@apollo/client';

const CREATE_INTERVIEW = gql`
  mutation CreateInterview($data: InterviewCreateInput!) {
    createInterview(data: $data) {
      id
    }
  }
`;

const COMPLETE_INTERVIEW = gql`
  mutation Mutation(
    $where: InterviewFilterId!
    $data: InterviewCompleteInput!
  ) {
    completeInterview(where: $where, data: $data) {
      id
    }
  }
`;

export { CREATE_INTERVIEW, COMPLETE_INTERVIEW };
