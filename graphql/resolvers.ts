import { DocumentResolvers } from 'graphql/models/document/resolvers';
import { RoleResolvers } from './models/role/resolvers';
import { UserResolvers } from './models/users/resolvers';

export const resolvers = [DocumentResolvers, RoleResolvers, UserResolvers];
