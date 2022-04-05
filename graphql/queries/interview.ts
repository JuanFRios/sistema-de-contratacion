import { gql } from '@apollo/client';

const GET_INTERVIEW = gql`
  query GetInterview($where: InterviewFilterId!) {
    getInterview(where: $where) {
      name
      id
      admissionProcess {
        vacancy {
          position
        }
        candidate {
          name
        }
      }
      date
      meetingDetail
      notes
    }
  }
`;

export { GET_INTERVIEW };
