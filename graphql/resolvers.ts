import { DocumentResolvers } from 'graphql/models/document/resolvers';
import { VacancyResolvers } from 'graphql/models/vacancy/resolvers';
import { InterviewResolvers } from 'graphql/models/interview/resolvers';

export const resolvers = [
    DocumentResolvers, 
    VacancyResolvers,
    InterviewResolvers
];
