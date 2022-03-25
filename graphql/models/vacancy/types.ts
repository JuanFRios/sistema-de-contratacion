import { gql } from 'apollo-server-micro';

const VacancyTypes = gql`
  type Query {
    getVacancies: [Vacancy]
    getVacancy(id: String!): Vacancy
  }

  type Vacancy {
    id: ID
    position: String
    candidatesQuantity: Int
    admissionProcesess: [AdmissionProcess]
    description: String
    minimumSalary: String
    maximumSalary: String
    startDate: Date
    documents: [Document]
    createdAt: Date
    updatedAt: Date
  }

  # //PONER LOS OBLIGATORIOS
  input VacancyCreateInput {
    position: String
    candidatesQuantity: Int
    description: String
    minimumSalary: String
    maximumSalary: String
    startDate: Date
  }

  type Mutation {
    createVacancy(data: VacancyCreateInput!): Vacancy
  }
`;

export { VacancyTypes };
