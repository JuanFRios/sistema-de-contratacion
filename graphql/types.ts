import { gql } from 'apollo-server-micro';
import { VacancyTypes } from 'graphql/models/vacancy/types';
import { DocumentTypes } from 'graphql/models/document/types';

const genericTypes = gql`
  scalar Date
`;

export const types = [
  genericTypes,
  VacancyTypes,
  DocumentTypes
];
