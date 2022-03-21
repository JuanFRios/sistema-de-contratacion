import { gql } from 'apollo-server-micro';
import { AdmissionProcessTypes } from './models/admissionProcess/types';
import { DocumentTypes } from './models/document/types';
import { RoleTypes } from './models/role/types';
import { UserTypes } from './models/users/types';
import { VacancyTypes } from './models/vacancy/types';

const genericTypes = gql`
  scalar Date
`;

export const types = [
  genericTypes,
  DocumentTypes,
  RoleTypes,
  UserTypes,
  AdmissionProcessTypes,
  VacancyTypes,
];
