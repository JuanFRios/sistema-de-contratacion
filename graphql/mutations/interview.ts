import { gql } from '@apollo/client';

const CREATE_INTERVIEW = gql`
  mutation Mutation($data: InterviewCreateInput!) {
    createInterview(data: $data) {
      id
    }
  }
`;

export { CREATE_INTERVIEW };
