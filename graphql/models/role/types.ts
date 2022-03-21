import { gql } from 'apollo-server-micro';

const RoleTypes = gql`
  enum Enum_RoleName {
    Admin
    Dev
  }
  type Role {
    id: ID
    name: Enum_RoleName
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getRoles: [Role]
  }
`;

export { RoleTypes };
