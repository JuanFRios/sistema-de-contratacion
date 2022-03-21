import { DocumentResolvers } from 'graphql/models/document/resolvers';
import { InterviewResolvers } from 'graphql/models/interview/resolvers';
import { AdmissionProcessResolvers } from 'graphql/models/admissionProcess/resolvers';
import { RoleResolvers } from 'graphql/models/role/resolvers';
import { UserResolvers } from 'graphql/models/users/resolvers';
import { VacancyResolvers } from 'graphql/models/vacancy/resolvers';

export const resolvers = [
  DocumentResolvers,
  RoleResolvers,
  UserResolvers,
  AdmissionProcessResolvers,
  VacancyResolvers,
  InterviewResolvers,
];
