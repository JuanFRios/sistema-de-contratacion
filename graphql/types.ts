import { gql } from 'apollo-server-micro';
import { DocumentTypes } from './models/document/types';
import { RoleTypes } from './models/role/types';
import { UserTypes } from './models/users/types';

const genericTypes = gql`
  scalar Date
`;

export const types = [genericTypes, DocumentTypes, RoleTypes, UserTypes];
