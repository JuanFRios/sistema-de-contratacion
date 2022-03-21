import { DocumentResolvers } from 'graphql/models/document/resolvers';
import { AdmissionProcessResolvers } from './models/admissionProcess/resolvers';
import { RoleResolvers } from './models/role/resolvers';
import { UserResolvers } from './models/users/resolvers';
import { VacancyResolvers } from './models/vacancy/resolvers';

export const resolvers = [
  DocumentResolvers,
  RoleResolvers,
  UserResolvers,
  AdmissionProcessResolvers,
  VacancyResolvers,
];
