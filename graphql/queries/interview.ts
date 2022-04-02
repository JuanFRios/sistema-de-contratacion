import { gql } from '@apollo/client';

const GET_INTERVIEWS = gql`
  query GetInterviews {
    getInterview(where: $where) {
      id
      name
      date
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
