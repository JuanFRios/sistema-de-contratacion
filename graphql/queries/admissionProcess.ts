import { gql } from '@apollo/client';

const GET_ADMISSIONPROCESS_BY_CANDIDATE = gql`
  query Query($where: AdmissionProcessFilterId!) {
    getAdmissionProcess(where: $where) {
      candidate {
        name
        profile {
          phone
          identification
          address
          customImage
        }
        image
        id
      }
      status
      interviews {
        name
        interviewer {
          name
          image
          profile {
            customImage
          }
        }
        notes
        status
      }
    }
  }
`;

export { GET_ADMISSIONPROCESS_BY_CANDIDATE };
