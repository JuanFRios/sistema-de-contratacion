import { gql } from '@apollo/client';

const CREATE_VACANCY = gql`
  mutation Mutation($data: VacancyCreateInput!) {
    createVacancy(data: $data) {
      id
    }
  }
`;

export { CREATE_VACANCY };
