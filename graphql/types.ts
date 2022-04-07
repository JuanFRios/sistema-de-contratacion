import { gql } from 'apollo-server-micro';
import { AdmissionProcessTypes } from 'graphql/models/admissionProcess/types';
import { DocumentTypes } from 'graphql/models/document/types';
import { RoleTypes } from 'graphql/models/role/types';
import { UserTypes } from 'graphql/models/users/types';
import { VacancyTypes } from 'graphql/models/vacancy/types';
import { InterviewTypes } from 'graphql/models/interview/types';
import { ProfileTypes } from 'graphql/models/profile/types';
import { UploadedDocumentTypes } from 'graphql/models/uploadedDocument/types';
import { ReportChartTypes } from 'graphql/models/chart/types';

const genericTypes = gql`
  scalar Date

  input StringEditField {
    set: String
  }
`;

export const types = [
  genericTypes,
  DocumentTypes,
  RoleTypes,
  UserTypes,
  AdmissionProcessTypes,
  VacancyTypes,
  InterviewTypes,
  ProfileTypes,
  UploadedDocumentTypes,
  ReportChartTypes
];
