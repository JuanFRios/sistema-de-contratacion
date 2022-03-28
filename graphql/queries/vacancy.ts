import { gql } from '@apollo/client';

const GET_VACANCIES = gql`
  query GetVacancies {
    getVacancies {
      id
      position
      admissionProcesess {
        id
        candidate {
          name
        }
        status
      }
    }
  }
`;

export { GET_VACANCIES };
