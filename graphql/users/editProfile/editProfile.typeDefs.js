import { gql } from "apollo-server-core";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editProfile(
      userName: String
      email: String
      firstName: String
      lastName: String
      bio: String
      avatar: Upload
      password: String
    ): EditProfileResult!
  }
`;
