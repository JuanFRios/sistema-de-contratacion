import { DocumentResolvers } from 'graphql/models/document/resolvers';
import { InterviewResolvers } from 'graphql/models/interview/resolvers';
import { AdmissionProcessResolvers } from 'graphql/models/admissionProcess/resolvers';
import { RoleResolvers } from 'graphql/models/role/resolvers';
import { UserResolvers } from 'graphql/models/users/resolvers';
import { VacancyResolvers } from 'graphql/models/vacancy/resolvers';
import { ProfileResolvers } from 'graphql/models/profile/resolvers';
import { UploadedDocumentResolvers } from 'graphql/models/uploadedDocument/resolvers';
import { ChartResolvers } from 'graphql/models/chart/resolvers';

export const resolvers = [
  DocumentResolvers,
  RoleResolvers,
  UserResolvers,
  AdmissionProcessResolvers,
  VacancyResolvers,
  InterviewResolvers,
  ProfileResolvers,
  UploadedDocumentResolvers,
  ChartResolvers,
];
