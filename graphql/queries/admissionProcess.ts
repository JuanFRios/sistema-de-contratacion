import { gql } from '@apollo/client';

const GET_ADMISSIONPROCESS_BY_CANDIDATE = gql`
  query Query($where: AdmissionProcessFilterId!) {
    getAdmissionProcess(where: $where) {
      id
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
      vacancy {
        position
      }
      uploadDocumentation {
        document {
          name
          type
          signature
          description
          id
        }
        fileUrl
        documentId
        id
      }
    }
  }
`;

export { GET_ADMISSIONPROCESS_BY_CANDIDATE };
