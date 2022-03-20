import { gql } from 'apollo-server-micro';
import { DocumentTypes } from './models/document/types';

const genericTypes = gql`
  scalar Date
`;

export const types = [genericTypes, DocumentTypes];
