import { gql } from '@apollo/client';

const GET_INTERVIEWS = gql`
  query GetInterviewsByInterviewerId($where: InterviewInterviewerId!) {
    getInterviewsByInterviewerId(where: $where) {
      id
      name
      date
      meetingDetail
      notes
      status
      interviewerId
      admissionProcess {
        vacancy {
          position
        }
        candidate {
          name
        }
      }
    }
  }
`;

export { GET_INTERVIEWS };
