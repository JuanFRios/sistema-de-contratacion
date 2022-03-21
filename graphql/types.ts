import { gql } from 'apollo-server-micro';
import { DocumentTypes } from './models/document/types';
import { VacancyTypes } from './models/vacancy/types';
import { InterviewTypes } from './models/interview/types';

const genericTypes = gql`
  scalar Date
`;

export const types = [genericTypes, DocumentTypes, VacancyTypes, InterviewTypes];
