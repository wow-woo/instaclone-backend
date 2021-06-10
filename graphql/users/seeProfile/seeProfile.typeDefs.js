import { gql } from "apollo-server-core";

//   id Int @id @default(autoincrement())
//   userName String @unique
//   email String @unique
//   firstName String
//   lastName String?
//   password String
export default gql`
  type User {
    id: Int!
    userName: String!
    email: String!
    firstName: String!
    lastName: String
    bio: String
    avatar: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    seeProfile(userName: String): User
  }
`;
