import { gql } from 'apollo-server-micro';

// Falta admisionProcesses, pendiente si se debe incluir
const VacancyTypes = gql`

    type Query {
        _dummy: String
    }

    type Vacancy {
      id: ID
      position: String
      candidatesQuantity: Int
      description: String
      minimumSalary: String
      maximumSalary: String
      startDate: Date
      documents: [Document]
      createdAt: Date
      updatedAt: Date
  }

  input VacancyCreateInput {
    position: String!
    candidatesQuantity: Int!
    description: String!
    minimumSalary: String!
    maximumSalary: String!
    startDate: Date!
  }

  type Mutation {
    createVacancy(data: VacancyCreateInput!): Vacancy
  }

`;

export { VacancyTypes };
