import { gql } from '@apollo/client';

const GET_VACANCIES = gql`
  query GetVacancies {
    getVacancies {
      id
      position
      description
      candidatesQuantity
      minimumSalary
      maximumSalary
      startDate
      admissionProcesess {
        id
        candidate {
          name
          image
          profile {
            customImage
          }
        }
        status
      }
    }
  }
`;

const GET_VACANCIES_BY_CANDIDATE = gql`
  query Query($where: VacancyCandidateId!) {
    getVacancyByCandidate(where: $where) {
      position
      id
      admissionProcesess {
        interviews {
          id
          name
          status
          meetingDetail
          date
          interviewer {
            name
          }
        }
      }
    }
  }
`;

export { GET_VACANCIES, GET_VACANCIES_BY_CANDIDATE };
