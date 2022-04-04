import { gql } from '@apollo/client';

const GET_INTERVIEWS = gql`
  query GetInterviewsByInterviewerId($where: InterviewInterviewerId!) {
    getInterviewsByInterviewerId(where: $where) {
      id
      name
      date
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

export { GET_INTERVIEWS };
